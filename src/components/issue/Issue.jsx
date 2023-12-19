import "./Issue.scss";
import { FaRegEdit } from "react-icons/fa";
import { GoIssueOpened } from "react-icons/go";
import { FcLowPriority, FcMediumPriority, FcHighPriority } from "react-icons/fc";

function Issue({ ticketNumber, summary, type, priority, assignee }) {
  return (
    <div className="issue">
      <div className="issue__topic-div">
        <ul className="issue__ul">
          <li className="issue__ticket">
            <GoIssueOpened />
          </li>
          <li className="issue__ticket">Issue #: {ticketNumber}</li>
        </ul>
        <FaRegEdit className="issue__icon" />
      </div>
      <p className="issue__summary">{summary}</p>
      <ul className="issue__menu">
        {type === "Task" && (
          <li className="issue__item">
            Type: {type} <div className="issue__span--task"></div>
          </li>
        )}
        {type === "Bug" && (
          <li className="issue__item">
            Type: {type} <div className="issue__span--bug"></div>
          </li>
        )}
        {type === "Epic" && (
          <li className="issue__item">
            Type: {type} <div className="issue__span--epic"></div>
          </li>
        )}
        {priority === "Low" && <li className="issue__item">Priority: {priority} <FcLowPriority /></li>}
        {priority === "Medium" && <li className="issue__item">Priority: {priority} <FcMediumPriority /></li>}
        {priority === "High" && <li className="issue__item">Priority: {priority} <FcHighPriority /></li>}
        </ul>
          
    </div>
  );
}

export default Issue;
