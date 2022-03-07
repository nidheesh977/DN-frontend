import React, { Component } from "react";
import "../css/service_centers.css";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import nexevo_img from "../images/nexevo.jpg";
import DropDownPng from "../images/s_c_dropdown2.png";
import All from "../website/All.module.css";
import nofoundresult from "../images/noresultfound.svg";
import Box from "@material-ui/core/Box";
import locationIcon from "../images/s_c_location.svg";
import { Helmet } from "react-helmet";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import axios from "axios";
import { Link } from "react-router-dom";
import whatsapp_icon from "../images/whatsapp_icon.png";
import share2 from "../images/share2.png";
import PhoneInput from "react-phone-number-input";
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WhatsappIcon,
} from "react-share";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import s_c_form_img from "../images/s_c_form_img.png";
import close from "../images/close.svg";
import loadMore from "../images/Group 71.svg";

const domain = process.env.REACT_APP_MY_API

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(4),
    top: theme.spacing(2),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          {/* <CloseIcon className="test"/> */}
          <img src={close} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

class ServiceCenters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      txt: null,
      dropdown_selected: null,
      selected_country: null,
      selected_state: null,
      selected_city: null,
      selected_brand: null,
      country_list: [],
      state_list: [],
      city_list: [],
      brand_list: [
        "DJI Mavic Air 2",
        "DJI Mavic 2 Pro",
        "DJI Mavic Mini",
        "DJI Mavic 2 Zoom",
        "DJI Phanton 4",
        "Parrot Anafi",
        "DJI Mavic Pro",
        "DJI Inspire 2",
        "DJI Inspire 1",
        "Parrot Bebop 2",
      ],
      loading: true,
      after_data_fetch: false,
      share: false,
      enquire: false,
      shareLink: "",
      phone_input: {
        name: "",
        email: "",
        phone: "",
      },
      phoneNumberForm: false,
      phoneFormSuccess: false,
      phoneFormSuccessMsg: "Form submitted successfully",
      showNumber: false,
      after_data_fetch: false,
      next_page: false
    };
  }

  componentDidMount() {
    axios
      .get("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY":
            "M3Z5NGJjcmhtYm5JQ1pmckZIbHpiYVR6TVBzV0VnQUhpeTVzUmNzdw==",
        },
      })
      .then((res) => {
        this.setState({
          country_list: res.data,
        });
        console.log(res.data);
      });

    axios
      .get(`${domain}/api/center/getCenter`)
      .then((res) => {
        const center = res.data;
        console.log(res.data);
        this.setState({
          data: center,
          loading: false,
          after_data_fetch: true,
        });
        if (res.data.next){
          this.setState({
            next_page: true
          })
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          after_data_fetch: true,
        });
      });
  }

  closeDropDown = () => {
    this.setState({
      dropdown_selected: null,
    });
    document
      .getElementById("s_c_dropdown_icon1")
      .classList.remove("s_c_dropdown_selected");
    document
      .getElementById("s_c_dropdown1")
      .classList.remove("s_c_dropdown_content_selected");
    document
      .getElementById("s_c_dropdown_icon2")
      .classList.remove("s_c_dropdown_selected");
    document
      .getElementById("s_c_dropdown2")
      .classList.remove("s_c_dropdown_content_selected");
    document
      .getElementById("s_c_dropdown_icon3")
      .classList.remove("s_c_dropdown_selected");
    document
      .getElementById("s_c_dropdown3")
      .classList.remove("s_c_dropdown_content_selected");
    document
      .getElementById("s_c_dropdown_icon4")
      .classList.remove("s_c_dropdown_selected");
    document
      .getElementById("s_c_dropdown4")
      .classList.remove("s_c_dropdown_content_selected");
  };

  dropDown = (val) => {
    this.closeDropDown();
    if (val != this.state.dropdown_selected) {
      document
        .getElementById("s_c_dropdown_icon" + val)
        .classList.add("s_c_dropdown_selected");
      document
        .getElementById("s_c_dropdown" + val)
        .classList.add("s_c_dropdown_content_selected");
      this.setState({
        dropdown_selected: val,
      });
    } else {
      this.setState({
        dropdown_selected: null,
      });
    }
  };

  selectCountry = (country) => {
    this.setState({
      selected_country: country,
    });
    axios
      .get(
        "https://api.countrystatecity.in/v1/countries/" +
          country.iso2 +
          "/states",
        {
          headers: {
            "X-CSCAPI-KEY":
              "M3Z5NGJjcmhtYm5JQ1pmckZIbHpiYVR6TVBzV0VnQUhpeTVzUmNzdw==",
          },
        }
      )
      .then((res) => {
        this.setState({
          state_list: res.data,
        });
        console.log(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    this.closeDropDown();
  };

  selectState = (state) => {
    this.setState({
      selected_state: state,
    });
    this.closeDropDown();
    axios
      .get(
        "https://api.countrystatecity.in/v1/countries/" +
          this.state.selected_country.iso2 +
          "/states/" +
          state.iso2 +
          "/cities",
        {
          headers: {
            "X-CSCAPI-KEY":
              "M3Z5NGJjcmhtYm5JQ1pmckZIbHpiYVR6TVBzV0VnQUhpeTVzUmNzdw==",
          },
        }
      )
      .then((res) => {
        this.setState({
          city_list: res.data,
          selected_city: res.data[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  selectCity = (city) => {
    this.setState({
      selected_city: city,
    });
    this.closeDropDown();
  };

  selectBrand = (brand) => {
    this.setState({
      selected_brand: brand,
    });
    this.closeDropDown();
  };

  handleShareClose = () => {
    this.setState({
      share: false,
    });
  };

  shareLinkChange = (link) => {
    this.setState({
      shareLink: "http://localhost:3000/service_center/" + link,
      share: true,
    });
  };

  whatsappChat = (whatsapp_number) => {
    window.open("https://wa.me/" + whatsapp_number + "?text=Hello", "_blank");
  };

  enquireNow = () => {
    this.setState({
      enquire: true,
    });
  };

  closeEnquiry = () => {
    this.setState({
      enquire: false,
    });
  };

  serviceCenterDetails = (id) => {
    this.props.history.push("/service_center/" + id);
  };

  openPhoneNumberForm = () => {
    this.setState({
      phoneNumberForm: true,
    });
  };

  closePhoneNumberForm = () => {
    let phone_input = this.state.phone_input;
    phone_input.phone = "";
    this.setState({
      phoneNumberForm: false,
      phone_input: phone_input,
    });
  };

  phoneFormChangeHandler = (e) => {
    document.getElementById(`${e.target.name}_error`).style.visibility =
      "hidden";
    let phone_input = this.state.phone_input;
    phone_input[e.target.name] = e.target.value;
    this.setState({
      phone_input: phone_input,
    });
  };

  phoneFormPhoneChangeHandler = (phone) => {
    document.getElementById("phone_error").style.visibility = "hidden";
    let phone_input = this.state.phone_input;
    phone_input.phone = phone;
    this.setState({
      phone_input: phone_input,
    });
  };

  submitPhoneForm = () => {
    let error = false;
    if (this.state.phone_input.name === "") {
      document.getElementById("name_error").style.visibility = "visible";
      error = true;
    }
    if (this.state.phone_input.phone === "") {
      document.getElementById("phone_error").style.visibility = "visible";
      error = true;
    }
    if (this.state.phone_input.email === "") {
      document.getElementById("email_error").style.visibility = "visible";
      error = true;
    }

    if (!error) {
      let phone_input = this.state.phone_input;
      phone_input.phone = "";
      this.setState({
        phoneNumberForm: false,
        phone_input: phone_input,
        phoneFormSuccess: true,
        showNumber: true
      });
    }
  };

  closePhoneFormSuccess = () => {
    this.setState({
      phoneFormSuccess: false,
    });
  };

  render() {
    console.log(window.location.href);
    const dropDown = this.dropDown;
    const selectCountry = this.selectCountry;
    const selectState = this.selectState;
    const selectCity = this.selectCity;
    const selectBrand = this.selectBrand;
    var loading = this.state.loading;
    return (
      <>
        <Helmet>
          <title>Service centers</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <div id="service_centers">
          <Container
            className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}
          >
            <div className="s_c_list_btn_container">
              <button
                className="s_c_list_btn"
                onClick={() =>
                  this.props.history.push("/service_center_dashboard")
                }
              >
                List your service center
              </button>
            </div>
            <Row id="s_c_filter" gutterWidth={20}>
              <Col xs={12} sm={6} md={6} lg={4} xl={12 / 5}>
                <ul>
                  <li className="s_c_dropdown_title">Country</li>
                  <li>
                    <div
                      id="select_country"
                      className="service_center_filter"
                      onClick={() => dropDown(1)}
                    >
                      {this.state.selected_country
                        ? this.state.selected_country.name
                        : "Select country"}
                      <span className="s_c_dropdown_icon">
                        <img
                          src={DropDownPng}
                          alt=""
                          // height={"5px"}
                          width = {"10px"}
                          id="s_c_dropdown_icon1"
                        />
                      </span>
                    </div>
                  </li>
                  <li>
                    <div class="s_c_dropdown-content" id="s_c_dropdown1">
                      {this.state.country_list.map((country, index) => {
                        return (
                          <li
                            onClick={() => {
                              selectCountry(country);
                            }}
                            key={index}
                          >
                            {country.name}
                          </li>
                        );
                      })}
                    </div>
                  </li>
                </ul>
              </Col>
              <Col xs={12} sm={6} md={6} lg={4} xl={12 / 5}>
                <ul>
                  <li className="s_c_dropdown_title">State</li>
                  <li>
                    <div
                      id="select_state"
                      className="service_center_filter"
                      onClick={() => dropDown(2)}
                    >
                      {this.state.selected_state
                        ? this.state.selected_state.name
                        : "Select state"}
                      <span className="s_c_dropdown_icon">
                        <img
                          src={DropDownPng}
                          alt=""
                          width = {"10px"}
                          id="s_c_dropdown_icon2"
                        />
                      </span>
                    </div>
                  </li>
                  <li>
                    <div class="s_c_dropdown-content" id="s_c_dropdown2">
                      {this.state.state_list.map((state, index) => {
                        return (
                          <li onClick={() => selectState(state)} key={index}>
                            {state.name}
                          </li>
                        );
                      })}
                    </div>
                  </li>
                </ul>
              </Col>
              <Col xs={12} sm={6} md={6} lg={4} xl={12 / 5}>
                <ul>
                  <li className="s_c_dropdown_title">City</li>
                  <li>
                    <div
                      id="select_city"
                      className="service_center_filter"
                      onClick={() => dropDown(3)}
                    >
                      {this.state.selected_city
                        ? this.state.selected_city.name
                        : "Select city"}
                      <span className="s_c_dropdown_icon">
                        <img
                          src={DropDownPng}
                          alt=""
                          width = {"10px"}
                          id="s_c_dropdown_icon3"
                        />
                      </span>
                    </div>
                  </li>
                  <li>
                    <div class="s_c_dropdown-content" id="s_c_dropdown3">
                      {this.state.city_list.map((city, index) => {
                        return (
                          <li onClick={() => selectCity(city)} key={index}>
                            {city.name}
                          </li>
                        );
                      })}
                    </div>
                  </li>
                </ul>
              </Col>
              <Col xs={12} sm={6} md={6} lg={4} xl={12 / 5}>
                <ul>
                  <li className="s_c_dropdown_title">Brand</li>
                  <li>
                    <div
                      id="select_brand"
                      className="service_center_filter"
                      onClick={() => dropDown(4)}
                    >
                      {this.state.selected_brand
                        ? this.state.selected_brand
                        : "Select brand"}
                      <span className="s_c_dropdown_icon">
                        <img
                          src={DropDownPng}
                          alt=""
                          width = {"10px"}
                          id="s_c_dropdown_icon4"
                        />
                      </span>
                    </div>
                  </li>
                  <li>
                    <div class="s_c_dropdown-content" id="s_c_dropdown4">
                      {this.state.brand_list.map((brand, index) => {
                        return (
                          <li onClick={() => selectBrand(brand)} key={index}>
                            {brand}
                          </li>
                        );
                      })}
                    </div>
                  </li>
                </ul>
              </Col>
              <Col xs={12} sm={6} md={6} lg={4} xl={12 / 5}>
                <ul>
                  <li className="s_c_dropdown_title">&nbsp;</li>
                  <li>
                    <button
                      className="s_c_button1"
                      onClick={() => this.closeDropDown()}
                    >
                      Search
                    </button>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <ul>
                    <li className="s_c_list_title">
                      Service centers{" "}
                      {this.state.selected_city
                        ? "in " + this.state.selected_city.name
                        : "near you"}
                    </li>
                  </ul>
                </div>
              </Col>
              <Col>
                <ul>
                  <li className="s_c_location">
                    <img
                      src={locationIcon}
                      alt=""
                      style={{ paddingRight: "10px", float: "left" }}
                    />
                    {this.state.selected_city
                      ? this.state.selected_city.name
                      : "Bangalore"}
                    ,{" "}
                    {this.state.selected_state
                      ? this.state.selected_state.name
                      : "Karnataka"}
                    .
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col md={6} sm={12}>
                {loading && (
                  <SkeletonTheme>
                    <Skeleton
                      height={300}
                      width={"100%"}
                      count={1}
                      style={{ marginBottom: "30px", backgroundColor: "#e9e9e9" }}
                    />
                  </SkeletonTheme>
                )}
              </Col>
              <Col md={6} sm={12}>
                {loading && (
                  // <SkeletonTheme highlightColor="#eee">
                  //   <Skeleton
                  //     height={300}
                  //     width={"100%"}
                  //     count={1}
                  //     style={{backgroundColor: "white",marginBottom: "20px"}}
                  //   />
                  // </SkeletonTheme>
                  <SkeletonTheme>
                    <Skeleton
                      height={300}
                      width={"100%"}
                      count={1}
                      style={{ marginBottom: "30px", backgroundColor: "#e9e9e9" }}
                    />
                  </SkeletonTheme>
                )}
              </Col>
              <Col md={6} sm={12}>
                {loading && (
                  <SkeletonTheme>
                    <Skeleton
                      height={300}
                      width={"100%"}
                      count={1}
                      style={{ marginBottom: "30px", backgroundColor: "#e9e9e9" }}
                    />
                  </SkeletonTheme>
                )}
              </Col>
              <Col md={6} sm={12}>
                {loading && (
                  <SkeletonTheme>
                    <Skeleton
                      height={300}
                      width={"100%"}
                      count={1}
                      style={{ marginBottom: "30px", backgroundColor: "#e9e9e9" }}
                    />
                  </SkeletonTheme>
                )}
              </Col>
            </Row>
            {this.state.data.length && (
              <>
                <Row>
                  {this.state.data.map((item, index) => {
                    return (
                      <Col lg={6} md={12}>
                        <div className="service_center_list">
                          <div className="s_c_profile_container">
                            <img src={nexevo_img} alt="" width="35px" height = "35px" />
                          </div>
                          <span
                            className="service_center_name"
                            onClick={() => this.serviceCenterDetails(item._id)}
                          >
                            {item.centerName}
                          </span>
                          <div className="rating_request_md_xl">
                            <div className="service_center_rating_md_xl">
                              <span
                                className={
                                  item.rating >= 1
                                    ? "star_checked"
                                    : "star_unchecked"
                                }
                              >
                                &#9733;
                              </span>
                              <span
                                className={
                                  item.rating >= 2
                                    ? "star_checked"
                                    : "star_unchecked"
                                }
                              >
                                &#9733;
                              </span>
                              <span
                                className={
                                  item.rating >= 3
                                    ? "star_checked"
                                    : "star_unchecked"
                                }
                              >
                                &#9733;
                              </span>
                              <span
                                className={
                                  item.rating >= 4
                                    ? "star_checked"
                                    : "star_unchecked"
                                }
                              >
                                &#9733;
                              </span>
                              <span
                                className={
                                  item.rating >= 5
                                    ? "star_checked"
                                    : "star_unchecked"
                                }
                              >
                                &#9733;
                              </span>
                            </div>
                            <div>
                              <Link
                                className="s_c_review_link"
                                to={"/service_center/" + item._id}
                              >
                                Read Reviews
                              </Link>
                            </div>
                          </div>
                          <div className="s_c_other_details">
                            <div className="s_c_other_details_title">
                              Working time:
                            </div>
                            <div className="s_c_other_details_content">
                              {item.workingHours}
                            </div>
                            <div className="s_c_other_details_title">
                              Phone Number:
                            </div>
                            <div
                              className="s_c_other_details_content s_c_other_details_phone"
                              onClick={this.openPhoneNumberForm}
                            >
                              {this.state.showNumber?`${item.phoneNo}, ${item.secondaryNumber}`:"Show Phone Number"}
                            </div>
                            <div className="s_c_other_details_title">
                              Location:
                            </div>
                            <div className="s_c_other_details_content">
                              {item.city}, {item.state}
                            </div>
                            <div className="s_c_other_details_title">
                              Brands:
                            </div>
                            <div className="s_c_other_details_content">
                              {item.brandOfDrones}
                            </div>
                          </div>
                          <hr style={{ border: "1px solid #efefef" }} />
                          <div style={{ display: "flex", height: "30px" }}>
                            <button
                              className="s_c_button2"
                              onClick={this.enquireNow}
                            >
                              Enquire Now
                            </button>
                            <Link
                              onClick={() =>
                                this.whatsappChat(item.whatsappNumber)
                              }
                            >
                              <img src={whatsapp_icon} alt="" height={"27px"} style = {{marginTop: "3px"}} />
                            </Link>

                            <img
                              src={share2}
                              alt=""
                              className="s_c_share"
                              onClick={() => this.shareLinkChange(item.id)}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>

                <Dialog
                  open={this.state.enquire}
                  onClose={this.closeEnquiry}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  maxWidth={"md"}
                  fullWidth={true}
                >
                  <DialogContent
                    className={All.PopupBody}
                    style={{ marginBottom: "50px" }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                      }}
                    >
                      <img
                        src={close}
                        alt=""
                        onClick={this.closeEnquiry}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <Row style={{ marginTop: "30px" }}>
                      <Hidden xs sm>
                        <Col className="s_f_form_img_container">
                          <img
                            src={s_c_form_img}
                            alt=""
                            width={"100%"}
                            className="s_f_form_img"
                          />
                        </Col>
                      </Hidden>
                      <Col>
                        <h3 id="s_c_enquiry_heading">Request Quote</h3>
                        <label>
                          <div className="s_c_enquiry_title">Name</div>
                          <input
                            type="text"
                            name=""
                            id=""
                            className="s_c_enquiry_input"
                          />
                        </label>
                        <label>
                          <div className="s_c_enquiry_title">Phone Number</div>
                          <input
                            type="text"
                            name=""
                            id=""
                            className="s_c_enquiry_input"
                          />
                        </label>
                        <label>
                          <div className="s_c_enquiry_title">Email ID</div>
                          <input
                            type="text"
                            name=""
                            id=""
                            className="s_c_enquiry_input"
                          />
                        </label>
                        <label>
                          <div className="s_c_enquiry_title">Message</div>
                          <textarea className="s_c_enquiry_textarea"></textarea>
                        </label>
                        <button className="s_c_button3">Submit</button>
                      </Col>
                    </Row>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={this.state.phoneNumberForm}
                  onClose={this.closePhoneNumberForm}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  maxWidth={"md"}
                  fullWidth={true}
                  PaperProps={{
                    style: { maxWidth: "720px", borderRadius: "10px" },
                  }}
                >
                  <DialogContent
                    className={All.PopupBody}
                    style={{ marginBottom: "45px" }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                      }}
                    >
                      <img
                        src={close}
                        alt=""
                        onClick={this.closePhoneNumberForm}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <Row style={{ marginTop: "30px", padding: "0px 15px" }}>
                      <div className="phone_form_title">
                        Contact Service Center
                      </div>
                      <div className="phone_form_desc">
                        Enter the below details to view Phone Numbers
                      </div>
                      <label
                        htmlFor="phone_form_name"
                        className="phone_form_label"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="phone_form_name"
                        className="phone_form_input"
                        name="name"
                        onChange={this.phoneFormChangeHandler}
                      />
                      <div
                        className="phone_form_input_error_msg"
                        id="name_error"
                      >
                        Name is required
                      </div>
                      <label htmlFor="phone" className="phone_form_label">
                        Phone Number
                      </label>
                      <PhoneInput
                        defaultCountry="IN"
                        className={"phone_form_input phone_form_phone"}
                        name="phone"
                        id="phone"
                        value={this.state.phone_input.phone}
                        onChange={this.phoneFormPhoneChangeHandler}
                      />
                      <div
                        className="phone_form_input_error_msg"
                        id="phone_error"
                      >
                        Phone number is required
                      </div>
                      <label
                        htmlFor="phone_form_email"
                        className="phone_form_label"
                      >
                        Email ID
                      </label>
                      <input
                        type="text"
                        id="phone_form_email"
                        className="phone_form_input"
                        name="email"
                        onChange={this.phoneFormChangeHandler}
                      />
                      <div
                        className="phone_form_input_error_msg"
                        id="email_error"
                      >
                        Email ID is required
                      </div>
                      <div className="phone_form_btn_container">
                        <button
                          className="phone_form_btn"
                          onClick={this.submitPhoneForm}
                        >
                          Submit
                        </button>
                      </div>
                    </Row>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={this.state.share}
                  onClose={this.handleShareClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  maxWidth={"md"}
                  fullWidth={true}
                >
                  <DialogTitle
                    id="customized-dialog-title"
                    onClose={this.handleShareClose}
                    className={All.PopupHeader}
                  >
                    <Box display="flex" pt={6}>
                      <Box mt={2}>
                        <h3
                          className={All.Bold}
                          style={{ textAlign: "center" }}
                        >
                          Share
                        </h3>
                      </Box>
                    </Box>
                  </DialogTitle>
                  <DialogContent
                    className={All.PopupBody}
                    style={{ marginBottom: "50px" }}
                  >
                    <Row>
                      <WhatsappShareButton
                        url={this.state.shareLink}
                        style={{ margin: "10px" }}
                      >
                        <WhatsappIcon size={52} round={true} />
                      </WhatsappShareButton>
                      <FacebookShareButton
                        url={this.state.shareLink}
                        style={{ margin: "10px" }}
                      >
                        <FacebookIcon size={52} round={true} />
                      </FacebookShareButton>
                      <EmailShareButton
                        url={this.state.shareLink}
                        style={{ margin: "10px" }}
                      >
                        <EmailIcon size={52} round={true} />
                      </EmailShareButton>
                      <TwitterShareButton
                        url={this.state.shareLink}
                        style={{ margin: "10px" }}
                      >
                        <TwitterIcon size={52} round={true} />
                      </TwitterShareButton>
                      <TelegramShareButton
                        url={this.state.shareLink}
                        style={{ margin: "10px" }}
                      >
                        <TelegramIcon size={52} round={true} />
                      </TelegramShareButton>
                      <LinkedinShareButton
                        url={this.state.shareLink}
                        style={{ margin: "10px" }}
                      >
                        <LinkedinIcon size={52} round={true} />
                      </LinkedinShareButton>
                      <PinterestShareButton
                        url={this.state.shareLink}
                        style={{ margin: "10px" }}
                      >
                        <PinterestIcon size={52} round={true} />
                      </PinterestShareButton>
                      <VKShareButton
                        url={this.state.shareLink}
                        style={{ margin: "10px" }}
                      >
                        <VKIcon size={52} round={true} />
                      </VKShareButton>
                      <ViberShareButton
                        url={this.state.shareLink}
                        style={{ margin: "10px" }}
                      >
                        <ViberIcon size={52} round={true} />
                      </ViberShareButton>
                      <RedditShareButton
                        url={this.state.shareLink}
                        style={{ margin: "10px" }}
                      >
                        <RedditIcon size={52} round={true} />
                      </RedditShareButton>
                      <LineShareButton
                        url={this.state.shareLink}
                        style={{ margin: "10px" }}
                      >
                        <LineIcon size={52} round={true} />
                      </LineShareButton>
                    </Row>
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={this.state.phoneFormSuccess}
                  onClose={this.closePhoneFormSuccess}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  maxWidth={"md"}
                  fullWidth={true}
                >
                  <DialogContent
                    className={All.PopupBody}
                    style={{ marginBottom: "50px" }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                      }}
                    >
                      <img
                        src={close}
                        alt=""
                        onClick={this.closePhoneFormSuccess}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <Row style={{ marginTop: "30px" }}>
                      <div className="u_f_popup_title">
                        {this.state.phoneFormSuccessMsg}
                      </div>
                      <div className="u_f_popup_btn_container">
                        <button
                          className="u_f_popup_btn2"
                          onClick={this.closePhoneFormSuccess}
                        >
                          Close
                        </button>
                      </div>
                    </Row>
                  </DialogContent>
                </Dialog>
              </>
            )}
            {this.state.next_page&&(
              <div className="a_j_load_div" style={{ margin: "40px 0px" }}>
                <button className="a_j_loadMore_btn">
                  <img src={loadMore} className="a_j_location_logo" />
                  <span className="a_j_location_text">Load More</span>
                </button>{" "}
              </div>
            )}
            {!this.state.data.length &&
              !this.state.loading &&
              this.state.after_data_fetch &&
                <div style={{ margin: "0px auto", display: "block" }}>
                  <Box className={All.Text_center} pt={5}>
                    <img
                      src={nofoundresult}
                      className={`${All.W_xs_100} ${All.W_sm_100}`}
                    />
                    <Box className={`${All.Text_center}`} px={5} pb={2}>
                      <h2>No Results Found</h2>
                    </Box>
                    <Box className={`${All.Text_center}`} pb={5}>
                      <label>
                        It seems we can't find any results based on your search.{" "}
                      </label>
                    </Box>
                  </Box>
                </div>
              }
          </Container>
        </div>
      </>
    );
  }
}

export default ServiceCenters;