import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectSlideBar.scss";
import { MdClose, MdOutlineEditNote } from "react-icons/md";
import { AiOutlineTeam, AiFillEdit } from "react-icons/ai";
import { TbCalendarTime } from "react-icons/tb";
import { PiSuitcaseSimpleThin } from "react-icons/pi";
import { LuFileClock } from "react-icons/lu";
import TeamAvatar from "../teamAvatar/TeamAvatar";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProjectSlideBar({ toggleSlider }) {
  const [details, setDetails] = useState(null);
  const handleClose = () => {
    toggleSlider();
  };
  const url = import.meta.env.VITE_SERVER_URL;
  const token = sessionStorage.getItem("token");
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const { data } = await axios.get(
          `${url}/projects/details/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDetails(data);
        console.log("The Data", data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjectDetails();
  }, [projectId, token, url]);

  if (!details) {
    return <>Loading...</>;
  }

  const formatDateToCustomFormat = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };

  const {
    created_at,
    description,
    startDate,
    endDate,
    project_id,
    name,
    status,
    team_id,
    team_name,
    type,
    project_lead,
    project_creator,
    project_number,
    lead_id,
  } = details;

  return (
    <section className="projectSlider">
      <div className="projectSlider__icon-div">
        <MdClose className="projectSlider__icon" onClick={handleClose} />
      </div>
      <div className="projectSlider__title-div">
        <div className="projectSlider__first-section">
          <h5 className="projectSlider__intro">Project / {project_number}</h5>
          <AiFillEdit  className="projectSlider__icon"/>
        </div>
        <h4 className="projectSlider__title">{name}</h4>
        <div className="projectSlider__desc-div">
          <h5 className="projectSlider__desc-title">Description</h5>
          <p className="projectSlider__desc">{description}</p>
        </div>
        <div className="projectSlider__bottom">
          {/* Team */}
          <div className="projectSlider__item-div">
            <div className="projectSlider__item">
              <span>
                <AiOutlineTeam />
              </span>
              <span>Team</span>
            </div>
            <div>
              <Link to={`/teams/${team_id}`} className="projectSlider__team">
                {team_name}
              </Link>

              {/* <TeamAvatar/> */}
            </div>
          </div>
          {/* Timeline */}
          <div className="projectSlider__item-div">
            <div className="projectSlider__item">
              <span>
                <TbCalendarTime />
              </span>
              <span>Timeline</span>
            </div>
            <p className="projectSlider__deets">
              {formatDateToCustomFormat(new Date(startDate))} -{" "}
              {formatDateToCustomFormat(new Date(endDate))}
            </p>
          </div>
          {/* Project type */}
          <div className="projectSlider__item-div">
            <div className="projectSlider__item">
              <span>
                <PiSuitcaseSimpleThin />
              </span>
              <span>Project Type</span>
            </div>
            <div>
              <p className="projectSlider__deets">{type}</p>
            </div>
          </div>
          {/* Status */}
          <div className="projectSlider__item-div">
            <div className="projectSlider__item">
              <span>
                <LuFileClock />
              </span>
              <span>Status</span>
            </div>
            <div>
              {status === "active" && (
                <span className="projectSlider__status--active">Active</span>
              )}
              {status === "deferred" && (
                <span className="projectSlider__status--deferred">
                  Deferred
                </span>
              )}
              {status === "closed" && (
                <span className="projectSlider__status--closed">Closed</span>
              )}
            </div>
          </div>
        </div>

        <div className="projectSlider__notes-div">
          <h4 className="projectSlider__notes-title">
            {" "}
            <MdOutlineEditNote /> Add notes
          </h4>
        </div>
      </div>
    </section>
  );
}

export default ProjectSlideBar;
