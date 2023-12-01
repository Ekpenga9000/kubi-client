import { useState } from "react";
import { Link } from "react-router-dom";
import "./DashboardTop.scss";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { FaRegCirclePlay } from "react-icons/fa6";
import { CiViewBoard } from "react-icons/ci";





const DashboardTop = () => {
    const data = ` Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi enim corporis doloremque porro ullam animi, repudiandae quae vitae ea? Eius magni at ut quis ducimus alias consequuntur maxime quas corrupti.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi enim corporis doloremque porro ullam animi, repudiandae quae vitae ea? Eius magni at ut quis ducimus alias consequuntur maxime quas corrupti.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi enim corporis doloremque porro ullam animi, repudiandae quae vitae ea? Eius magni at ut quis ducimus alias consequuntur maxime quas corrupti.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi enim corporis doloremque porro ullam animi, repudiandae quae vitae ea? Eius magni at ut quis ducimus alias consequuntur maxime quas corrupti.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi enim corporis doloremque porro ullam animi, repudiandae quae vitae ea? Eius magni at ut quis ducimus alias consequuntur maxime quas corrupti.
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi enim corporis doloremque porro ullam animi, repudiandae quae vitae ea? Eius magni at ut quis ducimus alias consequuntur maxime quas corrupti.`
    const [isClicked, setClicked] = useState(false);
    const [descValue, setDescValue] = useState(data);
    const [formDescValue, setFormDescValue] = useState(data);

    const handleClick = () => {
        setClicked(!isClicked);
    }

    const handleDescChange = e => {
        setFormDescValue(e.target.value.trim());
    }

    const handleFormCancel = e => {
        e.preventDefault();
        const str = descValue;
        setFormDescValue(str);
        setClicked(!isClicked);
    }

    const handleSave = () => {
        const newWord = formDescValue;
        setDescValue(newWord);
        setClicked(false);
    }
    return (
        <div className="dashboard-top">
            <div className="dashboard-top__sprint">
                <div className="dashboard-top__sprint--active">
                    <Link className="dashboard-top__btn--link"><CiViewBoard /> View All Sprints</Link>
                    <button className="dashboard-top__btn--start"> <FaRegCirclePlay /> Start Sprint
                    </button>
                </div>
                <div className="dashboard-top__issue-div">
                    <ul className="dashboard-top__issue-header">
                        <li className="dashboard-top__title">Issue number</li>
                        <li className="dashboard-top__title">Type</li>
                        <li className="dashboard-top__title">Title</li>
                        <li className="dashboard-top__title">Story</li>
                        <li className="dashboard-top__title">Creator</li>
                        <li className="dashboard-top__title">Assignee</li>
                        <li className="dashboard-top__title">Action</li>
                    </ul>
                </div>
                <div className="dashboard-top__issue-div--bottom">
                    <ul className="dashboard-top__issue-header">
                        <li className="dashboard-top__item">Issue number</li>
                        <li className="dashboard-top__item">Story</li>
                        <li className="dashboard-top__item">Title</li>
                        <li className="dashboard-top__item">8</li>
                        <li className="dashboard-top__item">Leslie Addamms</li>
                        <li className="dashboard-top__item">Israel Dalemwa</li>
                        <li className="dashboard-top__item">Action</li>
                    </ul>
                </div>
            </div>
            <div className="dashboard-top__desc">
                <div className="dashboard-top__edit-div">
                    <h3 className="dashboard-top__title">Description</h3>
                    {!isClicked && <FiEdit className="dashboard-top__edit" onClick={handleClick} />}
                    {isClicked && <MdOutlineCancel className="dashboard-top__cancel" onClick={handleClick} />}
                </div>
                <div className="dashboard-top__text-div">
                    {!isClicked && <p className="dashboard-top__text">
                        {descValue}
                    </p>}
                    {isClicked && <form className="dashboard-top__form">
                        <textarea name="description" value={formDescValue} onChange={handleDescChange} className="dashboard-top__text-area"></textarea>
                        <div className="dashboard-top__btn-div">
                            <button onClick={handleFormCancel} className="dashboard-top__btn--cancel"><MdOutlineCancel />Cancel</button>
                            <button onClick={handleSave} className="dashboard-top__btn--save"><FiSave />Save</button>
                        </div>
                    </form>}
                </div>
            </div>
        </div>
    )
}

export default DashboardTop; 