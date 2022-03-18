import React, { useState } from "react";
import Cover from "./company_dashboard/images/cover.jpg";
import "./company_dashboard/css/Company_BasicInfo.css";
import Pilot from "./company_dashboard/images/pilot.jpg";
import logo from "./company_dashboard/images/logo.jpg";
import logoCover from "./company_dashboard/images/logocompany.png";
import { Container, Row, Col, Hidden } from "react-grid-system";
import Edit from "./company_dashboard/images/edit-1.svg";
import PhoneInput from "react-phone-number-input";
import All from "./All.module.css";
import "../css/Common.css"
import DronePerson from "../images/drone_person_new.png";
import {useHistory} from "react-router-dom"


function VerifiedEmail() {
    const history = useHistory();

 

  return (
    <Container className={All.Container}>
 <Row>
            <Col lg={7} className={All.DronePerson} >
                <div >
                    <img src={DronePerson} />
                </div>
            </Col>
            <Col lg={5}>  
            <div style={{margin:"100px 0px"}}>
            <h2>Your Mail has been successfully Verified</h2>
<div>
    <p>Click below to complete your Profile or go to home Page</p>
<div className="u_f_popup_btn1" style={{display:"inline-block"}} onClick={()=>{history.push("/")}}>Home Page</div> 
<div className="u_f_popup_btn2"  style={{display:"inline-block"}} onClick={()=>{history.push("/choose-categories")}}>Complete Profile</div>
</div>  
</div>
      </Col>
      </Row>
    </Container>
  );
}

export default VerifiedEmail;
