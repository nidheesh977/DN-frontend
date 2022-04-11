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


function CreateCompany() {
  var [data, setData] = useState({
    company_name: "",
    email: "",
    phone: "+91",
    industry: "",
    address: "",
    city: "",
    country: "",
    postal_address: "",
    gstin_no: "",
    experience: "",
    description: "",
  });
  var [edit, setEdit] = useState(true);

  const clickEdit = () => {
    setEdit(true);
    setTimeout(() => {
      document.getElementById(`company_name`).focus();
    }, 10);
  };

  const phoneChangeHandler = (e) => {
    document.getElementById(`phone_error`).style.visibility = "hidden";
    try {
      if (e.length >= 1) {
        setData({
          ...data,
          phone: e,
        });
      } else {
        setData({
          ...data,
          phone: "",
        });
      }
    } catch {
      setData({
        ...data,
        phone: "",
      });
    }
    console.log(data);
  };

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    document.getElementById(`${e.target.id}_error`).style.visibility = "hidden";
  };

  const saveChanges = () => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    var fields = [
      "company_name",
      "email",
      "phone",
      "industry",
      "address",
      "city",
      "country",
      "postal_address",
      "gstin_no",
      "experience",
      "description",
    ];
    var error = false;
    for (var i = 0; i < fields.length; i++) {
      if (fields[i] === "email") {
        if (data.email === "") {
          document.getElementById(`${fields[i]}_error`).innerHTML =
            "Email number is required";
          document.getElementById(`${fields[i]}_error`).style.display =
            "contents";
          document.getElementById(fields[i]).focus();
          error = true;
        } else if (!validateEmail(data.email)) {
          document.getElementById(`${fields[i]}_error`).innerHTML =
            "Email number is not valid";
          document.getElementById(`${fields[i]}_error`).style.display =
          "contents";
          document.getElementById(fields[i]).focus();
          error = true;
        }
      }
      if (fields[i] === "phone") {
        if (data.phone === "") {
          document.getElementById(`${fields[i]}_error`).innerHTML =
            "Phone number is required";
          document.getElementById(`${fields[i]}_error`).style.display =
          "contents";
          document.getElementById(fields[i]).focus();
          error = true;
        } else if (data.phone.length <= 7) {
          document.getElementById(`${fields[i]}_error`).innerHTML =
            "Phone number is not valid";
          document.getElementById(`${fields[i]}_error`).style.display =
          "contents";
          document.getElementById(fields[i]).focus();
          error = true;
        }
      } else if (data[fields[i]] === "") {
        document.getElementById(`${fields[i]}_error`).style.display =
        "contents";
        document.getElementById(fields[i]).focus();
        error = true;
      }
    }
    if (!error) {
      alert("Ready to submit");
    }
  };

  return (
    <Container className={All.Container}>
 <Row>
            <Col lg={6} className={All.DronePerson} >
              <Hidden xs sm md>
                <div className="backgroundImginPage"></div>
              </Hidden>
            </Col>
            <Col lg={6}>    
      <div className="pd_b_i_main">
        
        <div className="pd_b_i_profile_titleBox">
        <div className="pd_b_i_profile_title" style={{fontSize: "20px"}}>Welcome almost done, Please fill below fields to complete your profile setup</div>
        </div>
       
        <div>
          <label htmlFor="company_name" className="pd_b_i_profile_head">
            Company Name
          </label>
          <input
            type="text"
            className="pd_b_i_profile_input"
            id="company_name"
            disabled={!edit}
            value={data.company_name}
            onChange={changeHandler}
          />
          <div className="login_input_error_msg" id="company_name_error">
            Company name is required
          </div>
        </div>
        <Row>
          <Col>
            <div>
              <div className="pd_b_i_profile_head">Official Contact Number</div>
              <input
                type="number"
                className="pd_b_i_profile_input"
                value={data.dob}
                id="dob"
                onChange={changeHandler}
                disabled={!edit}
              />
              <div className="login_input_error_msg" id="dob_error">
                Contact Number is required
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <div className="pd_b_i_profile_head">Official Email</div>
              <input
                type="text"
                name="gender"
                className="pd_b_i_profile_input"
                value={data.gender}
                onChange={changeHandler}
                id="gender"
                disabled={!edit}
              />
              <div className="login_input_error_msg" id="gender_error">
                Official Email is required
              </div>
            </div>
          </Col>
        </Row>
                               
        <div>
              <div className="pd_b_i_profile_head">Contact Persons Name</div>
              <input
                type="text"
                name="gender"
                className="pd_b_i_profile_input"
                value={data.gender}
                onChange={changeHandler}
                id="gender"
                disabled={!edit}
              />
              <div className="login_input_error_msg" id="gender_error">
                Name is required
              </div>
            </div>
        <div>
          <label htmlFor="industry" className="pd_b_i_profile_head">
            Industry
          </label>
          <input
            type="text"
            className="pd_b_i_profile_input"
            disabled={!edit}
            id="industry"
            onChange={changeHandler}
          />
          <div className="login_input_error_msg" id="industry_error">
            Industry is required
          </div>
        </div>
        
 
 
        <div>
          <label htmlFor="gstin_no" className="pd_b_i_profile_head">
            GSTIN No
          </label>
          <input
            type="text"
            className="pd_b_i_profile_input"
            value={data.gstin_no}
            onChange={changeHandler}
            id="gstin_no"
            disabled={!edit}
          />
          <div className="login_input_error_msg" id="gstin_no_error">
            GSTIN No is required
          </div>
        </div>
        <div>
          <label htmlFor="experience" className="pd_b_i_profile_head">
            Started In?
          </label>
          <input
            type="text"
            className="pd_b_i_profile_input"
            value={data.experience}
            onChange={changeHandler}
            id="experience"
            placeholder="Ex: 2019"
            disabled={!edit}
          />
          <div className="login_input_error_msg" id="experience_error">
            Experience is required
          </div>
        </div>
       
        <div className="pd_b_i_notifications_save">
          <button
            className="pd_b_i_notifications_saveBtn"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
      </Col>
      </Row>
    </Container>
  );
}

export default CreateCompany;
