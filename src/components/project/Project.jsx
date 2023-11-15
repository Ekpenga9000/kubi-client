import "./Project.scss";
import { Link } from 'react-router-dom';
import { AiFillFolderOpen, AiFillFolder} from 'react-icons/ai';
import { MdOutlineDeleteOutline, MdOutlineMoreHoriz} from 'react-icons/md';


function Project({ project }) {
    const {id, name,projectKey, type, lead, status } = project;
  return (
      <div className='project'>
          <div className='project__row'>
              <Link to={`/projects/${id}`} className='project__title'>{name}</Link>
              <p>{projectKey}</p>
              <p>{type}</p>
              <p>{lead}</p>
              <p className={`project__status--${status.toLowerCase()}`}> {status === "Active" ? <AiFillFolderOpen /> : <AiFillFolder />} {status}</p>
              <div className='project__btn-div'>
                  <Link to={`/projects/${id}`} className='project__link'>
                  <MdOutlineMoreHoriz/>
                  </Link> 
                  <MdOutlineDeleteOutline className='project__delete'/>
              </div>
          </div> 
    </div>
  )
}

export default Project;