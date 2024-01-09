import CreateProject from "../../components/create-project/CreateProject";
import NoProjects from "../../components/noProjects/NoProjects";
import SuccessModal from "../../components/successModal/SuccessModal";
import successGif from "../../assets/images/success.gif";
import axios from "axios";
import "./Projects.scss";
import { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import ProjectList from "../../components/project_list/ProjectList";
import { useNavigate } from "react-router-dom";

const Projects = ({ isActive, handleModal }) => {
  const data = [];
  const [projectsLength, setProjectsLength] = useState(data.length);
  const [sortedprojects, setSortedProjects] = useState(data);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [listName, setListName] = useState("All Projects");
  const [projectStatus, setProjectStatus] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const url = import.meta.env.VITE_SERVER_URL;
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    if (!token) {
      return navigate("/login");
    }
    try {
      const { data } = await axios.get(`${url}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { projects } = data;
      setProjectsLength(projects.length);
      setSortedProjects(projects);
      setProjectStatus("");
    } catch (err) {
      console.log(err);
      setIsErr(true);
      setErrMsg("Internal Server Error.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSuccess = () => {
    handleModal(false);
    setIsSuccessful(true);
    setTimeout(() => {
      setIsSuccessful(false);
      navigate("/projects");
    }, 1000);
  };

  const handleAllProjects = () => {
    fetchProjects();
    setListName("All Projects");
    setProjectStatus("");
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const filterProjectStatus = async (status) => {
    try {
      const { data } = await axios.get(`${url}/projects/status/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { projects } = data;
      const newStatus = capitalize(status);
      setSortedProjects(projects);
      setListName(`${newStatus} Projects`);
      setProjectStatus(`${capitalize(status)}`);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchArchivedProjects = async () => {
    try {
      const { data } = await axios.get(`${url}/projects/archived`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { projects } = data;
      setSortedProjects(projects);
      setListName(`Archived Projects`);
      setProjectStatus(`Archived`);
    } catch (err) {
      console.log(err);
      setIsErr(true);
      setErrMsg("Internal Server Error.");
    }
  };

  const handleSearch = (e) => {
    if (e.target.value.trim() === "" && projectStatus === "") {
      setSortedProjects(data);
    } else if (e.target.value.trim() !== "" && projectStatus === "") {
      const newArr = data.filter((project) =>
        project.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSortedProjects(newArr);
    } else {
      const newArr = data.filter((project) => project.status === projectStatus);
      const result = newArr.filter((project) =>
        project.name
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      );
      setSortedProjects(result);
    }
  };

  const handleRecentSort = () => {
    const newArr = sortedprojects.sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );
    setSortedProjects(newArr);
  };

  return (
    <section className="dashboard">
      {!projectsLength > 0 && <NoProjects handleModal={handleModal} />}
      {projectsLength > 0 && (
        <section className="dashboard__container">
          <div className="dashboard__sidebar">
            <div className="dashboard__menu-div">
              <ul className="dashboard__menu">
                <li
                  className={`dashboard__item${
                    listName === "All Projects" ? "--secondary" : ""
                  }`}
                  onClick={handleAllProjects}
                >
                  All
                </li>
                <li
                  className={`dashboard__item${
                    listName === "Active Projects" ? "--secondary" : ""
                  }`}
                  onClick={() => filterProjectStatus("active")}
                >
                  Active
                </li>
                <li
                  className={`dashboard__item${
                    listName === "Deferred Projects" ? "--secondary" : ""
                  }`}
                  onClick={() => filterProjectStatus("deferred")}
                >
                  Deferred
                </li>
                <li
                  className={`dashboard__item${
                    listName === "Closed Projects" ? "--secondary" : ""
                  }`}
                  onClick={() => filterProjectStatus("closed")}
                >
                  Closed
                </li>
                <li
                  className={`dashboard__item${
                    listName === "Archived Projects" ? "--secondary" : ""
                  }`}
                  onClick={fetchArchivedProjects}
                >
                  Archived
                </li>
              </ul>
            </div>
            <div className="dashboard__second-div">
              <h3 className="dashboard__title">
                <BsInfoCircle className="dashboard__info" />
                Click on a project to create a Sprint.
              </h3>
            </div>
          </div>
          <div className="dashboard__main">
            <div className="dashboard__sort-cntr">
              <h3 className="dashboard__name">{listName}</h3>
              <div className="dashboard__search-cntr">
                <select name="sort" id="sort" className="dashboard__sort">
                  <option value="none">Sort </option>
                  <option value="none" onClick={handleRecentSort}>
                    Most Recent
                  </option>
                  <option value="none">Least Recent</option>
                  <option value="none"> A-Z </option>
                  <option value="none"> Z-A </option>
                </select>
                <div className="dashboard__search-div">
                  <BiSearch />
                  <input
                    type="search"
                    name="search"
                    id="search"
                    onChange={handleSearch}
                    placeholder="Search Project name.."
                    className="dashboard__search"
                  />
                </div>
              </div>
            </div>
            <div className="dashboard__projects">
              {sortedprojects.length > 0 ? (
                <ProjectList
                  projectList={sortedprojects}
                  fetchProjects={fetchProjects}
                />
              ) : (
                <>Project not found</>
              )}
              {isErr && <p>{errMsg}</p>}
            </div>
          </div>
        </section>
      )}
      {isActive && (
        <div className="dashboard__modal">
          <CreateProject
            handleModal={handleModal}
            handleSuccess={handleSuccess}
            handleAllProjects={handleAllProjects}
          />
        </div>
      )}

      {isSuccessful && (
        <div className="dashboard__modal">
          <SuccessModal msg={"New project created! 👍"} gif={successGif} />
        </div>
      )}
    </section>
  );
};

export default Projects;
