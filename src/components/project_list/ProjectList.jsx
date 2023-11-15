
import Project from '../project/Project';
import "./ProjectList.scss"

function ProjectList({ projectList }) {
  return (
      <div className='projectList'>
        <div className='projectList__title-div'>
          <h3 className='projectList__title'>Name</h3>
          <h3 className='projectList__title'>Key</h3>
          <h3 className='projectList__title'>Type</h3>
          <h3 className='projectList__title'>Lead</h3>
          <h3 className='projectList__title'>Status</h3>
          <h3 className='projectList__title'>Actions</h3>
        </div>
          {projectList && projectList.map((project) => {
              return <Project project={project} key={project.id}/>
          })}
    </div>
  )
}

export default ProjectList