import sample from "../../assets/images/sample.png";
import axios from "axios";
import { BiSearch } from 'react-icons/bi';
import { AiOutlineTeam, AiOutlineSetting } from 'react-icons/ai';
import { BiCabinet } from 'react-icons/bi';
import { BsFolderPlus } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { useEffect, useState } from "react";

const NavBar = ({ handleModal }) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const [userInfo, setUserInfo] = useState({}); 
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");
    const url = "http://localhost:8080"
    useEffect(()=>{
        const fetchUser = async () =>{
            if(!id || !token){
                console.log("Please login");
            }

            try{
                const {data} = await axios.get(`http://localhost:8080/users/${id}`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }); 

                setUserInfo(data.user);
            }catch(err){
                console.log(err);
            }
        }

        fetchUser();
    },[id, token])

    const handleRedirect = () =>{
        return navigate("/projects");
    }

    const handleClick = () => {
        navigate("/projects");
        handleModal(true);
    }

    const handleDropdown = () =>{
        setIsDropdown(!isDropdown);
    }

    return (
        <nav className="nav">
            <div className="nav__cntr-1">

                <h3 className="nav__logo">kubI</h3>

                <div className="nav__search-div">
                    <BiSearch/>
                    <input type="search" className="nav__search" />
                </div>
                <ul className="nav__menu">
                    <li className="nav__list--project" onClick={handleRedirect}><BiCabinet/> Projects</li>
                    <li className="nav__list--team"><AiOutlineTeam/> Teams</li>
                    <li className="nav__list--create" onClick={handleClick}><BsFolderPlus/> New Project</li>
                </ul>
            </div>
            <div className="nav__cntr-2">
                <div className="nav__list--setting">
                  <AiOutlineSetting/>  Settings
                </div>
                <div className="nav__img-div" onClick={handleDropdown}>
                    <img src={`${url}/${userInfo.profile_pic}` || sample} alt={`${userInfo.firstname} ${userInfo.lastname}` || "Sample user profile pic"} className="nav__img" />
                </div>
            </div>
          {isDropdown &&  <div className="nav__account">
                <div className="nav__dropdown">
                    <div className="nav__img-div">
                        <img src={`${url}/${userInfo.profile_pic}` || sample} alt={`${userInfo.firstname} ${userInfo.lastname}` || "Sample user profile pic"} className="nav__img"/>
                    </div>
                    <ul className="nav__dropdown-menu">
                        <li className="nav__dropdown-item">{`${userInfo.firstname} ${userInfo.lastname}` || "John Doe"}</li>
                        <li className="nav__dropdown-item">{`${userInfo.email}` || "john.doe@email.com"}</li>
                    </ul>
                </div>
                <ul className="nav__section">
                    <li className="nav__section-item">Personal Settings</li>
                    <li className="nav__section-item">Log out</li>
                </ul>
            </div>}
        </nav>
    )
}
export default NavBar; 