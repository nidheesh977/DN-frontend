import React, { useEffect, useState } from "react";
import "../pilot_dashboard/css/Pilot_appliedJobs.css";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import profileUser from "../../images/profile-user.svg";
import All from "../../website/All.module.css";
import money from "../../images/money.svg";
import location from "../../images/location.svg";
import work from "../../images/work.svg";
import Dialog from "@material-ui/core/Dialog";
import Close from "../../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import heart from "../../images/heart (3).svg";
import heartLike from "../../images/heart-blue.svg";
import { Link, useHistory } from "react-router-dom";
import loadMore from "../../images/Group 71.svg";
import bin from "./images/c_j_bin.png";
import { withStyles } from "@material-ui/core/styles";
import edit from "./images/c_j_edit.png";
import axios from "axios";
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const domain = process.env.REACT_APP_MY_API;

function Company_approvedJobs() {
  let [data, setData] = useState([]);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  const history = useHistory()

  useEffect(() => {
    axios.post(`${domain}/api/jobs/approvedJobs`, config).then((res) => {
      if (res.data !== "") {
        setData(res.data);
      }
      console.log(res);
    });
  }, []);
  let [expireId, setExpireId] = useState("")
let expireJob = (id) =>{
  setExpireId(id)
  setExpirePopup(true)
}
let [expirePopup, setExpirePopup] = useState(false);
let [editPopup, setEditPopup] = useState(false);
let [editId, setEditId] = useState("");
let confirmExpire = () =>{
  axios.post(`${domain}/api/jobs/expireJob`,{jobId: expireId}).then(res=>{
    console.log(res)
    axios.post(`${domain}/api/jobs/approvedJobs`, config).then((res) => {
      if (res.data !== "") {
        setData(res.data);
      }
      console.log(res);
      setExpirePopup(false)
    });
  })
}
let expirePopupHandler = () =>{
  setExpirePopup(false)
}

let continueEdit = () => {
  history.push(`/job_edit/${editId}`)
}

let editJob = (id) => {
  setEditId(id)
  axios.post(`${domain}/api/jobApplications/getApplications`, {jobId: id}).then((res) => {
    console.log(res.data)
    if (res.data.length !== 0){
      setEditPopup(true)
    }
    else{
      history.push(`/job_edit/${id}`)
    }
  })
}

  return (
    <div>
      {data.length > 0
      ?
      <>
      {data.map((items, i) => {
        return (
          <div>
            <div style={{ margin: "0px 0px 40px 0px" }}>
              <div style={{ marginBottom: "10px" }}>
                <div className="pd_a_j_dataDateHead">
                  Posted on:
                  <span className="pd_a_j_dataDate">{items.postingDate.slice(0,10)}</span>
                </div>
                <Link to = {`/applyJobLanding/${items._id}`}><div className="pd_a_j_dataTitle">{items.jobTitle}</div></Link>
              </div>
              <div className="pd_a_j_data_subTitle">{items.companyName}</div>
              <div>
                <div className="a_j_container1">
                  <div className="a_j_listing_img1">
                    <img src={profileUser} />
                  </div>
                  <div className="a_j_listing_profileName">
                    {items.employeeType}
                  </div>
                  <div className="a_j_listing_img2">
                    <img src={money} />
                  </div>
                  <div className="a_j_listing_money">
                    ${items.minSalary}.00 - ${items.maxSalary}.00
                  </div>
                </div>
                <div className="a_j_listing_text">{items.jobDesc.slice(0,150)} {items.jobDesc.length > 150 && "..."}</div>
              </div>
              <div className="a_j_listing_btns" style={{ marginTop: "20px" }}>
                <button className="a_j_location_btn" style = {{cursor: "default"}}>
                  <img src={location} className="a_j_location_logo" />
                  <span className="a_j_location_text">
                    {items.workLocation.split(",")[0]}
                  </span>
                </button>{" "}
                <button className="a_j_location_btn" style = {{cursor: "default"}}>
                  <img src={work} className="a_j_location_logo" />
                  <span className="a_j_location_text">{items.jobType}</span>
                </button>
                <Link to={`/company_dashboard/activities/jobs/applications/${items._id}`} id="a_j_job_btn">
                  View Applications
                </Link>{" "}
                <img src={edit} className="company_jobs_edit" onClick = {()=>editJob(items._id)}/>
                <img src={bin} className="company_jobs_edit" onClick={()=>expireJob(items._id)} />
              </div>
            </div>
            <hr className="a_j_listing_hr" style={{ marginBottom: "40px" }} />
          </div>
        );
      })}
      </>
      :<div style = {{textAlign: "center"}}>
      <div className="cd_error_msg">No approved jobs yet upload new</div>
      <Link to = "/create_job"><button className="cd_error_btn" style = {{padding: "10px 30px"}}>Create a job</button></Link>
    </div>
      }


<Dialog
        open={expirePopup}
        onClose={expirePopupHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
        PaperProps={{
          style: { width: "620px", borderRadius: "10px" },
        }}
      >
        <DialogContent
          className={All.PopupBody}
          style={{ marginBottom: "50px" }}
        >
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
          >
            <img
              src={Close}
              alt=""
              onClick={expirePopupHandler}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <div className="sc_popup_head" style={{marginBottom: "15px"}}>Confirm Expire?</div>
            <div className="sc_popup_desc">
              On confirming the job will be expired{" "}
            </div>
           
            <div style={{ width: "100%", textAlign: "center"}}>
            <button className="sc_popup_submit" style={{marginRight: "20px", background: "#00E7FC "}} onClick={expirePopupHandler}>
                Close
              </button>
              <button className="sc_popup_submit" onClick={confirmExpire}>
                Expire
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
<Dialog
        open={editPopup}
        onClose={()=>setEditPopup(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
        PaperProps={{
          style: { width: "620px", borderRadius: "10px" },
        }}
      >
        <DialogContent
          className={All.PopupBody}
          style={{ marginBottom: "50px" }}
        >
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
          >
            <img
              src={Close}
              alt=""
              onClick={()=>setEditPopup(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <div className="sc_popup_head" style={{marginBottom: "15px"}}>Confirm Edit?</div>
            <div className="sc_popup_desc">
              On editing you may loose previous job data{" "}
            </div>
           
            <div style={{ width: "100%", textAlign: "center"}}>
            <button className="sc_popup_submit" style={{marginRight: "20px", background: "#00E7FC "}} onClick={()=>setEditPopup(false)}>
                Close
              </button>
              <button className="sc_popup_submit" onClick={continueEdit}>
                Continue edit
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Company_approvedJobs;
