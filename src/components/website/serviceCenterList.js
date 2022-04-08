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
import Close from "../images/close.svg";
import Loader from "../Loader/loader";
import Countries from "../../apis/country.json";

import close from "../images/close.svg";
import searchIcon from "../images/search123.png";
import loadMore from "../images/Group 71.svg";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-autocomplete-places";
import { fontSize } from "@mui/system";
import { black } from "material-ui/styles/colors";
// import usePlacesAutocomplete from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption
// } from "@reach/combobox";

// import "@reach/combobox/styles.css";

const domain = process.env.REACT_APP_MY_API;

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
      enquiry: false,
      centerId: "",
      message: "",
      name: "",
      emailId: "",
      phoneNo: "",
      code: "",
      isLoading: false,
      city_list: [],
      brand_list: [],
      selected_brands: [],
      loading: true,
      after_data_fetch: false,
      share: false,

      shareLink: "",
      phone_input: {
        name: "",
        email: "",
        phone: "",
      },
      showNumber: false,
      after_data_fetch: false,
      next_page: false,
      showBrandFilter: false,
      address: "",
      latLng: "",
    };
  }

  componentDidMount() {
    axios.get(`${domain}/api/brand/getBrands`)
    .then(res =>{
      console.log(res.data)
      this.setState({
        brand_list: res.data
      })
    })
    .catch(err => {
      console.log(err.response)
    })
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
        if (res.data.next) {
          this.setState({
            next_page: true,
          });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          after_data_fetch: true,
        });
      });
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    axios.get(`${domain}/api/user/getUserData`, config).then((res) => {
      console.log(res);
      this.setState({
        name: res.data.name,
        emailId: res.data.email,
        phoneNo: res.data.phoneNo,
      });

      try {
        var result = Countries.filter((obj) => obj.name == res.data.country);
        console.log(result[0].dial_code);

        this.setState({
          code: result[0].dial_code,
        });
        console.log(res.data.country);
      } catch {
        this.setState({
          code: "+91",
        });
      }
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

  selectUnselectBrand = (brand) => {
    var selected_brands = this.state.selected_brands;
    if (selected_brands.includes(brand)) {
      selected_brands.splice(selected_brands.indexOf(brand), 1);
    } else {
      selected_brands.push(brand);
    }
    this.setState({
      selected_brands: selected_brands,
    });
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
  changeMessage = (e) => {
    this.setState({
      message: e.target.value,
    });
    document.getElementById("message_error").style.display = "none";
  };
  enquiryChange = (e) => {
    if (e.target.name !== "phoneNo") {
      this.setState({
        [e.target.name]: e.target.value,
      });
      // setMyData({
      //   ...myData,
      //   [e.target.name]: e.target.value,
      // });
      document.getElementById(`${e.target.id}_error`).style.display = "none";
    } else {
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
            ["phoneNo"]: e.target.value.slice(
              this.state.code.length + 1,
              10 + this.state.code.length + 1
            ),
          });
          document.getElementById("phone" + "_error").style.display = "none";
        }
      } catch {
        console.log("Not number");
      }
    }
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
  closeEnquiry1 = () => {
    this.setState({
      enquiry: false,
    });
  };

  captureEnquiry = (id) => {
    let error = false;
    let focusField = "";
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (this.state.name.length < 2) {
      document.getElementById("name_error").innerText =
        "Name must have minimum 2 characters";
      document.getElementById("name_error").style.display = "contents";
      error = true;
      if (focusField === "") {
        focusField = "name";
      }
    }

    if (this.state.name.length > 100) {
      document.getElementById("name_error").innerText =
        "Name should not exceed 100 characters";
      document.getElementById("name_error").style.display = "contents";
      error = true;
      if (focusField === "") {
        focusField = "name";
      }
    }

    if (this.state.phoneNo.length !== 10) {
      document.getElementById("phone_error").innerText =
        "Phone number must be 10 digits";
      document.getElementById("phone_error").style.display = "contents";
      error = true;
      if (focusField === "") {
        focusField = "phone";
      }
    }

    if (this.state.message.length > 200 || this.state.message.length === 0) {
      document.getElementById("message_error").innerText =
        "Message should be between 1 and 200 characters";
      document.getElementById("message_error").style.display = "contents";
      error = true;
      if (focusField === "") {
        focusField = "message";
      }
    }

    if (!validateEmail(this.state.emailId)) {
      document.getElementById("email_error").innerText =
        "Email ID is not valid";
      document.getElementById("email_error").style.display = "contents";
      error = true;
      if (focusField === "") {
        focusField = "email";
      }
    }

    if (!error) {
      this.setState({
        isLoading: true,
      });
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };

      axios
        .post(
          `${domain}/api/enquiry/createEnquiry/${this.state.centerId}`,
          {
            emailId: this.state.emailId,
            phoneNo: this.state.phoneNo,
            name: this.state.name,
            message: this.state.message,
          },
          config
        )
        .then((res) => {
          console.log(res);
          this.setState({
            message: "",
            enquiry: false,
            isLoading: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      document.getElementById(focusField).focus();
    }
  };
  enquireNow = (id) => {
    this.setState({
      enquiry: true,
      centerId: id,
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

  handleChange = (address) => {
    this.setState({ address: address });
  };

  handleSelect = (address) => {
    console.log(address);
    this.setState({ address: address });

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);

        this.setState({
          latLng: `${latLng.lat}, ${latLng.lng}`,
        });
        console.log(this.state.latLng);
      })
      .catch((error) => console.error("Error", error));
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

  searchFilters= () =>{
    let data = `${this.state.address} `
    console.log(this.state.selected_brands)
  
  console.log(data) 
  this.setState({
    data: [],
    loading: true
  }) 
  axios.post(`${domain}/api/center/filterCenter`,{address : this.state.address.split(",")[0], brands: this.state.selected_brands}).then(res=>{
    console.log(res)
    this.setState({
      data: res.data,
      loading: false
    })
  })
  .catch(err=>{
    this.setState({
      loading: false
    })
  })
  }

  render() {
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

{
  !localStorage.getItem("access_token") ? <div className="s_c_list_btn_container">
  <button
    className="s_c_list_btn"
    onClick={() =>
      this.props.history.push("/login")
    }
  >
    List your service center
  </button>
</div> : localStorage.getItem("role") === "booster" ? <div className="s_c_list_btn_container">
  <button
    className="s_c_list_btn"
    onClick={() =>
      this.props.history.push("/createServiceCenter") 
    }
  >
    List your service center
  </button>
</div> : <></>
}


            {/* <div className="s_c_list_btn_container">
              <button
                className="s_c_list_btn"
                onClick={() =>
                  this.props.history.push("/service_center_dashboard/account")
                }
              >
                List your service center
              </button>
            </div> */}
            <div
              style={{ position: "relative" }}
              onMouseLeave={() => this.setState({ showBrandFilter: false })}
            >
              <div className="s_c_search_filter_container">
                <div
                  className="s_c_filter_container"
                  onMouseOver={() => this.setState({ showBrandFilter: true })}
                >
                  Choose Brands
                  <img
                    src={DropDownPng}
                    alt=""
                    height={"20px"}
                    width={"20px"}
                    style={{ marginLeft: "auto" }}
                  />
                </div>
                <div className="s_c_Search_container">
                  {/* <input type="text" className="s_c_Search"/> */}
                  <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <input
                          style={{ height: "50px" }}
                          {...getInputProps({
                            placeholder: "Search Places ...",
                            className: "location-search-input s_c_Search",
                          })}
                        />
                        <div
                          className="autocomplete-dropdown-container"
                          style={{
                            position: "absolute",
                            zIndex: 1000,
                            top: "100%",
                            width: "52.5%",
                            fontFamily: "muli-light",
                            fontSize: "16px",
                            border:
                              suggestions.length === 0 ? "" : "1px solid grey",
                            overflow: "hidden",
                            borderEndStartRadius: "10px",
                            borderEndEndRadius: "10px",
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
                                  padding: "10px",
                                }
                              : {
                                  backgroundColor: "#ffffff",
                                  cursor: "pointer",
                                  padding: "10px",
                                };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span
                                  style={{
                                    padding: "20px 10px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  {suggestion.description}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </div>
                <img
                  src={searchIcon}
                  alt="search bar"
                  style={{
                    position: "absolute",
                    left: "calc(85% - 20px)",
                    height: "30px",
                    width: "30px",
                    top: "10px",
                  }}
                  onClick={this.searchFilters}
                />
              </div>
              <div
                className="s_c_filters_list"
                style={{
                  visibility: this.state.showBrandFilter ? "visible" : "hidden",
                }}
              >
                {this.state.brand_list.length > 0 
                ?<>
                  {this.state.brand_list.map((brand, index) => {
                    return (
                      <div
                        className="s_c_filter_brand"
                        style={{
                          background: this.state.selected_brands.includes(brand)
                            ? "#00e7fc"
                            : "#f1f1f1",
                        }}
                        onClick={() => this.selectUnselectBrand(brand)}
                      >
                        {brand.brand}
                      </div>
                    );
                  })}
                </>
                :<>
                <div style = {{textAlign: "center", fontFamily: "muli-bold", fontSize: "16px", padding: "30px 0px"}}>Something went wrong. Please reload the page or try after sometimes.</div>
                </>
              }
                
              </div>
            </div>
            <Row>
              <Col>
                <div>
                  <ul>
                    <li className="s_c_list_title">
                      Service centers
                    </li>
                  </ul>
                </div>
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
                      style={{
                        marginBottom: "30px",
                        backgroundColor: "#e9e9e9",
                      }}
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
                      style={{
                        marginBottom: "30px",
                        backgroundColor: "#e9e9e9",
                      }}
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
                      style={{
                        marginBottom: "30px",
                        backgroundColor: "#e9e9e9",
                      }}
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
                      style={{
                        marginBottom: "30px",
                        backgroundColor: "#e9e9e9",
                      }}
                    />
                  </SkeletonTheme>
                )}
              </Col>
            </Row>
            {this.state.data.length !== 0 && (
              <>
                <Row>
                  {this.state.data.map((item, index) => {
                    return (
                      <Col lg={6} md={12}>
                        <div className="service_center_list">
                          <div className="s_c_profile_container">
                            <img
                              src={item.profilePic}
                              alt=""
                              width="35px"
                              height="35px"
                            />
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
                            <div></div>
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
                            >
                              <a href={`tel:${item.phoneNo}`}> <div className="s_c_other_details_phone" style = {{fontSize: "14px", display: "inline-block"}}>{item.phoneNo} </div></a>
                              {item.secondaryNumber && ", "}
                              {
                                item.secondaryNumber ? <a href={`tel:${item.secondaryNumber}`} > <div className="s_c_other_details_phone" style = {{fontSize: "14px", display: "inline-block"}}>{item.secondaryNumber}</div></a>: ""
                              }
                              
                            </div>
                            <div className="s_c_other_details_title">
                              Location:
                            </div>
                            <div className="s_c_other_details_content">
                              {
                                item.address ? item.address.split(",")[0]  : ""
                              }
                              {
                                item.address ? item.address.split(",")[1] ? "," + item.address.split(",")[1] : "" : ""
                              }
                            
                            </div>
                            <div className="s_c_other_details_title">
                              Brands:
                            </div>
                            <div className="s_c_other_details_content">
                              {item.brandOfDrones
                                .slice(0, 3)
                                .map((brand, index) => {
                                  return (
                                    <div
                                      className="service_center_brand_list"
                                      key={index}
                                    >
                                      {brand}
                                      {index + 1 <
                                        item.brandOfDrones.slice(0, 4).length &&
                                        ","}{" "}
                                      &nbsp;{" "}
                                    </div>
                                  );
                                })}{" "}
                                {item.brandOfDrones.length > 4 && `. . .`}
                            </div>
                          </div>
                          <hr style={{ border: "1px solid #efefef" }} />
                          <div style={{ display: "flex", height: "30px" }}>
                            <button
                              className="s_c_button2"
                              onClick={() => this.enquireNow(item._id)}
                            >
                              Enquire Now
                            </button>

                            {item.whatsappNo ? (
                              <a
                              href={"https://api.whatsapp.com/send/?phone=+91 " + item.whatsappNo + "&text=Hello"}
                              target = "_blank"
                              >
                                <img
                                  src={whatsapp_icon}
                                  alt=""
                                  height={"27px"}
                                  style={{ marginTop: "3px" }}
                                />
                              </a>
                            ) : (
                              <></>
                            )}

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
                  open={this.state.enquiry}
                  onClose={this.closeEnquiry1}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  maxWidth={"md"}
                  fullWidth={true}
                  PaperProps={{
                    style: { width: "620px", borderRadius: "10px" },
                  }}
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
                        src={Close}
                        alt=""
                        onClick={this.closeEnquiry1}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      <div className="sc_popup_head">
                        Contact Service Center
                      </div>
                      <div className="sc_popup_desc">
                        Enter the below details to send a Enquiry{" "}
                      </div>
                      <div className="sc_popup_input_label">Name</div>
                      <input
                        type="text"
                        className="sc_popup_input"
                        name="name"
                        id="name"
                        onChange={this.enquiryChange}
                        value={this.state.name}
                      />
                      <div
                        className="login_input_error_msg"
                        id="name_error"
                      ></div>
                      <div className="sc_popup_input_label">Phone No</div>
                      <input
                        type="text"
                        className="sc_popup_input"
                        name="phoneNo"
                        id="phone"
                        onChange={this.enquiryChange}
                        value={`${this.state.code} ${this.state.phoneNo}`}
                      />
                      <div
                        className="login_input_error_msg"
                        id="phone_error"
                      ></div>
                      <div className="sc_popup_input_label">Email Id</div>
                      <input
                        type="text"
                        className="sc_popup_input"
                        name="emailId"
                        id="email"
                        onChange={this.enquiryChange}
                        value={this.state.emailId}
                      />
                      <div
                        className="login_input_error_msg"
                        id="email_error"
                      ></div>
                      <div className="sc_popup_input_label">Message</div>
                      <textarea
                        type="text"
                        className="sc_popup_input1"
                        value={this.state.message}
                        name="message"
                        id="message"
                        onChange={this.changeMessage}
                      />
                      <div
                        className="login_input_error_msg"
                        id="message_error"
                      ></div>
                      <div style={{ width: "100%", textAlign: "center" }}>
                        {this.state.isLoading ? (
                          <>
                            <button className="sc_popup_submit1">
                              {" "}
                              <Loader /> Sending
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="sc_popup_submit"
                              onClick={this.captureEnquiry}
                            >
                              Submit
                            </button>
                          </>
                        )}
                      </div>
                    </div>
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
                    </Row>
                  </DialogContent>
                </Dialog>
                
              </>
            )}
            {this.state.next_page && (
              <div className="a_j_load_div" style={{ margin: "40px 0px" }}>
                <button className="a_j_loadMore_btn">
                  <img src={loadMore} className="a_j_location_logo" />
                  <span className="a_j_location_text">Load More</span>
                </button>{" "}
              </div>
            )}
            {this.state.data.length === 0 &&
              !this.state.loading &&
              this.state.after_data_fetch && (
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
              )}
          </Container>
        </div>
      </>
    );
  }
}

export default ServiceCenters;
