import React, { useEffect, useState } from "react";
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
import bin from "./images/c_j_bin.png";
import edit from "./images/c_j_edit.png";
import axios from "axios";

const domain = process.env.REACT_APP_MY_API;

function Company_approvedJobs() {
  let [data, setData] = useState([]);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  useEffect(() => {
    axios.post(`${domain}/api/jobs/approvedJobs`, config).then((res) => {
      if (res.data !== "") {
        setData(res.data);
      }
      console.log(res);
    });
  }, []);

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
                  <span className="pd_a_j_dataDate">{items.postingDate}</span>
                </div>
                <div className="pd_a_j_dataTitle">{items.jobTitle}</div>
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
                <button className="a_j_location_btn">
                  <img src={location} className="a_j_location_logo" />
                  <span className="a_j_location_text">
                    {items.workLocation.split(",")[0]}
                  </span>
                </button>{" "}
                <button className="a_j_location_btn">
                  <img src={work} className="a_j_location_logo" />
                  <span className="a_j_location_text">{items.jobType}</span>
                </button>
                <Link to={`/applyJobLanding/${items._id}`} id="a_j_job_btn">
                  View Job
                </Link>{" "}
                <img src={edit} className="company_jobs_edit" />
                <img src={bin} className="company_jobs_edit" />
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
    </div>
  );
}

export default Company_approvedJobs;
