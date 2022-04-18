import React, { Component } from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "./All.module.css";
import "../css/HirePilot.css";
import "../css/ApplyJob.css";
import profileUser from "../images/profile-user.svg";
import money from "../images/money.svg";
import location from "../images/location.svg";
import work from "../images/work.svg";
import { Link } from "react-router-dom";
import dropdown from "../images/s_c_dropdown2.png";
import Box from "@mui/material/Box";
import axios from "axios";
import MuiDialogContent from "@material-ui/core/DialogContent";
import loadMore from "../images/Group 71.svg";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import heart from "../images/heart (3).svg";
import heartLike from "../images/heart-blue.svg";
import Skeleton from "react-loading-skeleton";
import Close from "../images/close.svg";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import nofoundresult from "../images/noresultfound.svg";
import env from "dotenv";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-autocomplete-places";

const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#00E7FC",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "1px solid #707070",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 0,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#cecece",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 2,
  },
}));

class ApplyJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      view_pilot_type_filter: true,
      view_work_filter: false,
      view_hourly_rate_filter: true,
      price_range_min: 0,
      price_range_max: 200,
      show_more_filters: false,

      liked: [],
      dialogOpen: false,
      dialogOpen1: false,
      authourised: false,
      filter_keyword: "",
      filter_country: "",
      filter_city: "",
      pilot_type: [],
      work_type: [],
      price_range: [20, 40],
      next_page: false,
      page: "page1",
      likeSuccess: false,
      likeFailed: false,
      dislikeSuccess: false,
      dislikeID: 0,
      loginErrorPopup: false,
      priceCheck: true,
      address: "",
      latLng: ""
    };
  }
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

  dropdown = (id) => {
    this.setState({
      view_pilot_type_filter: false,
      view_work_filter: false,
    });
    id = "view_" + id;
    this.setState({
      [id]: !this.state[id],
    });
  };
  handlePriceRange = (e, value) => {
    this.setState({
      price_range: value,
    });
  };

  showMoreFilters = () => {
    this.setState({
      show_more_filters: !this.state.show_more_filters,
    });
  };

  componentDidMount() {
    axios
      .get(`${domain}/api/jobs/getJobs?${this.state.page}`)
      .then((res) => {
        console.log(res);
        const persons = res.data;
        console.log(persons.results);
        this.setState({ data: persons.results, loading: false });
        if (res.data.next) {
          this.setState({
            next_page: true,
            next_page: res.data.next,
          });
        } else {
          this.setState({
            next_page: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
    axios
      .post(`${domain}/api/pilot/getLikedJobs`, this.config)
      .then((res) => {
        const persons = res.data;
        console.log(persons);
        if (persons !== "please Login"){
          this.setState({ liked: persons });
        }
      })
      .catch((err) => {
        this.setState({
          authourised: false
        });
      });
  }
  config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  // likePost = (id) => {
  //   console.log(id)
  //   if (!localStorage.getItem("access_token")) {
  //     this.setState({
  //       loginErrorPopup: true
  //     })
  //   } else {
  //     console.log(this.config);

  //     axios
  //       .post(`${domain}/api/jobs/likeJob/${id}`, this.config)
  //       .then((response) => {
  //         console.log(response.data)
  //         if (response.data === "please Login") {
  //           this.setState({
  //             loginErrorPopup: true
  //           })
  //         }
  //         else{
  //           let liked = this.state.liked;
  //           liked.push(id);
  //           this.setState({
  //             liked: liked,
  //           });
  //           console.log(liked)
  //         }
  //       })
  //       .catch((err) => {});
  //   }
  // };

  // unlikePost = (id) => {
  //   console.log(this.config);
  //   this.setState({
  //     dialogOpen1: true,
  //   });

  //   axios.post(`${domain}/api/jobs/unlikeJob/${id}`, this.config)
  //     .then((response) => {
  //       console.log(response.data)
  //       if (response.data === "please Login") {
  //         // this.props.history.push("/pilot_dashboard/account")
  //         this.setState({
  //           loginErrorPopup: true
  //         })
  //       }

  //       else{
  //         console.log("dislike successful")
  //         let index = this.state.liked.indexOf(id);
  //         let liked_list = this.state.liked
  //         liked_list.splice(index, 1);
  //         this.setState({
  //           liked: liked_list
  //         })
  //         console.log(liked_list)
  //       }

  //       console.log("liked_list")

  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       this.setState({
  //         loginErrorPopup: true
  //       })
  //     });
  // };

  likePost = (id) => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    if (!localStorage.getItem("access_token")) {
      this.setState({
        loginErrorPopup: true,
      });
    } else {
      let liked = this.state.liked;
      liked.push(id);
      this.setState({
        liked: liked,

      });

      axios
        .post(`${domain}/api/jobs/likeJob/${id}`, config)

        .then((response) => {
          if (response.data === "please Login") {
            // history.push("/pilot_dashboard/account")
            this.setState({
              loginErrorPopup: true,
            });
          }
        })
        .catch(() => {});
    }
  };
  unlikePost = (id) => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    console.log(config);
    let index = this.state.liked.indexOf(id);
    let liked_list = this.state.liked
    liked_list.splice(index, 1);
    this.setState({
      liked: liked_list
    })
    console.log(liked_list)

    axios
      .post(`${domain}/api/jobs/unlikeJob/${id}`, config)

      .then((response) => {
        if (response.data === "please Login") {
          // history.push("/pilot_dashboard/account")
          this.setState({
            loginErrorPopup: true
          })
        }
      })
      .catch(() => {});
  };

  closeChoicePopup = () => {
    this.setState({
      dialogOpen: false,
    });
  };
  closeChoicePopup1 = () => {
    this.setState({
      dialogOpen1: false,
    });
  };

  filterKeywordChangeHandler = (e) => {
    this.setState({
      filter_keyword: e.target.value,
    });
  };

  filterCountryChangeHandler = (e) => {
    this.setState({
      filter_country: e.target.value,
    });
  };

  filterCityChangeHandler = (e) => {
    this.setState({
      filter_city: e.target.value,
    });
  };

  loadMore = () => {};

  filterPilotTypeChangeHandler = (type) => {
    let pilot_type = this.state.pilot_type;
    if (pilot_type.includes(type)) {
      pilot_type.splice(pilot_type.indexOf(type), 1);
      this.setState({
        pilot_type: pilot_type,
      });
    } else {
      pilot_type.push(type);
      this.setState({
        pilot_type: pilot_type,
      });
    }
    setTimeout(() => {
      console.log(this.state.pilot_type);
    }, 100);

  };

  filterWorkTypeChangeHandler = (type) => {
    let work_type = this.state.work_type;
    if (work_type.includes(type)) {
      work_type.splice(work_type.indexOf(type), 1);
      this.setState({
        work_type: work_type,
      });
    } else {
      work_type.push(type);
      this.setState({
        work_type: work_type,
      });
    }
    setTimeout(() => {
      console.log(this.state.work_type);
    }, 100);
  };

  dislikeSuccessClosePopup = (id) => {
    this.setState({
      dislikeSuccess: false,
      dislikeId: id,
    });
  };

  dislikeSuccessPopup = (id) => {
    this.setState({
      dislikeSuccess: true,
      dislikeID: id
    });
  };

  likeSuccessPopupClose = () => {
    this.setState({
      likeSuccess: false,
    });
  };

  dislikeSuccessSubmitPopup = () => {
    this.setState({
      dislikeSuccess: false,
    });
    this.unlikePost(this.state.dislikeID);
  };

  loginErrorPopupClose = () => {
    this.setState({
      loginErrorPopup: false,
    });
  };
  searchFilter = () =>{
    // filter_keyword: "",
    // filter_country: "",
    // filter_city: "",
    // pilot_type: [],
    // work_type: [],
    // price_range: [20, 40],
    this.setState({ loading: true });
    const data = {
      keywords : this.state.filter_keyword,
      employeeType: this.state.pilot_type,
      jobType : this.state.work_type,
      
      
      address: this.state.address
    }
    if(document.getElementById("priceChecker").checked === true ){
      data.price = this.state.price_range
    }
    axios.post(`${domain}/api/jobs/filterJobs`, data).then(res=>{
      console.log(res)
     console.log(res)
      this.setState({
        data : res.data
      })
      this.setState({ loading: false });

    })
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Apply Jobs</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <div className="h_p_container" style={{ overflowX: "hidden" }}>
          <Container className={All.Container}>
            <Row gutterWidth={40}>
              <Visible xxl xl>
                <Col xxl={3.5} xl={3.3} lg={4.15} md={5.4}>
                  <div id="h_p_create_job_container">
                    <div className="h_p_create_job_title">Show your talent</div>
                    <div className="h_p_create_job_desc">
                      Upload your Ariel shots and get paid
                    </div>
                    <button
                      className="h_p_create_job_btn"
                      onClick={() => this.props.history.push("/UploadFile")}
                    >
                      Upload Now
                    </button>
                  </div>

                  <div className="h_p_filter1_title1">Keywords</div>
                  <input
                    type="text"
                    className="a_j_keywords"
                    placeholder="Search Keywords"
                    onChange={this.filterKeywordChangeHandler}
                  />
                  <div className="h_p_filter1_title1">Location</div>
                  <div style={{display: "none"}}>
                  <select
                    className="a_j_select_dropdown"
                    onChange={this.filterCountryChangeHandler}
                  >
                    <option>Select Country</option>
                    <option value="India">India</option>
                    <option value="China">China</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Russia">Russia</option>
                  </select>
                  <div className="h_p_filter1_title1">City</div>
                  <select
                    className="a_j_select_dropdown"
                    id="a_j_select_dropdown1"
                    onChange={this.filterCityChangeHandler}
                  >
                    <option>Select City</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                  </div>
                  <div className="">
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
                          style={{ height: "40px" }}
                          {...getInputProps({
                            placeholder: "Search Places ...",
                            className: "a_j_filter_address",
                          })}
                        />
                        <div
                          className="autocomplete-dropdown-container"
                 
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
                <br />

                  <div
                    className="h_p_filter1_title"
                    onClick={() => this.dropdown("pilot_type_filter")}
                  >
                    Pilot type{" "}
                    <img
                      src={dropdown}
                      alt="dropdown img"
                      className={
                        this.state.view_pilot_type_filter
                          ? "h_p_filter1_dropdown1 h_p_dropdown_selected1"
                          : "h_p_filter1_dropdown1"
                      }
                    />
                  </div>
                  <div
                    className={
                      this.state.view_pilot_type_filter
                        ? "h_p_filter1_content_container "
                        : "h_p_filter1_content_container h_p_hide_filter"
                    }
                    id="h_p_pilot_type_filter"
                  >
                    <label className="h_p_filter1_filter1">
                      <input
                        type="checkbox"
                        className="h_p_filter1_checkbox"
                        onClick={() =>
                          this.filterPilotTypeChangeHandler("Licensed Pilot")
                        }
                      />
                      <div className="h_p_filter1_checkbox_label">
                        Licensed Pilots
                      </div>
                    </label>
                    <label className="h_p_filter1_filter1">
                      <input
                        type="checkbox"
                        className="h_p_filter1_checkbox"
                        onClick={() =>
                          this.filterPilotTypeChangeHandler("Unlicensed Pilot")
                        }
                      />

                      <div className="h_p_filter1_checkbox_label">
                        Unlicensed Pilots
                      </div>
                    </label>
                  </div>
                  <div
                    className="h_p_filter1_title"
                    onClick={() => this.dropdown("work_filter")}
                  >
                    Work{" "}
                    <img
                      src={dropdown}
                      alt="dropdown img"
                      className={
                        this.state.view_work_filter
                          ? "h_p_dropdown_selected1 h_p_filter1_dropdown1"
                          : "h_p_filter1_dropdown1"
                      }
                    />
                  </div>
                  <div
                    className={
                      this.state.view_work_filter
                        ? "h_p_filter1_content_container "
                        : "h_p_filter1_content_container h_p_hide_filter"
                    }
                    id="h_p_work_filter"
                  >
                    <label className="h_p_filter1_filter1">
                      <input
                        type="checkbox"
                        className="h_p_filter1_checkbox"
                        onClick={() =>
                          this.filterWorkTypeChangeHandler("Full-Time")
                        }
                      />
                      <div className="h_p_filter1_checkbox_label">
                        Full Time
                      </div>
                    </label>
                    <label className="h_p_filter1_filter1">
                      <input
                        type="checkbox"
                        className="h_p_filter1_checkbox"
                        onClick={() =>
                          this.filterWorkTypeChangeHandler("Part-Time")
                        }
                      />
                      <div className="h_p_filter1_checkbox_label">
                        Part Time
                      </div>
                    </label>
                  </div>
                  <div style={{marginBottom :"30px"}}>
                  <input
                            type="checkbox"
                            className="h_p_filter1_checkbox" style={{display: "inline"}}
                            id="priceChecker"
                          />
                  <div className="h_p_filter1_title" style={{display: "inline", marginBottom:"10px"}}>Salary</div>
                  </div>
                  <div
                    className={
                      this.state.view_hourly_rate_filter
                        ? "h_p_filter1_content_container "
                        : "h_p_filter1_content_container h_p_hide_filter"
                    }
                    id="h_p_hourly_rate_filter"
                  >
                    <div className="h_p_filter1_rate_content">
                      {" "}
                      ${this.state.price_range[0]} - $
                      {this.state.price_range[1]}
                    </div>
                    <Box style={{ marginRight: "7px", marginLeft: "10px" }}>
                      <AirbnbSlider
                        getAriaLabel={(index) =>
                          index === 0 ? "Minimum price" : "Maximum price"
                        }
                        value={this.state.price_range}
                        onChange={this.handlePriceRange}
                        min={this.state.price_range_min}
                        max={this.state.price_range_max}
                      />
                    </Box>
                  </div>
                  <div className="a_j_filter_search" onClick={this.searchFilter}>Search</div>
                </Col>
              </Visible>
              <Hidden xxl xl>
                <Col lg={12} md={12}>
                  <Row>
                    <Col lg={4} md={4} sm={12}>
                      <div className="h_p_filter1_title1">Keywords</div>
                      <input
                        type="text"
                        className="a_j_keywords"
                        placeholder="Search Keywords"
                      />
                    </Col>
                    <Hidden xs sm>
                      <Col lg={4} md={4} sm={6} xs={6}>
                        <div className="h_p_filter1_title1">Country</div>
                        <select
                          className="a_j_select_dropdown"
                          onChange={this.filterCountryChangeHandler}
                        >
                          <option>Select Country</option>
                          <option value="India">India</option>
                          <option value="China">China</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Russia">Russia</option>
                        </select>
                      </Col>
                      <Col lg={4} md={4} sm={6} xs={6}>
                        <div className="h_p_filter1_title1">City</div>
                        <select
                          className="a_j_select_dropdown"
                          id="a_j_select_dropdown1"
                          onChange={this.filterCityChangeHandler}
                        >
                          <option>Select City</option>
                          <option value="Chennai">Chennai</option>
                          <option value="Bangalore">Bangalore</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Delhi">Delhi</option>
                        </select>
                      </Col>
                    </Hidden>
                  </Row>
                  <div
                    className="a_j_more_filter"
                    onClick={this.showMoreFilters}
                  >
                    More filters
                    <img
                      src={dropdown}
                      alt="dropdown img"
                      className={
                        this.state.show_more_filters
                          ? "h_p_filter1_dropdown1 h_p_dropdown_selected1"
                          : "h_p_filter1_dropdown1"
                      }
                    />
                  </div>
                  {this.state.show_more_filters && (
                    <div id="show_more_filter">
                      <Row>
                        <Hidden md lg>
                          <Col sm={6} xs={6}>
                            <div className="h_p_filter1_title1">Country</div>
                            <select
                              className="a_j_select_dropdown"
                              onChange={this.filterCountryChangeHandler}
                            >
                              <option>Select Country</option>
                              <option value="India">India</option>
                              <option value="China">China</option>
                              <option value="Pakistan">Pakistan</option>
                              <option value="Russia">Russia</option>
                            </select>
                          </Col>
                          <Col sm={6} xs={6}>
                            <div className="h_p_filter1_title1">City</div>
                            <select
                              className="a_j_select_dropdown"
                              id="a_j_select_dropdown1"
                              onChange={this.filterCityChangeHandler}
                            >
                              <option>Select City</option>
                              <option value="Chennai">Chennai</option>
                              <option value="Bangalore">Bangalore</option>
                              <option value="Mumbai">Mumbai</option>
                              <option value="Delhi">Delhi</option>
                            </select>
                          </Col>
                        </Hidden>
                      </Row>
                      <div
                        className="h_p_filter1_title"
                        onClick={() => this.dropdown("pilot_type_filter")}
                      >
                        Pilot types{" "}
                        <img
                          src={dropdown}
                          alt="dropdown img"
                          className={
                            this.state.view_pilot_type_filter
                              ? "h_p_filter1_dropdown1 h_p_dropdown_selected1"
                              : "h_p_filter1_dropdown1"
                          }
                        />
                      </div>
                      <div
                        className={
                          this.state.view_pilot_type_filter
                            ? "h_p_filter1_content_container "
                            : "h_p_filter1_content_container h_p_hide_filter"
                        }
                        id="h_p_pilot_type_filter"
                      >
                        <label className="h_p_filter1_filter1">
                          <input
                            type="checkbox"
                            className="h_p_filter1_checkbox"
                          />
                          <div className="h_p_filter1_checkbox_label">
                            Licensed Pilots
                          </div>
                        </label>
                        <label className="h_p_filter1_filter1">
                          <input
                            type="checkbox"
                            className="h_p_filter1_checkbox"
                          />

                          <div className="h_p_filter1_checkbox_label">
                            Unlicensed Pilots
                          </div>
                        </label>
                      </div>
                      <div
                        className="h_p_filter1_title"
                        onClick={() => this.dropdown("work_filter")}
                      >
                        Work{" "}
                        <img
                          src={dropdown}
                          alt="dropdown img"
                          className={
                            this.state.view_work_filter
                              ? "h_p_dropdown_selected1 h_p_filter1_dropdown1"
                              : "h_p_filter1_dropdown1"
                          }
                        />
                      </div>
                      <div
                        className={
                          this.state.view_work_filter
                            ? "h_p_filter1_content_container "
                            : "h_p_filter1_content_container h_p_hide_filter"
                        }
                        id="h_p_work_filter"
                      >
                        <label className="h_p_filter1_filter1">
                          <input
                            type="checkbox"
                            className="h_p_filter1_checkbox"
                          />
                          <div className="h_p_filter1_checkbox_label">
                            Full Time
                          </div>
                        </label>
                        <label className="h_p_filter1_filter1">
                          <input
                            type="checkbox"
                            className="h_p_filter1_checkbox"
                          />
                          <div className="h_p_filter1_checkbox_label">
                            Part Time
                          </div>
                        </label>
                      </div>
                      <input
                            type="checkbox"
                            className="h_p_filter1_checkbox"
                          />
                      <div className="h_p_filter1_title">Monthly Salary</div>
                      <div
                        className={
                          this.state.view_hourly_rate_filter
                            ? "h_p_filter1_content_container "
                            : "h_p_filter1_content_container h_p_hide_filter"
                        }
                        id="h_p_hourly_rate_filter"
                      >
                        <div className="h_p_filter1_rate_content">
                          {" "}
                          ${this.state.price_range[0]} - $
                          {this.state.price_range[1]}
                        </div>
                        <Box style={{ marginRight: "7px", marginLeft: "10px" }}>
                          <AirbnbSlider
                            getAriaLabel={(index) =>
                              index === 0 ? "Minimum price" : "Maximum price"
                            }
                            value={this.state.price_range}
                            onChange={this.handlePriceRange}
                            min={this.state.price_range_min}
                            max={this.state.price_range_max}
                          />
                        </Box>
                      </div>
                    </div>
                  )}
                  <div className="a_j_filter_search">Search</div>
                </Col>
              </Hidden>
              <Col xxl={8.5} xl={8.7} lg={4.15} md={5.4}>
                <div className="h_p_title_container">
                  <div className="h_p_title">Apply jobs and get hired</div>
                  <div className="h_p_title_desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nam, sunt.
                  </div>
                </div>
                <div style={{ margin: "40px 0px 50px 0px" }}>
                  {this.state.loading && (
                    <Skeleton
                      height={250}
                      count={3}
                      style={{ marginBottom: "20px" }}
                    />
                  )}
                  {!this.state.loading && !this.state.data.length && (
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
                            It seems we can’t find any results based on your
                            search.{" "}
                          </label>
                        </Box>
                      </Box>
                    </div>
                  )}
                  {this.state.data.map((item, i) => {
                    return (
                      <div
                        className="pd_a_j_data"
                        style={{ margin: "20px 0px 0px 0px" }}
                      >
                        <div style={{ marginBottom: "10px" }}>
                          <div className="pd_a_j_dataDateHead">
                            Posted on:
                            <span className="pd_a_j_dataDate">
                              {item.postingDate.slice(0, 10)}
                            </span>
                          </div>
                          <div className="pd_a_j_dataTitle">
                            {item.jobTitle}
                          </div>
                        </div>
                        <div className="pd_a_j_data_subTitle">
                          {item.companyName}
                        </div>
                        <div>
                          <div className="a_j_container1">
                            <div className="a_j_listing_img1">
                              <img src={profileUser} />
                            </div>
                            <div className="a_j_listing_profileName">
                              {item.employeeType}
                            </div>
                            <div className="a_j_listing_img2">
                              <img src={money} />
                            </div>
                            <div className="a_j_listing_money">
                              {
                                item.minSalary ? `${item.minSalary}.00 - ${item.maxSalary}.00` : "Not Mentioned"
                              }
                              
                            </div>
                          </div>
                          <div className="a_j_listing_text" style = {{wordBreak: "break-word"}}>
                            {" "}
                            {item.jobDesc.slice(0, 148)}...
                          </div>
                          <hr className="a_j_listing_hr" />
                        </div>
                        <div className="a_j_listing_btns">
                          <button className="a_j_location_btn" style = {{cursor: "default"}}>
                            <img src={location} className="a_j_location_logo" />
                            <span className="a_j_location_text">
                              {item.workLocation.split(",")[0]}
                            </span>
                          </button>{" "}
                          <button className="a_j_location_btn" style = {{cursor: "default"}}>
                            <img src={work} className="a_j_location_logo" />
                            <span className="a_j_location_text">
                              {item.jobType}
                            </span>
                          </button>
                          <Link
                            to={`/applyJobLanding/${item._id}`}
                            id="a_j_job_btn"
                          >
                            View Job
                          </Link>{" "}
                          {this.state.liked.includes(item._id) ? (
                            <img
                              src={heartLike}
                              className="a_j_like"
                              onClick={() => this.unlikePost(item._id)}
                            />
                          ) : (
                            <img
                              src={heart}
                              className="a_j_like"
                              onClick={() => this.likePost(item._id)}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {this.state.next_page && (
                  <div
                    className="a_j_load_div"
                    style={{ marginBottom: "40px" }}
                  >
                    <button
                      className="a_j_loadMore_btn"
                      onClick={this.loadMore}
                    >
                      <img src={loadMore} className="a_j_location_logo" />
                      <span className="a_j_location_text">Load More</span>
                    </button>{" "}
                  </div>
                )}
              </Col>
            </Row>
            <Dialog
              open={this.state.likeSuccess}
              onClose={this.likeSuccessPopupClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"md"}
              fullWidth={true}
              PaperProps={{ style: { borderRadius: 10, width: "820px" } }}
            >
              <DialogContent
                className={All.PopupBody}
                style={{ marginBottom: "50px" }}
              >
                <div
                  style={{ position: "absolute", top: "20px", right: "20px" }}
                >
                  <img
                    src={Close}
                    alt=""
                    onClick={this.likeSuccessPopupClose}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Row style={{ marginTop: "30px" }}>
                  <div className="u_f_popup_title">
                    The Job has been saved successfully
                  </div>
                  <div className="u_f_popup_btn_container">
                    <button
                      className="u_f_popup_btn2"
                      onClick={this.likeSuccessPopupClose}
                    >
                      Close
                    </button>
                  </div>
                </Row>
              </DialogContent>
            </Dialog>
            <Dialog
              open={this.state.dislikeSuccess}
              onClose={this.dislikeSuccessClosePopup}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"md"}
              fullWidth={true}
              PaperProps={{ style: { borderRadius: 10, width: "820px" } }}
            >
              <DialogContent
                className={All.PopupBody}
                style={{ marginBottom: "50px" }}
              >
                <div
                  style={{ position: "absolute", top: "20px", right: "20px" }}
                >
                  <img
                    src={Close}
                    alt=""
                    onClick={this.dislikeSuccessClosePopup}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Row style={{ marginTop: "30px" }}>
                  <div className="u_f_popup_title">
                    Are you sure want to remove this job from your saved list?
                  </div>
                  <div className="u_f_popup_btn_container">
                    <button
                      className="u_f_popup_btn2"
                      onClick={this.dislikeSuccessClosePopup}
                      style={{ background: "#F5F5F7", marginRight: "20px" }}
                    >
                      No
                    </button>
                    <button
                      className="u_f_popup_btn2"
                      onClick={this.dislikeSuccessSubmitPopup}
                    >
                      Yes
                    </button>
                  </div>
                </Row>
              </DialogContent>
            </Dialog>
            <Dialog
              open={this.state.loginErrorPopup}
              onClose={this.loginErrorPopupClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"md"}
              fullWidth={true}
              PaperProps={{ style: { borderRadius: 10, width: "820px" } }}
            >
              <DialogContent
                className={All.PopupBody}
                style={{ marginBottom: "50px" }}
              >
                <div
                  style={{ position: "absolute", top: "20px", right: "20px" }}
                >
                  <img
                    src={Close}
                    alt=""
                    onClick={this.loginErrorPopupClose}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Row style={{ marginTop: "30px" }}>
                  <div
                    className="a_j_popup_title"
                    style={{ padding: "0px 60px" }}
                  >
                    You aren't logged into DroneZone. Please login to continue?
                  </div>
                  <div
                    className="u_f_popup_btn_container"
                    style={{ marginTop: "8px" }}
                  >
                    <div
                      className="j_l_applyJobLoginBtn"
                      style={{ width: "fit-content" }}
                      onClick={() => this.props.history.push("/login")}
                    >
                      Login / Sign Up
                    </div>
                  </div>
                </Row>
              </DialogContent>
            </Dialog>
          </Container>
        </div>
      </>
    );
  }
}

export default ApplyJob;
