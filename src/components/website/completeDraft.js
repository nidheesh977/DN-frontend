import React, { Component } from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "./All.module.css";
import "../css/CreateJob.css";
import $ from "jquery";
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
import c_j_edit from "../images/c_j_edit.png";
import c_j_bin from "../images/c_j_bin.png";
import locationIcon from "../images/location.svg";
import workIcon from "../images/work.svg";
import Axios from "axios";
import Select from "react-select";
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

const customStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#999999" : null,
      color: "#333333",
    };
  },
};

class CompleteDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
      show_popup: false,
      main_tab: 1,
      create_job_step: 1,
      company_name: "",
      job_title: "",
      job_type: "Full-Time",
      employee_type: "Licensed Pilot",
      industry: "",
      address: "",
      city: "",
      state: "",
      country: "",
      min_salary: "",
      max_salary: "",
      rate: "month",
      date: "",
      location: "",
      description: "",
      industries: [],
      openings: "",
      draftJobs: [],
      deleteDraftId: "",
      deleteDraftIndex: "",
      deleteDraftPopup: false
    };
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    console.log("Helo");
    $("html,body").scrollTop(0);
    Axios.get(`${domain}/api/industry/getIndustries`).then((res) => {
      const options = res.data.map((d) => ({
        value: d.industry,
        label: d.industry,
      }));
      this.setState({
        industries: options,
      });
    });
    Axios.post(`${domain}/api/draftJob/getDetails`, {draftId: this.props.match.params.id}).then((res) => {
      this.setState({
        job_title: res.data.jobTitle,
        job_type: res.data.jobType,
        employee_type: res.data.employeeType,
        industry: res.data.industry,
        min_salary: res.data.minSalary,
        max_salary: res.data.maxSalary,
        rate: res.data.salaryType,
        location: res.data.workLocation,
        description: res.data.jobDesc,
        openings: res.data.noOfOpenings,
      })
    });
  }

  selectMainTab = (tab) => {
    this.setState({
      main_tab: tab,
    });
  };

  inputChangeHandler = (e, input) => {
    this.setState({
      [input]: e.target.value,
    });
    document.getElementById(`${input}_error`).style.display = "none";
  };
  closeChoicePopup = () => {
    this.setState({
      dialog: false,
    });
  };
  clearForm = () => {
    this.setState({
      job_title: "",
      job_type: "Full-Time",
      employee_type: "Licensed Pilot",
      industry: "",
      min_salary: "",
      max_salary: "",
      rate: "month",
      location: "",
      description: "",
      openings: "",
    });
    document.getElementById("job_title").focus();
    document.getElementById("job_title_error").style.display = "none";
    document.getElementById("industry_error").style.display = "none";
    document.getElementById("min_salary_error").style.display = "none";
    document.getElementById("max_salary_error").style.display = "none";
    document.getElementById("location_error").style.display = "none";
    document.getElementById("description_error").style.display = "none";
    document.getElementById("openings_error").style.display = "none";
  };

  PostJob = () => {
    var fields = [
      "job_title",
      "industry",
      "min_salary",
      "max_salary",
      "openings",
      "location",
      "description",
    ];

    var error = false;
    var focusField = "";

    for (var i = 0; i < fields.length; i++) {
      if (
        fields[i] !== "min_salary" &&
        fields[i] !== "max_salary" &&
        fields[i] !== "openings"
      ) {
        if (this.state[fields[i]] === "") {
          error = true;
          document.getElementById(fields[i] + "_error").style.display =
            "contents";
          if (focusField === "") {
            focusField = fields[i];
          }
        }
        if (
          fields[i] === "job_title" &&
          this.state.job_title !== "" &&
          (this.state.job_title.length > 100 || this.state.job_title.length < 2)
        ) {
          error = true;
          if (focusField === "") {
            focusField = fields[i];
          }
          document.getElementById("job_title_error").innerText =
            "Job title must be between 2 and 100 characters";
          document.getElementById("job_title_error").style.display = "contents";
        }
        if (
          fields[i] === "description" &&
          this.state.description !== "" &&
          (this.state.description.length > 1500 ||
            this.state.description.length < 200)
        ) {
          error = true;
          if (focusField === "") {
            focusField = fields[i];
          }
          document.getElementById("description_error").innerText =
            "Description must be between 200 and 1500 characters";
          document.getElementById("description_error").style.display =
            "contents";
        }
      } else {
        if (
          fields[i] === "min_salary" &&
          this.state.max_salary !== "" &&
          this.state.min_salary === ""
        ) {
          error = true;
          if (focusField === "") {
            focusField = fields[i];
          }
          document.getElementById("min_salary_error").innerText =
            "Mention minimum salary";
          document.getElementById("min_salary_error").style.display =
            "contents";
        }
        if (
          fields[i] === "max_salary" &&
          this.state.min_salary !== "" &&
          this.state.max_salary === ""
        ) {
          error = true;
          if (focusField === "") {
            focusField = fields[i];
          }
          document.getElementById("max_salary_error").innerText =
            "Mention maximum salary";
          document.getElementById("max_salary_error").style.display =
            "contents";
        }
        if (
          fields[i] === "max_salary" &&
          Number(this.state.min_salary) > Number(this.state.max_salary)
        ) {
          error = true;
          if (focusField === "") {
            focusField = fields[i];
          }
          document.getElementById("max_salary_error").innerText =
            "Maximum salary should not be less than minimum salary";
          document.getElementById("max_salary_error").style.display =
            "contents";
        }
        if (fields[i] === "openings" && Number(this.state.openings) > 1000) {
          error = true;
          if (focusField === "") {
            focusField = fields[i];
          }
          document.getElementById("openings_error").innerText =
            "Maximum openings is 1000";
          document.getElementById("openings_error").style.display = "contents";
        }
      }
    }

    if (error) {
      if (focusField !== "") {
        document.getElementById(focusField).focus();
      }
      console.log(focusField);
    } else {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };

      $("html,body").scrollTop(0);
      Axios.post(
        `${domain}/api/draftJob/submitDraft`,
        {
          jobTitle: this.state.job_title,
          industry: this.state.industry,
          jobType: this.state.job_type,
          employeeType: this.state.employee_type,
          minSalary: this.state.min_salary,
          maxSalary: this.state.max_salary,
          salaryType: this.state.rate,
          workLocation: this.state.location,
          jobDesc: this.state.description,
          noOfOpenings: this.state.openings,
          draftId: this.props.match.params.id
        },
        config
      )
        .then((res) => {
          console.log(res);
          this.clearForm();
        //   this.state.dialog = true;
          this.props.history.push("/company_dashboard/activities/jobs")
        })
        .catch((err) => {
          console.log(err);
        });
      
    }
  };

  handleChange1 = (address) => {
    this.setState({ location: address });
    document.getElementById(`location_error`).style.display = "none";
  };

  handleSelect = (address) => {
    console.log(address);
    this.setState({ location: address });

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
    document.getElementById(`location_error`).style.display = "none";
  };

  minSaleryChange = (e) => {
    this.setState({
      min_salary: e.target.value,
    });
    document.getElementById(`min_salary_error`).style.display = "none";
    document.getElementById(`max_salary_error`).style.display = "none";
  };

  maxSalaryChange = (e) => {
    this.setState({
      max_salary: e.target.value,
    });
    document.getElementById(`max_salary_error`).style.display = "none";
    document.getElementById(`min_salary_error`).style.display = "none";
  };

  rateChange = (e) => {
    var job_type;
    if (e.target.value === "month") {
      job_type = "Full-Time";
    } else {
      job_type = "Part-Time";
    }
    this.setState({
      rate: e.target.value,
      job_type: job_type,
    });
  };

  dateChange = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  locationChange = (e) => {
    this.setState({
      location: e.target.value,
    });
    document.getElementById(`location_error`).style.display = "none";
  };

  descriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
    document.getElementById(`description_error`).style.display = "none";
  };

  closePopup = () => {
    this.setState({
      show_popup: false,
    });
  };

  openDraft = () => {
    this.setState({
      show_popup: false,
      main_tab: 2,
    });
    $("html,body").scrollTop(0);
  };

  uploadNew = () => {
    this.setState({
      show_popup: false,
      main_tab: 1,
    });
    $("html,body").scrollTop(0);
  };

  industryChange = (value) => {
    this.setState({
      industry: value.value,
    });

    console.log(value.value);
    document.getElementById(`industry_error`).style.visibility = "hidden";
  };

  deleteDraft = (id, index) => {
    this.setState({
      deleteDraftIndex: index
    })
    
    this.setState({
      deleteDraftId: id,
      deleteDraftPopup: true
    })
  }

  confirmDelete = () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    console.log(this.state.deleteDraftId)
    Axios.post(`${domain}/api/draftJob/deleteDraft`, {jobId: this.state.deleteDraftId}, config)
    .then(res => {
      console.log(res)
      this.setState({
        deleteDraftPopup: false
      })
      let draftJobs = this.state.draftJobs
      draftJobs.splice(this.state.deleteDraftIndex, 1)
      this.setState({
        draftJobs: draftJobs
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({
        deleteDraftPopup: false
      })
    })
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
        </div>
        <Container
          className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}
        >
            <>
              <Row>
                <div className="c_j_title_container">
                  <div className="c_j_title">Job Application</div>
                  <div className="c_j_description">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
              </Row>
              <Row>
                <div className="c_j_form_container">
                  <div className="c_j_form_title">Basic Information</div>
                  <label className="c_j_input_label">
                    <div
                      className="c_j_form_input_title"
                      style={{ cursor: "pointer" }}
                    >
                      Job Title
                    </div>
                    <input
                      type="text"
                      name="job_title"
                      id="job_title"
                      className="c_j_form_input"
                      ref="job_title"
                      value={this.state.job_title}
                      onChange={(e) => this.inputChangeHandler(e, "job_title")}
                    />
                    <div className="login_input_error_msg" id="job_title_error">
                      Job title is required
                    </div>
                  </label>
                  <label className="c_j_input_label">
                    <div
                      className="c_j_form_input_title"
                      style={{ cursor: "pointer" }}
                    >
                      Industry
                    </div>
                    <Select
                      options={this.state.industries}
                      onChange={this.industryChange}
                      styles={customStyles}
                      className="u_f_category_dropdown"
                      value={
                        this.state.industry && {
                          label: this.state.industry,
                          value: this.state.industry,
                        }
                      }
                    />
                    <div className="login_input_error_msg" id="industry_error">
                      Industry is required
                    </div>
                  </label>
                  <div className="c_j_form_input_title">Job type?</div>
                  <div className="c_j_radio_input_container">
                    <label className="c_j_radio_input_label">
                      <input
                        type="radio"
                        name="job_type"
                        id=""
                        className="c_j_input_radio"
                        onClick={() =>
                          this.setState({
                            job_type: "Full-Time",
                            rate: "month",
                          })
                        }
                        checked={this.state.job_type === "Full-Time"}
                      />
                      <div className="c_j_input_sub_label">Full time</div>
                    </label>
                    <label className="c_j_radio_input_label">
                      <input
                        type="radio"
                        name="job_type"
                        id=""
                        className="c_j_input_radio"
                        onClick={() =>
                          this.setState({ job_type: "Part-Time", rate: "hour" })
                        }
                        checked={this.state.job_type === "Part-Time"}
                      />
                      <div className="c_j_input_sub_label">Part time</div>
                    </label>
                  </div>
                  <div className="c_j_form_input_title">Employee type</div>
                  <div className="c_j_radio_input_container">
                    <label className="c_j_radio_input_label">
                      <input
                        type="radio"
                        name="employee_type"
                        id=""
                        className="c_j_input_radio"
                        defaultChecked
                        onClick={() =>
                          this.setState({ employee_type: "Licensed Pilot" })
                        }
                      />
                      <div className="c_j_input_sub_label">Licensed Pilot</div>
                    </label>
                    <label className="c_j_radio_input_label">
                      <input
                        type="radio"
                        name="employee_type"
                        id=""
                        className="c_j_input_radio"
                        onClick={() =>
                          this.setState({ employee_type: "Unlicensed Pilot" })
                        }
                      />
                      <div className="c_j_input_sub_label">
                        Unlicensed Pilot
                      </div>
                    </label>
                  </div>
                  <div className="c_j_form_input_title">Salary range</div>

                  <div>
                    <Row>
                      <Col>
                        <label className="c_j_input_label">
                          <div
                            className="c_j_salery_input_label_title"
                            style={{ cursor: "pointer" }}
                          >
                            Minimum
                          </div>
                          <input
                            type="number"
                            className="c_j_form_input"
                            onChange={this.minSaleryChange}
                            ref="min_salary"
                            id="min_salary"
                            value={this.state.min_salary}
                          />
                          <br />
                          <div
                            className="login_input_error_msg"
                            id="min_salary_error"
                          >
                            Minimum salary is required
                          </div>
                        </label>
                      </Col>
                      {/* <Hidden xs sm>
                        <div>to</div>
                      </Hidden>
                      <Visible xs sm>
                        <div style={{ width: "100%", paddingLeft: "90px" }}>
                          to
                        </div>
                      </Visible> */}
                      <Col>
                        <label className="c_j_input_label">
                          <div
                            className="c_j_salery_input_label_title"
                            onChange={this.maxSalaryChange}
                            style={{ cursor: "pointer" }}
                          >
                            Maximum
                          </div>
                          <input
                            type="number"
                            className="c_j_form_input"
                            ref="max_salary"
                            onChange={this.maxSalaryChange}
                            id="max_salary"
                            value={this.state.max_salary}
                          />
                          <br />
                          <div
                            className="login_input_error_msg"
                            id="max_salary_error"
                          >
                            Maximum salary is required
                          </div>
                        </label>
                      </Col>
                      <Col>
                        <label className="c_j_input_label">
                          <div className="c_j_salery_input_label_title">
                            Rate
                          </div>
                          <select
                            className="c_j_form_input"
                            onChange={this.rateChange}
                          >
                            <option
                              value="month"
                              selected={this.state.rate === "month"}
                            >
                              Per month
                            </option>
                            <option
                              value="hour"
                              selected={this.state.rate === "hour"}
                            >
                              Per hour
                            </option>
                          </select>
                        </label>
                      </Col>
                    </Row>
                  </div>
                  <label className="c_j_input_label">
                    <div
                      className="c_j_form_input_title"
                      style={{ cursor: "pointer" }}
                    >
                      No of openings
                    </div>
                    <input
                      type="number"
                      name="job_title"
                      id="openings"
                      className="c_j_form_input"
                      ref="job_title"
                      value={this.state.openings}
                      onChange={(e) => this.inputChangeHandler(e, "openings")}
                    />
                    <div className="login_input_error_msg" id="openings_error">
                      Maximum 1000 openings
                    </div>
                  </label>
                  {/* <div className="c_j_input_label">
                      <div className="c_j_form_input_title">Job posting date</div>
                      <input type="date" name="" id="" className='c_j_date_input' onChange={this.dateChange} />
                      <div className="c_j_input_text">If you want to post the job later, here you can mention the date.</div>
                    </div> */}
                  <label className="c_j_input_label">
                    <div
                      className="c_j_form_input_title"
                      style={{ cursor: "pointer" }}
                    >
                      Work location
                    </div>
                    <PlacesAutocomplete
                      value={this.state.location}
                      onChange={this.handleChange1}
                      onSelect={this.handleSelect}
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
                              className:
                                "location-search-input c_j_form_input ",
                            })}
                            style={{
                              backgroundColor: "#f5f5f7",
                              borderRadius: "5px",
                              border: "1px solid white",
                              outline: "none",
                              fontSize: "16px",
                            }}
                          />
                          {suggestions.length > 0 && (
                            <div
                              className="autocomplete-dropdown-container"
                              style={{
                                width: "calc(100%)",

                                position: "absolute",
                                top: "calc(100%)",
                                zIndex: 1000,
                                fontFamily: "muli-light",
                                fontSize: "16px",
                                border:
                                  suggestions.length === 0
                                    ? ""
                                    : "1px solid grey",
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
                    <div className="login_input_error_msg" id="location_error">
                      Work location is required
                    </div>
                  </label>
                  <label className="c_j_input_label">
                    <div
                      className="c_j_form_input_title"
                      style={{ cursor: "pointer" }}
                    >
                      Job description
                    </div>
                    <textarea
                      id="description"
                      className="c_j_form_textarea"
                      onChange={this.descriptionChange}
                      ref="description"
                      value={this.state.description}
                    ></textarea>

                    <div
                      className="login_input_error_msg"
                      id="description_error"
                    >
                      Job description is required
                    </div>
                  </label>
                </div>
              </Row>
              <Row>
                <div className="c_j_btn_container">
                  <button
                    className="c_j_btn"
                    id="c_j_btn_cancel"
                    onClick={this.clearForm}
                  >
                    Cancel
                  </button>
                  <button
                    className="c_j_btn"
                    id="c_j_btn_continue"
                    onClick={this.PostJob}
                  >
                    Post Now
                  </button>
                </div>
              </Row>
            </>
          
        </Container>

        <Dialog
          open={this.state.dialog}
          onClose={this.closeChoicePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={this.closeChoicePopup}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">
                Your Job has been submitted successfully
              </div>
              <div className="u_f_popup_btn_container">
                <button
                  className="u_f_popup_btn2"
                  onClick={this.closeChoicePopup}
                >
                  Close
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
      </section>
    );
  }
}

export default CompleteDraft;
