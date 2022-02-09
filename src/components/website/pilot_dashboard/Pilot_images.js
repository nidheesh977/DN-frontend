import React from "react";
import "./css/Pilot_images.css";
import Pilot_approvedImages from "./Pilot_approvedImages";
import Pilot_pendingImages from "./Pilot_pendingImages";
import Pilot_rejectedImages from "./Pilot_rejectedImages";
import { Switch, Route, NavLink } from "react-router-dom";
import ScrollToTop from "../ScrollToTop"
function Pilot_images() {
  return (
    <div>
      <div className="pd_images_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_images_active"
            to="/pilot_dashboard/activities/images/"
            id="pd_images_navItem"
          >
            Approved
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_images_active"
            to="/pilot_dashboard/activities/images/pending"
            id="pd_images_navItem"
          >
            Pending
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_images_active"
            to="/pilot_dashboard/activities/images/rejected"
            id="pd_images_navItem"
          >
            Rejected
          </NavLink>
        </div>
      </div>
      <div className="pd_images_content">
        <Switch>
          <Route
            path="/pilot_dashboard/activities/images/pending"
            component={Pilot_pendingImages}
          />
          <Route
            path="/pilot_dashboard/activities/images/rejected"
            component={Pilot_rejectedImages}
          />
          <Route
            path="/pilot_dashboard/activities/images/"
            component={Pilot_approvedImages}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Pilot_images;
