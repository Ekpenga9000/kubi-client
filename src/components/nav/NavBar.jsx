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
    const [userInfo, setUserInfo] = useState(null); 
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");
    const url = import.meta.env.VITE_SERVER_URL;

    useEffect(()=>{
        const fetchUser = async () =>{
            if(!id || !token){
                return navigate("/login");
            }

            try{
                const response = await axios.get(`${url}/users/${id}`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }); 
                const {data} = response;
                setUserInfo(data.user);
            }catch(err){
                console.log(err);
            }
        }

        fetchUser();
    },[url, navigate, id, token])

    const handleRedirect = () =>{
        return navigate("/projects");
    }

    const handlePersonalSettingsNav = () =>{
        setIsDropdown(false);
        return navigate(`/users/${id}`);
    }

    const handleClick = () => {
        navigate("/projects");
        handleModal(true);
    }

    const handleDropdown = () =>{
        setIsDropdown(!isDropdown);
    }

    const handleLogout = () =>{
        sessionStorage.clear();
        return navigate("/login");
    }
    if(!userInfo){
       return <>Loading ...</>
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
                        <li className="nav__dropdown-item" onClick={handlePersonalSettingsNav}>{`${userInfo.firstname} ${userInfo.lastname}` || "John Doe"}</li>
                        <li className="nav__dropdown-item" onClick={handlePersonalSettingsNav}>{`${userInfo.email}` || "john.doe@email.com"}</li>
                    </ul>
                </div>
                <ul className="nav__section">
                    <li className="nav__section-item" onClick={handlePersonalSettingsNav}>Personal Settings</li>
                    <li className="nav__section-item" onClick={handleLogout}>Log out</li>
                </ul>
            </div>}
        </nav>
    )
}
export default NavBar; 