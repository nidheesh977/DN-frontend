import React from "react";
import "./css/Pilot_images.css";
import "./css/Pilot_downloads.css";
import Pilot_approvedImages from "./Pilot_approvedImages";
import Pilot_pendingImages from "./Pilot_pendingImages";
import Pilot_rejectedImages from "./Pilot_rejectedImages";
import { Switch, Route, NavLink } from "react-router-dom";
import Pilot_downloadsImages from "./Pilot_downloadsImages";
import Pilot_downloadsVideos from "./Pilot_downloadsVideos";
import Pilot_downloads3D from "./Pilot_downloads3D";
function Pilot_downloads() {
  return (
    <div>
      <div className="pd_downloads_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_downloads_active"
            to="/pilot_dashboard/activities/downloads/"
            id="pd_download_navItem"
          >
            Images
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/pilot_dashboard/activities/downloads/videos"
            id="pd_download_navItem"
          >
            Videos
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/pilot_dashboard/activities/downloads/3d"
            id="pd_download_navItem"
          >
            3D Images
          </NavLink>
        </div>
      </div>
      <hr className="sidebar_hr" />

      <div className="pd_downloads_content">
        <Switch>
         
          <Route
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
          />
        </Switch>
      </div>
    </div>
  );
}

export default Pilot_downloads;
