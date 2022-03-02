import React, {useState,useEffect} from "react";
import {useParams} from "react-router-dom"
import axios from 'axios'
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "../website/All.module.css";
import "../css/ApplyJob.css";
import { Link, useHistory } from "react-router-dom";
import heart from "../images/heart (3).svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Close from "../images/close.svg";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


function Admin_showJobs() {
  let history = useHistory();
  let param = useParams();
  // let {data, setData}= useState({})
  let [list, setList] = useState([]);
  let [status, setStatus] = useState(0);
  let [dialog, setDialog] = useState(false)
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  console.log(param.id)
  const goToPreviousPath = () => {
      history.goBack()
  }

  useEffect(() => {
    axios.get(`http://localhost:9000/api/jobs/jobLanding/${param.id}`).then((response) => {
      // setData({response})
      setList(response.data);
      setStatus(response.status);

      console.log(response.status)
console.log(response)});

  }, []);

  function applyNow(){
    console.log(config);

    axios.post(`http://localhost:9000/api/admin/approve/${param.id}`, config)

      .then((response) => {
console.log(response.status)

setDialog(true);      

if(response.data === "please Login"){
  history.push("/pilot_dashboard/account")
}
})
      .catch(() => {
      });
      if(status === 200){
      }
  }
  function applyNow1(){
    console.log("applyNow1");

    axios.post(`http://localhost:9000/api/admin/pending/${param.id}`, config)

      .then((response) => {
console.log(response.status)

setDialog(true);      

if(response.data === "please Login"){
  history.push("/pilot_dashboard/account")
}
})
      .catch(() => {
      });
      if(status === 200){
      }
  }

  let closeChoicePopup = () => {
    setDialog(false);
    history.push("/admin_dashboard/pendingJobs")

  }
let showApplied = () =>{
  history.push("/pilot_dashboard/activities/appliedJobs")
}
  return (
    <div className="" style={{ overflowX: "hidden" }}>
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

            {
list.status === "active" ? <div className="j_l_applyJobBtn" onClick={applyNow1}>Put Pending</div> : <div className="j_l_applyJobBtn" onClick={applyNow}>Set Active</div>

            }

                <img src={heart} />
              </div>
            </Col>
          </Row>
        </div>

        <Row gutterWidth={40}>
            <Col>
              <div className="j_l_titleHead"> Job Description</div>
              <div className="j_l_desc">
                {list.jobDesc}
                
              </div>
              <div className="j_l_desc">
      {list.jobDesc}
              </div>
            </Col>
            <Visible xxl xl>

            <Col xxl={3.5} xl={3.3} lg={4.15} md={5.4}>
              <div id="h_p_create_job_container">
                <div className="h_p_filterTitle">Pilot Type</div>
                <div className="h_p_filterText">{list.employeeType}</div>
                <div className="h_p_filterTitle">Work Type</div>
                <div className="h_p_filterText">{list.JobType}</div>
                <div className="h_p_filterTitle">Salary</div>
                <div className="h_p_filterText">${list.minSalary}.00 - ${list.maxSalary}.00 / Month</div>
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

                <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
                  <div style={{ position: "absolute", top: '20px', right: '20px' }}>
                    <img src={Close} alt="" onClick={closeChoicePopup} style={{ cursor: "pointer" }} />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title">Job has been successfully set {list.status === 'active' ? "Pending" : "Active"}</div>
                    <div className="u_f_popup_btn_container">
                      
                      <button className="u_f_popup_btn2" onClick={closeChoicePopup}>Close</button>
                    </div>
                  </Row>
                </DialogContent>
              </Dialog>
      </Container>
    </div>
  );
}

export default Admin_showJobs;
