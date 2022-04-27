import React from "react";
import "./css/Pilot_images.css";
import Pilot_approvedImages from "./Pilot_approvedImages";
import Pilot_pendingImages from "./Pilot_pendingImages";
import Pilot_rejectedImages from "./Pilot_rejectedImages";
import { Switch, Route, NavLink } from "react-router-dom";
import HelpCenter from "./HelpCenter";
import My_Queries from "./My_Queries";

function Pilot_helpCenter() {
  return (
    <div>
      <div className="pd_images_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_images_active"
            to="/pilot_dashboard/account/help-center/"
            id="pd_images_navItem"
          >
            Home
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_images_active"
            to="/pilot_dashboard/account/help-center/queries"
            id="pd_images_navItem"
          >
            My Queries
          </NavLink>
        </div>
      
      </div>
      <div className="pd_images_content">
        <Switch>
          <Route
            path="/pilot_dashboard/account/help-center/queries"
            component={My_Queries}
          />
         
          <Route
            path="/pilot_dashboard/account/help-center/"
            component={HelpCenter}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Pilot_helpCenter;
