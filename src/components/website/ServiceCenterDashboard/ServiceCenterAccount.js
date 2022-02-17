import React, { Component } from "react"
import All from '../../website/All.module.css'
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'
import Cover from '../pilot_dashboard/images/cover.jpg'
import "../pilot_dashboard/css/Pilot_BasicInfo.css"
import "../../css/ServiceCenterAccount.css"
import Pilot from '../pilot_dashboard/images/pilot.jpg'
import Edit from "../pilot_dashboard/images/edit-1.svg"
import Edit2 from "../pilot_dashboard/images/edit (3).svg"
import service_center_1 from "../../images/service_center_1.jpg"
import service_center_2 from "../../images/service_center_2.jpg"
import service_center_3 from "../../images/service_center_3.jpg"
import service_center_4 from "../../images/service_center_4.jpg"
import plusicon from '../../images/s_d_a_plus_icon.png'
import deleteIcon from '../company_dashboard/images/c_j_bin.png'

class ServiceCenterAccount extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active_tab: 1,
      brands: ["DJI", "UVify", "Hubsan", "Parrot", "Autel Robotics"],
      photos: [service_center_1, service_center_2, service_center_3, service_center_4]
    }
  }

  changeActiveTab = (tab) => {
    this.setState({
      active_tab: tab
    })
  }

  addPhoto = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState(prevState => ({
          photos: [...prevState.photos, reader.result]
        }))
        this.refs.add_photo.value = ""
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  showRemoveIcon = (id) => {
    document.getElementById(id).style.visibility = "visible"
  }

  hideRemoveIcon = (id) => {
    document.getElementById(id).style.visibility = "hidden"
  }

  removePhoto = (id) => {
    var photos = this.state.photos
    photos.splice(id, 1)
    this.setState({
      photos: photos
    })
  }

  render() {
    return (
      <>
        <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
          <Row gutterWidth={70}>
            <Col xl={3} lg={4} md={12}>
              <div className="s_c_db_activity_filter_container">
                <div className="s_c_db_activity_filter_title">My Account</div>
                <div className={this.state.active_tab === 1 ? "s_c_db_activity_filter s_c_db_activity_filter_active" : "s_c_db_activity_filter"} onClick={() => this.changeActiveTab(1)}>Basic Information</div>
                <div className={this.state.active_tab === 2 ? "s_c_db_activity_filter s_c_db_activity_filter_active" : "s_c_db_activity_filter"} onClick={() => this.changeActiveTab(2)}>Additional information  </div>
                <div className={this.state.active_tab === 3 ? "s_c_db_activity_filter s_c_db_activity_filter_active" : "s_c_db_activity_filter"} onClick={() => this.changeActiveTab(3)}>Notifications Settings</div>
              </div>
            </Col>
            {this.state.active_tab === 1 &&
              <Col>
                <div className='pd_b_i_main'>
                  <div className='pd_b_i_images'>
                    <img src={Cover} alt="" className='pd_b_i_cover' />
                    <div className='pd_b_i_profile'>
                      <div className='pd_b_i_profile_container'>
                        <img src={Pilot} alt="" className='pd_b_i_pilot' />
                        <div><img src={Edit} alt="" className='pd_b_i_edit' /></div>

                      </div>

                    </div>
                    <div><img src={Edit} alt="" className='pd_b_i_edit1' /></div>

                  </div>
                  <div className="pd_b_i_profile_titleBox">
                    <div className='pd_b_i_profile_title'>Basic Information</div>
                    <div className='pd_b_i_profile_edit'>Edit</div>
                  </div>
                  <div>
                    <div className='pd_b_i_profile_head'>Full Name</div>
                    <input type="text" className='pd_b_i_profile_input' />
                  </div>
                  <Row>
                    <Col>
                      <div>
                        <div>
                          <div style={{ marginBottom: "15px" }}>
                            <div className='pd_b_i_profile_head1' >Email ID</div>
                            <div className='pd_b_i_profile_verify'>Verify</div>

                          </div>
                        </div>
                        <input type="text" className='pd_b_i_profile_input' />
                      </div>
                    </Col><Col>
                      <div>
                        <div>

                          <div style={{ marginBottom: "15px" }}>
                            <div className='pd_b_i_profile_head1'>Phone Number</div>
                            <div className='pd_b_i_profile_verify'>Verify</div>
                          </div>
                        </div>

                        <input type="text" className='pd_b_i_profile_input' />
                      </div>
                    </Col>
                  </Row><Row>
                    <Col>
                      <div>
                        <div className='pd_b_i_profile_head'>DOB</div>
                        <input type="text" className='pd_b_i_profile_input' />
                      </div>
                    </Col><Col>
                      <div>
                        <div className='pd_b_i_profile_head'>Gender</div>
                        <input type="text" className='pd_b_i_profile_input' />
                      </div>
                    </Col>
                  </Row>
                  <div>
                    <div className='pd_b_i_profile_head'>Address</div>
                    <input type="text" className='pd_b_i_profile_input' />
                  </div>
                  <Row>
                    <Col xl={6}>
                      <div>
                        <div className='pd_b_i_profile_head'>City</div>
                        <input type="text" className='pd_b_i_profile_input' />
                      </div>
                    </Col><Col xl={6}>
                      <div>
                        <div className='pd_b_i_profile_head'>Country</div>
                        <input type="text" className='pd_b_i_profile_input' />
                      </div>
                    </Col>
                  </Row>
                  <div>
                    <div className='pd_b_i_profile_head'>Bio</div>
                    <textarea type="text" className='pd_b_i_profile_inputDesc' placeholder='Maximum 50 words...' ></textarea>
                    <div className='pd_b_i_profile_text'>Brief description for your profile. URLs are hyperlinked</div>
                  </div>
                  <div className='pd_b_i_notifications_save'>
                    <button className='pd_b_i_notifications_saveBtn'>Save Changes</button>

                  </div>
                </div>
              </Col>
            }
            {this.state.active_tab === 2 &&
              <Col>
                <div className='pd_b_i_main'>
                  <div className='pd_b_i_images'>
                    <img src={Cover} alt="" className='pd_b_i_cover' />
                    <div className='pd_b_i_profile'>
                      <div className='pd_b_i_profile_container'>
                        <img src={Pilot} alt="" className='pd_b_i_pilot' />
                        <div><img src={Edit} alt="" className='pd_b_i_edit' /></div>

                      </div>

                    </div>
                    <div><img src={Edit} alt="" className='pd_b_i_edit1' /></div>

                  </div>
                  <div className="pd_b_i_profile_titleBox">
                    <div className='pd_b_i_profile_title'>Additional information</div>
                    <div className='pd_b_i_profile_edit'>Edit</div>
                  </div>
                  <div>
                    <div className='pd_b_i_profile_head'>Working Hours</div>
                    <input type="text" className='pd_b_i_profile_input' placeholder="9.00 AM - 8.00 PM" />
                  </div>
                  <Row>
                    <Col sm={12} md={6}>
                      <div>
                        <div>
                          <div style={{ marginBottom: "15px" }}>
                            <div className='pd_b_i_profile_head1' >Secondary Mobile number</div>

                          </div>
                        </div>
                        <input type="text" className='pd_b_i_profile_input' />
                      </div>
                    </Col><Col sm={12} md={6}>
                      <div>
                        <div>

                          <div style={{ marginBottom: "15px" }}>
                            <div className='pd_b_i_profile_head1'>Website</div>
                          </div>
                        </div>


                        <input type="text" className='pd_b_i_profile_input' />
                      </div>
                    </Col>
                  </Row>
                  <div>
                    <div className='pd_b_i_profile_head'>Brand of drones</div>
                    <input type="text" className='pd_b_i_profile_input' placeholder="Search drone brands" />
                  </div>
                  <div className="s_c_a_brand_container">
                    {this.state.brands.map((brand, index) => {
                      return (
                        <div className="s_c_a_brand">{brand} <i class="fa fa-check" aria-hidden="true" style={{ marginLeft: "20px" }}></i></div>
                      )
                    })}
                  </div>
                  <div>
                    <div className='pd_b_i_profile_head'>Description</div>
                    <textarea type="text" className='pd_b_i_profile_inputDesc' placeholder='Write description about your service center' style={{ marginBottom: "35px" }}></textarea>
                  </div>
                  <div className="s_c_a_photos">
                    <div className="pd_b_i_profile_head">Photos</div>
                    <div className="s_c_a_photos_container">
                      {this.state.photos.map((photo, index) => {
                        return (
                          <div className="s_c_a_photo" key={index} onClick = {() => this.removePhoto(index)} onMouseOver = {() => this.showRemoveIcon(`s_c_a_remove_img_${index}`)} onMouseLeave = {() => this.hideRemoveIcon(`s_c_a_remove_img_${index}`)}>
                            <img src={photo} alt="" className="s_c_a_photo_img" />
                            <img src={deleteIcon} alt="" className="s_c_a_remove_img" id={`s_c_a_remove_img_${index}`}/>
                          </div>
                        )
                      })}

                      <label className="s_c_a_photo_add">
                        <input type="file" name="" id="" style={{ display: "none" }} onChange={this.addPhoto} ref = "add_photo"  accept="image/*"/>
                        <div className="s_c_a_photo_add_symbol">
                          <img src={plusicon} alt="" className="s_c_a_plus_icon" />
                        </div>
                        <div className="s_c_a_photo_add_text">Add photos</div>
                      </label>
                    </div>
                  </div>
                  <div className='pd_b_i_notifications_save'>
                    <button className='pd_b_i_notifications_saveBtn'>Save Changes</button>

                  </div>
                </div>
              </Col>
            }
            {this.state.active_tab === 3 &&
              <Col>
                <div className='pd_notifications_main'>
                  <div className='pd_notifications_mainBox'>
                    <div className='pd_notifications_main_title'>Notifications Settings</div>
                    <img src={Edit2} className="pd_notifications_edit" />

                  </div>
                  <div className='pd_notifications_alert'>
                    <div className='pd_notifications_alert_title'>Alert & Notifications</div>
                    <div className='pd_notifications_alert_side'>Send me an mail</div>
                  </div>
                  <hr className='pd_notifications_hr' />
                  <div>
                    <label className='pd_notifications_label'>
                      <input type="checkbox" /> <span className='pd_notifications_title'>Drone Zone News</span>
                    </label>
                    <div className='pd_notifications_desc'>Get Drone Zone news, announcements and competition updates</div>
                  </div>
                  <hr className='pd_notifications_hr' /> <div>
                    <label className='pd_notifications_label'>
                      <input type="checkbox" /> <span className='pd_notifications_title'>Account Privacy</span>
                    </label>
                    <div className='pd_notifications_desc'>Get important notifications about you</div>
                  </div>
                  <hr className='pd_notifications_hr' />

                  <div style={{ marginTop: "50px" }}>
                    <div className='pd_notifications_alert_title'>Account Activity</div>
                    <div className='pd_notifications_alert_side'>Send me an mail</div>
                  </div>
                  <hr className='pd_notifications_hr' />
                  <div>
                    <label className='pd_notifications_label2'>
                      <input type="checkbox" /> <span className='pd_notifications_title'>Anyone hires me</span>
                    </label>
                  </div>
                  <hr className='pd_notifications_hr' /><div>
                    <label className='pd_notifications_label2'>
                      <input type="checkbox" /> <span className='pd_notifications_title'>Someone mentions me</span>
                    </label>
                  </div>
                  <hr className='pd_notifications_hr' /><div>
                    <label className='pd_notifications_label2'>
                      <input type="checkbox" /> <span className='pd_notifications_title'>Someone accepts my invitation</span>
                    </label>
                  </div>
                  <hr className='pd_notifications_hr' /><div>
                    <label className='pd_notifications_label2'>
                      <input type="checkbox" /> <span className='pd_notifications_title'>Anyone follows me</span>
                    </label>
                  </div>
                  <hr className='pd_notifications_hr' /><div>
                    <label className='pd_notifications_label2'>
                      <input type="checkbox" /> <span className='pd_notifications_title'>Someone comments on one of my shots</span>
                    </label>
                  </div>
                  <hr className='pd_notifications_hr' />

                  <div className='pd_notifications_save'>
                    <button className='pd_notifications_saveBtn'>Save Changes</button>
                  </div>

                </div>
              </Col>
            }
          </Row>
        </Container>
      </>
    )
  }
}

export default ServiceCenterAccount