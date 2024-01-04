import "./Issue.scss";
import { FaRegEdit } from "react-icons/fa";
import { GoIssueOpened } from "react-icons/go";
import { FcLowPriority, FcMediumPriority, FcHighPriority } from "react-icons/fc";
import { FaLongArrowAltUp } from "react-icons/fa";

function Issue({ ticketNumber, summary, type, priority, assignee }) {
  return (
    <div className="issue">
      <ul className="issue__menu">
        {type === "Task" && (
          <p className="issue__item">
            {type} <span className="issue__span--task"></span>
          </p>
        )}
        {type === "Bug" && (
          <li className="issue__item">
            {type} <div className="issue__span--bug"></div>
          </li>
        )}
        {type === "Epic" && (
          <li className="issue__item">
           {type} <div className="issue__span--epic"></div>
          </li>
        )}
        <p className="issue__summary">{summary}</p>
        <p className="issue__ticket"> {ticketNumber} </p>
        {priority === "Low" && <li className="issue__item">{priority} <span className="issue__priority--low"><FaLongArrowAltUp /></span></li>}
        {priority === "Medium" && <li className="issue__item">{priority} <span className="issue__priority--medium"><FaLongArrowAltUp /></span></li>}
        {priority === "High" && <li className="issue__item">{priority} <span className="issue__priority--high"><FaLongArrowAltUp /></span></li>}
        </ul>
          
    </div>
  );
}

export default Issue;


{/**
  <div className="issue__topic-div">
        <ul className="issue__ul">
          <li className="issue__ticket">
            <GoIssueOpened />
          </li>
          <li className="issue__ticket">Issue #: {ticketNumber}</li>
        </ul>
        <FaRegEdit className="issue__icon" />
      </div>
 
*/}