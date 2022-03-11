import React, { useState } from "react";
import Cover from "./company_dashboard/images/cover.jpg";
import "./company_dashboard/css/Company_BasicInfo.css";
import Pilot from "./company_dashboard/images/pilot.jpg";
import logo from "./company_dashboard/images/logo.jpg";
import logoCover from "./company_dashboard/images/logocompany.png";
import { Container, Row, Col } from "react-grid-system";
import Edit from "./company_dashboard/images/edit-1.svg";
import PhoneInput from "react-phone-number-input";
import All from "./All.module.css";

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
          document.getElementById(`${fields[i]}_error`).style.visibility =
            "visible";
          document.getElementById(fields[i]).focus();
          error = true;
        } else if (!validateEmail(data.email)) {
          document.getElementById(`${fields[i]}_error`).innerHTML =
            "Email number is not valid";
          document.getElementById(`${fields[i]}_error`).style.visibility =
            "visible";
          document.getElementById(fields[i]).focus();
          error = true;
        }
      }
      if (fields[i] === "phone") {
        if (data.phone === "") {
          document.getElementById(`${fields[i]}_error`).innerHTML =
            "Phone number is required";
          document.getElementById(`${fields[i]}_error`).style.visibility =
            "visible";
          document.getElementById(fields[i]).focus();
          error = true;
        } else if (data.phone.length <= 7) {
          document.getElementById(`${fields[i]}_error`).innerHTML =
            "Phone number is not valid";
          document.getElementById(`${fields[i]}_error`).style.visibility =
            "visible";
          document.getElementById(fields[i]).focus();
          error = true;
        }
      } else if (data[fields[i]] === "") {
        document.getElementById(`${fields[i]}_error`).style.visibility =
          "visible";
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
      <div className="pd_b_i_main">
        <div className="pd_b_i_images">
          <img src={logoCover} alt="" className="pd_b_i_cover" />
          <div className="pd_b_i_profile">
            <div className="pd_b_i_profile_container">
              <img src={logo} alt="" className="pd_b_i_pilot" />
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
          <div className="pd_b_i_profile_title">Create Company account</div>
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
          <div className="input_error_msg" id="company_name_error">
            Company name is required
          </div>
        </div>
        <Row>
          <Col lg = {6}>
            <div>
              <div>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="email" className="pd_b_i_profile_head1">
                    Email ID
                  </label>
                  <div className="pd_b_i_profile_verify">Verify</div>
                </div>
              </div>
              <input
                type="text"
                className="pd_b_i_profile_input"
                disabled={!edit}
                id="email"
                value={data.email}
                onChange={changeHandler}
              />
              <div className="input_error_msg" id="email_error">
                Email ID is required
              </div>
            </div>
          </Col>
          <Col lg = {6}>
            <div>
              <div>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="phone" className="pd_b_i_profile_head1">
                    Phone Number
                  </label>
                  <div className="pd_b_i_profile_verify">Verify</div>
                </div>
              </div>

              <PhoneInput
                defaultCountry="IN"
                className={All.Phonenumber + " s_c_d_phone_input"}
                name="phone"
                id="phone"
                value={data.phone}
                onChange={phoneChangeHandler}
                disabled={!edit}
              />
              <div className="input_error_msg" id="phone_error">
                Phone number is required
              </div>
            </div>
          </Col>
        </Row>

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
          <div className="input_error_msg" id="industry_error">
            Industry is required
          </div>
        </div>
        <div>
          <label htmlFor="address" className="pd_b_i_profile_head">
            Address
          </label>
          <input
            type="text"
            className="pd_b_i_profile_input"
            id="address"
            value={data.address}
            onChange={changeHandler}
            disabled={!edit}
          />
          <div className="input_error_msg" id="address_error">
            Address is required
          </div>
        </div>
        <Row>
          <Col xl={6}>
            <div>
              <label htmlFor="city" className="pd_b_i_profile_head">
                City
              </label>
              <input
                type="text"
                className="pd_b_i_profile_input"
                disabled={!edit}
                value={data.city}
                id="city"
                onChange={changeHandler}
              />
              <div className="input_error_msg" id="city_error">
                City is required
              </div>
            </div>
          </Col>
          <Col xl={6}>
            <div>
              <label htmlFor="country" className="pd_b_i_profile_head">
                Country
              </label>
              <input
                type="text"
                className="pd_b_i_profile_input"
                disabled={!edit}
                value={data.country}
                id="country"
                onChange={changeHandler}
              />
              <div className="input_error_msg" id="country_error">
                Country is required
              </div>
            </div>
          </Col>
          <Col xl={6}>
            <div>
              <label htmlFor="postal_address" className="pd_b_i_profile_head">
                Postal Address
              </label>
              <input
                type="text"
                className="pd_b_i_profile_input"
                disabled={!edit}
                id="postal_address"
                onChange={changeHandler}
              />
              <div className="input_error_msg" id="postal_address_error">
                Postal address is required
              </div>
            </div>
          </Col>
        </Row>
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
          <div className="input_error_msg" id="gstin_no_error">
            GSTIN No is required
          </div>
        </div>
        <div>
          <label htmlFor="experience" className="pd_b_i_profile_head">
            Experience of the company
          </label>
          <input
            type="text"
            className="pd_b_i_profile_input"
            value={data.experience}
            onChange={changeHandler}
            id="experience"
            disabled={!edit}
          />
          <div className="input_error_msg" id="experience_error">
            Experience is required
          </div>
        </div>
        <div>
          <label htmlFor="description" className="pd_b_i_profile_head">
            Description
          </label>
          <textarea
            type="text"
            className="cd_b_i_profile_inputDesc"
            value={data.description}
            onChange={changeHandler}
            id="description"
            disabled={!edit}
          ></textarea>
          <div className="input_error_msg" id="description_error">
            Description is required
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
    </Container>
  );
}

export default CreateCompany;
