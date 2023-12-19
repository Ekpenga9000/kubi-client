import "../../pages/auth/Authentication.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Login = ({ handleSignup, handleNav }) => {
  const url = import.meta.env.VITE_SERVER_URL;

  const [isVisible, setIsVisible] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);

  const navigate = useNavigate();

  const handleInVisible = () => {
    setIsVisible(false);
  };
  const handleVisible = () => {
    setIsVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.pwd.value;

    if (!email.trim()) {
      setIsEmail(false);
      return;
    }
    if (!password.trim()) {
      setIsPassword(false);
      return;
    }

    const { data } = await axios.post(`${url}/login`, { email, password });
    const { id, token } = data;

    sessionStorage.setItem("id", id);
    sessionStorage.setItem("token", token);
    navigate("/projects");
    e.target.reset();
    handleNav(false);
  };

  const handleClick = (e) => {
    handleSignup(e, true, false);
    navigate("/signup");
  };

  return (
    <form onSubmit={handleSubmit} className="auth__form">
      <div>
        <h3 className="auth__form-title">Login</h3>
        <div className="auth__input-div">
          <input
            type="email"
            name="email"
            placeholder="Email address.."
            className="auth__input"
          />
        </div>
        {!isEmail && <p className="auth__err">*** Email is required ***</p>}
        <div className="auth__input-div">
          <input
            type={isVisible ? "text" : "password"}
            name="pwd"
            id="pwd"
            className="auth__input"
            placeholder="Password.."
          />
          {!isVisible && (
            <AiFillEyeInvisible
              className="auth__visible"
              onClick={handleVisible}
            />
          )}
          {isVisible && (
            <AiFillEye className="auth__visible" onClick={handleInVisible} />
          )}
        </div>
        {!isPassword && (
          <p className="auth__err">*** Password is required ***</p>
        )}
        <div className="auth__btn-div">
          <button className="auth__btn">Login</button>
          <button className="auth__btn--alternate" onClick={handleClick}>
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
