import "./Registration.scss";
import { useNavigate } from "react-router-dom";

const Registration = ({ handleSignup }) => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_SERVER_URL;

  const handleClick = (e) => {
    handleSignup(e);
    navigate("/login");
  }

  return (
    <form className='auth__form'>
    <div>
    <h3 className="auth__form-title">Register</h3>
      <div className="auth__input-div">
        <input type="email" name="email" placeholder='Email address..' className='auth__input' />
      </div>
     {/* {!isPassword && <p className="auth__err">*** Password is required ***</p> } */}
      <div className="auth__btn-div">
        <button className='auth__btn--alternate' onClick={handleClick}>Login</button>
        <button className='auth__btn'>Sign up</button>
      </div>
    </div>
  </form>
  )
}

export default Registration