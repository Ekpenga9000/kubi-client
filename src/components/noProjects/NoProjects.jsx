import React from "react";
import "./NoProjects.scss";
import { FcOpenedFolder } from "react-icons/fc";

function NoProjects({ handleModal }) {

  const handleClick = () => {
    handleModal(true);
  }

  return (
    <div className="noproject">
      <div className="noproject__container">
        <h2 className="noproject__title">You haven't started any project</h2>
        <div className="noproject__folder-div">
          <div className="noproject__link" onClick={handleClick}>
            <FcOpenedFolder className="noproject__folder" />
            <span className="noproject__text"> Start a new Project</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoProjects;
