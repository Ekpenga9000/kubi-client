import NavBar from "../../components/nav/NavBar";

const Dashboard = () =>{
    return(
        <section className="dashboard">
            <NavBar/>
            <section className="dashboard__container">
                <div className="dashboard__sidebar">side bar</div>
                <div className="dashboard__main">
                    <h2>Your Projects</h2>
                    <div>Actual projects</div>
                </div>
            </section>
        </section>
        
    )
}

export default Dashboard; 