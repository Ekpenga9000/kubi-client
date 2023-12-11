import { useState, useEffect } from "react";
import "../../pages/auth/Authentication.scss";
import { useParams, useNavigate } from "react-router-dom";

const Registration = ({handleNav}) => {
    const [isPassword, setIsPassword] = useState(false); 
    const [isConfirmPwd, setIsConfirmPwd] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const { urlToken } = useParams();
    
    useEffect(() => {
        handleNav(true);
    }, [handleNav])

    console.log("token", urlToken);

  return (
      <section>
          Hello
        </section>
  );
};

export default Registration;
