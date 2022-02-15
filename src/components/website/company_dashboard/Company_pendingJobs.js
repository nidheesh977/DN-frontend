import React, { useState } from "react";
import "../pilot_dashboard/css/Pilot_appliedJobs.css";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import profileUser from "../../images/profile-user.svg";
import money from "../../images/money.svg";
import location from "../../images/location.svg";
import work from "../../images/work.svg";
import heart from "../../images/heart (3).svg";
import heartLike from "../../images/heart-blue.svg";
import { Link } from "react-router-dom";
import loadMore from "../../images/Group 71.svg";
import bin from "./images/c_j_bin.png"
import edit from "./images/c_j_edit.png"

function Company_pendingJobs() {
  let profiles = {
    listing: [
      {
        id: 1,
        name: "Flying Pilot",
        date: "16 Jan 2022",
        producer: "Nexevo Technologies",
        profile: "Passionate Pilot",
        range: "Not Mentioned",
        desc: "A drone is an unmanned aircraft. more controversially, as weapons platforms. Drones are more formally known as unmanned aerial vehicles (UAVs) or unmanned aircraft systems",
        location: "Bangalore",
        type: "Full-Time",
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

  let [data, setData] = useState(profiles);
  return (
    <div>

{
      data.listing.map((items, i) => {
        return(<div>
          <div style={{margin: "0px 0px 40px 0px"}}>
          <div style={{ marginBottom: "10px" }}>
            <div className="pd_a_j_dataDateHead">
              Posted on:<span className="pd_a_j_dataDate">{items.date}</span>
            </div>
            <div className="pd_a_j_dataTitle">{items.name}</div>
          </div>
          <div className="pd_a_j_data_subTitle">{items.producer}</div>
          <div>
            <div className="a_j_container1">
              <div className="a_j_listing_img1">
                <img src={profileUser} />
              </div>
              <div className="a_j_listing_profileName">{items.profile}</div>
              <div className="a_j_listing_img2">
                <img src={money} />
              </div>
              <div className="a_j_listing_money">{items.range}</div>
            </div>
            <div className="a_j_listing_text">
             {items.desc}
            </div>
          </div>
          <div className="a_j_listing_btns" style={{marginTop: "20px"}}>
            <button className="a_j_location_btn">
              <img src={location} className="a_j_location_logo" />
              <span className="a_j_location_text">{items.location}</span>
            </button>{" "}
            <button className="a_j_location_btn">
              <img src={work} className="a_j_location_logo" />
              <span className="a_j_location_text">{items.type}</span>
            </button>
            <Link to="#" id="a_j_job_btn">
              View Job
            </Link>{" "}
            <img src={edit} className="company_jobs_edit" />

            <img src={bin} className="company_jobs_edit" />
          </div>
  
        </div>
        <hr className="a_j_listing_hr" style={{marginBottom: "40px"}} />
        </div>
        )
      })
    }
     <div className="a_j_load_div">
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div>
    </div>
    
     

  );
}

export default Company_pendingJobs;
