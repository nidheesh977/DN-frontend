import React from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "./All.module.css";
import "../css/ApplyJob.css";
import { Link, useHistory } from "react-router-dom";
import heart from "../images/heart (3).svg";

function ApplyJobLanding() {
  let history = useHistory();
  const goToPreviousPath = () => {
      history.goBack()
  }
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
              <div className="j_l_title">Drone Cinematographer</div>
              <div className="j_l_producer">UTV Motion Pictures</div>
            </Col>
            <Col>
              <div className="j_l_right">
                <div className="j_l_applyJobBtn">Apply Now</div>
                <img src={heart} />
              </div>
            </Col>
          </Row>
        </div>

        <Row gutterWidth={40}>
            <Col>
              <div className="j_l_titleHead"> Job Description</div>
              <div className="j_l_desc">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words,
                
              </div>
              <div className="j_l_desc">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.
              </div>
            </Col>
            <Visible xxl xl>

            <Col xxl={3.5} xl={3.3} lg={4.15} md={5.4}>
              <div id="h_p_create_job_container">
                <div className="h_p_filterTitle">Pilot Type</div>
                <div className="h_p_filterText">Licensed Pilot</div>
                <div className="h_p_filterTitle">Work Type</div>
                <div className="h_p_filterText">Full Time</div>
                <div className="h_p_filterTitle">Salary</div>
                <div className="h_p_filterText">$150.00 - $200.00 / Month</div>
                <div className="h_p_filterTitle">Posted Date</div>
                <div className="h_p_filterText">06 Jan 2022</div>
                <div className="h_p_filterTitle">Work location</div>
                <div className="h_p_filterText1">Bangalore, India</div>
              </div>
            </Col>
          </Visible>
        </Row>
      </Container>
    </div>
  );
}

export default ApplyJobLanding;
