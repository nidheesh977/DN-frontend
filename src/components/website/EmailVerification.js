import React, { useEffect, useState } from "react";
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
import axios from "axios";
import {useHistory} from "react-router-dom"

function CreateCompany() {
  let history = useHistory();
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

  useEffect(()=>{
    if(localStorage.getItem("email") !== "false"){
      history.push("/NoComponent");
    }
  },[])
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
//mail resend
let sendMail = () =>{
  axios.post(`${domain}/api/user/emailResend`, config).then(res=>{
    console.log(res)
    if(res.data === "successfull"){
      document.getElementById("p1").style.display = "none"
      document.getElementById("p2").style.display = "block"
    }
  })
}

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
 <Row>
            <Col lg={7} className={All.DronePerson} >
                <div >
                    <img src={DronePerson} />
                </div>
            </Col>
            <Col lg={5}>  
            <div style={{margin:"100px 0px"}}>
            <h2>We have sent you a verification link on your Mail Id. Please verify before Proceeding</h2>
<p id="p1">Didn't get the mail? Click <span onClick={sendMail} style={{color:"blue", textDecoration:"underline", cursor:"pointer",marginTop:"20px"}}>here</span> to resend it</p>

<p id="p2" style={{display: "none"}}>Mail have been successfully sent to your mail, Verify</p>
</div>  
      </Col>
      </Row>
    </Container>
  );
}

export default CreateCompany;
