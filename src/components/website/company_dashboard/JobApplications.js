import React, { useEffect, useState } from "react";
import "../pilot_dashboard/css/Pilot_appliedJobs.css";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import profileUser from "../../images/profile-user.svg";
import money from "../../images/money.svg";
import location from "../../images/location.svg";
import work from "../../images/work.svg";
import heart from "../../images/heart (3).svg";
import heartLike from "../../images/heart-blue.svg";
import { Link, useHistory } from "react-router-dom";
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
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const domain = process.env.REACT_APP_MY_API;

function JobApplications() {

  let history = useHistory();
  let param = useParams();
  let goToPreviousPath = () => {
    history.goBack();
  };
  let [sub ,setSub] = useState({})
  useEffect(()=>{
    axios.get(`${domain}/api/company/getCompanySubscription`, config).then(res=>{
      console.log(res)
setSub(res.data)
    })
  },[])
let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  
  const [job, setJob] = useState({});
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewDetails, setViewDetails] = useState(false);
  const [upgradePopup, setUpgradePopup] = useState(false);
  const [limitExceededPopup, setLimitExceededPopup] = useState(false);

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
    phoneNo: "",
  });
  let showPersonalData = (phNo, email) => {
    axios.get(`${domain}/api/company/getCompanySubscription`, config).then(res=>{
      console.log(res)
      if (res.data.subscription){
        if(res.data.subscription.views <= res.data.views){
          if (res.data.subscription.plan.includes("platinum")){
            setLimitExceededPopup(true)
          }
          else{
            setUpgradePopup(true)
          }
        }
         else{
     
         
         axios.post(`${domain}/api/company/setViews`, config).then(res=>{
           console.log(res)
         })
         setPersonalData({
           email: email,
           phoneNo: phNo,
         });
         setViewDetails(true);
      
        }
      }else{
        if (res.data.views>=20){
          setUpgradePopup(true)
        }
      }
  })
  }
    console.log(sub)
  
  return (
    <div>
      <div style={{ padding: "30px 20px 10px 20px" }}>
        <Row gutterWidth={15}>
          <Col xl={2}>
            <div className="c_r_applicationsHead">Name</div>
          </Col>
          <Col xl={2.25}>
            <div className="c_r_applicationsHead">Pilot Type</div>
          </Col>
          <Col xl={2.25}>
            <div className="c_r_applicationsHead">location</div>
          </Col>
          <Col xl={3}></Col>
          <Col xl={2.5}>
            
              <Link to={`/company_dashboard/activities/jobs/applications/${param.id}/suggestions`} style={{display: sub.subscription ? "block" : "none"}}>
            <div className="c_r_startProcessBtn" style={{ color: "black", padding: "5px 10px" }}>
              Show Suggested
            </div>
            </Link>
          </Col>
        </Row>
      </div>
      {applications.length > 0 ? (
        <>
          {applications.map((application, index) => {
            return (
              <div className="c_r_applications_box1" key={index}>
                <Row gutterWidth={15}>
                  <Col xl={2}>
                    <div className="c_r_applications_text">
                      {application.pilotId.name}
                    </div>
                  </Col>
                  <Col xl={2.25}>
                    <div
                      className="c_r_applications_text"
                      style={{ textTransform: "capitalize" }}
                    >
                      {application.pilotId.pilotType} Pilot
                    </div>
                  </Col>
                  <Col xl={2.25}>
                    <div className="c_r_applications_text">
                      {application.pilotId.city}
                    </div>
                  </Col>
                  <Col xl={3}>
                    <Link to={`/pilot_details/${application.pilotId._id}`}>
                      <div
                        className="c_r_startProcessBtn"
                        style={{ color: "black" }}
                      >
                        View profile
                      </div>
                    </Link>
                  </Col>
                  <Col xl={2.5}>
                    <div
                      className="c_r_Remove"
                      onClick={() =>
                        showPersonalData(
                          application.pilotId.userId.phoneNo,
                          application.pilotId.userId.email
                        )
                      }
                    >
                      View details
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            fontFamily: "muli-regular",
            fontSize: "25px",
            margin: "30px",
          }}
        >
          No applications yet
        </div>
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
                }}
              >
                Email ID :{" "}
                <a href={`mailto:${personalData.email}`}>
                  {personalData.email}{" "}
                </a>
              </div>
              <div
                style={{
                  fontFamily: "muli-regular",
                  marginBottom: "10px",
                  fontSize: "19px",
                  color: "black",
                }}
              >
                Phone Number :{" "}
                <a href={`tel:${personalData.phoneNo}`}>
                  {personalData.phoneNo}
                </a>
              </div>
            </div>
            <div
              className="u_f_popup_btn_container"
              style={{ marginTop: "8px" }}
            >
              <div
                className="j_l_applyJobLoginBtn"
                style={{
                  width: "fit-content",
                  padding: "7px 50px",
                  marginTop: "25px",
                }}
                onClick={() => setViewDetails(false)}
              >
                Close
              </div>
            </div>
          </Row>
        </DialogContent>
      </Dialog>
      <Dialog
                open={upgradePopup}
                onClose={()=>setUpgradePopup(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth={true}
                PaperProps={{
                  style: {
                    maxWidth: "820px",
                    borderRadius: "10px",
                  },
                }}
              >
                <DialogContent
                  className={All.PopupBody}
                  style={{ marginBottom: "50px" }}
                >
                  <div
                    style={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <img
                      src={Close}
                      alt=""
                      onClick={()=>setUpgradePopup(false)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title">
                      You exceeded your view limit. Upgrade to comtinue.
                    </div>
                    <div className="u_f_popup_btn_container">
                      <button
                        className="u_f_popup_btn1"
                        onClick={()=>setUpgradePopup(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="u_f_popup_btn2"
                        onClick={()=>history.push("/HireSubscription")}
                      >
                        Upgrade
                      </button>
                    </div>
                  </Row>
                </DialogContent>
              </Dialog>
        <Dialog
                open={limitExceededPopup}
                onClose={()=>setLimitExceededPopup(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth={true}
                PaperProps={{
                  style: {
                    maxWidth: "820px",
                    borderRadius: "10px",
                  },
                }}
              >
                <DialogContent
                  className={All.PopupBody}
                  style={{ marginBottom: "50px" }}
                >
                  <div
                    style={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <img
                      src={Close}
                      alt=""
                      onClick={()=>setLimitExceededPopup(false)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title">
                      You exceeded your View limit.
                    </div>
                    <div className="u_f_popup_btn_container">
                      <button
                        className="u_f_popup_btn1"
                        onClick={()=>setLimitExceededPopup(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Row>
                </DialogContent>
              </Dialog>
    </div>
  );
}

export default JobApplications;
