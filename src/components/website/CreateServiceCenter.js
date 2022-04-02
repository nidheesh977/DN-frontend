import React, { Component } from "react";
import All from "../website/All.module.css";
import { Container, Row, Col, Hidden } from "react-grid-system";
import "./pilot_dashboard/css/Pilot_BasicInfo.css";
import "../css/ServiceCenterAccount.css";
import plusicon from "../images/s_d_a_plus_icon.png";
import deleteIcon from "./company_dashboard/images/c_j_bin.png";
import PhoneInput from "react-phone-number-input";

class CreateServiceCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      service_center_name: "",
      email: "",
      phone: "+91",
      whatsapp_number: "+91",
      address: "",
      street_name: "",
      area_name: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      edit: true,
      working_hours: "",
      secondary_mob: "",
      website: "",
      brand: "",
      brands: [],
      description: "",
      notifications: {
        drone_zone_news: true,
        account_privacy: false,
        hires_me: false,
        mensions_me: true,
        accept_invitation: false,
        follow_me: false,
        comments: true,
      },
      focusField: "",
    };
  }

  addPhoto = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState((prevState) => ({
          photos: [...prevState.photos, reader.result],
        }));
        this.refs.add_photo.value = "";
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  showRemoveIcon = (id) => {
    document.getElementById(id).style.visibility = "visible";
  };

  hideRemoveIcon = (id) => {
    document.getElementById(id).style.visibility = "hidden";
  };

  removePhoto = (id) => {
    if (this.state.edit) {
      var photos = this.state.photos;
      photos.splice(id, 1);
      this.setState({
        photos: photos,
      });
    }
  };

  handleChange = (e, field) => {
    if (field == "bio") {
      document.getElementById(`bio_error`).style.display = "none";
    } else {
      document.getElementById(`${field}_error`).style.visibility = "hidden";
    }
    this.setState({
      [field]: e.target.value,
    });
    console.log(this.state);
  };

  saveChangesTab2 = () => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    var filed = [
      "center_name",
      "contact_no",
      "email_id",
      "address"
    ]

    var error = false;

    if (this.state.focusField !== "") {
      document.getElementById(this.state.focusField).focus();
      this.setState({
        focusField: "",
      });
    }

    if (!error) {
      alert("Ready to submit");
    }
  };

  addBrand = (e) => {
    if (e.key === "Enter") {
      this.setState((prevState) => ({
        brands: [...prevState.brands, prevState.brand],
        brand: "",
      }));
      document.getElementById(`brand_error`).style.visibility = "hidden";
    }
  };

  removeBrand = (id) => {
    var brands = this.state.brands;
    brands.splice(id, 1);
    this.setState({
      brands: brands,
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
              <div className="pd_b_i_main">
                <div className="pd_b_i_profile_titleBox">
                  <div
                    className="pd_b_i_profile_title"
                    style={{ fontSize: "20px" }}
                  >
                    Welcome almost done, Please fill below fields to complete
                    your profile setup
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
                    onChange={(e) =>
                      this.handleChange(e, "service_center_name")
                    }
                    disabled={!this.state.edit}
                  />
                  <div
                    className="input_error_msg"
                    id="service_center_name_error"
                  >
                    Service center name is required
                  </div>
                </div>
                <Row>
                  <Col lg={6}>
                    <div>
                      <div>
                        <div style={{ marginBottom: "15px" }}>
                          <label
                            htmlFor="contact_number"
                            className="pd_b_i_profile_head1"
                          >
                            Center Contact Number
                          </label>
                        </div>
                      </div>
                      <PhoneInput
                        defaultCountry="IN"
                        className={All.Phonenumber + " s_c_d_phone_input"}
                        name="phone"
                        id="contact_number"
                      />
                      <div
                        className="input_error_msg"
                        id="whatsapp_number_error"
                      >
                        Contact number is required
                      </div>
                    </div>
                  </Col>

                  <Col>
                    <div>
                      <div>
                        <div style={{ marginBottom: "15px" }}>
                          <label
                            htmlFor="email_id"
                            className="pd_b_i_profile_head1"
                          >
                            Email ID
                          </label>
                        </div>
                      </div>
                      <input
                        type="email"
                        className={All.Phonenumber + " s_c_d_phone_input"}
                        name="phone"
                        id="email_id"
                      />
                      <div className="input_error_msg" id="email_id_error">
                        Email ID is required
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xl={6}>
                    <div>
                      <label htmlFor="address" className="pd_b_i_profile_head">
                        Address
                      </label>
                      <input
                        type="text"
                        className="pd_b_i_profile_input"
                        id="address"
                      />
                      <div className="input_error_msg" id="country_error">
                        Address is required
                      </div>
                    </div>
                  </Col>
                  <Col xl={6}>
                    <div>
                      <label
                        htmlFor="building_no"
                        className="pd_b_i_profile_head"
                      >
                        Building No. / Street name
                      </label>
                      <input
                        type="number"
                        className="pd_b_i_profile_input"
                        id="building_no"
                      />
                      <div className="input_error_msg" id="building_no">
                        Building No. / Street name is required
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="pd_b_i_main">
                <div>
                  <label
                    htmlFor="working_hours_input"
                    className="pd_b_i_profile_head"
                  >
                    Working Hours
                  </label>
                  <input
                    type="text"
                    className="pd_b_i_profile_input"
                    id="working_hours_input"
                    placeholder="9.00 AM - 8.00 PM"
                  />
                  <div className="input_error_msg" id="working_hours_error">
                    Working hours is required
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="holidays_input"
                    className="pd_b_i_profile_head"
                  >
                    Holidays
                  </label>
                  <input
                    type="text"
                    className="pd_b_i_profile_input"
                    id="holidays_input"
                  />
                  <div className="input_error_msg" id="working_hours_error">
                    Working hours is required
                  </div>
                </div>
                <div>
                  <label htmlFor="brand_input" className="pd_b_i_profile_head">
                    Brand of drones
                  </label>
                  <input
                    type="text"
                    id="brand_input"
                    className="pd_b_i_profile_input"
                    placeholder="Type and click Enter to add"
                    disabled={!this.state.edit}
                    onChange={(e) => this.handleChange(e, "brand")}
                    onKeyDown={this.addBrand}
                    value={this.state.brand}
                  />
                  <div className="input_error_msg" id="brand_error">
                    Brand of drones is required
                  </div>
                </div>
                <div className="s_c_a_brand_container">
                  {this.state.brands.map((brand, index) => {
                    return (
                      <div
                        className="s_c_a_brand"
                        onClick={() => this.removeBrand(index)}
                      >
                        {brand}{" "}
                        <i
                          class="fa fa-check"
                          aria-hidden="true"
                          style={{ marginLeft: "20px" }}
                        ></i>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <label
                    htmlFor="established_year"
                    className="pd_b_i_profile_head"
                  >
                    Established year
                  </label>
                  <input
                    type="text"
                    className="pd_b_i_profile_input"
                    id="established_year"
                    onChange={(e) =>
                      this.handleChange(e, "service_center_name")
                    }
                    disabled={!this.state.edit}
                  />
                  <div className="input_error_msg" id="established_year_error">
                    Established year is required
                  </div>
                </div>
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
                    id="description_input"
                    placeholder="Write description about your service center"
                    style={{ marginBottom: "10px" }}
                    disabled={!this.state.edit}
                    onChange={(e) => this.handleChange(e, "description")}
                  ></textarea>
                  <div className="input_error_msg" id="description_error">
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
                    {this.state.photos.map((photo, index) => {
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
                          <img src={photo} alt="" className="s_c_a_photo_img" />
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

                    <label className="s_c_a_photo_add">
                      <input
                        type="file"
                        name=""
                        id="photo_input"
                        style={{ display: "none" }}
                        onChange={this.addPhoto}
                        ref="add_photo"
                        accept="image/*"
                        disabled={!this.state.edit}
                      />
                      <div className="s_c_a_photo_add_symbol">
                        <img
                          src={plusicon}
                          alt=""
                          className="s_c_a_plus_icon"
                        />
                      </div>
                      <div className="s_c_a_photo_add_text">Add photos</div>
                    </label>
                  </div>
                </div>
                <div className="pd_b_i_notifications_save">
                  <button
                    className="pd_b_i_notifications_saveBtn"
                    onClick={this.saveChangesTab2}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default CreateServiceCenter;
