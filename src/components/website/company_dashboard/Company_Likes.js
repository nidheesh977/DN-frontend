import React from "react";
// import "./css/Pilot_images.css";
// import "./css/Pilot_downloads.css";

import { Switch, Route, NavLink } from "react-router-dom";
import Company_likesImages from "./Company_likesImages";
import Company_likedVideos from "./Company_likedVideos";
import Company_likes3d from "./Company_liked3d";

const domain = process.env.REACT_APP_MY_API

function Company_Likes() {
  return (
    <div>
      <div className="pd_downloads_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_downloads_active"
            to="/company_dashboard/activities/likes/"
            id="pd_download_navItem"
          >
            Images
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/company_dashboard/activities/likes/videos"
            id="pd_download_navItem"
          >
            Videos
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/company_dashboard/activities/likes/3d"
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
            path="/company_dashboard/activities/likes/3d"
            component={Company_likes3d}
          />
          <Route
            path="/company_dashboard/activities/likes/videos"
            component={Company_likedVideos}
          />
           <Route
            path="/company_dashboard/activities/likes/"
            component={Company_likesImages}
          />
        </Switch>
      </div>
      </div>
    </div>
  );
}

export default Company_Likes;
