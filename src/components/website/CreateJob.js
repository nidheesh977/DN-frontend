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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Helmet } from "react-helmet";

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

class CreateJob extends Component {
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
      deleteDraftPopup: false,
      jobLimit: 1,
      subscriptionPlan: "basic",
      upgradePopup: false,
      limitExceededPopup: false,
    };
  }

  componentWillMount(){
    var role = localStorage.getItem("role")
    if (role === ""){
      this.props.history.push("/login");
    }
    if (role !== "company"){
      this.props.history.push("/no-page-found");
    }
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    var role = localStorage.getItem("role")
    if (role === "company"){

      Axios.get(
        `${domain}/api/company/getCompanySubscription
    `,
        config
      ).then((res) => {
        console.log(res.data);
        if (res.data.subscription) {
          this.setState({
            jobLimit:
              res.data.subscription.activeJobs -
              res.data.activeJobs -
              res.data.draftJobs,
            subscriptionPlan: res.data.subscription.plan,
          });
          console.log(
            res.data.subscription.activeJobs -
              res.data.activeJobs -
              res.data.draftJobs
          );
        } else {
          this.setState({
            jobLimit: 1 - res.data.activeJobs,
          });
        }
      });
  
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
      Axios.post(`${domain}/api/draftJob/getMyDrafts`, config).then((res) => {
        console.log(res);
        this.setState({
          draftJobs: res.data,
        });
      });
    }
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
    console.log(this.state.jobLimit);
    console.log(this.state.subscriptionPlan.includes("platinum"));
    if (
      this.state.jobLimit <= 0 &&
      !this.state.subscriptionPlan.includes("platinum")
    ) {
      console.log("Entered");
      this.setState({
        upgradePopup: true,
      });
    } else if (
      this.state.jobLimit <= 0 &&
      this.state.subscriptionPlan.includes("platinum")
    ) {
      this.setState({
        limitExceededPopup: true,
      });
    } else {
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
          fields[i] !== "openings" &&
          fields[i] !== "description"
        ) {
          if (this.state[fields[i]] === "") {
            error = true;
            document.getElementById(fields[i] + "_error").style.display =
              "contents";
            if (focusField === "" && fields[i] !== "location") {
              focusField = fields[i];
            }
          }
          if (
            fields[i] === "job_title" &&
            this.state.job_title !== "" &&
            (this.state.job_title.length > 100 ||
              this.state.job_title.length < 2)
          ) {
            error = true;
            if (focusField === "") {
              focusField = fields[i];
            }
            document.getElementById("job_title_error").innerText =
              "Job title must be between 2 and 100 characters";
            document.getElementById("job_title_error").style.display =
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
            document.getElementById("openings_error").style.display =
              "contents";
          }
          if (fields[i] === "description" && this.state.description === "") {
            error = true;
            document.getElementById("description_error").innerText =
              "Description is required";
            document.getElementById("description_error").style.display =
              "contents";
          }
          if (
            fields[i] === "description" &&
            this.state.description !== "" &&
            (this.state.description.length > 1500 ||
              this.state.description.length < 200)
          ) {
            error = true;
            document.getElementById("description_error").innerText =
              "Description must be between 200 and 1500 characters";
            document.getElementById("description_error").style.display =
              "contents";
          }
        }
      }

      if (error) {
        if (focusField !== "") {
          if (focusField === "industry") {
            document.getElementById("job_title").scrollIntoView();
          } else {
            document.getElementById(focusField).focus();
          }
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
          `${domain}/api/jobs/createJob`,
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
          },
          config
        )
          .then((res) => {
            console.log(res);
            localStorage.setItem("job_created", "true");
            this.clearForm();
            this.props.history.push("/company_dashboard/activities/jobs");
          })
          .catch((err) => {
            console.log(err);
          });
      }
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

  descriptionChange = (data) => {
    this.setState({
      description: data,
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

  saveDraft = () => {
    console.log(this.state.jobLimit);
    console.log(this.state.subscriptionPlan.includes("platinum"));
    if (
      this.state.jobLimit <= 0 &&
      !this.state.subscriptionPlan.includes("platinum")
    ) {
      console.log("Entered");
      this.setState({
        upgradePopup: true,
      });
    } else if (
      this.state.jobLimit <= 0 &&
      this.state.subscriptionPlan.includes("platinum")
    ) {
      this.setState({
        limitExceededPopup: true,
      });
    } else if (this.state.subscriptionPlan !== "basic") {
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
          if (fields[i] === "job_title" && this.state.job_title === "") {
            error = true;
            document.getElementById("job_title_error").style.display =
              "contents";
            if (focusField === "") {
              focusField = fields[i];
            }
          }
          if (
            fields[i] === "job_title" &&
            this.state.job_title !== "" &&
            (this.state.job_title.length > 100 ||
              this.state.job_title.length < 2)
          ) {
            error = true;
            if (focusField === "") {
              focusField = fields[i];
            }
            document.getElementById("job_title_error").innerText =
              "Job title must be between 2 and 100 characters";
            document.getElementById("job_title_error").style.display =
              "contents";
          }
          if (
            fields[i] === "description" &&
            this.state.description !== "" &&
            (this.state.description.length > 1500 ||
              this.state.description.length < 200)
          ) {
            error = true;

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
            document.getElementById("openings_error").style.display =
              "contents";
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

        Axios.post(
          `${domain}/api/draftJob/createDraft`,
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
          },
          config
        )
          .then((res) => {
            Axios.get(
              `${domain}/api/company/getCompanySubscription
        `,
              config
            ).then((res) => {
              console.log(res.data);
              if (res.data.subscription) {
                this.setState({
                  jobLimit:
                    res.data.subscription.activeJobs -
                    res.data.activeJobs -
                    res.data.draftJobs,
                  subscriptionPlan: res.data.subscription.plan,
                });
                console.log(
                  res.data.subscription.activeJobs -
                    res.data.activeJobs -
                    res.data.draftJobs
                );
              } else {
                this.setState({
                  jobLimit: 1 - res.data.activeJobs,
                });
              }
            });

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
            console.log(res);
            this.state.dialog = true;
            this.clearForm();
            $("html,body").scrollTop(0);
            Axios.post(`${domain}/api/draftJob/getMyDrafts`, config).then(
              (res) => {
                console.log(res);
                this.setState({
                  draftJobs: res.data,
                  main_tab: 2,
                });
              }
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      this.setState({
        upgradePopup: true,
      });
    }
  };

  deleteDraft = (id, index) => {
    this.setState({
      deleteDraftIndex: index,
    });

    this.setState({
      deleteDraftId: id,
      deleteDraftPopup: true,
    });
  };

  confirmDelete = () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    console.log(this.state.deleteDraftId);
    Axios.post(
      `${domain}/api/draftJob/deleteDraft`,
      { jobId: this.state.deleteDraftId },
      config
    )
      .then((res) => {
        console.log(res);
        this.setState({
          deleteDraftPopup: false,
        });
        let draftJobs = this.state.draftJobs;
        draftJobs.splice(this.state.deleteDraftIndex, 1);
        this.setState({
          draftJobs: draftJobs,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          deleteDraftPopup: false,
        });
      });
  };

  render() {
    return (
      <section style={{ backgroundColor: "#F8F8FB" }}>
        <Helmet>
          <title>Create Job</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
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
              <div
                className={
                  this.state.main_tab === 1
                    ? "s_c_db_main_tab s_c_db_main_tab_selected"
                    : "s_c_db_main_tab"
                }
                onClick={() => this.selectMainTab(1)}
              >
                Create New Job
              </div>
              <div
                className={
                  this.state.main_tab === 2
                    ? "s_c_db_main_tab s_c_db_main_tab_selected"
                    : "s_c_db_main_tab"
                }
                style = {{marginRight: "0px"}}
                onClick={() => this.selectMainTab(2)}
              >
                Draft Jobs
              </div>
            </div>
          </Container>
        </div>
        <Container
          className={`${All.Container}`}
        >
          {this.state.main_tab === 1 && (
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
                      id="industry"
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
                      <Col md = {4}>
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
                      <Col md = {4}>
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
                      <Col md = {4}>
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
                            id="location"
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
                  {/* <label className="c_j_input_label"> */}
                  <div
                    className="c_j_form_input_title"
                    style={{ cursor: "pointer" }}
                  >
                    Job description
                  </div>

                  <CKEditor
                    className="c_j_form_textarea"
                    editor={ClassicEditor}
                    config={{
                      toolbar: [
                        "bold",
                        "italic",
                        "bulletedList",
                        "numberedList",
                        "undo",
                        "redo",
                      ],
                    }}
                    data={this.state.description}
                    onReady={(editor) => {
                      console.log("Editor is ready to use!", editor);
                    }}
                    id="description"
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      this.descriptionChange(data);
                    }}
                  />

                  <div className="login_input_error_msg" id="description_error">
                    Job description is required
                  </div>
                  {/* </label> */}
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
                    id="c_j_btn_save_draft"
                    onClick={this.saveDraft}
                  >
                    Save as draft
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
          )}

          {this.state.main_tab === 2 && (
            <>
              <Row>
                <div
                  className="c_j_title_container"
                  style={{ marginBottom: "40px" }}
                >
                  <div className="c_j_title">Draft Jobs</div>
                  <div className="c_j_description">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                </div>
              </Row>
              {this.state.draftJobs.map((draftJob, index) => {
                return (
                  <Row>
                    <div className="c_j_draft_item_container">
                      <div className="c_j_drafts_container">
                        <div className="pd_a_j_dataTitle">
                          {draftJob.jobTitle}
                        </div>
                        <div className="pd_a_j_data_subTitle">
                          {draftJob.industry ? draftJob.industry : "- - - "}
                        </div>
                        <div className="a_j_container1">
                          <div className="a_j_listing_img1">
                            <img src={profileUser} />
                          </div>
                          <div className="a_j_listing_profileName">
                            {draftJob.employeeType
                              ? draftJob.employeeType
                              : "- - - "}
                          </div>
                          <div className="a_j_listing_img2">
                            <img src={money} />
                          </div>
                          <div className="a_j_listing_money">
                            {draftJob.minSalary
                              ? `$${draftJob.minSalary} - $${draftJob.maxSalary}`
                              : "Not mentioned"}
                          </div>
                        </div>
                      </div>
                      <button
                        className="c_j_listing_btn c_j_location_btn"
                        style={{ cursor: "default" }}
                      >
                        <img
                          src={locationIcon}
                          alt=""
                          className="c_j_listing_icon1"
                        />{" "}
                        {draftJob.workLocation
                          ? draftJob.workLocation.split(",")[0]
                          : "- - - "}
                      </button>
                      <button
                        className="c_j_listing_btn c_j_job_type_btn"
                        style={{ cursor: "default" }}
                      >
                        <img
                          src={workIcon}
                          alt=""
                          className="c_j_listing_icon1"
                        />{" "}
                        {draftJob.jobType ? draftJob.jobType : "- - - "}
                      </button>
                      <Link to={`/complete_draft/${draftJob._id}`}>
                        <button className="c_j_listing_btn c_j_post_job_btn">
                          Complete draft
                        </button>
                      </Link>
                      <img
                        src={c_j_bin}
                        alt=""
                        className="c_j_listing_icon2"
                        style={{ cursor: "pointer" }}
                        onClick={() => this.deleteDraft(draftJob._id, index)}
                      />
                    </div>
                  </Row>
                );
              })}
            </>
          )}
        </Container>

        <Dialog
          open={this.state.show_popup}
          onClose={this.closePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          PaperProps={{ style: { borderRadius: 10, maxWidth: "820px" } }}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={this.closePopup}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">
                You have draft job in your account. do you want to continue
                post?
              </div>
              <div className="u_f_popup_btn_container">
                <button className="u_f_popup_btn1" onClick={this.openDraft}>
                  Open Draft
                </button>
                <button className="u_f_popup_btn2" onClick={this.uploadNew}>
                  Create New Job
                </button>
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
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={this.closePopup}
                style={{ cursor: "pointer" }}
              />
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
          PaperProps={{ style: { borderRadius: 10 } }}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={this.closePopup}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">Success</div>
              <div className="u_f_popup_btn_container">
                <button className="u_f_popup_btn1" onClick={this.openDraft}>
                  Open Draft
                </button>
                <button className="u_f_popup_btn2" onClick={this.uploadNew}>
                  Create New Job
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
        {/* <Dialog
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
        </Dialog> */}
        <Dialog
          open={this.state.deleteDraftPopup}
          onClose={() => this.setState({ deleteDraftPopup: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          PaperProps={{ style: { borderRadius: 20, width: "700px" } }}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={() => this.setState({ deleteDraftPopup: false })}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title" style={{ marginBottom: "20px" }}>
                Delete
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "muli-regular",
                  fontSize: "18px",
                  width: "100%",
                  marginBottom: "30px",
                }}
              >
                Do you want to delete this draft
              </div>
              <div
                className="u_f_popup_btn_container"
                style={{ display: "inline-block" }}
              >
                <button
                  className="u_f_popup_btn1"
                  onClick={() => this.setState({ deleteDraftPopup: false })}
                >
                  Close
                </button>
                <button className="u_f_popup_btn2" onClick={this.confirmDelete}>
                  Delete
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.upgradePopup}
          onClose={() => this.setState({ upgradePopup: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          PaperProps={{
            style: {
              maxWidth: "820px",
              borderRadius: "10px",
            },
          }}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={() => this.setState({ upgradePopup: false })}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">
                You exceeded your active job limit. Upgrade to comtinue.
              </div>
              <div className="u_f_popup_btn_container">
                <button
                  className="u_f_popup_btn1"
                  onClick={() => this.setState({ upgradePopup: false })}
                >
                  Cancel
                </button>
                <button
                  className="u_f_popup_btn2"
                  onClick={() => this.props.history.push("/HireSubscription")}
                >
                  Upgrade
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.limitExceededPopup}
          onClose={() => this.setState({ limitExceededPopup: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          PaperProps={{
            style: {
              maxWidth: "820px",
              borderRadius: "10px",
            },
          }}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={() => this.setState({ limitExceededPopup: false })}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title">
                You exceeded your active job limit.
              </div>
              <div className="u_f_popup_btn_container">
                <button
                  className="u_f_popup_btn1"
                  onClick={() => this.setState({ limitExceededPopup: false })}
                >
                  Cancel
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
      </section>
    );
  }
}

export default CreateJob;
