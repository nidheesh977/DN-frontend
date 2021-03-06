import React, { useState, useEffect } from "react";
// import "./css/Pilot_appliedJobs.css";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import profileUser from "../images/profile-user.svg";
import money from "../images/money.svg";
import location from "../images/location.svg";
import work from "../images/work.svg";
import heart from "../images/heart (3).svg";
import heartLike from "../images/heart-blue.svg";
import { Link } from "react-router-dom";
import loadMore from "../images/Group 71.svg";
import axios from 'axios'
import './css/dashboard.css'


function Admin_pendingJobs() {


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
        like:true,
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
        like:true,

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
        like:false,

      },
    ],

  };
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  useEffect(() => {
    console.log(config)
    axios.get(`http://localhost:9000/api/admin/getPendingJobs`).then((response) => {
      // setData({response})
      setList(response.data);
      if(response.data.length == 0){
document.getElementById("tohide").style.display = "block"      }

      // console.log(list.postingDate)
console.log(response)});

  }, []);

  let [data, setData] = useState(profiles);
  let [list, setList] = useState([])


  return (
    <div className="pd_a_j_main">
        {/* mapping */}
        <div id="tohide"  style={{display: "none"}}>
          <div>No Pending Jobs please Check Later</div>
        </div>
     
        {
     
        list.slice(0).reverse().map((item) => {
          return (
            <div className="pd_a_j_data">
              <div style={{ marginBottom: "10px" }}>
              <div className="pd_a_j_dataDateHead">
                  Posted on:<span className="pd_a_j_dataDate">{item.postingDate.slice(0,10)}</span>
                </div>
                <div className="pd_a_j_dataTitle">{item.jobTitle}</div>
               
              </div>
              <div className="pd_a_j_data_subTitle">{item.industry}</div>
              <div>
                <div className="a_j_container1">
                  <div className="a_j_listing_img1">
                    <img src={profileUser} />
                  </div>
                  <div className="a_j_listing_profileName">{item.employeeType}</div>
                  <div className="a_j_listing_img2">
                    <img src={money} />
                  </div>
                  <div className="a_j_listing_money">${item.minSalary}.00 - ${item.maxSalary}.00</div>
                </div>
                <div className="a_j_listing_text">{item.jobDesc.slice(0,148)}</div>
                <hr className="a_j_listing_hr" />
              </div>
              <div className="a_j_listing_btns">
                <button className="a_j_location_btn">
                  <img src={location} className="a_j_location_logo" />
                  <span className="a_j_location_text">{item.city}</span>
                </button>{" "}
                <button className="a_j_location_btn">
                  <img src={work} className="a_j_location_logo" />
                  <span className="a_j_location_text">{item.jobType}</span>
                </button>
                <Link to={`/admin_dashboard/showJobs/${item._id}`} id="a_j_job_btn">
                  View Job
                </Link>{" "}
                <img src={item.like ? heart : heart}  className="a_j_like" />
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
    </div>
  );
}

export default Admin_pendingJobs;
