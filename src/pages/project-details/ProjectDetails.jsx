import "./ProjectDetails.scss";
import { useParams } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { BiCube } from "react-icons/bi";
import { CgInsights } from "react-icons/cg";
import { GrChatOption, GrCubes } from "react-icons/gr";
import { TbCalendarBolt, TbCalendarShare } from "react-icons/tb";
import axios from "axios";
import DashboardTop from "../../components/project-details-dashboard-top/DashboardTop";
import DashboardBottom from "../../components/project-details-dashboard-bottom/DashboardBottom";
import { useEffect, useState } from "react";
import ProjectSlideBar from "../../components/slidebar/ProjectSlideBar";

const ProjectDetails = () => {
  const [projectData, setProjectData] = useState(null);
  const [moreInfo, setMoreInfo] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const [activateSlide, setActivateSlide] = useState(false);
  const [option, setOption] = useState(false);
  const { projectId } = useParams();
  const token = sessionStorage.getItem("token");
  const url = import.meta.env.VITE_SERVER_URL;

  // useEffect to get the project by Id.
  useEffect(() => {
    const fetchProjectById = async () => {
      try {
        const { data } = await axios.get(`${url}/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setProjectData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProjectById();
  }, [projectId, token]);

  if (!projectData) {
    return <>Loading...</>;
  }

  const handleMouseOver = () => {
    setMoreInfo(true);
  };

  const handleMouseLeave = () => {
    setMoreInfo(false);
  };

  const fetchProjectDetails = () => {
    setSlideIn(!slideIn);
    setOption(false);
    setActivateSlide(true);
  };

  const toggleOption = () => {
    setOption(!option);
  };

  const { name, description, status } = projectData;

  return (
    <section className="p-details">
      {activateSlide && (
        <div
          className={`p-details__slidebar${
            slideIn ? "--slideIn" : "--slideOut"
          }`}
        >
          <ProjectSlideBar fetchProjectDetails={fetchProjectDetails} />
        </div>
      )}
      <div className="p-details__sidebar">
        <div className="p-details__name-div">
          <h4 className="p-details__name">
            <BsInfoCircle
              className="p-details__icon"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              onClick={fetchProjectDetails}
            />
            {name}
            {status === "active" && (
              <span
                className="p-details__status--active"
                onClick={toggleOption}
              ></span>
            )}
            {status === "deferred" && (
              <span
                className="p-details__status--deferred"
                onClick={toggleOption}
              ></span>
            )}
            {status === "closed" && (
              <span
                className="p-details__status--closed"
                onClick={toggleOption}
              ></span>
            )}
          </h4>
          {option && (
            <ul className="p-details__update">
              {!(status === "active") && (
                <li className="p-details__update-menu">Make project active</li>
              )}
              {!(status === "deferred") && (
                <li className="p-details__update-menu">Defer project</li>
              )}
              {!(status === "closed") && (
                <li className="p-details__update-menu">Close project</li>
              )}
            </ul>
          )}
          {moreInfo && <p className="p-details__more-info">More info</p>}
        </div>
        <div className="p-details__cntr">
          <ul className="p-details__menu">
            <li className="p-details__item--active">
              <TbCalendarBolt />
              Active Sprint
            </li>
            <li className="p-details__item">
              <BiCube />
              Issues
            </li>
            <li className="p-details__item">
              <GrChatOption />
              Converstions
            </li>
          </ul>

          <ul className="p-details__menu">
            <li className="p-details__item">
              <TbCalendarShare />
              Sprints
            </li>
            <li className="p-details__item">
              <GrCubes />
              Backlogs
            </li>
            <li className="p-details__item--insight">
              <CgInsights />
              Insights
            </li>
          </ul>
        </div>
      </div>
      <div className="p-details__dashboard">
        <div className="p-details__half">
          <DashboardTop description={description} />
        </div>
        <div className="p-details__half">
          <DashboardBottom />
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
