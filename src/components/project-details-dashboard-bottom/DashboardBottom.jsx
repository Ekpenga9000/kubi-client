import "./DashboardBottom.scss";
import { IoAdd } from "react-icons/io5";
import { LiaCubesSolid } from "react-icons/lia";
import { LuCalendarPlus } from "react-icons/lu";
import { MdOutlineNotes, MdOutlinePlaylistAdd } from "react-icons/md";
import { BiTaskX } from "react-icons/bi";
import { useEffect, useState } from "react";
import IssueList from "../issue-list/IssueList";
import AddIssueForm from "../addIssueForm/AddIssueForm";
import axios from "axios";
import { useParams } from "react-router-dom";

const DashboardBottom = () => {
  const { projectId } = useParams();
  const [issues, setIssues] = useState(null);
  const [addIssue, setAddIssue] = useState(false);
  const [issueLength, setIssueLength] = useState(0);

  const url = import.meta.env.VITE_SERVER_URL;
  const token = sessionStorage.getItem("token");
  const handleAddIssue = () => {
    setAddIssue(!addIssue);
  };

  const fetchAllIssues = async () => {
    try {
      const { data } = await axios.get(`${url}/issues/${projectId}`, {
        headers: {
          Authorization: `Bear ${token}`,
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

  return (
    <section className="dashboard-bottom">
      <div className="dashboard-bottom__container">
        <div className="dashboard-bottom__left">
          <div className="dashboard-bottom__title-div">
            <h3 className="dashboard-bottom__title">
              <LiaCubesSolid />
              Backlogs
            </h3>
            <button className="dashboard-bottom__btn--create"><LuCalendarPlus /> Create Sprint</button>
          </div>
          <div className="dashboard-bottom__issues">
            {issueLength === 0 && (
              <div className="dashboard-bottom__empty">
                <h4>You have no issues created for this project</h4>
                <h3>
                  <BiTaskX />
                </h3>
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
    </section>
  );
};

export default DashboardBottom;
