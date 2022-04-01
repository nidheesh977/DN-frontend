import React from "react";
import "./css/Pilot_images.css";
import "./css/Pilot_downloads.css";

import { Switch, Route, NavLink } from "react-router-dom";
import Booster_likes3d from "./Booster_likes3d";
import Booster_likedVideos from "./Booster_likedVideos";
import Booster_likesImages from "./Booster_likesImages";

const domain = process.env.REACT_APP_MY_API

function Booster_Likes() {
  return (
    <div>
      <div className="pd_downloads_main">
        <div>
          <NavLink
            exact
            activeClassName="pd_downloads_active"
            to="/booster_dashboard/activities/likes/"
            id="pd_download_navItem"
          >
            Images
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/booster_dashboard/activities/likes/videos"
            id="pd_download_navItem"
          >
            Videos
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="pd_downloads_active"
            to="/booster_dashboard/activities/likes/3d"
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
            path="/booster_dashboard/activities/likes/3d"
            component={Booster_likes3d}
          />
          <Route
            path="/booster_dashboard/activities/likes/videos"
            component={Booster_likedVideos}
          />
           <Route
            path="/booster_dashboard/activities/likes/"
            component={Booster_likesImages}
          />
        </Switch>
      </div>
      </div>
    </div>
  );
}

export default Booster_Likes;
