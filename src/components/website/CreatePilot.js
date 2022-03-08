import React, { useState } from "react";
import Cover from "./pilot_dashboard/images/cover.jpg";
import "./pilot_dashboard/css/Pilot_BasicInfo.css";
import Pilot from "./pilot_dashboard/images/pilot.jpg";
import { Row, Col, Container } from "react-grid-system";
import Edit from "./pilot_dashboard/images/edit-1.svg";
import PhoneInput from 'react-phone-number-input'
import All from './All.module.css';
import Axios from 'axios'
import {useHistory} from 'react-router-dom'

const domain = process.env.REACT_APP_MY_API

function CreatePilot() {

    let history = useHistory();
  let [data, setData] = useState({
    full_name: "",
    email: "",
    phone: "+91",
    dob: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    postal: "",
    bio: "",
    pilot_type: "licensed",
    drone_id: "",
    drone_type: " ",
    work_type: "full_time",
    hourly_pay: "",
    monthly_pay: "",
    industry: " ",
    attachment_selected: false,
    attachment: "",
    training_center_name: "",
    completed_year: "",
    skills: [],
  });
  let [edit, setEdit] = useState(true)

  const changeHandler = (e) => {
    
    if (e.target.id === "bio"){
      document.getElementById(`${e.target.id}_error`).style.visibility = "hidden"
      document.getElementById(`${e.target.id}_error`).style.display = "none"
    }
    else{
      document.getElementById(`${e.target.id}_error`).style.visibility = "hidden"
    }
    setData({
      ...data,
      [e.target.id]: e.target.value
    })
    console.log(data)
  }

  const phoneChangeHandler = (e) => {
    document.getElementById(`phone_error`).style.visibility = "hidden"
    try{
      if(e.length>=1){
        setData({
          ...data,
          phone: e
        })
      }
      else{
        setData({
          ...data,
          phone: ""
        })
      }
    }
    catch{
      setData({
        ...data,
        phone: ""
      })
    }
    console.log(data)
  }

  const saveChanges = () => {
    var fields = [ "dob", "gender", "address", "city", "country", "postal", "bio"]
    var error = false
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    for (var i = 0; i < fields.length; i++){
      if (fields[i] === "bio"){
        if (data.bio === ""){
          document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
          document.getElementById(`${fields[i]}_error`).style.display = "contents"
          document.getElementById(`${fields[i]}`).focus()
          error = true
          break
        }
      }
      else if (fields[i] === "email"){
        if (data.email === ""){
          document.getElementById(`email_error`).innerHTML = "Email ID is Required"
          document.getElementById(`email_error`).style.visibility = "visible"
          document.getElementById(`email`).focus()
          error = true
          break
        }
        else if (!validateEmail(data.email)){
          document.getElementById(`email_error`).innerHTML = "Email ID is not valid"
          document.getElementById(`email_error`).style.visibility = "visible"
          document.getElementById(`email`).focus()
          error = true
          break
        }
      }
      else if (fields[i] === "phone"){
        if (data.phone === ""){
          document.getElementById(`phone_error`).innerHTML = "Phone number is Required"
          document.getElementById(`phone_error`).style.visibility = "visible"
          document.getElementById(`phone`).focus()
          error = true
          break
        }
        else if (data.phone.length <= 7){
          document.getElementById(`phone_error`).innerHTML = "Phone number is not valid"
          document.getElementById(`phone_error`).style.visibility = "visible"
          document.getElementById(`phone`).focus()
          error = true
          break
        }
      }
      else if (data[fields[i]] === ""){
        document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
        // document.getElementById(`${fields[i]}`).focus()
        error = true
        break
      }
    }
    if(!error){
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      console.log(data)
      Axios.post(`${domain}/api/pilot/registerPilot`, {
        name: data.full_name,
emailId: data.email,
phoneNo : data.phone,
dob: data.dob,
gender: data.gender,
address: data.address,
city: data.city,
country: data.country,
postalAddress: data.postal,
bio : data.bio,
pilotType : data.pilot_type,
// certificates : data.attachment,
droneId : data.drone_id,
droneType : data.drone_type,
workType: data.work_type,
hourlyPayment: data.hourly_pay,
monthlyPayment: data.monthly_pay,
industry: data.industry,
trainingCenter: data.training_center_name,
completedYear : data.completed_year,
skills : data.skills,


      }, config)
        .then(() => {
alert("successfull")  
history.push('/')

})
        .catch((err) => {
console.log(err)        });
    }
  }
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

  const editHandler = () => {
    setEdit(true)
    setTimeout(() => {
      document.getElementById(`full_name`).focus()
    }, 10)
  }
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    document.getElementById(`${e.target.id}_error`).style.visibility = "hidden"
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
  const clickEdit = () => {
    setEdit(true)
    setTimeout(()=>
      document.getElementById("name").focus()
    , 10)
  }
  const changePilotType = (e) => {
    setData({
      ...data,
      pilot_type: e.target.name,
    });
  };
  return (
<Container> <div className="pd_b_i_main">
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
            <div>
             
            </div>
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
              className="pd_b_i_profile_input"
              value={data.dob}
              id = "dob"
              onChange = {changeHandler}
              disabled = {!edit}
            />
            <div className="input_error_msg" id = "dob_error">DOB is required</div>
          </div>
        </Col>
        <Col>
          <div>
            <div className="pd_b_i_profile_head">Gender</div>
            <input
              type="text"
              name = "gender"
              className="pd_b_i_profile_input"
              value={data.gender}
              onChange = {changeHandler}
              id = "gender"
              disabled = {!edit}
            />
            <div className="input_error_msg" id = "gender_error">Gender is required</div>
          </div>
        </Col>
      </Row>
      <div>
        <div className="pd_b_i_profile_head">Address</div>
        <input
          type="text"
          className="pd_b_i_profile_input"
          value={data.address}
          id = "address"
          onChange = {changeHandler}
          disabled = {!edit}
        />
        <div className="input_error_msg" id = "address_error">Address is required</div>
      </div>
      <Row>
        <Col xl={6}>
          <div>
            <div className="pd_b_i_profile_head">City</div>
            <input
              type="text"
              className="pd_b_i_profile_input"
              value={data.city}
              id = "city"
              onChange = {changeHandler}
              disabled = {!edit}
            />
            <div className="input_error_msg" id = "city_error">City is required</div>
          </div>
        </Col>
        <Col xl={6}>
          <div>
            <div className="pd_b_i_profile_head">Country</div>
            <input
              type="text"
              className="pd_b_i_profile_input"
              value={data.country}
              id = "country"
              onChange = {changeHandler}
              disabled = {!edit}
            />
            <div className="input_error_msg" id = "country_error">Country is required</div>
          </div>
        </Col>
        <Col xl={6}>
          <div>
            <div className="pd_b_i_profile_head">Postal Address</div>
            <input
              type="text"
              className="pd_b_i_profile_input"
              value={data.postal}
              id = "postal"
              onChange = {changeHandler}
              disabled = {!edit}
            />
            <div className="input_error_msg" id = "postal_error">Postal address is required</div>
          </div>
        </Col>
      </Row>
      <div>
        <div className="pd_b_i_profile_head">Bio</div>
        <textarea
          type="text"
          className="pd_b_i_profile_inputDesc"
          placeholder="Maximum 50 words..."
          value={data.bio}
          id = "bio"
          onChange = {changeHandler}
          disabled = {!edit}
        ></textarea>
        <div className="input_bio_error_msg" id = "bio_error">Bio is required</div>
        <div className="pd_b_i_profile_text">
          Brief description for your profile. URLs are hyperlinked
        </div>
      </div>

      <div className="pd_b_i_profile_titleBox">
        <div className="pd_b_i_profile_title">Professional Information</div>
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
      <div className="pd_b_i_notifications_save">
        <button className="pd_b_i_notifications_saveBtn" onClick={saveChanges}>Save Changes</button>
      </div>
    </div>
    </div>
    </Container>    );
}

export default CreatePilot;
