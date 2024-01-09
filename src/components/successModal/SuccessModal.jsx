import React from 'react';
import "./SuccessModal.scss";

function SuccessModal({ msg, gif }) {
  return (
      <div className='success'>
          <div className='success__cntr'>
              <h2 className='success__text'>{ msg }</h2>
              <img src={ gif } alt="Operation successful" className='success__img'/>
          </div>
    </div>
  )
}

export default SuccessModal;