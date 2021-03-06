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
import parse from "html-react-parser";
import { Helmet } from "react-helmet";

const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function ApplyJobLanding(props) {
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
  let [applySuccess, setApplySuccess] = useState(false);
  let [applyFailure, setApplyFailure] = useState(false);

  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  const goToPreviousPath = () => {
    history.goBack();
  };

  let closeChoicePopup1 = () => {
    setDialog1(false);
  };
  let closeChoicePopup2 = () => {
    setDialog2(false);
  };

  const closeApplySuccess = () => {
    setApplySuccess(false);
  };

  const closeApplyFailure = () => {
    setApplyFailure(false);
  };
  let [startProcess, setStartProcess] = useState(false);

  let closeProcess = () => {
    setStartProcess(false);
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
            if (jobs) {
              setapplied(jobs);
            }
          })
      )
    );
  }, []);
  let [myAppliedJobs, setMyAppliedJobs] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("role") === "pilot") {
      axios
        .get(`${domain}/api/jobApplications/getMyAppliedJobs`, config)
        .then((res) => {
          console.log(res.data);
          setMyAppliedJobs(res.data);
        });
    }
  }, []);
  function applyNow(id) {
    if (!localStorage.getItem("access_token")) {
      setApplyFailure(true);
    } else {
      setStartProcess(true);
    }
  }
  let likePost = (id) => {
    if (!localStorage.getItem("access_token")) {
      setApplyFailure(true);
    } else {
      axios
        .post(`${domain}/api/jobs/likeJob/${id}`, config)

        .then((response) => {
          if (response.data === "please Login") {
            // history.push("/pilot_dashboard/account")
            alert("loginFirst");
          } else {
            liked.push(id);
          }
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
                  if (jobs) {
                    setapplied(jobs);
                  }
                })
            )
          );
        })
        .catch(() => {});
    }
  };
  let unlikePost = (id) => {
    console.log(config);

    axios
      .post(`${domain}/api/jobs/unlikeJob/${id}`, config)

      .then((response) => {
        if (response.data === "please Login") {
          // history.push("/pilot_dashboard/account")
          alert("loginFirst");
        } else {
          let index = liked.indexOf(id);
          liked.splice(index, 1);
        }
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
                if (jobs) {
                  setapplied(jobs);
                }
              })
          )
        );
      })
      .catch(() => {});
  };

  let closeChoicePopup = () => {
    setDialog(false);
  };
  let showApplied = () => {
    history.push("/pilot_dashboard/activities/appliedJobs");
  };

  let [message, setMessage] = useState("");

  let messageChangeHandler = (e) => {
    document.getElementById("toMakeRed").style.backgroundColor = "white";

    setMessage(e.target.value);
  };

  let submitApplication = () => {
    if (message === "" || message.length >= 500) {
      document.getElementById("toMakeRed").style.backgroundColor = "#ffcccb";
      document.getElementById("toMakeRed").focus();
    } else {
      if (!localStorage.getItem("access_token")) {
        setApplyFailure(true);
      } else {
        axios
          .post(
            `${domain}/api/jobApplications/createApplication`,
            { jobId: param.id, message: message },
            config
          )
          .then((res) => {
            console.log(res);
            setMessage("");
            axios
              .get(`${domain}/api/jobApplications/getMyAppliedJobs`, config)
              .then((res) => {
                console.log(res.data);
                setMyAppliedJobs(res.data);
              });
            setStartProcess(false);
          });
      }
    }
  };
  return (
    <div className="j_l_containerMain" style={{ overflowX: "hidden" }}>
      <Helmet>
          <title>Job landing</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
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
              {localStorage.getItem("role") === "pilot" && (
                <>
                  <div className="j_l_right">
                    {myAppliedJobs.includes(list._id) ? (
                      <div
                        className="j_l_applyJobBtn"
                        style={{ opacity: "0.5", pointerEvents: "none" }}
                      >
                        Already Applied{" "}
                      </div>
                    ) : (
                      <div
                        className="j_l_applyJobBtn"
                        onClick={() => applyNow(list._id)}
                      >
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
                </>
              )}
            </Col>
          </Row>
        </div>

        <Row gutterWidth={40}>
          <Col>
            <div className="j_l_titleHead"> Job Description</div>
            <div className="j_l_desc">{parse(String(list.jobDesc))}</div>
          </Col>
          <Visible xxl xl>
            <Col xxl={3.5} xl={3.3} lg={4.15} md={5.4}>
              <div id="h_p_create_job_container">
                <div className="h_p_filterTitle">Pilot Type</div>
                <div className="h_p_filterText">{list.employeeType}</div>
                {list.droneId ? (
                  <>
                    <div className="h_p_filterTitle">License Number</div>
                    <div className="h_p_filterText">{list.droneId}</div>
                  </>
                ) : (
                  ""
                )}
                <div className="h_p_filterTitle">Work Type</div>
                <div className="h_p_filterText">{list.jobType}</div>
                <div className="h_p_filterTitle">Salary</div>
                {list.minSalary ? (
                  <div className="h_p_filterText">
                    ${list.minSalary}.00 - ${list.maxSalary}.00
                  </div>
                ) : (
                  <div className="h_p_filterText">Not Mentioned</div>
                )}
                {list.noOfOpenings ? (
                  <>
                    <div className="h_p_filterTitle">No of Openings</div>
                    <div className="h_p_filterText">{list.noOfOpenings}</div>
                  </>
                ) : (
                  ""
                )}
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
        <Dialog
          open={applySuccess}
          onClose={closeApplySuccess}
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
                onClick={closeApplySuccess}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="a_j_popup_title">Thank you!!</div>
              <div
                className="a_j_popup_content"
                style={{ marginBottom: "25px!important" }}
              >
                Your application has been submitted successfully
              </div>
              <div className="u_f_popup_btn_container">
                <div
                  className="j_l_applyJobLoginBtn"
                  style={{ width: "155px" }}
                  onClick={closeApplySuccess}
                >
                  Close
                </div>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
        <Dialog
          open={applyFailure}
          onClose={closeApplyFailure}
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
                onClick={closeApplyFailure}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="a_j_popup_title" style={{ padding: "0px 60px" }}>
                You aren't logged into DroneZone. Please login to continue?
              </div>
              <div
                className="u_f_popup_btn_container"
                style={{ marginTop: "8px" }}
              >
                <div
                  className="j_l_applyJobLoginBtn"
                  style={{ width: "fit-content" }}
                  onClick={() => props.history.push("/login")}
                >
                  Login / Sign Up
                </div>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
        {/* //apply Now */}

        <Dialog
          open={startProcess}
          onClose={closeProcess}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          PaperProps={{ style: { borderRadius: 10 } }}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={closeProcess}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="h_p_start_process_form">
                <div className="h_p_start_process_form_title">
                  Apply for this Job
                </div>
                <div className="h_p_start_process_form_label">
                  Type a Message
                </div>
                <textarea
                  className="h_p_start_process_form_description"
                  id="toMakeRed"
                  value={message}
                  onChange={messageChangeHandler}
                ></textarea>

                <div className="h_p_start_process_form_btn_container">
                  <button
                    className="h_p_start_process_form_btn"
                    onClick={submitApplication}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}

export default ApplyJobLanding;
