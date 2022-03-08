import React, { Component } from 'react';
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import All from './All.module.css';
import '../css/HirePilot.css';
import profileImg from '../images/profile_user@2x.png';
import dropdown from '../images/s_c_dropdown2.png';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import locationIcon from '../images/s_c_location.svg';
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import close from '../images/close.svg'
import { Helmet } from "react-helmet";
import Close from "../images/close.svg";
import axios from 'axios';
import Skeleton from "react-loading-skeleton";

const domain = process.env.REACT_APP_MY_API

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#00E7FC',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '1px solid #707070',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 0,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#cecece',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 2,
  },
}));

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
  }
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

class HirePilot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type_of_drones: ["DJI Mavic Air 2", "DJI Mavic 2 Pro", "DJI Mavic Mini", "DJI Mavic 2 Zoom", "DJI Phanton 4", "Parrot Anafi", "DJI Mavic Pro", "DJI Inspire 2", "DJI Inspire 1", "Parrot Bebop 2"],
      keywords: ["Areal View", "Agriculture", "NGO", "Agriculture", "Areal View", "Agriculture", "Areal View", "Agriculture", "NGO", "Agriculture", "Areal View", "NGO", "Areal View", "Agriculture", "NGO", "Agriculture", "Areal View", "Agriculture"],
      rating: 4,
      keywords_visible: 3,
      filter_tab: 1,
      price_range: [20, 40],
      price_range_min: 0,
      price_range_max: 100,
      show_suggestions: false,
      suggestions: ["Agriculture", "Manufacturing industry", "Media", "Real estate", "Film industry", "Agriculture", "Manufacturing industry", "Media", "Real estate", "Film industry"],
      searchValue: "",
      startProcess: false,
      selected_file: {},
      jobSaved: false,
      pilot_list: [],
      page: "page1",
      nextPage: false,
      loading: true,
      after_response: false,
    }
  }

  showJobSave = () => {
    this.setState({
      jobSaved: true
    })
  }

  closeJobSave = () => {
    this.setState({
      jobSaved: false
    })
  }

  handleMoreKeyword = (id) => {
    let pilot_list = this.state.pilot_list
    if(pilot_list[id].keyswordsVisible === 3){
      pilot_list[id].keyswordsVisible = pilot_list[id].skills.length
    }
    else{
      pilot_list[id].keyswordsVisible = 3
    }

    this.setState({
      pilot_list: pilot_list
    })
    console.log(pilot_list)
  }

  dropdown = (tab) => {
    if (this.state.filter_tab !== tab){
      this.setState({
        filter_tab: tab
      })
    }
    else{
      this.setState({
        filter_tab: ""
      })
    }
  }

  handlePriceRange = (e, value) => {
    this.setState({
      price_range: value
    })
  }

  handleShowSuggestions = () => {
    this.setState({
      show_suggestions: true
    })
  }

  // handleHideSuggestions = () => {
  //   this.setState({
  //     show_suggestions: false
  //   })
  // }

  selectSuggestion = (suggestion) => {
    console.log(suggestion)
    this.setState({
      searchValue: suggestion,
      show_suggestions: false
    })
  }

  handleSuggestionChange = (e) => {
    this.setState({
      searchValue: e.target.value,
      show_suggestions: true
    })
  }

  searchInput = (e) => {
    if (e.key === "Enter") {
      this.setState({
        show_suggestions: false
      })
    }
  }

  clickStartProcess = () => {
    this.setState({
      startProcess: true
    })
  }

  closeProcess = () => {
    this.setState({
      startProcess: false
    })
  }

  pilotDetailPage = (id) => {
    this.props.history.push("/pilot_details/" + id)
  }

  handleProcessFileChange = (e) => {
    this.setState({
      selected_file: e.target.files[0]
    })
  }

  sendMessage = (id) => {
    this.props.history.push("/pilot_details/" + id)
  }

  componentDidMount(){
    axios.get(`${domain}/api/pilot/hirePilots?${this.state.page}`)
    .then((res)=>{
      this.setState({
        pilot_list: res.data.results,
        loading: false,
        after_response: true
      })
      console.log(res)
    })
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Hire pilots</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <div className="h_p_container" style = {{overflowX: "hidden"}}>
          <Container className={All.Container}>
            <Row gutterWidth={40}>
              <Visible xxl xl>

                <Col xxl={3.5} xl={3.3}>
                  <div id="h_p_create_job_container">
                    <div className='h_p_create_job_title'>Create Job Alert</div>
                    <div className='h_p_create_job_desc'>Create a job alert now, Click below button</div>
                    <button className='h_p_create_job_btn' onClick = {() => this.props.history.push("/create_job")}>Create a job</button>
                  </div>
                  <div id="h_p_filters1_container">
                    <div className="h_p_filter1_heading">Filters</div>
                    <div className="h_p_filter1_title" onClick={() => this.dropdown(1)}>Pilot type <img src={dropdown} alt="dropdown img" className={this.state.filter_tab === 1 ? "h_p_filter1_dropdown h_p_dropdown_selected" : "h_p_filter1_dropdown"} /></div>
                    <div className={this.state.filter_tab === 1  ? "h_p_filter1_content_container " : "h_p_filter1_content_container h_p_hide_filter"} id="h_p_pilot_type_filter">
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">Licensed Pilots</div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />

                        <div className="h_p_filter1_checkbox_label">Unlicensed Pilots</div>
                      </label>
                    </div>
                    <div className="h_p_filter1_title" onClick={() => this.dropdown(2)}>Work <img src={dropdown} alt="dropdown img" className={this.state.filter_tab === 2 ? "h_p_dropdown_selected h_p_filter1_dropdown" : "h_p_filter1_dropdown"} /></div>
                    <div className={this.state.filter_tab === 2 ? "h_p_filter1_content_container " : "h_p_filter1_content_container h_p_hide_filter"} id="h_p_work_filter">
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">Full Time</div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">Part Time</div>
                      </label>
                    </div>
                    <div className="h_p_filter1_title" onClick={() => this.dropdown(3)}>Hourly Rate<img src={dropdown} alt="dropdown img" className={this.state.filter_tab === 3 ? "h_p_dropdown_selected h_p_filter1_dropdown" : "h_p_filter1_dropdown"} /></div>
                    <div className={this.state.filter_tab === 3 ? "h_p_filter1_content_container " : "h_p_filter1_content_container h_p_hide_filter"} id="h_p_hourly_rate_filter">
                      <div className="h_p_filter1_rate_content">Price Range ${this.state.price_range[0]} - ${this.state.price_range[1]}</div>
                      <Box style={{ marginRight: "7px", marginLeft: "10px" }}>
                        <AirbnbSlider
                          getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                          value={this.state.price_range}
                          onChange={this.handlePriceRange}
                          min={this.state.price_range_min}
                          max={this.state.price_range_max}
                        />
                      </Box>
                    </div>
                    <div className="h_p_filter1_title" onClick={() => this.dropdown(4)}>Type of Drone <img src={dropdown} alt="dropdown img" className={this.state.filter_tab === 4 ? "h_p_dropdown_selected h_p_filter1_dropdown" : "h_p_filter1_dropdown"} /></div>
                    <div className={this.state.filter_tab === 4 ? "h_p_filter1_content_container " : "h_p_filter1_content_container h_p_hide_filter"} id="h_p_type_of_drone_filter">
                      {this.state.type_of_drones.map((drone, index) => {
                        return (
                          <label className="h_p_filter1_filter" key={index}>
                            <input type="checkbox" className="h_p_filter1_checkbox" />
                            <div className="h_p_filter1_checkbox_label">{drone}</div>
                          </label>
                        )
                      })}
                    </div>
                    <div className="h_p_filter1_title" onClick={() => this.dropdown(5)}>Ratings <img src={dropdown} alt="dropdown img" className={this.state.filter_tab === 5 ? "h_p_dropdown_selected h_p_filter1_dropdown" : "h_p_filter1_dropdown"} /></div>
                    <div id="h_p_rating_filter" className={this.state.filter_tab === 5 ? "h_p_filter1_content_container" : "h_p_hide_filter"}>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">5 Star</div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">4 Star</div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">3 Star</div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">2 Star</div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">1 Star</div>
                      </label>
                    </div>
                  </div>
                </Col>
              </Visible>
              <Col>
                <div className="h_p_title_container">
                  <div className="h_p_title">Hire Drone Pilots</div>
                  <div className="h_p_title_desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, sunt.</div>
                </div>
                <Hidden xxl xl>
                  <div id="h_p_filters1_container">
                    <div className="h_p_filter1_heading">Filters</div>
                    <div className="h_p_filter1_title" onClick={() => this.dropdown(1)}>Pilot type <img src={dropdown} alt="dropdown img" className={this.state.filter_tab === 1 ? "h_p_filter1_dropdown h_p_dropdown_selected" : "h_p_filter1_dropdown"} /></div>
                    <div className={this.state.filter_tab === 1  ? "h_p_filter1_content_container " : "h_p_filter1_content_container h_p_hide_filter"} id="h_p_pilot_type_filter">
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">Licensed Pilots</div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />

                        <div className="h_p_filter1_checkbox_label">Unlicensed Pilots</div>
                      </label>
                    </div>
                    <div className="h_p_filter1_title" onClick={() => this.dropdown(2)}>Work <img src={dropdown} alt="dropdown img" className={this.state.filter_tab === 2 ? "h_p_dropdown_selected h_p_filter1_dropdown" : "h_p_filter1_dropdown"} /></div>
                    <div className={this.state.filter_tab === 2 ? "h_p_filter1_content_container " : "h_p_filter1_content_container h_p_hide_filter"} id="h_p_work_filter">
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">Full Time</div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">Part Time</div>
                      </label>
                    </div>
                    <div className="h_p_filter1_title" onClick={() => this.dropdown(3)}>Hourly Rate<img src={dropdown} alt="dropdown img" className={this.state.filter_tab === 3 ? "h_p_dropdown_selected h_p_filter1_dropdown" : "h_p_filter1_dropdown"} /></div>
                    <div className={this.state.filter_tab === 3 ? "h_p_filter1_content_container " : "h_p_filter1_content_container h_p_hide_filter"} id="h_p_hourly_rate_filter">
                      <div className="h_p_filter1_rate_content">Price Range ${this.state.price_range[0]} - ${this.state.price_range[1]}</div>
                      <Box style={{ marginRight: "7px", marginLeft: "10px" }}>
                        <AirbnbSlider
                          getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                          value={this.state.price_range}
                          onChange={this.handlePriceRange}
                          min={this.state.price_range_min}
                          max={this.state.price_range_max}
                        />
                      </Box>
                    </div>
                    <div className="h_p_filter1_title" onClick={() => this.dropdown(4)}>Type of Drone <img src={dropdown} alt="dropdown img" className={this.state.filter_tab === 4 ? "h_p_dropdown_selected h_p_filter1_dropdown" : "h_p_filter1_dropdown"} /></div>
                    <div className={this.state.filter_tab === 4 ? "h_p_filter1_content_container " : "h_p_filter1_content_container h_p_hide_filter"} id="h_p_type_of_drone_filter">
                      {this.state.type_of_drones.map((drone, index) => {
                        return (
                          <label className="h_p_filter1_filter" key={index}>
                            <input type="checkbox" className="h_p_filter1_checkbox" />
                            <div className="h_p_filter1_checkbox_label">{drone}</div>
                          </label>
                        )
                      })}
                    </div>
                    <div className="h_p_filter1_title" onClick={() => this.dropdown(5)}>Ratings <img src={dropdown} alt="dropdown img" className={this.state.filter_tab === 5 ? "h_p_dropdown_selected h_p_filter1_dropdown" : "h_p_filter1_dropdown"} /></div>
                    <div id="h_p_rating_filter" className={this.state.filter_tab === 5 ? "h_p_filter1_content_container" : "h_p_hide_filter"}>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">5 Star</div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">4 Star</div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">3 Star</div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">2 Star</div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input type="checkbox" className="h_p_filter1_checkbox" />
                        <div className="h_p_filter1_checkbox_label">1 Star</div>
                      </label>
                    </div>
                  </div>
                </Hidden>

                <div className="h_p_filter2_container">
                  <div className="h_p_filter2_input_container">
                    <Hidden sm xs>
                      <input type="text" placeholder='Enter Industry' name="" id="" className='h_p_filter2_input' onFocus={this.handleShowSuggestions} onChange={this.handleSuggestionChange} value={this.state.searchValue} onKeyUp={this.searchInput} />
                    </Hidden>
                    <Visible sm xs>
                      <input type="text" placeholder='Enter Industry' name="" id="" className='h_p_filter2_input' onFocus={this.handleShowSuggestions} onChange={this.handleSuggestionChange} value={this.state.searchValue} onKeyUp={this.searchInput} style = {{marginBottom: '10px', width: "300px"}}/>
                    </Visible>
                    <div className={this.state.show_suggestions ? "h_p_search_suggestions h_p_search_suggestions_show" : "h_p_search_suggestions"}>
                      <div className="h_p_suggestions_title">
                        Recommended Industry
                      </div>
                      <div className="h_p_suggestions_container">
                        {this.state.suggestions.map((suggestion, index) => {
                          return (
                            <div className="h_p_suggestion" onClick={() => this.selectSuggestion(suggestion)}>{suggestion}</div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="h_p_filter2_dropdown_container">
                    <div className="h_p_filter2_dropdown_title">Filter by:</div>
                    <select className='h_p_filter2_dropdown_country'>
                      <option value="USA">USA</option>
                    </select>
                    <select className='h_p_filter2_dropdown_state'>
                      <option value="New York">New York</option>
                    </select>
                  </div>

                </div>

                <Visible xxl xl lg md>
                  {this.state.loading && !this.state.pilot_list.length
                  && <Skeleton
                  height={250}
                  count={3}
                  style={{ marginBottom: "20px" }}
                />
                  }
                
                {this.state.pilot_list.map((pilot, index)=>{
                        
                        return(
                  <div className='h_p_listing_container'>
                    <Row>
                      <Col>
                        <div className="h_p_listing_img_container">
                          <img src={profileImg} alt="" className='h_p_listing_img' />
                        </div>
                        <div className="h_p_others_container">
                          <div className="h_p_listing_name" onClick={() => this.pilotDetailPage(pilot._id)}>{pilot.name}</div>
                          <div className="h_p_listing_job">{pilot.pilotType === "unlicensed"?"Professional Drone pilot":"Passionate Drone pilot"}</div>
                          <div className="h_p_listing_location"><img src={locationIcon} alt="" height={"13px"} style={{ marginRight: "4px" }} /> {pilot.city}, {pilot.country}</div>
                          <div className="h_p_listing_description">{pilot.bio}</div>
                          <div className="h_p_listing_keywords_container">
                          {pilot.skills.slice(0, pilot.keyswordsVisible).map((keyword, index) => {
                                return (
                                  <div className="h_p_listing_keyword">{keyword}</div>
                                )
                              })}
                            {pilot.skills.length > 3 &&
                              <>
                              {pilot.keyswordsVisible <= 3 ? <div className="h_p_listing_keyword h_p_listing_keyword_more" onClick={()=>this.handleMoreKeyword(index)}>+ {pilot.skills.length - 3} more</div> : <div className="h_p_listing_keyword h_p_listing_keyword_more" onClick={()=>this.handleMoreKeyword(index)}>- Show less</div>}
                              </>
                              }
                          </div>
                        </div>
                        <div className="h_p_listing_pricing_rating">
                          <div className="h_p_listing_price_container">
                            <div className="h_p_listing_price">$20</div>
                            <div className="h_p_listing_price_per">/hr</div>
                          </div>
                          <div className="h_p_rating_container">
                            <div className={pilot.rating >= 1 ? "h_p_rating h_p_rating_selected" : "h_p_rating h_p_rating_unselected"}>&#9733;</div>
                            <div className={pilot.rating >= 2 ? "h_p_rating h_p_rating_selected" : "h_p_rating h_p_rating_unselected"}>&#9733;</div>
                            <div className={pilot.rating >= 3 ? "h_p_rating h_p_rating_selected" : "h_p_rating h_p_rating_unselected"}>&#9733;</div>
                            <div className={pilot.rating >= 4 ? "h_p_rating h_p_rating_selected" : "h_p_rating h_p_rating_unselected"}>&#9733;</div>
                            <div className={pilot.rating >= 5 ? "h_p_rating h_p_rating_selected" : "h_p_rating h_p_rating_unselected"}>&#9733;</div>
                          </div>
                          <div className="h_p_listing_btn_container">
                            <button className="h_p_start_process_btn" onClick={this.clickStartProcess}>Start Process</button>
                            <button className="h_p_save_pilot_btn" onClick = {this.showJobSave}><i class="fa fa-heart"></i></button>
                          </div>
                          <div className="h_p_listing_send_msg_link" onClick = {() => this.sendMessage(1)}>Send Message</div>
                        </div>
                      </Col>
                    </Row>
                    
                  </div>
                        )})}
                </Visible>
                <Visible sm xs>
                      {this.state.pilot_list.map((pilot, index)=>{
                        
                      return(
                  <div className='h_p_listing_container'>

                    <Row>
                        <Col>
                          <div className="h_p_listing_img_container_sm">
                            <img src={profileImg} alt="" className='h_p_listing_img' />
                          </div>
                          <div className="h_p_others_container_sm">
                            <div className="h_p_listing_name" onClick={() => this.pilotDetailPage(1)} >{pilot.name}</div>
                            <div className="h_p_listing_job">{pilot.pilotType === "unlicensed"?"Professional Drone pilot":"Passionate Drone pilot"}</div>
                            <div className="h_p_listing_location"><img src={locationIcon} alt="" height={"13px"} style={{ marginRight: "4px" }} /> {pilot.city}, {pilot.country}</div>
                            <div className="h_p_listing_description">{pilot.bio}</div>
                            <div className="h_p_listing_keywords_container">
                              {pilot.skills.slice(0, pilot.keyswordsVisible).map((keyword, index) => {
                                return (
                                  <div className="h_p_listing_keyword">{keyword}</div>
                                )
                              })}
                              {pilot.skills.length > 3 &&
                              <>
                              {pilot.keyswordsVisible <= 3 ? <div className="h_p_listing_keyword h_p_listing_keyword_more" onClick={()=>this.handleMoreKeyword(index)}>+ {pilot.skills.length - 3} more</div> : <div className="h_p_listing_keyword h_p_listing_keyword_more" onClick={()=>this.handleMoreKeyword(index)}>- Show less</div>}
                              </>
                              }
                            </div>
                          </div>
                          <hr style={{ borderBottom: "1px solid #dcdcdc" }} />
                          <div className="h_p_listing_pricing_rating_sm">

                            <div className='h_p_star-price_box'>
                              <div className='h_p_price-container-1'>
                                <div className='h_p_price-rate'>$20 <span className='h_p_hour_time'>/hr</span>  </div>

                              </div>
                              <div class="h_p_star_section">
                                <div className={pilot.rating >= 1 ? "h_p_rating h_p_rating_selected  star-review-box  " : "h_p_rating h_p_rating_unselected   star-review-box"}>&#9733;</div>
                                <div className={pilot.rating >= 2 ? "h_p_rating h_p_rating_selected  star-review-box" : "h_p_rating h_p_rating_unselected   star-review-box"}>&#9733;</div>
                                <div className={pilot.rating >= 3 ? "h_p_rating h_p_rating_selected  star-review-box " : "h_p_rating h_p_rating_unselected   star-review-box "}>&#9733;</div>
                                <div className={pilot.rating >= 4 ? "h_p_rating h_p_rating_selected star-review-box " : "h_p_rating h_p_rating_unselected   star-review-box"}>&#9733;</div>
                                <div className={pilot.rating >= 5 ? "h_p_rating h_p_rating_selected star-review-box " : "h_p_rating h_p_rating_unselected   star-review-box"}>&#9733;</div>

                              </div>
                            </div>
                            <div className="h_p_listing_btn-container">
                              <button className="h_p_start_process_btn" onClick={this.clickStartProcess}>Start Process</button>
                              <button className="h_p_save_pilot_btn" onClick = {this.showJobSave}><i class="fa fa-heart"></i></button>
                              <div className="h_p_listing_send_msg_link " style={{ textAlign: "center" }} onClick = {() => this.sendMessage(1)}>Send Message</div>
                            </div>
                          </div>
                        </Col>
                    </Row>
                  </div>
                      )})}
                </Visible>
              </Col>
            </Row>
            <Dialog
              open={this.state.startProcess}
              onClose={this.closeProcess}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"md"}
              fullWidth={true}
              PaperProps={{style: { borderRadius: 10 }   }}
            >

              <DialogContent className={All.PopupBody} style={{ marginBottom: "50px"}}>
                <div style={{ position: "absolute", top: '20px', right: '20px' }}>
                  <img src={close} alt="" onClick={this.closeProcess} style={{ cursor: "pointer" }} />
                </div>
                <Row style={{ marginTop: "30px" }}>
                  <div className="h_p_start_process_form">
                    <div className="h_p_start_process_form_title">Hire Pilot</div>
                    <div className="h_p_start_process_form_label">Description</div>
                    <textarea className='h_p_start_process_form_description'></textarea>
                    <div className="h_p_start_process_form_label">Job Catalog (optional)</div>
                    <label>
                      <input type="file" name="" id="" className="h_p_start_process_form_file" onChange = {this.handleProcessFileChange}/>
                      <div className="h_p_start_process_form_file_label">Choose file to attach</div>
                      <div className="h_p_start_process_form_file_label_text">{this.state.selected_file.name?this.state.selected_file.name:"The file type should be in PDF, Docs"}</div>
                    </label>
                    <div className="h_p_start_process_form_btn_container">
                      <button onClick={this.closeProcess} className='h_p_start_process_form_btn'>Submit</button>
                    </div>
                  </div>
                </Row>
              </DialogContent>
            </Dialog>
            <Dialog
                open={this.state.jobSaved}
                onClose={this.closeJobSave}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth={true}
              >

                <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
                  <div style={{ position: "absolute", top: '20px', right: '20px' }} onClick={this.closeJobSave}>
                    <img src={Close} alt="" onClick={this.closeChoicePopup} style={{ cursor: "pointer" }} />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title" style = {{width: "100%"}}>Job saved successfully</div>
                    <div className="u_f_popup_btn_container">
                      <button className="u_f_popup_btn2" onClick={this.closeJobSave}>Close</button>
                    </div>
                  </Row>
                </DialogContent>
              </Dialog>
          </Container>
        </div>
      </>
    )
  }
}

export default HirePilot  