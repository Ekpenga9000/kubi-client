import "./AddSprintIssue.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoCloseSharp, IoAdd } from "react-icons/io5";
import axios from "axios";

const AddSprintIssue = ({ toggleAddSprintModal }) => {
  const url = import.meta.env.VITE_SERVER_URL;
  const token = sessionStorage.getItem("token");
  const { projectId } = useParams();
  const [issuesList, setIssuesList] = useState([]);

  useEffect(() => {
    const fetchAllIssues = async () => {
      try {
        const { data } = await axios.get(`${url}/issues/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIssuesList(data);
        console.log(data);
      } catch (error) {
        console.error;
      }
    };

    fetchAllIssues();
  }, [url, token, projectId]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="add-issues">
      <div
        className="add-issues__cancel-div"
        onClick={() => toggleAddSprintModal()}
      >
        <IoCloseSharp className="add-issues__cancel" />
      </div>
      <form onSubmit={handleOnSubmit} className="add-issues__form">
        <p className="add-issues__p">
          Select the issues your want to add from the list.
        </p>
        <div className="add-issues__checklist">
          {issuesList.map((issue) => (
            <div className="add-issues__check" key={issue.id}>
              <input type="checkbox" name={issue.ticketNumber} id={issue.id} />
              <label htmlFor={issue.id} className="add-issues__issue-title">
                <span className="add-issues__span">{issue.summary}</span>{" "}
                <span className="add-issues__span--ticket">
                  {issue.ticketNumber}
                </span>
              </label>
            </div>
          ))}
        </div>
        <p className="add-issues__p">0 items selected</p>
        <div className="add-issues__btn-div">
          <button className="add-issues__btn--cancel" onClick={()=>toggleAddSprintModal()}><IoCloseSharp />Cancel</button>
          <button className="add-issues__btn--add"><IoAdd /> Add Selected</button>
        </div>
      </form>
    </section>
  );
};

export default AddSprintIssue;

//Get all the issues that have been attached to the project.
//Then which ever is select and added should be taken away from the backlogs and added to the sprint.
//If one is taken away from the sprint list then it should be added back to the backlog.
