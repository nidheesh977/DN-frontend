import React, { useState, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import Edit from "./images/edit-1.svg";
import Cover from "./images/cover.jpg";
import "./css/Pilot_BasicInfo.css";
import Pilot from "./images/pilot.jpg";
import All from "../../website/All.module.css";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import Close from "../../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import { saveAs } from "file-saver";
import Select from "react-select";
import AvatarEditor from "react-avatar-editor";
import { Button, Box, Slider } from "@material-ui/core";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const domain = process.env.REACT_APP_MY_API;

function Pilot_ProfessionalInfo() {
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  useEffect(() => {
    axios.post(`${domain}/api/user/pilotDetails`, config).then((response) => {
      console.log(response.data);
      let data = response.data;
      setData({
        name: data.name,
        skills: data.skills,
        pilot_type: data.pilotType,
        drone_id: data.droneId,
        work_type: data.workType,
        drone_type: data.droneType,
        hourly_pay: data.hourlyPayment,
        monthly_pay: data.monthlyPayment,
        industry: data.industry,
        training_center_name: data.trainingCenter,
        completed_year: data.completedYear,
        attachment_selected: false,
        attachment: data.certificates,
        profile: `${data.profilePic}`,
        cover: `${data.coverPic}`,
        certificateChanged: false,
      });
    });
  }, []);
  let [data, setData] = useState({
    name: "",
    pilot_type: "",
    drone_id: "",
    drone_input: "",
    drone_type: [],
    work_type: "",
    hourly_pay: 0,
    monthly_pay: 0,
    industry: [],
    attachment_selected: null,
    attachment: "",
    training_center_name: "",
    completed_year: "",
    skills: [],
    profile: Pilot,
    cover: Cover,
    fileChanged: false,
  });

  let [edit, setEdit] = useState(false);
  let [profileSuccess, setProfileSuccess] = useState(false);
  let [coverSuccess, setCoverSuccess] = useState(false);
  let [infoSuccess, setInfoSuccess] = useState(false);
  let [coverUpdateLoading, setCoverUpdateLoading] = useState(false);

  const clickEdit = () => {
    setEdit(true);
    setTimeout(() => document.getElementById("name").focus(), 10);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    document.getElementById(`${e.target.id}_error`).style.visibility = "hidden";
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
        if (e.target.files[0].size / 1000000 <= 5) {
          setData({
            ...data,
            attachment: e.target.files[0],
            attachment_selected: true,
            fileChanged: true,
          });
        } else {
          alert("File size should not exceed 5 MB");
        }
      }
    } catch {}
    document.getElementById("certificate_error").style.visibility = "hidden";
  };

  const downloadFile = () => {
    saveAs(
      `https://dn-nexevo-pilotcertificates.s3.ap-south-1.amazonaws.com/${data.attachment}`,
      `PilotCertificate`
    );
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
    document.getElementById("skills_error").style.visibility = "hidden";
  };

  const addIndustry = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      var industry_list = data.industry;
      industry_list.push(e.target.value);
      setData({
        ...data,
        industry: industry_list,
      });
      console.log(data.industry);
      document.getElementById(e.target.id).value = "";
    }
    document.getElementById("industry_error").style.visibility = "hidden";
  };

  const showError = (field) => {
    document.getElementById(`${field}_error`).style.visibility = "visible";
    document.getElementById(field).focus();
  };

  const updateProfile = (e) => {
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
            setProfileSuccess(true);
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

  const updateCover = (e) => {
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
            setCoverSuccess(true);
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

  const removeSkills = (id) => {
    if (edit) {
      var skill_list = data.skills;
      skill_list.splice(id, 1);
      setData({
        ...data,
        skills: skill_list,
      });
      console.log(data.skills);
    }
  };

  const removeIndustry = (id) => {
    if (edit) {
      var industry_list = data.industry;
      industry_list.splice(id, 1);
      setData({
        ...data,
        industry: industry_list,
      });
      console.log(data.skills);
    }
  };

  const removeDrone = (id) => {
    if (edit){
      var new_drones = data.drone_type;
          new_drones.splice(id, 1);
          setData({
            ...data,
            drone_type: new_drones,
          });
    }
  };

  const addDroneType = (e) => {
    if (e.key === "Enter") {
      if (
        data.drone_input.length !== 0 &&
        !data.drone_type.includes(data.drone_input)
      ) {
        var new_drones = data.drone_type;
        new_drones.push(data.drone_input);
        setData({
          ...data,
          drone_type: new_drones,
          drone_input: "",
        });
      }
    }
  };

  const saveChanges = () => {
    if (data.name === "") {
      showError("name");
    } else if (data.pilot_type === "licensed" && data.attachment === "") {
      document.getElementById(`certificate_error`).style.visibility = "visible";
      document.getElementById(data.pilot_type).focus();
    } else if (data.pilot_type === "unlicensed" && data.drone_id === "") {
      showError("drone_id");
    } else if (data.work_type === "full_time" && data.monthly_pay === "") {
      showError("monthly_pay");
    } else if (data.work_type === "part_time" && data.hourly_pay === "") {
      showError("hourly_pay");
    } else if (data.industry.length === 0) {
      showError("industry");
    } else if (
      data.pilot_type === "licensed" &&
      data.training_center_name === ""
    ) {
      showError("training_center_name");
    } else if (data.pilot_type === "licensed" && data.completed_year === "") {
      showError("completed_year");
    } else if (data.skills.length === 0) {
      showError("skills");
    } else {
      if (data.fileChanged) {
        console.log(data.industry);
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("skills", data.skills);
        formData.append("pilotType", data.pilot_type);
        formData.append("droneId", data.drone_id);
        formData.append("drones", data.drone_type);
        formData.append("workType", data.work_type);
        formData.append("hourlyPayment", data.hourly_pay);
        formData.append("monthlyPayment", data.monthly_pay);
        formData.append("industry", data.industry);
        formData.append("trainingCenter", data.training_center_name);
        formData.append("completedYear", data.completed_year);
        formData.append("file", data.attachment);
        formData.append("profile", `${domain}/${data.profilePic}`);
        formData.append("cover", `${domain}/${data.coverPic}`);

        axios
          .post(`${domain}/api/pilot/updateProfessionalInfo1`, formData, config)
          .then((res) => {
            console.log(res);
            setInfoSuccess(true);
          })
          .catch((err) => {
            alert("Update failed");
          });
      } else {
        axios
          .post(
            `${domain}/api/pilot/updateProfessionalInfo`,
            {
              name: data.name,
              skills: data.skills,
              pilotType: data.pilot_type,
              droneId: data.drone_id,
              drones: data.drone_type,
              workType: data.work_type,
              hourlyPayment: data.hourly_pay,
              monthlyPayment: data.monthly_pay,
              industry: data.industry,
              trainingCenter: data.training_center_name,
              completedYear: data.completed_year,
              attachment: data.attachment,
              profile: `${domain}/${data.profilePic}`,
              cover: `${domain}/${data.coverPic}`,
            },
            config
          )
          .then((res) => {
            console.log(res);
            setInfoSuccess(true);
          })
          .catch((err) => {
            alert("Update failed");
          });
      }
    }
  };

  // Cover picture Crop

  var editor = "";
  const [picture, setPicture] = useState({
    cropperOpen: false,
    img: null,
    zoom: 1,
    croppedImg:
      "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png",
  });

  const handleSlider = (event, value) => {
    setPicture({
      ...picture,
      zoom: value,
    });
  };

  const handleCancel = () => {
    setPicture({
      ...picture,
      cropperOpen: false,
    });
  };

  const setEditorRef = (ed) => {
    editor = ed;
  };

  const handleSave = (e) => {
    if (setEditorRef) {
      setCoverUpdateLoading(true);
      const canvasScaled = editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      console.log(croppedImg);
      let formData = new FormData();
      formData.append("file", croppedImg);
      formData.append("test", "Hello");
      axios
        .post(`${domain}/api/user/updateCoverPic`, formData, config)
        .then((res) => {
          setCoverUpdateLoading(false);
          setPicture({
            ...picture,
            img: null,
            cropperOpen: false,
            croppedImg: croppedImg,
          });
          console.log(res.data);
          setCoverSuccess(true);
          axios
            .post(`${domain}/api/user/pilotDetails`, config)
            .then((response) => {
              console.log(response.data.coverPic);
              setData({
                ...data,
                cover: `${response.data.coverPic}`,
              });
            });
        })
        .catch((err) => {
          setCoverUpdateLoading(false);
          console.log(err.response);
        });
    }
  };

  const handleFileChange = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    console.log(url);
    setPicture({
      ...picture,
      img: url,
      cropperOpen: true,
    });
  };

  var editor2 = "";
  const [picture2, setPicture2] = useState({
    cropperOpen: false,
    img: null,
    zoom: 1,
    croppedImg:
      "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png",
  });

  const handleSlider2 = (event, value) => {
    setPicture2({
      ...picture2,
      zoom: value,
    });
  };

  const handleCancel2 = () => {
    setPicture2({
      ...picture,
      cropperOpen: false,
    });
  };

  const setEditorRef2 = (ed) => {
    editor2 = ed;
  };

  const handleSave2 = (e) => {
    if (setEditorRef2) {
      setCoverUpdateLoading(true);
      const canvasScaled = editor2.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      console.log(croppedImg);
      let formData = new FormData();
      formData.append("file", croppedImg);
      axios
        .post(`${domain}/api/user/updateProfilePic`, formData, config)
        .then((res) => {
          setCoverUpdateLoading(false);
          setPicture2({
            ...picture2,
            img: null,
            cropperOpen: false,
            croppedImg: croppedImg,
          });
          console.log(res.data);
          setProfileSuccess(true);
          axios
            .post(`${domain}/api/user/pilotDetails`, config)
            .then((response) => {
              console.log(response.data.coverPic);
              setData({
                ...data,
                profile: `${response.data.profilePic}`,
              });
            });
        })
        .catch((err) => {
          setCoverUpdateLoading(false);
          console.log(err.response);
        });
    }
  };

  const handleFileChange2 = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);
    console.log(url);
    setPicture2({
      ...picture,
      img: url,
      cropperOpen: true,
    });
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
                  onChange={handleFileChange2}
                  disabled={!edit}
                />
                <img src={Edit} alt="" className="pd_b_i_edit" />
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
              onChange={handleFileChange}
              disabled={!edit}
            />
            <img src={Edit} alt="" className="pd_b_i_edit1" />
          </label>
        </div>
      </div>
      <div className="pd_b_i_profile_titleBox">
        <div className="pd_b_i_profile_title">Professional Information</div>
        <div className="pd_b_i_profile_edit" onClick={clickEdit}>
          Edit
        </div>
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
          disabled={!edit}
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
            disabled={!edit}
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
            disabled={!edit}
          />{" "}
          <label htmlFor="unlicensed" className="pd_p_i_profile_text">
            Unlicensed Pilots
          </label>
        </div>
      </div>
      <div>
        {data.pilot_type === "licensed" ? (
          <React.Fragment>
            <label for="pd_p_i_hidden" className="pd_p_i_attachnment_label">
              <div
                className="pd_b_i_profile_head"
                style={{ cursor: "pointer" }}
              >
                Certificates{" "}
              </div>
              <div>
                <div className="pd_b_i_attachment">Attachments</div>
                <span className="pd_p_i_profile_text">
                  {data.attachment[0]
                    ? data.attachment[0].slice(0, 50)
                    : data.fileChanged
                    ? data.attachment.name.slice(0, 50)
                    : "Attach your DGCA certificate"}
                </span>
                <button
                  style={{
                    backgroundColor: "",
                    border: 0,
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                    borderRadius: "5px",
                  }}
                  onClick={downloadFile}
                >
                  Download
                </button>
              </div>
              <div className="input_error_msg" id="certificate_error">
                Certificate is required
              </div>
              <input
                type="file"
                id="pd_p_i_hidden"
                onChange={chooseFile}
                disabled={!edit}
                accept="image/jpg, image/jpeg, application/pdf"
              />
            </label>
          </React.Fragment>
        ) : (
          ""
        )}
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
          <label htmlFor="drone_input" className="pd_b_i_profile_head">
            Drone Type
          </label>
          <input
            type="text"
            value={data.drone_input}
            className="pd_b_i_profile_input"
            name="drone_input"
            id="drone_input"
            onChange={handleChange}
            onKeyDown={addDroneType}
            disabled={!edit}
          />
          {data.drone_type.map((drone, index) => {
            return (
              <div
                className="pd_i_skill"
                key={index}
                onClick={() => removeDrone(index)}
              >
                {drone} <i class="fas fa-times"></i>
              </div>
            );
          })}
          <div className="input_error_msg" id="drone_input_error">
            Drone type is required
          </div>
        </div>
        <div>
          {/* <label htmlFor="drone_input" className="pd_b_i_profile_head">
            Drone Type
          </label>
          <input
            type="text"
            value={data.drone_input}
            className="pd_b_i_profile_input"
            name="drone_input"
            id="drone_input"
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
          <input
            type="text"
            className="pd_b_i_profile_input"
            id="industry"
            onKeyUp={addIndustry}
            disabled={!edit}
          />
          {data.industry.map((industry, index) => {
            return (
              <div
                className="pd_i_skill"
                key={index}
                onClick={() => removeIndustry(index)}
              >
                {industry} <i class="fas fa-times"></i>
              </div>
            );
          })}
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
                disabled={!edit}
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
                type="month"
                className="pd_b_i_profile_input"
                id="completed_year"
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
          />
          {data.skills.map((skill, index) => {
            return (
              <div
                className="pd_i_skill"
                key={index}
                onClick={() => removeSkills(index)}
              >
                {skill} <i class="fas fa-times"></i>
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
          {edit ? (
            <button
              className="pd_b_i_notifications_saveBtn"
              onClick={saveChanges}
            >
              Save Changes
            </button>
          ) : (
            <></>
          )}
        </div>
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
              Professional informations updated successfully.
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
      <Dialog
        open={picture.cropperOpen}
        onClose={() => setInfoSuccess(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
        PaperProps={{
          style: { width: "820px", borderRadius: "10px", paddingTop: "50px" },
        }}
      >
        <DialogContent
          className={All.PopupBody}
          style={{ marginBottom: "50px" }}
        >
          {picture.cropperOpen && (
            <Box display="block">
              <center>
                <AvatarEditor
                  ref={setEditorRef}
                  image={picture.img}
                  width={1170}
                  height={310}
                  border={50}
                  color={[0, 0, 0, 0.7]} // RGBA
                  rotate={0}
                  scale={picture.zoom}
                  style={{ width: "100%", height: "100%" }}
                />
              </center>
              <Slider
                aria-label="raceSlider"
                value={picture.zoom}
                min={1}
                max={10}
                step={0.1}
                onChange={handleSlider}
              ></Slider>
              <Box>
                <Button
                  style={{ marginRight: "10px" }}
                  variant="contained"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                {coverUpdateLoading ? (
                  <Button>Saving</Button>
                ) : (
                  <Button onClick={handleSave}>Save</Button>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={picture2.cropperOpen}
        onClose={() => setInfoSuccess(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
        PaperProps={{
          style: { width: "820px", borderRadius: "10px", paddingTop: "50px" },
        }}
      >
        <DialogContent
          className={All.PopupBody}
          style={{ marginBottom: "50px" }}
        >
          {picture2.cropperOpen && (
            <Box display="block">
              <center>
                <AvatarEditor
                  ref={setEditorRef2}
                  image={picture2.img}
                  width={180}
                  height={180}
                  border={50}
                  borderRadius={150}
                  color={[0, 0, 0, 0.7]} // RGBA
                  rotate={0}
                  scale={picture2.zoom}
                  style={{ width: "50%", height: "50%" }}
                />
              </center>
              <Slider
                aria-label="raceSlider"
                value={picture2.zoom}
                min={1}
                max={10}
                step={0.1}
                onChange={handleSlider2}
              ></Slider>
              <Box>
                <Button
                  style={{ marginRight: "10px" }}
                  variant="contained"
                  onClick={handleCancel2}
                >
                  Cancel
                </Button>
                {coverUpdateLoading ? (
                  <Button>Saving</Button>
                ) : (
                  <Button onClick={handleSave2}>Save</Button>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Pilot_ProfessionalInfo;
