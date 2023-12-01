import "./DashboardBottom.scss";
import { CiCirclePlus } from "react-icons/ci";

const DashboardBottom = () =>{
    return(
        <section className="dashboard-bottom">
            <div className="dashboard-bottom__container">
                <h3 className="dashboard-bottom__title">Backlogs</h3>
                <button className="dashboard-bottom__btn--create"><CiCirclePlus /> Create Issues</button>
                <div>
                
                </div>
            </div>    
        </section>
    )
}

export default DashboardBottom;