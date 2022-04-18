import React, { Component } from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "./All.module.css";
import "../css/HirePilot.css";
import profileImg from "../images/profile_user@2x.png";
import dropdown from "../images/s_c_dropdown2.png";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import locationIcon from "../images/s_c_location.svg";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import close from "../images/close.svg";
import { Helmet } from "react-helmet";
import Close from "../images/close.svg";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import AddFolder from "../images/addFolder1.png";
import Select from "react-select";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-autocomplete-places";

const domain = process.env.REACT_APP_MY_API;

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

const customStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#999999" : null,
      color: "#333333",
    };
  },
};

class HirePilot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords_visible: 3,
      filter_tab: 1,
      price_range: [200, 400],
      price_range_min: 0,
      price_range_max: 1000,
      show_suggestions: false,
      suggestions: [],
      searchValue: "",
      startProcess: false,
      selected_file: {},
      jobSaved: false,
      pilot_list: [],
      page: "page1",
      nextPage: false,
      loading: true,
      after_response: false,
      message: "",
      id2: "",
      savePilot: false,
      myFolders: [],
      selectedFolder: "",
      addFolder: false,
      name: "",
      description: "",
      selectedPilot: "",
      mySavedPilots: [],

      lisenced: false,
      unlisenced: false,
      full_time: false,
      part_time: false,
      filter_salary: false,
      selected_drones: [],
      keyword: "",
      location: "",
    };
  }

  folderChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  showJobSave = () => {
    this.setState({
      jobSaved: true,
    });
  };

  closeJobSave = () => {
    this.setState({
      jobSaved: false,
    });
  };

  handleMoreKeyword = (id) => {
    let pilot_list = this.state.pilot_list;
    if (pilot_list[id].keyswordsVisible === 3) {
      pilot_list[id].keyswordsVisible = pilot_list[id].skills.length;
    } else {
      pilot_list[id].keyswordsVisible = 3;
    }

    this.setState({
      pilot_list: pilot_list,
    });
    console.log(pilot_list);
  };
  closeSavePilot = () => {
    this.setState({
      savePilot: false,
    });
  };

  dropdown = (tab) => {
    if (this.state.filter_tab !== tab) {
      this.setState({
        filter_tab: tab,
      });
    } else {
      this.setState({
        filter_tab: "",
      });
    }
  };

  handlePriceRange = (e, value) => {
    this.setState({
      price_range: value,
    });
  };

  selectSuggestion = (suggestion) => {
    console.log(suggestion);
    this.setState({
      searchValue: suggestion,
      show_suggestions: false,
    });
  };

  handleSuggestionChange = (e) => {
    this.setState({
      searchValue: e.target.value,
      show_suggestions: true,
    });
  };

  clickStartProcess = (id1) => {
    this.setState({
      startProcess: true,
      id2: id1,
    });
  };

  clickStartProcess1 = (id1) => {
    this.setState({
      savePilot: true,
      selectedPilot: id1,
    });
  };
  closeProcess1 = () => {
    this.setState({
      startProcess: false,
      message: "",
    });
  };
  closeProcess = () => {
    if (this.state.message === "" || this.state.message.length >= 200) {
      document.getElementById("tomakered").style.backgroundColor = "#ffcccb";
    } else {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      axios
        .post(
          `${domain}/api/hireProposal/createProposal`,
          { pilotId: this.state.id2, message: this.state.message },
          config
        )
        .then((res) => {
          console.log(res);

          this.setState({
            startProcess: false,
            message: "",
          });
        });
    }
  };
  savePilotToFolder = () => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    axios
      .post(
        `${domain}/api/savePilot/savePilot`,
        {
          pilotId: this.state.selectedPilot,
          folderId: this.state.selectedFolder,
        },
        config
      )
      .then((res) => {
        console.log(res);
        this.setState({
          savePilot: false,
        });
        axios
          .post(`${domain}/api/savePilot/getMySavedPilots`, config)
          .then((res) => {
            console.log(res);
            this.setState({
              mySavedPilots: res.data,
            });
          });
      });
  };
  addFolderNew = () => {
    this.setState({
      savePilot: false,
      addFolder: true,
    });
  };
  createFolderSavePilot = () => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    if (this.state.name == "" || this.state.name.length >= 100) {
      document.getElementById("name").style.backgroundColor = "#ffcccb";
    } else if (
      this.state.description == "" ||
      this.state.description.length >= 200
    ) {
      document.getElementById("description").style.backgroundColor = "#ffcccb";
    } else {
      axios
        .post(
          `${domain}/api/folder/createFolder`,
          { folderName: this.state.name, description: this.state.description },
          config
        )
        .then((res) => {
          console.log(res);
          this.setState({
            name: "",
            description: "",
          });
          axios.get(`${domain}/api/folder/getMyFolders`, config).then((res) => {
            console.log(res);
            this.setState({
              myFolders: res.data,
              selectedFolder: res.data[0]._id,
              addFolder: false,
            });
            this.setState({
              savePilot: true,
            });
          });
        });
    }
  };
  pilotDetailPage = (id) => {
    this.props.history.push("/pilot_details/" + id);
  };

  handleProcessFileChange = (e) => {
    this.setState({
      selected_file: e.target.files[0],
    });
  };
  closeAddFolder = () => {
    this.setState({
      addFolder: false,
    });
  };

  sendMessage = (id) => {
    this.props.history.push("/pilot_details/" + id);
  };

  componentDidMount() {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    axios
      .get(`${domain}/api/pilot/hirePilots?${this.state.page}`)
      .then((res) => {
        this.setState({
          pilot_list: res.data.results,
          loading: false,
          after_response: true,
        });
        console.log(res);
      });

    axios.get(`${domain}/api/folder/getMyFolders`, config).then((res) => {
      console.log(res);
      this.setState({
        myFolders: res.data,
        selectedFolder: res.data.length > 0 ? res.data[0]._id : "",
      });

      // document.getElementById(`folder/${this.state.selectedFolder}`).style.border = "1px solid red"
    });
    axios
      .post(`${domain}/api/savePilot/getMySavedPilots`, config)
      .then((res) => {
        console.log(res);
        this.setState({
          mySavedPilots: res.data,
        });
      });

    axios
      .get(`${domain}/api/brand/getBrands`)
      .then((res) => {
        var suggestions = []
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++){
          suggestions.push({label: res.data[i].brand, value: res.data[i].brand})
        }
        this.setState({
          suggestions: suggestions
        })
        console.log(suggestions)
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Nothing");
  }
  messageHandler = (e) => {
    document.getElementById("tomakered").style.backgroundColor = "white";

    this.setState({
      message: e.target.value,
    });
  };

  selectFolder = async (id) => {
    this.setState({
      selectedFolder: id,
    });
  };

  unsavePilot = (id) => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios
      .post(`${domain}/api/savePilot/unsavePilot`, { pilotId: id }, config)
      .then((res) => {
        console.log(res.data);
        axios
          .post(`${domain}/api/savePilot/getMySavedPilots`, config)
          .then((res) => {
            console.log(res);
            this.setState({
              mySavedPilots: res.data,
            });
          });
      });
  };

  selectFilter = (field) => {
    var state = !this.state[field];
    this.setState({
      [field]: state,
    });
  };

  selectTypeOfDrone = (drone) => {
    var state = this.state.selected_drones;
    if (state.includes(drone)) {
      state.splice(state.indexOf(drone), 1);
    } else {
      state.push(drone);
    }
    this.setState({
      selected_drones: state,
    });

    console.log(state);
  };

  industryChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  droneTypeChange = (values) => {
    var result = values.map((x) => x.value);
    this.setState({
      selected_drones: result,
    });
    console.log(this.state.selected_drones);
  };

  handleLocationChange = (location) => {
    this.setState({
      location: location,
    });
  };

  handleSelect = (address) => {
    console.log(address);
    this.setState({ location: address });
  };

  searchFilter = () => {
    var work_type = []
    if(this.state.lisenced){
      work_type.push("Licensed Pilot")
    }
    if(this.state.unlisenced){
      work_type.push("Unlicensed Pilot")
    }
    var employee_type = []
    if(this.state.full_time){
      employee_type.push("Full-Time")
    }
    if(this.state.part_time){
      employee_type.push("Part-Time")
    }    console.log(work_type)
    console.log(employee_type)
    console.log(this.state.filter_salary);
    console.log(this.state.selected_drones);
    console.log(this.state.keyword);
    console.log(this.state.location);
    console.log(this.state.price_range);
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Hire pilots</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <div className="h_p_container" style={{ overflowX: "hidden" }}>
          <Container className={All.Container}>
            <Row gutterWidth={40}>
              <Visible xxl xl>
                <Col xxl={3.5} xl={3.3}>
                  <div id="h_p_create_job_container">
                    <div className="h_p_create_job_title">Create Job Alert</div>
                    <div className="h_p_create_job_desc">
                      Create a job alert now, Click below button
                    </div>
                    <button
                      className="h_p_create_job_btn"
                      onClick={() => this.props.history.push("/create_job")}
                    >
                      Create a job
                    </button>
                  </div>
                  <div id="h_p_filters1_container">
                    <div className="h_p_filter1_heading">Filters</div>
                    <div
                      className="h_p_filter1_title"
                      onClick={() => this.dropdown(1)}
                    >
                      Pilot type{" "}
                      <img
                        src={dropdown}
                        alt="dropdown img"
                        className={
                          this.state.filter_tab === 1
                            ? "h_p_filter1_dropdown h_p_dropdown_selected"
                            : "h_p_filter1_dropdown"
                        }
                      />
                    </div>
                    <div
                      className={
                        this.state.filter_tab === 1
                          ? "h_p_filter1_content_container "
                          : "h_p_filter1_content_container h_p_hide_filter"
                      }
                      id="h_p_pilot_type_filter"
                    >
                      <label className="h_p_filter1_filter">
                        <input
                          type="checkbox"
                          className="h_p_filter1_checkbox"
                          onChange={() => this.selectFilter("lisenced")}
                        />
                        <div className="h_p_filter1_checkbox_label">
                          Licensed Pilots
                        </div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input
                          type="checkbox"
                          className="h_p_filter1_checkbox"
                          onChange={() => this.selectFilter("unlisenced")}
                        />
                        <div className="h_p_filter1_checkbox_label">
                          Unlicensed Pilots
                        </div>
                      </label>
                    </div>
                    <div
                      className="h_p_filter1_title"
                      onClick={() => this.dropdown(2)}
                    >
                      Work{" "}
                      <img
                        src={dropdown}
                        alt="dropdown img"
                        className={
                          this.state.filter_tab === 2
                            ? "h_p_dropdown_selected h_p_filter1_dropdown"
                            : "h_p_filter1_dropdown"
                        }
                      />
                    </div>
                    <div
                      className={
                        this.state.filter_tab === 2
                          ? "h_p_filter1_content_container "
                          : "h_p_filter1_content_container h_p_hide_filter"
                      }
                      id="h_p_work_filter"
                    >
                      <label className="h_p_filter1_filter">
                        <input
                          type="checkbox"
                          className="h_p_filter1_checkbox"
                          onChange={() => this.selectFilter("full_time")}
                        />
                        <div className="h_p_filter1_checkbox_label">
                          Full Time
                        </div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input
                          type="checkbox"
                          className="h_p_filter1_checkbox"
                          onChange={() => this.selectFilter("part_time")}
                        />
                        <div className="h_p_filter1_checkbox_label">
                          Part Time
                        </div>
                      </label>
                    </div>
                    <div
                      className="h_p_filter1_title"
                      onClick={() => this.dropdown(3)}
                    >
                      Salary Range
                      <img
                        src={dropdown}
                        alt="dropdown img"
                        className={
                          this.state.filter_tab === 3
                            ? "h_p_dropdown_selected h_p_filter1_dropdown"
                            : "h_p_filter1_dropdown"
                        }
                      />
                    </div>
                    <div
                      className={
                        this.state.filter_tab === 3
                          ? "h_p_filter1_content_container "
                          : "h_p_filter1_content_container h_p_hide_filter"
                      }
                      id="h_p_hourly_rate_filter"
                    >
                      <label style={{ cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          style={{ marginLeft: "0px" }}
                          onChange={() => this.selectFilter("filter_salary")}
                        />{" "}
                        <div
                          style={{
                            fontSize: "15px",
                            fontFamily: "muli-regular",
                            lineHeight: "22px",
                            display: "inline-block",
                            marginBottom: "15px",
                          }}
                        >
                          Filter salary
                        </div>
                      </label>
                      <div className="h_p_filter1_rate_content">
                        Price Range ${this.state.price_range[0]} - $
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
                    <div
                      className="h_p_filter1_title"
                      onClick={() => this.dropdown(4)}
                    >
                      Type of Drone{" "}
                      <img
                        src={dropdown}
                        alt="dropdown img"
                        className={
                          this.state.filter_tab === 4
                            ? "h_p_dropdown_selected h_p_filter1_dropdown"
                            : "h_p_filter1_dropdown"
                        }
                      />
                    </div>
                    <div
                      className={
                        this.state.filter_tab === 4
                          ? "h_p_filter1_content_container "
                          : "h_p_filter1_content_container h_p_hide_filter"
                      }
                      id="h_p_type_of_drone_filter"
                    >
                      <Select
                        options={this.state.suggestions}
                        onChange={this.droneTypeChange}
                        styles={customStyles}
                        className="u_f_category_dropdown"
                        isMulti
                      />
                    </div>
                    <div
                      className="a_j_filter_search"
                      onClick={this.searchFilter}
                    >
                      Search
                    </div>
                  </div>
                </Col>
              </Visible>
              <Col>
                <div className="h_p_title_container">
                  <div className="h_p_title">Hire Drone Pilots</div>
                  <div className="h_p_title_desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nam, sunt.
                  </div>
                </div>
                <Hidden xxl xl>
                  <div id="h_p_filters1_container">
                    <div className="h_p_filter1_heading">Filters</div>
                    <div
                      className="h_p_filter1_title"
                      onClick={() => this.dropdown(1)}
                    >
                      Pilot type{" "}
                      <img
                        src={dropdown}
                        alt="dropdown img"
                        className={
                          this.state.filter_tab === 1
                            ? "h_p_filter1_dropdown h_p_dropdown_selected"
                            : "h_p_filter1_dropdown"
                        }
                      />
                    </div>
                    <div
                      className={
                        this.state.filter_tab === 1
                          ? "h_p_filter1_content_container "
                          : "h_p_filter1_content_container h_p_hide_filter"
                      }
                      id="h_p_pilot_type_filter"
                    >
                      <label className="h_p_filter1_filter">
                        <input
                          type="checkbox"
                          className="h_p_filter1_checkbox"
                          onChange={() => this.selectFilter("lisenced")}
                        />
                        <div className="h_p_filter1_checkbox_label">
                          Licensed Pilots
                        </div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input
                          type="checkbox"
                          className="h_p_filter1_checkbox"
                          onChange={() => this.selectFilter("unlisenced")}
                        />

                        <div className="h_p_filter1_checkbox_label">
                          Unlicensed Pilots
                        </div>
                      </label>
                    </div>
                    <div
                      className="h_p_filter1_title"
                      onClick={() => this.dropdown(2)}
                    >
                      Work{" "}
                      <img
                        src={dropdown}
                        alt="dropdown img"
                        className={
                          this.state.filter_tab === 2
                            ? "h_p_dropdown_selected h_p_filter1_dropdown"
                            : "h_p_filter1_dropdown"
                        }
                      />
                    </div>
                    <div
                      className={
                        this.state.filter_tab === 2
                          ? "h_p_filter1_content_container "
                          : "h_p_filter1_content_container h_p_hide_filter"
                      }
                      id="h_p_work_filter"
                    >
                      <label className="h_p_filter1_filter">
                        <input
                          type="checkbox"
                          className="h_p_filter1_checkbox"
                          onChange={() => this.selectFilter("full_time")}
                        />
                        <div className="h_p_filter1_checkbox_label">
                          Full Time
                        </div>
                      </label>
                      <label className="h_p_filter1_filter">
                        <input
                          type="checkbox"
                          className="h_p_filter1_checkbox"
                          onChange={() => this.selectFilter("part_time")}
                        />
                        <div className="h_p_filter1_checkbox_label">
                          Part Time
                        </div>
                      </label>
                    </div>
                    <div
                      className="h_p_filter1_title"
                      onClick={() => this.dropdown(3)}
                    >
                      Hourly Rate
                      <img
                        src={dropdown}
                        alt="dropdown img"
                        className={
                          this.state.filter_tab === 3
                            ? "h_p_dropdown_selected h_p_filter1_dropdown"
                            : "h_p_filter1_dropdown"
                        }
                      />
                    </div>
                    <div
                      className={
                        this.state.filter_tab === 3
                          ? "h_p_filter1_content_container "
                          : "h_p_filter1_content_container h_p_hide_filter"
                      }
                      id="h_p_hourly_rate_filter"
                    >
                      <label style={{ cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          style={{ marginLeft: "0px" }}
                          onChange={() => this.selectFilter("filter_salary")}
                        />{" "}
                        <div
                          style={{
                            fontSize: "15px",
                            fontFamily: "muli-regular",
                            lineHeight: "22px",
                            display: "inline-block",
                            marginBottom: "15px",
                          }}
                        >
                          Filter salary
                        </div>
                      </label>
                      <div className="h_p_filter1_rate_content">
                        Price Range ${this.state.price_range[0]} - $
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
                    <div
                      className="h_p_filter1_title"
                      onClick={() => this.dropdown(4)}
                    >
                      Type of Drone{" "}
                      <img
                        src={dropdown}
                        alt="dropdown img"
                        className={
                          this.state.filter_tab === 4
                            ? "h_p_dropdown_selected h_p_filter1_dropdown"
                            : "h_p_filter1_dropdown"
                        }
                      />
                    </div>
                    <div
                      className={
                        this.state.filter_tab === 4
                          ? "h_p_filter1_content_container "
                          : "h_p_filter1_content_container h_p_hide_filter"
                      }
                      id="h_p_type_of_drone_filter"
                    >
                      <Select
                        options={this.state.suggestions}
                        onChange={this.droneTypeChange}
                        styles={customStyles}
                        className="u_f_category_dropdown"
                        isMulti
                      />
                      {/* {this.state.type_of_drones.map((drone, index) => {
                        return (
                          <label className="h_p_filter1_filter" key={index}>
                            <input
                              type="checkbox"
                              className="h_p_filter1_checkbox"
                              onChange={() => this.selectTypeOfDrone(drone)}
                            />
                            <div className="h_p_filter1_checkbox_label">
                              {drone}
                            </div>
                          </label>
                        );
                      })} */}
                    </div>
                  </div>
                </Hidden>

                <div style={{ marginBottom: "15px", marginTop: "30px" }}>
                  <Row>
                    <Col
                      xl={4}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      style={{ marginBottom: "15px" }}
                    >
                      <div
                        className="h_p_filter2_input_container"
                        style={{
                          width: "100%",
                        }}
                      >
                        <input
                          type="text"
                          className="c_j_form_input"
                          onChange={this.industryChange}
                          style={{ border: "1px solid #c1c1c1", backgroundColor: "white" }}
                          placeholder="Search Keywords"
                        />
                      </div>
                    </Col>
                    <Col
                      xl={4}
                      lg={6}
                      md={6}
                      sm={6}
                      xs={12}
                      style={{ marginBottom: "15px" }}
                    >
                      <PlacesAutocomplete
                        value={this.state.location}
                        onChange={this.handleLocationChange}
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
                                backgroundColor: "#fff",
                                borderRadius: "5px",
                                border: "1px solid #c1c1c1",
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
                    </Col>
                    <Col xl={4} lg={6} md={6} sm={6} xs={12}>
                      <div
                        className="a_j_filter_search"
                        onClick={this.searchFilter}
                        style={{ marginTop: "0px" }}
                      >
                        Search
                      </div>
                    </Col>
                  </Row>
                </div>

                <Visible xxl xl lg md>
                  {this.state.loading && !this.state.pilot_list.length && (
                    <Skeleton
                      height={250}
                      count={3}
                      style={{ marginBottom: "20px" }}
                    />
                  )}

                  {this.state.pilot_list.map((pilot, index) => {
                    return (
                      <div className="h_p_listing_container">
                        <Row>
                          <Col>
                            <div className="h_p_listing_img_container">
                              <img
                                src={pilot.profilePic}
                                alt=""
                                className="h_p_listing_img"
                                style={{ borderRadius: "50px" }}
                              />
                            </div>
                            <div className="h_p_others_container">
                              <div
                                className="h_p_listing_name"
                                onClick={() => this.pilotDetailPage(pilot._id)}
                              >
                                {pilot.name}
                              </div>
                              <div className="h_p_listing_job">
                                {pilot.pilotType === "unlicensed"
                                  ? "Professional Drone pilot"
                                  : "Passionate Drone pilot"}
                              </div>
                              <div className="h_p_listing_location">
                                <img
                                  src={locationIcon}
                                  alt=""
                                  height={"13px"}
                                  style={{ marginRight: "4px" }}
                                />{" "}
                                {pilot.city}, {pilot.country}
                              </div>
                              <div className="h_p_listing_description">
                                {pilot.bio}
                              </div>
                              <div className="h_p_listing_keywords_container">
                                {pilot.skills
                                  .slice(0, pilot.keyswordsVisible)
                                  .map((keyword, index) => {
                                    return (
                                      <div className="h_p_listing_keyword">
                                        {keyword}
                                      </div>
                                    );
                                  })}
                                {pilot.skills.length > 3 && (
                                  <>
                                    {pilot.keyswordsVisible <= 3 ? (
                                      <div
                                        className="h_p_listing_keyword h_p_listing_keyword_more"
                                        onClick={() =>
                                          this.handleMoreKeyword(index)
                                        }
                                      >
                                        + {pilot.skills.length - 3} more
                                      </div>
                                    ) : (
                                      <div
                                        className="h_p_listing_keyword h_p_listing_keyword_more"
                                        onClick={() =>
                                          this.handleMoreKeyword(index)
                                        }
                                      >
                                        - Show less
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="h_p_listing_pricing_rating">
                              <div
                                className="h_p_listing_price_container"
                                style={{ marginBottom: "15px" }}
                              >
                                {pilot.hourlyPayment ? (
                                  <>
                                    <div className="h_p_listing_price">
                                      ${pilot.hourlyPayment}
                                    </div>
                                    <div className="h_p_listing_price_per">
                                      /hour
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="h_p_listing_price">
                                      ${pilot.monthlyPayment}
                                    </div>
                                    <div className="h_p_listing_price_per">
                                      /month
                                    </div>
                                  </>
                                )}
                              </div>
                              {localStorage.getItem("role") === "company" ? (
                                <div className="h_p_listing_btn_container">
                                  <button
                                    className="h_p_start_process_btn"
                                    onClick={() =>
                                      this.clickStartProcess(pilot._id)
                                    }
                                  >
                                    HirePilot
                                  </button>

                                  {this.state.mySavedPilots.includes(
                                    pilot._id
                                  ) ? (
                                    <button
                                      className="h_p_save_pilot_btn"
                                      onClick={() =>
                                        this.unsavePilot(pilot._id)
                                      }
                                    >
                                      <i
                                        class="fa fa-heart"
                                        style={{ color: "black" }}
                                      ></i>
                                    </button>
                                  ) : (
                                    <button
                                      className="h_p_save_pilot_btn"
                                      onClick={() =>
                                        this.clickStartProcess1(pilot._id)
                                      }
                                    >
                                      <i class="fa fa-heart"></i>
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className="h_p_listing_btn_container">
                                  <button
                                    className="h_p_start_process_btn"
                                    onClick={() =>
                                      this.pilotDetailPage(pilot._id)
                                    }
                                  >
                                    View Profile
                                  </button>
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </Visible>
                <Visible sm xs>
                  {this.state.pilot_list.map((pilot, index) => {
                    return (
                      <div className="h_p_listing_container">
                        <Row>
                          <Col>
                            <div className="h_p_listing_img_container_sm">
                              <img
                                src={profileImg}
                                alt=""
                                className="h_p_listing_img"
                              />
                            </div>
                            <div className="h_p_others_container_sm">
                              <div
                                className="h_p_listing_name"
                                onClick={() => this.pilotDetailPage(1)}
                              >
                                {pilot.name}
                              </div>
                              <div className="h_p_listing_job">
                                {pilot.pilotType === "unlicensed"
                                  ? "Professional Drone pilot"
                                  : "Passionate Drone pilot"}
                              </div>
                              <div className="h_p_listing_location">
                                <img
                                  src={locationIcon}
                                  alt=""
                                  height={"13px"}
                                  style={{ marginRight: "4px" }}
                                />{" "}
                                {pilot.city}, {pilot.country}
                              </div>
                              <div className="h_p_listing_description">
                                {pilot.bio}
                              </div>
                              <div className="h_p_listing_keywords_container">
                                {pilot.skills
                                  .slice(0, pilot.keyswordsVisible)
                                  .map((keyword, index) => {
                                    return (
                                      <div className="h_p_listing_keyword">
                                        {keyword}
                                      </div>
                                    );
                                  })}
                                {pilot.skills.length > 3 && (
                                  <>
                                    {pilot.keyswordsVisible <= 3 ? (
                                      <div
                                        className="h_p_listing_keyword h_p_listing_keyword_more"
                                        onClick={() =>
                                          this.handleMoreKeyword(index)
                                        }
                                      >
                                        + {pilot.skills.length - 3} more
                                      </div>
                                    ) : (
                                      <div
                                        className="h_p_listing_keyword h_p_listing_keyword_more"
                                        onClick={() =>
                                          this.handleMoreKeyword(index)
                                        }
                                      >
                                        - Show less
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                            <hr style={{ borderBottom: "1px solid #dcdcdc" }} />
                            <div className="h_p_listing_pricing_rating_sm">
                              <div className="h_p_star-price_box">
                                <div className="h_p_price-container-1">
                                  <div className="h_p_price-rate">
                                    $20{" "}
                                    <span className="h_p_hour_time">/hr</span>{" "}
                                  </div>
                                </div>
                                <div class="h_p_star_section">
                                  <div
                                    className={
                                      pilot.rating >= 1
                                        ? "h_p_rating h_p_rating_selected  star-review-box  "
                                        : "h_p_rating h_p_rating_unselected   star-review-box"
                                    }
                                  >
                                    &#9733;
                                  </div>
                                  <div
                                    className={
                                      pilot.rating >= 2
                                        ? "h_p_rating h_p_rating_selected  star-review-box"
                                        : "h_p_rating h_p_rating_unselected   star-review-box"
                                    }
                                  >
                                    &#9733;
                                  </div>
                                  <div
                                    className={
                                      pilot.rating >= 3
                                        ? "h_p_rating h_p_rating_selected  star-review-box "
                                        : "h_p_rating h_p_rating_unselected   star-review-box "
                                    }
                                  >
                                    &#9733;
                                  </div>
                                  <div
                                    className={
                                      pilot.rating >= 4
                                        ? "h_p_rating h_p_rating_selected star-review-box "
                                        : "h_p_rating h_p_rating_unselected   star-review-box"
                                    }
                                  >
                                    &#9733;
                                  </div>
                                  <div
                                    className={
                                      pilot.rating >= 5
                                        ? "h_p_rating h_p_rating_selected star-review-box "
                                        : "h_p_rating h_p_rating_unselected   star-review-box"
                                    }
                                  >
                                    &#9733;
                                  </div>
                                </div>
                              </div>
                              <div className="h_p_listing_btn-container">
                                <button
                                  className="h_p_start_process_btn"
                                  onClick={this.clickStartProcess}
                                >
                                  Start Process
                                </button>
                                <button
                                  className="h_p_save_pilot_btn"
                                  onClick={this.showJobSave}
                                >
                                  <i class="fa fa-heart"></i>
                                </button>
                                <div
                                  className="h_p_listing_send_msg_link "
                                  style={{ textAlign: "center" }}
                                  onClick={() => this.sendMessage(1)}
                                >
                                  Send Message
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </Visible>
              </Col>
            </Row>
            <Dialog
              open={this.state.startProcess}
              onClose={this.closeProcess1}
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
                <div
                  style={{ position: "absolute", top: "20px", right: "20px" }}
                >
                  <img
                    src={close}
                    alt=""
                    onClick={this.closeProcess1}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Row style={{ marginTop: "30px" }}>
                  <div className="h_p_start_process_form">
                    <div className="h_p_start_process_form_title">
                      Hire Pilot
                    </div>
                    <div className="h_p_start_process_form_label">
                      Description
                    </div>
                    <textarea
                      className="h_p_start_process_form_description"
                      id="tomakered"
                      value={this.state.message}
                      onChange={this.messageHandler}
                    ></textarea>

                    <div className="h_p_start_process_form_btn_container">
                      <button
                        onClick={this.closeProcess}
                        className="h_p_start_process_form_btn"
                      >
                        Send Mail
                      </button>
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
              <DialogContent
                className={All.PopupBody}
                style={{ marginBottom: "50px" }}
              >
                <div
                  style={{ position: "absolute", top: "20px", right: "20px" }}
                  onClick={this.closeJobSave}
                >
                  <img
                    src={Close}
                    alt=""
                    onClick={this.closeChoicePopup}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Row style={{ marginTop: "30px" }}>
                  <div className="u_f_popup_title" style={{ width: "100%" }}>
                    Pilot saved successfully
                  </div>
                  <div className="u_f_popup_btn_container">
                    <button
                      className="u_f_popup_btn2"
                      onClick={this.closeJobSave}
                    >
                      Close
                    </button>
                  </div>
                </Row>
              </DialogContent>
            </Dialog>

            <Dialog
              open={this.state.savePilot}
              onClose={this.closeSavePilot}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"md"}
              fullWidth={true}
            >
              <DialogContent style={{ marginBottom: "50px" }}>
                <div
                  style={{ position: "absolute", top: "20px", right: "20px" }}
                  onClick={this.closeSavePilot}
                >
                  <img
                    src={Close}
                    alt=""
                    onClick={this.closeChoicePopup}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "20px",
                  }}
                  onClick={this.savePilotToFolder}
                >
                  <div
                    className="sc_popup_submit"
                    style={{ cursor: "pointer" }}
                  >
                    Save
                  </div>
                </div>
                <div>
                  <div className="selectCollection">
                    Select a collection to Save
                  </div>
                  <Row style={{ marginTop: "10px", padding: "0px 25px" }}>
                    {this.state.myFolders.map((item, i) => {
                      return (
                        <>
                          <Col xl={4}>
                            <div
                              className="something"
                              style={{
                                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                padding: "20px 15px",
                                marginBottom: "15px",
                                cursor: "pointer",
                                border:
                                  this.state.selectedFolder == item._id
                                    ? "2px solid #00E7FC "
                                    : "2px solid white",
                              }}
                              id={`folder/${item._id}`}
                              onClick={() => this.selectFolder(item._id)}
                            >
                              <div className="folderTitle">
                                {item.folderName.length < 15
                                  ? item.folderName
                                  : item.folderName.slice(0, 15) + "..."}
                              </div>
                              <div className="folderDesc">
                                {item.description.length < 40
                                  ? item.description
                                  : item.description.slice(0, 38) + "..."}
                              </div>
                            </div>
                          </Col>
                        </>
                      );
                    })}

                    <Col xl={4}>
                      <div
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                          padding: "20px 15px",
                        }}
                        className="addFolderBox"
                      >
                        <img
                          src={AddFolder}
                          onClick={this.addFolderNew}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog
              open={this.state.addFolder}
              onClose={this.closeAddFolder}
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
                    onClick={this.closeAddFolder}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div style={{ marginTop: "30px" }}>
                  <div className="sc_popup_head">Create Folder</div>
                  <div className="sc_popup_desc">
                    Enter the below details to create a folder{" "}
                  </div>
                  <div className="sc_popup_input_label">Folder Name</div>
                  <input
                    type="text"
                    className="sc_popup_input"
                    name="name"
                    id="name"
                    value={this.state.name}
                    onChange={this.folderChangeHandler}
                  />
                  <div className="login_input_error_msg" id="name_error"></div>
                  <div className="sc_popup_input_label">Description</div>
                  <input
                    type="text"
                    className="sc_popup_input"
                    name="description"
                    id="description"
                    value={this.state.description}
                    onChange={this.folderChangeHandler}
                  />
                  <div
                    className="login_input_error_msg"
                    id="description_error"
                  ></div>
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <button
                      className="sc_popup_submit"
                      onClick={this.createFolderSavePilot}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Container>
        </div>
      </>
    );
  }
}

export default HirePilot;
