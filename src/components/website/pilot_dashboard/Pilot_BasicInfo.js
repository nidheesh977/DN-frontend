import React, { useState } from "react";
import Cover from "./images/cover.jpg";
import "./css/Pilot_BasicInfo.css";
import Pilot from "./images/pilot.jpg";
import { Row, Col } from "react-grid-system";
import Edit from "./images/edit-1.svg";
import PhoneInput from 'react-phone-number-input'
import All from '../../website/All.module.css';
import Axios from 'axios'

function Pilot_BasicInfo() {
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
  });
  let [edit, setEdit] = useState(false)

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
    var fields = ["full_name", "email", "phone", "dob", "gender", "address", "city", "country", "postal", "bio"]
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
        document.getElementById(`${fields[i]}`).focus()
        error = true
        break
      }
    }
    if(!error){
      alert("Ready to submit")
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      console.log(data)
      Axios.post("http://localhost:9000/api/pilot/registerPilot", {
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
      }, config)
        .then(() => {
alert("successfull")        })
        .catch(() => {
          alert("not successful");
        });
    }
  }

  const editHandler = () => {
    setEdit(true)
    setTimeout(() => {
      document.getElementById(`full_name`).focus()
    }, 10)
  }

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
        <div className="pd_b_i_profile_edit" onClick = {editHandler}>Edit</div>
      </div>
      <div>
        <div className="pd_b_i_profile_head">Name</div>
        <input type="text" className="pd_b_i_profile_input" value={data.full_name} id = "full_name" onChange = {changeHandler} disabled = {!edit} />
        <div className="input_error_msg" id = "full_name_error">Full name is required</div>
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
              id = "email"
              onChange = {changeHandler}
              disabled = {!edit}
            />
            <div className="input_error_msg" id = "email_error">Email ID is required</div>
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
            <PhoneInput defaultCountry="IN" className={All.Phonenumber + " s_c_d_phone_input"} name="phone" id="phone" value={data.phone} onChange = {phoneChangeHandler} disabled = {!edit}/>
            <div className="input_error_msg" id = "phone_error">Phone number is required</div>
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
      <div className="pd_b_i_notifications_save">
        <button className="pd_b_i_notifications_saveBtn" onClick={saveChanges}>Save Changes</button>
      </div>
    </div>
  );
}

export default Pilot_BasicInfo;
