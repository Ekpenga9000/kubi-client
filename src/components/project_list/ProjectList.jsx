import React from 'react';
import Project from '../project/Project';
import "./ProjectList.scss"

function ProjectList({ projectList }) {
  return (
      <div className='projectList'>
          {projectList && projectList.map((project) => {
              return <Project project={project} key={project.id}/>
          })}
    </div>
  )
}

export default ProjectList