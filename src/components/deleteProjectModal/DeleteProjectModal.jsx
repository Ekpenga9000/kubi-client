import "./DeleteProjectModal.scss";
import { useLayoutEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircleOutline, IoIosArchive } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import gsap from "gsap";
import axios from "axios"; 

function DeleteProjectModal({ selectedProject, deactivateDeleteModal, handleDeletedProjects, handleArchivedProjects }) {
  const theModal = useRef();
  const comp = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(theModal.current, {
        scale: 0,
        duration: 0.4,
        opacity: 0,
        ease: "power1.in",
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  const { id, name } = selectedProject;
  const handleCancel = () => {
    deactivateDeleteModal();
  };

  const handleDelete = async() => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const token = sessionStorage.getItem("token"); 
      await axios.delete(`${url}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    
      handleDeletedProjects();
    } catch (err) {
      console.log("The error", err);
    }
  };

  const handleArchive = async () => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const token = sessionStorage.getItem("token"); 
      await axios.patch(`${url}/projects/`, {
        id, 
        archived: "true"
      } ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      handleArchivedProjects();
    } catch (err) {
      console.log(err); 
    }
  }

  return (
    <section className="delete-m" ref={comp}>
      <div className="delete-m__container" ref={theModal}>
        <div className="delete-m__icon-div">
          <IoClose className="delete-m__icon" onClick={handleCancel} />
        </div>
        <h3 className="delete-m__title">Do you want to delete this project?</h3>
        <p className="delete-m__text">{name}</p>
        <div className="delete-m__btn-div">
          <button className="delete-m__btn--cancel" onClick={handleCancel}>
            <IoIosCloseCircleOutline /> Cancel
          </button>

          <button className="delete-m__btn--archive" onClick={handleArchive}>
            <IoIosArchive /> Archive
          </button>

          <button className="delete-m__btn--delete" onClick={handleDelete}>
            <MdDeleteOutline />
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeleteProjectModal;
