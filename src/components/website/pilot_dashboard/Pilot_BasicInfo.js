import React, { useState } from "react";
import Cover from "./images/cover.jpg";
import "./css/Pilot_BasicInfo.css";
import Pilot from "./images/pilot.jpg";
import { Row, Col } from "react-grid-system";
import Edit from "./images/edit-1.svg";

function Pilot_BasicInfo() {
  let details = {
    name: "Yaseen Ahmed",
    email: "yaseen.nexevo@gmail.com",
    phNo: 6362206989,
    dob: "04 Dec 1999",
    gender: "Male",
    address: "Jayanagar Bangalore",
    city: "Bangalore",
    Country: "India",
    postal: 560069,
    Bio: "LOREM IPSUM GENERATOR  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };
  let [data, setData] = useState(details);
  return (
    <div className="pd_b_i_main">
      <div className="pd_b_i_images">
        <img src={Cover} alt="" className="pd_b_i_cover" />
        <div className="pd_b_i_profile">
          <div className="pd_b_i_profile_container">
            <img src={Pilot} alt="" className="pd_b_i_pilot" />
            <div>
              <img src={Edit} alt="" className="pd_b_i_edit" />
            </div>
          </div>
        </div>
        <div>
          <img src={Edit} alt="" className="pd_b_i_edit1" />
        </div>
      </div>
      <div className="pd_b_i_profile_titleBox">
        <div className="pd_b_i_profile_title">Basic Information</div>
        <div className="pd_b_i_profile_edit">Edit</div>
      </div>
      <div>
        <div className="pd_b_i_profile_head">Full Name</div>
        <input type="text" className="pd_b_i_profile_input" value={data.name} />
      </div>
      <Row>
        <Col>
          <div>
            <div>
              <div style={{ marginBottom: "15px" }}>
                <div className="pd_b_i_profile_head1">Email ID</div>
                <div className="pd_b_i_profile_verify">Verify</div>
              </div>
            </div>
            <input
              type="text"
              className="pd_b_i_profile_input"
              value={data.email}
            />
          </div>
        </Col>
        <Col>
          <div>
            <div>
              <div style={{ marginBottom: "15px" }}>
                <div className="pd_b_i_profile_head1">Phone Number</div>
                <div className="pd_b_i_profile_verify">Verify</div>
              </div>
            </div>

            <input
              type="text"
              className="pd_b_i_profile_input"
              value={data.phNo}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <div className="pd_b_i_profile_head">DOB</div>
            <input
              type="text"
              className="pd_b_i_profile_input"
              value={data.dob}
            />
          </div>
        </Col>
        <Col>
          <div>
            <div className="pd_b_i_profile_head">Gender</div>
            <input
              type="text"
              className="pd_b_i_profile_input"
              value={data.gender}
            />
          </div>
        </Col>
      </Row>
      <div>
        <div className="pd_b_i_profile_head">Address</div>
        <input
          type="text"
          className="pd_b_i_profile_input"
          value={data.address}
        />
      </div>
      <Row>
        <Col xl={6}>
          <div>
            <div className="pd_b_i_profile_head">City</div>
            <input
              type="text"
              className="pd_b_i_profile_input"
              value={data.city}
            />
          </div>
        </Col>
        <Col xl={6}>
          <div>
            <div className="pd_b_i_profile_head">Country</div>
            <input
              type="text"
              className="pd_b_i_profile_input"
              value={data.Country}
            />
          </div>
        </Col>
        <Col xl={6}>
          <div>
            <div className="pd_b_i_profile_head">Postal Address</div>
            <input
              type="text"
              className="pd_b_i_profile_input"
              value={data.postal}
            />
          </div>
        </Col>
      </Row>
      <div>
        <div className="pd_b_i_profile_head">Bio</div>
        <textarea
          type="text"
          className="pd_b_i_profile_inputDesc"
          placeholder="Maximum 50 words..."
          value={data.Bio}
        ></textarea>
        <div className="pd_b_i_profile_text">
          Brief description for your profile. URLs are hyperlinked
        </div>
      </div>
      <div className="pd_b_i_notifications_save">
        <button className="pd_b_i_notifications_saveBtn">Save Changes</button>
      </div>
    </div>
  );
}

export default Pilot_BasicInfo;
