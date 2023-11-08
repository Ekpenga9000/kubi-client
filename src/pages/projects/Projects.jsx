import CreateProject from "../../components/create-project/CreateProject";
import NoProjects from "../../components/noProjects/NoProjects";
import Success from "../success/Success";
import "./Projects.scss";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FaSort } from "react-icons/fa";
import data from "../../assets/data/data.json";
import ProjectList from "../../components/project_list/ProjectList";

const Projects = ({ isActive, handleModal }) => {


    const [projects, setProjects] = useState(data.length);
    const [sortedprojects, setSortedProjects] = useState(data);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [listName, setListName] = useState("All Projects");
    const [projectStatus, setProjectStatus] = useState("");


    const handleSuccess = () => {
        handleModal(false);
        setIsSuccessful(true);
        setTimeout(() => {
            setIsSuccessful(false);
        }, 1000);

    }

    const handleAllProjects = () => {
        setSortedProjects(data);
        setListName("All Projects");
        setProjectStatus("");
    }

    const handleCreateProject = obj => {
        const newArr = [...data];
        newArr.push(obj);
        setSortedProjects(newArr);
    }

    const handleActiveProject = () => {
        const newArr = data.filter((project) => project.status === "Active");
        setSortedProjects(newArr);
        setListName("Active Projects");
        setProjectStatus("Active");
    }

    const handleDeferredProject = () => {
        const newArr = data.filter((project) => project.status === "Deferred");
        setSortedProjects(newArr);
        setListName("Deferred Projects");
        setProjectStatus("Deferred");
    }

    const handleClosedProject = () => {
        const newArr = data.filter((project) => project.status === "Closed");
        setSortedProjects(newArr);
        setListName("Closed Projects");
        setProjectStatus("Closed");
    }

    const handleSearch = (e) => {
        if ((e.target.value.trim() === "") && (projectStatus === "")) {
            setSortedProjects(data);
        } else if (e.target.value.trim() !== "" && projectStatus === "") {
            const newArr = data.filter((project) => project.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setSortedProjects(newArr);
        } else {
            const newArr = data.filter((project) => project.status === projectStatus);
            const result = newArr.filter((project) => project.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
            setSortedProjects(result);
        }

        // if(e.target.value.trim() === "" && projectStatus !== ""){
        //     const newArr = data.filter((project)=> project.status === projectStatus);  
        //     setSortedProjects(newArr);
        // }
    }

    return (
        <section className="dashboard">
            {!projects > 0 && <NoProjects handleModal={handleModal} />}
            {projects > 0 && <section className="dashboard__container">
                <div className="dashboard__sidebar">
                    <div className="dashboard__menu-div">
                        <ul className="dashboard__menu">
                            <li className="dashboard__item--secondary" onClick={handleAllProjects}>All</li>
                            <li className="dashboard__item" onClick={handleActiveProject}>Active</li>
                            <li className="dashboard__item" onClick={handleDeferredProject}>Deferred</li>
                            <li className="dashboard__item" onClick={handleClosedProject}>Closed</li>
                        </ul>
                    </div>
                    <div className="dashboard__second-div">

                        <h3 className="dashboard__title"><BsInfoCircle className="dashboard__info" />Click on a project to create a Sprint.</h3>
                    </div>
                </div>
                <div className="dashboard__main">
                    <div className="dashboard__sort-cntr">
                        <h3 className="dashboard__name">{listName}</h3>
                        <div className="dashboard__search-cntr">
                            <h3 className="dashboard__sort">Sort <FaSort /></h3>
                            <div className="dashboard__search-div">
                                <BiSearch />
                                <input type="search" name="search" id="search" onChange={handleSearch} placeholder="Search Project name.." className="dashboard__search" />
                            </div>
                        </div>
                    </div>
                    <div className="dashboard__projects">
                        <ProjectList projectList={sortedprojects} />
                    </div>

                </div>
            </section>}
            {isActive && <div className="dashboard__modal">
                <CreateProject handleModal={handleModal} handleSuccess={handleSuccess} handleCreateProject={handleCreateProject} />
            </div>}

            {isSuccessful && <div className="dashboard__modal">
                <Success msg={"New project created! 👍"} />
            </div>}

        </section>

    )
}

export default Projects; 