import NavBar from "../../components/nav/NavBar";
import "./Dashboard.scss";

const Dashboard = () =>{
    return(
        <section className="dashboard">
            <NavBar/>
            <section className="dashboard__container">
                <div className="dashboard__sidebar">
                    This would take in the sidebar component.
                </div>
                <div className="dashboard__main">
                    <h2 className="dashoard__title">Your Projects</h2>
                    <div className="dashboard__projects">Actual projects</div>
                </div>
            </section>
        </section>
        
    )
}

export default Dashboard; 