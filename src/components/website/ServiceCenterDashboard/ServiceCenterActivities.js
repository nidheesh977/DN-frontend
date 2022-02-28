import React, { Component } from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "../../website/All.module.css";
import dropdown from "../../images/s_c_dropdown2.png";
import "../../css/ServiceCenterDashboard.css";
import downloadIcon from "../../images/downloadIcon.svg";
import productLike from "../../images/product_like.png";
import viewIcon from "../../images/viewIcon.svg";
import userIcon from "../../images/userIcon.svg";
import videoIcon from "../../images/video-icon.svg";
import premiumIcon from "../../images/golden-star.svg";
import moreIcon from "../../images/Path.svg";
import { Link } from "react-router-dom";
import Pilot from "../pilot_dashboard/images/pilot.jpg";
import loadMore from "../../images/Group 71.svg";

class ServiceCenterActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity_store_filter: true,
      activity_inspired_filter: false,
      selected_filter: 1,
      file_type: 1,
      show_edit: null,
      follows: [
        { name: "Yasar Arafath", profile: "Professional Pilot" },
        { name: "Yaseen Ahmed", profile: "Passionate Pilot" },
        { name: "Yasar Arafath", profile: "Professional Pilot" },
        { name: "Yaseen Ahmed", profile: "Passionate Pilot" },
        { name: "Yasar Arafath", profile: "Passionate Pilot" },
        { name: "Yaseen Ahmed", profile: "Professional Pilot" },
        { name: "Yasar Arafath", profile: "Professional Pilot" },
        { name: "Yaseen Ahmed", profile: "Passionate Pilot" },
      ],
    };
  }

  showFileDetails = (id) => {
    document.getElementById("p_d_file_details_" + id).style.visibility =
      "visible";
    document.getElementById(
      "s_c_db_activity_file_more_" + id
    ).style.visibility = "visible";
  };

  hideFileDetails = (id) => {
    document.getElementById("p_d_file_details_" + id).style.visibility =
      "hidden";
    document.getElementById(
      "s_c_db_activity_file_more_" + id
    ).style.visibility = "hidden";
    this.setState({
      show_edit: null,
    });
  };

  showEditHandler = (id) => {
    this.setState({
      show_edit: id,
    });
  };

  hideEditHandler = (id) => {
    this.setState({
      show_edit: null,
    });
  };

  redirectPilotDetails = (id) => {
    this.props.history.push(`/pilot_details/${id}`)
  }

  render() {
    const files = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <div className="s_c_db_container">
        <Container
          className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}
        >
          <Row gutterWidth={70}>
            <Col xl={3} lg={4} md={12}>
              <div className="s_c_db_activity_filter_container">
                <div
                  className="s_c_db_activity_filter_title"
                  onClick={() =>
                    this.setState({
                      activity_store_filter: !this.state.activity_store_filter,
                      activity_inspired_filter: false,
                    })
                  }
                >
                  My Store
                  <img
                    src={dropdown}
                    id="dropimg"
                    alt="dropdown img"
                    className={
                      this.state.activity_store_filter
                        ? "h_p_filter1_dropdown h_p_dropdown_selected"
                        : "h_p_filter1_dropdown"
                    }
                  />
                </div>
                {this.state.activity_store_filter && (
                  <div
                    className={
                      this.state.selected_filter === 1
                        ? "s_c_db_activity_filter s_c_db_activity_filter_active"
                        : "s_c_db_activity_filter"
                    }
                    onClick={() => this.setState({ selected_filter: 1 })}
                  >
                    Downloaded files
                  </div>
                )}
                <div
                  className="s_c_db_activity_filter_title"
                  onClick={() =>
                    this.setState({
                      activity_inspired_filter:
                        !this.state.activity_inspired_filter,
                      activity_store_filter: false,
                    })
                  }
                >
                  Inspired
                  <img
                    src={dropdown}
                    id="dropimg"
                    alt="dropdown img"
                    className={
                      this.state.activity_inspired_filter
                        ? "h_p_filter1_dropdown h_p_dropdown_selected"
                        : "h_p_filter1_dropdown"
                    }
                  />
                </div>
                {this.state.activity_inspired_filter && (
                  <>
                    {/* <div
                      className={
                        this.state.selected_filter === 2
                          ? "s_c_db_activity_filter s_c_db_activity_filter_active"
                          : "s_c_db_activity_filter"
                      }
                      onClick={() => this.setState({ selected_filter: 2 })}
                    >
                      Followers
                    </div> */}
                    <div
                      className={
                        this.state.selected_filter === 3
                          ? "s_c_db_activity_filter s_c_db_activity_filter_active"
                          : "s_c_db_activity_filter"
                      }
                      onClick={() => this.setState({ selected_filter: 3 })}
                    >
                      Following
                    </div>
                  </>
                )}
              </div>
            </Col>
            <Col xl={9} lg={8} md={12} sm={12}>
              {this.state.selected_filter === 1 && (
                <>
                  <div className="s_c_db_activity_file_type_container">
                    <div
                      className={
                        this.state.file_type === 1
                          ? "s_c_db_activity_file_type s_c_db_activity_file_type_selected"
                          : "s_c_db_activity_file_type"
                      }
                      onClick={() => this.setState({ file_type: 1 })}
                    >
                      Images
                    </div>
                    <div
                      className={
                        this.state.file_type === 2
                          ? "s_c_db_activity_file_type s_c_db_activity_file_type_selected"
                          : "s_c_db_activity_file_type"
                      }
                      onClick={() => this.setState({ file_type: 2 })}
                    >
                      Videos
                    </div>
                    <div
                      className={
                        this.state.file_type === 3
                          ? "s_c_db_activity_file_type s_c_db_activity_file_type_selected"
                          : "s_c_db_activity_file_type"
                      }
                      onClick={() => this.setState({ file_type: 3 })}
                    >
                      3D Images
                    </div>
                  </div>
                  <Row gutterWidth={10}>
                    {files.map((id, index) => {
                      return (
                        <Col xxl={4} xl={4} lg={6} md={6} sm={6} xs={12}>
                          <div
                            className="p_d_files_container"
                            onMouseOver={() => this.showFileDetails(id)}
                            onMouseLeave={() => this.hideFileDetails(id)}
                          >
                            <img
                              className="p_d_files"
                              src="https://149355317.v2.pressablecdn.com/wp-content/uploads/2019/04/Drone-Photography-UAV-Coach.jpg"
                              alt=""
                              width={"100%"}
                              height={"250px"}
                            />
                            <div className="s_c_db_activity_file_edit">
                              {id % 2 == 0 && (
                                <div className="s_c_db_activity_file_premium">
                                  <img src={premiumIcon} alt="" />
                                </div>
                              )}
                              <div
                                className="s_c_db_activity_file_more"
                                id={"s_c_db_activity_file_more_" + id}
                              >
                                {this.state.show_edit === id ? (
                                  <div
                                    style={{ padding: "10px 10px 5px 10px" }}
                                    onMouseLeave={() =>
                                      this.hideEditHandler(id)
                                    }
                                  >
                                    <div
                                      className="s_c_db_activity_file_links"
                                      onClick={() =>
                                        this.setState({ show_edit: null })
                                      }
                                    >
                                      Redownload
                                    </div>
                                    <div
                                      className="s_c_db_activity_file_links"
                                      onClick={() =>
                                        this.setState({ show_edit: null })
                                      }
                                    >
                                      Delete
                                    </div>
                                  </div>
                                ) : (
                                  <img
                                    src={moreIcon}
                                    alt=""
                                    onClick={() => this.showEditHandler(id)}
                                    style={{ padding: "6px 12px 4px 12px" }}
                                  />
                                )}
                              </div>
                            </div>
                            {this.state.file_type === 2 && (
                              <img
                                src={videoIcon}
                                alt=""
                                className="p_d_files_video_icon"
                              />
                            )}
                            <div
                              className="p_d_file_details_container"
                              id={"p_d_file_details_" + id}
                            >
                              <div className="p_d_file_user_name" onClick={() => this.redirectPilotDetails(index)}>
                                <img
                                  src={userIcon}
                                  alt=""
                                  className="p_d_files_icon"
                                  style={{ marginRight: "6px" }}
                                />{" "}
                                Yasar Arfath
                              </div>
                              <div className="p_d_file_other_details">
                                <div className="p_d_file_views">
                                  <img
                                    src={viewIcon}
                                    alt=""
                                    className="p_d_files_icon"
                                    height={"10px"}
                                    style={{ marginTop: "4px" }}
                                  />{" "}
                                  5k
                                </div>
                                <div className="p_d_file_downloads">
                                  <img src={downloadIcon} alt="" /> 2k
                                </div>
                                <div className="p_d_file_likes">
                                  <img src={productLike} alt="" height="15px" />{" "}
                                  1k
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                  <div className="a_j_load_div" style={{ margin: "40px 0px" }}>
                    <button className="a_j_loadMore_btn">
                      <img src={loadMore} className="a_j_location_logo" />
                      <span className="a_j_location_text">Load More</span>
                    </button>{" "}
                  </div>
                </>
              )}
              {this.state.selected_filter === 2 && (
                <div
                  className="pd_followers_mainBox"
                  style={{ marginTop: "20px" }}
                >
                  <div className="pd_followers_headBox">
                    <Row>
                      <Col>
                        <div className="pd_followers_title">Followers</div>
                      </Col>
                      <Col>
                        <select className="pd_followers_select">
                          <option disabled selected>
                            All Profiles
                          </option>
                          <option>Professional Pilot</option>
                          <option>Passionate Pilot</option>
                        </select>
                      </Col>
                    </Row>
                  </div>
                  <hr className="pd_followers_hr" />
                  {this.state.follows.map((item, i) => {
                    return (
                      <div>
                        <Row>
                          <Col xl={1.4} xs={2}>
                            <div className="pd_followers_pilotImageBox">
                              <img
                                src={Pilot}
                                alt="pilot img"
                                className="pd_followers_pilot_img"
                              />
                            </div>
                          </Col>
                          <Col xs={5.25}>
                            <div className="pd_followers_pilotDetails">
                              <div className="pd_followers_pilotName">
                                {item.name}
                              </div>
                              <div className="pd_followers_pilotType">
                                {item.profile}
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div className="pd_followers_profile">
                              <div className="pd_followers_profileBox">
                                <button className="pd_followers_profileBtn">
                                  View Profile
                                </button>
                                <div className="pd_followers_profileUnfollow">
                                  Remove
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <hr className="pd_followers_hr" />
                      </div>
                    );
                  })}
                  <div className="a_j_load_div" style={{ margin: "40px 0px" }}>
                    <button className="a_j_loadMore_btn">
                      <img src={loadMore} className="a_j_location_logo" />
                      <span className="a_j_location_text">Load More</span>
                    </button>{" "}
                  </div>
                </div>
              )}
              {this.state.selected_filter === 3 && (
                <div
                  className="pd_followers_mainBox"
                  style={{ marginTop: "20px" }}
                >
                  <div className="pd_followers_headBox">
                    <Row>
                      <Col>
                        <div className="pd_followers_title">Following</div>
                      </Col>
                      <Col>
                        <select className="pd_followers_select">
                          <option disabled selected>
                            All Profiles
                          </option>
                          <option>Professional Pilot</option>
                          <option>Passionate Pilot</option>
                        </select>
                      </Col>
                    </Row>
                  </div>
                  <hr className="pd_followers_hr" />
                  {this.state.follows.map((item, i) => {
                    return (
                      <div>
                        <Row>
                          <Col xl={1.4} xs={2}>
                            <div className="pd_followers_pilotImageBox">
                              <img
                                src={Pilot}
                                alt="pilot img"
                                className="pd_followers_pilot_img"
                              />
                            </div>
                          </Col>
                          <Col xs={5.25}>
                            <div className="pd_followers_pilotDetails">
                              <div className="pd_followers_pilotName">
                                {item.name}
                              </div>
                              <div className="pd_followers_pilotType">
                                {item.profile}
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div className="pd_followers_profile">
                              <div className="pd_followers_profileBox">
                                <button className="pd_followers_profileBtn">
                                  View Profile
                                </button>
                                <div className="pd_followers_profileUnfollow">
                                  Unfollow
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <hr className="pd_followers_hr" />
                      </div>
                    );
                  })}
                  <div className="a_j_load_div" style={{ margin: "40px 0px" }}>
                    <button className="a_j_loadMore_btn">
                      <img src={loadMore} className="a_j_location_logo" />
                      <span className="a_j_location_text">Load More</span>
                    </button>{" "}
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ServiceCenterActivities;
