import React, { useState, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import Edit from "./images/edit-1.svg";
import Cover from "./images/cover.jpg";
import "./css/Pilot_BasicInfo.css";
import Pilot from "./images/pilot.jpg";
import axios from 'axios'
const domain = process.env.REACT_APP_MY_API


function Pilot_ProfessionalInfo() {
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  useEffect(() => {
    axios.post(`${domain}/api/user/pilotDetails`,config).then(
      (response) => {
        console.log(response.data)
        let data = response.data;
        setData({
          name: data.name,
         skills: data.skills,
         pilot_type: data.pilotType,
         drone_id: data.droneId,
         work_type: data.workType,
         hourly_pay: data.hourlyPayment,
         monthly_pay: data.monthlyPayment,
         industry: data.industry,
         training_center_name: data.trainingCenter,
         completed_year: data.completedYear,
         attachment_selected: false,
          attachment: data.attachment

        })
  
      }
    );
  }, []);
  let [data, setData] = useState({
    name: "",
    pilot_type: "",
    drone_id: "",
    drone_type: "",
    work_type: "",
    hourly_pay: "",
    monthly_pay: "",
    industry: "",
    attachment_selected: null,
    attachment: "",
    training_center_name: "",
    completed_year: "",
    skills: [],
  });

  let [edit, setEdit] = useState(false)

  const clickEdit = () => {
    setEdit(true)
    setTimeout(()=>
      document.getElementById("name").focus()
    , 10)
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    document.getElementById(`${e.target.id}_error`).style.visibility = "hidden"
  };

  const changePilotType = (e) => {
    setData({
      ...data,
      pilot_type: e.target.name,
    });
  };

  const changeWorkType = (e) => {
    setData({
      ...data,
      work_type: e.target.name,
    });
  };

  const chooseFile = (e) => {
    try {
      if (e.target.files[0]) {
        setData({
          ...data,
          attachment: e.target.files[0],
          attachment_selected: true,
        });
      }
    } catch {}
    document.getElementById("certificate_error").style.visibility = "hidden"
  };

  const addSkill = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      var skill_list = data.skills;
      skill_list.push(e.target.value);
      setData({
        ...data,
        skills: skill_list,
      });
      console.log(data.skills);
      document.getElementById(e.target.id).value = "";
    }
    document.getElementById("skills_error").style.visibility = "hidden"
  };

  const showError = (field) => {
    document.getElementById(`${field}_error`).style.visibility = "visible"
    document.getElementById(field).focus()
  }

  const saveChanges = () => {
    if (data.name === ""){
      showError("name")
    }
    else if (data.pilot_type === "licensed" && data.attachment === ""){
      document.getElementById(`certificate_error`).style.visibility = "visible"
      document.getElementById(data.pilot_type).focus()
    }
    else if (data.pilot_type === "unlicensed" && data.drone_id === ""){
      showError("drone_id")
    }
    else if (data.pilot_type === "unlicensed" && data.drone_type === ""){
      showError("drone_type")
    }
    else if (data.work_type === "full_time" && data.monthly_pay === ""){
      showError("monthly_pay")
    }
    else if (data.work_type === "part_time" && data.hourly_pay === ""){
      showError("hourly_pay")
    }
    else if (data.industry === ""){
      showError("industry")
    }
    else if (data.pilot_type === "licensed" && data.training_center_name === ""){
      showError("training_center_name")
    }
    else if (data.pilot_type === "licensed" && data.completed_year === ""){
      showError("completed_year")
    }
    else if (data.skills.length === 0){
      showError("skills")
    }
    else{
      alert("Ready to submit")
    }
  };

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
        <div className="pd_b_i_profile_title">Professional Information</div>
        <div className="pd_b_i_profile_edit" onClick = {clickEdit}>Edit</div>
      </div>
      <div>
        <label htmlFor="name" className="pd_b_i_profile_head">
          Name
        </label>
        <input
          type="text"
          className="pd_b_i_profile_input"
          value={data.name}
          id="name"
          onChange={handleChange}
          disabled = {!edit}
        />
        <div className="input_error_msg" id="name_error">
          Name is required
        </div>
      </div>
      <div style={{ marginBottom: "30px" }}>
        <div className="pd_b_i_profile_head">Pilot type</div>
        <div>
          <input
            type="radio"
            name="licensed"
            checked={data.pilot_type === "licensed"}
            id="licensed"
            onClick={changePilotType}
            disabled = {!edit}
          />{" "}
          <label htmlFor="licensed" className="pd_p_i_profile_text">
            Licensed Pilots
          </label>
          <input
            type="radio"
            name="unlicensed"
            id="unlicensed"
            checked={data.pilot_type === "unlicensed"}
            onClick={changePilotType}
            disabled = {!edit}
          />{" "}
          <label htmlFor="unlicensed" className="pd_p_i_profile_text">
            Unlicensed Pilots
          </label>
        </div>
      </div>
      <div>
        {data.pilot_type === "licensed" ? (
          <React.Fragment>
            <div className="pd_b_i_profile_head">Certificates </div>
            <label for="pd_p_i_hidden" className="pd_p_i_attachnment_label">
              <div>
                <div className="pd_b_i_attachment">Attachments</div>
                <span className="pd_p_i_profile_text">
                  {data.attachment_selected
                    ? data.attachment.name
                    : "Attach your DGCA certificate"}
                </span>
              </div>
              <div className="input_error_msg" id="certificate_error">
                Certificate is required
              </div>
              <input type="file" id="pd_p_i_hidden" onChange={chooseFile} disabled = {!edit}/>
            </label>
          </React.Fragment>
        ) : (
          <div>
            <label className="pd_b_i_profile_head" htmlFor="drone_id">
              Drone ID
            </label>
            <input
              type="text"
              value={data.drone_id}
              className="pd_b_i_profile_input"
              placeholder="Enter your drone ID"
              id="drone_id"
              onChange={handleChange}
              disabled = {!edit}
            />
            <div className="input_error_msg" id="drone_id_error">
              Drone ID is required
            </div>
            <label htmlFor="drone_type" className="pd_b_i_profile_head">
              Drone Type
            </label>
            <input
              type="text"
              value={data.drone_type}
              className="pd_b_i_profile_input"
              name="drone_type"
              id="drone_type"
              onChange={handleChange}
              disabled = {!edit}
            />
            <div className="input_error_msg" id="drone_type_error">
              Drone type is required
            </div>
          </div>
        )}

        <div>
          {/* <label htmlFor="drone_type" className="pd_b_i_profile_head">
            Drone Type
          </label>
          <input
            type="text"
            value={data.drone_type}
            className="pd_b_i_profile_input"
            name="drone_type"
            id="drone_type"
            onChange={handleChange}
          />
          <div className="input_error_msg" id="drone_type_error">
            Drone type is required
          </div> */}
        </div>
        <div style={{ marginBottom: "30px" }}>
          <div className="pd_b_i_profile_head">Work Type</div>
          <div>
            <input
              type="radio"
              name="full_time"
              checked={data.work_type === "full_time"}
              id="full_time"
              onClick={changeWorkType}
              disabled = {!edit}
            />{" "}
            <label htmlFor="full_time" className="pd_p_i_profile_text">
              Full time
            </label>
            <input
              type="radio"
              name="part_time"
              checked={data.work_type === "part_time"}
              id="part_time"
              onClick={changeWorkType}
              disabled = {!edit}
            />{" "}
            <label htmlFor="part_time" className="pd_p_i_profile_text">
              Part time
            </label>
          </div>
        </div>
        {data.work_type === "part_time" && (
          <div>
            <label htmlFor="hourly_pay" className="pd_b_i_profile_head">
              Hourly Payment ($)
            </label>
            <input
              type="number"
              className="pd_b_i_profile_input"
              value={data.hourly_pay}
              id="hourly_pay"
              onChange={handleChange}
              disabled = {!edit}
            />
            <div className="input_error_msg" id="hourly_pay_error">
              Hourly payment is required
            </div>
          </div>
        ) }{data.work_type === "full_time" && (
          <div>
            <label htmlFor="monthly_pay" className="pd_b_i_profile_head">
              Monthly Payment ($)
            </label>
            <input
              type="number"
              value={data.monthly_pay}
              className="pd_b_i_profile_input"
              id="monthly_pay"
              onChange={handleChange}
              disabled = {!edit}
            />
            <div className="input_error_msg" id="monthly_pay_error">
              Monthly payment is required
            </div>
          </div>
        )}
        <div>
          <label htmlFor="industry" className="pd_b_i_profile_head">
            Industry
          </label>
          <input
            type="text"
            className="pd_b_i_profile_input"
            id="industry"
            onChange={handleChange}
            value={data.industry}
            disabled = {!edit}
          />
          <div className="input_error_msg" id="industry_error">
            Industry is required
          </div>
        </div>
        {data.pilot_type === "licensed" && (
          <React.Fragment>
            <div>
              <label
                htmlFor="training_center_name"
                className="pd_b_i_profile_head"
              >
                Training Center Name
              </label>
              <input
                type="text"
                value={data.training_center_name}
                className="pd_b_i_profile_input"
                id="training_center_name"
                onChange={handleChange}
                disabled = {!edit}
              />
              <div className="input_error_msg" id="training_center_name_error">
                Training center name is required
              </div>
            </div>
            <div>
              <label htmlFor="completed_year" className="pd_b_i_profile_head">
                Completed Year
              </label>
              <input
                type="number"
                className="pd_b_i_profile_input"
                id="completed_year"
                onChange={handleChange}
                value={data.completed_year}
                disabled = {!edit}
              />
              <div className="input_error_msg" id="completed_year_error">
                Completed year is required
              </div>
            </div>
          </React.Fragment>
        )}
        <div>
          <label htmlFor="skills" className="pd_b_i_profile_head">
            Add Your Skills
          </label>
          <input
            type="text"
            className="pd_b_i_profile_input"
            id="skills"
            onKeyUp={addSkill}
            disabled = {!edit}
          />
          {data.skills.map((skill, index) => {
            return (
              <div className="pd_i_skill" key={index}>
                {skill}
              </div>
            );
          })}
          <div className="input_error_msg" id="skills_error">
            Add atleast one skill
          </div>
        </div>
        <div
          className="pd_b_i_notifications_save"
          style={{ marginTop: "20px" }}
        >
          <button
            className="pd_b_i_notifications_saveBtn"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pilot_ProfessionalInfo;
