import React, { Component } from 'react'
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'
import All from './All.module.css'
import '../css/HirePilot.css'
import profileImg from '../images/profile_user@2x.png'
import dropdown from '../images/s_c_dropdown2.png'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


class HirePilot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type_of_drones: ["DJI Mavic Air 2", "DJI Mavic 2 Pro", "DJI Mavic Mini", "DJI Mavic 2 Zoom", "DJI Phanton 4", "Parrot Anafi", "DJI Mavic Pro", "DJI Inspire 2", "DJI Inspire 1", "Parrot Bebop 2"],
      keywords: ["Areal View", "Agriculture", "Areal View", "Agriculture", "Areal View", "NGO", "Areal View", "Agriculture", "NGO", "Agriculture", "Areal View", "NGO", "Areal View", "Agriculture", "NGO", "Agriculture", "Areal View", "NGO"],
      rating: 4,
      keywords_visible: 3,
      view_pilot_type_filter: true,
      view_work_filter: true,
      view_hourly_rate_filter: true,
      view_type_of_drone_filter: false,
      view_ratings_filter: false,
      price_range: [20, 30],
      price_range_min: 0,
      price_range_max: 100
    }
  }

  handleMoreKeyword = () => {
    if (this.state.keywords_visible === 3){
      this.setState({
        keywords_visible: this.state.keywords.length
      })
    }
    else{
      this.setState({
        keywords_visible: 3
      })
    }
  }

  dropdown = (id) => {
    id = "view_"+id
    this.setState({
      [id]: !this.state[id]
    })
  }

  handlePriceRange = (e, value) => {
    this.setState({
      price_range: value
    })
  }

  render() {
    return (
      <div className="h_p_container">
        <Container className={All.Container}>
          <Row gutterWidth={40}>
            <Visible xxl xl>

              <Col xxl={3.5} xl={3.3} lg={4.15} md={5.4} >
                <div id="h_p_create_job_container">
                  <div className='h_p_create_job_title'>Create Job Alert</div>
                  <div className='h_p_create_job_desc'>Create a job alert now, Click below button</div>
                  <button className='h_p_create_job_btn'>Create a job</button>
                </div>
                <div id="h_p_filters1_container">
                  <div className="h_p_filter1_heading">Filters</div>
                  <div className="h_p_filter1_title" onClick = {() => this.dropdown("pilot_type_filter")}>Pilot type <img src={dropdown} alt="dropdown img" className={this.state.view_pilot_type_filter?"h_p_filter1_dropdown h_p_dropdown_selected":"h_p_filter1_dropdown"}/></div>
                  <div className={this.state.view_pilot_type_filter?"h_p_filter1_content_container ": "h_p_filter1_content_container h_p_hide_filter"} id="h_p_pilot_type_filter">
                    <label className="h_p_filter1_filter">
                      <input type="checkbox" className="h_p_filter1_checkbox" />
                      <div className="h_p_filter1_checkbox_label">Licensed Pilots</div>
                    </label>
                    <label className="h_p_filter1_filter">
                      <input type="checkbox" className="h_p_filter1_checkbox" />
                      <div className="h_p_filter1_checkbox_label">Unlicensed Pilots</div>
                    </label>
                  </div>
                  <div className="h_p_filter1_title" onClick = {() => this.dropdown("work_filter")}>Work <img src={dropdown} alt="dropdown img" className={this.state.view_work_filter?"h_p_dropdown_selected h_p_filter1_dropdown":"h_p_filter1_dropdown"} /></div>
                  <div className={this.state.view_work_filter?"h_p_filter1_content_container ": "h_p_filter1_content_container h_p_hide_filter"} id="h_p_work_filter">
                    <label className="h_p_filter1_filter">
                      <input type="checkbox" className="h_p_filter1_checkbox" />
                      <div className="h_p_filter1_checkbox_label">Full Time</div>
                    </label>
                    <label className="h_p_filter1_filter">
                      <input type="checkbox" className="h_p_filter1_checkbox" />
                      <div className="h_p_filter1_checkbox_label">Part Time</div>
                    </label>
                  </div>
                  <div className="h_p_filter1_title" onClick = {() => this.dropdown("hourly_rate_filter")}>Hourly Rate <img src={dropdown}alt="dropdown img" className={this.state.view_hourly_rate_filter?"h_p_dropdown_selected h_p_filter1_dropdown":"h_p_filter1_dropdown"} /></div>
                  <div className={this.state.view_hourly_rate_filter?"h_p_filter1_content_container ":"h_p_filter1_content_container h_p_hide_filter"} id="h_p_hourly_rate_filter">
                    <div className="h_p_filter1_rate_content">Price Range ${this.state.price_range[0]} - ${this.state.price_range[1]}</div>
                    <Box style={{marginRight: "7px", marginLeft: "10px"}}>
                      <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={this.state.price_range}
                        onChange={this.handlePriceRange}
                        valueLabelDisplay="auto"
                        min={this.state.price_range_min}
                        max={this.state.price_range_max}
                      />
                    </Box>
                  </div>
                  <div className="h_p_filter1_title" onClick = {() => this.dropdown("type_of_drone_filter")}>Type of Drone <img src={dropdown} alt="dropdown img" className={this.state.view_type_of_drone_filter?"h_p_dropdown_selected h_p_filter1_dropdown":"h_p_filter1_dropdown"} /></div>
                  <div className={this.state.view_type_of_drone_filter?"h_p_filter1_content_container ":"h_p_filter1_content_container h_p_hide_filter"} id="h_p_type_of_drone_filter">
                    {this.state.type_of_drones.map((drone, index) => {
                      return (
                        <label className="h_p_filter1_filter" key={index}>
                          <input type="checkbox" className="h_p_filter1_checkbox" />
                          <div className="h_p_filter1_checkbox_label">{drone}</div>
                        </label>
                      )
                    })}
                  </div>
                  <div className="h_p_filter1_title" onClick = {() => this.dropdown("ratings_filter")}>Ratings <img src={dropdown} alt="dropdown img" className={this.state.view_ratings_filter?"h_p_dropdown_selected h_p_filter1_dropdown":"h_p_filter1_dropdown"} /></div>
                  <div id="h_p_rating_filter" className={this.state.view_ratings_filter?"h_p_filter1_content_container":"h_p_hide_filter"}>
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
                </div>
              </Col>
            </Visible>
            <Col>
              <div className="h_p_title_container">
                <div className="h_p_title">Hire Drone Pilots</div>
                <div className="h_p_title_desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, sunt.</div>
              </div>

              <div className="h_p_filter2_container">
                <div className="h_p_filter2_input_container">
                  <input type="text" placeholder='Enter Industry' name="" id="" className='h_p_filter2_input'/>
                </div>

                <div className="h_p_filter2_dropdown_container">
                  <div className="h_p_filter2_dropdown_title">Filter by:</div>
                  <select className='h_p_filter2_dropdown_country'>
                    <option value="USA">USA</option>
                  </select>
                  <select className='h_p_filter2_dropdown_state'>
                    <option value="New York">New York</option>
                  </select>
                </div>

              </div>

              <div className='h_p_listing_container'>

                <Row>
                  <Col>
                    <div className="h_p_listing_img_container">
                      <img src={profileImg} alt="" className='h_p_listing_img' />
                    </div>
                    <div className="h_p_others_container">
                      <div className="h_p_listing_name">John Doe</div>
                      <div className="h_p_listing_job">Professional Drone pilot</div>
                      <div className="h_p_listing_location">Bangalore, India</div>
                      <div className="h_p_listing_description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, possimus!</div>
                      <div className="h_p_listing_keywords_container">
                        {this.state.keywords.slice(0,this.state.keywords_visible).map((keyword, index) => {
                          return (
                            <div className="h_p_listing_keyword">{keyword}</div>
                          )
                        })}
                        {this.state.keywords_visible<=3?<div className="h_p_listing_keyword h_p_listing_keyword_more" onClick={this.handleMoreKeyword}>+ {this.state.keywords.length - 3} more</div>:<div className="h_p_listing_keyword h_p_listing_keyword_more" onClick={this.handleMoreKeyword}>- Show less</div>}
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
                        <button className="h_p_save_pilot_btn"><i class="fa fa-heart"></i></button>
                      </div>
                      <div className="h_p_listing_send_msg_link">Send Message</div>
                    </div>
                  </Col>
                  
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default HirePilot