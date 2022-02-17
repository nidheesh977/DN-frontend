import React from "react";
import "../pilot_dashboard/css/Pilot_images.css";
import "../pilot_dashboard/css/Pilot_downloads.css";

import { Switch, Route, NavLink } from "react-router-dom";
import Company_downloadsImages from "./Company_downloadsImages";
import Company_downloadsVideos from "./Company_downloadsVideos";
import Company_downloads3d from "./Company_downloads3d";

function Company_downloads() {
  return (
    <div>
      <div className="pd_downloads_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_downloads_active"
            to="/company_dashboard/activities/downloads/"
            id="pd_download_navItem"
          >
            Images
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/company_dashboard/activities/downloads/videos"
            id="pd_download_navItem"
          >
            Videos
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/company_dashboard/activities/downloads/3d"
            id="pd_download_navItem"
          >
            3D Images
          </NavLink>
        </div>
      </div>
      <hr className="sidebar_hr" />
      <div style={{ marginTop: "30px" }}>
        <div className="pd_downloads_content">
          <Switch>
            {/* 
          
           <Route
            path="/pilot_dashboard/activities/downloads/"
            component={Pilot_downloadsImages}
          /> */}
            <Route
              path="/company_dashboard/activities/downloads/3d"
              component={Company_downloads3d}
            />
            <Route
              path="/company_dashboard/activities/downloads/videos"
              component={Company_downloadsVideos}
            />
            <Route
              path="/company_dashboard/activities/downloads/"
              component={Company_downloadsImages}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Company_downloads;
