import React, { Component } from 'react'
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'
import All from './All.module.css'
import '../css/HirePilot.css'
import profileImg from '../images/profile_user@2x.png'


class HirePilot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type_of_drones: ["DJI Mavic Air 2", "DJI Mavic 2 Pro", "DJI Mavic Mini", "DJI Mavic 2 Zoom", "DJI Phanton 4", "Parrot Anafi", "DJI Mavic Pro", "DJI Inspire 2", "DJI Inspire 1", "Parrot Bebop 2"],
      keywords: ["Areal View", "Agriculture", "NGO", "Agriculture", "Areal View", "NGO", "Areal View", "Agriculture", "NGO", "Agriculture", "Areal View", "NGO", "Areal View", "Agriculture", "NGO", "Agriculture", "Areal View", "NGO"],
      rating: 4,
    }
  }

  render() {
    return (
      <div className="h_p_container">
        <Container className={All.Container}>
          <Row gutterWidth={40}>
            <Col xxl={3.5} xl={3.3} lg={4.15} md={5.4} >
              <div id="h_p_create_job_container">
                <div className='h_p_create_job_title'>Create Job Alert</div>
                <div className='h_p_create_job_desc'>Create a job alert now, Click below button</div>
                <button className='h_p_create_job_btn'>Create a job</button>
              </div>
              <div id="h_p_filters1_container">
                <div className="h_p_filter1_heading">Filters</div>
                <div className="h_p_filter1_title">Pilot type</div>
                <div className="h_p_filter1_content_container" id="h_p_pilot_type_filter">
                  <label className="h_p_filter1_filter">
                    <input type="checkbox" className="h_p_filter1_checkbox" />
                    <div className="h_p_filter1_checkbox_label">Licensed Pilots</div>
                  </label>
                  <label className="h_p_filter1_filter">
                    <input type="checkbox" className="h_p_filter1_checkbox" />
                    <div className="h_p_filter1_checkbox_label">Unlicensed Pilots</div>
                  </label>
                </div>
                <div className="h_p_filter1_title">Work</div>
                <div className="h_p_filter1_content_container" id="h_p_pilot_work_filter">
                  <label className="h_p_filter1_filter">
                    <input type="checkbox" className="h_p_filter1_checkbox" />
                    <div className="h_p_filter1_checkbox_label">Full Time</div>
                  </label>
                  <label className="h_p_filter1_filter">
                    <input type="checkbox" className="h_p_filter1_checkbox" />
                    <div className="h_p_filter1_checkbox_label">Part Time</div>
                  </label>
                </div>
                <div className="h_p_filter1_title">Hourly Rate</div>
                <div className="h_p_filter1_content_container" id="h_p_rate_range_filter">
                  <div className="h_p_filter1_rate_content">Price Range $20 - 30</div>
                </div>
                <div className="h_p_filter1_title">Type of Drone</div>
                <div className="h_p_filter1_content_container" id="h_p_rate_range_filter">
                  {this.state.type_of_drones.map((drone, index) => {
                    return (
                      <label className="h_p_filter1_filter" key={index}>
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">{drone}</div>
                      </label>
                    )
                  })}
                </div>
                <div className="h_p_filter1_title">Ratings</div>
                <label className="h_p_filter1_filter">
                  <input type="checkbox" className="h_p_filter1_checkbox" />
                  <div className="h_p_filter1_checkbox_label">5 Star</div>
                </label>
                <label className="h_p_filter1_filter">
                  <input type="checkbox" className="h_p_filter1_checkbox" />
                  <div className="h_p_filter1_checkbox_label">4 Star</div>
                </label>
                <label className="h_p_filter1_filter">
                  <input type="checkbox" className="h_p_filter1_checkbox" />
                  <div className="h_p_filter1_checkbox_label">3 Star</div>
                </label>
                <label className="h_p_filter1_filter">
                  <input type="checkbox" className="h_p_filter1_checkbox" />
                  <div className="h_p_filter1_checkbox_label">2 Star</div>
                </label>
                <label className="h_p_filter1_filter">
                  <input type="checkbox" className="h_p_filter1_checkbox" />
                  <div className="h_p_filter1_checkbox_label">1 Star</div>
                </label>
              </div>
            </Col>
            <Col>
              <div className="h_p_title_container">
                <div className="h_p_title">Hire Drone Pilots</div>
              </div>
              <div className="h_p_listing_container">
                <div className="h_p_listing_details">
                  <div className="h_p_listing_img_container">
                    <img src={profileImg} alt="" className='h_p_listing_img'/>
                  </div>
                  <div className="h_p_listing_others_container">
                    <div className="h_p_listing_name">John Doe</div>
                    <div className="h_p_listing_job">Professional Drone pilot</div>
                    <div className="h_p_listing_location">Bangalore, India</div>
                    <div className="h_p_listing_description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, possimus!</div>
                    <div className="h_p_listing_keywords_container">
                      {this.state.keywords.slice(0,3).map((keyword, index) => {
                        return (
                          <span className="h_p_listing_keyword">{keyword}</span>
                        )
                      })}
                      <div className="h_p_listing_keyword">+{this.state.keywords.length - 3} more</div>
                    </div>
                  </div>

                </div>
                <div className="h_p_listing_pricing_rating">
                  <div className="h_p_listing_price_container">
                    <div className="h_p_listing_price">$20</div>
                    <div className="h_p_listing_price_per">/hr</div>
                  </div>
                  <div className="h_p_rating_container">
                    <div className={this.state.rating >= 1 ? "h_p_rating h_p_rating_selected" : "h_p_rating h_p_rating_unselected"}>&#9733;</div>
                    <div className={this.state.rating >= 2 ? "h_p_rating h_p_rating_selected" : "h_p_rating h_p_rating_unselected"}>&#9733;</div>
                    <div className={this.state.rating >= 3 ? "h_p_rating h_p_rating_selected" : "h_p_rating h_p_rating_unselected"}>&#9733;</div>
                    <div className={this.state.rating >= 4 ? "h_p_rating h_p_rating_selected" : "h_p_rating h_p_rating_unselected"}>&#9733;</div>
                    <div className={this.state.rating >= 5 ? "h_p_rating h_p_rating_selected" : "h_p_rating h_p_rating_unselected"}>&#9733;</div>
                  </div>
                  <div className="h_p_listing_btn_container">
                    <button className="h_p_start_process_btn">Start Process</button>
                    <button className="h_p_start_save_btn"><i class="fa fa-heart"></i></button>
                  </div>
                  <div className="h_p_listing_send_msg_link">Send Message</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default HirePilot