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
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Close from "../images/close.svg";
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import sharePNG from '../images/share.png';
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WhatsappIcon,
} from "react-share";

const API_URL = "https://demo-nexevo.in/haj/auth-app/public/api/auth";

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
          <img src={Close} />
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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default class ViewJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      user_id: "",
      role_id: "",
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
      open: false,
      share: false,
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
    var image = this.state.imageview.src
    swal({
      title: "Are you sure?",
      text: "Do you want to download this image",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((download) => {
      if (download) {
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        };
        const url = `https://demo-nexevo.in/haj/auth-app/public/api/auth/freedownload/${event.id}?user_id=${this.state.user_id}`;
        axios
          .post(url, config)
          .then((response) => {
            swal(response.data.message, {
              icon: "success",
            });
          })
      } else {
        swal("Download cancelled");
      }
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  };

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
        this.setState({ role_id: res.data.role_id });
      },
      (err) => {
        console.log(err);
      }
    );

    const url = `${API_URL}/singlelisting/${id}`;

    axios.get(url, config)
      .then(res => {
        try {
          this.setState({ imageview: res.data });
          console.log(res.data)
        }
        catch { }
      })
      .catch(err => {
        console.log(err)
      })

    const urls = `https://demo-nexevo.in/haj/auth-app/public/api/auth/relatedposts/${user_id}`;
    axios
      .get(urls, config)
      .then((res) => res.data)
      .then((data) => {
        this.setState({ relatedposts: data });
      });

    this.setState({ loading: true });

    axios.post('https://demo-nexevo.in/haj/auth-app/public/api/auth/profilesingle', {
      user_id: user_id,
    }, config)
      .then(res => {
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

  other_post = (id, user_id) => {
    this.props.history.push("/Imageview/" + id + "/" + user_id)
    window.location.reload()
  }

  handleSubmit = (e) => {

  }

  handleShareClose = () => {
    this.setState({
      share: false
    })
  }

  shareOpen = () => {
    this.setState({
      share: true
    })
  }

  render() {
    const { imageview, value } = this.state;
    const { relatedposts, values } = this.state;
    var user_profile = this.state.user_profile
    var other_post = this.other_post
    return (
      <>
        <Helmet>
          <title>Image View</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <section>
          <Dialog
            className="test"
            onClose={this.handleShareClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.share}
            maxWidth={"md"}
            fullWidth={true}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={this.handleShareClose}
              className={All.PopupHeader}
            >
              <Box display="flex" pt={6}>
                <Box mt={2}>
                  <h3 className={All.Bold} style={{ textAlign: "center" }}>Share</h3>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
              <Row>
                <WhatsappShareButton url={window.location.href} style={{ margin: '10px' }}>
                  <WhatsappIcon size={52} round={true} />
                </WhatsappShareButton>
                <FacebookShareButton url={window.location.href} style={{ margin: '10px' }}>
                  <FacebookIcon size={52} round={true} />
                </FacebookShareButton>
                <EmailShareButton url={window.location.href} style={{ margin: '10px' }}>
                  <EmailIcon size={52} round={true} />
                </EmailShareButton>
                <TwitterShareButton url={window.location.href} style={{ margin: '10px' }}>
                  <TwitterIcon size={52} round={true} />
                </TwitterShareButton>
                <TelegramShareButton url={window.location.href} style={{ margin: '10px' }}>
                  <TelegramIcon size={52} round={true} />
                </TelegramShareButton>
                <LinkedinShareButton url={window.location.href} style={{ margin: '10px' }}>
                  <LinkedinIcon size={52} round={true} />
                </LinkedinShareButton>
                <PinterestShareButton url={window.location.href} style={{ margin: '10px' }}>
                  <PinterestIcon size={52} round={true} />
                </PinterestShareButton>
                <VKShareButton url={window.location.href} style={{ margin: '10px' }}>
                  <VKIcon size={52} round={true} />
                </VKShareButton>
                <ViberShareButton url={window.location.href} style={{ margin: '10px' }}>
                  <ViberIcon size={52} round={true} />
                </ViberShareButton>
                <RedditShareButton url={window.location.href} style={{ margin: '10px' }}>
                  <RedditIcon size={52} round={true} />
                </RedditShareButton>
                <LineShareButton url={window.location.href} style={{ margin: '10px' }}>
                  <LineIcon size={52} round={true} />
                </LineShareButton>
              </Row>
            </DialogContent>
          </Dialog>
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
                      <>
                        <span style={{
                          position: 'absolute',
                          top: '10px',
                          float: "right",
                          zIndex: 1000
                        }}>
                          <FavoriteBorder />
                          <img src={sharePNG} style={{
                            paddingLeft: "30px",
                          }} onClick={this.shareOpen} />
                        </span>
                        <img
                          className="GalleryImg"
                          src={imageview.src}
                          alt="image"
                        />
                      </>
                    )}
                    {imageview.tag == "2" && (
                      <>
                        <span style={{
                          position: 'absolute',
                          top: '10px',
                          float: "right",
                          zIndex: 1000
                        }}>
                          <FavoriteBorder />
                          <img src={sharePNG} style={{
                            paddingLeft: "30px",
                          }} onClick={this.shareOpen} />
                        </span>
                        <img
                          className="GalleryImg"
                          src={imageview.src}
                          alt="image"
                        />
                      </>
                    )}
                    {imageview.tag == "3" && (
                      <>
                          <span style={{
                          position: 'absolute',
                          top: '10px',
                          float: "right",
                          zIndex: 1000
                        }}>
                          <FavoriteBorder />
                          <img src={sharePNG} style={{
                            paddingLeft: "30px",
                          }} onClick={this.shareOpen} />
                        </span>
                        <video src={imageview.src} controls className="GalleryImg"></video>
                      </>
                    )}
                    {imageview.tag == "4" && (
                      <>
                        <span style={{
                          position: 'absolute',
                          top: '10px',
                          float: "right",
                          zIndex: 1000
                        }}>
                          <FavoriteBorder />
                          <img src={sharePNG} style={{
                            paddingLeft: "30px",
                          }} onClick={this.shareOpen} />
                        </span>
                        <img
                          className="GalleryImg"
                          src={imageview.src}
                          alt="image"
                        />
                      </>

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
                          <Link
                            className={`${All.marginright_9} ${All.RecentImg}`}
                            onClick={() => { other_post(option.id, option.user_id) }}
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
                          </Link>
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
                            <Link>
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
                      <video src={imageview.src} controls className="GalleryImg"></video>
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
                          <Link
                            className={`${All.marginright_9} ${All.RecentImg}`}
                            // to={"/Imageview/" +
                            //   option.id +
                            //   "/" +
                            //   option.user_id
                            // }
                            onClick={() => { other_post(option.id, option.user_id) }}
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
                          </Link>
                        ))}
                      </Box>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
          <Dialog
            className="test"
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}
            maxWidth={"md"}
            fullWidth={true}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={this.handleClose}
              className={All.PopupHeader}
            >
              <Box display="flex" pt={6}>
                <Box pr={2}>
                  <img
                    style={{ width: "75px", height: "75px", borderRadius: "50%" }}
                    src={user_profile}
                  />
                </Box>
                <Box mt={2}>
                  <h3 className={All.Bold}>Hire Pilot</h3>
                </Box>
              </Box>
            </DialogTitle>
            <form
              className={`${All.form} ${All.paddingbottom_30}`}
              onSubmit={this.handleSubmit}
            >
              <DialogContent className={All.PopupBody}>
                <Row>
                  <Col>
                    <input
                      type="text"
                      name="name"
                      className={`${All.FormControl} ${All.Popupmodel}`}
                      id="name"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      name="email"
                      className={`${All.FormControl} ${All.Popupmodel}`}
                      id="email"
                      placeholder="Email ID"
                    />
                    <input
                      type="number"
                      name="mobile"
                      className={`${All.FormControl} ${All.Popupmodel}`}
                      id="mobile"
                      placeholder="Mobile Number"
                    />
                    <input
                      type="text"
                      name="job_position"
                      className={`${All.FormControl} ${All.Popupmodel}`}
                      id="job_position"
                      placeholder="Job Position"
                    />
                  </Col>
                  <Col>
                    <textarea
                      type="email"
                      name="message"
                      className={`${All.FormControl} ${All.Popupmodel}`}
                      id="message"
                      placeholder="Create the message"
                      style={{
                        height: '150px',
                        width: '100%',
                      }}
                    />
                  </Col>
                </Row>
              </DialogContent>
              <Box textAlign="Center" className={All.PopupFooter}>
                {/* <Button  onClose={handleCloseReport} variant="contained" color="default" type="button" className={`${All.BtnStyle_4} ${All.FloatLeft}`}>
              Cancel</Button>  */}
                <Button
                  variant="contained"
                  color="default"
                  type="submit"
                  className={`${All.BtnStyle_3} ${All.FloatRight}`}
                  id="follow"
                >
                  Send
                </Button>
              </Box>
            </form>
          </Dialog>
        </section>
      </>
    );
  }
}
