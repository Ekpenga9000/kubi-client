import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { IoAdd } from "react-icons/io5";
import "./AddIssueForm.scss";
import { useParams } from "react-router-dom";

function AddIssueForm({ handleAddIssue, fetchAllIssues }) {
    const url = import.meta.env.VITE_SERVER_URL;
    const { projectId } = useParams();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const summary = e.target.summary.value;
        const type = e.target.type.value;
        const priority = e.target.priority.value;
        
        if (!summary || !type || !priority) {
            return;
        }

        try {   
            const token = sessionStorage.getItem("token"); 
            const newIssue = {
                projectId, 
                summary, 
                type, 
                priority
            }
            
            await axios.post(`${url}/issues`, newIssue, {
                headers: {
                    Authorization: `Bear ${token}`
                }
            })
          e.target.reset(); 
          fetchAllIssues()
        } catch (err) {
            console.log(err);
        }
  };
  return (
    <div className="add-issue__form-div">
      <div className="add-issue__close-div" onClick={() => handleAddIssue()}>
        <AiOutlineClose className="add-issue__close" />
      </div>
      <form className="add-issue__form" onSubmit={handleSubmit}>
        <div className="add-issue__input-container">
          <input
            type="text"
            name="summary"
            className="add-issue__input"
            placeholder="Start typing to create an issue..."
          />
          <select name="type" className="add-issue__select">
            <option value="Task">Task</option>
            <option value="Bug">Bug</option>
            <option value="Epic">Epic</option>
          </select>
          <select name="priority" className="add-issue__select">
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="High">High</option>
          </select>
        </div>
        <button className="add-issue__btn">
          <IoAdd className="add-issue__icon" />
          Create
        </button>
      </form>
    </div>
  );
}

export default AddIssueForm;
