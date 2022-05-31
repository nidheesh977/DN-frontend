import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cover from "./company_dashboard/images/cover.jpg";
import "./company_dashboard/css/Company_BasicInfo.css";
import Pilot from "./company_dashboard/images/pilot.jpg";
import logo from "./company_dashboard/images/logo.jpg";
import logoCover from "./company_dashboard/images/logocompany.png";
import { Container, Row, Col, Hidden } from "react-grid-system";
import Edit from "./company_dashboard/images/edit-1.svg";
import All from "./All.module.css";
import "../css/Common.css";
import "../css/createCompany.css";
import Axios from "axios";
import Select from "react-select";

const domain = process.env.REACT_APP_MY_API;

const customStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#999999" : null,
      color: "#333333",
    };
  },
};

function CreateCompany() {

  let history = useHistory()

  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  var [data, setData] = useState({
    company_type: "company",
    organization_name: "",
    code: "+91",
    contact_no: "",
    email: "",
    name: "",
    industry: ""
  });
  var [industries, setIndustries] = useState(true);

  useEffect(()=>{
    Axios.get(`${domain}/api/industry/getIndustries`).then((res) => {
      const options = res.data.map((d) => ({
        value: d.industry,
        label: d.industry,
      }));
      setIndustries(options);
    });

    Axios.get(`${domain}/api/user/getUserData`, config).then((res) => {
      console.log(res.data)
      setData({
        ...data,
        contact_no: res.data.phoneNo,
        email: res.data.email,
        name: res.data.name
      })
    })
  }, [])

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    document.getElementById(`${e.target.id}_error`).style.display = "none";
  };

  const industryChange = (value) => {

    setData({
        ...data,
        industry: value.value,
      });

    console.log(value.value)
    document.getElementById(`industry_error`).style.visibility = "hidden";
  };

  const contactNoChangeHandler = (e)=>{
    if (
      Number(e.target.value.slice(data.code.length + 1, 10 + data.code.length + 1)) ||
      e.target.value.slice(data.code.length + 1, 10 + data.code.length + 1) === ""
    ) {
      setData({
        ...data,
        ["contact_no"]: e.target.value.slice(
          data.code.length + 1,
          10 + data.code.length + 1
        ),
      });
      document.getElementById(e.target.name + "_error").style.display =
        "none";
    }
  }

  const saveChanges = () => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    var fields = [
      "organization_name",
      "contact_no",
      "email",
      "name",
      "industry",
    ]

    var error = false
    var focusField = ""

    for (var i = 0; i<fields.length; i++){
      if (data[fields[i]] === ""){
        error = true
        document.getElementById(`${fields[i]}_error`).style.display = "contents"
        if (focusField === ""){
          focusField = fields[i]
        }
      }
      if (fields[i] === "organization_name" && (data.organization_name.length > 100 || data.organization_name.length < 2)){
        error = true
        document.getElementById("organization_name_error").innerText = "Organization name must be between 2 and 100 characters"
        document.getElementById("organization_name_error").style.display = "contents"
        if (focusField === ""){
          focusField = "organization_name"
        }
      }

      if (fields[i] === "contact_no" && data.contact_no.length !== 10 && data.contact_no.length !== 0){
        error = true
        document.getElementById("contact_no_error").innerText = "Contact number must have 10 numbers"
        document.getElementById("contact_no_error").style.display = "contents"
        if (focusField === ""){
          focusField = "contact_no"
        }
      }

      if (fields[i] === "email" && data.email !== "" && !validateEmail(data.email)){
        error = true
        document.getElementById("email_error").innerText = "Email ID is not valid"
        document.getElementById("email_error").style.display = "contents"
        if (focusField === ""){
          focusField = "email"
        }
      }

      if (fields[i] === "name" && data.name !== "" && (data.name.length > 100 || data.name.length < 2)){
        error = true
        document.getElementById("name_error").innerText = "Name must be between 2 and 100 characters"
        document.getElementById("name_error").style.display = "contents"
        if (focusField === ""){
          focusField = "name"
        }
      }
    }

    if(!error){

      var postData = {
        companyType: data.company_type,
        companyName: data.organization_name,
        emailId: data.email,
        phoneNo: data.contact_no,
        contactPersonName: data.name,
        industry: data.industry
      }

      Axios.post(`${domain}/api/company/registerCompany`, postData, config)
      .then((res) => {
        localStorage.setItem("role", "company")
        history.push("/HireSubscription")
      })
      .catch((err) => {
        console.log(err.response)
      })
    }
    else{
      if (focusField === "industry"){
        document.getElementById("name").scrollIntoView()
      }
      else{
        document.getElementById(focusField).focus()
        focusField = ""
      }
    }

  };

  return (
    <Container className={All.Container}>
      <Row>
        <Col lg={6} className={All.DronePerson}>
          <Hidden xs sm md>
            <div className="backgroundImginPage"></div>
          </Hidden>
        </Col>
        <Col lg={6}>
          <div className="pd_b_i_main">
            <div className="pd_b_i_profile_titleBox">
              <div
                className="pd_b_i_profile_title"
                style={{ fontSize: "20px" }}
              >
                Welcome almost done, Please fill below fields to complete your
                profile setup
              </div>
            </div>

            <div>
              <label className="pd_b_i_profile_head">Company Type</label>
              <Row style={{ marginBottom: "20px" }}>
                <Col sm = {6}>
                  <label
                    className={
                      data.company_type === "company"
                        ? "c_c_profile_radio c_c_profile_radio_active"
                        : "c_c_profile_radio"
                    }
                    style = {{display: "flex", alignItems: "center"}}
                    id="c_c_company"
                    onClick={() =>
                      setData({ ...data, company_type: "company" })
                    }
                  >
                    <input type="radio" checked = {data.company_type === "company"} className = "c_c_profile_radio_radio"/> Company
                  </label>
                </Col>
                <Col sm = {6}>
                  <label
                    className={
                      data.company_type === "consultant"
                        ? "c_c_profile_radio c_c_profile_radio_active"
                        : "c_c_profile_radio"
                    }
                    style = {{display: "flex", alignItems: "center"}}
                    id="c_c_consultant"
                    onClick={() =>
                      setData({ ...data, company_type: "consultant" })
                    }
                  >
                    <input type="radio" checked = {data.company_type === "consultant"} className = "c_c_profile_radio_radio"/> Consultant
                  </label>
                </Col>
              </Row>
            </div>

            <div>
              <label
                htmlFor="organization_name"
                className="pd_b_i_profile_head"
                style={{ cursor: "pointer" }}
              >
                Organization Name
              </label>
              <input
                type="text"
                name="organization_name"
                className="pd_b_i_profile_input"
                id="organization_name"
                value={data.organization_name}
                onChange={changeHandler}
              />
              <div className="login_input_error_msg" id="organization_name_error">
                Organization name is required
              </div>
            </div>
            <Row>
              <Col md = {6}>
                <div>
                  <label
                    htmlFor="contact_no"
                    className="pd_b_i_profile_head"
                    style={{ cursor: "pointer" }}
                  >
                    Official Contact Number
                  </label>
                  <input
                    type="text"
                    name="contact_no"
                    className="pd_b_i_profile_input"
                    id="contact_no"
                    value={`${data.code} ${data.contact_no}`}
                    onChange={contactNoChangeHandler}
                    autoComplete={false}
                  />
                  <div className="login_input_error_msg" id="contact_no_error">
                    Official Contact Number is required
                  </div>
                </div>
              </Col>
              <Col md = {6}>
                <div>
                  <label
                    htmlFor="email"
                    className="pd_b_i_profile_head"
                    style={{ cursor: "pointer" }}
                  >
                    Official Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="pd_b_i_profile_input"
                    value={data.email}
                    onChange={changeHandler}
                    id="email"
                  />
                  <div className="login_input_error_msg" id="email_error">
                    Official Email is required
                  </div>
                </div>
              </Col>
            </Row>

            <div>
              <label
                htmlFor="name"
                className="pd_b_i_profile_head"
                style={{ cursor: "pointer" }}
              >
                Contact Persons Name
              </label>
              <input
                type="text"
                name="name"
                className="pd_b_i_profile_input"
                value={data.name}
                onChange={changeHandler}
                id="name"
              />
              <div className="login_input_error_msg" id="name_error">
                Name is required
              </div>
            </div>
            <div>
              <label
                htmlFor="industry"
                className="pd_b_i_profile_head"
                style={{ cursor: "pointer" }}
              >
                Industry
              </label>
              <div style = {{marginBottom: "30px"}}>
                <Select
                  options={industries}
                  onChange={industryChange}
                  styles={customStyles}
                  className="u_f_category_dropdown"
                />
              </div>
              <div className="login_input_error_msg" id="industry_error">
                Industry is required
              </div>
            </div>

            <div className="pd_b_i_notifications_save">
              <button
                className="pd_b_i_notifications_saveBtn"
                onClick={saveChanges}
                style = {{marginTop: "20px"}}
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
