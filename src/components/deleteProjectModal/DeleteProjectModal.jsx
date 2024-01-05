import "./DeleteProjectModal.scss";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

function DeleteProjectModal({ name }) {
    
    const handleCancel = () => {
        alert("This has been Cancelled!"); 
    }

    const handleDelete = () => {
        alert("This project has been deleted")
    }

  return (
      <section className='delete-m'>
          <div className='delete-m__container'>
              <div className="delete-m__icon-div"><IoClose className="delete-m__icon" onClick={handleCancel}/></div>
              <h3 className="delete-m__title">Do you want to delete this project?</h3>
              <p className="delete-m__text">{ name }</p>
              <div className='delete-m__btn-div'>
                  <button className="delete-m__btn--cancel" onClick={handleCancel}>
                  <IoIosCloseCircleOutline /> Cancel
                  </button>
                  <button className="delete-m__btn--delete" onClick={handleDelete}>
                  <MdDeleteOutline />
                      Delete
                  </button>
              </div>
          </div>  
    </section>
  )
}

export default DeleteProjectModal