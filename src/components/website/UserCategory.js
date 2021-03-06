import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import All from "../website/All.module.css";
import "../css/UserCategory.css";
import { Radio } from "@material-ui/core";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import Close from "../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";

const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

class UserCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      user_category: "pilot",
      signupSuccess: false,
      signupFailure: false,
    };
  }

  componentWillMount() {
    try {
      this.setState({
        name: this.props.location.state.name,
        email: this.props.location.state.email,
        dob: this.props.location.state.dob,
        country: this.props.location.state.country,
        phone: this.props.location.state.phone,
        password: this.props.location.state.password,
        confirmPassword: this.props.location.state.confirmPassword,
      });
    } catch {
      this.props.history.push("/sign_up");
    }
  }

  userCategoryDivClick = (val) => {
    this.setState({
      user_category: val,
    });
  };

  submitCategory = () => {
    console.log(this.state.name);
    console.log(this.state.email);
    console.log(this.state.phone);
    console.log(this.state.password);
    console.log(this.state.user_category);

    axios
      .post(
        `${domain}/api/user/register`,
        {
          name: this.state.name,
          email: this.state.email,
          phoneNo: this.state.phone,
          password: this.state.password,
          role: this.state.user_category,
          roleType: this.state.user_category,
        },
        this.config
      )
      .then((res) => {
        this.setState({
          signupSuccess: true
        })
        console.log(res);
        localStorage.setItem("access_token", res.data.token);
        localStorage.setItem("token_type", "Bearer");
        localStorage.setItem("role", res.data.role);
        console.log(localStorage.getItem("access_token"));
      })
      .catch(() => {
        this.setState({
          signupFailure: true
        })
      });
  };

  closeSignupSuccess = () => {
    this.setState({
      signupSuccess: false,
    });
  };

  closeSignupFailure = () => {
    this.setState({
      signupFailure: false,
    });
  };

  goToHomepage = (success) => {
    if (success){
      if(this.state.user_category === "pilot" || this.state.user_category === "visitor" || this.state.user_category === "candidate"){
        this.props.history.push("/createPilot");
      }
      else if (this.state.user_category === "service_center"){
        this.props.history.push("/createServiceCenter");
      }
      else if(this.state.user_category === "company"){
        this.props.history.push("/createCompany");
      }
      window.location.reload();
    }
    else{
      this.props.history.push("/")
    }
  }

  render() {
    return (
      <Container
        className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}
        id="user_category_container"
      >
        <Helmet>
          <title>User category</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <h2 className="user_categories_title">
          Choose what are you looking for?
        </h2>
        <Row>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12} xs={12}>
            <div
              className="user_categories"
              onClick={() => this.userCategoryDivClick("pilot")}
            >
              {this.state.user_category == "pilot" ? (
                <div className="u_c_r_icon_selected user_category_radio">
                  <div className="u_c_r_inner_selected"></div>
                </div>
              ) : (
                <div className="u_c_r_icon  user_category_radio">
                  <div className="u_c_r_inner"></div>
                </div>
              )}
              <div className="user_categories_subtitle">Upload Ariel Shots</div>
              <div className="user_category_content">
                You will register as a drone piolet. Here you can Upload and
                sell your drone shots. Alse, you can apply all type of jobs
                [Full time, Part time & Freelance] and you can find service
                center.
              </div>
            </div>
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12} xs={12}>
            <div
              className="user_categories"
              onClick={() => this.userCategoryDivClick("service_center")}
            >
              {this.state.user_category == "service_center" ? (
                <div className="u_c_r_icon_selected user_category_radio">
                  <div className="u_c_r_inner_selected"></div>
                </div>
              ) : (
                <div className="u_c_r_icon  user_category_radio">
                  <div className="u_c_r_inner"></div>
                </div>
              )}
              <div className="user_categories_subtitle">
                Want to list the service center?
              </div>
              <div className="user_category_content">
                You will register as a drone piolet. Here you can Upload and
                sell your drone shots. Alse, you can apply all type of jobs
                [Full time, Part time & Freelance] and you can find service
                center.
              </div>
            </div>
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12} xs={12}>
            <div
              className="user_categories"
              onClick={() => this.userCategoryDivClick("visitor")}
            >
              {this.state.user_category == "visitor" ? (
                <div className="u_c_r_icon_selected user_category_radio">
                  <div className="u_c_r_inner_selected"></div>
                </div>
              ) : (
                <div className="u_c_r_icon  user_category_radio">
                  <div className="u_c_r_inner"></div>
                </div>
              )}
              <div className="user_categories_subtitle">Buy Creatives?</div>
              <div className="user_category_content">
                You will register as a drone piolet. Here you can Upload and
                sell your drone shots. Alse, you can apply all type of jobs
                [Full time, Part time & Freelance] and you can find service
                center.
              </div>
            </div>
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12} xs={12}>
            <div
              className="user_categories"
              onClick={() => this.userCategoryDivClick("company")}
            >
              {this.state.user_category == "company" ? (
                <div className="u_c_r_icon_selected user_category_radio">
                  <div className="u_c_r_inner_selected"></div>
                </div>
              ) : (
                <div className="u_c_r_icon  user_category_radio">
                  <div className="u_c_r_inner"></div>
                </div>
              )}
              <div className="user_categories_subtitle">
                Hire a pilot / post a job?
              </div>
              <div className="user_category_content">
                You will register as a drone piolet. Here you can Upload and
                sell your drone shots. Alse, you can apply all type of jobs
                [Full time, Part time & Freelance] and you can find service
                center.
              </div>
            </div>
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12} xs={12}>
            <div
              className="user_categories"
              onClick={() => this.userCategoryDivClick("candidate")}
            >
              {this.state.user_category == "candidate" ? (
                <div className="u_c_r_icon_selected user_category_radio">
                  <div className="u_c_r_inner_selected"></div>
                </div>
              ) : (
                <div className="u_c_r_icon  user_category_radio">
                  <div className="u_c_r_inner"></div>
                </div>
              )}
              <div className="user_categories_subtitle">Apply a job</div>
              <div className="user_category_content">
                You will register as a drone piolet. Here you can Upload and
                sell your drone shots. Alse, you can apply all type of jobs
                [Full time, Part time & Freelance] and you can find service
                center.
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="btn_container">
              <button
                className="user_category_submit"
                onClick={this.submitCategory}
              >
                Submit
              </button>
            </div>
          </Col>
        </Row>
        <Dialog
          open={this.state.signupSuccess}
          onClose={this.closeSignupSuccess}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          PaperProps={{ style: { width: "820px", borderRadius: "10px" } }}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={()=>this.goToHomepage(true)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">Registered successfully</div>
              <div className="u_f_popup_btn_container">
                <button
                  className="u_f_popup_btn2"
                  onClick={() => this.goToHomepage(true)}
                >
                  Continue
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.signupFailure}
          onClose={this.closeSignupFailure}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          PaperProps={{ style: { width: "820px", borderRadius: "10px" } }}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={this.closeSignupFailure}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">Something went wrong on the server. Please try again later.</div>
              <div className="u_f_popup_btn_container">
                <button
                  className="u_f_popup_btn2"
                  onClick={()=>this.goToHomepage(false)}
                >
                  Create Account
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
      </Container>
    );
  }
}

export default UserCategory;
