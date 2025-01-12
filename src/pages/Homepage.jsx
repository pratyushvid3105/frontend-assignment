import { BackgroundBeamsWithCollision } from "../components/BackgroundBeamsWithCollision";
import { Link } from "react-router-dom";
import { GridGlobe } from "../components/GridGlobe";

function Homepage() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="dashboard-container">
        <div className="dashboard-left">
          <GridGlobe />
        </div>
        <div className="dashboard-right">
          <h1 className="dashboard-heading">SAAS LABS</h1>
          <p className="dashboard-text">
            The SaaS company that breaks boundaries
          </p>
          <Link key="/dashboard" to="/dashboard" className="action-link">
            Enter Dashboard
          </Link>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default Homepage;
