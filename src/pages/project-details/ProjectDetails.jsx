import "./ProjectDetails.scss";
import { useParams } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { BiCube } from "react-icons/bi";
import { CgInsights } from "react-icons/cg";
import { GrChatOption } from "react-icons/gr";
import { TbCalendarBolt, TbCalendarShare } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuUserCog2 } from "react-icons/lu";
import { IoIosBookmark } from "react-icons/io";
import { FaBug, FaCheck, FaBolt, FaCubes } from "react-icons/fa";
import { TbSubtask } from "react-icons/tb";
import axios from "axios";
import DashboardTop from "../../components/project-details-dashboard-top/DashboardTop";
import DashboardBottom from "../../components/project-details-dashboard-bottom/DashboardBottom";
import { useEffect, useState } from "react";
import ProjectSlideBar from "../../components/slidebar/ProjectSlideBar";
// import { DndContext, closestCorners } from "@dnd-kit/core";
import EditSprintModal from "../../components/editSprintModal/EditSprintModal";
import DeleteSprintModal from "../../components/deleteSprintModal/DeleteSprintModal";
import { SortableContext } from "@dnd-kit/sortable";

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

  const handleCreateSprint = async (id) => {
    try {
      const { data } = await axios.get(
        `${url}/sprints/${projectId}/sprint/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSprintName(data.name);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMouseOver = () => {
    setMoreInfo(true);
  };

  const handleMouseLeave = () => {
    setMoreInfo(false);
  };

  const toggleSlider = () => {
    setSlideIn(!slideIn);
    setOption(false);
    setActivateSlide(true);
  };

  const toggleOption = () => {
    setOption(!option);
  };

  const { name, status, permission, projectNumber } = projectData;

  return (
    <section className="p-details">
      {/* <DndContext collisionDetection={closestCorners}> */}
        {activateSlide && (
          <div
            className={`p-details__slidebar${
              slideIn ? "--slideIn" : "--slideOut"
            }`}
          >
            <ProjectSlideBar toggleSlider={toggleSlider} />
          </div>
        )}
        <div className="p-details__sidebar">
          <div className="p-details__name-div">
            <h4 className="p-details__name">
              <BsInfoCircle
                className="p-details__icon"
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onClick={toggleSlider}
              />
              {name}

              {!option && (
                <IoIosArrowDown
                  onClick={toggleOption}
                  className="p-details__icon"
                />
              )}
              {option && (
                <IoIosArrowUp
                  onClick={toggleOption}
                  className="p-details__icon"
                />
              )}
            </h4>
            {option && (
              <ul className="p-details__update">
                {!(status === "active") && (
                  <li className="p-details__update-menu">
                    Make project active
                  </li>
                )}
                {!(status === "deferred") && (
                  <li className="p-details__update-menu">Defer project</li>
                )}
                {!(status === "closed") && (
                  <li className="p-details__update-menu">Close project</li>
                )}
              </ul>
            )}
            {/* {moreInfo && <p className="p-details__more-info">More info</p>} */}
            <div className="p-details__key-div">
              <p className="p-details__number">{projectNumber}</p>
              {status === "active" && (
                <div
                  className="p-details__status--active"
                  onClick={toggleOption}
                ></div>
              )}
              {status === "deferred" && (
                <div
                  className="p-details__status--deferred"
                  onClick={toggleOption}
                ></div>
              )}
              {status === "closed" && (
                <div
                  className="p-details__status--closed"
                  onClick={toggleOption}
                ></div>
              )}
            </div>
          </div>

          <div className="p-details__cntr">
            <ul className="p-details__menu">
              <li className="p-details__item--role">
                <LuUserCog2 /> Project Role:{" "}
                {permission === "admin" ? "Admin" : "Member"}
              </li>
              <li className="p-details__item--insight">
                <FaCubes />
                Backlogs
              </li>
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
                <CgInsights />
                Insights
              </li>
            </ul>

            <h3 className="p-details__issues-type">Issue Types</h3>

            <ul className="p-details__issues-menu">
              <li className="p-details__item">
                <div className="issue__span--epic">
                  <FaBolt />
                </div>
                Epic
              </li>
              <li className="p-details__item">
                {" "}
                <div className="issue__span--story">
                  <IoIosBookmark />
                </div>
                Story
              </li>
              <li className="p-details__item">
                <div className="issue__span--task">
                  <FaCheck />
                </div>
                Task
              </li>
              <li className="p-details__item">
                <div className="issue__span--bug">
                  <FaBug />
                </div>{" "}
                Bug
              </li>
              <li className="p-details__item">
                <div className="issue__span--story">
                  <TbSubtask />
                </div>
                Sub-task
              </li>
            </ul>
          </div>
        </div>
        <div className="p-details__dashboard">
          {/* <SortableContext> */}
            <div className="p-details__half--top">
              <DashboardTop />
            </div>
            <div className="p-details__half--bottom">
              <DashboardBottom handleCreateSprint={handleCreateSprint} />
            </div>
          {/* </SortableContext> */}
        </div>
      {/* </DndContext> */}
    </section>
  );
};

export default ProjectDetails;
