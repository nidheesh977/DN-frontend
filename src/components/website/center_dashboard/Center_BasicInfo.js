import React, { useState, useEffect } from "react";
import Cover from "./images/cover.jpg";
import "./css/Pilot_BasicInfo.css";
import Pilot from "./images/pilot.jpg";
import { Row, Col } from "react-grid-system";
import Edit from "./images/edit-1.svg";
import PhoneInput from "react-phone-number-input";
import All from "../../website/All.module.css";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import Close from "../../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";


const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const domain = process.env.REACT_APP_MY_API;

function Center_BasicInfo() {
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  useEffect(() => {
    axios.post(`${domain}/api/user/pilotDetails`, config).then((response) => {
      let data = response.data;
      setData({
        full_name: data.name,
        email: data.emailId,
        phone: data.phoneNo,
        dob: data.dob,
        gender: data.gender,
        address: data.address,
        city: data.city,
        country: data.country,
        postal: data.postalAddress,
        bio: data.bio,
        profile: `${data.profilePic}`,
        cover: `${data.coverPic}`,
      });
    });
  }, []);
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
    profile: Pilot,
    cover: Cover,
  });
  let [edit, setEdit] = useState(false);
  let [profileSuccess, setProfileSuccess] = useState(false)
  let [coverSuccess, setCoverSuccess] = useState(false)
  let [infoSuccess, setInfoSuccess] = useState(false)

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
    console.log(data);
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

  const updateCoverImg = (e) => {
    let file = e.target.files[0];
    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      if (img.width >= 800 && img.height >= 300) {
        let formData = new FormData();
        formData.append("file", file);
        axios
          .post(`${domain}/api/user/updateCoverPic`, formData, config)
          .then((res) => {
            console.log(res.data);
            setCoverSuccess(true)
            setData({
              ...data,
              cover: `${res.data.Location}`,
            });
          })
          .catch((err) => {
            console.log(err.response);
          });
      } else {
        alert("Cover Image size must be minimum 800x300");
      }
    };
  };

  const updateProfileImg = (e) => {
    let file = e.target.files[0];
    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      if (img.width >= 150 && img.height >= 150) {
        let formData = new FormData();
        formData.append("file", file);
        axios
          .post(`${domain}/api/user/updateProfilePic`, formData, config)
          .then((res) => {
            console.log(res.data);
            setProfileSuccess(true)
            setData({
              ...data,
              profile: `${res.data.Location}`,
            });
          })
          .catch((err) => {
            console.log(err.response);
          });
      } else {
        alert("Profile Image size must be minimum 150x150");
      }
    };
  };

  const saveChanges = () => {
    var fields = [
      "full_name",
      "email",
      "phone",
      "dob",
      "gender",
      "address",
      "city",
      "country",
      "postal",
      "bio",
    ];
    var error = false;
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    for (var i = 0; i < fields.length; i++) {
      if (fields[i] === "bio") {
        if (data.bio === "") {
          document.getElementById(`${fields[i]}_error`).style.visibility =
            "visible";
          document.getElementById(`${fields[i]}_error`).style.display =
            "contents";
          document.getElementById(`${fields[i]}`).focus();
          error = true;
          break;
        }
      } else if (fields[i] === "email") {
        if (data.email === "") {
          document.getElementById(`email_error`).innerHTML =
            "Email ID is Required";
          document.getElementById(`email_error`).style.visibility = "visible";
          document.getElementById(`email`).focus();
          error = true;
          break;
        } else if (!validateEmail(data.email)) {
          document.getElementById(`email_error`).innerHTML =
            "Email ID is not valid";
          document.getElementById(`email_error`).style.visibility = "visible";
          document.getElementById(`email`).focus();
          error = true;
          break;
        }
      } else if (fields[i] === "phone") {
        if (data.phone === "") {
          document.getElementById(`phone_error`).innerHTML =
            "Phone number is Required";
          document.getElementById(`phone_error`).style.visibility = "visible";
          document.getElementById(`phone`).focus();
          error = true;
          break;
        } else if (data.phone.length <= 7) {
          document.getElementById(`phone_error`).innerHTML =
            "Phone number is not valid";
          document.getElementById(`phone_error`).style.visibility = "visible";
          document.getElementById(`phone`).focus();
          error = true;
          break;
        }
      } else if (data[fields[i]] === "") {
        document.getElementById(`${fields[i]}_error`).style.visibility =
          "visible";
        document.getElementById(`${fields[i]}`).focus();
        error = true;
        break;
      }
    }
    if (!error) {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      console.log(data);
      axios
        .post(
          `${domain}/api/pilot/updateBasicInfo`,
          {
            name: data.full_name,
            emailId: data.email,
            phoneNo: data.phone,
            dob: data.dob,
            gender: data.gender,
            city: data.city,
            country: data.country,
            bio: data.bio,
          },
          config
        )
        .then(() => {
          setInfoSuccess(true)
        })
        .catch((err) => {
          alert("not successful");
          console.log(err.response.data);
        });
    }
  };

  const editHandler = () => {
    setEdit(true);
    setTimeout(() => {
      document.getElementById(`full_name`).focus();
    }, 10);
  };

  return (
    <div className="pd_b_i_main">
      <div className="pd_b_i_images">
        <img src={data.cover} alt="" className="pd_b_i_cover" />
        <div className="pd_b_i_profile">
          <div className="pd_b_i_profile_container">
            <img src={data.profile} alt="" className="pd_b_i_pilot" />
            <div>
              <label>
                <input
                  type="file"
                  src=""
                  alt="profile-img"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={updateProfileImg}
                  disabled={!edit}
                />
                {edit ? (
                  <img src={Edit} alt="" className="pd_b_i_edit" />
                ) : (
                  <img
                    src={Edit}
                    alt=""
                    className="pd_b_i_edit"
                    style={{ opacity: "0.5" }}
                  />
                )}
              </label>
            </div>
          </div>
        </div>
        <div>
          <label>
            <input
              type="file"
              src=""
              alt="profile-img"
              accept="image/*"
              style={{ display: "none" }}
              onChange={updateCoverImg}
              disabled={!edit}
            />
            {edit ? (
              <img src={Edit} alt="" className="pd_b_i_edit1" />
            ) : (
              <img
                src={Edit}
                alt=""
                className="pd_b_i_edit1"
                style={{ opacity: "0.5" }}
              />
            )}
          </label>
        </div>
      </div>
      <div className="pd_b_i_profile_titleBox">
        <div className="pd_b_i_profile_title">Basic Information</div>
        <div className="pd_b_i_profile_edit" onClick={editHandler}>
          Edit
        </div>
      </div>
      <div>
        <div className="pd_b_i_profile_head">Name</div>
        <input
          type="text"
          className="pd_b_i_profile_input"
          value={data.full_name}
          id="full_name"
          onChange={changeHandler}
          disabled={!edit}
        />
        <div className="input_error_msg" id="full_name_error">
          Full name is required
        </div>
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
              id="email"
              onChange={changeHandler}
              disabled={!edit}
            />
            <div className="input_error_msg" id="email_error">
              Email ID is required
            </div>
          </div>
        </Col>
        <Col>
          <div>
            <div>
              <div style={{ marginBottom: "15px" }}>
                <div className="pd_b_i_profile_head1">Phone Number</div>
                {/* <div className="pd_b_i_profile_verify">Verify</div> */}
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
      <Row>
        <Col>
          <div>
            <div className="pd_b_i_profile_head">DOB</div>
            <input
              type="date"
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
              value={data.gender}
              onChange={changeHandler}
              id="gender"
              disabled={!edit}
              style={{ width: "100%" }}
            >
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
      
      <Row>
        <Col xl={6}>
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
        </Col>
        <Col xl={6}>
          <div>
            <div className="pd_b_i_profile_head">Country</div>
            <input
              type="text"
              className="pd_b_i_profile_input"
              value={data.country}
              id="country"
              onChange={changeHandler}
              disabled={!edit}
            />
            <div className="input_error_msg" id="country_error">
              Country is required
            </div>
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
          id="bio"
          onChange={changeHandler}
          disabled={!edit}
        ></textarea>
        <div className="input_bio_error_msg" id="bio_error">
          Bio is required
        </div>
        <div className="pd_b_i_profile_text">
          Brief description for your profile. URLs are hyperlinked
        </div>
      </div>
      <div className="pd_b_i_notifications_save">
        <button className="pd_b_i_notifications_saveBtn" onClick={saveChanges}>
          Save Changes
        </button>
      </div>
      <Dialog
        open={profileSuccess}
        onClose={() => setProfileSuccess(false)}
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
              onClick={() => setProfileSuccess(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <Row style={{ marginTop: "30px" }}>
            <div className="u_f_popup_title">
              Profile image updated successfully.
            </div>
            <div className="u_f_popup_btn_container">
              <button
                className="u_f_popup_btn2"
                onClick={() => setProfileSuccess(false)}
              >
                Close
              </button>
            </div>
          </Row>
        </DialogContent>
      </Dialog>
      <Dialog
        open={coverSuccess}
        onClose={() => setCoverSuccess(false)}
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
              onClick={() => setCoverSuccess(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <Row style={{ marginTop: "30px" }}>
            <div className="u_f_popup_title">
              Cover image updated successfully.
            </div>
            <div className="u_f_popup_btn_container">
              <button
                className="u_f_popup_btn2"
                onClick={() => setCoverSuccess(false)}
              >
                Close
              </button>
            </div>
          </Row>
        </DialogContent>
      </Dialog>
      <Dialog
        open={infoSuccess}
        onClose={() => setInfoSuccess(false)}
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
              onClick={() => setInfoSuccess(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <Row style={{ marginTop: "30px" }}>
            <div className="u_f_popup_title">
              Personal informations updated successfully.
            </div>
            <div className="u_f_popup_btn_container">
              <button
                className="u_f_popup_btn2"
                onClick={() => setInfoSuccess(false)}
              >
                Close
              </button>
            </div>
          </Row>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Center_BasicInfo;
