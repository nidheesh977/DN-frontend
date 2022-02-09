import React from "react";
import "./css/Pilot_images.css";
import Pilot_approvedImages from "./Pilot_approvedImages";
import Pilot_pendingImages from "./Pilot_pendingImages";
import Pilot_rejectedImages from "./Pilot_rejectedImages";
import { Switch, Route, NavLink } from "react-router-dom";
import Pilot_approved3d from "./Pilot_approved3d";
import Pilot_pending3d from "./Pilot_pending3d";
import Pilot_rejected3d from "./Pilot_rejected3d";
function Pilot_3d() {
  return (
    <div>
      <div className="pd_images_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_images_active"
            to="/pilot_dashboard/activities/3d/"
            id="pd_images_navItem"
          >
            Approved
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_images_active"
            to="/pilot_dashboard/activities/3d/pending"
            id="pd_images_navItem"
          >
            Pending
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_images_active"
            to="/pilot_dashboard/activities/3d/rejected"
            id="pd_images_navItem"
          >
            Rejected
          </NavLink>
        </div>
      </div>
      <div className="pd_images_content">
        <Switch>
          <Route
            path="/pilot_dashboard/activities/3d/pending"
            component={Pilot_pending3d}
          />
          <Route
            path="/pilot_dashboard/activities/3d/rejected"
            component={Pilot_rejected3d}
          />
          <Route
            path="/pilot_dashboard/activities/3d/"
            component={Pilot_approved3d}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Pilot_3d;
