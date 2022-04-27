import React from "react";
import "../../css/HirePilot.css";
import dropdown from "../../images/s_c_dropdown2.png";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import "./css/Activities_Sidebar.css";
import Pilot_notifications from "./Pilot_notifications";
import Pilot_BasicInfo from "./Pilot_BasicInfo";
import Pilot_ProfessionalInfo from "./Pilot_ProfessionalInfo";
import { Route, Switch, NavLink } from "react-router-dom";
import Pilot_Payments from "./Pilot_Payments";
import HelpCenter from "./HelpCenter";
import Pilot_helpCenter from "./Pilot_helpCenter";
import PilotPaymentAddress from "./PilotPaymentAddress"

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
                      to="/pilot_dashboard/account/"
                      activeClassName="h_p_sidebar_active"
                      className="h_p_filter1_checkbox_label"
                    >
                      Profile Information
                    </NavLink>
                  </div>
                  <div id="pd_filter1_checkbox_label">
                    {" "}
                    <NavLink
                      to="/pilot_dashboard/account/professionalInformation"
                      activeClassName="h_p_sidebar_active"
                      className="h_p_filter1_checkbox_label"
                    >
                      Professional Information
                    </NavLink>{" "}
                  </div>
                  <div id="pd_filter1_checkbox_label">
                    {" "}
                    <NavLink
                      to="/pilot_dashboard/account/payments"
                      activeClassName="h_p_sidebar_active"
                      className="h_p_filter1_checkbox_label"
                    >
                      My Payments
                    </NavLink>
                  </div>
                  <div id="pd_filter1_checkbox_label">
                    {" "}
                    <NavLink
                      to="/pilot_dashboard/account/payment_address"
                      activeClassName="h_p_sidebar_active"
                      className="h_p_filter1_checkbox_label"
                    >
                      Payment Address
                    </NavLink>
                  </div>
                  <div id="pd_filter1_checkbox_label">
                    {" "}
                    <NavLink
                      to="/pilot_dashboard/account/help-center"
                      activeClassName="h_p_sidebar_active"
                      className="h_p_filter1_checkbox_label"
                    >
                      Help Center
                    </NavLink>
                  </div>
                  <div id="pd_filter1_checkbox_label">
                    {" "}
                    <NavLink
                      to="/pilot_dashboard/account/notifications"
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
              <Route
                path="/pilot_dashboard/account/notifications"
                component={Pilot_notifications}
              />
              <Route
                path="/pilot_dashboard/account/professionalInformation"
                component={Pilot_ProfessionalInfo}
              />
              <Route
                path="/pilot_dashboard/account/payments"
                component={Pilot_Payments}
              />
              <Route
                path="/pilot_dashboard/account/payment_address"
                component={PilotPaymentAddress}
              />
              <Route
                path="/pilot_dashboard/account/help-center"
                component={Pilot_helpCenter}
              />

              <Route
                index
                path="/pilot_dashboard/account/"
                component={Pilot_BasicInfo}
              />
              {/* <Route exact path="/pilot_dashboard/account" component={Account_Sidebar} /> */}
            </Switch>{" "}
          </Col>
        </Row>
      </div>
    );
  }
}
export default Account_Sidebar;
