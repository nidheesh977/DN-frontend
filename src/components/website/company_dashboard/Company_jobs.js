import React from "react";
// import "./css/Pilot_images.css";

import { Switch, Route, NavLink } from "react-router-dom";
import Company_approvedJobs from "./Company_approvedJobs";
import Company_closedJobs from "./Company_closedJobs";
import Company_pendingJobs from "./Company_pendingJobs";

function Company_jobs() {
  return (
    <div>
      <div className="pd_images_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_images_active"
            to="/company_dashboard/activities/jobs/"
            id="pd_images_navItem"
          >
            Approved
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_images_active"
            to="/company_dashboard/activities/jobs/pending"
            id="pd_images_navItem"
          >
            Pending
          </NavLink>
        </div>
      </div>
      <div className="pd_images_content">
        <Switch>
   

          <Route
            path="/company_dashboard/activities/jobs/pending"
            component={Company_pendingJobs}
          />
          <Route
            path="/company_dashboard/activities/jobs/"
            component={Company_approvedJobs}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Company_jobs;
