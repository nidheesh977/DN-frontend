import React from 'react'
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

function Company_applications() {
    let history = useHistory();
    let goToPreviousPath = () =>{
        history.goBack();
    }
  return (
    <div>
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

              <div className="pd_a_j_dataTitle">Drone Cinematographer</div>
            </div>
            <div>
              <div className="pd_a_j_dataDateHead">
                Applied on:
                <span className="pd_a_j_dataDate">12 Jan 2022</span>
              </div>
            </div>
            <div className="pd_a_j_data_subTitle1">UTV Movies Pictures</div>
            <div>
              <div className="a_j_container1">
                <div className="a_j_listing_img1">
                  <img src={profileUser} />
                </div>
                <div className="a_j_listing_profileName">Passionate Pilot</div>
                <div className="a_j_listing_img2">
                  <img src={money} />
                </div>
                <div className="a_j_listing_money">Not Mentioned</div>
              </div>
              <div className="a_j_listing_text1">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci quia tempora, molestias, modi praesentium alias
                expedita magnam quasi ullam optio, quibusdam ipsa asperiores
                officia harum
              </div>
            </div>
            <div className="a_j_listing_btns" style={{ marginTop: "20px" }}>
              <button className="a_j_location_btn">
                <img src={location} className="a_j_location_logo" />
                <span className="a_j_location_text">Bangalore</span>
              </button>{" "}
              <button className="a_j_location_btn">
                <img src={work} className="a_j_location_logo" />
                <span className="a_j_location_text">Full Time</span>
              </button>
              <div onClick={goToPreviousPath}
                id="a_j_job_btn1"
              >
                Close Candidates
              </div>{" "}
            </div>
          </div>
        </div>
        </div>
        <div style={{ padding: "30px 20px 10px 20px" }}>
          <Row gutterWidth={15}>
            <Col xl={2}><div className='c_r_applicationsHead'>Name</div></Col>
            <Col xl={2.25}><div className='c_r_applicationsHead'>Pilot Type</div></Col>
            <Col xl={2.25}><div className='c_r_applicationsHead'>location</div></Col>
            <Col xl={3}></Col>
            <Col xl={2.5}></Col>
          </Row>
        </div>

        <div className="c_r_applications_box1">
          <Row gutterWidth={15}>
            <Col xl={2}>
              <div className="c_r_applications_text">Yasar Arafath</div>
            </Col>
            <Col xl={2.25}>
              <div className="c_r_applications_text">Professional Pilot</div>
            </Col>
            <Col xl={2.25}>
              <div className="c_r_applications_text">Bangalore, India</div>
            </Col>
            <Col xl={3}>
              <div className="c_r_startProcessBtn">Start Process</div>
            </Col>
            <Col xl={2.5}>
              <div className="c_r_Remove">Remove Candidate</div>
            </Col>
          </Row>
        </div><div className="c_r_applications_box1">
          <Row gutterWidth={15}>
            <Col xl={2}>
              <div className="c_r_applications_text">Yaseen Ahmed</div>
            </Col>
            <Col xl={2.25}>
              <div className="c_r_applications_text">Passionate Pilot</div>
            </Col>
            <Col xl={2.25}>
              <div className="c_r_applications_text">Bangalore, India</div>
            </Col>
            <Col xl={3}>
              <div className="c_r_startProcessBtn">Start Process</div>
            </Col>
            <Col xl={2.5}>
              <div className="c_r_Remove">Remove Candidate</div>
            </Col>
          </Row>
        </div><div className="c_r_applications_box1">
          <Row gutterWidth={15}>
            <Col xl={2}>
              <div className="c_r_applications_text">Haj Mohammed</div>
            </Col>
            <Col xl={2.25}>
              <div className="c_r_applications_text">Passionate Pilot</div>
            </Col>
            <Col xl={2.25}>
              <div className="c_r_applications_text">Bangalore, India</div>
            </Col>
            <Col xl={3}>
              <div className="c_r_startProcessBtn">Start Process</div>
            </Col>
            <Col xl={2.5}>
              <div className="c_r_Remove">Remove Candidate</div>
            </Col>
          </Row>
        </div><div className="c_r_applications_box1">
          <Row gutterWidth={15}>
            <Col xl={2}>
              <div className="c_r_applications_text">Habeeb Ahmed</div>
            </Col>
            <Col xl={2.25}>
              <div className="c_r_applications_text">Passionate Pilot</div>
            </Col>
            <Col xl={2.25}>
              <div className="c_r_applications_text">Bangalore, India</div>
            </Col>
            <Col xl={3}>
              <div className="c_r_startProcessBtn">Start Process</div>
            </Col>
            <Col xl={2.5}>
              <div className="c_r_Remove">Remove Candidate</div>
            </Col>
          </Row>
        </div><div className="c_r_applications_box1">
          <Row gutterWidth={15}>
            <Col xl={2}>
              <div className="c_r_applications_text">Nidheesh Verma</div>
            </Col>
            <Col xl={2.25}>
              <div className="c_r_applications_text">Passionate Pilot</div>
            </Col>
            <Col xl={2.25}>
              <div className="c_r_applications_text">Bangalore, India</div>
            </Col>
            <Col xl={3}>
              <div className="c_r_startProcessBtn">Start Process</div>
            </Col>
            <Col xl={2.5}>
              <div className="c_r_Remove">Remove Candidate</div>
            </Col>
          </Row>
        </div>
    </div>
  )
}

export default Company_applications