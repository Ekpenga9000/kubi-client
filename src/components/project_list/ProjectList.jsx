import { useLayoutEffect, useRef, useState } from "react";
import DeleteProjectModal from "../deleteProjectModal/DeleteProjectModal";
import Project from "../project/Project";
import "./ProjectList.scss";


function ProjectList({ projectList }) {
  const [isDeleteModal, setIsDeleteModal] = useState(false); 
  const [selectedProject, setSelectedProject] = useState({}); 
  

  const activateDeleteModal = (id, name) => {
    setIsDeleteModal(true); 
    setSelectedProject({ id, name });
  }

  const deactivateDeleteModal = () => {
    setIsDeleteModal(false); 
  }

  return (
    <div className="projectList">
      <div className="projectList__title-div">
        <div className="projectList__cell">
          <h3 className="projectList__title">Name</h3>
        </div>
        <div className="projectList__cell">
          <h3 className="projectList__title">Key</h3>
        </div>
        <div className="projectList__cell">
          <h3 className="projectList__title">Type</h3>
        </div>
        <div className="projectList__cell">
          <h3 className="projectList__title">Lead</h3>
        </div>
        <div className="projectList__cell">
          <h3 className="projectList__title">Status</h3>
        </div>
        <h3 className="projectList__title">Actions</h3>
      </div>
      {projectList &&
        projectList.map((project) => {
          return <Project project={project} key={project.id} activateDeleteModal={activateDeleteModal} />;
        })}
      {isDeleteModal && <div className="projectList__modal"> 
        <DeleteProjectModal selectedProject={selectedProject} deactivateDeleteModal={deactivateDeleteModal} />
      </div>}
    </div>
  );
}

export default ProjectList;
