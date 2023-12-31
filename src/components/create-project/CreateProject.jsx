import { useState } from "react";
import "./CreateProject.scss";
import { GoIssueClosed } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProject({ handleModal, handleSuccess, handleAllProjects }) {
  const [startDateErr, setStartDateErr] = useState(false);
  const [endDateErr, setEndDateErr] = useState(false);
  const [formErr, setFormErr] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL;
  const token = sessionStorage.getItem("token"); 
  const navigate = useNavigate();

  if(!token){
    return navigate("/login");
  }

  const getMinStartDate = () => {
    const currentDate = new Date(Date.now());
    return currentDate.toISOString().split("T")[0];
  };

  const getMinEndDate = () => {
    const currentDate = new Date();
    const oneWeekLater = new Date(
      currentDate.setDate(currentDate.getDate() + 7)
    );
    return oneWeekLater.toISOString().split("T")[0];
  };
  const handleStartDateCheck = (e) => {
    const dateEntries = e.target.value;
    if (dateEntries < getMinStartDate()) {
      setStartDateErr(true);
    } else {
      setStartDateErr(false);
    }
  };

  const handleEndDateCheck = (e) => {
    const dateEntries = e.target.value;
    if (dateEntries < getMinEndDate()) {
      setEndDateErr(true);
    } else {
      setEndDateErr(false);
    }
  };

  const handleClick = () => {
    handleModal(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const start_date = e.target.startdate.value;
    const end_date = e.target.enddate.value;
    const status = e.target.status.value;
    const type = e.target.type.value;

    if (
      !name.trim() ||
      !description.trim() ||
      !type.trim() ||
      !start_date ||
      !end_date ||
      !status
    ) {
      setFormErr(true);
      return;
    }

    const proObj = {
      name,
      type, 
      description,
      start_date,
      end_date,
      status,
    };

    try{ 
      await axios.post(`${url}/projects`, proObj, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      handleModal(false);
      handleSuccess();
      handleAllProjects();
      e.target.reset();
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="createProj">
      <form onSubmit={handleSubmit} className="createProj__form">
        <div className="createProj__x-div">
          <AiOutlineClose className="createProj__x" onClick={handleClick} />
        </div>
        <div className="createProj__cntr">
          <label htmlFor="name" className="createProj__label">
            Project Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="createProj__input"
            placeholder="Name of your project..."
          />
        </div>

        <div className="createProj__cntr">
          <label htmlFor="name" className="createProj__label">
            Type of Project
          </label>
          <input
            type="text"
            name="type"
            id="type"
            className="createProj__input"
            placeholder="Ex. Software application development project..."
          />
        </div>

        <div className="createProj__cntr">
          <label htmlFor="description" className="createProj__label">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="createProj__desc"
            placeholder="Write your user story..."
          ></textarea>
        </div>

        {/*  */}
        <div className="createProj__date-cntr">
          <div className="createProj__date-div">
            <label htmlFor="startdate" className="createProj__label">
              Start Date
            </label>
            <input
              type="date"
              name="startdate"
              id="startdate"
              className={`createProj__date${startDateErr ? "--error" : ""}`}
              min={getMinStartDate()}
              onChange={handleStartDateCheck}
            />
          </div>

          <div className="createProj__date-div">
            <label htmlFor="enddate" className="createProj__label">
              End Date
            </label>
            <input
              type="date"
              name="enddate"
              id="enddate"
              min={getMinEndDate()}
              className={`createProj__date${endDateErr ? "--error" : ""}`}
              onChange={handleEndDateCheck}
            />
          </div>

          <div className="createProj__cntr">
            <label htmlFor="status" className="createProj__label">
              Status
            </label>
            <select name="status" id="status" className="createProj__date">
              <option value="active">Active</option>
              <option value="deferred">Deferred</option>
            </select>
          </div>
        </div>
        {startDateErr && <p>You can't start your project before today. </p>}
        {endDateErr && (
          <p>Estimated end date is at least 7 days after Start date. </p>
        )}
        {formErr && (
          <p>Please ensure that the forms are being appropiately filled. </p>
        )}

        <div className="createProj__btn-group">
          <button className="createProj__btn--cancel" onClick={handleClick}>
            <IoIosCloseCircleOutline />
            Cancel
          </button>

          {!startDateErr && !endDateErr && (
            <button className="createProj__btn--create">
              <GoIssueClosed /> Create Project
            </button>
          )}
          {(startDateErr || endDateErr) && (
            <span className="createProj__btn--create">
              <GoIssueClosed /> Create Project
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
