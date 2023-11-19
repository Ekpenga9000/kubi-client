import "./UserDetails.scss";
import { useParams } from "react-router-dom";
import { IoKeyOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import sample from "../../assets/images/sample.png"; 

const UserDetails = () =>{
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
                    <li className="userDetails__item"><FaRegUserCircle/> Profile</li>
                    <li className="userDetails__item"><IoKeyOutline/> Change Password</li>
                </ul>
           </div>
           <div className="userDetails__dashboard">
            user details {id}
           </div>
        </section>
    )
}

export default UserDetails; 