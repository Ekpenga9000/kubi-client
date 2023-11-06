import React from 'react';
import success from "../../assets/images/success.gif";
import "./Success.scss";

function Success({ msg }) {
  return (
      <div className='success'>
          <div className='success__cntr'>
              <h2 className='success__text'>{ msg }</h2>
              <img src={ success } alt="Operation successful" className='success__img'/>
          </div>
    </div>
  )
}

export default Success