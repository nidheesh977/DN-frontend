import React from "react";
import "./css/Pilot_images.css";
import "./css/Pilot_downloads.css";

import { Switch, Route, NavLink } from "react-router-dom";
import Pilot_downloadsImages from "./Pilot_downloadsImages";
import Pilot_downloadsVideos from "./Pilot_downloadsVideos";
import Pilot_downloads3D from "./Pilot_downloads3D";
import Pilot_likesImages from "./Pilot_likesImages";
import Pilot_likes3d from "./Pilot_likes3d";
import Pilot_likedVideos from "./Pilot_likedVideos";
const domain = process.env.REACT_APP_MY_API

function Pilot_Likes() {
  return (
    <div>
      <div className="pd_downloads_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_downloads_active"
            to="/pilot_dashboard/activities/likes/"
            id="pd_download_navItem"
          >
            Images
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/pilot_dashboard/activities/likes/videos"
            id="pd_download_navItem"
          >
            Videos
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/pilot_dashboard/activities/likes/3d"
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
            path="/pilot_dashboard/activities/likes/3d"
            component={Pilot_likes3d}
          />
          <Route
            path="/pilot_dashboard/activities/likes/videos"
            component={Pilot_likedVideos}
          />
           <Route
            path="/pilot_dashboard/activities/likes/"
            component={Pilot_likesImages}
          />
        </Switch>
      </div>
      </div>
    </div>
  );
}

export default Pilot_Likes;
