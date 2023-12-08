import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import pic1 from "../../assets/images/organisationpic.png";
import pic2 from "../../assets/images/planning.png";
import "./Authentication.scss";
import { FcGoogle } from 'react-icons/fc';
import { VscGithub } from 'react-icons/vsc';
import Login from "../../components/login/Login";
import Registration from "../../components/registration/Registration";

function Authentication({ handleNav }) { 

  const [isLogin, setIsLogin] = useState(true);

  useEffect(()=>{
    handleNav(true);
  }, [handleNav])
  
  

  const handleSignup = (e) =>{
    e.preventDefault();
    setIsLogin(!isLogin);
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
           {isLogin && <p className="auth__welcome-message">Please login to continue</p>}
           {!isLogin && <p className="auth__welcome-message">Please enter your email to continue</p>}
          </div>
        </div>
        <div className="auth__form-div">
          {!isLogin && <Registration  handleSignup={handleSignup} />}
          {isLogin && <Login handleSignup={handleSignup} handleNav ={handleNav} />}
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