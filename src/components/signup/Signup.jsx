import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Signup = ({ handleSignup }) => {
  const navigate = useNavigate();
  const [isErr, setIsErr] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL;

  const handleClick = (e) => {
    handleSignup(e);
    navigate("/login");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target.email.value; 

    if (!email) {
      setIsErr(true); 
    }
    
    try {
      const {data} = await axios.post(`${url}/signup`, { email });
      
      if (data.message) {
        setIsRegistered(true)
        setTimeout(() => {
          handleSignup(e, false, false);
          return navigate("/login");
        }, 3000);
      } else {
        return navigate("/email-info");
      }
    } catch (err) {
      console.log(err); 
    }
  };

  return (
    <section>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div>
          <h3 className="auth__form-title">Sign up</h3>
          <div className="auth__input-div">
            <input
              type="email"
              name="email"
              placeholder="Email address.."
              className="auth__input"
            />
          </div>
          {isErr && <p className="auth__err">Please enter your email address</p>}
          {isRegistered && <p className="auth__err">Email already exists, please login</p>}
          <div className="auth__btn-div">
            <button className="auth__btn--alternate" onClick={handleClick}>
              Login
            </button>
            <button className="auth__btn">Sign up</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Signup;
