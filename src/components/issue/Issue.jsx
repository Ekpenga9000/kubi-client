import "./Issue.scss";
import { IoIosBookmark } from "react-icons/io";
import { FaBug, FaCheck, FaBolt } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";

function Issue({ ticketNumber, summary, type, priority, assignee }) {
  return (
    <section className="issue">
      <div className="issue__menu">
        <div className="issue__div">
          {type === "Story" && (
            <div className="issue__item">
              <div className="issue__span--story">
                <IoIosBookmark />
              </div>
            </div>
          )}
          {type === "Task" && (
            <div className="issue__item">
              <div className="issue__span--task">
                <FaCheck />
              </div>
            </div>
          )}
          {type === "Bug" && (
            <div className="issue__item">
              <div className="issue__span--bug">
                <FaBug />
              </div>
            </div>
          )}
          {type === "Epic" && (
            <div className="issue__item">
              <div className="issue__span--epic">
                <FaBolt />
              </div>
            </div>
          )}
          <p className="issue__summary">{summary}</p>
        </div>
        <div className="issue__div">
          <p className="issue__ticket"> {ticketNumber} </p>
        </div>
        {!assignee && (
          <div className="issue__div">
            <p className="issue__ticket">Unassigned</p>
          </div>
        )}
        {assignee && (
          <div className="issue__div">
            <p className="issue__assignee">{assignee}</p>
          </div>
        )}
        {priority === "Low" && (
          <div className="issue__div">
            <div className="issue__item">
              {priority}{" "}
              <span className="issue__priority--low">
                <FaLongArrowAltUp />
              </span>
            </div>
          </div>
        )}
        {priority === "Medium" && (
          <div className="issue__div">
            <div className="issue__item">
              {priority}{" "}
              <span className="issue__priority--medium">
                <FaLongArrowAltUp />
              </span>
            </div>
          </div>
        )}
        {priority === "High" && (
          <div className="issue__div">
            <div className="issue__item">
              {priority}{" "}
              <span className="issue__priority--high">
                <FaLongArrowAltUp />
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Issue;

{
  /**
  <div className="issue__topic-div">
        <ul className="issue__ul">
          <li className="issue__ticket">
            <GoIssueOpened />
          </li>
          <li className="issue__ticket">Issue #: {ticketNumber}</li>
        </ul>
        <FaRegEdit className="issue__icon" />
      </div>
 
*/
}
