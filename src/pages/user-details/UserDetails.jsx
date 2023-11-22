import "./UserDetails.scss";
import { useParams, useNavigate } from "react-router-dom";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import sample from "../../assets/images/sample.png"; 
import { useEffect, useState } from "react";
import UserDetailsForm from "../../components/userDetails-form/UserDetailsForm";
import axios from "axios";

const UserDetails = () =>{
    const [isProfile, setIsProfile] = useState(true);
    const [isPwdChange, setPwdChange] = useState(false);
    const [img, setImg] = useState("");
    const [fullName, setFullName] = useState("John Doe"); 
    const [userEmail, setUserEmail] = useState("john.doe@email.com")
    const [isErr, setErr] = useState(false); 
    const [errMsg, setErrMsg] = useState("false"); 
    
    const {id} = useParams();
    const token = sessionStorage.getItem("token");
    const url = import.meta.env.VITE_SERVER_URL;
    const navigate = useNavigate();

    
    useEffect(()=>{
        if(!id || !token){
            return navigate("/login");
        }
        
        const fetchUser = async () =>{
            try{
                const {data} = await axios.get(`${url}/users/${id}`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
    
                const {firstname, lastname, email, profile_pic} = data.user; 

                setFullName(`${firstname} ${lastname}`);
                setUserEmail(email);
                setImg(profile_pic);
                
            }catch{
                setErr(true);
                setErrMsg("Unable to get user, please reload page."); 
            }
        }
        fetchUser();
    }, [id, token, url, navigate])

    const handleProfile = () =>{
        setIsProfile(true);
        setPwdChange(false);
    }

    const handlePassword = () =>{
        setIsProfile(false);
        setPwdChange(true);
    }

    return(
        <section className="userDetails">
           <div className="userDetails__sidebar">
                <div className="userDetails__persona">
                    <div className="userDetails__img-div">
                        <img src={img ? `${url}/${img}` : sample} alt={fullName}className="userDetails__img"/>
                    </div>
                    <ul className="userDetails__person">
                        <li className="userDetails__user">{fullName}</li>
                        <li className="userDetails__email">{userEmail}</li>
                    </ul>
                </div>
                <ul className="userDetails__menu">
                    <li className={`userDetails__item${isProfile ? "--selected" : ""}`} onClick={handleProfile}><FaRegUserCircle/> Profile</li>
                    <li className={`userDetails__item${isPwdChange ? "--selected" : ""}`} onClick={handlePassword}><IoKeyOutline/> Change Password</li>
                </ul>
           </div>
           <div className="userDetails__dashboard">
            <UserDetailsForm/>
            {isErr && <p>{errMsg}</p>}
           </div>
        </section>
    )
}

export default UserDetails; 