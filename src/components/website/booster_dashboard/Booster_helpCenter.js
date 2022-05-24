import React from "react";

import { Switch, Route, NavLink } from "react-router-dom";
import HelpCenter from "./HelpCenter";
import My_Queries from "./My_Queries";

function Booster_helpCenter() {
  return (
    <div>
      <div className="pd_images_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_images_active"
            to="/booster_dashboard/account/help-center/"
            id="pd_images_navItem"
          >
            Home
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_images_active"
            to="/booster_dashboard/account/help-center/queries"
            id="pd_images_navItem"
          >
            My Queries
          </NavLink>
        </div>
      
      </div>
      <div className="pd_images_content">
        <Switch>
          <Route
            path="/booster_dashboard/account/help-center/queries"
            component={My_Queries}
          />
         
          <Route
            path="/booster_dashboard/account/help-center/"
            component={HelpCenter}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Booster_helpCenter;
