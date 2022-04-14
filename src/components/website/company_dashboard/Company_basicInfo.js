import React, { useState, useEffect } from "react";
import Cover from "./images/cover.jpg";
import "./css/Company_BasicInfo.css";
import Pilot from "./images/pilot.jpg";
import logo from "./images/logo.jpg";
import logoCover from "./images/logocompany.png";
import { Row, Col } from "react-grid-system";
import Edit from "./images/edit-1.svg";
import PhoneInput from "react-phone-number-input";
import All from "../../website/All.module.css";
import Select from "react-select";
import Axios from "axios";

const customStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#999999" : null,
      color: "#333333",
    };
  },
};

const domain = process.env.REACT_APP_MY_API;

function Company_BasicInfo() {
  var [data, setData] = useState({
    company_name: "",
    email: "",
    phone: "",
    company_type: "company",
    contact_no: "",
    official_email: "",
    name: "",
    contact_name: "",
    gstNo: "",
    industry: "",
    code: "+91",
  });
  var [edit, setEdit] = useState(false);
  var [industries, setIndustries] = useState(true);

  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  useEffect(() => {
    Axios.get(`${domain}/api/industry/getIndustries`).then((res) => {
      const options = res.data.map((d) => ({
        value: d.industry,
        label: d.industry,
      }));
      setIndustries(options);
    });

    Axios.get(`${domain}/api/company/companyData`, config)
      .then( res => {
        setData({
          ...data,
          company_name: res.data.userName,
          email: res.data.emailId,
          phone: res.data.phoneNo,
          company_type: res.data.company[0].companyType,
          name: res.data.company[0].companyName,
          contact_no: res.data.company[0].phoneNo,
          official_email: res.data.company[0].emailId,
          contact_name: res.data.company[0].contactPersonName,
          gstNo: res.data.company[0].gstNo?res.data.company[0].gstNo:"",
          industry: res.data.company[0].industry,
        })
      })
      .catch( err => {
        console.log(err)
      })
  }, []);

  const clickEdit = () => {
    setEdit(true);
    setTimeout(() => {
      document.getElementById(`company_name`).focus();
    }, 10);
  };

  const phoneChangeHandler = (e) => {
    if (
      Number(
        e.target.value.slice(data.code.length + 1, 10 + data.code.length + 1)
      ) ||
      e.target.value.slice(data.code.length + 1, 10 + data.code.length + 1) ===
        ""
    ) {
      setData({
        ...data,
        ["phone"]: e.target.value.slice(
          data.code.length + 1,
          10 + data.code.length + 1
        ),
      });
      document.getElementById(e.target.name + "_error").style.display = "none";
    }
  };

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    document.getElementById(`${e.target.id}_error`).style.display = "none";
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
      "company_type",
      "name",
      "contact_no",
      "official_email",
      "contact_name",
      "gstNo",
      "industry"
    ];
    var error = false;
    var focusField = "";
    for (var i = 0; i < fields.length; i++) {
      if (fields[i] !== "gstNo" && data[fields[i]] === "") {
        document.getElementById(`${fields[i]}_error`).style.display =
          "contents";
        error = true;
        if (focusField === "") {
          focusField = fields[i];
        }
      } else {
        if (fields[i] === "company_name" && (data.company_name.length < 2 || data.company_name.length > 100)) {
          document.getElementById(`${fields[i]}_error`).style.display = "contents"
          document.getElementById(`${fields[i]}_error`).innerText = "Name should be between 2 and 100 characters"
          error = true;
          if (focusField === "") {
            focusField = fields[i];
          }
        }
        if (fields[i] === "contact_name" && (data.contact_name.length < 2 || data.contact_name.length > 100)) {
          document.getElementById(`${fields[i]}_error`).style.display = "contents"
          document.getElementById(`${fields[i]}_error`).innerText = "Contact person name should be between 2 and 100 characters"
          error = true;
          if (focusField === "") {
            focusField = fields[i];
          }
        }
        if (fields[i] === "name" && (data.name.length < 2 || data.name.length > 100)){
          document.getElementById(`${fields[i]}_error`).style.display = "contents"
          document.getElementById(`${fields[i]}_error`).innerText = "Organization name should be between 2 and 100 characters"
          error = true;
          if (focusField === "") {
            focusField = fields[i];
          }
        }
        if (fields[i] === "email" && !validateEmail(data.email)){
          document.getElementById(`${fields[i]}_error`).style.display = "contents"
          document.getElementById(`${fields[i]}_error`).innerText = "Invalid email id"
          error = true;
          if (focusField === "") {
            focusField = fields[i];
          }
        }
        if(fields[i] === "phone" && data.phone.length !== 10){
          document.getElementById(`${fields[i]}_error`).style.display = "contents"
          document.getElementById(`${fields[i]}_error`).innerText = "Phone number must have 10 characters"
          error = true;
          if (focusField === "") {
            focusField = fields[i]
          }
        }
        if(fields[i] === "contact_no" && data.contact_no.length !== 10){
          document.getElementById(`${fields[i]}_error`).style.display = "contents"
          document.getElementById(`${fields[i]}_error`).innerText = "Official contact number must have 10 characters"
          error = true;
          if (focusField === "") {
            focusField = fields[i]
          }
        }

        if (fields[i] === "gstNo" && (data.gstNo.length > 15 )){
          document.getElementById(`${fields[i]}_error`).style.display = "contents"
          error = true;
          if (focusField === "") {
            focusField = fields[i]
          }
        }

      }
    }
    if (!error) {
      let formData = {
       userName : data.company_name,
       userEmail : data.email,
       userPhoneNo : data.phone,
       organizationType : data.company_type,
       companyName : data.name,
       officialPhoneNo : data.contact_no,
       officialEmail : data.official_email,
       contactPerson : data.contact_name,
       gstNo : data.gstNo,
       industry : data.industry,
      }
      Axios.post(`${domain}/api/company/editCompanyData`, {formData}, config)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      if (focusField !== "industry"){
        document.getElementById(focusField).focus();
      }
    }
  };

  const contactNoChangeHandler = (e) => {
    if (
      Number(
        e.target.value.slice(data.code.length + 1, 10 + data.code.length + 1)
      ) ||
      e.target.value.slice(data.code.length + 1, 10 + data.code.length + 1) ===
        ""
    ) {
      setData({
        ...data,
        ["contact_no"]: e.target.value.slice(
          data.code.length + 1,
          10 + data.code.length + 1
        ),
      });
      document.getElementById(e.target.name + "_error").style.display = "none";
    }
  };

  const industryChange = (value) => {
    setData({
      ...data,
      industry: value.value,
    });

    console.log(value.value);
    document.getElementById(`industry_error`).style.visibility = "hidden";
  };

  return (
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
        <div className="pd_b_i_profile_title">Basic Information</div>
        <div className="pd_b_i_profile_edit" onClick={clickEdit}>
          Edit
        </div>
      </div>
      <div>
        <label htmlFor="company_name" className="pd_b_i_profile_head">
          Name
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
          Name is required
        </div>
      </div>
      <Row>
        <Col>
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
            <div className="login_input_error_msg" id="email_error">
              Email ID is required
            </div>
          </div>
        </Col>
        <Col>
          <div>
            <div>
              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="phone" className="pd_b_i_profile_head1">
                  Phone Number
                </label>
                <div className="pd_b_i_profile_verify">Verify</div>
              </div>
            </div>

            <input
              type="text"
              name="phone"
              id="phone"
              className="pd_b_i_profile_input"
              value={`${data.code} ${data.phone}`}
              onChange={phoneChangeHandler}
              autoComplete={false}
              disabled={!edit}
            />
            <div className="login_input_error_msg" id="phone_error">
              Phone number is required
            </div>
          </div>
        </Col>
      </Row>
      <div className="pd_b_i_profile_title">Professional Information</div>

      <div style={{ marginTop: "30px" }}>
        <label className="pd_b_i_profile_head">Company Type</label>
        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <div
              className={
                data.company_type === "company"
                  ? "c_c_profile_radio c_c_profile_radio_active"
                  : "c_c_profile_radio"
              }
              id="c_c_company"
              onClick={
                edit ? () => setData({ ...data, company_type: "company" }) : ""
              }
            >
              Company
            </div>
          </Col>
          <Col>
            <div
              className={
                data.company_type === "consultant"
                  ? "c_c_profile_radio c_c_profile_radio_active"
                  : "c_c_profile_radio"
              }
              id="c_c_consultant"
              onClick={
                edit
                  ? () => setData({ ...data, company_type: "consultant" })
                  : ""
              }
            >
              Consultant
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <label
          htmlFor="name"
          className="pd_b_i_profile_head"
          style={{ cursor: "pointer" }}
        >
          Organization Name
        </label>
        <input
          type="text"
          name="name"
          className="pd_b_i_profile_input"
          id="name"
          value={data.name}
          onChange={changeHandler}
          disabled={!edit}
        />
        <div className="login_input_error_msg" id="name_error">
          Organization name is required
        </div>
      </div>
      <Row>
        <Col>
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
              disabled={!edit}
            />
            <div className="login_input_error_msg" id="contact_no_error">
              Official Contact Number is required
            </div>
          </div>
        </Col>
        <Col>
          <div>
            <label
              htmlFor="email"
              className="pd_b_i_profile_head"
              style={{ cursor: "pointer" }}
            >
              Official Email
            </label>
            <input
              type="officialemail"
              name="official_email"
              className="pd_b_i_profile_input"
              value={data.official_email}
              onChange={changeHandler}
              id="official_email"
              disabled={!edit}
            />
            <div className="login_input_error_msg" id="official_email_error">
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
          name="contact_name"
          className="pd_b_i_profile_input"
          value={data.contact_name}
          onChange={changeHandler}
          id="contact_name"
          disabled={!edit}
        />
        <div className="login_input_error_msg" id="contact_name_error">
          Contact persons name is required
        </div>
      </div>
      <div>
        <label
          htmlFor="gstNo"
          className="pd_b_i_profile_head"
          style={{ cursor: "pointer" }}
        >
          GSTNo
        </label>
        <input
          type="text"
          name="gstNo"
          className="pd_b_i_profile_input"
          value={data.gstNo}
          onChange={changeHandler}
          id="gstNo"
          disabled={!edit}
        />
        <div className="login_input_error_msg" id="gstNo_error">
          GSTNo should not exceed 15 characters
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
        <div
          style={{
            marginBottom: "30px",
            pointerEvents: edit ? "auto" : "none",
          }}
        >
          <Select
            options={industries}
            onChange={industryChange}
            styles={customStyles}
            className="u_f_category_dropdown"
            value={{label: data.industry,
            value: data.industry}}
          />
        </div>
        <div className="login_input_error_msg" id="industry_error">
          Industry is required
        </div>
      </div>

      <div className="pd_b_i_notifications_save">
        {edit && (
          <button
            className="pd_b_i_notifications_saveBtn"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default Company_BasicInfo;
