import React from 'react'; 
import "./ProjectSlideBar.scss";
import { MdClose } from "react-icons/md";
/**
 * created_at
: 
"2023-12-08T18:22:44.000Z"
description
: 
"This is to show my wifey"
endDate
: 
"2023-12-15T05:00:00.000Z"
id
: 
6
lead_id
: 
1
name
: 
"CPP Project"
permission
: 
"admin"
project_creator
: 
"Omogbare Ekpenga"
project_lead
: 
"Omogbare Ekpenga"
project_number
: 
"CT11702059764068"
startDate
: 
"2023-12-08T05:00:00.000Z"
status
: 
"active"
type
: 
"Software Development project"
 * 
 */

function ProjectSlideBar({ fetchProjectDetails }) {

    const handleClose = () => {
        fetchProjectDetails()
    }
  return (
      <section className='projectSlider'>
          <div className='projectSlider__icon-div'>
              <MdClose
                  className='projectSlider__icon'
                  onClick={handleClose}
              />
          </div>
          <div>
              <h4>CPP Project</h4>
              <p>CT11702059764068</p>
            <p>admin</p>   
          </div>
          <div>
              <p>Omogbare Ekpenga</p>
              <p>Omogbare Ekpenga</p>
          </div>
          <div>
              <p>Software Development project</p>
          </div>
          <div>
              <p>Description</p>
          </div>
          <div>
              <p>2023-12-08T05:00:00.000Z</p>
              <p>2023-12-08T05:00:00.000Z</p>
          </div>
    </section>
  )
}

export default ProjectSlideBar;