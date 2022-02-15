import React, { Component } from "react";
import profileImg from "../../images/profile_user@2x.png";
import locationIcon from "../../images/s_c_location.svg";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import "./css/Company_savedPilots.css";
import loadMore from "../../images/Group 71.svg";


export class Company_savedPilots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          keywords: [
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "NGO",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
          ],
          rating: 4,
          keywords_visible: 3,
          name: "John Doe",
          profile: "Professional Drone pilot",
          location: "Bangalore, India",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quod, possimus! elit.Quod, possimus!",
          rate: 20,
        },
        {
          keywords: [
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "NGO",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
          ],
          rating: 4,
          keywords_visible: 3,
          name: "Yaseen Ahmed",
          profile: "Pasionate Drone pilot",
          location: "Bangalore, India",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quod, possimus! elit.Quod, possimus!",
          rate: 70,
        },
        {
          keywords: [
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "NGO",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
          ],
          rating: 4,
          keywords_visible: 3,
          name: "John Doe",
          profile: "Professional Drone pilot",
          location: "Bangalore, India",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quod, possimus! elit.Quod, possimus!",
          rate: 20,
        },
        {
          keywords: [
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "NGO",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
          ],
          rating: 4,
          keywords_visible: 3,
          name: "John Doe",
          profile: "Professional Drone pilot",
          location: "Bangalore, India",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quod, possimus! elit.Quod, possimus!",
          rate: 20,
        },
      ],
    };
  }
  handleMoreKeyword = () => {
    // if (this.state.keywords_visible === 3) {
    //   this.setState({
    //     keywords_visible: this.state.keywords.length,
    //   });
    // } else {
    //   this.setState({
    //     keywords_visible: 3,
    //   });
    // }
  };
  pilotDetailPage = (id) => {
    this.props.history.push("/pilot_details/" + id)
  }
  render() {
    return (
      <div>
        {this.state.data.map((item, i) => {
          return (
            <div key={i}>
              <Visible xxl xl lg md>
                <div
                  className="h_p_listing_container"
                  style={{ marginBottom: "30px" }}
                >
                  <Row>
                    <Col>
                      <div className="h_p_listing_img_container">
                        <img
                          src={profileImg}
                          alt=""
                          className="h_p_listing_img"
                        />
                      </div>
                      <div className="h_p_others_container">
                        <div className="h_p_listing_name"  onClick={() => this.pilotDetailPage(i)}>{item.name}</div>
                        <div className="h_p_listing_job">{item.profile}</div>
                        <div className="h_p_listing_location">
                          <img
                            src={locationIcon}
                            alt=""
                            height={"13px"}
                            style={{ marginRight: "4px" }}
                          />{" "}
                          {item.location}
                        </div>
                        <div className="h_p_listing_description">
                          {item.desc}
                        </div>
                        <div className="h_p_listing_keywords_container">
                          {item.keywords
                            .slice(0, item.keywords_visible)
                            .map((keyword, index) => {
                              return (
                                <div className="h_p_listing_keyword">
                                  {keyword}
                                </div>
                              );
                            })}
                          {item.keywords_visible <= 3 ? (
                            <div
                              className="h_p_listing_keyword h_p_listing_keyword_more"
                              onClick={this.handleMoreKeyword}
                            >
                              + {item.keywords.length - 3} more
                            </div>
                          ) : (
                            <div
                              className="h_p_listing_keyword h_p_listing_keyword_more"
                              onClick={this.handleMoreKeyword}
                            >
                              - Show less
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="h_p_listing_pricing_rating">
                        <div className="h_p_listing_price_container">
                          <div className="h_p_listing_price">${item.rate}</div>
                          <div className="h_p_listing_price_per">/hr</div>
                        </div>
                        <div className="h_p_rating_container">
                          <div
                            className={
                              item.rating >= 1
                                ? "h_p_rating h_p_rating_selected"
                                : "h_p_rating h_p_rating_unselected"
                            }
                          >
                            &#9733;
                          </div>
                          <div
                            className={
                              item.rating >= 2
                                ? "h_p_rating h_p_rating_selected"
                                : "h_p_rating h_p_rating_unselected"
                            }
                          >
                            &#9733;
                          </div>
                          <div
                            className={
                              item.rating >= 3
                                ? "h_p_rating h_p_rating_selected"
                                : "h_p_rating h_p_rating_unselected"
                            }
                          >
                            &#9733;
                          </div>
                          <div
                            className={
                              item.rating >= 4
                                ? "h_p_rating h_p_rating_selected"
                                : "h_p_rating h_p_rating_unselected"
                            }
                          >
                            &#9733;
                          </div>
                          <div
                            className={
                              item.rating >= 5
                                ? "h_p_rating h_p_rating_selected"
                                : "h_p_rating h_p_rating_unselected"
                            }
                          >
                            &#9733;
                          </div>
                        </div>
                        <div className="h_p_listing_btn_container">
                          <button className="h_p_start_process_btn">
                            Hire Now
                          </button>
                          <button className="h_p_save_pilot_btn">
                            <i class="fa fa-heart"></i>
                          </button>
                        </div>
                        <div className="h_p_listing_send_msg_link">
                          Send Message
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Visible>
              <Visible sm xs>
                <div
                  className="h_p_listing_container"
                  style={{ marginBottom: "30px" }}
                >
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
                          {item.name}
                        </div>
                        <div className="h_p_listing_job">{item.profile}</div>
                        <div className="h_p_listing_location">
                          <img
                            src={locationIcon}
                            alt=""
                            height={"13px"}
                            style={{ marginRight: "4px" }}
                          />{" "}
                          {item.location}
                        </div>
                        <div className="h_p_listing_description">
                          {item.desc}
                        </div>
                        <div className="h_p_listing_keywords_container">
                          {item.keywords
                            .slice(0, item.keywords_visible)
                            .map((keyword, index) => {
                              return (
                                <div className="h_p_listing_keyword">
                                  {keyword}
                                </div>
                              );
                            })}
                          {item.keywords_visible <= 3 ? (
                            <div
                              className="h_p_listing_keyword h_p_listing_keyword_more"
                              onClick={this.handleMoreKeyword}
                            >
                              + {item.keywords.length - 3} more
                            </div>
                          ) : (
                            <div
                              className="h_p_listing_keyword h_p_listing_keyword_more"
                              onClick={this.handleMoreKeyword}
                            >
                              - Show less
                            </div>
                          )}
                        </div>
                      </div>
                      <hr style={{ borderBottom: "1px solid #dcdcdc" }} />
                      <div className="h_p_listing_pricing_rating_sm">
                        <div className="h_p_star-price_box">
                          <div className="h_p_price-container-1">
                            <div className="h_p_price-rate">
                              ${item.rate}{" "}
                              <span className="h_p_hour_time">/hr</span>{" "}
                            </div>
                          </div>
                          <div class="h_p_star_section">
                            <div
                              className={
                                item.rating >= 1
                                  ? "h_p_rating h_p_rating_selected  star-review-box  "
                                  : "h_p_rating h_p_rating_unselected   star-review-box"
                              }
                            >
                              &#9733;
                            </div>
                            <div
                              className={
                                item.rating >= 2
                                  ? "h_p_rating h_p_rating_selected  star-review-box"
                                  : "h_p_rating h_p_rating_unselected   star-review-box"
                              }
                            >
                              &#9733;
                            </div>
                            <div
                              className={
                                item.rating >= 3
                                  ? "h_p_rating h_p_rating_selected  star-review-box "
                                  : "h_p_rating h_p_rating_unselected   star-review-box "
                              }
                            >
                              &#9733;
                            </div>
                            <div
                              className={
                                item.rating >= 4
                                  ? "h_p_rating h_p_rating_selected star-review-box "
                                  : "h_p_rating h_p_rating_unselected   star-review-box"
                              }
                            >
                              &#9733;
                            </div>
                            <div
                              className={
                                item.rating >= 5
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
                          <button className="h_p_save_pilot_btn">
                            <i class="fa fa-heart"></i>
                          </button>
                          <div
                            className="h_p_listing_send_msg_link "
                            style={{ textAlign: "center" }}
                          >
                            Send Message
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Visible>
            </div>
          );
        })}
        <div className="a_j_load_div">
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div>
      </div>
    );
  }
}

export default Company_savedPilots;
