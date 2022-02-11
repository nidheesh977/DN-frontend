import React from "react";
import "../../css/HirePilot.css";
import dropdown from "../../images/s_c_dropdown2.png";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import "./css/Activities_Sidebar.css";
// import Pilot_followers from 'Pilot_followers'
import { Route, Switch, NavLink } from "react-router-dom";
import Company_jobs from "./Company_jobs";
import Company_received from "./Company_received";
import Company_downloads from "./Company_downloads";
import Company_savedPilots from "./Company_savedPilots";
import Company_hired from "./Company_hired";
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


class Activities_Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view_jobs_filter: false,
      view_store_filter: false,
     
    };
  }

  dropdown = (id) => {
    id = "view_" + id;
    this.setState({
      [id]: !this.state[id],
    });
  };

  render() {
    return (
        <Row>

          <Col xl={3} lg={4} md={12} sm={12}>
            <div>
            <div className="media_box">
              <div
                className="sidebar_filter1_title"
                onClick={() => this.dropdown("jobs_filter")}
              >
                Jobs{" "}
                <img
                  src={dropdown}
                  id="dropimg"
                  alt="dropdown img"
                  className={
                    this.state.view_jobs_filter
                      ? "h_p_filter1_dropdown h_p_dropdown_selected"
                      : "h_p_filter1_dropdown"
                  }
                />
              </div>
              <hr className="sidebar_hr" />
              <div
                className={
                  this.state.view_jobs_filter
                    ? "h_p_filter1_content_container "
                    : "h_p_filter1_content_container h_p_hide_filter"
                }
                id="h_p_pilot_type_filter"
              >
                <div id="pd_filter1_checkbox_label">
                  {" "}
                  <NavLink
                    activeClassName="h_p_sidebar_active"
                    to="/company_dashboard/activities/jobs"
                  >
                    Uploaded Jobs
                  </NavLink>
                </div>
                <div id="pd_filter1_checkbox_label">
                  {" "}
                  <NavLink
                    activeClassName="h_p_sidebar_active"
                    to="/company_dashboard/activities/received"
                  >
                    Received Applications
                  </NavLink>
                </div>{" "}
                <div id="pd_filter1_checkbox_label">
                  {" "}
                  <NavLink
                    activeClassName="h_p_sidebar_active"
                    to="/company_dashboard/activities/hired"
                  >
                    Hired Pilots
                  </NavLink>
                </div>
                <div id="pd_filter1_checkbox_label">
                  {" "}
                  <NavLink
                    activeClassName="h_p_sidebar_active"
                    to="/company_dashboard/activities/savedPilots"
                  >
                    Saved Pilots
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="media_box">
              <div
                className="sidebar_filter1_title"
                onClick={() => this.dropdown("store_filter")}
              >
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
                    to="/company_dashboard/activities/downloads"
                  >
                    Downloaded files
                  </NavLink>
                </div>
              </div>
            </div>
            
           
            </div>
          </Col>

          <Col>
          
            <Switch>
            <Route
                path="/company_dashboard/activities/savedPilots"
                component={Company_savedPilots} />
            <Route
                path="/company_dashboard/activities/received"
                component={Company_received}
              />
            <Route
                path="/company_dashboard/activities/jobs"
                component={Company_jobs}
              /><Route
              path="/company_dashboard/activities/hired"
              component={Company_hired}
            />
              <Route
              path="/company_dashboard/activities/downloads"
              component={Company_downloads}
            /> 
              {/*
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
              <Route
                path="/pilot_dashboard/activities/3d"
                component={Pilot_3d}
              />
              <Route
                path="/pilot_dashboard/activities/360"
                component={Pilot_360}
              /><Route
              path="/pilot_dashboard/activities/downloads"
              component={Pilot_downloads}
            /> */}
              {/* <Route exact path="/pilot_dashboard/account" component={Account_Sidebar} /> */}
            </Switch>
          </Col>
        </Row>
    );
  }
}
export default Activities_Sidebar;
