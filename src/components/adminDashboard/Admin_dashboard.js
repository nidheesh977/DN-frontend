import React, { useState } from "react";
import { NavLink, Link, useHistory, Switch, Route } from "react-router-dom";
import All from "../website/All.module.css";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import Admin_pendingJobs from "./Admin_pendingJobs";
import Admin_showJobs from "./Admin_showJobs";
import Admin_activeJobs from "./Admin_activeJobs";

function Admin_dashboard() {
  // let history = useHistory();
  let [data, setData] = useState(true);
  function logout() {
    window.localStorage.clear();
    // history.push ('/');
    window.location.reload();
  }

  return (
    <div>
      <div style = {{background: "aquamarine"}}>
        <div className="p_d_navbar">
          <Container
            className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}
          >
            <Link id="p_d_navitem1">DashBoard</Link>
            <Link style={{ float: "right" }} onClick={logout}>
              Logout
            </Link>
          </Container>
        </div>
        <div style={{marginTop : "40px"}}>

        <Container
          className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}
        >
          <Row gutterWidth={70}>
            <Col xl={3} lg={4} md={12} sm={12} style = {{background: "#fff", height: "250px", position: "sticky", top: "100px"}}>
              <div >
                <div className="media_box">
                  <div className="sidebar_filter1_title">Jobs</div>
                  <hr className="sidebar_hr" />
                  <div
                    className={
                      data
                        ? "h_p_filter1_content_container "
                        : "h_p_filter1_content_container h_p_hide_filter"
                    }
                    id="h_p_pilot_type_filter"
                  >
                    <div id="pd_filter1_checkbox_label">
                      {" "}
                      <NavLink
                        exact
                        to="/admin_dashboard/pendingJobs"
                        activeClassName="h_p_sidebar_active"
                        className="h_p_filter1_checkbox_label"
                      >
                        Pending Jobs
                      </NavLink>
                    </div>
                    <div id="pd_filter1_checkbox_label">
                      {" "}
                      <NavLink
                        to="/admin_dashboard/activeJobs"
                        activeClassName="h_p_sidebar_active"
                        className="h_p_filter1_checkbox_label"
                      >
                        Active Jobs
                      </NavLink>{" "}
                    </div>

                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <Switch>
              <Route
                  path="/admin_dashboard/pendingJobs"
                  component={Admin_pendingJobs}
                /><Route
                path="/admin_dashboard/activeJobs"
                component={Admin_activeJobs}
              />
                <Route
                path="/admin_dashboard/showJobs/:id"
                component={Admin_showJobs}
              />
                {/* <Route
                path="/pilot_dashboard/account/notifications"
                component={Pilot_notifications}
              />
              <Route
                path="/pilot_dashboard/account/professionalInformation"
                component={Pilot_ProfessionalInfo}
              />

              <Route
                index
                path="/pilot_dashboard/account/"
                component={Pilot_BasicInfo}
              /> */}
                {/* <Route exact path="/pilot_dashboard/account" component={Account_Sidebar} /> */}
              </Switch>{" "}
            </Col>
          </Row>
        </Container>
        </div>

      </div>
    </div>
  );
}

export default Admin_dashboard;
