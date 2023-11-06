import React from 'react';
import "./Project.scss";
import { Link } from 'react-router-dom';
import { FcOpenedFolder, FcFolder } from 'react-icons/fc';
import { AiOutlineEye} from 'react-icons/ai';
import { MdOutlineDeleteOutline} from 'react-icons/md';


function Project({ project }) {
    const {id,  name, startDate, endDate, status } = project;
  return (
      <div className='project'>
          <div className='project__card'>
              <h3 className='project__title'>{name}</h3>
              <p className='project__start'>Start date: {startDate}</p>
              <p className='project__end'>Estimated end date: {endDate}</p>
              <p className='project__status'> {status === "Active" ? <FcOpenedFolder /> : <FcFolder />} {status}</p>
              <div className='project__btn-div'>
                  <button className='project__delete'><MdOutlineDeleteOutline/>Delete Project</button>
                  <Link to={"/projects/id"} className='project__link'>
                  <AiOutlineEye/> View Project  
                  </Link> 
              </div>
          </div> 
    </div>
  )
}

export default Project