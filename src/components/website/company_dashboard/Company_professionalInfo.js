import React, { useState } from "react";
import Cover from "./images/cover.jpg";
import "./css/Company_BasicInfo.css";
import Pilot from "./images/pilot.jpg";
import logo from "./images/logo.jpg";
import logoCover from "./images/logocompany.png";
import { Row, Col } from "react-grid-system";
import Edit from "./images/edit-1.svg";
import { saveCookies } from "superagent";

function Company_ProfessionalInfo() {
  var [data, setData] = useState({
    company_name: "",
    gstin_no: "",
    experience: "",
    description: "",
  });

  var [edit, setEdit] = useState(false)

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    document.getElementById(`${e.target.id}_error`).style.visibility = "hidden"
  };

  const clickEdit = () => {
    setEdit(true)
    setTimeout(() => {
      document.getElementById("company_name").focus()
    }, 10)
  }

  const saveChanges = () => {
    var fields = ["company_name","gstin_no","experience","description"]
    var error = false
    for(var i = 0; i<fields.length; i++){
      if(data[fields[i]] === ""){
          document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
          document.getElementById(fields[i]).focus()
          error = true
          break
      }
    }
    if(!error){
      alert("Ready to submit")
    }
  }

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
        <div className="pd_b_i_profile_title">Professional Information</div>
        <div className="pd_b_i_profile_edit" onClick = {clickEdit}>Edit</div>
      </div>
      <div>
        <label htmlFor="company_name" className="pd_b_i_profile_head">
          Company Name
        </label>
        <input
          type="text"
          className="pd_b_i_profile_input"
          value={data.company_name}
          onChange={changeHandler}
          id="company_name"
          disabled = {!edit}
        />
        <div className="input_error_msg" id = "company_name_error">Company name is required</div>
      </div>{" "}
      <div>
        <label htmlFor="gstin_no" className="pd_b_i_profile_head">GSTIN No</label>
        <input type="text" className="pd_b_i_profile_input" value={data.gstin_no} onChange = {changeHandler} id = "gstin_no" disabled = {!edit}/>
        <div className="input_error_msg" id = "gstin_no_error">GSTIN No is required</div>
      </div>
      <div>
        <label htmlFor="experience" className="pd_b_i_profile_head">Experience of the company</label>
        <input type="text" className="pd_b_i_profile_input" value={data.experience} onChange = {changeHandler} id = "experience" disabled = {!edit}/>
        <div className="input_error_msg" id = "experience_error">Experience is required</div>
      </div>
      <div>
        <label htmlFor="description" className="pd_b_i_profile_head">Description</label>
        <textarea type="text" className="cd_b_i_profile_inputDesc" value={data.description} onChange = {changeHandler} id = "description" disabled = {!edit}></textarea>
        <div className="input_error_msg" id = "description_error">Description is required</div>
      </div>
      <div className="pd_b_i_notifications_save">
        <button className="pd_b_i_notifications_saveBtn" onClick = {saveChanges}>Save Changes</button>
      </div>
    </div>
  );
}

export default Company_ProfessionalInfo;
