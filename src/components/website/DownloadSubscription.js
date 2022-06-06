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
      uploadedImages: [],
      uploaded3d: [],
      uploadedVideos: [],
      pendingImages: [],
      pending3d: [],
      pendingVideos: [],
      cancelSubscriptionPopup: false,
      subscriptionCancelled: false,
      subscriptionDetails: false,
    };
  }

  componentWillMount() {
    let role = localStorage.getItem("role");
    if (role === "company") {
      this.props.history.push("/HireSubscription");
    }else if (role === "halfCompany"){
      this.props.history.push("/createCompany");
    }else if (role === "halfPilot"){
      this.props.history.push("/createPilot");
    }else if (role === "booster" || role === "service_center"){
      this.props.history.push("/no-page-found");
    }
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
          if (res.data.subscription.plan.includes("Yearly")){
            this.setState({
              subYearly: true
            })
          }
          this.setState({
            myPlan: res.data.subscription.plan,
          });
        }
      });
  }

  changeSubscription = () => {
    this.setState({
      subYearly: !this.state.subYearly,
    });
  };

  upgradeGold = () => {
    console.log(this.state.data);
    if (
      this.state.myPlan.includes("Platinum") ||
      this.state.myPlan.includes("platinum")
    ) {
      axios
        .post(`${domain}/api/image/getApprovedImages`, this.config)
        .then((response) => {
          console.log(response.data);
          this.setState({
            uploadedImages: response.data,
          });
        });
      axios
        .post(`${domain}/api/image/getApprovedVideos`, this.config)
        .then((response) => {
          console.log(response.data);
          this.setState({
            uploadedVideos: response.data,
          });
        });
      axios
        .post(`${domain}/api/image/getApproved3d`, this.config)
        .then((response) => {
          console.log(response.data);
          this.setState({
            uploaded3d: response.data,
          });
        });
      axios
        .post(`${domain}/api/image/getPendingImages`, this.config)
        .then((response) => {
          console.log(response.data);
          this.setState({
            pendingImages: response.data,
          });
        });
      axios
        .post(`${domain}/api/image/getPendingVideos`, this.config)
        .then((response) => {
          console.log(response.data);
          this.setState({
            pendingVideos: response.data,
          });
        });
      axios
        .post(`${domain}/api/image/getPending3d`, this.config)
        .then((response) => {
          console.log(response.data);
          this.setState({
            pending3d: response.data,
          });
        });

      this.setState({
        cancelSubscriptionPopup: true,
      });
    } else {
      this.props.history.push(
        `checkout/${this.state.data[this.state.subYearly ? 3 : 1]._id}`
      );
    }
  };

  deleteImage = (id, path) => {
    axios
      .post(`${domain}/api/image/deleteImage/${id}`, this.config)
      .then((res) => {
        axios
          .post(`${domain}/api/image/${path}`, this.config)
          .then((response) => {
            console.log(response.data);
            if (path === "getApprovedImages") {
              this.setState({
                uploadedImages: response.data,
              });
            } else if (path === "getPendingImages") {
              this.setState({
                pendingImages: response.data,
              });
            } else if (path === "getApprovedVideos") {
              this.setState({
                uploadedVideos: response.data,
              });
            } else if (path === "getPendingVideos") {
              this.setState({
                pendingVideos: response.data,
              });
            } else if (path === "getApproved3d") {
              this.setState({
                uploaded3d: response.data,
              });
            } else if (path === "getPending3d") {
              this.setState({
                pending3d: response.data,
              });
            }
          });
      });
  };

  confirmCancelSubscription = () => {
    this.props.history.push(
      `checkout/${this.state.data[this.state.subYearly ? 3 : 1]._id}`
    );
  };

  render() {
    return (
      <section>
        <Helmet>
          <title>Pilot Subscription</title>
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
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="subs_plan">Monthly</div>
            <label class="switch">
              <input
                type="checkbox"
                checked={this.state.subYearly}
                onChange={this.changeSubscription}
                id="test"
              />
              <span class="slider round"></span>
            </label>
            <div className="subs_plan">Yearly (2 months free)</div>
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
                    {/* {this.state.data[0].name} */}
                    Basic
                  </div>
                  <div className="subscription_plan_description">
                    {this.state.data[0].description}
                  </div>
                  <div className="subscription_plan_price">
                    {/* ${this.state.data[0].price}.00 */}
                    Free
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
                    {this.state.subYearly ? "Gold Yearly" : "Gold Monthly"}
                  </div>
                  <div className="subscription_plan_description">
                    {this.state.subYearly
                      ? this.state.data[3].description
                      : this.state.data[1].description}
                  </div>
                  <div className="subscription_plan_price">
                    {this.state.subYearly
                      ? `$${this.state.data[3].price}.00`
                      : `$${this.state.data[1].price}.00`}
                  </div>

                  <div className="subscription_plan_btn_container">
                    {(this.state.myPlan === "Gold Monthly" &&
                      !this.state.subYearly) ||
                    (this.state.myPlan === "Gold Yearly" &&
                      this.state.subYearly) ? (
                      <button className="subscription_plan_btn2">
                        Current Plan
                      </button>
                    ) : (
                      <div
                      // to={`checkout/${
                      //   this.state.data[this.state.subYearly ? 3 : 1]._id
                      // }`}
                      >
                        <button
                          className="subscription_plan_btn2"
                          onClick={this.upgradeGold}
                        >
                          Upgrade plan
                        </button>
                      </div>
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
                    {this.state.subYearly
                      ? "Platinum Yearly"
                      : "Platinum Monthly"}
                  </div>
                  <div className="subscription_plan_description">
                    {this.state.subYearly
                      ? this.state.data[4].description
                      : this.state.data[2].description}
                  </div>
                  <div className="subscription_plan_price">
                    {this.state.subYearly
                      ? `$${this.state.data[4].price}.00`
                      : `$${this.state.data[2].price}.00`}
                  </div>

                  <div className="subscription_plan_btn_container">
                    {(this.state.myPlan === "Platinum Monthly" &&
                      !this.state.subYearly) ||
                    (this.state.myPlan === "Platinum Yearly" &&
                      this.state.subYearly) ? (
                      <button className="subscription_plan_btn1">
                        Current Plan
                      </button>
                    ) : (
                      <Link
                        to={`checkout/${
                          this.state.data[this.state.subYearly ? 4 : 2]._id
                        }`}
                      >
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
            ""
          )}
        </Container>

        <Dialog
          open={this.state.cancelSubscriptionPopup}
          onClose={() =>
            this.setState({
              cancelSubscriptionPopup: false,
            })
          }
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
                onClick={() =>
                  this.setState({
                    cancelSubscriptionPopup: false,
                  })
                }
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              {this.state.uploadedImages.length +
                this.state.pendingImages.length >
                15 ||
              this.state.uploaded3d.length + this.state.pending3d.length > 3 ||
              this.state.uploadedVideos.length +
                this.state.pendingVideos.length >
                3 ? (
                <>
                  <div
                    className="u_f_popup_title"
                    style={{ width: "100%", marginBottom: "0px" }}
                  >
                    Delete some files to subscription Gold
                  </div>
                  <div
                    className="u_f_popup_title"
                    style={{ width: "100%", fontSize: "20px" }}
                  >
                    All draft files will be deleted
                  </div>
                  {this.state.uploadedImages.length +
                    this.state.pendingImages.length >
                  15 ? (
                    <>
                      <div
                        className="u_f_popup_title2"
                        style={{ width: "100%" }}
                      >
                        Images (Maximum 15) :
                      </div>
                      <div
                        className="u_f_popup_title3"
                        style={{ width: "100%" }}
                      >
                        {this.state.uploadedImages.length > 0
                          ? "Uploaded Images :"
                          : ""}
                      </div>
                      <Row style={{ width: "100%" }}>
                        {this.state.uploadedImages.map((image, index) => {
                          return (
                            <>
                              <Col md={3} sm={4} xs={6}>
                                <div className="u_i_file_container">
                                  <img
                                    src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`}
                                    alt="uploaded image"
                                    width={"100%"}
                                    style={{ borderRadius: "10px" }}
                                  />
                                  <div
                                    className="u_i_trash"
                                    onClick={() =>
                                      this.deleteImage(
                                        image._id,
                                        "getApprovedImages"
                                      )
                                    }
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                  </div>
                                </div>
                              </Col>
                            </>
                          );
                        })}
                      </Row>
                      <div
                        className="u_f_popup_title3"
                        style={{ width: "100%" }}
                      >
                        {this.state.pendingImages.length
                          ? "Pending Images :"
                          : ""}
                      </div>
                      <Row style={{ width: "100%" }}>
                        {this.state.pendingImages.map((image, index) => {
                          return (
                            <>
                              <Col md={3} sm={4} xs={6}>
                                <div className="u_i_file_container">
                                  <img
                                    src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`}
                                    alt="pending image"
                                    width={"100%"}
                                    style={{ borderRadius: "10px" }}
                                  />
                                  <div
                                    className="u_i_trash"
                                    onClick={() =>
                                      this.deleteImage(
                                        image._id,
                                        "getPendingImages"
                                      )
                                    }
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                  </div>
                                </div>
                              </Col>
                            </>
                          );
                        })}
                      </Row>
                    </>
                  ) : (
                    ""
                  )}

                  {this.state.uploadedVideos.length +
                    this.state.pendingVideos.length >
                  3 ? (
                    <>
                      <div
                        className="u_f_popup_title2"
                        style={{ width: "100%" }}
                      >
                        Videos (Maximum 3) :
                      </div>
                      <div
                        className="u_f_popup_title3"
                        style={{ width: "100%" }}
                      >
                        {this.state.uploadedVideos.length > 0
                          ? "Uploaded Videos :"
                          : ""}
                      </div>
                      <Row style={{ width: "100%" }}>
                        {this.state.uploadedVideos.map((image, index) => {
                          return (
                            <>
                              <Col md={3} sm={4} xs={6}>
                                <div className="u_i_file_container">
                                  <video
                                    src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`}
                                    width={"100%"}
                                    style={{ borderRadius: "10px" }}
                                  ></video>
                                  <div
                                    className="u_i_trash"
                                    onClick={() =>
                                      this.deleteImage(
                                        image._id,
                                        "getApprovedVideos"
                                      )
                                    }
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                  </div>
                                </div>
                              </Col>
                            </>
                          );
                        })}
                      </Row>
                      <div
                        className="u_f_popup_title3"
                        style={{ width: "100%" }}
                      >
                        {this.state.pendingVideos.length > 0
                          ? "Pending Videos :"
                          : ""}
                      </div>
                      <Row style={{ width: "100%" }}>
                        {this.state.pendingVideos.map((image, index) => {
                          return (
                            <>
                              <Col md={3} sm={4} xs={6}>
                                <div className="u_i_file_container">
                                  <video
                                    src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`}
                                    alt="pending image"
                                    width={"100%"}
                                    style={{ borderRadius: "10px" }}
                                  ></video>
                                  <div
                                    className="u_i_trash"
                                    onClick={() =>
                                      this.deleteImage(
                                        image._id,
                                        "getPendingVideos"
                                      )
                                    }
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                  </div>
                                </div>
                              </Col>
                            </>
                          );
                        })}
                      </Row>
                    </>
                  ) : (
                    ""
                  )}

                  {this.state.uploaded3d.length + this.state.pending3d.length >
                  3 ? (
                    <>
                      <div
                        className="u_f_popup_title2"
                        style={{ width: "100%" }}
                      >
                        3d Images (Maximum 3) :
                      </div>
                      <div
                        className="u_f_popup_title3"
                        style={{ width: "100%" }}
                      >
                        {this.state.uploaded3d.length > 0
                          ? "Uploaded 3d Images :"
                          : ""}
                      </div>
                      <Row style={{ width: "100%" }}>
                        {this.state.uploaded3d.map((image, index) => {
                          return (
                            <>
                              <Col md={3} sm={4} xs={6}>
                                <div className="u_i_file_container">
                                  <img
                                    src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`}
                                    alt="uploaded image"
                                    width={"100%"}
                                    style={{ borderRadius: "10px" }}
                                  />
                                  <div
                                    className="u_i_trash"
                                    onClick={() =>
                                      this.deleteImage(
                                        image._id,
                                        "getApproved3d"
                                      )
                                    }
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                  </div>
                                </div>
                              </Col>
                            </>
                          );
                        })}
                      </Row>
                      <div
                        className="u_f_popup_title3"
                        style={{ width: "100%" }}
                      >
                        {this.state.pending3d.length > 0
                          ? "Pending 3d Images :"
                          : ""}
                      </div>
                      <Row style={{ width: "100%" }}>
                        {this.state.pending3d.map((image, index) => {
                          return (
                            <>
                              <Col md={3} sm={4} xs={6}>
                                <div className="u_i_file_container">
                                  <img
                                    src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`}
                                    alt="pending image"
                                    width={"100%"}
                                    style={{ borderRadius: "10px" }}
                                  />
                                  <div
                                    className="u_i_trash"
                                    onClick={() =>
                                      this.deleteImage(
                                        image._id,
                                        "getPending3d"
                                      )
                                    }
                                  >
                                    <i class="fas fa-trash-alt"></i>
                                  </div>
                                </div>
                              </Col>
                            </>
                          );
                        })}
                      </Row>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <div
                    className="u_f_popup_title"
                    style={{ width: "100%", marginBottom: "0px" }}
                  >
                    Are you sure. Do you want to subscription Gold?
                  </div>
                  <div
                    className="u_f_popup_title"
                    style={{ width: "100%", fontSize: "20px" }}
                  >
                    All draft files will be deleted
                  </div>
                  <div className="u_f_popup_btn_container">
                    <button
                      className="u_f_popup_btn2"
                      onClick={this.confirmCancelSubscription}
                    >
                      Confirm
                    </button>
                  </div>
                </>
              )}
            </Row>
          </DialogContent>
        </Dialog>
      </section>
    );
  }
}

export default DownloadSubscription;
