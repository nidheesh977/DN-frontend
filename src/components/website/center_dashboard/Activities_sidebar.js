import React from "react";
import "../../css/HirePilot.css";
import dropdown from "../../images/s_c_dropdown2.png";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import "./css/Activities_Sidebar.css";
// import Pilot_followers from 'Pilot_followers'
import { Route, Switch, NavLink } from "react-router-dom";
// import Pilot_followers from "./Pilot_followers";
// import Pilot_appliedJobs from "./Pilot_appliedJobs";
// import Pilot_following from "./Pilot_following";
// import Pilot_hiredJobs from "./Pilot_hiredJobs";
// import Pilot_savedJobs from "./Pilot_savedJobs";
// import Pilot_images from "./Pilot_images";
// import Pilot_videos from "./Pilot_videos";
// import Pilot_3d from "./Pilot_3d";
// import Pilot_360 from "./Pilot_360";
// import Pilot_downloads from "./Pilot_downloads";
import All from "../../website/All.module.css";
import Center_downloads from "./Center_downloads";
import Center_Likes from "./Center_Likes";
import Center_followers from "./Center_followers";
import Center_following from "./Center_following";
import Center_bookmarks from "./Center_bookmarks";
import Center_enquiries from "./Center_enquiries";
// import Pilot_Likes from "./Pilot_Likes";

class Activities_Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view_store_filter: true,
      view_inspired_filter: false,
      view_enquiries_filter: false,
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
      view_enquiries_filter: false,

    });
  };
  mediaBtn = () => {
    this.setState({
      view_store_filter: false,
      view_inspired_filter: false,
      view_enquiries_filter: false,

    });
  };
  enquiriesBtn = () => {
    this.setState({
      view_store_filter: false,
      view_inspired_filter: false,
      view_enquiries_filter: true,

    });
  };
  inspiredBtn = () => {
    this.setState({
      view_store_filter: false,
      view_inspired_filter: true,
      view_enquiries_filter: false,

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
                    to="/center_dashboard/activities/downloads"
                  >
                    Downloaded files
                  </NavLink>
                </div>
                <div id="pd_filter1_checkbox_label">
                  {" "}
                  <NavLink
                    
                    activeClassName="h_p_sidebar_active"
                    to="/center_dashboard/activities/likes"
                  >
                    Liked files
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="media_box">
              <div
                onClick={() => this.enquiriesBtn()}
                className="sidebar_filter1_title"
              >
                <div
                  className="sidebar_filter1_title"
                  onClick={() => this.dropdown("enquiries_filter")}
                ></div>
                Enquiries{" "}
                <img
                  src={dropdown}
                  id="dropimg"
                  alt="dropdown img"
                  className={
                    this.state.view_enquiries_filter
                      ? "h_p_filter1_dropdown h_p_dropdown_selected"
                      : "h_p_filter1_dropdown"
                  }
                />
              </div>
              <hr className="sidebar_hr" />
              <div
                className={
                  this.state.view_enquiries_filter
                    ? "h_p_filter1_content_container "
                    : "h_p_filter1_content_container h_p_hide_filter"
                }
                id="h_p_pilot_type_filter"
              >
                <div id="pd_filter1_checkbox_label">
                  {" "}
                  <NavLink
                    
                    activeClassName="h_p_sidebar_active"
                    to="/center_dashboard/activities/enquiries"
                  >
                   Center Enquiries
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
                    to="/center_dashboard/activities/bookmarks"
                  >
                    Bookmarked Centers
                  </NavLink>
                </div>{" "}
                <div id="pd_filter1_checkbox_label">
                  {" "}
                  <NavLink
                    exact
                    activeClassName="h_p_sidebar_active"
                    to="/center_dashboard/activities/following"
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
              path="/center_dashboard/activities/following"
              component={Center_following}
            />
             <Route
              path="/center_dashboard/activities/enquiries"
              component={Center_enquiries}
            />
            <Route
              path="/center_dashboard/activities/followers"
              component={Center_followers}
            />
            <Route
              path="/center_dashboard/activities/bookmarks"
              component={Center_bookmarks}
            />
            <Route
              path="/center_dashboard/activities/likes"
              component={Center_Likes}
            />
            <Route
              path="/center_dashboard/activities/downloads"
              component={Center_downloads}
            />
          </Switch>
        </Col>
      </Row>
    );
  }
}
export default Activities_Sidebar;
