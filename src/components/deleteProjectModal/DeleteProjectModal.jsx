import "./DeleteProjectModal.scss";
import { useLayoutEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import gsap from "gsap";

function DeleteProjectModal({ selectedProject, deactivateDeleteModal }) {
  const theModal = useRef();
  const comp = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(theModal.current, {
        scaleX: 0,
        scaleY: 0,
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

  const handleDelete = () => {
    alert("This project has been deleted");
  };

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
