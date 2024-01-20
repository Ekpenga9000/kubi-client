import { useLayoutEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircleOutline, IoIosArchive } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import gsap from "gsap";
import axios from "axios"; 
import "../deleteProjectModal/DeleteProjectModal.scss"
import { useParams } from "react-router-dom";

const DeleteSprintModal = ({name, sprintNumber, toggleDeleteSprintModal, fetchLastestSprint, setNoSprintMsg, setName}) =>{
    const theModal = useRef();
    const comp = useRef();
    const { projectId } = useParams(); 

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
  
    // const { id, name } = selectedProject;
    const handleCancel = () => {
      toggleDeleteSprintModal();
    };
  
    const handleDelete = async() => {
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        const token = sessionStorage.getItem("token"); 
        await axios.delete(`${url}/sprints/${projectId}/${sprintNumber}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          setName("");
          fetchLastestSprint(); 
          setNoSprintMsg("Sprint has been deleted.")
        toggleDeleteSprintModal();
      } catch (err) {
        console.log("The error", err);
      }
    };
  

  
    return (
      <section className="delete-m" ref={comp}>
        <div className="delete-m__container" ref={theModal}>
          <div className="delete-m__icon-div">
            <IoClose className="delete-m__icon" onClick={handleCancel} />
          </div>
            <h3 className="delete-m__title">Do you want to {name }?</h3>
          <p className="delete-m__text">If you proceed, this sprint would be deleted permanently.</p>
          <div className="delete-m__btn-div">
            <button className="delete-m__btn--cancel" onClick={handleCancel}>
              <IoIosCloseCircleOutline /> Cancel
            </button>

            <button className="delete-m__btn--delete" onClick={handleDelete}>
              <MdDeleteOutline />
              Delete
            </button>
          </div>
        </div>
        </section>
    )
}

export default DeleteSprintModal