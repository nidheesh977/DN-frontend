import React, {Component} from 'react'
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from '../website/All.module.css'
import '../css/ApplyJob.css'

class ApplyJob extends Component{
  render(){
    return(
      <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
        <Row>
          <div id = "apply_job_banner">
            <div className='apply_job_banner_title'>Apply job and get hired</div>
            <div className='apply_job_banner_content'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, animi!</div>
          </div>
        </Row>
        <Row>
          <div id = "apply_job_filters">
            <select name="industry" id="apply_job_industry_filter" className="apply_job_filter">
              <option value="">Select Industry</option>
            </select>
            <select name="country" id="apply_job_country_filter" className="apply_job_filter">
              <option value="">Select Country</option>
            </select>
            <select name="city" id="apply_job_city_filter" className="apply_job_filter">
              <option value="">Select City</option>
            </select>
            <select name="worktype" id="apply_job_worktype_filter" className="apply_job_filter">
              <option value="">Work Type</option>
            </select>
            <select name="hourlyrate" id="apply_job_hourlyrate_filter" className="apply_job_filter">
              <option value="">Hourly Rate</option>
            </select>
            <span className="apply_job_filter_more"><i class="fas fa-plus"></i></span>
            <input type="text" name="search" className="apply_job_search" />
          </div>
        </Row>
      </Container>
    )
  }
}

export default ApplyJob