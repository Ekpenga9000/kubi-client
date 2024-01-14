import React from "react";
import "./EditSprintModal.scss";
import { useLayoutEffect, useRef } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import gsap from "gsap";

function EditSprintModal({ handleEditSprintModal }) {
  const modal = useRef();
  const comp = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(modal.current, {
        scale: 0, 
        duration: 0.4, 
        opacity: 0,
        ease:"power1.out"
      });
    }, comp);

    return () => ctx.revert();
  }, [])

  return (
    <section ref={comp}>
      <div className="edit-sprint" ref={modal}>
        <form className="edit-sprint__form" onSubmit={handleSubmit}>
          <h3 className="edit-sprint__header">Edit sprint: CS Sprint 1</h3>
          <div className="edit-sprint__div">
            <label htmlFor="sprint_name" className="edit-sprint__label">
              Sprint name:
            </label>
            <input
              type="text"
              id="sprint_name"
              className="edit-sprint__input"
            />
          </div>
          <div className="edit-sprint__div">
            <label htmlFor="" className="edit-sprint__label">
              Duration:
            </label>
            <select
              name="sprint-select"
              id="edit-sprint__select"
              className="edit-sprint__input"
            >
              <option value="">Custom</option>
              <option value="">1 week</option>
              <option value="">2 weeks</option>
              <option value="">3 weeks</option>
              <option value="">1 month</option>
            </select>
          </div>
          <div className="edit-sprint__div">
            <label htmlFor="sprint-start-date" className="edit-sprint__label">
              Start date:
            </label>
            <input
              type="date"
              name="start-date"
              id="sprint-start-date"
              className="edit-sprint__input"
            />
          </div>
          <div className="edit-sprint__div">
            <label htmlFor="sprint-end-date" className="edit-sprint__label">
              End date:
            </label>
            <input
              type="date"
              name="end-date"
              id="sprint-end-date"
              className="edit-sprint__input"
            />
          </div>
          <div className="edit-sprint__div">
            <label htmlFor="sprint-textarea" className="edit-sprint__label">
              Sprint goal:
            </label>
            <textarea
              name="textarea"
              id="sprint-textarea"
              className="edit-sprint__textarea"
            ></textarea>
          </div>
          <div className="edit-sprint__btn-div">
            <button
              className="edit-sprint__btn--cancel"
              onClick={() => handleEditSprintModal()}
            >
              <MdOutlineCancel />
              Cancel
            </button>
            <button className="edit-sprint__btn--update">
              <GrUpdate /> Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditSprintModal;
