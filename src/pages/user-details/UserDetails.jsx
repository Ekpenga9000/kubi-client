import "./UserDetails.scss";
import { useParams } from "react-router-dom";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import sample from "../../assets/images/sample.png"; 
import { useState } from "react";
import UserDetailsForm from "../../components/userDetails-form/UserDetailsForm";

const UserDetails = () =>{
    const [isProfile, setIsProfile] = useState(true);
    const [isPwdChange, setPwdChange] = useState(false);

    const handleProfile = () =>{
        setIsProfile(true);
        setPwdChange(false);
    }

    const handlePassword = () =>{
        setIsProfile(false);
        setPwdChange(true);
    }

    const {id} = useParams();
    return(
        <section className="userDetails">
           <div className="userDetails__sidebar">
                <div className="userDetails__persona">
                    <div className="userDetails__img-div">
                        <img src={sample} alt="Sample user images" className="userDetails__img"/>
                    </div>
                    <ul className="userDetails__person">
                        <li className="userDetails__user">John Doe</li>
                        <li className="userDetails__email">john.doe@gmail.com</li>
                    </ul>
                </div>
                <ul className="userDetails__menu">
                    <li className={`userDetails__item${isProfile ? "--selected" : ""}`} onClick={handleProfile}><FaRegUserCircle/> Profile</li>
                    <li className={`userDetails__item${isPwdChange ? "--selected" : ""}`} onClick={handlePassword}><IoKeyOutline/> Change Password</li>
                </ul>
           </div>
           <div className="userDetails__dashboard">
            <UserDetailsForm/>
           </div>
        </section>
    )
}

export default UserDetails; 