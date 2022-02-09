import React from "react";
import "./css/Pilot_images.css";
import Pilot_approvedImages from "./Pilot_approvedImages";
import Pilot_pendingImages from "./Pilot_pendingImages";
import Pilot_rejectedImages from "./Pilot_rejectedImages";
import { Switch, Route, NavLink } from "react-router-dom";
import Pilot_approvedVideos from "./Pilot_approvedVideos";
import Pilot_pendingVideos from "./pilot_pendingVideos";
import Pilot_rejectedVideos from "./Pilot_rejectedVideos";
function Pilot_videos() {
  return (
    <div>
      <div className="pd_images_main">
        <div ><NavLink exact activeClassName='pd_images_active' to="/pilot_dashboard/activities/videos/" id="pd_images_navItem">Approved</NavLink></div>
        <div ><NavLink activeClassName='pd_images_active' to="/pilot_dashboard/activities/videos/pending" id="pd_images_navItem">Pending</NavLink></div>
        <div ><NavLink activeClassName='pd_images_active' to="/pilot_dashboard/activities/videos/rejected" id="pd_images_navItem">Rejected</NavLink></div>
      </div>
      <div className="pd_images_content">
        <Switch>
   <Route
          path="/pilot_dashboard/activities/videos/pending"
          component={Pilot_pendingVideos}
        /><Route
        path="/pilot_dashboard/activities/videos/rejected"
        component={Pilot_rejectedVideos}
      />
           <Route
            path="/pilot_dashboard/activities/videos/"
            component={Pilot_approvedVideos}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Pilot_videos;
