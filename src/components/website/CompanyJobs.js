import axios from "axios";
import React, { Component } from "react";
import Trusted from "../images/trusted.png";
import { Link } from "react-router-dom";
import profileUser from "../images/profile-user.svg";
import money from "../images/money.svg";
import location from "../images/location.svg";
import work from "../images/work.svg";
import heartLike from "../images/heart-blue.svg";
import heart from "../images/heart (3).svg";
import { Container, Row, Col, Visible } from "react-grid-system";
import Close from "../images/close.svg";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import All from "./All.module.css";
import "../css/CompanyJobs.css"
import { Helmet } from "react-helmet";

const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default class CompanyJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      liked: [],
      topRecruiters: [],
      company_name: "",
      user_id: ""
    };
  }

  config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  componentDidMount() {
    console.log(this.props);
    this.setState({
      company_name: this.props.location.state.company_name,
      user_id: this.props.match.params.id
    })
    axios
      .post(`${domain}/api/jobs/getJobByName`, {
        userId: this.props.match.params.id,
      })
      .then((res) => {
        this.setState({ jobList: res.data });
      })
      .catch((err) => {
        // this.props.history.push("/NoPageFound")
        console.log("Error");
      });
    axios
      .post(`${domain}/api/pilot/getLikedJobs`, this.config)
      .then((res) => {
        const persons = res.data;
        console.log(persons);
        if (persons !== "please Login") {
          this.setState({ liked: persons });
        }
      })
      .catch((err) => {
        this.setState({
          authourised: false,
        });
      });
      axios.get(`${domain}/api/company/getPlatinumCompanies`)
      .then(res => {
        console.log(res.data)
        this.setState({
          topRecruiters: res.data
        })
      })
  }
  selectCompanyJobs = (id, company_name) =>{
    axios
      .post(`${domain}/api/jobs/getJobByName`, {
        userId: id,
      })
      .then((res) => {
        this.setState({ jobList: res.data, user_id: id, company_name: company_name });
      })
      .catch((err) => {
        // this.props.history.push("/NoPageFound")
        console.log("Error");
      });
  }

  likePost = (id) => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    if (!localStorage.getItem("access_token")) {
      console.log(localStorage.getItem("access_token"));
      this.setState({
        loginErrorPopup: true,
      });
    } else {
      axios
        .post(`${domain}/api/jobs/likeJob/${id}`, config)

        .then((response) => {
          console.log(response.data);
          if (response.data === "please Login") {
            // history.push("/pilot_dashboard/account")
            this.setState({
              loginErrorPopup: true,
            });
          } else {
            let liked = this.state.liked;
            liked.push(id);
            this.setState({
              liked: liked,
            });
          }
        })
        .catch(() => {});
    }
  };

  unlikePost = (id) => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios
      .post(`${domain}/api/jobs/unlikeJob/${id}`, config)

      .then((response) => {
        if (response.data === "please Login") {
          // history.push("/pilot_dashboard/account")
          this.setState({
            loginErrorPopup: true,
          });
        } else {
          let index = this.state.liked.indexOf(id);
          let liked_list = this.state.liked;
          liked_list.splice(index, 1);
          this.setState({
            liked: liked_list,
          });
        }
      })
      .catch(() => {});
  };

  loginErrorPopupClose = () => {
    this.setState({
      loginErrorPopup: false,
    });
  };

  render() {
    return (
      <Container style={{ paddingTop: "30px", paddingBottom: "30px" }}>
        <Helmet>
          <title>Company Jobs</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <Row>
          <Visible xxl xl lg>
            <Col xxl = {3} xl = {3} lg = {4}>
              <div className="top_recruiters_container">
                <div className="top_recruiters_title">Top recruiters</div>
                {this.state.topRecruiters.map((topRecruiter, index)=>{
                  return(
                    <div className={topRecruiter.userId === this.state.user_id?"top_recruiter top_recruiter_active": "top_recruiter"} onClick={()=>this.selectCompanyJobs(topRecruiter.userId, topRecruiter.companyName)}>{topRecruiter.companyName}</div>
                  )
                })}
              </div>
            </Col>
          </Visible>
        <Col>
        
        {this.state.company_name && (
          <div
            className="pd_a_j_dataTitle"
            style={{
              textAlign: "center",
              display: "block",
              fontSize: "30px",
              marginBottom: "30px",
            }}
          >
            All Jobs of {this.state.company_name}
          </div>
        )}

        {this.state.jobList.map((item, i) => {
          return (
            <div className="pd_a_j_data" style={{ margin: "20px 0px 0px 0px" }}>
              <div style={{ marginBottom: "10px" }}>
                <div className="pd_a_j_dataDateHead">
                  Posted on:
                  <span className="pd_a_j_dataDate">
                    {item.postingDate.slice(0, 10)}
                  </span>
                </div>
                <div className="pd_a_j_dataTitle">
                  {item.jobTitle}{" "}
                  {item.userId.companyPlatinum ? (
                    <img
                      src={Trusted}
                      style={{ height: "25px", marginLeft: "10px" }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* {item.companyId ? (
                <Link
                  to={`company-jobs/${item.userId._id}`}
                  className="pd_a_j_data_subTitle"
                  style={{ cursor: "pointer" }}
                  onClick={() => console.log(item.userId._id)}
                >
                  {item.companyId.companyName}
                </Link>
              ) : (
                ""
              )} */}
              <div>
                <div className="a_j_container1">
                  <div className="a_j_listing_img1">
                    <img src={profileUser} />
                  </div>
                  <div className="a_j_listing_profileName">
                    {item.employeeType}
                  </div>
                  <div className="a_j_listing_img2">
                    <img src={money} />
                  </div>
                  <div className="a_j_listing_money">
                    {item.minSalary
                      ? `${item.minSalary}.00 - ${item.maxSalary}.00`
                      : "Not Mentioned"}
                  </div>
                </div>
                <hr className="a_j_listing_hr" />
              </div>
              <div className="a_j_listing_btns">
                <button
                  className="a_j_location_btn"
                  style={{ cursor: "default" }}
                >
                  <img src={location} className="a_j_location_logo" />
                  <span className="a_j_location_text">
                    {item.workLocation.split(",")[0]}
                  </span>
                </button>{" "}
                <button
                  className="a_j_location_btn"
                  style={{ cursor: "default" }}
                >
                  <img src={work} className="a_j_location_logo" />
                  <span className="a_j_location_text">{item.jobType}</span>
                </button>
                <Link to={`/applyJobLanding/${item._id}`} id="a_j_job_btn">
                  View Job
                </Link>{" "}
                {localStorage.getItem("role") === "pilot" && (
                  <>
                    {this.state.liked.includes(item._id) ? (
                      <img
                        src={heartLike}
                        className="a_j_like"
                        onClick={() => this.unlikePost(item._id)}
                      />
                    ) : (
                      <img
                        src={heart}
                        className="a_j_like"
                        onClick={() => this.likePost(item._id)}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
        </Col>
        </Row>
        <Dialog
          open={this.state.loginErrorPopup}
          onClose={this.loginErrorPopupClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          PaperProps={{ style: { borderRadius: 10, width: "820px" } }}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={this.loginErrorPopupClose}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="a_j_popup_title" style={{ padding: "0px 60px" }}>
                You aren't logged into DroneZone as Pilot. Please login to
                continue?
              </div>
              <div
                className="u_f_popup_btn_container"
                style={{ marginTop: "8px" }}
              >
                <div
                  className="j_l_applyJobLoginBtn"
                  style={{ width: "fit-content" }}
                  onClick={() => this.props.history.push("/login")}
                >
                  Login / Sign Up
                </div>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
      </Container>
    );
  }
}
