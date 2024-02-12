import "./Project.scss";
import { Link } from "react-router-dom";
import { AiFillFolderOpen, AiFillFolder } from "react-icons/ai";
import { LuFolderEdit } from "react-icons/lu";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { TbTrashOff, TbTrash } from "react-icons/tb";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Project = ({project, activateDeleteModal }) => {
  
  const {
    id,
    name,
    project_number,
    type,
    project_lead,
    lead_id,
    status,
    permission,
  } = project;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id }); 
  
  const style = {
    transition, 
    transform: CSS.Transform.toString(transform),
  };

  const handleDeleteModal = () => {
    activateDeleteModal(id, name);
  };
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length);
  };

  return (
    <div className="project" ref={setNodeRef} {...attributes} {...listeners} style={ style }>
      <div className="project__row">
        <div className="project__cell">
          <Link to={`/projects/${id}`} className="project__title">
            {name}
          </Link>
        </div>
        <div className="project__cell">
          <p className="project__key">{project_number}</p>
        </div>
        <div className="project__cell">
          <p>{type}</p>
        </div>
        <div className="project__cell">
          <Link to={`/teams/${lead_id}`}>{project_lead}</Link>
        </div>
        <div className="project__cell">
          <p className={`project__status--${status.toLowerCase()}`}>
            {" "}
            {status === "active" ? <AiFillFolderOpen /> : <AiFillFolder />}{" "}
            {capitalize(status)}
          </p>
        </div>
        {permission === "admin" && (
          <div className="project__btn-div">
            <Link to={`/projects/edit/${id}`} className="project__link">
              <LuFolderEdit />
            </Link>
            <TbTrash className="project__delete" onClick={handleDeleteModal} />
          </div>
        )}
        {permission !== "admin" && (
          <div className="project__btn-div">
            <Link to={`/projects/${id}`} className="project__link">
              <MdOutlineMoreHoriz />
            </Link>
            <TbTrashOff className="project__delete" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;
