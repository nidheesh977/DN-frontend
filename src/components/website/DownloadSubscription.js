// import React, { Component } from 'react'
// import { Container, Row, Col } from 'react-grid-system'
// import '../css/DownloadSubscription.css'
// import All from './All.module.css'
// import Dialog from "@material-ui/core/Dialog";
// import MuiDialogContent from "@material-ui/core/DialogContent";
// import Close from "../images/close.svg";
// import { withStyles } from "@material-ui/core/styles";
// import payment_success from '../images/payment_success.png';
// import { Helmet } from "react-helmet";

// const DialogContent = withStyles((theme) => ({
//     root: {
//         padding: theme.spacing(2),
//     },
// }))(MuiDialogContent);

// class DownloadSubscription extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             payment_success: false,
//         }
//     }

//     loadScript = (src) => {
//         return new Promise((resolve) => {
//             const script = document.createElement("script");
//             script.src = src;
//             script.onload = () => {
//                 resolve(true);
//             };
//             script.onerror = () => {
//                 resolve(false);
//             };
//             document.body.appendChild(script);
//         });
//     }

//     subscribe = (amount, id) => {
//         this.setState({
//             payment_success: true
//         })
//     }

//     closePaymentPopup = () => {
//         this.setState({
//             payment_success: false
//         })
//     }

//     render() {
//         return (
//             <section>
//                 <Helmet>
//                     <title>Download Subscription</title>
//                     <meta charSet="utf-8" />
//                     <meta name="description" content="Nested component" />
//                 </Helmet>
//                 <Container className={All.Container + " u_p_v_container"}>
//                     <div className="u_p_v_heading">Simple plans for everyone</div>
//                     <Row gutterWidth={34}>
//                         <Col xl={4} lg={4} md={6} sm={12} xs={12}>
//                             <div className="u_p_v_plan_container u_p_v_plan_selected">
//                                 <div className="u_p_v_title">Single Image</div>
//                                 <div className="u_p_v_price">$5.00</div>
//                                 <button className="u_p_v_button1" onClick={() => this.subscribe(5, 1)}>Subscribe Now</button>
//                                 <div className="u_p_v_plan_features">
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col xl={4} lg={4} md={6} sm={12} xs={12}>
//                             <div className="u_p_v_plan_container">
//                                 <div className="u_p_v_title">Five Images</div>
//                                 <div className="u_p_v_price">$20.00</div>
//                                 <button className="u_p_v_button2" onClick={() => this.subscribe(20, 2)}>Subscribe Now</button>
//                                 <div className="u_p_v_plan_features">
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col xl={4} lg={4} md={6} sm={12} xs={12}>
//                             <div className="u_p_v_plan_container">
//                                 <div className="u_p_v_title">Ten Images</div>
//                                 <div className="u_p_v_price">$30.00</div>
//                                 <button className="u_p_v_button2" onClick={() => this.subscribe(30, 3)}>Subscribe Now</button>
//                                 <div className="u_p_v_plan_features">
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                     <div className="u_p_v_plan_feature">
//                                         <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//                 <Dialog
//                     open={this.state.payment_success}
//                     onClose={this.closePaymentPopup}
//                     aria-labelledby="alert-dialog-title"
//                     aria-describedby="alert-dialog-description"
//                     maxWidth={"md"}
//                     fullWidth={true}
//                 >

//                     <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
//                         <div style={{ position: "absolute", top: '20px', right: '20px' }}>
//                             <img src={Close} alt="" onClick={this.closePaymentPopup} style={{ cursor: "pointer" }} />
//                         </div>
//                         <Row style={{ marginTop: "30px" }}>
//                             <img src={payment_success} alt="" style={{ margin: "auto" }} />
//                             <div className="u_p_v_popup_title">Thank you</div>
//                             <div className="u_p_v_popup_content">We have recieved your payment</div>
//                             <button className="u_p_v_popup_close_btn" onClick={this.closePaymentPopup}>Close</button>
//                         </Row>
//                     </DialogContent>
//                 </Dialog>
//             </section>
//         )
//     }
// }

// export default DownloadSubscription

