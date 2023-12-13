import "./DashboardBottom.scss";
import { IoAdd } from "react-icons/io5";
import { LiaCubesSolid } from "react-icons/lia";
import { MdOutlineNotes, MdOutlinePlaylistAdd } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { BiTaskX } from "react-icons/bi";
import { useState } from "react";
import IssueList from "../issue-list/IssueList";

const DashboardBottom = () => {
  const [addIssue, setAddIssue] = useState(false);
  const [issueLength, setIssueLength] = useState(1);

  const handleAddIssue = () => {
    setAddIssue(!addIssue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const issue = e.target.issue.value;
    const type = e.target.type.value;
    const priority = e.target.priority.value;
    handleAddIssue();
    alert(issue);
    alert(type);
    alert(priority);
  };

  return (
    <section className="dashboard-bottom">
      <div className="dashboard-bottom__container">
        <div className="dashboard-bottom__left">
          <h3 className="dashboard-bottom__title">
            <LiaCubesSolid />
            Backlogs
          </h3>
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
                <IssueList />
              </div>
            )}
          </div>
          {!addIssue && (
            <button
              className="dashboard-bottom__btn--create"
              onClick={handleAddIssue}
            >
              <IoAdd /> Add Issue
            </button>
          )}
          {addIssue && (
            <div className="dashboard-bottom__form-div">
              <div
                className="dashboard-bottom__close-div"
                onClick={handleAddIssue}
              >
                <AiOutlineClose className="dashboard-bottom__close" />
              </div>
              <form className="dashboard-bottom__form" onSubmit={handleSubmit}>
                <div className="dashboard-bottom__input-container">
                  <input
                    type="text"
                    name="issue"
                    className="dashboard-bottom__input"
                    placeholder="Start typing to create an issue..."
                  />
                  <select name="type" className="dashboard-bottom__select">
                    <option value="Task">Task</option>
                    <option value="Bug">Bug</option>
                    <option value="Epic">Epic</option>
                                  </select>
                                  <select name="priority" className="dashboard-bottom__select">
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <button className="dashboard-bottom__btn">
                  <IoAdd className="dashboard-bottom__icon" />
                  Create
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="dashboard-bottom__notes-div">
          <div className="dashboard-bottom__note-title-div">
            <h4 className="dashboard-bottom__note-title">
              <MdOutlineNotes />
              Notes
            </h4>
            <MdOutlinePlaylistAdd className="dashboard-bottom__note-icon" />
          </div>
          <div className="dashboard-bottom__note-list"></div>
        </div>
      </div>
    </section>
  );
};

export default DashboardBottom;
