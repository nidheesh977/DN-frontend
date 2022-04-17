import React, { useState, useEffect } from "react";
import "./css/Pilot_appliedJobs.css";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import profileUser from "../../images/profile-user.svg";
import money from "../../images/money.svg";
import location from "../../images/location.svg";
import work from "../../images/work.svg";
import heart from "../../images/heart (3).svg";
import heartLike from "../../images/heart-blue.svg";
import { Link } from "react-router-dom";
import loadMore from "../../images/Group 71.svg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Close from "../../images/close.svg";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import All from "..//All.module.css";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function Pilot_savedJobs() {

  const domain = process.env.REACT_APP_MY_API

  let [liked, setLiked] = useState([]);
  let [dialog1, setDialog1] = useState(false)
  let [dialog2, setDialog2] = useState(false)
  let closeChoicePopup1 = () => {
    setDialog1(false)}
    let closeChoicePopup2 = () => {
      setDialog2(false)}

  let profiles = {
    listing: [
      {
        id: 1,
        name: "Drone Cinematograper",
        date: "06 Jan 2022",
        producer: "UTV Motion Pictures",
        profile: "Professional Pilot",
        range: "$150.00 - $200.00",
        desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quia tempora, molestias, modi praesentium alias expedita magnam quasi ullam optio, quibusdam ipsa asperiores officia harum",
        location: "Bangalore",
        type: "Full Time",
        like: true,
      },
      {
        id: 2,
        name: "React Cinematograper",
        date: "06 July 2022",
        producer: "UTV Motion Moviess",
        profile: "Full Stack Developer",
        range: "$150.00 - $600.00",
        desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quia tempora, molestias, modi praesentium alias expedita magnam quasi ullam optio, quibusdam ipsa asperiores officia harum",
        location: "Bangalore",
        type: "Part Time",
        like: false,
      },
      {
        id: 3,
        name: "Drone Cinematograper",
        date: "06 Jan 2022",
        producer: "UTV Motion Pictures",
        profile: "Professional Pilot",
        range: "$150.00 - $200.00",
        desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quia tempora, molestias, modi praesentium alias expedita magnam quasi ullam optio, quibusdam ipsa asperiores officia harum",
        location: "Bangalore",
        type: "Full Time",
        like: true,
      },
      {
        id: 4,
        name: "Drone Cinematograper",
        date: "06 Jan 2022",
        producer: "UTV Motion Pictures",
        profile: "Professional Pilot",
        range: "$150.00 - $200.00",
        desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quia tempora, molestias, modi praesentium alias expedita magnam quasi ullam optio, quibusdam ipsa asperiores officia harum",
        location: "Bangalore",
        type: "Full Time",
        like: false,
      },
    ],
  };

  let likePost = (id) =>{
    setDialog1(true)
    liked.push(id)

    axios.post(`${domain}/api/jobs/likeJob/${id}`, config)

      .then((response) => {
        


if(response.data === "please Login"){
  // history.push("/pilot_dashboard/account")
  alert("loginFirst");
}


})
      .catch(() => {
      });
      
  }
let unlikePost = (id) =>{
    console.log(config);
    setDialog2(true)
    let index = liked.indexOf(id);
    liked.splice(index, 1);
   
    axios.post(`${domain}/api/jobs/unlikeJob/${id}`, config)

      .then((response) => {


if(response.data === "please Login"){
  // history.push("/pilot_dashboard/account")
  alert("loginFirst");
}


})
      .catch(() => {
      });
      
  }
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  useEffect(() => {
    console.log(config);
    axios
      .post(`${domain}/api/pilot/getSavedJobs`, config)
      .then((response) => {
        // setData({response})
        setList(response.data);
        if(response.data.length == 0){
          document.getElementById("tohide").style.display = "block"      }

        // console.log(list.postingDate)
        console.log(response);
      })
      .then(() => {
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })

      axios.post(`${domain}/api/pilot/getLikedJobs`, config)
.then(res => {
  const persons = res.data;
  console.log(persons)
  setLiked(persons);
})
  }, []);

  let [data, setData] = useState(profiles);
  let [list, setList] = useState([]);
  let [loading, setLoading] = useState(true);
  return (
    <div className="pd_a_j_main">
       <div id="tohide"  style={{display: "none"}}>
          <div>No Saved Jobs please Check Later</div>
        </div>
      {/* mapping */}
      {loading && (
        <Skeleton height={250} count={3} style={{ marginBottom: "20px" }} />
      )}
      {list
        .slice(0)
        .reverse()
        .map((item) => {
          return (
            <div className="pd_a_j_data">
              <div style={{ marginBottom: "10px" }}>
                <div className="pd_a_j_dataDateHead">
                  Posted on:
                  <span className="pd_a_j_dataDate">
                    {item.postingDate.slice(0, 10)}
                  </span>
                </div>
                <div className="pd_a_j_dataTitle">{item.jobTitle}</div>
              </div>
              <div className="pd_a_j_data_subTitle">{item.industry}</div>
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
                    ${item.minSalary}.00 - ${item.maxSalary}.00
                  </div>
                </div>
                <div className="a_j_listing_text">
                  {item.jobDesc.slice(0, 148)}
                </div>
                <hr className="a_j_listing_hr" />
              </div>
              <div className="a_j_listing_btns">
                <button className="a_j_location_btn">
                  <img src={location} className="a_j_location_logo" />
                  <span className="a_j_location_text">{item.workLocation.split(",")[0]}</span>
                </button>{" "}
                <button className="a_j_location_btn">
                  <img src={work} className="a_j_location_logo" />
                  <span className="a_j_location_text">{item.jobType}</span>
                </button>
                <Link to={`/applyJobLanding/${item._id}`} id="a_j_job_btn">
                  View Job
                </Link>{" "}
                {
                            liked.includes(item._id)?  <img
                            src={heartLike}
                            className="a_j_like" onClick={()=>unlikePost(item._id)}
                          /> :  <img
                          src={heart}
                          className="a_j_like" onClick={()=>likePost(item._id)}
                        />
                          }  
              </div>
            </div>
          );
        })}{" "}
      <div className="a_j_load_div">
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div>
      <Dialog
                open={dialog1}
                onClose={closeChoicePopup1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth={true}
              >

                <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
                  <div style={{ position: "absolute", top: '20px', right: '20px' }}>
                    <img src={Close} alt="" onClick={closeChoicePopup1} style={{ cursor: "pointer" }} />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title">The Job has been saved successfully</div>
                    <div className="u_f_popup_btn_container">
                      <button className="u_f_popup_btn2" onClick={closeChoicePopup1}>Close</button>
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

                <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
                  <div style={{ position: "absolute", top: '20px', right: '20px' }}>
                    <img src={Close} alt="" onClick={closeChoicePopup2} style={{ cursor: "pointer" }} />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title">The Job has been Unsaved successfully</div>
                    <div className="u_f_popup_btn_container">
                      <button className="u_f_popup_btn2" onClick={closeChoicePopup2}>Close</button>
                    </div>
                  </Row>
                </DialogContent>
              </Dialog>
    </div>
  );
}

export default Pilot_savedJobs;
