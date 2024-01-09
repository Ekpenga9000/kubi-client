import { useLayoutEffect, useRef, useState } from "react";
import DeleteProjectModal from "../deleteProjectModal/DeleteProjectModal";
import Project from "../project/Project";
import "./ProjectList.scss";
import deleted from "../../assets/images/deleted.gif";
import archived from "../../assets/images/archived.gif";
import SuccessModal from "../successModal/SuccessModal";

function ProjectList({ projectList, fetchProjects }) {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isSuccessModal, setSuccessModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [successModalMsg, setSuccessModalMsg] = useState("");
  const [gif, setGif] = useState("");

  const activateDeleteModal = (id, name) => {
    setIsDeleteModal(true);
    setSelectedProject({ id, name });
  };

  const deactivateDeleteModal = () => {
    setIsDeleteModal(false);
  };

  const closeSuccessModal = () => {
    setTimeout(() => {
      setSuccessModal(false);
    }, 2000);
  };

  const handleDeletedProjects = () => {
    setSuccessModalMsg("Project has been deleted successfully 🗑️.");
    setGif(deleted);
    deactivateDeleteModal();
    setSuccessModal(true);
    fetchProjects();
    closeSuccessModal();
  };

  const handleArchivedProjects = () => {
    setSuccessModalMsg("Project has been archived successfully 📂.");
    setGif(archived);
    deactivateDeleteModal();
    setSuccessModal(true);
    fetchProjects();
    closeSuccessModal();
    fetchProjects();
    closeSuccessModal();
  };

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
          return (
            <Project
              project={project}
              key={project.id}
              activateDeleteModal={activateDeleteModal}
            />
          );
        })}
      {isDeleteModal && (
        <div className="projectList__modal">
          <DeleteProjectModal
            selectedProject={selectedProject}
            deactivateDeleteModal={deactivateDeleteModal}
            handleDeletedProjects={handleDeletedProjects}
            handleArchivedProjects={handleArchivedProjects}
          />
        </div>
      )}
      {isSuccessModal && (
        <div className="projectList__modal">
          <SuccessModal msg={successModalMsg} gif={gif} />
        </div>
      )}
    </div>
  );
}

export default ProjectList;
