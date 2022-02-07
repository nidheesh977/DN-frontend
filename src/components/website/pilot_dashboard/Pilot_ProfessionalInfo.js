import React from 'react';
import { Row, Col } from 'react-grid-system'
import Edit from "./images/edit-1.svg"
import Cover from './images/cover.jpg'
import "./css/Pilot_BasicInfo.css"
import Pilot from './images/pilot.jpg'

function Pilot_ProfessionalInfo() {
  return <div className='pd_b_i_main'>
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
      <div className='pd_b_i_profile_title'>Professional Information</div>
      <div className='pd_b_i_profile_edit'>Edit</div>
    </div>
    <div>
      <div className='pd_b_i_profile_head'>Name</div>
      <input type="text" className='pd_b_i_profile_input' />
    </div>
    <div style={{marginBottom: "30px"}}>
      <div className='pd_b_i_profile_head'>Pilot type</div>
      <div>
      <input type="radio" name="pilotType" checked/> <span className='pd_p_i_profile_text'>Licensed Pilots</span>
      <input type="radio" name="pilotType"/> <span className='pd_p_i_profile_text'>Unlicensed Pilots</span>
      </div>
    </div>
    <div>

    <Row>
      <Col xl={6}>
    <div className='pd_b_i_profile_head'>Certificates  <span className='pd_p_i_profile_text'>(Optional)</span> </div>
   <label>
    <button className='pd_b_i_attachment'>Attachments</button><span className='pd_p_i_profile_text'>Attach your DGCA certificate</span>
  <input type="file" id="pd_p_i_hidden"/>
  </label>
  </Col>
    <Col xl={1}>
      <div className='or_container'><div>or</div></div>
    </Col>
    <Col xl={5}>
    <div>
      <div className='pd_b_i_profile_head'>Drone ID <span className='pd_p_i_profile_text'>(Optional)</span></div>
      <input type="text" className='pd_b_i_profile_input' placeholder='Enter your drone ID'/>
    </div>
    </Col>
    </Row>
    <div>
      <div className='pd_b_i_profile_head'>Drone Type</div>
      <input type="text" className='pd_b_i_profile_input' />
    </div>
    <div style={{marginBottom: "30px"}}>
      <div className='pd_b_i_profile_head'>Work Type</div>
      <div>
      <input type="radio" name="workType"/> <span className='pd_p_i_profile_text'>Full time</span>
      <input type="radio" name="workType" checked/> <span className='pd_p_i_profile_text'>Part time</span>
      </div>
    </div>
    <div>
      <div className='pd_b_i_profile_head'>Hourly Payment ($)<span className='pd_p_i_profile_text'>(Unlicensed Pilots)</span></div>
      <input type="text" className='pd_b_i_profile_input' />
    </div><div>
      <div className='pd_b_i_profile_head'>Monthly Payment ($)<span className='pd_p_i_profile_text'>(Licensed Pilots)</span></div>
      <input type="text" className='pd_b_i_profile_input' />
    </div>
    <div>
      <div className='pd_b_i_profile_head'>Industry<span className='pd_p_i_profile_text'>(for both pilots)</span></div>
      <input type="text" className='pd_b_i_profile_input' />
    </div>
    <div>
      <div className='pd_b_i_profile_head'>Training Center Name<span className='pd_p_i_profile_text'>(Licensed Pilots)</span></div>
      <input type="text" className='pd_b_i_profile_input' />
    </div>
    <div>
      <div className='pd_b_i_profile_head'>Completed Year<span className='pd_p_i_profile_text'>(Licensed Pilots)</span></div>
      <input type="text" className='pd_b_i_profile_input' />
    </div>
    <div>
      <div className='pd_b_i_profile_head'>Add Your Skills<span className='pd_p_i_profile_text'>(for both pilots)</span></div>
      <input type="text" className='pd_b_i_profile_input' />
    </div>
    <div className='pd_b_i_notifications_save' style={{marginTop: "20px"}}>
          <button className='pd_b_i_notifications_saveBtn'>Save Changes</button>

        </div>
    </div>
  </div>;

}

export default Pilot_ProfessionalInfo;
