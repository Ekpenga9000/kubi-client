import "./ProjectDetails.scss";
import { useParams } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { BiCube } from "react-icons/bi";
import { CgInsights } from "react-icons/cg";
import { GrChatOption, GrCubes } from "react-icons/gr";
import { TbCalendarBolt, TbCalendarShare } from "react-icons/tb";
import axios from "axios";
import data from "../../assets/data/data.json";
import DashboardTop from "../../components/project-details-dashboard-top/DashboardTop";
import DashboardBottom from "../../components/project-details-dashboard-bottom/DashboardBottom";
import { useEffect } from "react";

const ProjectDetails = () =>{
    const {projectId} = useParams();
    const project = data.find((project) => project.id === projectId);
    const token = sessionStorage.getItem("token");
    const url = import.meta.env.VITE_SERVER_URL; 

    // useEffect to get the project by Id. 
    useEffect(() => {
        const fetchProjectById = async () => {
            try {
                const { data } = await axios.get(`${url}/projects/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                console.log(data);
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchProjectById(); 
    }, [projectId], token)
    return (
        <section className="p-details">
            <div className="p-details__sidebar">
                <h4 className="p-details__name"><BsInfoCircle/>{project.name}</h4>
                <div className="p-details__cntr">
                    <ul className="p-details__menu">
                        <li className="p-details__item--active"><TbCalendarBolt/>Active Sprint</li>
                        <li className="p-details__item"><BiCube/>Issues</li>
                        <li className="p-details__item"><GrChatOption/>Converstions</li>
                    </ul>

                    <ul className="p-details__menu">
                        <li className="p-details__item"><TbCalendarShare/>Sprints</li>
                        <li className="p-details__item"><GrCubes/>Backlogs</li>
                        <li className="p-details__item--insight"><CgInsights/>Insights</li>
                    </ul>
                </div>
            </div>
            <div className="p-details__dashboard">
                <div className="p-details__half">
                    <DashboardTop/>
                </div>
                <div className="p-details__half">
                    <DashboardBottom/>
                </div>
            </div>
        </section>
    )
}

export default ProjectDetails;