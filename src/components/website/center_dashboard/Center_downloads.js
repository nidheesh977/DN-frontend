import React from "react";
import "./css/Pilot_images.css";
import "./css/Pilot_downloads.css";

import { Switch, Route, NavLink } from "react-router-dom";
import Center_downloads3d from "./Center_downloads3D";
import Center_downloadsImages from "./Center_downloadsImages";
import Center_downloadsVideos from "./Center_downloadsVideos";
// import Pilot_downloadsImages from "./Pilot_downloadsImages";
// import Pilot_downloadsVideos from "./Pilot_downloadsVideos";
// import Pilot_downloads3D from "./Pilot_downloads3D";
const domain = process.env.REACT_APP_MY_API

function Center_downloads() {
  return (
    <div>
      <div className="pd_downloads_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_downloads_active"
            to="/center_dashboard/activities/downloads/"
            id="pd_download_navItem"
          >
            Images
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/center_dashboard/activities/downloads/videos"
            id="pd_download_navItem"
          >
            Videos
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/center_dashboard/activities/downloads/3d"
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
         
          {/* <Route
            path="/pilot_dashboard/activities/downloads/3d"
            component={Pilot_downloads3D}
          />
          <Route
            path="/pilot_dashboard/activities/downloads/videos"
            component={Pilot_downloadsVideos}
          />
           <Route
            path="/pilot_dashboard/activities/downloads/"
            component={Pilot_downloadsImages}
          /> */}


<Route 
            path="/center_dashboard/activities/downloads/3d"
            component={Center_downloads3d}
          />
          <Route
            path="/center_dashboard/activities/downloads/videos"
            component={Center_downloadsVideos}
          />
          <Route
            path="/center_dashboard/activities/downloads/"
            component={Center_downloadsImages}
          />
        </Switch>
      </div>
      </div>
    </div>
  );
}

export default Center_downloads;
