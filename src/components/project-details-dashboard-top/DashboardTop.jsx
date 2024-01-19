import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DashboardTop.scss";
import { SlOptions } from "react-icons/sl";
import { IoIosPlay } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import IssueList from "../issue-list/IssueList";
import plan from "../../assets/images/plan.png";

// this component would be signalled by the other component. 

const DashboardTop = ({ handleEditSprintModal }) => {
  const [hasIssues, setHasIssues] = useState(false);
  const [isOption, setIsOption] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [noSprint, setNoSprint] = useState(false);
  const [name, setName] = useState("");
  const { projectId } = useParams();
  const token = sessionStorage.getItem("token");
  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchLastestSprint = async () => {
      try {
        const { data: sprint } = await axios.get(`${url}/sprints/${projectId}/latest`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!sprint.name) {
          setNoSprint(true); 
          setIsLoading(false);
        } else {
          setName(sprint.name);
          setIsLoading(false); 
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchLastestSprint();
  }, [projectId, url, token]);
  
  console.log("Firing!!!");
  

  const toggleOptions = () => {
    setIsOption(!isOption);
  }

  const editSprint = () => {
    handleEditSprintModal();
    toggleOptions();
  }
  

  return (
  <>
      {isLoading && <section>Loading...</section>}
      {noSprint && <section>No Sprints for this project</section>}
      {name && <section className="dashboard-top">
        <div className="dashboard-top__title-container">
          <div className="dashboard-top__title-div">
            <h4 className="dashboard-top__sprint-title">{name}</h4>
            <p className="dashboard-top__issues-title">0 issues</p>
          </div>
          <div className="dashboard-top__title-div--bottom">
            {hasIssues && <button className="dashboard-top__btn--start">
              <IoIosPlay /> Start sprint
            </button>}
          
            {!hasIssues && <button className="dashboard-top__btn--disabled">
              <IoIosPlay /> Start sprint
            </button>}

            <button className="dashboard-top__btn--options" onClick={toggleOptions}>
              {isOption ? <IoCloseOutline /> : <SlOptions />}
            </button>
                 
            {isOption && <ul className="dashboard-top__options-menu" ref={option}>
              <li className="dashboard-top__options-item" onClick={editSprint}>Edit sprint</li>
              <li className="dashboard-top__options-item">Delete sprint</li>
            </ul>}
          </div>
        </div>
        <div className="dashboard-top__issues-div">
          {hasIssues && <IssueList />}
          {!hasIssues && (
            <div className="dashboard-top__no-issues-container">
              <div className="dashboard-top__no-issues">
                <div className="dashboard-top__img-div">
                  <img src={plan} alt="Man and woman planning a project in front of a planning board." className="dashboard-top__img" />
                </div>
                <div className="dashboard-top__msg">
                  <h5>Planning your sprint</h5>
                  <p className="dashboard-top__p">
                    Agree as a team on what to work needs to be completed and
                    assign these issue to the sprint.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="dashboard-top__estimate-div">
          <h4 className="dashboard-top__estimate">Estimate</h4>
          <span>0</span>
        </div>
      </section>}
  </>
  );
};

export default DashboardTop;
