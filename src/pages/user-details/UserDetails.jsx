import "./UserDetails.scss";
import { useParams } from "react-router-dom";
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
                    <li className="userDetails__item">Point 1</li>
                    <li className="userDetails__item">Point 2</li>
                    <li className="userDetails__item">Point 3</li>
                    <li className="userDetails__item">Point 4</li>
                </ul>
           </div>
           <div className="userDetails__dashboard">
            user details {id}
           </div>
        </section>
    )
}

export default UserDetails; 