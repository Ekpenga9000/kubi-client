import CreateProject from "../../components/create-project/CreateProject";
import NavBar from "../../components/nav/NavBar";
import NoProjects from "../../components/noProjects/NoProjects";
import Success from "../success/Success";
import "./Dashboard.scss";
import { useState } from "react";
import data from "../../assets/data/data.json"; 
import ProjectList from "../../components/project_list/ProjectList";

const Dashboard = ({ isActive, handleModal }) => {
  
    const [projects, setProjects] = useState(data);
    const [isSuccessful, setIsSuccessful] = useState(false);


    const handleSuccess = () => {
        handleModal(false);
        setIsSuccessful(true); 
        setTimeout(() => {
            setIsSuccessful(false);
        }, 1000);
    }

    const handleCreateProject = obj => {
        const newArr = [...projects];
        newArr.push(obj);
        setProjects(newArr);
    }

    return(
        <section className="dashboard">
            {!projects.length > 0 && <NoProjects handleModal={ handleModal } />}
            {projects.length > 0 && <section className="dashboard__container">
                <div className="dashboard__sidebar">
                    Click on a project to create a Sprint.
                </div>
                <div className="dashboard__main">
                    <ProjectList projectList={ projects } />
                </div>
            </section>}
            {isActive && <div className="dashboard__modal">
                <CreateProject handleModal={handleModal} handleSuccess={handleSuccess} handleCreateProject={ handleCreateProject } />
            </div>}

            {isSuccessful && <div className="dashboard__modal">
                <Success msg={ "New project created! 👍" } />
            </div>}

        </section>
        
    )
}

export default Dashboard; 