import React, { Component } from "react";
import All from "../website/All.module.css";
import { Container, Row, Col, Hidden } from "react-grid-system";
import "./pilot_dashboard/css/Pilot_BasicInfo.css";
import "../css/ServiceCenterAccount.css";
import plusicon from "../images/s_d_a_plus_icon.png";
import deleteIcon from "./company_dashboard/images/c_j_bin.png";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";
import Dialog from "@material-ui/core/Dialog";
import Close from "../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

const domain = process.env.REACT_APP_MY_API;

const customStyles = {
  container: (provided) => ({
    ...provided,
    height: 50,
  }),
};

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

let config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  },
};

class CreateServiceCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      photo_row: [],
      service_center_name: "",
      email: "",
      phone: "",
      code: "+91",
      address: "",
      building_no: "",
      established_year: "",
      working_from: "",
      working_till: "",
      brand: "",
      brands: [],
      description: "",
      focusField: "",
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
      suggestedBrands: ["Brand1", "Brand2", "Brand3"],
      imgCountErr: false,
      fileSizeExceed: false,
    };
  }

  addPhoto = (e) => {
    try {
      if (this.state.photo_row.length + e.target.files.length <= 6) {
        for (var i = 0; i < e.target.files.length; i++) {
          console.log(i);
          if (e.target.files[i].size / 1000000 <= 2) {
            var file = e.target.files[i];
            var photos_row = this.state.photo_row;
            photos_row.push(file);
            this.setState({
              photo_row: photos_row,
            });
            this.refs.add_photo.value = "";
            document.getElementById("photos_error").style.display = "none";
          }
          else{
            this.setState({
              fileSizeExceed: true
            })
          }
        }
      } else {
        this.setState({
          imgCountErr: true,
        });
      }
    } catch {}
  };

  showRemoveIcon = (id) => {
    document.getElementById(id).style.visibility = "visible";
  };

  hideRemoveIcon = (id) => {
    document.getElementById(id).style.visibility = "hidden";
  };

  removePhoto = (id) => {
    var photos = this.state.photos;
    photos.splice(id, 1);
    this.setState({
      photos: photos,
    });
  };

  handleChange = (e, field) => {
    document.getElementById(`${field}_error`).style.display = "none";
    this.setState({
      [field]: e.target.value,
    });
    console.log(this.state);
  };

  phoneChangeHandler = (e) => {
    try {
      if (
        Number(
          e.target.value.slice(
            this.state.code.length + 1,
            10 + this.state.code.length + 1
          )
        ) ||
        e.target.value.slice(
          this.state.code.length + 1,
          10 + this.state.code.length + 1
        ) === ""
      ) {
        this.setState({
          phone: e.target.value.slice(
            this.state.code.length + 1,
            10 + this.state.code.length + 1
          ),
        });
        document.getElementById("phone_error").style.display = "none";
      }
    } catch {
      console.log("Not number");
    }
  };

  addHolidays = (id) => {
    var week_day = this.state.week_days[id];
    if (!this.state.holidays.includes(week_day)) {
      var holidays = this.state.holidays;
      holidays.push(week_day);
      this.setState({
        holidays: holidays,
      });
    } else {
      var holidays = this.state.holidays;
      holidays.splice(holidays.indexOf(this.state.week_days[id]), 1);
      this.setState({
        holidays: holidays,
      });
    }
  };

  saveChanges = () => {
    console.log("Submit");
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    var fields = [
      "service_center_name",
      "phone",
      "email",
      "address",
      "building_no",
      "established_year",
      "working_from",
      "working_till",
      "brands",
      "description",
      "photos",
    ];
    var focusField = "";

    var error = false;

    for (var i = 0; i < fields.length; i++) {
      if (fields[i] !== "brands" && fields[i] !== "photos") {
        if (this.state[fields[i]] === "") {
          document.getElementById(`${fields[i]}_error`).style.display =
            "contents";
          error = true;
          if (focusField === "") {
            focusField = `${fields[i]}`;
          }
        }
      } else {
        if (fields[i] === "brands" && this.state.brands.length <= 0) {
          document.getElementById(`brand_error`).style.display = "contents";
          if (focusField === "") {
            focusField = "brand";
          }
        }
        if (fields[i] === "photos" && this.state.photo_row.length <= 0) {
          document.getElementById(`photos_error`).style.display = "contents";
          error = true;
        }
      }
      if (
        fields[i] === "service_center_name" &&
        this.state.service_center_name.length > 100
      ) {
        document.getElementById(`service_center_name_error`).style.display =
          "contents";
        document.getElementById(`service_center_name_error`).innerText =
          "Center name maximum 100 characters";
        error = true;
        if (focusField === "") {
          focusField = "service_center_name";
        }
      }
      if (
        fields[i] === "building_no" &&
        this.state.building_no.length > 100
      ) {
        document.getElementById(`building_no_error`).style.display =
          "contents";
        document.getElementById(`building_no_error`).innerText =
          "Building No. / Street name maximum 100 characters";
        error = true;
        if (focusField === "") {
          focusField = "building_no";
        }
      }
      if (
        fields[i] === "established_year" &&
        this.state.established_year > 2022
      ) {
        document.getElementById(`established_year_error`).style.display =
          "contents";
        document.getElementById(`established_year_error`).innerText =
          "Invalid year";
        error = true;
        if (focusField === "") {
          focusField = "established_year";
        }
      }
      if (fields[i] === "description" && (this.state.description.length < 200 || this.state.description.length > 500)){
        document.getElementById(`description_error`).style.display =
          "contents";
        document.getElementById(`description_error`).innerText =
          "Description minimum 200 characters and maximum 500 characters";
        error = true;
        if (focusField === "") {
          focusField = "description";
        }
      }
      if (
        fields[i] === "phone" &&
        this.state.phone.length < 10 &&
        this.state.phone.length !== 0
      ) {
        document.getElementById(`phone_error`).innerHTML =
          "Phone number must have 10 characters";
        document.getElementById(`phone_error`).style.display = "contents";
        error = true;
        if (focusField === "") {
          focusField = "phone";
        }
      }

      if (
        fields[i] === "email" &&
        !validateEmail(this.state.email) &&
        this.state.email !== ""
      ) {
        document.getElementById(`email_error`).innerText =
          "Email ID is not valid";
        document.getElementById(`email_error`).style.display = "contents";
        error = true;
        if (focusField === "") {
          focusField = "email";
        }
      }
    }

    if (focusField !== "") {
      console.log(document.getElementById(`email_error`).innerText);
      console.log(focusField);
      document.getElementById(focusField).focus();
      focusField = "";
    }

    if (!error) {
      var formData = new FormData();

      formData.append("centerName", this.state.service_center_name);
      formData.append("phoneNo", this.state.phone);
      formData.append("email", this.state.email);
      formData.append("address", this.state.address);
      formData.append("streetName", this.state.building_no);
      formData.append("establishedYear", this.state.established_year);
      formData.append(
        "workingHours",
        `${this.state.working_from} - ${this.state.working_till}`
      );
      formData.append("brandOfDrones", this.state.brands);
      formData.append("description", this.state.description);
      this.state.photo_row.forEach((file) => {
        formData.append("file", file);
      });
      // formData.append("file", this.state.photos);
      formData.append("holidays", this.state.holidays);
      axios
        .post(`${domain}/api/center/createServiceCenter`, formData, config)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  addBrand = (e) => {
    console.log(this.state.suggestedBrands);
    if (e.key === "Enter") {
      if (
        !this.state.brands.includes(this.state.brand) &&
        !this.state.suggestedBrands.includes(this.state.brand)
      ) {
        this.setState((prevState) => ({
          brands: [...prevState.brands, prevState.brand],
          brand: "",
        }));
        document.getElementById(`brand_error`).style.visibility = "hidden";
      }
    }
  };

  selectSuggestedBrand = (id) => {
    var brands = this.state.brands;
    var suggestedBrands = this.state.suggestedBrands;
    brands.push(suggestedBrands.splice(id, 1)[0]);
    this.setState({
      brands: brands,
      suggestedBrands: suggestedBrands,
    });
    document.getElementById("brand_error").style.display = "none";
  };

  removeBrand = (id) => {
    var brands = this.state.brands;
    var suggestedBrands = this.state.suggestedBrands;
    suggestedBrands.push(brands.splice(id, 1)[0]);
    this.setState({
      brands: brands,
      suggestedBrands: suggestedBrands,
    });
  };

  render() {
    return (
      <>
        <Container
          className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}
        >
          <Row>
            <Col lg={6} className={All.DronePerson}>
              <Hidden xs sm md>
                <div className="backgroundImginPage"></div>
              </Hidden>
            </Col>
            <Col lg={6}>
              <div className="pd_b_i_profile_titleBox">
                <div
                  className="pd_b_i_profile_title"
                  style={{ fontSize: "20px" }}
                >
                  Welcome almost done, Please fill below fields to complete your
                  profile setup
                </div>
              </div>

              <div>
                <label
                  htmlFor="service_center_name"
                  className="pd_b_i_profile_head"
                >
                  Service center name
                </label>
                <input
                  type="text"
                  className="pd_b_i_profile_input"
                  id="service_center_name"
                  onChange={(e) => this.handleChange(e, "service_center_name")}
                />
                <div
                  className="login_input_error_msg"
                  id="service_center_name_error"
                >
                  Service center name is required
                </div>
              </div>
              <Row>
                <Col lg={6}>
                  <div className={All.FormGroup}>
                    <label className="pd_b_i_profile_head" for="phone">
                      Phone Number{" "}
                    </label>
                    <input
                      type="text"
                      name="phone"
                      className="pd_b_i_profile_input"
                      id="phone"
                      value={`${this.state.code} ${this.state.phone}`}
                      onChange={this.phoneChangeHandler}
                      autoComplete={false}
                    />
                    <div className="login_input_error_msg" id="phone_error">
                      Phone number is required
                    </div>
                  </div>
                </Col>

                <Col>
                  <div>
                    <div>
                      <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="email" className="pd_b_i_profile_head1">
                          Center Email ID
                        </label>
                      </div>
                    </div>
                    <input
                      type="email"
                      className="pd_b_i_profile_input"
                      name="email"
                      id="email"
                      onChange={(e) => this.handleChange(e, "email")}
                    />
                    <div className="login_input_error_msg" id="email_error">
                      Email ID is required
                    </div>
                  </div>
                </Col>
              </Row>
              <div>
                <label htmlFor="address" className="pd_b_i_profile_head">
                  Address
                </label>
                <input
                  type="text"
                  className="pd_b_i_profile_input"
                  id="address"
                  onChange={(e) => this.handleChange(e, "address")}
                />
                <div className="login_input_error_msg" id="address_error">
                  Address is required
                </div>
              </div>
              <Row>
                <Col xl={6}>
                  <div>
                    <label
                      htmlFor="building_no"
                      className="pd_b_i_profile_head"
                    >
                      Building No. / Street name
                    </label>
                    <input
                      type="text"
                      className="pd_b_i_profile_input"
                      id="building_no"
                      onChange={(e) => this.handleChange(e, "building_no")}
                    />
                    <div
                      className="login_input_error_msg"
                      id="building_no_error"
                    >
                      Building No. / Street name is required
                    </div>
                  </div>
                </Col>
                <Col xl={6}>
                  <div>
                    <label
                      htmlFor="established_year"
                      className="pd_b_i_profile_head"
                    >
                      Established Year
                    </label>
                    <input
                      type="number"
                      className="pd_b_i_profile_input"
                      id="established_year"
                      onChange={(e) => this.handleChange(e, "established_year")}
                    />
                    <div
                      className="login_input_error_msg"
                      id="established_year_error"
                    >
                      Established year is required
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <div>
                    <label
                      htmlFor="working_from"
                      className="pd_b_i_profile_head"
                    >
                      Working From
                    </label>
                    <input
                      type="time"
                      className="pd_b_i_profile_input"
                      id="working_from"
                      name="working_from"
                      onChange={(e) => this.handleChange(e, "working_from")}
                    />
                    <div
                      className="login_input_error_msg"
                      id="working_from_error"
                    >
                      Working from is required
                    </div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div>
                    <label
                      htmlFor="working_till"
                      className="pd_b_i_profile_head"
                    >
                      Working Till
                    </label>
                    <input
                      type="time"
                      className="pd_b_i_profile_input"
                      id="working_till"
                      onChange={(e) => this.handleChange(e, "working_till")}
                    />
                    <div
                      className="login_input_error_msg"
                      id="working_till_error"
                    >
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
                  {this.state.week_days.map((day, index) => {
                    return (
                      <div
                        key={index}
                        className="s_c_a_brand"
                        onClick={() => this.addHolidays(index)}
                        style={{
                          background: this.state.holidays.includes(day)
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
                <label htmlFor="brand" className="pd_b_i_profile_head">
                  Brand of Drones
                </label>
                <input
                  type="text"
                  className="pd_b_i_profile_input"
                  id="brand"
                  onChange={(e) => this.handleChange(e, "brand")}
                  onKeyDown={this.addBrand}
                  placeholder="Type and click Enter to add"
                  value={this.state.brand}
                />
                <div className="login_input_error_msg" id="brand_error">
                  Brand of Drones is required
                </div>
              </div>

              {this.state.brands.length > 0 && (
                <div className="s_c_a_brand_container">
                  {this.state.brands.map((brand, index) => {
                    return (
                      <div
                        className="s_c_a_brand"
                        onClick={() => this.removeBrand(index)}
                      >
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

              {this.state.suggestedBrands.length > 0 && (
                <div>
                  <div className="pd_b_i_profile_head">Suggested brands</div>
                  <div className="s_c_a_brand_container">
                    {this.state.suggestedBrands.map((brand, index) => {
                      return (
                        <div
                          className="s_c_a_brand"
                          onClick={() => this.selectSuggestedBrand(index)}
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
                  htmlFor="description_input"
                  className="pd_b_i_profile_head"
                >
                  Description
                </label>
                <textarea
                  type="text"
                  className="pd_b_i_profile_inputDesc"
                  id="description"
                  placeholder="Write description about your service center"
                  style={{ marginBottom: "30px" }}
                  onChange={(e) => this.handleChange(e, "description")}
                ></textarea>
                <div className="login_input_error_msg" id="description_error">
                  Description is required
                </div>
              </div>
              <div className="s_c_a_photos">
                <label htmlFor="photo_input">
                  <div
                    className="pd_b_i_profile_head"
                    style={{ cursor: "pointer" }}
                  >
                    Photos
                  </div>
                </label>

                <div className="s_c_a_photos_container">
                  {this.state.photo_row.map((photo, index) => {
                    return (
                      <div
                        className="s_c_a_photo"
                        key={index}
                        onMouseOver={() =>
                          this.showRemoveIcon(`s_c_a_remove_img_${index}`)
                        }
                        onMouseLeave={() =>
                          this.hideRemoveIcon(`s_c_a_remove_img_${index}`)
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
                          id={`s_c_a_remove_img_${index}`}
                          onClick={() => this.removePhoto(index)}
                        />
                      </div>
                    );
                  })}

                  <input
                    type="file"
                    name=""
                    id="photo_input"
                    style={{ display: "none" }}
                    onChange={this.addPhoto}
                    ref="add_photo"
                    accept="image/*"
                    multiple
                  />
                  {this.state.photo_row.length < 6 && (
                    <label htmlFor="photo_input" className="s_c_a_photo_add">
                      <div className="s_c_a_photo_add_symbol">
                        <img
                          src={plusicon}
                          alt=""
                          className="s_c_a_plus_icon"
                        />
                      </div>
                      <div className="s_c_a_photo_add_text">Add photos</div>
                    </label>
                  )}
                </div>
              </div>
              <div className="login_input_error_msg" id="photos_error">
                Photos is required
              </div>
              <div className="pd_b_i_notifications_save">
                <button
                  className="pd_b_i_notifications_saveBtn"
                  onClick={this.saveChanges}
                >
                  Save Changes
                </button>
              </div>
            </Col>
          </Row>
          <Dialog
            open={this.state.imgCountErr}
            onClose={() => this.setState({ imgCountErr: false })}
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
                  onClick={() => this.setState({ imgCountErr: false })}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Row style={{ marginTop: "30px" }}>
                <div className="u_f_popup_title">
                  You cannot select more than 6 images
                </div>
                <div className="u_f_popup_btn_container">
                  <button
                    className="u_f_popup_btn2"
                    onClick={() => this.setState({ imgCountErr: false })}
                  >
                    Close
                  </button>
                </div>
              </Row>
            </DialogContent>
          </Dialog>
          <Dialog
            open={this.state.fileSizeExceed}
            onClose={() => this.setState({ fileSizeExceed: false })}
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
                  onClick={() => this.setState({ fileSizeExceed: false })}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Row style={{ marginTop: "30px" }}>
                <div className="u_f_popup_title">
                  Image size should not exceed 2MB.
                </div>
                <div className="u_f_popup_btn_container">
                  <button
                    className="u_f_popup_btn2"
                    onClick={() => this.setState({ fileSizeExceed: false })}
                  >
                    Close
                  </button>
                </div>
              </Row>
            </DialogContent>
          </Dialog>
        </Container>
      </>
    );
  }
}

export default CreateServiceCenter;
