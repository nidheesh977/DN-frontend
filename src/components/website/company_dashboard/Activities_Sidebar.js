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
import All from '../../website/All.module.css'
import Company_applications from "./Company_applications";



class Activities_Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view_jobs_filter: true,
      view_store_filter: false,
    };
  }

  dropdown = (id) => {
    id = "view_" + id;
    this.setState({
      [id]: !this.state[id],
    });
  };
  jobsBtn= () =>{
    this.setState({
      view_jobs_filter: true,
      view_store_filter: false,
    })
  }
  storeBtn= () =>{
    this.setState({
      view_jobs_filter: false,
      view_store_filter: true,
    })
  }

  render() {
    return (

      <Row gutterWidth={70}>
        <Col xl={3} lg={4} md={12} sm={12}>
          <div>
            <div className="media_box">
              <div className="sidebar_filter1_title"
              onClick={()=>this.jobsBtn()}>
              <div
                
                onClick={() => this.dropdown("jobs_filter")}
              >
                </div>
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
              <div className="sidebar_filter1_title" onClick={()=>this.storeBtn()}>
              <div
                
                onClick={() => this.dropdown("store_filter")}
              >
              </div>
              
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
              component={Company_savedPilots}
            />
            <Route
              path="/company_dashboard/activities/received"
              component={Company_received}
            />
            <Route
              path="/company_dashboard/activities/receivedApplications"
              component={Company_applications}
            />
            <Route
              path="/company_dashboard/activities/jobs"
              component={Company_jobs}
            />
            <Route
              path="/company_dashboard/activities/hired"
              component={Company_hired}
            />
            <Route
              path="/company_dashboard/activities/downloads"
              component={Company_downloads}
            />
          
          </Switch>
        </Col>
      </Row>
    );
  }
}
export default Activities_Sidebar;
