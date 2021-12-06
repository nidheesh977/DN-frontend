import React, { Component } from "react";
import "../filter/Filter.css";
import { Container, Row, Col } from "react-grid-system";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import All from "../website/All.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-modal/styles.css";
import Hirebtn from "../images/hirebtn.svg";
import { Helmet } from "react-helmet";
import swal from "sweetalert";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import CommentBox from "../CommentBox";
import { Player } from "video-react";
import { userService } from "../_services/user.service";

const API_URL = "http://localhost/auth-app/public/api/auth";

export default class ViewJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      user_id: "",
      imageview: "",
      userid: "",
      user_profile: "",
      relatedposts: [],
      loading: false,
      id: "",
      post_id: "",
      fieldVal: "",
      comments: [],
      visible: 10,
      error: false,
    };
    this.loadMore = this.loadMore.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return { visible: prev.visible + 8 };
    });
  }

  download(event) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        };
        const url = `http://localhost/auth-app/public/api/auth/freedownload/${event.id}?user_id=${event.user_id}`;
        axios
          .get(url, config)
          .then((response) => {
            swal(response.data.message, {
              icon: "success",
            });
          })
          .catch((error) => {
            swal(error.response.data.message, {
              icon: "error",
            });
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const user_id = this.props.match.params.user_id;

    this.setState({
      fieldVal: id,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    userService.User().then(
      (res) => {
        this.setState({ user_id: res.data.id });
        this.setState({ userid: res.data.id });
      },
      (err) => {
        console.log(err);
      }
    );

    const url = `${API_URL}/singlelisting/${id}`;
    
    axios.get(url, config)
    .then(res => {
      this.setState({ imageview: res.data });
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })

    const urls = `http://localhost/auth-app/public/api/auth/relatedposts/${user_id}`;
    axios
      .get(urls, config)
      .then((res) => res.data)
      .then((data) => {
        this.setState({ relatedposts: data });
      });

    this.setState({ loading: true });

    axios.post('http://localhost/auth-app/public/api/auth/profilesingle', {
      user_id: user_id,
    }, config)
    .then(res=>{
      this.setState({
        user_profile: res.data.profile
      })
    })
  }

  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments],
    });
  }

  render() {
    const { imageview, value } = this.state;
    const { relatedposts, values } = this.state;
    var user_profile = this.state.user_profile
    return (
      <>
        <Helmet>
          <title>Image View</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <section>
          <Container className={All.Container}>
            <Row>
              <Col lg={12}>
                <div className={All.Desktop_popup}>
                  <div className={`${All.DisplayFlex} ${All.Text_left}`}></div>
                  <Row
                    style={{ paddingBottom: "25px", paddingTop: "25px" }}
                    className={`${All.Text_left}`}
                  >
                    <Col sm={12} md={8}>
                      {" "}
                      <div className={All.lineheight_40}>
                        {" "}
                        <h4 style={{ backgroundColor: "white" }}>
                          {imageview.title || <Skeleton />}
                        </h4>{" "}
                      </div>
                    </Col>
                    <Col sm={6} md={4}>
                      {this.state.userid == this.props.match.params.user_id ? (
                        <> </>
                      ) : (
                        <div className={`${All.Text_right} ${All.Flex_auto}`}>
                          {imageview.sale == "forsale" && (
                            <Link
                              to={{
                                pathname: `/Cart/${imageview.slug}/download/${this.props.match.params.user_id}`,
                              }}
                            >
                              <Button className={All.BtnStyle_5}>
                                Buy Now
                              </Button>
                            </Link>
                          )}
                          {imageview.sale == "download" && (
                            <Button
                              onClick={() => this.download(imageview)}
                              className={All.BtnStyle_5}
                            >
                              Download
                            </Button>
                          )}
                        </div>
                      )}
                    </Col>
                  </Row>

                  <div className="slider_image">
                    {imageview.tag == "1" && (
                      <img
                        className="GalleryImg"
                        src={imageview.src}
                        alt="image"
                      />
                    )}
                    {imageview.tag == "2" && (
                      <img
                        className="GalleryImg"
                        src={imageview.src}
                        alt="image"
                      />
                    )}
                    {imageview.tag == "3" && (
                      <Player
                        playsInline
                        poster={imageview.src}
                        src={imageview.src}
                      />
                    )}
                    {imageview.tag == "4" && (
                      <img
                        className="GalleryImg"
                        src={imageview.src}
                        alt="image"
                      />
                    )}
                  </div>

                  <Row className={`${All.Text_left} slideProfileDetail `}>
                    <Col lg={9}>
                      <Box className={`  ${All.Text_left}`}>
                        <Box textAlign={"Left"}>
                          <Link
                            to={{
                              pathname: `/ProfileSingle/${this.props.match.params.user_id}`,
                            }}
                          >
                            <img
                              class="alignleft"
                              src={user_profile}
                              alt="Image Sample 1"
                              style={{
                                display: "inline",
                                float: "left",
                                width: "75px",
                                marginRight: "15px",
                                height: "75px",
                                borderRadius: "100px",
                              }}
                            />
                          </Link>
                        </Box>

                        <Box pt={1}>
                          <Link
                            to={{
                              pathname: `/ProfileSingle/${this.props.match.params.user_id}`,
                            }}
                          >
                            <h5> {imageview.author || <Skeleton />}</h5>
                          </Link>
                          <Link
                            to={{
                              pathname: `/ProfileSingle/${this.props.match.params.user_id}`,
                            }}
                          >
                            <label
                              className={`${All.paddingbottom} ${All.TextBlueColor}`}
                            >
                              Follow
                            </label>
                          </Link>
                        </Box>

                        <Box className={All.JobDescription}>
                          <label
                            className={`${All.paddingtop} ${All.paddingbottom}`}
                          >
                            Hello Everyone,
                          </label>
                          <label className={All.paddingtop}>
                            {" "}
                            {imageview.description || <Skeleton />}
                          </label>
                          <Link to="">
                            <label className={All.paddingtop}>
                              Feel free contact us{" "}
                              <span
                                className={`${All.DarkBlue} ${All.FSize_16}`}
                              >
                                Info@nexevo.in
                              </span>
                            </label>
                          </Link>
                        </Box>
                        {imageview.comments === "true" && (
                          <CommentBox
                            passedVal={this.state.fieldVal}
                            userid={imageview.user_id}
                            postid={this.state.post_id}
                          />
                        )}
                        {/* <CommentForm addComment={this.addComment} />
                                    <CommentList comments={this.state.comments} /> */}
                      </Box>
                    </Col>

                    <Col lg={3}>
                      <Box>
                        <label className={`${All.Bold} ${All.paddingbottom_5}`}>
                          Like What You See?
                        </label>
                        <label>This Droners is available for work</label>
                      </Box>
                      <Box pt={2} pb={5}>
                        <Link
                          to={{
                            pathname: `/ProfileSingle/${this.props.match.params.user_id}`,
                          }}
                        >
                          <Button className={All.BtnStyle_11}>
                            {" "}
                            <img style={{ paddingRight: 10 }} src={Hirebtn} />
                            Hire This Droner
                          </Button>
                        </Link>
                      </Box>
                      <Box pb={2}>
                        <label className={All.Bold}>
                          More Shots from {imageview.author || <Skeleton />}
                        </label>
                      </Box>
                      <Box>
                        {relatedposts.map((option) => (
                          <a
                            className={`${All.marginright_9} ${All.RecentImg}`}
                            href={
                              "././#/Imageview/" +
                              option.id +
                              "/" +
                              option.user_id
                            }
                          >
                            {option.tag == "1" && (
                              <img
                                src={
                                  option.src || (
                                    <Skeleton width={150} height={109} />
                                  )
                                }
                                style={{
                                  width: " 120px",
                                  height: "109px",
                                  borderRadius: "10px",
                                  marginBottom: "10px",
                                }}
                              />
                            )}
                            {option.tag == "2" && (
                              <img
                                src={
                                  option.src || (
                                    <Skeleton width={150} height={109} />
                                  )
                                }
                                style={{
                                  width: " 120px",
                                  height: "109px",
                                  borderRadius: "10px",
                                  marginBottom: "10px",
                                }}
                              />
                            )}
                            {option.tag == "3" && (
                              <video
                                style={{
                                  width: "120px",
                                  height: "109px",
                                  borderRadius: "10px",
                                  marginBottom: "10px",
                                }}
                                className="GalleryImg"
                              >
                                <source src={option.src} type="video/mp4" />
                              </video>
                            )}
                            {option.tag == "4" && (
                              <img
                                src={
                                  option.src || (
                                    <Skeleton width={150} height={109} />
                                  )
                                }
                                style={{
                                  width: " 120px",
                                  height: "109px",
                                  borderRadius: "10px",
                                  marginBottom: "10px",
                                }}
                              />
                            )}
                          </a>
                        ))}
                      </Box>
                    </Col>
                  </Row>
                </div>
                <div className={All.Mobile_popup}>
                  <div className={`${All.DisplayFlex} ${All.Text_left}`}></div>
                  <Row
                    style={{ paddingBottom: "25px", paddingTop: "25px" }}
                    className={`${All.Text_left}`}
                  >
                    <Col sm={12} md={8}>
                      {" "}
                      <div
                        className={`${All.lineheight_40} ${All.pt_xs_30} ${All.pb_xs_30} ${All.pt_sm} ${All.pb_sm} ${All.pt_md_30} ${All.pb_md_30} `}
                      >
                        {" "}
                        <h4 style={{ backgroundColor: "white" }}>
                          {" "}
                          {imageview.title || <Skeleton />}
                        </h4>{" "}
                      </div>
                    </Col>
                    <Col sm={6} md={4}>
                      {this.state.userid == this.props.match.params.user_id ? (
                        <> </>
                      ) : (
                        <div className={`${All.Text_right} ${All.Flex_auto}`}>
                          {imageview.sale == "forsale" && (
                            <Link
                              to={{
                                pathname: `/Cart/${imageview.slug}/download/${this.props.match.params.user_id}`,
                              }}
                            >
                              <Button className={All.BtnStyle_5}>
                                Buy Now
                              </Button>
                            </Link>
                          )}
                          {imageview.sale == "download" && (
                            <Link to="/Cart">
                              <Button
                                onClick={() => this.download(imageview)}
                                className={All.BtnStyle_5}
                              >
                                Download
                              </Button>
                            </Link>
                          )}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <div className="slider_image">
                    {imageview.tag == "1" && (
                      <img
                        className="GalleryImg"
                        src={imageview.src}
                        alt="image"
                      />
                    )}
                    {imageview.tag == "2" && (
                      <img
                        className="GalleryImg"
                        src={imageview.src}
                        alt="image"
                      />
                    )}
                    {imageview.tag == "3" && (
                      <Player
                        playsInline
                        poster={imageview.src}
                        src={imageview.src}
                      />
                    )}
                    {imageview.tag == "4" && (
                      <img
                        className="GalleryImg"
                        src={imageview.src}
                        alt="image"
                      />
                    )}
                  </div>
                  <Row className={`${All.Text_left} slideProfileDetail `}>
                    <Col
                      lg={9}
                      className={`${All.Order_sm_2} ${All.Order_xs_2} ${All.Order_md_2}`}
                    >
                      <Box className={`${All.Text_left}`}>
                        <Box textAlign={"Left"}>
                          <img
                            class="alignleft"
                            src={user_profile}
                            alt="Image Sample 1"
                            style={{
                              display: "inline",
                              float: "left",
                              width: "75px",
                              marginRight: "15px",
                              height: "75px",
                              borderRadius: "100px",
                            }}
                          />
                        </Box>

                        <Box pt={1}>
                          <Link to="/profile">
                            <h5 className={All.Bold}>
                              {imageview.user_name || <Skeleton />}
                            </h5>
                          </Link>
                          <label
                            className={`${All.paddingbottom} ${All.TextBlueColor}`}
                          >
                            Follow
                          </label>
                        </Box>

                        <Box className={All.JobDescription}>
                          <label
                            className={`${All.paddingtop} ${All.paddingbottom}`}
                          >
                            Hello Everyone,
                          </label>
                          <label className={All.paddingtop}>
                            {imageview.user_name || <Skeleton />}
                          </label>
                          <label className={All.paddingtop}>
                            Wanna create something great?
                          </label>
                          <Link to="">
                            <label className={All.paddingtop}>
                              Feel free contact us{" "}
                              <span
                                className={`${All.DarkBlue} ${All.FSize_16}`}
                              >
                                Info@nexevo.in
                              </span>
                            </label>
                          </Link>
                        </Box>
                        {imageview.comments === "true" && (
                          <CommentBox
                            passedVal={this.state.fieldVal}
                            userid={imageview.user_id}
                            postid={this.state.post_id}
                          />
                        )}
                      </Box>
                    </Col>

                    <Col lg={3}>
                      <Box>
                        <label className={`${All.Bold} ${All.paddingbottom_5}`}>
                          Like What You See?
                        </label>
                        <label>This Droners is available for work</label>
                      </Box>
                      <Box pt={2} pb={5}>
                        <Link
                          to={{
                            pathname: `/ProfileSingle/${this.props.match.params.user_id}`,
                          }}
                        >
                          <Button className={All.BtnStyle_11}>
                            {" "}
                            <img style={{ paddingRight: 10 }} src={Hirebtn} />
                            Hire This Droner
                          </Button>
                        </Link>
                      </Box>
                      <Box pb={2}>
                        <label className={All.Bold}>
                          More Shots from {imageview.author || <Skeleton />}
                        </label>
                      </Box>
                      <Box>
                        {relatedposts.map((option) => (
                          <a
                            className={`${All.marginright_9} ${All.RecentImg}`}
                            href={
                              "././#/Imageview/" +
                              option.id +
                              "/" +
                              option.user_id
                            }
                          >
                            {option.tag == "1" && (
                              <img
                                src={
                                  option.src || (
                                    <Skeleton width={150} height={109} />
                                  )
                                }
                                style={{
                                  width: " 120px",
                                  height: "109px",
                                  borderRadius: "10px",
                                  marginBottom: "10px",
                                }}
                              />
                            )}
                            {option.tag == "2" && (
                              <img
                                src={
                                  option.src || (
                                    <Skeleton width={150} height={109} />
                                  )
                                }
                                style={{
                                  width: " 120px",
                                  height: "109px",
                                  borderRadius: "10px",
                                  marginBottom: "10px",
                                }}
                              />
                            )}
                            {option.tag == "3" && (
                              <video
                                style={{
                                  width: "120px",
                                  height: "109px",
                                  borderRadius: "10px",
                                  marginBottom: "10px",
                                }}
                                className="GalleryImg"
                              >
                                <source src={option.src} type="video/mp4" />
                              </video>
                            )}
                            {option.tag == "4" && (
                              <img
                                src={
                                  option.src || (
                                    <Skeleton width={150} height={109} />
                                  )
                                }
                                style={{
                                  width: " 120px",
                                  height: "109px",
                                  borderRadius: "10px",
                                  marginBottom: "10px",
                                }}
                              />
                            )}
                          </a>
                        ))}
                      </Box>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}
