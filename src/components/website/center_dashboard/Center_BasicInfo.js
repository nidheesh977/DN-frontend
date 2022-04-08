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
import { Helmet } from "react-helmet";
import Loader from "../../Loader/loader";
import plusicon from "../../images/s_d_a_plus_icon.png";
import deleteIcon from "../company_dashboard/images/c_j_bin.png";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-autocomplete-places";

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
    axios
      .post(`${domain}/api/center/getCenterData`, config)
      .then((response) => {
        let center_data = response.data;
        console.log(center_data);
        localStorage.setItem("oldEmail", response.data.userEmail)
        setData({
          full_name: center_data.userName,
          email: center_data.userEmail,
          centerEmail: center_data.centerData.email,
          phone: center_data.userPhoneNo,
          centerPhone: center_data.centerData.phoneNo,
          secondaryPhoneNo: center_data.centerData.secondaryNumber
            ? center_data.centerData.secondaryNumber
            : "",
          whatsappNo: center_data.centerData.whatsappNo
            ? center_data.centerData.whatsappNo
            : "",
          website: center_data.centerData.website
            ? center_data.centerData.website
            : "",
          code: "+91",
          address: center_data.centerData.address,
          description: center_data.centerData.description,
          profile: `${center_data.centerData.profilePic}`,
          cover: `${center_data.centerData.coverPic}`,
          week_days: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          holidays: center_data.centerData.holidays,
          brand: "",
          brands: center_data.centerData.brandOfDrones,
          photo_row: center_data.centerData.images,
          newPhotos: [],
          center_name: center_data.centerData.centerName,
          streetName: center_data.centerData.streetName,
          establishedYear: center_data.centerData.establishedYear,
          workingFrom: center_data.centerData.workingHours.slice(0, 5),
          workingTill: center_data.centerData.workingHours.slice(8, 13),
        });
      })
      .then(() => {
        setTimeout(() => {
          axios.get(`${domain}/api/brand/getBrands`).then((res) => {
            var result = res.data.map(function (brand) {
              return brand.brand;
            });
            setSuggestedBrands(result);
          });
        });
      }, 100);
  }, []);
  let [data, setData] = useState({
    full_name: "",
    email: "",
    centerEmail: "",
    phone: "",
    centerPhone: "",
    code: "+91 ",
    address: "",
    description: "",
    profile: Pilot,
    cover: Cover,
    secondaryPhoneNo: "",
    whatsappNo: "",
    website: "",
    week_days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    holidays: ["Sunday"],
    brand: "",
    brands: [],
    suggestedBrands: [],
    photo_row: [],
    newPhotos: [],
    center_name: "",
    streetName: "",
    establishedYear: "",
    workingFrom: "",
    workingTill: "",
  });
  let [edit, setEdit] = useState(false);
  let [profileSuccess, setProfileSuccess] = useState(false);
  let [coverSuccess, setCoverSuccess] = useState(false);
  let [infoSuccess, setInfoSuccess] = useState(false);
  let [fileExcluded, setFileExcluded] = useState(false);
  let [imgCountErr, setImgCountErr] = useState(false);
  let [suggestedBrands, setSuggestedBrands] = useState([]);
  let [saving, setSaving] = useState(false);
  let [updateSuccess, setUpdateSuccess] = useState(false);
  let [updateFailed, setUpdateFailed] = useState(false);

  const changeHandler = (e) => {
    document.getElementById(`${e.target.id}_error`).style.display = "none";
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
    console.log(data);
  };

  const phoneChangeHandler = (e) => {
    try {
      if (
        Number(
          e.target.value.slice(data.code.length + 1, 10 + data.code.length + 1)
        ) ||
        e.target.value.slice(
          data.code.length + 1,
          10 + data.code.length + 1
        ) === ""
      ) {
        setData({
          ...data,
          phone: e.target.value.slice(
            data.code.length + 1,
            10 + data.code.length + 1
          ),
        });
        document.getElementById("phone_error").style.display = "none";
      }
    } catch {
      console.log("Not number");
    }
  };

  const centerPhoneChangeHandler = (e) => {
    try {
      if (
        Number(
          e.target.value.slice(data.code.length + 1, 10 + data.code.length + 1)
        ) ||
        e.target.value.slice(
          data.code.length + 1,
          10 + data.code.length + 1
        ) === ""
      ) {
        setData({
          ...data,
          centerPhone: e.target.value.slice(
            data.code.length + 1,
            10 + data.code.length + 1
          ),
        });
        document.getElementById("centerPhone_error").style.display = "none"
      }
    } catch {
      console.log("Not number");
    }
  };

  const centerWhatsappNoChangeHandler = (e) => {
    try {
      if (
        Number(
          e.target.value.slice(data.code.length + 1, 10 + data.code.length + 1)
        ) ||
        e.target.value.slice(
          data.code.length + 1,
          10 + data.code.length + 1
        ) === ""
      ) {
        setData({
          ...data,
          whatsappNo: e.target.value.slice(
            data.code.length + 1,
            10 + data.code.length + 1
          ),
        });
      }
    } catch {
      console.log("Not number");
    }
  };

  const centerSecondaryNoChangeHandler = (e) => {
    try {
      if (
        Number(
          e.target.value.slice(data.code.length + 1, 10 + data.code.length + 1)
        ) ||
        e.target.value.slice(
          data.code.length + 1,
          10 + data.code.length + 1
        ) === ""
      ) {
        setData({
          ...data,
          secondaryPhoneNo: e.target.value.slice(
            data.code.length + 1,
            10 + data.code.length + 1
          ),
        });
        document.getElementById("centerPhone_error").style.display = "none";
      }
    } catch {
      console.log("Not number");
    }
  };

  const addBrand = (e) => {
    console.log(suggestedBrands);
    if (e.key === "Enter") {
      if (
        !data.brands.includes(data.brand) &&
        !suggestedBrands.includes(data.brand)
      ) {
        setData({
          ...data,
          brands: [...data.brands, data.brand],
          brand: "",
        });
        document.getElementById(`brand_error`).style.display = "none";
      }
    }
  };

  const selectSuggestedBrand = (id) => {
    if (edit) {
      var brands = data.brands;
      var newSuggestedBrands = suggestedBrands;
      brands.push(newSuggestedBrands.splice(id, 1)[0]);
      setData({
        ...data,
        brands: brands,
      });
      setSuggestedBrands(newSuggestedBrands);
      document.getElementById("brand_error").style.display = "none";
    }
  };

  const showRemoveIcon = (id) => {
    document.getElementById(id).style.visibility = "visible";
  };

  const hideRemoveIcon = (id) => {
    document.getElementById(id).style.visibility = "hidden";
  };

  const newShowRemoveIcon = (id) => {
    document.getElementById(id).style.visibility = "visible";
  };

  const newHideRemoveIcon = (id) => {
    document.getElementById(id).style.visibility = "hidden";
  };

  const removePhoto = (id) => {
    if(edit){
      var photos = data.photo_row;
      photos.splice(id, 1);
      setData({
        ...data,
        photo_row: photos,
      });
      console.log(data.photo_row);
    }
  };

  const removeNewPhoto = (id) => {
    if(edit){
      var photos = data.newPhotos;
      photos.splice(id, 1);
      setData({
        ...data,
        newPhotos: photos,
      });
    }
  };

  const addPhoto = (e) => {
    // try {
    //   if (this.state.photo_row.length + e.target.files.length <= 6) {
    //     if (e.target.files[0].size / 1000000 <= 2) {
    //       let img = new Image();
    //       var file = e.target.files[0];
    //       var photos_row = this.state.photo_row;
    //       img.src = window.URL.createObjectURL(e.target.files[0]);
    //       img.onload = () => {
    //         if (img.width < 550 || img.height < 450) {
    //           this.setState({
    //             imgWidthHightError: true,
    //           });
    //           this.refs.add_photo.value = "";
    //         } else {
    //           photos_row.push(file);
    //           this.setState({
    //             photo_row: photos_row,
    //           });
    //           document.getElementById("photos_error").style.display = "none";
    //           this.refs.add_photo.value = "";
    //         }
    //       };
    //     } else {
    //       this.setState({
    //         fileSizeExceed: true,
    //       });
    //       this.refs.add_photo.value = "";
    //     }
    //   } else {
    //     this.setState({
    //       imgCountErr: true,
    //     });
    //     this.refs.add_photo.value = "";
    //   }
    // } catch {}
    try {
      var files = [];
      if (
        e.target.files.length + data.photo_row.length + data.newPhotos.length <=
        6
      ) {
        for (var i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size / 1000000 <= 2) {
            files.push(e.target.files[i]);
          } else {
            setFileExcluded(true);
          }
        }
        console.log(e.target.files);
        if (data.photo_row.length + files.length + data.newPhotos.length <= 6) {
          setData({
            ...data,
            newPhotos: [...data.newPhotos, ...files],
          });
          document.getElementById("photos_error").style.display = "none";
        } else {
          setImgCountErr(true);
        }
      } else {
        setImgCountErr(true);
      }
    } catch {}
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
          .post(
            `${domain}/api/user/updateCoverPupdateCoverPicServiceCenteric`,
            formData,
            config
          )
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

  const updateProfileImg = (e) => {
    let file = e.target.files[0];
    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      if (img.width >= 150 && img.height >= 150) {
        let formData = new FormData();
        formData.append("file", file);
        axios
          .post(
            `${domain}/api/user/updateProfilePicServiceCenter`,
            formData,
            config
          )
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

  const handleChange1 = (address) => {
    setData({
      ...data,
      address: address,
    });
    document.getElementById(`address_error`).style.display = "none";
  };

  const handleSelect = (address) => {
    console.log(address);
    setData({
      ...data,
      address: address,
    });

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
    document.getElementById(`address_error`).style.display = "none";
  };

  const addHolidays = (id) => {
    if (edit) {
      var week_day = data.week_days[id];
      if (!data.holidays.includes(week_day)) {
        var holidays = data.holidays;
        holidays.push(week_day);
        setData({ ...data, holidays: holidays });
      } else {
        var holidays = data.holidays;
        holidays.splice(holidays.indexOf(data.week_days[id]), 1);
        setData({ ...data, holidays: holidays });
      }
    }
  };

  const removeBrand = (id) => {
    if (edit) {
      var brands = data.brands;
      var newSuggestedBrands = suggestedBrands;
      newSuggestedBrands.push(brands.splice(id, 1)[0]);
      setData({
        ...data,
        brands: brands,
      });
      setSuggestedBrands(newSuggestedBrands);
    }
  };

  const editHandler = () => {
    setEdit(true);
    setTimeout(() => {
      document.getElementById(`full_name`).focus();
    }, 10);
  };

  const saveChanges = () => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    var error = false;
    var focusField = "";
    var fields = [
      "full_name",
      "email",
      "phone",
      "center_name",
      "centerPhone",
      "centerEmail",
      "address",
      "streetName",
      "establishedYear",
      "workingFrom",
      "workingTill",
      "description",
      "brands",
      "photo_row",
    ];

    for (var i = 0; i < fields.length; i++) {
      if (fields[i] !== "brands" && fields[i] !== "photo_row") {
        if (data[fields[i]] === "") {
          error = true;
          document.getElementById(`${fields[i]}_error`).style.display =
            "contents";
          console.log(focusField);
          if (focusField === "") {
            focusField = fields[i];
          }
        } else {
          if ((fields[i] === "full_name" && data.full_name.length > 100) || (fields[i] === "center_name" && data.center_name.length > 100)) {
            error = true;
            document.getElementById(`${fields[i]}_error`).innerText = "Name must be between 2 and 100 characters"
            document.getElementById(`${fields[i]}_error`).style.display = "contents";
            console.log(focusField);
            if (focusField === "") {
              focusField = fields[i];
            }
          }
          if((fields[i] === "email" && !validateEmail(data.email)) || (fields[i] === "centerEmail" && !validateEmail(data.centerEmail))){
            error = true;
            document.getElementById(`${fields[i]}_error`).innerText = "Email ID is not valid"
            document.getElementById(`${fields[i]}_error`).style.display = "contents";
            console.log(focusField);
            if (focusField === "") {
              focusField = fields[i];
            }
          }
          if ((fields[i] === "phone" && data.phone.length !== 10) || (fields[i] === "centerPhone" && data.centerPhone.length !== 10)){
            error = true;
            document.getElementById(`${fields[i]}_error`).innerText = "Phone number must have 10 digits"
            document.getElementById(`${fields[i]}_error`).style.display = "contents";
            console.log(focusField);
            if (focusField === "") {
              focusField = fields[i];
            }
          }
          if ((fields[i] === "streetName" && data.streetName.length > 100) ) {
            error = true;
            document.getElementById(`${fields[i]}_error`).innerText = "Street name must be between 2 and 100 characters"
            document.getElementById(`${fields[i]}_error`).style.display = "contents";
            console.log(focusField);
            if (focusField === "") {
              focusField = fields[i];
            }
          }
          if ((fields[i] === "establishedYear" && data.establishedYear > 2022) || (fields[i] === "establishedYear" && data.establishedYear < 0)) {
            error = true;
            document.getElementById(`${fields[i]}_error`).innerText = "Invalid year"
            document.getElementById(`${fields[i]}_error`).style.display = "contents";
            console.log(focusField);
            if (focusField === "") {
              focusField = fields[i];
            }
          }
          if ((fields[i] === "description" && data.description.length > 500) || (fields[i] === "description" && data.description.length < 200) ) {
            error = true;
            document.getElementById(`${fields[i]}_error`).innerText = "Description must be between 200 and 500 characters"
            document.getElementById(`${fields[i]}_error`).style.display = "contents";
            console.log(focusField);
            if (focusField === "") {
              focusField = fields[i];
            }
          }
        }
      } else {
        if (fields[i] === "brands" && data.brands.length === 0) {
          error = true;
          document.getElementById(`brand_error`).style.display = "contents";
          if (focusField === "") {
            focusField = "brand";
          }
        }
        if (
          fields[i] === "photo_row" &&
          data.photo_row.length + data.newPhotos.length === 0
        ) {
          error = true;
          document.getElementById(`photos_error`).style.display = "contents";
        }
      }
    }

    if (data.website.length > 100){
      error = true
      document.getElementById("website_error").style.display = "contents"
      if (focusField === ""){
        focusField = "website"
      }
    }
    if (error) {
      if (focusField !== "") {
        console.log(focusField);
        document.getElementById(focusField).focus();
      }
      focusField = "";
    } else {
      var formData = new FormData();
      formData.append("userName", data.full_name);
      formData.append("userEmail", data.email);
      formData.append("email", data.centerEmail);
      formData.append("userPhone", data.phone);
      formData.append("phoneNo", data.centerPhone);
      formData.append("secondaryNumber", data.secondaryPhoneNo);
      formData.append("whatsappNo", data.whatsappNo);
      formData.append("website", data.website);
      formData.append("address", data.address);
      formData.append("description", data.description);
      formData.append("holidays", data.holidays);
      formData.append("brandOfDrones", data.brands);
      formData.append("oldImages", data.photo_row);
      data.newPhotos.forEach((file) => {
        formData.append("file", file);
      });
      formData.append("centerName", data.center_name);
      formData.append("streetName", data.streetName);
      // if (data.secondaryPhoneNo !== ""){
      //   formData.append("secondaryNumber", data.secondaryPhoneNo);
      // }
      // if (data.whatsappNo !== ""){
      //   formData.append("whatsappNo", data.whatsappNo);
      // }
      // if (data.website !== ""){
      //   formData.append("website", data.website);
      // }
      formData.append("establishedYear", data.establishedYear);
      formData.append(
        "workingHours",
        data.workingFrom + " - " + data.workingTill
      );
      setSaving(true)
      axios
        .post(`${domain}/api/center/updateData`, formData, config)
        .then((res) => {
          setUpdateSuccess(true)
          setSaving(false)
        })
        .catch(err=>{
          setSaving(false)
          setUpdateFailed(true)
        })
        ;
    }
  };
  

  return (
    <>
      <Helmet>
        <title>Service center dashboard</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>
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
          <label
            htmlFor="full_name"
            className="pd_b_i_profile_head"
            style={{ cursor: "pointer" }}
          >
            Name
          </label>
          <input
            type="text"
            className="pd_b_i_profile_input"
            value={data.full_name}
            id="full_name"
            onChange={changeHandler}
            disabled={!edit}
          />
          <div className="login_input_error_msg" id="full_name_error">
            Name is required
          </div>
        </div>
        <Row>
          <Col>
            <div>
              <div>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="email">
                    <div
                      className="pd_b_i_profile_head1"
                      style={{ cursor: "pointer" }}
                    >
                      Email ID
                    </div>
                  </label>
                  {data.userEmail === localStorage.getItem("oldEmail") ? (
                    <div className="pd_b_i_profile_verify">Verify</div>
                    ) : ( <></>
                  )}
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
              <div className="login_input_error_msg" id="email_error">
                Email ID is required
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <div className={All.FormGroup}>
                <label className="pd_b_i_profile_head" for="phone">
                  Phone Number{" "}
                </label>
                <input
                  type="text"
                  name="phone"
                  className="pd_b_i_profile_input"
                  id="phone"
                  value={`${data.code} ${data.phone}`}
                  onChange={phoneChangeHandler}
                  autoComplete={false}
                  disabled={!edit}
                  style={{ marginTop: "5px" }}
                />
                <div className="login_input_error_msg" id="phone_error">
                  Phone number is required
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className="pd_b_i_profile_titleBox">
          <div className="pd_b_i_profile_title">Center Information</div>
        </div>
        <div>
          <label
            htmlFor="center_name"
            className="pd_b_i_profile_head"
            style={{ cursor: "pointer" }}
          >
            Service center name
          </label>
          <input
            type="text"
            className="pd_b_i_profile_input"
            id="center_name"
            onChange={(e) => {
              setData({ ...data, center_name: e.target.value });
              document.getElementById("center_name_error").style.display =
                "none";
            }}
            value={data.center_name}
            disabled={!edit}
          />
          <div className="login_input_error_msg" id="center_name_error">
            Service center name is required
          </div>
        </div>
        <Row>
          <Col lg={6}>
            <div className={All.FormGroup}>
              <label
                className="pd_b_i_profile_head"
                for="centerPhone"
                style={{ cursor: "pointer" }}
              >
                Center Phone Number{" "}
              </label>
              <input
                type="text"
                name="center_phone"
                className="pd_b_i_profile_input"
                id="centerPhone"
                value={`${data.code} ${data.centerPhone}`}
                onChange={centerPhoneChangeHandler}
                autoComplete={false}
                disabled={!edit}
              />
              <div className="login_input_error_msg" id="centerPhone_error">
                Center phone number is required
              </div>
            </div>
          </Col>

          <Col>
            <div>
              <div>
                <div style={{ marginBottom: "15px" }}>
                  <label
                    htmlFor="centerEmail"
                    className="pd_b_i_profile_head1"
                    style={{ cursor: "pointer" }}
                  >
                    Center Email ID
                  </label>
                </div>
              </div>
              <input
                type="email"
                className="pd_b_i_profile_input"
                name="center_email"
                id="centerEmail"
                onChange={(e) => {
                  setData({ ...data, centerEmail: e.target.value });
                  document.getElementById("centerEmail_error").style.display =
                    "none";
                }}
                value={data.centerEmail}
                disabled={!edit}
              />
              <div className="login_input_error_msg" id="centerEmail_error">
                Email ID is required
              </div>
            </div>
          </Col>
        </Row>
        <div>
          <label
            htmlFor="address"
            className="pd_b_i_profile_head"
            style={{ cursor: "pointer" }}
          >
            Address
          </label>

          <PlacesAutocomplete
            value={data.address}
            onChange={handleChange1}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div style={{ position: "relative" }}>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input pd_b_i_profile_input",
                  })}
                  style={{
                    height: "38px",
                    backgroundColor: "#f5f5f7",
                    borderRadius: "5px",
                    border: "1px solid white",
                    outline: "none",
                    fontSize: "16px",
                  }}
                  id="address"
                  disabled={!edit}
                />
                {suggestions.length > 0 && (
                  <div
                    className="autocomplete-dropdown-container"
                    style={{
                      width: "calc(100% - 40px)",

                      position: "absolute",
                      top: "calc(100% - 30px)",
                      zIndex: 1000,
                      fontFamily: "muli-light",
                      fontSize: "16px",
                      border: suggestions.length === 0 ? "" : "1px solid grey",
                      overflow: "hidden",
                      borderEndStartRadius: "10px",
                      borderEndEndRadius: "10px",
                      background: "white",
                    }}
                  >
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? {
                            backgroundColor: "#e1e1e1",
                            cursor: "pointer",
                            padding: "10px 20px",
                          }
                        : {
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                            padding: "10px 20px",
                          };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </PlacesAutocomplete>
          <div className="login_input_error_msg" id="address_error">
            Address is required
          </div>
        </div>
        <Row>
          <Col xl={6}>
            <div>
              <label
                htmlFor="streetName"
                className="pd_b_i_profile_head"
                style={{ cursor: "pointer" }}
              >
                Building No. / Street name
              </label>
              <input
                type="text"
                className="pd_b_i_profile_input"
                id="streetName"
                onChange={(e) => {
                  setData({ ...data, streetName: e.target.value });
                  document.getElementById("streetName_error").style.display =
                    "none";
                }}
                value={data.streetName}
                disabled={!edit}
              />
              <div className="login_input_error_msg" id="streetName_error">
                Building No. / Street name is required
              </div>
            </div>
          </Col>
          <Col xl={6}>
            <div>
              <label
                htmlFor="establishedYear"
                className="pd_b_i_profile_head"
                style={{ cursor: "pointer" }}
              >
                Established Year
              </label>
              <input
                type="number"
                className="pd_b_i_profile_input"
                id="establishedYear"
                onChange={(e) => {
                  setData({ ...data, establishedYear: e.target.value });
                  document.getElementById(
                    "establishedYear_error"
                  ).style.display = "none";
                }}
                value={data.establishedYear}
                disabled={!edit}
              />
              <div className="login_input_error_msg" id="establishedYear_error">
                Established year is required
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <div>
              <label
                htmlFor="workingFrom"
                className="pd_b_i_profile_head"
                style={{ cursor: "pointer" }}
              >
                Working From
              </label>
              <input
                type="time"
                className="pd_b_i_profile_input"
                id="workingFrom"
                name="workingFrom"
                onChange={(e) => {
                  setData({ ...data, workingFrom: e.target.value });
                  document.getElementById("workingFrom_error").style.display =
                    "none";
                }}
                value={data.workingFrom}
                disabled={!edit}
              />
              <div className="login_input_error_msg" id="workingFrom_error">
                Working from is required
              </div>
            </div>
          </Col>
          <Col xs={6}>
            <div>
              <label
                htmlFor="workingTill"
                className="pd_b_i_profile_head"
                style={{ cursor: "pointer" }}
              >
                Working Till
              </label>
              <input
                type="time"
                className="pd_b_i_profile_input"
                id="workingTill"
                onChange={(e) => {
                  setData({ ...data, workingTill: e.target.value });
                  document.getElementById("workingTill_error").style.display =
                    "none";
                }}
                value={data.workingTill}
                disabled={!edit}
              />
              <div className="login_input_error_msg" id="workingTill_error">
                Working till is required
              </div>
            </div>
          </Col>
        </Row>
        <div>
          <label htmlFor="holidays_input" className="pd_b_i_profile_head">
            Working days (Click to select holidays)
          </label>
          <div className="s_c_a_brand_container">
            {data.week_days.map((day, index) => {
              return (
                <div
                  key={index}
                  className="s_c_a_brand"
                  onClick={() => addHolidays(index)}
                  style={{
                    background: data.holidays.includes(day)
                      ? "#ff4444"
                      : "#4ffea3",
                    color: "black",
                  }}
                >
                  {day}{" "}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <label
            htmlFor="brand"
            className="pd_b_i_profile_head"
            style={{ cursor: "pointer" }}
          >
            Brand of Drones
          </label>
          <input
            type="text"
            className="pd_b_i_profile_input"
            id="brand"
            onChange={(e) => setData({ ...data, brand: e.target.value })}
            onKeyDown={addBrand}
            placeholder="Type and click Enter to add"
            value={data.brand}
            disabled={!edit}
          />
          <div className="login_input_error_msg" id="brand_error">
            Select atleast one brand
          </div>
        </div>

        {data.brands.length > 0 && (
          <div className="s_c_a_brand_container">
            {data.brands.map((brand, index) => {
              return (
                <div className="s_c_a_brand" onClick={() => removeBrand(index)}>
                  {brand}{" "}
                  <i
                    class="fa fa-times"
                    aria-hidden="true"
                    style={{ marginLeft: "20px" }}
                  ></i>
                </div>
              );
            })}
          </div>
        )}

        {suggestedBrands.length > 0 && (
          <div>
            <div className="pd_b_i_profile_head">Suggested brands</div>
            <div className="s_c_a_brand_container">
              {suggestedBrands.map((brand, index) => {
                return (
                  <div
                    className="s_c_a_brand"
                    onClick={() => selectSuggestedBrand(index)}
                  >
                    {brand}{" "}
                    <i
                      class="fa fa-plus"
                      aria-hidden="true"
                      style={{ marginLeft: "20px" }}
                    ></i>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="description"
            className="pd_b_i_profile_head"
            style={{ cursor: "pointer" }}
          >
            Description
          </label>
          <textarea
            type="text"
            className="pd_b_i_profile_inputDesc"
            id="description"
            placeholder="Write description about your service center"
            style={{ marginBottom: "30px" }}
            onChange={(e) => {
              setData({ ...data, description: e.target.value });
              document.getElementById("description_error").style.display =
                "none";
            }}
            value={data.description}
            disabled={!edit}
          ></textarea>
          <div className="login_input_error_msg" id="description_error">
            Description is required
          </div>
        </div>
        <Row>
          <Col lg={6}>
            <div className={All.FormGroup}>
              <label
                className="pd_b_i_profile_head"
                for="secondaryPhone"
                style={{ cursor: "pointer" }}
              >
                Secondary Phone Number <span>(Optional)</span>{" "}
              </label>
              <input
                type="text"
                name="center_phone"
                className="pd_b_i_profile_input"
                id="secondaryPhone"
                value={`${data.code} ${data.secondaryPhoneNo}`}
                onChange={centerSecondaryNoChangeHandler}
                autoComplete={false}
                disabled={!edit}
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className={All.FormGroup}>
              <label
                className="pd_b_i_profile_head"
                for="whatsappNo"
                style={{ cursor: "pointer" }}
              >
                Whatsapp Number <span>(Optional)</span>{" "}
              </label>
              <input
                type="text"
                name="center_phone"
                className="pd_b_i_profile_input"
                id="whatsappNo"
                value={`${data.code} ${data.whatsappNo}`}
                onChange={centerWhatsappNoChangeHandler}
                autoComplete={false}
                disabled={!edit}
              />
            </div>
          </Col>
        </Row>
        <div>
          <label
            htmlFor="website"
            className="pd_b_i_profile_head"
            style={{ cursor: "pointer" }}
          >
            Website <span>(Optional)</span>
          </label>
          <input
            type="text"
            className="pd_b_i_profile_input"
            value={data.website}
            id="website"
            onChange={(e) => {
              setData({
                ...data,
                website: e.target.value,
              });
              document.getElementById("website_error").style.display = "none";
            }}
            disabled={!edit}
          />
        </div>
        <div className="login_input_error_msg" id="website_error">
          Website maximum 100 characters
        </div>
        <div className="s_c_a_photos">
          <label htmlFor="photo_input">
            <div className="pd_b_i_profile_head" style={{ cursor: "pointer" }}>
              Photos
            </div>
          </label>

          <div className="s_c_a_photos_container">
            {data.photo_row.map((photo, index) => {
              return (
                <div
                  className="s_c_a_photo"
                  key={index}
                  onMouseOver={() =>
                    showRemoveIcon(`s_c_a_remove_img_${index}`)
                  }
                  onMouseLeave={() =>
                    hideRemoveIcon(`s_c_a_remove_img_${index}`)
                  }
                >
                  <img src={photo} alt="" className="s_c_a_photo_img" />
                  <img
                    src={deleteIcon}
                    alt=""
                    className="s_c_a_remove_img"
                    id={`s_c_a_remove_img_${index}`}
                    onClick={() => removePhoto(index)}
                  />
                </div>
              );
            })}

            {data.newPhotos.map((photo, index) => {
              return (
                <div
                  className="s_c_a_photo"
                  key={index}
                  onMouseOver={() =>
                    newShowRemoveIcon(`s_c_a_remove_new_img_${index}`)
                  }
                  onMouseLeave={() =>
                    newHideRemoveIcon(`s_c_a_remove_new_img_${index}`)
                  }
                >
                  <img
                    src={URL.createObjectURL(photo)}
                    alt=""
                    className="s_c_a_photo_img"
                  />
                  <img
                    src={deleteIcon}
                    alt=""
                    className="s_c_a_remove_img"
                    id={`s_c_a_remove_new_img_${index}`}
                    onClick={() => removeNewPhoto(index)}
                  />
                </div>
              );
            })}

            <input
              type="file"
              name=""
              id="photo_input"
              style={{ display: "none" }}
              onChange={addPhoto}
              accept="image/*"
              multiple
              disabled={!edit}
            />
            {data.photo_row.length + data.newPhotos.length < 6 && (
              <label htmlFor="photo_input" className="s_c_a_photo_add">
                <div className="s_c_a_photo_add_symbol">
                  <img src={plusicon} alt="" className="s_c_a_plus_icon" />
                </div>
                <div className="s_c_a_photo_add_text">Add photos</div>
              </label>
            )}
          </div>
        </div>
        <div className="login_input_error_msg" id="photos_error">
          Photos is required
        </div>
        {edit && (
          <div className="pd_b_i_notifications_save">
            {saving ? (
              <button
                className="pd_b_i_notifications_saveBtn"
                style={{ display: "flex" }}
              >
                <Loader /> Saving
              </button>
            ) : (
              <button
                className="pd_b_i_notifications_saveBtn"
                onClick={saveChanges}
              >
                Save Changes
              </button>
            )}
          </div>
        )}
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
        <Dialog
          open={imgCountErr}
          onClose={() => setImgCountErr(false)}
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
                onClick={() => setImgCountErr(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">
                You cannot Upload more than 6 images
              </div>
              <div className="u_f_popup_btn_container">
                <button
                  className="u_f_popup_btn2"
                  onClick={() => setImgCountErr(false)}
                >
                  Close
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
        <Dialog
          open={fileExcluded}
          onClose={() => setFileExcluded(false)}
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
                onClick={() => setFileExcluded(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">
                We removed some files because those file size exceeds 2MB.
              </div>
              <div className="u_f_popup_btn_container">
                <button
                  className="u_f_popup_btn2"
                  onClick={() => setFileExcluded(false)}
                >
                  Close
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
        <Dialog
            open={updateFailed}
            onClose={() => setUpdateFailed(false)}
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
                  onClick={() => setUpdateFailed(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Row style={{ marginTop: "30px" }}>
                <div className="u_f_popup_title">
                  Something went wrong. Try again.
                </div>
                <div className="u_f_popup_btn_container">
                  <button
                    className="u_f_popup_btn2"
                    onClick={() => setUpdateFailed(false)}
                  >
                    Close
                  </button>
                </div>
              </Row>
            </DialogContent>
          </Dialog>
        <Dialog
            open={updateSuccess}
            onClose={() => setUpdateSuccess(false)}
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
                  onClick={() => setUpdateSuccess(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Row style={{ marginTop: "30px" }}>
                <div className="u_f_popup_title">
                  Account updated successfully
                </div>
                <div className="u_f_popup_btn_container">
                  <button
                    className="u_f_popup_btn2"
                    onClick={() => setUpdateSuccess(false)}
                  >
                    Close
                  </button>
                </div>
              </Row>
            </DialogContent>
          </Dialog>
      </div>
    </>
  );
}

export default Center_BasicInfo;
