import React from 'react';
import "./NoIssue.scss"; 
import task from "../../assets/images/task.png"; 

const NoIssue = () => {
  return (
      <div className='noissue'>
          <div className='noissue__img-div'>
              <img src={ task } alt="A list of tasks" className='noissue__img'/>
          </div>

          <div className='noissue__msg-div'>
              <h4 className='noissue__header'>Create issues for your project</h4>
              <ul className='noissue__ul'>
                  <li className='noissue__msg'>Break your into smaller bits (issues).</li>
                  <li className='noissue__msg'>Click the "Create Issue" button to get started.</li>
                  <li className='noissue__msg'>Issues may vary in type and complexity and priority.</li>
              </ul>
          </div>
    </div>
  )
}

export default NoIssue