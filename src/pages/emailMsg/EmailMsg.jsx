import React from 'react';
import "./EmailMsg.scss";
import email from "../../assets/images/email.gif";

const EmailMsg = () => {
  return (
      <section className='email'>
          <div className='email__container'>
              <h3 className='email__msg'>
              Thank you, please check your email address to continue your registration.
        </h3>
        <div className='email__img-div'>
          <img src={ email } alt="Email information gif" className='email__img'/>
        </div>
          </div>
    </section>
  )
}

export default EmailMsg