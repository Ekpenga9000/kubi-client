import "./ProjectDetails.scss";
import { useParams } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { BiCube } from "react-icons/bi";
import { CgInsights } from "react-icons/cg";
import { GrChatOption, GrCubes } from "react-icons/gr";
import { TbCalendarBolt,TbCalendarShare } from "react-icons/tb";
import data from "../../assets/data/data.json";

const ProjectDetails = () =>{
    const {projectId} = useParams();
    const project = data.find((project)=> project.id === projectId);
    // useEffect to get the project by Id. 
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
            <div className="p-details__main">
                main
            </div>
        </section>
    )
}

export default ProjectDetails;