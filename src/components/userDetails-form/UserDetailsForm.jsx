import { useNavigate } from "react-router-dom";
import "./UserDetailsForm.scss";
import { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";

const UserDetailsForm = () => {
    const [formDetails, setFormDetails] = useState(null);
    const [isErr, setIsErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddy, setEmailAddy] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [editImg, setEditImg] = useState(false); 
    const [isUpdated, setIsUpdated] = useState(false);

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
                const {data} = await axios.get(`${url}/users/${id}`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                
                const {user} = data;
                const {firstname, lastname, profile_pic, email} = user; 
                setFormDetails(user);
                setFirstName(firstname);
                setLastName(lastname);
                setProfilePic(profile_pic);
                setEmailAddy(email);
            }catch{
                setIsErr(true);
            }
        }
        
        fetchUser();
    },[url, navigate, id, token])
    
    const handleFormReset = (e) => {
        e.preventDefault();
        const {firstname, lastname, profile_pic, email} = formDetails;
        setFirstName(firstname);
        setLastName(lastname);
        setProfilePic(profile_pic); 
        setEmailAddy(email);
        setErrMsg("");
        setIsErr(false);
    }
    
    if(!formDetails){
        return <>Loading...</>
    }
    
    const validateEmail = (email) => {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return regex.test(email);
    }
    
    const handleChange = e =>{
        if(e.target.name === "firstname"){
            setFirstName(e.target.value); 
        }else if(e.target.name === "lastname"){
            setLastName(e.target.value);
        }else if(e.target.name === "email"){
            setEmailAddy(e.target.value);
        }
    }
    
    const handleEditPhoto = () =>{
        setEditImg(!editImg);
    }

    const displaySuccess = () =>{
        setIsErr(false);
        setIsUpdated(true); 

        setTimeout(()=>{
            setIsUpdated(false); 
            navigate(0);
        }, 3000)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!firstName.trim() || !lastName.trim() || !emailAddy.trim() || !profilePic.trim()){
            setIsErr(true);
            setErrMsg("Please fill all fields.")
        }

        const isEmail = validateEmail(emailAddy.trim()); 

        if(!isEmail){
            setIsErr(true);
            setErrMsg("Invalid email address.")
        }

        try{
            await axios.put(`${url}/users/`, {
                firstname: firstName,
            lastname: lastName,
            email : emailAddy,
            profile_pic : profilePic
            }, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const {data} = await axios.get(`${url}/users/${id}`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                
                const {user} = data;
                const {firstname, lastname, profile_pic, email} = user; 
                setFormDetails(user);
                setFirstName(firstname);
                setLastName(lastname);
                setProfilePic(profile_pic);
                setEmailAddy(email);

                displaySuccess();
        }catch(err){
            console.log(err);
            setIsErr(true); 
            setErrMsg("Unable to carry out your request.")
        }

    }

    return (
        <form onSubmit={handleSubmit} className="userDetailsForm">
           {!editImg && <p className="userDetailsForm__edit" onClick={handleEditPhoto}>Edit Profile picture <MdOutlineModeEdit /></p>}
           { editImg && <div className="userDetailsForm__edit-div">
                <div className="userDetailsForm__close-div">
                <span onClick={handleEditPhoto} className="userDetailsForm__close"> X </span>
                </div>
                <div className="userDetailsForm__img-div">
                <img src={`${url}/${profilePic}`} alt={`${firstName} ${lastName}`} className="userDetailsForm__img" />
                </div>
                <input type="file" className="userDetailsForm__file"/>
            </div> 
            }
            <div className="userDetailsForm__form-div">
                <div className="userDetailsForm__div">
                    <label htmlFor="firstname" className="userDetailsForm__label">First name</label>
                    <input type="text" name="firstname" id="firstname" className="userDetailsForm__input" value={firstName}
                    onChange={handleChange}/>
                </div>
                <div className="userDetailsForm__div">
                    <label htmlFor="lastname" className="userDetailsForm__label">Last name</label>
                    <input type="text" name="lastname" id="lastname" className="userDetailsForm__input" value={lastName} 
                    onChange={handleChange}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="userDetailsForm__label">Email address</label>
                <input type="text" name="email" className="userDetailsForm__input--email" value={emailAddy} 
                onChange={handleChange}
                />
            </div>

            <div className="userDetailsForm__btn-div">
                <button onClick={handleFormReset} className="userDetailsForm__btn--cancel">Reset</button>
                <button className="userDetailsForm__btn--save">Save Changes</button>
            </div>

            {isErr && <p className="userDetailsForm__err"><FaCircleExclamation />      {errMsg}</p>}

            {isUpdated && <p className="userDetailsForm__success">Details updated successfully <FaCheckCircle /></p>}
        </form>
    )
}

export default UserDetailsForm;