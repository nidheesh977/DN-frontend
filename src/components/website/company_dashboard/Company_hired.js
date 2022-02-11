import React from "react";
// import "./css/Pilot_images.css";

import { Switch, Route, NavLink } from "react-router-dom";
import Company_approvedJobs from "./Company_approvedJobs";
import Company_closedJobs from "./Company_closedJobs";
import Company_hiredClosed from "./Company_hiredClosed";
import Company_hiredOnProcess from "./Company_hiredOnProcess";
import Company_hiredRejected from "./Company_hiredRejected";
import Company_hiredSelected from "./Company_hiredSelected";
import Company_pendingJobs from "./Company_pendingJobs";

function Company_hired() {
  return (
    <div>
      <div className="pd_images_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_images_active"
            to="/company_dashboard/activities/hired/"
            id="pd_images_navItem"
          >
            Selected
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_images_active"
            to="/company_dashboard/activities/hired/closed"
            id="pd_images_navItem"
          >
            Closed Pilot
          </NavLink>
        </div>
        <div>
        <NavLink
            activeClassName="pd_images_active"
            to="/company_dashboard/activities/hired/process"
            id="pd_images_navItem"
          >
            On process
          </NavLink><NavLink
            activeClassName="pd_images_active"
            to="/company_dashboard/activities/hired/rejected"
            id="pd_images_navItem"
          >
            Rejected
          </NavLink>
        </div>
      </div>
      <div className="pd_images_content">
        <Switch>
   

          <Route
            path="/company_dashboard/activities/hired/rejected"
            component={Company_hiredRejected}
          />
          <Route
            path="/company_dashboard/activities/hired/closed"
            component={Company_hiredClosed}
          /><Route
          path="/company_dashboard/activities/hired/process"
          component={Company_hiredOnProcess}
        />
          <Route
            path="/company_dashboard/activities/hired/"
            component={Company_hiredSelected}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Company_hired;
