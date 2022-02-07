import React, { Component } from 'react'
import { Container, Row, Col, Visible } from 'react-grid-system'
import All from './All.module.css';
import '../css/CreateJob.css'

class CreateJob extends Component {

  constructor(props) {
    super(props)
    this.state = {
      main_tab: 1,
      create_job_step: 1,
      company_name: "",
      job_title: "",
      industry: "",
      address: "",
      city: "",
      state: "",
      country: ""
    }
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
      create_job_step: 1
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
    }
  }

  saveDraft = () => {

  }

  SaveJob = () => {

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
              {this.state.create_job_step === 2 &&
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

              {this.state.create_job_step === 1 &&
              <Row>
                <div className="c_j_form_container">
                  <div className="c_j_form_title">Job Details</div>
                  <div className="c_j_form_input_title">Job type?</div>
                  <div className="c_j_radio_input_container">
                    <label className="c_j_radio_input_label">
                      <input type="radio" name="job_type" id="" className='c_j_input_radio'/>
                      <div className="c_j_input_sub_label">Full time</div>
                    </label>
                    <label className="c_j_radio_input_label">
                      <input type="radio" name="job_type" id="" className='c_j_input_radio'/>
                      <div className="c_j_input_sub_label">Part time</div>
                    </label>
                  </div>
                  <div className="c_j_form_input_title">Employee type</div>
                  <div className="c_j_radio_input_container">
                    <label className="c_j_radio_input_label">
                      <input type="radio" name="employee_type" id="" className='c_j_input_radio'/>
                      <div className="c_j_input_sub_label">Licensed Pilot</div>
                    </label>
                    <label className="c_j_radio_input_label">
                      <input type="radio" name="employee_type" id="" className='c_j_input_radio'/>
                      <div className="c_j_input_sub_label">Unlicensed Pilot</div>
                    </label>
                  </div>
                  <div className="c_j_form_input_title">Salary range</div>
                  <Row>
                    <Col>
                      <label className="c_j_input_label">
                        <div className="c_j_input_sub_label">Minimum</div>
                        <input type="number" name="" id="" className='c_j_price_input' style = {{width: "calc(100% - 60px)"}}/>
                        <div className="c_j_input_text" style = {{width: "50px", textAlign: "center", float: "right"}}>to</div>
                      </label>
                    </Col>
                    <Col>
                      <label className="c_j_input_label">
                        <div className="c_j_input_sub_label">Maximum</div>
                        <input type="number" name="" id="" className='c_j_price_input' />
                      </label>
                    </Col>
                    <Col>
                      <label className="c_j_input_label">
                        <div className="c_j_input_sub_label">Rate</div>
                        <select className='c_j_rate_input'>
                          <option value="per_month">Per month</option>
                          <option value="per_hour">Per hour</option>
                        </select>
                      </label>
                    </Col>
                    <Col></Col>
                  </Row>
                  <label className="c_j_input_label">
                    <div className="c_j_form_input_title">Job posting date</div>
                    <input type="date" name="" id="" className='c_j_date_input' />
                    <div className="c_j_input_text">If you want to post the job later, here you can mention the date.</div>
                  </label>
                  <label className="c_j_input_label">
                    <div className="c_j_form_input_title">Work location</div>
                    <input type="text" name="" id="" className='c_j_form_input' placeholder='E.g Bangalore'/>
                  </label>
                  <label className="c_j_input_label">
                    <div className="c_j_form_input_title">Job description</div>
                    <textarea id="" className='c_j_form_textarea'></textarea>
                  </label>
                </div>
              </Row>
              }
              <Row>
                <div className="c_j_btn_container">
                  <button className="c_j_btn" id="c_j_btn_cancel" onClick={this.clearForm}>Cancel</button>
                  <button className="c_j_btn" id="c_j_btn_save_draft" onClick={this.saveDraft}>Save as draft</button>
                  {this.state.create_job_step === 1 && <button className="c_j_btn" id="c_j_btn_continue" onClick={this.continueProcess}>Continue</button>}
                  {this.state.create_job_step === 2 && <button className="c_j_btn" id="c_j_btn_continue" onClick={this.SaveJob}>Save</button>}
                </div>
              </Row>
            </>
          }

        </Container>
      </section>
    )
  }
}

export default CreateJob