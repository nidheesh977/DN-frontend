import React from "react";
import "./css/Pilot_images.css";
import "./css/Pilot_downloads.css";

import { Switch, Route, NavLink } from "react-router-dom";
import Booster_downloads3d from "./Booster_downloads3D";
import Booster_downloadsVideos from "./Booster_downloadsVideos";
import Booster_downloadsImages from "./Booster_downloadsImages";

// import Pilot_downloadsVideos from "./Pilot_downloadsVideos";
// import Pilot_downloads3D from "./Pilot_downloads3D";
const domain = process.env.REACT_APP_MY_API

function Booster_downloads() {
  return (
    <div>
      <div className="pd_downloads_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_downloads_active"
            to="/booster_dashboard/activities/downloads/"
            id="pd_download_navItem"
          >
            Images
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/booster_dashboard/activities/downloads/videos"
            id="pd_download_navItem"
          >
            Videos
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/booster_dashboard/activities/downloads/3d"
            id="pd_download_navItem"
          >
            3D Images
          </NavLink>
        </div>
      </div>
      <hr className="sidebar_hr" />
      <div style={{marginTop : "30px"}}>

      <div className="pd_downloads_content">
        <Switch>
         
          <Route
            path="/booster_dashboard/activities/downloads/3d"
            component={Booster_downloads3d}
          />
          <Route
            path="/booster_dashboard/activities/downloads/videos"
            component={Booster_downloadsVideos}
          />
           <Route
            path="/booster_dashboard/activities/downloads/"
            component={Booster_downloadsImages}
          />


        </Switch>
      </div>
      </div>
    </div>
  );
}

export default Booster_downloads;
