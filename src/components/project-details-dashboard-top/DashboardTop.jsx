import { useState, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./DashboardTop.scss";
import { SlOptions } from "react-icons/sl";
import { IoIosPlay } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { FaRegCirclePlay } from "react-icons/fa6";
import { CiViewBoard } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import IssueList from "../issue-list/IssueList";
import plan from "../../assets/images/plan.png";
import gsap from "gsap";

const DashboardTop = ({handleEditSprintModal}) => {
    const [hasIssues, setHasIssues] = useState(false);
    const [isOption, setIsOption] = useState(false);
    const option = useRef(); 
    const comp = useRef(); 

    useLayoutEffect(() => {
        let ctx = gsap.context(() => { 
            gsap.from(option.current, {
                duration: 0.4, 
                scale: 0, 
                opacity: 0, 
                ease:"power1.in"
            })
        }, comp); 
        return () => ctx.revert(); 
    }, [])

    const toggleOptions = () => {
        setIsOption(!isOption);
    }

    const editSprint = () => {
        handleEditSprintModal();
        toggleOptions();
    }

  return (
    <section className="dashboard-top">
      <div className="dashboard-top__title-container">
        <div className="dashboard-top__title-div">
          <h4 className="dashboard-top__sprint-title">SP Sprint 1</h4>
          <p className="dashboard-top__issues-title">0 issues</p>
        </div>
        <div className="dashboard-top__title-div--bottom" ref={comp}>
          {hasIssues && <button className="dashboard-top__btn--start">
            <IoIosPlay /> Start sprint
          </button> }
          
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
    </section>
  );
};

export default DashboardTop;