import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import { Helmet } from "react-helmet";
import All from "./All.module.css";
import "../css/HireSubscription.css";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Close from "../images/close.svg";
import { withStyles } from "@material-ui/core/styles";
import payment_success from "../images/payment_success.png";
import Cross from "../images/crossSub.png";
import Tick from "../images/tickSub.png";
import axios from "axios";
import { Link } from "react-router-dom";
const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

class DownloadSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_success: false,
      msg_sent_success: false,
      data: [],
      myPlan: "",
      subYearly: false,
    };
  }

  loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  subscribe = (amount, id) => {
    this.setState({
      payment_success: true,
    });
  };

  closePaymentPopup = () => {
    this.setState({
      payment_success: false,
      msg_sent_success: true,
    });
  };

  closeMsgSentSuccess = () => {
    this.setState({
      msg_sent_success: false,
    });
  };
  config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  componentDidMount() {
    axios.get(`${domain}/api/subscription/getSubscriptions`).then((res) => {
      console.log(res);
      this.setState({
        data: res.data,
      });
    });
    axios
      .get(
        `${domain}/api/pilotSubscription/getMySubscription
  `,
        this.config
      )
      .then((res) => {
        console.log(res);
        if (res.data.subscription !== null) {
          this.setState({
            myPlan: res.data.subscription.plan,
          });
        }
      });
  }

  changeSubscription = () => {
      this.setState({
          subYearly: !this.state.subYearly
      })
  }

  render() {
    return (
      <section>
        <Helmet>
          <title>Hire Subscription</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <Container className={All.Container}>
          <div className="hire_subscription_container">
            <div className="hire_subscription_heading">Pricing & Planning</div>
            <div className="hire_subscription_description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex rerum,
              et fugit officiis soluta aut voluptatibus. Quis dignissimos
              exercitationem perspiciatis, architecto, tenetur voluptate aut
              dolore esse optio ea quaerat adipisci.
            </div>
          </div>
          <div style = {{display: "flex", marginBottom: "20px", justifyContent: "center", alignItems: "center"}}>
            <div className="subs_plan">Monthly</div>
            <label class="switch">
              <input type="checkbox" checked = {this.state.subYearly} onChange = {this.changeSubscription} id = "test"/>
              <span class="slider round"></span>
            </label>
            <div className="subs_plan">Yearly</div>
          </div>
          {this.state.data.length > 0 ? (
            <Row gutterWidth={19}>
              <Col>
                <div
                  className="subscription_plan_container"
                  style={{ border: "1px solid #c6c6c6", borderRadius: "20px" }}
                >
                  <div className="subscription_circle1">
                    <div className="subscription_inner_circle1"></div>
                  </div>
                  <div className="subscription_plan_title">
                    {this.state.data[0].name}
                  </div>
                  <div className="subscription_plan_description">
                    {this.state.data[0].description}
                  </div>
                  <div className="subscription_plan_price">
                    ${this.state.data[0].price}.00
                  </div>

                  <div className="subscription_plan_btn_container">
                    <button className="subscription_plan_btn1">
                      Basic Plan
                    </button>
                  </div>
                  <div className="subscription_plan_features">
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />{" "}
                      <span>
                        Total Image Uploads : {this.state.data[0].images}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />{" "}
                      <span>
                        Total Videos Uploads : {this.state.data[0].videos}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />{" "}
                      <span>
                        Total 3Dimages Uploads : {this.state.data[0].images3d}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[0].draft === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Save as Draft Feature</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[0].multiple === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Multiple Image Upload Feature</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[0].approval === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Immediate Approval of Images</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[0].jobNotifications === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Daily Job Notifications</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[0].suggestions === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Profile in suggestions of Top Jobs</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[0].proLabel === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Pro Label on your Profile</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[0].rearrange === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Access to rearrange your images to display</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[0].hireButton === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Chances to get hired from your shoot pages</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="subscription_plan_container subscription_plan_container_selected">
                  <div className="subscription_circle2">
                    <div className="subscription_inner_circle2"></div>
                  </div>
                  <div className="subscription_plan_title">
                    {this.state.data[1].name}
                  </div>
                  <div className="subscription_plan_description">
                    {this.state.subYearly
                    ?this.state.data[3].description
                    :this.state.data[1].description}
                  </div>
                  <div className="subscription_plan_price">
                  {this.state.subYearly
                    ?`$${this.state.data[3].price}.00`
                    :`$${this.state.data[1].price}.00`}
                  </div>

                  <div className="subscription_plan_btn_container">
                    {this.state.myPlan === "gold" ? (
                      <button className="subscription_plan_btn2">
                        Current Plan
                      </button>
                    ) : (
                      <Link to={`checkout/${this.state.data[1]._id}`}>
                        <button className="subscription_plan_btn2">
                          Upgrade plan
                        </button>
                      </Link>
                    )}
                  </div>
                  <div className="subscription_plan_features">
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />{" "}
                      <span>
                        Total Image Uploads : {this.state.data[1].images}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />{" "}
                      <span>
                        Total Videos Uploads : {this.state.data[1].videos}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />{" "}
                      <span>
                        Total 3Dimages Uploads : {this.state.data[1].images3d}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[1].draft === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Save as Draft Feature</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[1].multiple === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Multiple Image Upload Feature</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[1].approval === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Immediate Approval of Images</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[1].jobNotifications === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Daily Job Notifications</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[1].suggestions === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Profile in suggestions of Top Jobs</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[1].proLabel === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Pro Label on your Profile</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[1].rearrange === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Access to rearrange your images to display</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[1].hireButton === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Chances to get hired from your shoot pages</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                  className="subscription_plan_container"
                  style={{ border: "1px solid #c6c6c6", borderRadius: "20px" }}
                >
                  <div className="subscription_circle1">
                    <div className="subscription_inner_circle1"></div>
                  </div>
                  <div className="subscription_plan_title">
                    {this.state.data[2].name}
                  </div>
                  <div className="subscription_plan_description">
                  {this.state.subYearly
                    ?this.state.data[4].description
                    :this.state.data[2].description}
                  </div>
                  <div className="subscription_plan_price">
                  {this.state.subYearly
                    ?`$${this.state.data[4].price}.00`
                    :`$${this.state.data[2].price}.00`}
                  </div>

                  <div className="subscription_plan_btn_container">
                    {this.state.myPlan === "platinum" ? (
                      <button className="subscription_plan_btn1">
                        Current Plan
                      </button>
                    ) : (
                      <Link to={`checkout/${this.state.data[2]._id}`}>
                        <button className="subscription_plan_btn1">
                          Upgrade plan
                        </button>
                      </Link>
                    )}
                  </div>
                  <div className="subscription_plan_features">
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />{" "}
                      <span>
                        Total Image Uploads : {this.state.data[2].images}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />{" "}
                      <span>
                        Total Videos Uploads : {this.state.data[2].videos}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />{" "}
                      <span>
                        Total 3Dimages Uploads : {this.state.data[2].images3d}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[2].draft === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Save as Draft Feature</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[2].multiple === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Multiple Image Upload Feature</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[2].approval === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Immediate Approval of Images</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[2].jobNotifications === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Daily Job Notifications</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[2].suggestions === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Profile in suggestions of Top Jobs</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[2].proLabel === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Pro Label on your Profile</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[2].rearrange === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Access to rearrange your images to display</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {this.state.data[2].hireButton === true ? (
                        <img src={Tick} />
                      ) : (
                        <img src={Cross} />
                      )}{" "}
                      <span>Chances to get hired from your shoot pages</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row gutterWidth={19}>
              <Col>
                <div
                  className="subscription_plan_container"
                  style={{ border: "1px solid #c6c6c6", borderRadius: "20px" }}
                >
                  <div className="subscription_circle1">
                    <div className="subscription_inner_circle1"></div>
                  </div>
                  <div className="subscription_plan_title">Plan name</div>
                  <div className="subscription_plan_description">
                    This plan for free to every users
                  </div>
                  <div className="subscription_plan_price">$9.99</div>
                  <div className="subscription_plan_price_description">
                    This plan for free to every users
                  </div>
                  <div className="subscription_plan_btn_container">
                    <button
                      className="subscription_plan_btn1"
                      onClick={() => this.subscribe(9.99, 1)}
                    >
                      Upgrade plan
                    </button>
                  </div>
                  <div className="subscription_plan_features">
                    <div className="subscription_plan_feature">
                      <i class="fa fa-check" aria-hidden="true"></i> This plan
                      for free to every users
                    </div>
                    <div className="subscription_plan_feature">
                      <i class="fa fa-check" aria-hidden="true"></i> This plan
                      for free to every users
                    </div>
                    <div className="subscription_plan_feature">
                      <i class="fa fa-check" aria-hidden="true"></i> This plan
                      for free to every users
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="subscription_plan_container subscription_plan_container_selected">
                  <div className="subscription_circle2">
                    <div className="subscription_inner_circle2"></div>
                  </div>
                  <div className="subscription_plan_title">Silver</div>
                  <div className="subscription_plan_description">
                    This plan for free to every users
                  </div>
                  <div className="subscription_plan_price">$99.99</div>
                  <div className="subscription_plan_price_description">
                    This plan for free to every users
                  </div>
                  <div className="subscription_plan_btn_container">
                    <button
                      className="subscription_plan_btn2"
                      onClick={() => this.subscribe(99.99, 2)}
                    >
                      Upgrade plan
                    </button>
                  </div>
                  <div className="subscription_plan_features">
                    <div className="subscription_plan_feature">
                      <i class="fa fa-check" aria-hidden="true"></i> This plan
                      for free to every users
                    </div>
                    <div className="subscription_plan_feature">
                      <i class="fa fa-check" aria-hidden="true"></i> This plan
                      for free to every users
                    </div>
                    <div className="subscription_plan_feature">
                      <i class="fa fa-check" aria-hidden="true"></i> This plan
                      for free to every users
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                  className="subscription_plan_container"
                  style={{ border: "1px solid #c6c6c6", borderRadius: "20px" }}
                >
                  <div className="subscription_circle1">
                    <div className="subscription_inner_circle1"></div>
                  </div>
                  <div className="subscription_plan_title">Silver</div>
                  <div className="subscription_plan_description">
                    This plan for free to every users
                  </div>
                  <div className="subscription_plan_price">$499.99</div>
                  <div className="subscription_plan_price_description">
                    This plan for free to every users
                  </div>
                  <div className="subscription_plan_btn_container">
                    <button
                      className="subscription_plan_btn1"
                      onClick={() => this.subscribe(499.99, 3)}
                    >
                      Upgrade plan
                    </button>
                  </div>
                  <div className="subscription_plan_features">
                    <div className="subscription_plan_feature">
                      <i class="fa fa-check" aria-hidden="true"></i> This plan
                      for free to every users
                    </div>
                    <div className="subscription_plan_feature">
                      <i class="fa fa-check" aria-hidden="true"></i> This plan
                      for free to every users
                    </div>
                    <div className="subscription_plan_feature">
                      <i class="fa fa-check" aria-hidden="true"></i> This plan
                      for free to every users
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
        <Dialog
          open={this.state.payment_success}
          onClose={this.closePaymentPopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={this.closePaymentPopup}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <img src={payment_success} alt="" style={{ margin: "auto" }} />
              <div className="u_p_v_popup_title">Thank you</div>
              <div className="u_p_v_popup_content">
                We have recieved your payment
              </div>
              <button
                className="u_p_v_popup_close_btn"
                onClick={this.closePaymentPopup}
              >
                Close
              </button>
            </Row>
          </DialogContent>
        </Dialog>
        {/* <Dialog
          open={this.state.msg_sent_success}
          onClose={this.closeMsgSentSuccess}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
        >

          <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
            <div style={{ position: "absolute", top: '20px', right: '20px' }}>
              <img src={Close} alt="" onClick={this.closeMsgSentSuccess} style={{ cursor: "pointer" }} />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_p_v_msg_popup_title">Your message has been sent to pilot Successfully</div>
              <div className="u_p_v_msg_popup_close_btn_container">
                <button className="u_p_v_msg_popup_close_btn" onClick={this.closeMsgSentSuccess}>Open Dashboard</button>
              </div>
            </Row>
          </DialogContent>
        </Dialog> */}
      </section>
    );
  }
}

export default DownloadSubscription;
