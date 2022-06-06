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

class HireSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_success: true,
      msg_sent_success: false,
      data: [],
      myPlan: "",
      subYearly: false,
    };
  }

  componentWillMount() {
    let role = localStorage.getItem("role");
    if (role === "pilot") {
      this.props.history.push("/DownloadSubscription");
    }
    else if (role && role !== "company"){
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

  // async subscribe(amount, id) {
  //     const res = await this.loadScript(
  //         "https://checkout.razorpay.com/v1/checkout.js"
  //     );

  //     if (!res) {
  //         alert("Razorpay SDK failed to load. Are you online?");
  //         return;
  //     }

  //     const options = {
  //         key: "rzp_test_tzURXA4gSDw99d", // Enter the Key ID generated from the Dashboard
  //         amount: amount * 100,
  //         currency: "USD",
  //         name: "User name",
  //         description: "Test Transaction",
  //         // image: { logo },
  //         id: id,
  //         prefill: {
  //             name: "User name",
  //             email: "email@gmail.com",
  //             contact: "9876543210",
  //         },
  //         notes: {
  //             address: "Bangalore, Karnataka",
  //         },
  //         theme: {
  //             color: "#61dafb",
  //         },
  //     };

  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.open();

  // }

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

  changeSubscription = () => {
    this.setState({
      subYearly: !this.state.subYearly,
    });
  };

  componentDidMount() {
    axios.get(`${domain}/api/subscription/getSubscriptions`).then((res) => {
      console.log(res);
      this.setState({
        data: res.data,
      });
    });
    if(localStorage.getItem("role") === "company"){
      axios
      .get(
        `${domain}/api/company/getCompanySubscription
  `,
        this.config
      ) 
      .then((res) => {
        console.log(res);
        if (res.data.subscription !== null) {
          if (res.data.subscription.plan.includes("yearly")){
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
                  <div className="subscription_plan_title">Basic</div>
                  <div className="subscription_plan_description"></div>
                  <div className="subscription_plan_price">Free</div>

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
                      <img src={Tick} /> <span>No of active Jobs : 1</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} /> <span>Profile View Count : 20</span>
                    </div>

                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Cross} />
                      <span>Saving Pilots</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Cross} />
                      <span>Email proposals (Direct Hire)</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Cross} />
                      <span>Draft access</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Cross} />
                      <span>Suggested Candidated</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Cross} />
                      <span>Boost Job</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Cross} />{" "}
                      <span>Verified Recruiter Indication</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                  className="subscription_plan_container subscription_plan_container_selected"
                  style={{ border: "1px solid #c6c6c6", borderRadius: "20px" }}
                >
                  <div className="subscription_circle2">
                    <div className="subscription_inner_circle2"></div>
                  </div>
                  <div className="subscription_plan_title">
                    {this.state.subYearly ? "Gold Yearly" : "Gold Monthly"}
                  </div>
                  <div className="subscription_plan_description"></div>
                  <div className="subscription_plan_price">
                    {this.state.subYearly ? "$500.00" : "$50.00"}
                  </div>
                  <div className="subscription_plan_btn_container">
                    {((this.state.myPlan === "gold-monthly" && !this.state.subYearly) || (this.state.myPlan === "gold-yearly" && this.state.subYearly)) ? (
                      <button className="subscription_plan_btn2">
                        Current Plan
                      </button>
                    ) : (
                      <Link to = {this.state.subYearly ? "/company-checkout/gold-yearly" : "/company-checkout/gold-monthly"}>
                      <button className="subscription_plan_btn2">
                        Upgrade Plan
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
                        No of active Jobs : {this.state.subYearly ? 60 : 5}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />{" "}
                      <span>
                        Profile View Count : {this.state.subYearly ? 600 : 50}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />
                      <span>Saving Pilots</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />
                      <span>
                        Email proposals (Direct Hire) :{" "}
                        {this.state.subYearly ? 1200 : 100}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />
                      <span>Draft access</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />
                      <span>Suggested Candidated</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Cross} />
                      <span>Boost Job</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Cross} />{" "}
                      <span>Verified Recruiter Indication</span>
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
                  <div className="subscription_plan_description"></div>
                  <div className="subscription_plan_price">
                    {this.state.subYearly ? "$1000.00" : "$100.00"}
                  </div>

                  <div className="subscription_plan_btn_container">
                    {(this.state.myPlan === "platinum-monthly" && !this.state.subYearly) || (this.state.myPlan === "platinum-yearly" && this.state.subYearly) ? (
                      <button className="subscription_plan_btn1">
                        Current Plan
                      </button>
                    ) : (
                      <Link to={`/company-checkout/${this.state.subYearly ? "platinum-yearly" : "platinum-monthly"}`}>
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
                        No of active Jobs : {this.state.subYearly ? 120 : 10}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />{" "}
                      <span>
                        Profile View Count : {this.state.subYearly ? 1200 : 100}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />
                      <span>Saving Pilots</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />
                      <span>
                        Email proposals (Direct Hire) :{" "}
                        {this.state.subYearly ? 2400 : 200}
                      </span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />
                      <span>Draft access</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />
                      <span>Suggested Candidated</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />
                      <span>Boost Job</span>
                    </div>
                    <div
                      className="subscription_plan_feature"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={Tick} />{" "}
                      <span>Verified Recruiter Indication</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </Container>
        {/* <Dialog
          open={this.state.payment_success}
          onClose={this.closePaymentPopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
        >

          <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
            <div style={{ position: "absolute", top: '20px', right: '20px' }}>
              <img src={Close} alt="" onClick={this.closePaymentPopup} style={{ cursor: "pointer" }} />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <img src={payment_success} alt="" style={{ margin: "auto" }} />
              <div className="u_p_v_popup_title">Thank you</div>
              <div className="u_p_v_popup_content">We have recieved your payment</div>
              <button className="u_p_v_popup_close_btn" onClick={this.closePaymentPopup}>Close</button>
            </Row>
          </DialogContent>
        </Dialog> */}
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

export default HireSubscription;
