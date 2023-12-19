import React from 'react'; 
import "./ProjectSlideBar.scss";
import { MdClose } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
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

function ProjectSlideBar({ toggleSlider }) {

    const handleClose = () => {
        toggleSlider();
    }
  return (
      <section className='projectSlider'>
          <div className='projectSlider__icon-div'>
              <MdClose
                  className='projectSlider__icon'
                  onClick={handleClose}
              />
          </div>
          <div className='projectSlider__title-div'>
              <h5 className='projectSlider__intro'>Project / CT11702059764068 </h5>
              <h4 className='projectSlider__title'>CPP Project</h4>
              <div className='projectSlider__desc-div'>
                  <h5 className='projectSlider__desc-title'>Description</h5>
                  <p className='projectSlider__desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, temporibus autem? Rerum quos at distinctio totam ipsa laborum ducimus doloribus tenetur ex? In voluptatem, possimus voluptatibus et molestiae aliquid maxime.</p>
              </div>  
              <div className='projectSlider__bottom'>
                  <div className='projectSlider__team-div'>
                      <div>
                        <AiOutlineTeam />
                      </div>
                      <div>
                          {/* include the team image icon */}
                      </div>
                  </div>
              </div>
          </div>
          
    </section>
  )
}

export default ProjectSlideBar;