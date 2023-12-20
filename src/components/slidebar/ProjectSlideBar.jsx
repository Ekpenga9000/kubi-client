import React from 'react'; 
import "./ProjectSlideBar.scss";
import { MdClose, MdOutlineEditNote } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { TbCalendarTime } from "react-icons/tb";
import { PiSuitcaseSimpleThin } from "react-icons/pi";
import { LuFileClock } from "react-icons/lu";
import TeamAvatar from '../teamAvatar/TeamAvatar';


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
                  {/* Team */}
                  <div className='projectSlider__item-div'>
                      <div className='projectSlider__item'>
                          <span><AiOutlineTeam /></span>
                          <span>Team</span>
                      </div>
                      <div>
                          <TeamAvatar/>
                      </div>
                  </div>
                  {/* Timeline */}
                  <div className='projectSlider__item-div'>
                      <div className='projectSlider__item'>
                        <span><TbCalendarTime /></span>
                        <span>Timeline</span>
                      </div>
                      <div>
                          {/* include the team image icon */}
                      </div>
                  </div>
                  {/* Project type */}
                  <div className='projectSlider__item-div'>
                      <div className='projectSlider__item'>
                        <span><PiSuitcaseSimpleThin /></span>
                        <span>Project Type</span>
                      </div>
                      <div>
                          {/* include the team image icon */}
                      </div>
                  </div>
                  {/* Status */}
                  <div className='projectSlider__item-div'>
                      <div className='projectSlider__item'>
                        <span><LuFileClock /></span>
                        <span>Status</span>
                      </div>
                      <div>
                          {/* include the team image icon */}
                      </div>
                  </div>
              </div>

              <div className='projectSlider__notes-div'>
                  <h4 className='projectSlider__notes-title'> <MdOutlineEditNote /> Add notes</h4>
              </div>
          </div>
          
    </section>
  )
}

export default ProjectSlideBar;