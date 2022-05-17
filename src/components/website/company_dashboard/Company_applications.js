import React, { useEffect, useState } from "react";
import "../pilot_dashboard/css/Pilot_appliedJobs.css";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import profileUser from "../../images/profile-user.svg";
import money from "../../images/money.svg";
import location from "../../images/location.svg";
import work from "../../images/work.svg";
import heart from "../../images/heart (3).svg";
import heartLike from "../../images/heart-blue.svg";
import { Link, useHistory, Switch, Route } from "react-router-dom";
import loadMore from "../../images/Group 71.svg";
import bin from "./images/c_j_bin.png";
import edit from "./images/c_j_edit.png";
import "./css/Company_received.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Close from "../../images/close.svg";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import All from "../All.module.css";
import JobApplications from "./JobApplications";
import JobSuggestions from "./JobSuggestions";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const domain = process.env.REACT_APP_MY_API;

function Company_applications() {
  let history = useHistory();
  let param = useParams();
  let goToPreviousPath = () => {
    history.goBack();
  };

  const [job, setJob] = useState({});
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewDetails, setViewDetails] = useState(false);

  useEffect(() => {
    axios.get(`${domain}/api/jobs/jobLanding/${param.id}`).then((res) => {
      console.log(res.data);
      setJob(res.data);
      setLoading(false);
    });
    axios
      .post(`${domain}/api/jobApplications/getApplications`, {
        jobId: param.id,
      })
      .then((res) => {
        console.log(res.data);
        setApplications(res.data);
      });
  }, []);
  let [personalData, setPersonalData] = useState({
    email: "",
    phoneNo: ""
  })
  let showPersonalData = (phNo, email) =>{
    setPersonalData({
      email: email,
      phoneNo: phNo
    })
    setViewDetails(true)
  }
  return (
    <div>
      {!loading ? (
        <>
          <div>
            <div className="c_r_applications_box">
              <div style={{ margin: "0px 0px 40px 0px" }}>
                <div style={{ marginBottom: "10px" }}>
                  <div>
                    <div className="pd_a_j_dataDateHead">
                      Posted on:
                      <span className="pd_a_j_dataDate">06 Jan 2022</span>
                    </div>
                  </div>
                  <div >
                    <div className="pd_a_j_dataTitle">{job.jobTitle}</div>
                  </div>
                </div>
                <div className="pd_a_j_data_subTitle1">{job.industry}</div>
                <div>
                  <div className="a_j_container1">
                    <div className="a_j_listing_img1">
                      <img src={profileUser} />
                    </div>
                    <div className="a_j_listing_profileName">
                      {job.employeeType}
                    </div>
                    <div className="a_j_listing_img2">
                      <img src={money} />
                    </div>
                    <div className="a_j_listing_money">
                      {job.minSalary && `$${job.minSalary} - $${job.maxSalary}`}
                    </div>
                  </div>
                </div>
                <div className="a_j_listing_btns" style={{ marginTop: "20px" }}>
                  <button className="a_j_location_btn" style = {{cursor: "default"}}>
                    <img src={location} className="a_j_location_logo" />
                    <span className="a_j_location_text">Bangalore</span>
                  </button>{" "}
                  <button className="a_j_location_btn" style = {{cursor: "default"}}>
                    <img src={work} className="a_j_location_logo" />
                    <span className="a_j_location_text">Full Time</span>
                  </button>
                  <div onClick={goToPreviousPath} id="a_j_job_btn1">
                    Close Candidates
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
          <Switch>
          <Route
              path="/company_dashboard/activities/jobs/applications/:id/suggestions"
              component={JobSuggestions}
            />
          <Route
              path="/company_dashboard/activities/jobs/applications/:id/"
              component={JobApplications}
            />
          </Switch>
          {/* <JobApplications /> */}
        </>
      ) : (
        <div style={{ textAlign: "center", fontFamily: "muli-regular", fontSize: "25px", margin: "30px" }}>Loading . . .</div>
      )}
      <Dialog
        open={viewDetails}
        onClose={() => setViewDetails(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
        PaperProps={{ style: { borderRadius: 10, width: "500px" } }}
      >
        <DialogContent
          className={All.PopupBody}
          style={{ marginBottom: "50px" }}
        >
          <div style={{ position: "absolute", top: "20px", right: "20px" }}>
            <img
              src={Close}
              alt=""
              onClick={() => setViewDetails(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <Row style={{ marginTop: "30px" }}>
            <div className="a_j_popup_title">Pilot Personal Data</div>
            <div>
              <div
              style={{
                fontFamily: "muli-regular",
                marginBottom: "10px",
                fontSize: "19px",
                color: "black",
              }}>Email ID : <a href={`mailto:${personalData.email}`}>{personalData.email} </a></div>
              <div
                style={{
                  fontFamily: "muli-regular",
                  marginBottom: "10px",
                  fontSize: "19px",
                  color: "black",
                }}
              >
                Phone Number : <a href = {`tel:${personalData.phoneNo}`}>{personalData.phoneNo}</a>
              </div>
            </div>
            <div
              className="u_f_popup_btn_container"
              style={{ marginTop: "8px" }}
            >
              <div
                className="j_l_applyJobLoginBtn"
                style={{ width: "fit-content", padding: "7px 50px", marginTop: "25px" }}
                onClick={() => setViewDetails(false)}
              >
                Close
              </div>
            </div>
          </Row>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Company_applications;
