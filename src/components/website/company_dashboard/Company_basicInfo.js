import React from 'react';
import Cover from './images/cover.jpg'
import "./css/Company_BasicInfo.css"
import Pilot from './images/pilot.jpg'
import logo from "./images/logo.jpg"
import logoCover from "./images/logocompany.png"
import { Row, Col } from 'react-grid-system'
import Edit from "./images/edit-1.svg"

function Company_BasicInfo() {
  return <div className='pd_b_i_main'>
    <div className='pd_b_i_images'>
      <img src={logoCover} alt="" className='pd_b_i_cover' />
      <div className='pd_b_i_profile'>
        <div className='pd_b_i_profile_container'>
        <img src={logo} alt="" className='pd_b_i_pilot' />
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
      <div className='pd_b_i_profile_head'>Company Name</div>
      <input type="text" className='pd_b_i_profile_input' />
    </div>
    <Row>
      <Col>
        <div>
          <div>
            <div style={{marginBottom: "15px"}}>
            <div className='pd_b_i_profile_head1' >Email ID</div>
            <div className='pd_b_i_profile_verify'>Verify</div>

            </div>
          </div>
          <input type="text" className='pd_b_i_profile_input' />
        </div>
      </Col><Col>
        <div>
          <div>

<div style={{marginBottom: "15px"}}>
            <div className='pd_b_i_profile_head1'>Phone Number</div>
            <div className='pd_b_i_profile_verify'>Verify</div>
            </div>
            </div>


              <input type="text" className='pd_b_i_profile_input' />
            </div>
          </Col>
        </Row>
        
        <div>
          <div className='pd_b_i_profile_head'>Industry</div>
          <input type="text" className='pd_b_i_profile_input' />
        </div><div>
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
          </Col><Col xl={6}>
            <div>
              <div className='pd_b_i_profile_head'>Postal Address</div>
              <input type="text" className='pd_b_i_profile_input' />
            </div>
          </Col>
        </Row>
   
        <div className='pd_b_i_notifications_save'>
          <button className='pd_b_i_notifications_saveBtn'>Save Changes</button>

        </div>
      </div>;
}

      export default Company_BasicInfo;
