import React, { useEffect, useState } from "react";
import Cover from "./pilot_dashboard/images/cover.jpg";
import "./pilot_dashboard/css/Pilot_BasicInfo.css";
import Pilot from "./pilot_dashboard/images/pilot.jpg";
import { Row, Col, Container, Hidden } from "react-grid-system";
import Edit from "./pilot_dashboard/images/edit-1.svg";
import PhoneInput from "react-phone-number-input";
import All from "./All.module.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import DronePerson from "../images/drone_person_new.png";
import "../css/Common.css";
import Dialog from "@material-ui/core/Dialog";
import Close from "../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Select from "react-select";

const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const customStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#999999" : null,
      color: "#333333",
    };
  },
};

function CreatePilot() {
  let history = useHistory();
  useEffect(()=>{
    if(!localStorage.getItem("role")){
      history.push("/login")
    }
    
    else if(localStorage.getItem("email") !== "true"){
      history.push("/verify-email")
    }
    
    else if(localStorage.getItem("role") !== "undefined"){
      history.push("/NoComponent")

    }
  })
  let [data, setData] = useState({
    full_name: "",
    email: "",
    phone: "+91",
    dob: "",
    gender: "Male",
    address: "",
    city: "",
    country: "",
    postal: "",
    bio: "",
    pilot_type: "licensed",
    drone_id: "",
    drone_type: "",
    work_type: "full_time",
    hourly_pay: "",
    monthly_pay: "",
    industry: "",
    attachment_selected: false,
    attachment: "",
    training_center_name: "",
    completed_year: "",
    skills: [],
    drones: [],
    years: null,
    months: null,
  });
  let [edit, setEdit] = useState(true);
  let [accountCreateSuccess, setAccountCreateSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);
  let [industries, setIndustries] = useState([])
  let [suggestedSkills, setSuggestedSkills] = useState([])
  let [showSuggestedSkills, setShowSuggestedSkills] = useState("less")

  const changeHandler = (e) => {
    if (e.target.id === "bio") {
      document.getElementById(`${e.target.id}_error`).style.visibility =
        "hidden";
      document.getElementById(`${e.target.id}_error`).style.display = "none";
    } else {
      document.getElementById(`${e.target.id}_error`).style.visibility =
        "hidden";
    }
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const selectSkill = (id) => {
    var skill_list = data.skills;
    var suggestedSkillsList = suggestedSkills
    skill_list.push(suggestedSkills[id]);
    suggestedSkillsList.splice(id, 1);
    setData({
      ...data,
      skills: skill_list,
    });
    setSuggestedSkills(suggestedSkillsList)
    document.getElementById("skills_error").style.visibility = "hidden";
  }

  const removeSelectedSkill = (id) => {
    var skill_list = data.skills;
    var suggestedSkillsList = suggestedSkills
    suggestedSkillsList.push(skill_list[id]);
    skill_list.splice(id, 1);
    setData({
      ...data,
      skills: skill_list,
    });
    setSuggestedSkills(suggestedSkillsList)
  }

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
  };

  const saveChanges = () => {
    var fields = [
      "dob",
      "gender",
      "city",
      "drone_id",
      "attachment",
      "monthly_pay",
      "hourly_pay",
      "industry",
      "training_center_name",
      "completed_year",
      "skills",
    ];
    var error = false;
    var focusField = ""
    for (var i = 0; i < fields.length; i++) {
      if (
        data[fields[i]] === "" &&
        fields[i] !== "drone_id" &&
        fields[i] !== "attachment" &&
        fields[i] !== "monthly_pay" &&
        fields[i] !== "hourly_pay" &&
        fields[i] !== "training_center_name" &&
        fields[i] !== "completed_year"
      ) {
        document.getElementById(`${fields[i]}_error`).style.visibility = "visible";
        error = true;
        if (focusField === ""){
          focusField = fields[i]
        }
      }

      if (
        data.pilot_type === "licensed" &&
        fields[i] === "attachment" &&
        data.attachment === ""
      ) {
        document.getElementById("attachment_error").style.visibility = "visible";
        error = true;
        if (focusField === ""){
          focusField = "attachment"
        }
      }

      if (
        data.pilot_type === "unlicensed" &&
        fields[i] === "drone_id" &&
        data.drone_id === ""
      ) {
        document.getElementById("drone_id_error").style.visibility = "visible";
        error = true;
        if (focusField === ""){
          focusField = "drone_id"
        }
      }

      if (
        data.work_type === "full_time" &&
        fields[i] === "monthly_pay" &&
        data.monthly_pay === ""
      ) {
        document.getElementById("monthly_pay_error").style.visibility = "visible";
        error = true;
        if (focusField === ""){
          focusField = "monthly_pay"
        }
      }

      if (
        data.work_type === "part_time" &&
        fields[i] === "hourly_pay" &&
        data.hourly_pay === ""
      ) {
        document.getElementById("hourly_pay_error").style.visibility = "visible";
        error = true;
        if (focusField === ""){
          focusField = "hourly_pay"
        }
      }

      if (
        data.pilot_type === "licensed" &&
        fields[i] === "training_center_name" &&
        data.training_center_name === ""
      ) {
        document.getElementById("training_center_name_error").style.visibility = "visible";
        error = true;
        if (focusField === ""){
          focusField = "training_center_name"
        }
      }

      if (
        data.pilot_type === "licensed" &&
        fields[i] === "completed_year" &&
        data.completed_year === ""
      ) {
        document.getElementById("completed_year_error").style.visibility = "visible";
        error = true;
        if (focusField === ""){
          focusField = "completed_year"
        }
      }

      if (fields[i] === "skills" && data.skills.length === 0) {
        document.getElementById("skills_error").style.visibility = "visible";
        error = true;
        if (focusField === ""){
          focusField = "skills"
        }
      }
      
    }
    if(error){
      if (focusField==="attachment"){
        document.getElementById("pilot_type").scrollIntoView()
      }else{
        document.getElementById(focusField).focus()
      }

      focusField = ""
    }
    else{
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      Axios.post(
        `${domain}/api/pilot/registerPilot`,
        {
          dob: data.dob,
          gender: data.gender,
          city: data.city,
          pilotType: data.pilot_type,
          certificates: data.attachment,
          droneId: data.drone_id,
          droneType: data.drone_type,
          workType: data.work_type,
          hourlyPayment: data.hourly_pay,
          monthlyPayment: data.monthly_pay,
          industry: data.industry,
          drones: data.drones,
          skills: data.skills,
          trainingCenter: data.training_center_name,
          completedYear: data.completed_year
        },
        config
      )
        .then((res) => {
          console.log(res.data)
          setAccountCreateSuccess(true);
          localStorage.setItem("role", "pilot");

        })
        .catch((err) => {
          try{
            if(err.response.status !== 500){
              setServerError(true)
            }
            else{
            }
          }catch{
            setServerError(true)
          }
        });
    }
  };

  useEffect(()=>{
    Axios.get(`${domain}/api/skill/getSkills`)
    .then((res) => {
      if(res.data){
        const skills = res.data.map((skill)=>(
          skill.skill
        ))
        setSuggestedSkills(skills)
      }
      
    })
    Axios.get(`${domain}/api/industry/getIndustries`).then((res) => {
      const options = res.data.map((d) => ({
        value: d.industry,
        label: d.industry,
      }));
      setIndustries(options);
    });
  }, [])

  const showMoreSuggestions = () => {
    setShowSuggestedSkills("all")
  }

  const showLessSuggestions = () => {
    setShowSuggestedSkills("less")
  }

  const closeSuccessPopup = () => {
    setAccountCreateSuccess(false);
    history.push("/pilot_dashboard/account");
  };
  const addSkill = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      var skill_list = data.skills;
      skill_list.push(e.target.value);
      setData({
        ...data,
        skills: skill_list,
      });
      document.getElementById(e.target.id).value = "";
    }
    document.getElementById("skills_error").style.visibility = "hidden";
  };
  const addDrones = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      var skill_list = data.drones;
      skill_list.push(e.target.value);
      setData({
        ...data,
        drones: skill_list,
      });
      document.getElementById(e.target.id).value = "";
    }
    document.getElementById("skills_error").style.visibility = "hidden";
  };

  const industryChange = (value) => {
    setData({
      ...data,
      industry: value.value,
    });
    document.getElementById(`industry_error`).style.visibility = "hidden";
  }

  const editHandler = () => {
    setEdit(true);
    setTimeout(() => {
      document.getElementById(`full_name`).focus();
    }, 10);
  };
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    document.getElementById(`${e.target.id}_error`).style.visibility = "hidden";
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
    document.getElementById("attachment_error").style.visibility = "hidden";
  };
  const clickEdit = () => {
    setEdit(true);
    setTimeout(() => document.getElementById("name").focus(), 10);
  };
  const changePilotType = (e) => {
    setData({
      ...data,
      pilot_type: e.target.name,
    });
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
          {" "}
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

            <Row>
              <Col>
                <div>
                  {/* <input
              type="text"
              className="pd_b_i_profile_input"
              value={data.email}
              id = "email"
              onChange = {changeHandler}
              disabled = {!edit}
            /> */}
                </div>
              </Col>
              <Col>
                <div>
                  <div></div>
                  {/* <PhoneInput defaultCountry="IN" className={All.Phonenumber + " s_c_d_phone_input"} name="phone" id="phone" value={data.phone} onChange = {phoneChangeHandler} disabled = {!edit}/> */}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <div className="pd_b_i_profile_head">DOB</div>
                  <input
                    type="date"
                    max={`2012-12-31`}
                    className="pd_b_i_profile_input"
                    value={data.dob}
                    id="dob"
                    onChange={changeHandler}
                    disabled={!edit}
                  />
                  <div className="input_error_msg" id="dob_error">
                    DOB is required 
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <div className="pd_b_i_profile_head">Gender</div>
                  <select
                    name="gender"
                    className="pd_b_i_profile_input"
                    // value={data.gender}
                    onChange={changeHandler}
                    id="gender"
                    disabled={!edit}
                    style = {{width: "100%"}}
                  >
                  <option selected disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                  <div className="input_error_msg" id="gender_error">
                    Gender is required
                  </div>
                </div>
              </Col>
            </Row>

            <div>
              <div className="pd_b_i_profile_head">City</div>
              <input
                type="text"
                className="pd_b_i_profile_input"
                value={data.city}
                id="city"
                onChange={changeHandler}
                disabled={!edit}
              />
              <div className="input_error_msg" id="city_error">
                City is required
              </div>
            </div>

            <div>
              <label htmlFor="skills" className="pd_b_i_profile_head">
                Do you own a Drone? (if Yes, Specify the drone models)
              </label>
              <input
                type="text"
                className="pd_b_i_profile_input"
                id="drones"
                onKeyUp={addDrones}
                disabled={!edit}
                placeholder="Type and click Enter to add"
              />
              {data.drones.map((drone, index) => {
                return (
                  <div className="pd_i_skill" key={index}>
                    {drone}
                  </div>
                );
              })}
              <div style={{ marginBottom: "10px" }}></div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <div className="pd_b_i_profile_head" id = "pilot_type">Pilot type</div>
              <div>
                <input
                  type="radio"
                  name="licensed"
                  checked={data.pilot_type === "licensed"}
                  id="licensed"
                  onClick={changePilotType}
                  disabled={!edit}
                />{" "}
                <label
                  htmlFor="licensed"
                  className="pd_p_i_profile_text"
                  style={{ cursor: "pointer" }}
                >
                  Licensed Pilots
                </label>
                <input
                  type="radio"
                  name="unlicensed"
                  id="unlicensed"
                  checked={data.pilot_type === "unlicensed"}
                  onClick={changePilotType}
                  disabled={!edit}
                />{" "}
                <label
                  htmlFor="unlicensed"
                  className="pd_p_i_profile_text"
                  style={{ cursor: "pointer" }}
                >
                  Unlicensed Pilots
                </label>
              </div>
            </div>
            <div>
              {data.pilot_type === "licensed" ? (
                <React.Fragment>
                  <div className="pd_b_i_profile_head" id = "attachment">Certificate </div>
                  <label
                    for="pd_p_i_hidden"
                    className="pd_p_i_attachnment_label"
                  >
                    <div>
                      <div className="pd_b_i_attachment">Attachments</div>
                      <span className="pd_p_i_profile_text">
                        {data.attachment_selected
                          ? data.attachment.name
                          : "Attach your DGCA certificate"}
                      </span>
                    </div>
                    <div className="input_error_msg" id="attachment_error">
                      Certificate is required
                    </div>
                    <input
                      type="file"
                      id="pd_p_i_hidden"
                      onChange={chooseFile}
                      disabled={!edit}
                    />
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
                    disabled={!edit}
                  />
                  <div className="input_error_msg" id="drone_id_error">
                    Drone ID is required
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
                    disabled={!edit}
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
                    disabled={!edit}
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
                    disabled={!edit}
                  />
                  <div className="input_error_msg" id="hourly_pay_error">
                    Hourly payment is required
                  </div>
                </div>
              )}
              {data.work_type === "full_time" && (
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
                    disabled={!edit}
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
                {/* <input
                  type="text"
                  className="pd_b_i_profile_input"
                  id="industry"
                  onChange={handleChange}
                  value={data.industry}
                  disabled={!edit}
                /> */}
                <Select
                  options={industries}
                  onChange={industryChange}
                  styles={customStyles}
                  className="u_f_category_dropdown"
                />
                <div className="input_error_msg" id="industry_error">
                  Industry is required
                </div>
              </div>
              <div>
                <label htmlFor="years" className="pd_b_i_profile_head">
                  Experience
                </label>
                <Row>
                  <Col>
                    <div>
                      <input
                        type="number"
                        className="pd_b_i_profile_input"
                        value={data.years}
                        id="years"
                        onChange={changeHandler}
                        placeholder="Years"
                        disabled={!edit}
                      />
                      <div className="input_error_msg" id="years_error">
                        Year of experience is required
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <input
                        type="number"
                        name="months"
                        className="pd_b_i_profile_input"
                        value={data.months}
                        onChange={changeHandler}
                        id="months"
                        disabled={!edit}
                        placeholder="Months"
                      />
                      <div className="input_error_msg" id="months_error">
                        Months of experience is required
                      </div>
                    </div>
                  </Col>
                </Row>
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
                      name = "training_center_name"
                      onChange={handleChange}
                      disabled={!edit}
                    />
                    <div
                      className="input_error_msg"
                      id="training_center_name_error"
                    >
                      Training center name is required
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="completed_year"
                      className="pd_b_i_profile_head"
                    >
                      Completed Year
                    </label>
                    <input
                      type="number"
                      className="pd_b_i_profile_input"
                      id="completed_year"
                      name = "completed_year"
                      onChange={handleChange}
                      value={data.completed_year}
                      disabled={!edit}
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
                  disabled={!edit}
                  placeholder="Type and click Enter to add"
                />
                {data.skills.map((skill, index) => {
                  return (
                    <div className="pd_i_skill" key={index} onClick = {()=>removeSelectedSkill(index)}>
                      {skill} <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                  );
                })}
                <div className="input_error_msg" id="skills_error">
                  Add atleast one skill
                </div>
              </div>
              {suggestedSkills.length !== 0 &&
                <div>
                  <label htmlFor="skills" className="pd_b_i_profile_head">
                    Suggested Skills
                  </label>
                  {suggestedSkills.map((skill, index) => {
                    return (
                      <>
                        {(showSuggestedSkills === "all" || index < 5) &&
                          <div className="pd_i_skill" key={index} onClick = {() => selectSkill(index)}>
                            {skill} <i class="fas fa-plus"></i>
                          </div>
                        }
                      </>
                    );
                  })}
                  {showSuggestedSkills === "all" && suggestedSkills.length > 5 &&
                    <div className="pd_i_skill" onClick = {showLessSuggestions} style = {{fontFamily: "muli-bold"}}>
                      Show less
                    </div>
                  }
                  {showSuggestedSkills === "less" && suggestedSkills.length > 5 &&
                    <div className="pd_i_skill" onClick = {showMoreSuggestions} style = {{fontFamily: "muli-bold"}}>
                      Show more
                    </div>
                  }
                  <div className="input_error_msg">
                    &nbsp;
                  </div>
                </div>
              }
              <div className="pd_b_i_notifications_save">
                <button className="common_backBtn" onClick={saveChanges}>
                  Back
                </button>
                <button
                  className="pd_b_i_notifications_saveBtn"
                  onClick={saveChanges}
                >
                  Complete Profile
                </button>
              </div>
            </div>
          </div>
          <Dialog
            open={accountCreateSuccess}
            onClose={() => closeSuccessPopup(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"md"}
            fullWidth={true}
            PaperProps={{ style: { width: "820px", borderRadius: "10px" } }}
          >
            <DialogContent
              className={All.PopupBody}
              style={{ marginBottom: "50px" }}
            >
              <div style={{ position: "absolute", top: "20px", right: "20px" }}>
                <img
                  src={Close}
                  alt=""
                  onClick={() => closeSuccessPopup(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Row style={{ marginTop: "30px" }}>
                <div className="u_f_popup_title">
                  Account created successfully
                </div>
                <div className="u_f_popup_btn_container">
                  <button
                    className="u_f_popup_btn2"
                    onClick={() => closeSuccessPopup(false)}
                  >
                    Close
                  </button>
                </div>
              </Row>
            </DialogContent>
          </Dialog>
          <Dialog
            open={serverError}
            onClose={() => setServerError(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"md"}
            fullWidth={true}
            PaperProps={{ style: { width: "820px", borderRadius: "10px" } }}
          >
            <DialogContent
              className={All.PopupBody}
              style={{ marginBottom: "50px" }}
            >
              <div style={{ position: "absolute", top: "20px", right: "20px" }}>
                <img
                  src={Close}
                  alt=""
                  onClick={() => setServerError(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Row style={{ marginTop: "30px" }}>
                <div className="u_f_popup_title">
                  Something went wrong on the server. Please try again later.
                </div>
                <div className="u_f_popup_btn_container">
                  <button
                    className="u_f_popup_btn2"
                    onClick={() => setServerError(false)}
                  >
                    Close
                  </button>
                </div>
              </Row>
            </DialogContent>
          </Dialog>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePilot;
