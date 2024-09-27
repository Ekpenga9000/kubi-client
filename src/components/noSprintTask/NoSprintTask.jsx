import "./NoSprintTask.scss";
import { IoAddSharp } from "react-icons/io5";
import plan from "../../assets/images/plan.png";

const NoSprintTask = ({toggleAddSprintModal}) => {
  return (
    <div className="no-sprint-task">
      <div className="no-sprint-task__img-div">
        <img
          src={plan}
          alt="Man and woman planning a project in front of a planning board."
          className="no-sprint-task__img"
        />
      </div>
      <div className="no-sprint-task__msg">
        <h5>Planning your sprint</h5>
        <p className="no-sprint-task__p">
          Agree as a team on what to work needs to be completed and assign these
          issue to the sprint.
        </p>
        <button className="no-sprint-task__btn" onClick={()=>toggleAddSprintModal()}>
          {" "}
          <IoAddSharp /> Add Issue
        </button>
      </div>
    </div>
  );
};

export default NoSprintTask;
