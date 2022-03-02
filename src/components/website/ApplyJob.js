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
import axios from 'axios'
import MuiDialogContent from "@material-ui/core/DialogContent";
import loadMore from "../images/Group 71.svg";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import heart from "../images/heart (3).svg";
import heartLike from "../images/heart-blue.svg";
import Close from "../images/close.svg";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";  


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
      data: [],
      view_pilot_type_filter: true,
      view_work_filter: false,
      view_hourly_rate_filter: true,
      price_range: [20, 40],
      price_range_min: 0,
      price_range_max: 200,
      show_more_filters: false,
      listing: [
        {
          id: 1,
          name: "Drone Cinematograper",
          date: "06 Jan 2022",
          producer: "UTV Motion Pictures",
          profile: "Professional Pilot",
          range: "$150.00 - $200.00",
          desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quia tempora, molestias, modi praesentium alias expedita magnam quasi ullam optio, quibusdam ipsa asperiores officia harum",
          location: "Bangalore",
          type: "Full Time",
          like: true,
        },
        {
          id: 2,
          name: "React Cinematograper",
          date: "06 July 2022",
          producer: "UTV Motion Moviess",
          profile: "Full Stack Developer",
          range: "$150.00 - $600.00",
          desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quia tempora, molestias, modi praesentium alias expedita magnam quasi ullam optio, quibusdam ipsa asperiores officia harum",
          location: "Bangalore",
          type: "Part Time",
          like: false,
        },
        {
          id: 3,
          name: "Drone Cinematograper",
          date: "06 Jan 2022",
          producer: "UTV Motion Pictures",
          profile: "Professional Pilot",
          range: "$150.00 - $200.00",
          desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quia tempora, molestias, modi praesentium alias expedita magnam quasi ullam optio, quibusdam ipsa asperiores officia harum",
          location: "Bangalore",
          type: "Full Time",
          like: true,
        },
        {
          id: 4,
          name: "Drone Cinematograper",
          date: "06 Jan 2022",
          producer: "UTV Motion Pictures",
          profile: "Professional Pilot",
          range: "$150.00 - $200.00",
          desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quia tempora, molestias, modi praesentium alias expedita magnam quasi ullam optio, quibusdam ipsa asperiores officia harum",
          location: "Bangalore",
          type: "Full Time",
          like: false,
        },
      ],
      liked : [],
      dialogOpen: false,
      dialogOpen1: false,
    };
  }
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
    axios.get(`http://localhost:9000/api/jobs/getJobs?page=1`)
      .then(res => {
        const persons = res.data;
        console.log(persons.results)
        this.setState({ data : persons.results });
      })
      axios.post(`http://localhost:9000/api/pilot/getLikedJobs`, this.config)
      .then(res => {
        const persons = res.data;
        console.log(persons)
        this.setState({ liked: persons });
      })
  }
  config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  likePost = (id) =>{
    console.log(this.config);
    this.setState({
      dialogOpen: true
    })
    this.state.liked.push(id)

    axios.post(`http://localhost:9000/api/jobs/likeJob/${id}`, this.config)

      .then((response) => {


if(response.data === "please Login"){
  // history.push("/pilot_dashboard/account")
  alert("loginFirst");
}


})
      .catch(() => {
      });
      
  }
  unlikePost = (id) =>{
    console.log(this.config);
    this.setState({
      dialogOpen1: true
    })
    // this.state.liked.push(id)
    let index = this.state.liked.indexOf(id);
    this.state.liked.splice(index, 1);
    axios.post(`http://localhost:9000/api/jobs/unlikeJob/${id}`, this.config)

      .then((response) => {


if(response.data === "please Login"){
  // history.push("/pilot_dashboard/account")
  alert("loginFirst");
}


})
      .catch(() => {
      });
      
  }
  closeChoicePopup = () => {
    this.setState({
      dialogOpen: false
    })}
    closeChoicePopup1 = () => {
      this.setState({
        dialogOpen1: false
      })}
  
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
                  />
                  <div className="h_p_filter1_title1">Country</div>
                  <select className="a_j_select_dropdown">
                    <option>select Country</option>
                    <option>India</option>
                    <option>India</option>
                    <option>India</option>
                    <option>India</option>
                  </select>
                  <div className="h_p_filter1_title1">City</div>
                  <select
                    className="a_j_select_dropdown"
                    id="a_j_select_dropdown1"
                  >
                    <option>Select City</option>
                    <option>Bangalore</option>
                    <option>Bangalore</option>
                    <option>Bangalore</option>
                    <option>Bangalore</option>
                  </select>

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
                      <input type="checkbox" className="h_p_filter1_checkbox" />
                      <div className="h_p_filter1_checkbox_label">
                        Licensed Pilots
                      </div>
                    </label>
                    <label className="h_p_filter1_filter1">
                      <input type="checkbox" className="h_p_filter1_checkbox" />

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
                      <input type="checkbox" className="h_p_filter1_checkbox" />
                      <div className="h_p_filter1_checkbox_label">
                        Full Time
                      </div>
                    </label>
                    <label className="h_p_filter1_filter1">
                      <input type="checkbox" className="h_p_filter1_checkbox" />
                      <div className="h_p_filter1_checkbox_label">
                        Part Time
                      </div>
                    </label>
                  </div>
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
                        <select className="a_j_select_dropdown">
                          <option>select Country</option>
                          <option>India</option>
                          <option>India</option>
                          <option>India</option>
                          <option>India</option>
                        </select>
                      </Col>
                      <Col lg={4} md={4} sm={6} xs={6}>
                        <div className="h_p_filter1_title1">City</div>
                        <select
                          className="a_j_select_dropdown"
                          id="a_j_select_dropdown1"
                        >
                          <option>Select City</option>
                          <option>Bangalore</option>
                          <option>Bangalore</option>
                          <option>Bangalore</option>
                          <option>Bangalore</option>
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
                            <select className="a_j_select_dropdown">
                              <option>select Country</option>
                              <option>India</option>
                              <option>India</option>
                              <option>India</option>
                              <option>India</option>
                            </select>
                          </Col>
                          <Col sm={6} xs={6}>
                            <div className="h_p_filter1_title1">City</div>
                            <select
                              className="a_j_select_dropdown"
                              id="a_j_select_dropdown1"
                            >
                              <option>Select City</option>
                              <option>Bangalore</option>
                              <option>Bangalore</option>
                              <option>Bangalore</option>
                              <option>Bangalore</option>
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
                </Col>
              </Hidden>
              <Col>
                <div className="h_p_title_container">
                  <div className="h_p_title">Apply jobs and get hired</div>
                  <div className="h_p_title_desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nam, sunt.
                  </div>
                </div>
                <div style={{ margin: "40px 0px 50px 0px" }}>
                  {this.state.data.map((item, i) => {
                    return (
                      <div
                        className="pd_a_j_data"
                        style={{ margin: "20px 0px 0px 0px" }}
                      >
                        <div style={{ marginBottom: "10px" }}>
                          <div className="pd_a_j_dataDateHead">
                            Posted on:
                            <span className="pd_a_j_dataDate">{item.postingDate.slice(0,10)}</span>
                          </div>
                          <div className="pd_a_j_dataTitle">{item.jobTitle}</div>
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
                             $ {item.minSalary}.00 - ${item.maxSalary}.00
                            </div>
                          </div>
                          <div className="a_j_listing_text"> {item.jobDesc.slice(0,148)}</div>
                          <hr className="a_j_listing_hr" />
                        </div>
                        <div className="a_j_listing_btns">
                          <button className="a_j_location_btn">
                            <img src={location} className="a_j_location_logo" />
                            <span className="a_j_location_text">
                              {item.city}
                            </span>
                          </button>{" "}
                          <button className="a_j_location_btn">
                            <img src={work} className="a_j_location_logo" />
                            <span className="a_j_location_text">
                              {item.jobType}
                            </span>
                          </button>
                          <Link to=  {`/applyJobLanding/${item._id}`} id="a_j_job_btn">
                            View Job
                          </Link>{" "}
                          {
                            this.state.liked.includes(item._id)?  <img
                            src={heartLike}
                            className="a_j_like" onClick={()=>this.unlikePost(item._id)}
                          /> :  <img
                          src={heart}
                          className="a_j_like" onClick={()=>this.likePost(item._id)}
                        />
                          }
                         
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="a_j_load_div" style={{ marginBottom: "40px" }}>
                  <button className="a_j_loadMore_btn">
                    <img src={loadMore} className="a_j_location_logo" />
                    <span className="a_j_location_text">Load More</span>
                  </button>{" "}
                </div>
              </Col>
            </Row>
            <Dialog
                open={this.state.dialogOpen}
                onClose={this.closeChoicePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth={true}
              >

                <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
                  <div style={{ position: "absolute", top: '20px', right: '20px' }}>
                    <img src={Close} alt="" onClick={this.closeChoicePopup} style={{ cursor: "pointer" }} />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title">The Job has been saved successfully</div>
                    <div className="u_f_popup_btn_container">
                      <button className="u_f_popup_btn2" onClick={this.closeChoicePopup}>Close</button>
                    </div>
                  </Row>
                </DialogContent>
              </Dialog>
              <Dialog
                open={this.state.dialogOpen1}
                onClose={this.closeChoicePopup1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth={true}
              >

                <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
                  <div style={{ position: "absolute", top: '20px', right: '20px' }}>
                    <img src={Close} alt="" onClick={this.closeChoicePopup1} style={{ cursor: "pointer" }} />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title">The Job has been Unsaved successfully</div>
                    <div className="u_f_popup_btn_container">
                      <button className="u_f_popup_btn2" onClick={this.closeChoicePopup1}>Close</button>
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
