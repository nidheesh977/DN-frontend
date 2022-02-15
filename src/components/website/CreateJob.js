import React, { Component } from 'react'
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'
import All from './All.module.css';
import '../css/CreateJob.css'
import $ from 'jquery'
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Close from "../images/close.svg";
import { withStyles } from "@material-ui/core/styles";
import profileUser from "../images/profile-user.svg";
import money from "../images/money.svg";
import heart from "../images/heart (3).svg";
import heartLike from "../images/heart-blue.svg";
import { Link } from "react-router-dom";
import loadMore from "../images/Group 71.svg";
import c_j_edit from '../images/c_j_edit.png'
import c_j_bin from '../images/c_j_bin.png'
import locationIcon from '../images/location.svg'
import workIcon from '../images/work.svg'

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

class CreateJob extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show_popup: true,
      main_tab: 1,
      create_job_step: 1,
      company_name: "",
      job_title: "",
      industry: "",
      address: "",
      city: "",
      state: "",
      country: "",
      min_salery: "",
      max_salery: "",
      rate: 'per_month',
      date: "",
      location: "",
      description: "",
      draft_listing: [
        {
          id: 1,
          name: "Yasar Arafath",
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
          like: true,
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
          like: false,
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
    }
  }

  componentDidMount() {
    console.log("Helo")
    $('html,body').scrollTop(0);
  }

  selectMainTab = (tab) => {
    this.setState({
      main_tab: tab
    })
  }

  inputChangeHandler = (e, input) => {
    this.setState({
      [input]: e.target.value
    })
    this.refs[input].style.backgroundColor = "#F5F5F7"
  }

  clearForm = () => {
    this.setState({
      company_name: "",
      job_title: "",
      industry: "",
      address: "",
      city: "",
      state: "",
      country: "",
      create_job_step: 2,
      job_type: "full_time",
      employee_type: "licensed",
      min_salery: "",
      max_salery: "",
      rate: 'per_month',
      date: "",
      location: "",
      description: ""
    })

  }

  continueProcess = () => {
    if (this.state.company_name == "") {
      this.refs.company_name.focus()
      this.refs.company_name.style.backgroundColor = "#ffe8e8"
    }
    else if (this.state.job_title == "") {
      this.refs.job_title.focus()
      this.refs.job_title.style.backgroundColor = "#ffe8e8"
    }
    else if (this.state.industry == "") {
      this.refs.industry.focus()
      this.refs.industry.style.backgroundColor = "#ffe8e8"
    }
    else if (this.state.address == "") {
      this.refs.address.focus()
      this.refs.address.style.backgroundColor = "#ffe8e8"
    }
    else if (this.state.city == "") {
      this.refs.city.focus()
      this.refs.city.style.backgroundColor = "#ffe8e8"
    }
    else if (this.state.state == "") {
      this.refs.state.focus()
      this.refs.state.style.backgroundColor = "#ffe8e8"
    }
    else if (this.state.country == "") {
      this.refs.country.focus()
      this.refs.country.style.backgroundColor = "#ffe8e8"
    }
    else {
      this.setState({
        create_job_step: 2
      })
      $('html,body').scrollTop(0);
    }
  }

  saveDraft = () => {

  }

  PostJob = () => {
    console.log(this.state)
    if (this.state.min_salery == "") {
      this.refs.min_salery.focus()
      this.refs.min_salery.style.backgroundColor = "#ffe8e8"
    }

    else if (this.state.max_salery == "") {
      this.refs.max_salery.focus()
      this.refs.max_salery.style.backgroundColor = "#ffe8e8"
    }

    else if (this.state.location == "") {
      this.refs.location.focus()
      this.refs.location.style.backgroundColor = "#ffe8e8"
    }

    else if (this.state.description == "") {
      this.refs.description.focus()
      this.refs.description.style.backgroundColor = "#ffe8e8"
    }

    else {
      alert("ready")
      $('html,body').scrollTop(0);
    }
  }

  minSaleryChange = (e) => {
    this.setState({
      min_salery: e.target.value
    })
    this.refs.min_salery.style.backgroundColor = "#F5F5F7"
  }

  maxSalaryChange = (e) => {
    this.setState({
      max_salery: e.target.value
    })
    this.refs.max_salery.style.backgroundColor = "#F5F5F7"
  }

  rateChange = (e) => {
    this.setState({
      rate: e.target.value
    })
  }

  dateChange = (e) => {
    this.setState({
      date: e.target.value
    })
  }

  locationChange = (e) => {
    this.setState({
      location: e.target.value
    })
    this.refs.location.style.backgroundColor = "#F5F5F7"
  }

  descriptionChange = (e) => {
    this.setState({
      description: e.target.value
    })
    this.refs.description.style.backgroundColor = "#F5F5F7"
  }

  closePopup = () => {
    this.setState({
      show_popup: false
    })
  }

  openDraft = () => {
    this.setState({
      show_popup: false,
      main_tab: 2,
    })
    $('html,body').scrollTop(0);
  }

  uploadNew = () => {
    this.setState({
      show_popup: false,
      main_tab: 1
    })
    $('html,body').scrollTop(0);
  }

  render() {
    return (
      <section style={{ backgroundColor: "#F8F8FB" }}>
        <div className="s_c_db_main_tabs">
          <Visible md>
            <div style={{ marginTop: "15px" }}></div>
          </Visible>
          <Visible sm>
            <div style={{ marginTop: "20px" }}></div>
          </Visible>
          <Visible xs>
            <div style={{ marginTop: "25px" }}></div>
          </Visible>
          <Container className={`${All.Container}`}>
            <div style={{ display: "flex" }}>
              <div className={this.state.main_tab === 1 ? "s_c_db_main_tab s_c_db_main_tab_selected" : "s_c_db_main_tab"} onClick={() => this.selectMainTab(1)}>Create New Job</div>
              <div className={this.state.main_tab === 2 ? "s_c_db_main_tab s_c_db_main_tab_selected" : "s_c_db_main_tab"} onClick={() => this.selectMainTab(2)}>Draft Jobs</div>
            </div>
          </Container>
        </div>
        <Container className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}>
          {this.state.main_tab === 1 &&
            <>
              <Row>
                <div className="c_j_title_container">
                  <div className="c_j_title">Job Application</div>
                  <div className="c_j_description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                </div>
              </Row>
              {this.state.create_job_step === 1 &&
                <Row>
                  <div className="c_j_form_container">
                    <div className="c_j_form_title">Basic Information</div>
                    <label className="c_j_input_label">
                      <div className="c_j_form_input_title">Company Name</div>
                      <input type="text" name="company_name" id="c_j_company_name" className="c_j_form_input" ref="company_name" value={this.state.company_name} onChange={(e) => this.inputChangeHandler(e, "company_name")} />
                    </label>
                    <label className="c_j_input_label">
                      <div className="c_j_form_input_title">Job Title</div>
                      <input type="text" name="job_title" id="c_j_job_title" className="c_j_form_input" ref="job_title" value={this.state.job_title} onChange={(e) => this.inputChangeHandler(e, "job_title")} />
                    </label>
                    <label className="c_j_input_label">
                      <div className="c_j_form_input_title">Industry</div>
                      <input type="text" name="industry" id="c_j_industry" className="c_j_form_input" ref="industry" value={this.state.industry} onChange={(e) => this.inputChangeHandler(e, "industry")} />
                    </label>
                    <label className="c_j_input_label">
                      <div className="c_j_form_input_title">Address</div>
                      <input type="text" name="address" id="c_j_address" className="c_j_form_input" ref="address" value={this.state.address} onChange={(e) => this.inputChangeHandler(e, "address")} />
                    </label>
                    <label className="c_j_input_label">
                      <div className="c_j_form_input_title">City</div>
                      <input type="text" name="city" id="c_j_city" className="c_j_form_input" ref="city" value={this.state.city} onChange={(e) => this.inputChangeHandler(e, "city")} />
                    </label>
                    <label className="c_j_input_label">
                      <div className="c_j_form_input_title">State</div>
                      <input type="text" name="state" id="c_j_state" className="c_j_form_input" ref="state" value={this.state.state} onChange={(e) => this.inputChangeHandler(e, "state")} />
                    </label>
                    <label className="c_j_input_label">
                      <div className="c_j_form_input_title">Country</div>
                      <input type="text" name="country" id="c_j_country" className="c_j_form_input" ref="country" value={this.state.country} onChange={(e) => this.inputChangeHandler(e, "country")} />
                    </label>
                  </div>
                </Row>
              }

              {this.state.create_job_step === 2 &&
                <Row>
                  <div className="c_j_form_container">
                    <div className="c_j_form_title">Job Details</div>
                    <div className="c_j_form_input_title">Job type?</div>
                    <div className="c_j_radio_input_container">
                      <label className="c_j_radio_input_label">
                        <input type="radio" name="job_type" id="" className='c_j_input_radio' onClick={() => this.setState({ job_type: "full_time" })} defaultChecked />
                        <div className="c_j_input_sub_label">Full time</div>
                      </label>
                      <label className="c_j_radio_input_label">
                        <input type="radio" name="job_type" id="" className='c_j_input_radio' onClick={() => this.setState({ job_type: "part_time" })} />
                        <div className="c_j_input_sub_label">Part time</div>
                      </label>
                    </div>
                    <div className="c_j_form_input_title">Employee type</div>
                    <div className="c_j_radio_input_container">
                      <label className="c_j_radio_input_label">
                        <input type="radio" name="employee_type" id="" className='c_j_input_radio' defaultChecked onClick={() => this.setState({ employee_type: "licensed" })} />
                        <div className="c_j_input_sub_label">Licensed Pilot</div>
                      </label>
                      <label className="c_j_radio_input_label">
                        <input type="radio" name="employee_type" id="" className='c_j_input_radio' onClick={() => this.setState({ employee_type: "unlicensed" })} />
                        <div className="c_j_input_sub_label">Unlicensed Pilot</div>
                      </label>
                    </div>
                    <div className="c_j_form_input_title">Salary range</div>

                    <div className="c_j_salery_input_container">
                      <label className="c_j_salery_input_label">
                        <div className="c_j_salery_input_label_title">Minimum</div>
                        <input type="number" className='c_j_salery_input' onChange={this.minSaleryChange} ref="min_salery" />
                      </label>
                      <Hidden xs>
                        <div className="c_j_salery_input_to">to</div>
                      </Hidden>
                      <Visible xs>
                        <div className="c_j_salery_input_to" style={{ width: "100%", paddingLeft: "90px" }}>to</div>
                      </Visible>
                      <label className="c_j_salery_input_label">
                        <div className="c_j_salery_input_label_title" onChange={this.maxSalaryChange}>Maximum</div>
                        <input type="number" className='c_j_salery_input' ref="max_salery" onChange={this.maxSalaryChange} />
                      </label>
                      <label className="c_j_salery_input_label">
                        <div className="c_j_salery_input_label_title">Rate</div>
                        <select className='c_j_salery_rate_input' onChange={this.rateChange}>
                          <option value="per_month">Per month</option>
                          <option value="per_hour">Per hour</option>
                        </select>
                      </label>
                    </div>

                    <div className="c_j_input_label">
                      <div className="c_j_form_input_title">Job posting date</div>
                      <input type="date" name="" id="" className='c_j_date_input' onChange={this.dateChange} />
                      <div className="c_j_input_text">If you want to post the job later, here you can mention the date.</div>
                    </div>
                    <label className="c_j_input_label">
                      <div className="c_j_form_input_title">Work location</div>
                      <input type="text" name="" id="" className='c_j_form_input' placeholder='E.g Bangalore' onChange={this.locationChange} ref="location" />
                    </label>
                    <label className="c_j_input_label">
                      <div className="c_j_form_input_title">Job description</div>
                      <textarea id="" className='c_j_form_textarea' onChange={this.descriptionChange} ref="description"></textarea>
                    </label>
                  </div>
                </Row>
              }
              <Row>
                <div className="c_j_btn_container">
                  <button className="c_j_btn" id="c_j_btn_cancel" onClick={this.clearForm}>Cancel</button>
                  <button className="c_j_btn" id="c_j_btn_save_draft" onClick={this.saveDraft}>Save as draft</button>
                  {this.state.create_job_step === 1 && <button className="c_j_btn" id="c_j_btn_continue" onClick={this.continueProcess}>Continue</button>}
                  {this.state.create_job_step === 2 && <button className="c_j_btn" id="c_j_btn_continue" onClick={this.PostJob}>Post Now</button>}
                </div>
              </Row>
            </>
          }

          {this.state.main_tab === 2 &&
            <>

              <Row>
                <div className="c_j_title_container" style = {{marginBottom: '40px'}}>
                  <div className="c_j_title">Draft Jobs</div>
                  <div className="c_j_description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                </div>
              </Row>

              <Row>
                <div className="c_j_draft_item_container">
                  <div className="c_j_drafts_container">
                    <div className="pd_a_j_dataTitle">Drone Cinematographer</div>
                    <div className="pd_a_j_data_subTitle">UTV Motion Pictures</div>
                    <div className="a_j_container1">
                      <div className="a_j_listing_img1">
                        <img src={profileUser} />
                      </div>
                      <div className="a_j_listing_profileName">Professional Pilot</div>
                      <div className="a_j_listing_img2">
                        <img src={money} />
                      </div>
                      <div className="a_j_listing_money">Not Mentioned</div>
                    </div>
                    <div className="a_j_listing_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...</div>
                  </div>
                  <button className='c_j_listing_btn c_j_location_btn'><img src={locationIcon} alt="" className='c_j_listing_icon1'/> Bangalore</button>
                  <button className='c_j_listing_btn c_j_job_type_btn'><img src={workIcon} alt="" className='c_j_listing_icon1'/> Full-Time</button>
                  <button className='c_j_listing_btn c_j_post_job_btn'>Post Job</button>
                  <img src={c_j_edit} alt="" className='c_j_listing_icon2'/>
                  <img src={c_j_bin} alt="" className='c_j_listing_icon2'/>
                </div>
              </Row>
              <Row>
                <div className="c_j_draft_item_container">
                  <div className="c_j_drafts_container">
                    <div className="pd_a_j_dataTitle">Drone Cinematographer</div>
                    <div className="pd_a_j_data_subTitle">UTV Motion Pictures</div>
                    <div className="a_j_container1">
                      <div className="a_j_listing_img1">
                        <img src={profileUser} />
                      </div>
                      <div className="a_j_listing_profileName">Professional Pilot</div>
                      <div className="a_j_listing_img2">
                        <img src={money} />
                      </div>
                      <div className="a_j_listing_money">Not Mentioned</div>
                    </div>
                    <div className="a_j_listing_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...</div>
                  </div>
                  <button className='c_j_listing_btn c_j_location_btn'><img src={locationIcon} alt="" className='c_j_listing_icon1'/> Bangalore</button>
                  <button className='c_j_listing_btn c_j_job_type_btn'><img src={workIcon} alt="" className='c_j_listing_icon1'/> Full-Time</button>
                  <button className='c_j_listing_btn c_j_post_job_btn'>Post Job</button>
                  <img src={c_j_edit} alt="" className='c_j_listing_icon2'/>
                  <img src={c_j_bin} alt="" className='c_j_listing_icon2'/>
                </div>
              </Row>
            </>
          }
        </Container>

        <Dialog
          open={this.state.show_popup}
          onClose={this.closePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
        >

          <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
            <div style={{ position: "absolute", top: '20px', right: '20px' }}>
              <img src={Close} alt="" onClick={this.closePopup} style={{ cursor: "pointer" }} />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">You have draft job in your account. do you want to continue post?</div>
              <div className="u_f_popup_btn_container">
                <button className="u_f_popup_btn1" onClick={this.openDraft}>Open Draft</button>
                <button className="u_f_popup_btn2" onClick={this.uploadNew}>Create New Job</button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>

        <Dialog
          open={this.state.job_created_popup}
          onClose={this.closePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
        >

          <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
            <div style={{ position: "absolute", top: '20px', right: '20px' }}>
              <img src={Close} alt="" onClick={this.closePopup} style={{ cursor: "pointer" }} />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">Success</div>
              
            </Row>
          </DialogContent>
        </Dialog>

        <Dialog
          open={this.state.job_created_popup}
          onClose={this.closePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
        >

          <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
            <div style={{ position: "absolute", top: '20px', right: '20px' }}>
              <img src={Close} alt="" onClick={this.closePopup} style={{ cursor: "pointer" }} />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">Success</div>
              <div className="u_f_popup_btn_container">
                <button className="u_f_popup_btn1" onClick={this.openDraft}>Open Draft</button>
                <button className="u_f_popup_btn2" onClick={this.uploadNew}>Create New Job</button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
      </section>
    )
  }
}

export default CreateJob