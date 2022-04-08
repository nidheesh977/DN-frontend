import React from "react";
import "../../css/HirePilot.css";
import dropdown from "../../images/s_c_dropdown2.png";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import "./css/Activities_Sidebar.css";
// import Pilot_followers from 'Pilot_followers'
import { Route, Switch, NavLink } from "react-router-dom";

import All from "../../website/All.module.css";
import Booster_downloads from "./Booster_downloads";
import Booster_Likes from "./Booster_Likes";
import Booster_following from "./Booster_following";
import Booster_bookmarks from "./Booster_bookmarks";

class Activities_Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view_store_filter: true,
      view_inspired_filter: false,
    };
  }

  dropdown = (id) => {
    id = "view_" + id;
    this.setState({
      [id]: !this.state[id],
    });
  };
  storeBtn = () => {
    this.setState({
      view_store_filter: true,
      view_inspired_filter: false,
    });
  };
  mediaBtn = () => {
    this.setState({
      view_store_filter: false,
      view_inspired_filter: false,
    });
  };
  jobsBtn = () => {
    this.setState({
      view_store_filter: false,
      view_inspired_filter: false,
    });
  };
  inspiredBtn = () => {
    this.setState({
      view_store_filter: false,
      view_inspired_filter: true,
    });
  };
  render() {
    return (
      <Row gutterWidth={70}>
        <Col xl={3} lg={4} md={12} sm={12}>
          <div>
            
            <div className="media_box">
              <div
                onClick={() => this.storeBtn()}
                className="sidebar_filter1_title"
              >
                <div
                  className="sidebar_filter1_title"
                  onClick={() => this.dropdown("store_filter")}
                ></div>
                My Store{" "}
                <img
                  src={dropdown}
                  id="dropimg"
                  alt="dropdown img"
                  className={
                    this.state.view_store_filter
                      ? "h_p_filter1_dropdown h_p_dropdown_selected"
                      : "h_p_filter1_dropdown"
                  }
                />
              </div>
              <hr className="sidebar_hr" />
              <div
                className={
                  this.state.view_store_filter
                    ? "h_p_filter1_content_container "
                    : "h_p_filter1_content_container h_p_hide_filter"
                }
                id="h_p_pilot_type_filter"
              >
                <div id="pd_filter1_checkbox_label">
                  {" "}
                  <NavLink
                    
                    activeClassName="h_p_sidebar_active"
                    to="/booster_dashboard/activities/downloads/"
                  >
                    Downloaded files
                  </NavLink>
                </div>
                <div id="pd_filter1_checkbox_label">
                  {" "}
                  <NavLink
                    
                    activeClassName="h_p_sidebar_active"
                    to="/booster_dashboard/activities/likes"
                  >
                    Liked files
                  </NavLink>
                </div>
              </div>
            </div>
         
            <div className="media_box">
              <div className="sidebar_filter1_title" onClick={()=>this.inspiredBtn()}>
              <div
                
                onClick={() => this.dropdown("inspired_filter")}
              >
                </div>
                Inspired{" "}
                <img
                  src={dropdown}
                  id="dropimg"
                  alt="dropdown img"
                  className={
                    this.state.view_inspired_filter
                      ? "h_p_filter1_dropdown h_p_dropdown_selected"
                      : "h_p_filter1_dropdown"
                  }
                />
              </div>
              <hr className="sidebar_hr" />
              <div
                className={
                  this.state.view_inspired_filter
                    ? "h_p_filter1_content_container "
                    : "h_p_filter1_content_container h_p_hide_filter"
                }
                id="h_p_pilot_type_filter"
              >
                 <div id="pd_filter1_checkbox_label">
                  {" "}
                  <NavLink
                    exact
                    activeClassName="h_p_sidebar_active"
                    to="/booster_dashboard/activities/bookmarks"
                  >
                    Bookmarked Centers
                  </NavLink>
                </div>
              
                <div id="pd_filter1_checkbox_label">
                  {" "}
                  <NavLink
                    exact
                    activeClassName="h_p_sidebar_active"
                    to="/booster_dashboard/activities/following"
                  >
                    Following
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col>
          <Switch>
            {/* <Route
              path="/pilot_dashboard/activities/followers"
              component={Pilot_followers}
            />
            <Route
              path="/pilot_dashboard/activities/appliedJobs"
              component={Pilot_appliedJobs}
            />
            <Route
              path="/pilot_dashboard/activities/hiredJobs"
              component={Pilot_hiredJobs}
            />
            <Route
              path="/pilot_dashboard/activities/savedJobs"
              component={Pilot_savedJobs}
            />
            <Route
              path="/pilot_dashboard/activities/following"
              component={Pilot_following}
            />
            <Route
              path="/pilot_dashboard/activities/images"
              component={Pilot_images}
            />
            <Route
              path="/pilot_dashboard/activities/videos"
              component={Pilot_videos}
            />
            <Route path="/pilot_dashboard/activities/3d" component={Pilot_3d} />
            <Route
              path="/pilot_dashboard/activities/360"
              component={Pilot_360}
            />
            <Route
              path="/pilot_dashboard/activities/downloads"
              component={Pilot_downloads}
            />
            <Route
              path="/pilot_dashboard/activities/likes"
              component={Pilot_Likes}
            /> */}
            {/* <Route exact path="/pilot_dashboard/account" component={Account_Sidebar} /> */}
            <Route
              path="/booster_dashboard/activities/following"
              component={Booster_following}
            />
             <Route
              path="/booster_dashboard/activities/bookmarks"
              component={Booster_bookmarks}
            />
            <Route
              path="/booster_dashboard/activities/likes"
              component={Booster_Likes}
            />
            <Route
              path="/booster_dashboard/activities/"
              component={Booster_downloads}
            />
          </Switch>
        </Col>
      </Row>
    );
  }
}
export default Activities_Sidebar;
