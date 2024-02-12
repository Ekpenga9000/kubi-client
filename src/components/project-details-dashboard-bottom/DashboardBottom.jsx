import "./DashboardBottom.scss";
import { IoAdd } from "react-icons/io5";
import { LiaCubesSolid } from "react-icons/lia";
import { LuCalendarPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import IssueList from "../issue-list/IssueList";
import AddIssueForm from "../addIssueForm/AddIssueForm";
import axios from "axios";
import { useParams } from "react-router-dom";
import NoIssue from "../noIssue/NoIssue";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
// import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const DashboardBottom = () => {
  const { projectId } = useParams();
  const [issues, setIssues] = useState(null);
  const [addIssue, setAddIssue] = useState(false);
  const [issueLength, setIssueLength] = useState(0);
  const [activateCreateBtn, setActivateCreateBtn] = useState(false); 

  const url = import.meta.env.VITE_SERVER_URL;
  const token = sessionStorage.getItem("token");
  const handleAddIssue = () => {
    setAddIssue(!addIssue);
  };

  const fetchAllIssues = async () => {
    try {
      const { data } = await axios.get(`${url}/issues/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIssueLength(data.length);
      setIssues(data);
      setAddIssue(false);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchAllIssues();
  }, []);

  const getIssuePos = id => issues.findIndex(issue => issue.id === id);

  const handleDragEnd = e => {
    const { active, over } = e;
    
    if (active.id === over.id) return;

    setIssues(issues => {
      const originalPos = getIssuePos(active.id);
      const newPos = getIssuePos(over.id);

      return arrayMove(issues, originalPos, newPos);
    })
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  
  return (
    <section className="dashboard-bottom">
      <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCorners}>

      <div className="dashboard-bottom__container">
        <div className="dashboard-bottom__left">
          <div className="dashboard-bottom__title-container">
            <div className="dashboard-bottom__title-div">
              <h3 className="dashboard-bottom__title">
                <LiaCubesSolid />
                Backlogs
              </h3>
              <p className="dashboard-bottom__issues-count">{issueLength} {issueLength === 1 ? "issue" : "issues"}</p>
            </div>
            <div className="dashboard-bottom__title-div">
            <p className="dashboard-bottom__estimate">Estimate 0</p>
              {/* {(issueLength > 0 && !activateCreateBtn)&& <button className="dashboard-bottom__btn--create" onClick={createSprint}><LuCalendarPlus /> Create Sprint</button>}
              {(issueLength === 0 || activateCreateBtn) && <button className="dashboard-bottom__btn--disabled"><LuCalendarPlus /> Create Sprint</button>} */}
            </div>
          </div>
          <div className="dashboard-bottom__issues">
            {issueLength === 0 && (
              <div className="dashboard-bottom__empty">
                <NoIssue/>
              </div>
            )}
            {issueLength > 0 && (
              <div className="dashboard-bottom__issues-list">
                <IssueList issues={issues} />
              </div>
            )}
          </div>
          {!addIssue && (
            <button
            className="dashboard-bottom__btn--create"
            onClick={handleAddIssue}
            >
              <IoAdd /> Create Issue
            </button>
          )}
          {addIssue && (
            <AddIssueForm
            handleAddIssue={handleAddIssue}
            fetchAllIssues={fetchAllIssues}
            />
            )}
        </div>
      </div>
           </DndContext>
    </section>
  );
};

export default DashboardBottom;
