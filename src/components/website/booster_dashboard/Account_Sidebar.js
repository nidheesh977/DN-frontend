import React from "react";
import "../../css/HirePilot.css";
import dropdown from "../../images/s_c_dropdown2.png";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import "./css/Activities_Sidebar.css";

import { Route, Switch, NavLink } from "react-router-dom";
import Booster_BasicInfo from "./Booster_BasicInfo";
import Booster_notifications from "./Booster_notifications";

class Account_Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view_account_filter: true,
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
      <div>
        <Row gutterWidth={70}>
          <Col xl={3} lg={4} md={12} sm={12}>
          <div>

            <div className="media_box">
                <div
                  className="sidebar_filter1_title"
                  // onClick={() => this.dropdown("account_filter")}
                >
                  My Account{" "}
                  {/* <img
                    src={dropdown}
                    id="dropimg"
                    alt="dropdown img"
                    className={
                      this.state.view_account_filter
                        ? "h_p_filter1_dropdown h_p_dropdown_selected"
                        : "h_p_filter1_dropdown"
                    }
                  /> */}
                </div>
                <hr className="sidebar_hr" />
                <div
                  className={
                    this.state.view_account_filter
                      ? "h_p_filter1_content_container "
                      : "h_p_filter1_content_container h_p_hide_filter"
                  }
                  id="h_p_pilot_type_filter"
                >
                  <div id="pd_filter1_checkbox_label">
                    {" "}
                    <NavLink
                      exact
                      to="/booster_dashboard/account/"
                      activeClassName="h_p_sidebar_active"
                      className="h_p_filter1_checkbox_label"
                    >
                      Profile Information
                    </NavLink>
                  </div>
                  <div id="pd_filter1_checkbox_label">
                    {" "}
                  
                  </div>
                  <div id="pd_filter1_checkbox_label">
                    {" "}
                    <NavLink
                      to="/booster_dashboard/account/notifications"
                      activeClassName="h_p_sidebar_active"
                      className="h_p_filter1_checkbox_label"
                    >
                      Notifications Settings
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <Switch>
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
               <Route
                path="/booster_dashboard/account/notifications"
                component={Booster_notifications}
              />
                <Route
                index
                path="/booster_dashboard/account/"
                component={Booster_BasicInfo}
              />
            </Switch>{" "}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Account_Sidebar;
