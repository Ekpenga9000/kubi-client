import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pic1 from "../../assets/images/organisationpic.png";
import pic2 from "../../assets/images/planning.png";
import "./Authentication.scss";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { VscGithub } from 'react-icons/vsc';

function Authentication({ handleNav }) {
  
  const navigate = useNavigate(); 

  handleNav(true);

  const [isVisible, setIsVisible] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const pwd = e.target.pwd.value;

    if (!email.trim() || !pwd.trim()) return;
    navigate("/dashboard");
    handleNav(false);
    e.target.reset();
  }

  const handleInVisible = () => {
    setIsVisible(false);
  }
  const handleVisible = () => {
    setIsVisible(true);
  }
  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__title-div">
          <div>
          <h4 className="auth__logo">kubI</h4>
          </div>
          <div className="auth__welcome">
            <h3 className="auth__welcome-header">Welcome to kubI</h3>
            <p className="auth__welcome-message">Please login to continue</p>
          </div>
        </div>
        <div className="auth__form-div">
          <form onSubmit={handleSubmit} className='auth__form'>
            <div>
            <h3 className="auth__form-title">Login</h3>
              <div className="auth__input-div">
                <input type="email" name="email" placeholder='Email address..' className='auth__input' />
              </div>
              <div className="auth__input-div">
                <input type={isVisible ? "text" : "password"} name="pwd" id="pwd" className='auth__input' placeholder="Password.." />
                {!isVisible && <AiFillEyeInvisible className="auth__visible" onClick={handleVisible} />}
                {isVisible && <AiFillEye className="auth__visible" onClick={handleInVisible} />}
              </div>
              <div className="auth__btn-div">
                <button className='auth__btn'>Login</button>
                <button className='auth__btn--alternate'>Sign up</button>
              </div>
            </div>
          </form>
          <div className="auth__btn-cntr">
            <button className="auth__google"><FcGoogle />Continue with Google</button>
          </div>
          <div className="auth__btn-cntr">
            <button className="auth__github"><VscGithub />Continue with Github</button>
          </div>
          <div className="auth__pwd">
            <Link to="/dashboard">
              Forgot password?
            </Link>
          </div>
          <div className="auth__footer">
            <p>kubI copyright 2023</p>
          </div>
        </div>
      </div>
      {/* Bottom part */}
      <div className="auth__bottom">
        <div className="auth__img-div">
          <img src={pic1} alt="Man and woman working on a board" className="auth__img" />
        </div>
        <div className="auth__img-div">
          <img src={pic2} alt="Man planning on a board" className="auth__img" />
        </div>
      </div>
    </div>
  )
}

export default Authentication;