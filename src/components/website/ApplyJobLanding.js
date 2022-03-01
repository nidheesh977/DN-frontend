import React, {useState,useEffect} from "react";
import {useParams} from "react-router-dom"
import axios from 'axios'
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "./All.module.css";
import "../css/ApplyJob.css";
import { Link, useHistory } from "react-router-dom";
import heart from "../images/heart (3).svg";

function ApplyJobLanding() {
  let history = useHistory();
  let param = useParams();
  // let {data, setData}= useState({})
  let [list, setList] = useState([]);
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

      console.log(list.postingDate)
console.log(response)});

  }, []);

  function applyNow(){
    console.log(config)
    axios.post(`http://localhost:9000/api/jobs/applyJob/${param.id}`, config)
      .then(() => {
alert("applied")      })
      .catch(() => {
        alert("not successful");
      });
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
              <div className="j_l_title">{list.jobTitle}</div>
              <div className="j_l_producer">{list.industry}</div>
            </Col>
            <Col>
              <div className="j_l_right">
                <div className="j_l_applyJobBtn" onClick={applyNow}>Apply Now</div>
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
      </Container>
    </div>
  );
}

export default ApplyJobLanding;
