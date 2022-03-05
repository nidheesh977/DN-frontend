import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "./All.module.css";
import "../css/ApplyJob.css";
import { Link, useHistory } from "react-router-dom";
import heart from "../images/heart (3).svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Close from "../images/close.svg";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import heartLike from "../images/heart-blue.svg";

const domain = process.env.REACT_APP_MY_API

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function ApplyJobLanding() {
  let history = useHistory();
  let param = useParams();
  // let {data, setData}= useState({})
  let [list, setList] = useState([]);
  let [status, setStatus] = useState(0);
  let [dialog, setDialog] = useState(false);
  let [dialog1, setDialog1] = useState(false);
  let [dialog2, setDialog2] = useState(false);
  let [liked, setLiked] = useState([]);
  let [applied, setapplied] = useState([]);
  let [authourised, setAuthourised] = useState(false);

  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  console.log(param.id);
  const goToPreviousPath = () => {
    history.goBack();
  };

  let closeChoicePopup1 = () => {
    setDialog1(false);
  };
  let closeChoicePopup2 = () => {
    setDialog2(false);
  };

  useEffect(() => {
    axios.get(`${domain}/api/jobs/jobLanding/${param.id}`).then(
      (response) => {
        // setData({response})
        setList(response.data);
        setStatus(response.status);

        console.log(response.status);
        console.log(response);
      },

      axios.post(`${domain}/api/pilot/getLikedJobs`, config).then(
        (res) => {
          setAuthourised(true);
          const persons = res.data;
          console.log(persons);
          setLiked(persons);
        },

        axios
          .post(`${domain}/api/pilot/getAppliedJobs1`, config)
          .then((res) => {

            const jobs = res.data.appliedJobs;
            console.log(jobs);
            setapplied(jobs);
          })
      )
    );
  }, []);

  function applyNow(id) {
    if(!localStorage.getItem("access_token")){
      alert("Please Login or Signup");
    }else{

    if(authourised === false){
      alert("PLease Create an Account");
    }else{


    console.log(config);
applied.push(id)
    axios
      .post(`${domain}/api/jobs/applyJob/${param.id}`, config)

      .then((response) => {
        console.log(response.status);

        if (response.data === "please Login") {
          history.push("/pilot_dashboard/account");
        }
      })
      .catch(() => {});
    if (status === 200) {
      setDialog(true);
    }
  }
}

  }
  let likePost = (id) => {

    if(!localStorage.getItem("access_token")){
      alert("Please Login or Signup");
    }else{

    if(authourised === false){
      alert("PLease Create an Account");
    }else{
    setDialog1(true);
    liked.push(id);

    axios
      .post(`${domain}/api/jobs/likeJob/${id}`, config)

      .then((response) => {
        if (response.data === "please Login") {
          // history.push("/pilot_dashboard/account")
          alert("loginFirst");
        }
      })
      .catch(() => {});
    }
  }
  };
  let unlikePost = (id) => {
    console.log(config);
    setDialog2(true);
    let index = liked.indexOf(id);
    liked.splice(index, 1);

    axios
      .post(`${domain}/api/jobs/unlikeJob/${id}`, config)

      .then((response) => {
        if (response.data === "please Login") {
          // history.push("/pilot_dashboard/account")
          alert("loginFirst");
        }
      })
      .catch(() => {});
  };

  let closeChoicePopup = () => {
    setDialog(false);
  };
  let showApplied = () => {
    history.push("/pilot_dashboard/activities/appliedJobs");
  };
  return (
    <div className="j_l_containerMain" style={{ overflowX: "hidden" }}>
      <Container className={All.Container}>
        <div style={{ marginTop: "30px" }}>
          <div id="j_l_backBtn" onClick={goToPreviousPath}>
            Back
          </div>
        </div>
        <div className="j_l_container">
          <Row>
            <Col>
              <div className="j_l_title">{list.jobTitle}</div>
              <div className="j_l_producer">{list.industry}</div>
            </Col>
            <Col>
              <div className="j_l_right">
                {applied.includes(list._id) ? (
                  <div className="j_l_applyJobBtn" style = {{opacity: "0.5"}}>Already Applied </div>
                ) : (
                  <div className="j_l_applyJobBtn" onClick={()=>applyNow(list._id)}>
                    Apply Now{" "}
                  </div>
                )}
                {liked.includes(list._id) ? (
                  <img
                    src={heartLike}
                    className="a_j_like"
                    onClick={() => unlikePost(list._id)}
                  />
                ) : (
                  <img
                    src={heart}
                    className="a_j_like"
                    onClick={() => likePost(list._id)}
                  />
                )}{" "}
              </div>
            </Col>
          </Row>
        </div>

        <Row gutterWidth={40}>
          <Col>
            <div className="j_l_titleHead"> Job Description</div>
            <div className="j_l_desc">{list.jobDesc}</div>
            <div className="j_l_desc">{list.jobDesc}</div>
          </Col>
          <Visible xxl xl>
            <Col xxl={3.5} xl={3.3} lg={4.15} md={5.4}>
              <div id="h_p_create_job_container">
                <div className="h_p_filterTitle">Pilot Type</div>
                <div className="h_p_filterText">{list.employeeType}</div>
                <div className="h_p_filterTitle">Work Type</div>
                <div className="h_p_filterText">{list.JobType}</div>
                <div className="h_p_filterTitle">Salary</div>
                <div className="h_p_filterText">
                  ${list.minSalary}.00 - ${list.maxSalary}.00 / Month
                </div>
                <div className="h_p_filterTitle">Posted Date</div>
                <div className="h_p_filterText">{list.postingDate}</div>
                <div className="h_p_filterTitle">Work location</div>
                <div className="h_p_filterText1">{list.workLocation}</div>
              </div>
            </Col>
          </Visible>
        </Row>
        <Dialog
          open={dialog}
          onClose={closeChoicePopup}
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
                onClick={closeChoicePopup}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">
                Your Application has been submitted successfully
              </div>
              <div className="u_f_popup_btn_container">
                <button className="u_f_popup_btn1" onClick={showApplied}>
                  Show Applied
                </button>
                <button className="u_f_popup_btn2" onClick={closeChoicePopup}>
                  Close
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
        <Dialog
          open={dialog1}
          onClose={closeChoicePopup1}
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
                onClick={closeChoicePopup1}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">
                The Job has been saved successfully
              </div>
              <div className="u_f_popup_btn_container">
                <button className="u_f_popup_btn2" onClick={closeChoicePopup1}>
                  Close
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
        <Dialog
          open={dialog2}
          onClose={closeChoicePopup2}
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
                onClick={closeChoicePopup2}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">
                The Job has been Unsaved successfully
              </div>
              <div className="u_f_popup_btn_container">
                <button className="u_f_popup_btn2" onClick={closeChoicePopup2}>
                  Close
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}

export default ApplyJobLanding;