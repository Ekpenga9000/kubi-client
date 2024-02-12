import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LuCalendarPlus } from "react-icons/lu";
import "./DashboardTop.scss";
import { SlOptions } from "react-icons/sl";
import { IoIosPlay } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoAddSharp } from "react-icons/io5";
import IssueList from "../issue-list/IssueList";
import plan from "../../assets/images/plan.png";
import gsap from "gsap";
import DeleteSprintModal from "../deleteSprintModal/DeleteSprintModal";
import EditSprintModal from "../editSprintModal/EditSprintModal";

const DashboardTop = () => {
  const [hasIssues, setHasIssues] = useState(false);
  const [isOption, setIsOption] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noSprint, setNoSprint] = useState(false);
  const [noSprintMsg, setNoSprintMsg] = useState(
    "No sprints to display for this project"
  );
  const [name, setName] = useState("");
  const [sprintNumber, setSprintNumber] = useState(null);
  const [editSprintModal, setEditSprintModal] = useState(false);
  const [deleteSprintModal, setDeleteSprintModal] = useState(false);
  const navigate = useNavigate();
  const option = useRef();
  const comp = useRef();
  const { projectId } = useParams();
  const token = sessionStorage.getItem("token");
  const url = import.meta.env.VITE_SERVER_URL;

  if (!token) {
    return navigate("/login");
  }
  const fetchLastestSprint = async () => {
    try {
      const { data: sprint } = await axios.get(
        `${url}/sprints/${projectId}/latest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!sprint.name) {
        setNoSprint(true);
        setIsLoading(false);
      } else {
        setSprintNumber(sprint.id);
        setName(sprint.name);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createSprint = async () => {
    try {
      await axios.post(
        `${url}/sprints/${projectId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNoSprint(false);
      fetchLastestSprint();
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(option.current, {
        duration: 0.4,
        opacity: 0,
        ease: "power1.in",
      });
    }, comp);
    return ctx.revert();
  }, []);

  useEffect(() => {
    fetchLastestSprint();
  }, [projectId, url, token]);

  const toggleOptions = () => {
    setIsOption(!isOption);
  };

  const toggleDeleteSprintModal = () => {
    setDeleteSprintModal(!deleteSprintModal);
    setIsOption(false);
  };

  const handleEditSprintModal = () => {
    setEditSprintModal(!editSprintModal);
  };

  const editSprint = () => {
    handleEditSprintModal();
    toggleOptions();
  };

  return (
    <>
      {isLoading && <section>Loading...</section>}
      {noSprint && (
        <section className="dashboard-top__no-sprint">
          <h5 className="dashboard-top__sprint-title--muted">{noSprintMsg}</h5>
          <button className="dashboard-top__btn--create" onClick={createSprint}>
            <LuCalendarPlus /> Create Sprint
          </button>
        </section>
      )}
      {name && (
        <section className="dashboard-top">
          <div className="dashboard-top__title-container" ref={comp}>
            <div className="dashboard-top__title-div">
              <h4 className="dashboard-top__sprint-title">{name}</h4>
              <p className="dashboard-top__issues-title">0 issues</p>
            </div>
            <div className="dashboard-top__title-div--bottom">
              {hasIssues && (
                <button className="dashboard-top__btn--start">
                  <IoIosPlay /> Start sprint
                </button>
              )}

              {!hasIssues && (
                <button className="dashboard-top__btn--disabled">
                  <IoIosPlay /> Start sprint
                </button>
              )}

              <button
                className="dashboard-top__btn--options"
                onClick={toggleOptions}
              >
                {isOption ? <IoCloseOutline /> : <SlOptions />}
              </button>

              {isOption && (
                <ul className="dashboard-top__options-menu" ref={option}>
                  <li
                    className="dashboard-top__options-item"
                    onClick={editSprint}
                  >
                    {" "}
                    <FiEdit3 /> Edit sprint
                  </li>
                  <li
                    className="dashboard-top__options-item"
                    onClick={toggleDeleteSprintModal}
                  >
                    <MdDeleteOutline />
                    Delete sprint
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="dashboard-top__issues-div">
            {hasIssues && <IssueList />}
            {!hasIssues && (
              <div className="dashboard-top__no-issues-container">
                <div className="dashboard-top__no-issues">
                  <div className="dashboard-top__img-div">
                    <img
                      src={plan}
                      alt="Man and woman planning a project in front of a planning board."
                      className="dashboard-top__img"
                    />
                  </div>
                  <div className="dashboard-top__msg">
                    <h5>Planning your sprint</h5>
                    <p className="dashboard-top__p">
                      Agree as a team on what to work needs to be completed and
                      assign these issue to the sprint.
                    </p>
                    <button className="dashboard-top__btn--create"> <IoAddSharp /> Add Issue</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="dashboard-top__estimate-div">
            <h4 className="dashboard-top__estimate">Estimate</h4>
            <span>0</span>
          </div>
        </section>
      )}
      {editSprintModal && (
        <div className="p-details__modal">
          <EditSprintModal
            handleEditSprintModal={handleEditSprintModal}
            name={name}
            sprintNumber={sprintNumber}
          />
        </div>
      )}
      {deleteSprintModal && (
        <div className="p-details__modal">
          <DeleteSprintModal
            name={name}
            sprintNumber={sprintNumber}
            toggleDeleteSprintModal={toggleDeleteSprintModal}
            fetchLastestSprint={fetchLastestSprint}
            setNoSprintMsg={setNoSprintMsg}
            setName={setName}
          />
        </div>
      )}
    </>
  );
};

export default DashboardTop;
