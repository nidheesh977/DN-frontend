import React from "react";
import { Helmet } from "react-helmet";

import All from "../website/All.module.css";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// import ProfileImg from "../ProfileImg/Profile";
// import CoverImg from "../ProfileCoverImg/ProfileCoverImg";
import Close from "../images/close.svg";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useHistory, useParams } from "react-router-dom";
import whatsapp_icon from "../images/whatsapp_icon.png";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import s_c_form_img from "../images/s_c_form_img.png";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import "../css/PilotDetail.css";
import addIcon from "../images/add.png";
import hireBtnIcon from "../images/hirebtn.svg";
import productLike from "../images/product_like.png";
import viewIcon from "../images/viewIcon.svg";
import userIcon from "../images/userIcon.svg";
import moreIcon from "../images/moreIcon.svg";
import messageIcon from "../images/messageIcon.svg";
import hirePilotIcon from "../images/hirePilotIcon.svg";
import downloadIcon from "../images/downloadIcon.svg";
import videoIcon from "../images/video-icon.svg";
import loadMore from "../images/Group 71.svg";
import userDone from "../images/userDone.svg";
import userCross from "../images/userCross.svg";
import axios from "axios";
import Avatar from "material-ui/Avatar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

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
export default function PilotDetails(props) {
  const domain = process.env.REACT_APP_MY_API;

  const history = useHistory();
  const param = useParams();

  const [newReview, setNewReview] = useState("");

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [category, setCategory] = useState(1);

  const [files, setFiles] = useState([]);

  const [allFileCount, setAllFileCount] = useState(0);
  const [imageFileCount, setImageFileCount] = useState(0);
  const [videoFileCount, setVideoFileCount] = useState(0);
  const [file3dCount, setFile3dCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [loginErrorPopup, setLoginErrorPopup] = useState(0);

  const [viewMessage, setViewMessage] = useState(false);

  const messages = [1, 2, 3, 4, 5, 6];
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const handleErrorClose = () => {
    setErrorMsg("");
    setError(false);
  };

  const selectCategory = (new_category) => {
    setCategory(new_category);
  };

  const selectCategoryDropdown = (e) => {
    setCategory(Number(e.target.value));
  };

  const showFileDetails = (id) => {
    document.getElementById("p_d_file_details_" + id).style.visibility =
      "visible";
  };

  const hideFileDetails = (id) => {
    document.getElementById("p_d_file_details_" + id).style.visibility =
      "hidden";
  };

  const openMessage = () => {
    setViewMessage(true);
  };

  const closeMessage = () => {
    setViewMessage(false);
  };

  const [startProcess, setStartProcess] = useState(false);
  const [hireForm, setHireForm] = useState({
    description: "",
    attached_file: "",
  });

  const handleProcessFileChange = (e) => {
    setHireForm({
      ...hireForm,
      attached_file: e.target.files[0],
    });
  };

  const closeProcess = () => {
    setStartProcess(false);
  };
  const clickHire = () => {
    console.log("Hire me clicked");
    setStartProcess(true);
  };
  const submitProcess = () => {
    if (hireForm.description !== "" && hireForm.description.length <= 200) {
      axios.post(`${domain}/api/hireProposal/createProposal`, {pilotId: param.id, message: hireForm.description}, config).then(res=>{
        console.log(res)
//test
if(res.status === 200){
  document.getElementById("btn1").style.display ="none"
  document.getElementById("btn2").style.display ="block"
  document.querySelector(".h_p_start_process_form_description").style.backgroundColor = "#f5f5f7"
}
setTimeout(()=>{
  return(


    setStartProcess(false),
    setHireForm({
      ...hireForm,
      description: ""
    })
,
  document.getElementById("btn1").style.display ="block",
  document.getElementById("btn2").style.display ="none",
  document.querySelector(".h_p_start_process_form_description").style.backgroundColor = "#f5f5f7")}
  , 1500);



      
      
      })
    }
    else if(hireForm.description.length >= 200){
      document.getElementById("hire_description").style.backgroundColor = "#FFCCCB"

    } else {
      document.getElementById("description_error").style.display = "contents";
      document.getElementById("hire_description").style.marginBottom = "10px";
    }
  };

  const hireDescChangeHandler = (e) => {
    document.getElementById("hire_description").style.backgroundColor = "white"

    document.getElementById("description_error").style.display = "none";
    document.getElementById("hire_description").style.marginBottom = "30px";
    setHireForm({
      ...hireForm,
      description: e.target.value,
    });
  };

  //yaseen

  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  let [pilotData, setPilotData] = useState({});
  let [fol, setFol] = useState([]);
  useEffect(() => {
    axios
      .get(`${domain}/api/pilot/pilotDetails/${props.match.params.id}`)
      .then((response) => {
        setPilotData(response.data);
        if (response.data.name === "CastError") {
          history.push("/no-page-found");
        }
        console.log(response);
      })
      .catch((err) => {
        history.push("/no-page-found");
      });
    axios
      .get(`${domain}/api/pilot/getPilotMedia/${props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        setFiles(res.data);
        setAllFileCount(res.data.length);
        if (res.data.length === 0) {
          setCategory(5);
        }
      });

    axios
      .get(`${domain}/api/image/getUserImagesOnly/${props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        setImageFileCount(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${domain}/api/image/getUserVideosOnly/${props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        setVideoFileCount(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${domain}/api/image/getUser3dOnly/${props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        setFile3dCount(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(`${domain}/api/follow/getUserFollowers`, {
        id: props.match.params.id,
      })
      .then((res) => {
        console.log(res.data);
        setFollowers(res.data);
        setFollowersCount(res.data.length);
      });

    axios
      .post(`${domain}/api/follow/getUserFollowing`, {
        id: props.match.params.id,
      })
      .then((res) => {
        console.log(res.data);
        setFollowing(res.data);
        setFollowingCount(res.data.length);
      });
  }, []);
  let [myFollowing, setMyFollowing] = useState([]);
  useEffect(() => {
    axios.post(`${domain}/api/follow/getMyFollowing`, config).then((res) => {
      const folowers = res.data;
      console.log(folowers);
      setMyFollowing(folowers);
    });
  }, []);

  let followMe = () => {
    if (localStorage.getItem("access_token")){
    axios
      .post(
        `${domain}/api/follow/createFollow/${props.match.params.id}`,
        config
      )
      .then((response) => {
        axios
          .post(`${domain}/api/follow/getMyFollowing`, config)
          .then((res) => {
            const folowers = res.data;
            console.log(folowers);
            setMyFollowing(folowers);
          });
        console.log(response);
        // setBrands(response.data.brandOfDrones)
      });
    }else{
      setLoginErrorPopup(true)
    }
  };
  let unfollow = () => {
    axios
      .post(
        `${domain}/api/follow/removeFollow/${props.match.params.id}`,
        config
      )
      .then((response) => {
        axios
          .post(`${domain}/api/follow/getMyFollowing`, config)
          .then((res) => {
            const folowers = res.data;
            console.log(folowers);
            setMyFollowing(folowers);
          });
        console.log(response);
        // setBrands(response.data.brandOfDrones)
      });
  };

  const loginErrorPopupClose = () => {
    setLoginErrorPopup(false)
  }

  let followMeId = (id) => {
    if(localStorage.getItem("access_token")){

      axios.post(`${domain}/api/pilot/getPilotId`, { userId: id }).then((res) => {
        axios
          .post(`${domain}/api/follow/createFollow/${res.data[0]._id}`, config)
          .then((response) => {
            axios
              .post(`${domain}/api/follow/getMyFollowing`, config)
              .then((res) => {
                const folowers = res.data;
                console.log(folowers);
                setMyFollowing(folowers);
              });
            console.log(response);
            // setBrands(response.data.brandOfDrones)
          });
      });
    }else{
      setLoginErrorPopup(true)
    }
    
  };

  let unfollowId = (id) => {
    axios.post(`${domain}/api/pilot/getPilotId`, { userId: id }).then((res) => {
      axios
        .post(`${domain}/api/follow/removeFollow/${res.data[0]._id}`, config)
        .then((response) => {
          axios
            .post(`${domain}/api/follow/getMyFollowing`, config)
            .then((res) => {
              const folowers = res.data;
              console.log(folowers);
              setMyFollowing(folowers);
            });
          console.log(response);
          // setBrands(response.data.brandOfDrones)
        });
    });
  };
  //yaseen

  return (
    <>
      <Helmet>
        <title>Pilot details</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>
      <section
        className={` ${All.Profile} ${All.EndUserProfile} s_c_d_container`}
      >
        {viewMessage && (
          <div className="p_d_message_container">
            <div className="p_d_message_user_details">
              <div className="p_d_message_user_image_container">
                <img
                  src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png"
                  alt=""
                  className="p_d_message_user_image"
                />
              </div>
              <div className="p_d_message_user_title">Messaging</div>
              <div className="p_d_message_close_container">
                <img
                  src={Close}
                  alt=""
                  className="p_d_message_close"
                  height={"15px"}
                  onClick={closeMessage}
                />
              </div>
            </div>
            <div className="p_d_message_input_container">
              <input
                type="text"
                className="p_d_message_search"
                placeholder="Search keywords"
              />
            </div>
            {messages.map((message, index) => {
              return (
                <div className="p_d_message_recieve_container">
                  <div className="p_d_message_sender_img_container">
                    <img
                      src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png"
                      alt=""
                      className="p_d_message_sender_img"
                    />
                  </div>
                  <div className="p_d_message_content_container">
                    <div
                      style={{
                        width: "240px",
                        paddingRight: "10px",
                        paddingLeft: "15px",
                      }}
                    >
                      <div className="p_d_message_sender_name">
                        {pilotData.name}
                      </div>
                      <div className="p_d_message_text">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </div>
                    </div>
                    <div className="p_d_message_time">Jan 27</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Container className={All.Container}>
          <div id="div1">
            <div>
              <MuiThemeProvider>
                {pilotData.profilePic ? (
                  <img
                    src={`${pilotData.coverPic}`}
                    className="avatar_coverPic"
                  />
                ) : (
                  <Avatar
                    src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                    className={All.BackgroundcoverImg}
                    size={100}
                  />
                )}
              </MuiThemeProvider>
            </div>
            <div id="div2">
              <MuiThemeProvider>
                <div className={All.M_ProfileCenter}>
                  {pilotData.profilePic ? (
                    <img
                      src={`${pilotData.profilePic}`}
                      className="avatar_profilePic"
                    />
                  ) : (
                    <Avatar
                      src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                      size={100}
                    />
                  )}
                </div>
              </MuiThemeProvider>
            </div>
          </div>

          {error && (
            <Snackbar
              open={error}
              autoHideDuration={3000}
              onClose={handleErrorClose}
            >
              <Alert
                variant="filled"
                onClose={handleErrorClose}
                severity="error"
              >
                {errorMsg}
              </Alert>
            </Snackbar>
          )}
          <Row>
            <Col
              md={6}
              className={`${All.Order_xs_2} ${All.Order_sm_2} ${All.pr_xs_30} ${All.pl_xs_30} ${All.profileImg}`}
            >
              <Box py={1}>
                <div className="p_d_name_container">
                  <div className="p_d_name">
                    {pilotData.name || <Skeleton />}
                  </div>
                  <span className="s_c_rating">
                    <span className="star_checked">&#9733;</span>
                    <span className="star_checked">&#9733;</span>
                    <span className="star_checked">&#9733;</span>
                    <span className="star_checked">&#9733;</span>
                    <span className="star_checked">&#9733;</span>
                  </span>
                </div>
              </Box>
              <Box py={1}>
                <div
                  className="p_d_profession"
                  style={{ textTransform: "capitalize" }}
                >
                  {pilotData.pilotType} pilot
                </div>
              </Box>

              <div className="p_d_location">
                {pilotData.city}, {pilotData.country}
              </div>

              <div className="p_d_description">{pilotData.bio}</div>

              <div className="p_d_btn_container">
                {myFollowing.includes(pilotData.userId) ? (
                  <button
                    className="p_d_follow_btn p_d_btn"
                    onClick={unfollow}
                    style={{
                      background:
                        "transparent linear-gradient(290deg, #4ffea3 0%, #00e7fc 100%) 0% 0% no-repeat padding-box",
                      opacity: "0.9",
                    }}
                  >
                    <img
                      className="p_d_soc_icon1"
                      src={userDone}
                      alt=""
                      height={"20px"}
                    />{" "}
                    Followed
                  </button>
                ) : (
                  <button className="p_d_follow_btn p_d_btn" onClick={followMe}>
                    <img
                      className="p_d_soc_icon1"
                      src={addIcon}
                      alt=""
                      height={"20px"}
                    />{" "}
                    Follow me
                  </button>
                )}

                <button className="p_d_hire_btn p_d_btn  " onClick={clickHire}>
                  <img
                    className="p_d_soc_icon2"
                    src={hireBtnIcon}
                    alt=""
                    height={"20px"}
                  />{" "}
                  Hire me
                </button>
              </div>
            </Col>
            <Col
              md={6}
              className={`${All.Order_xs_1} ${All.Order_sm_1}  ${All.coverImg} ${All.pr_xs_30} ${All.pl_xs_30}`}
            >
              {/* coverPic */}
              {/* <MuiThemeProvider >
                {pilotData.profilePic
                ?<Avatar src={`${pilotData.coverPic}`} className={All.BackgroundcoverImg} size={100} />
                :<Avatar src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`} className={All.BackgroundcoverImg} size={100} />
                }
              </MuiThemeProvider> */}
            </Col>
          </Row>
          <div className="p_d_tabs">
            <div className="p_d_tabs_left" style={{ display: "inline-block" }}>
              <Visible xxl xl lg>
                <div
                  className={
                    category === 1 ? "p_d_tab p_d_tab_selected" : "p_d_tab"
                  }
                  id="s_c_d_about_tab"
                  onClick={() => selectCategory(1)}
                >
                  All
                </div>
                <div
                  className={
                    category === 2 ? "p_d_tab p_d_tab_selected" : "p_d_tab"
                  }
                  id="pd_brands_tab"
                  onClick={() => selectCategory(2)}
                >
                  Images
                </div>
                <div
                  className={
                    category === 3 ? "p_d_tab p_d_tab_selected" : "p_d_tab"
                  }
                  id="pd_reviews_tab"
                  onClick={() => selectCategory(3)}
                >
                  Videos
                </div>
                <div
                  className={
                    category === 4 ? "p_d_tab p_d_tab_selected" : "p_d_tab"
                  }
                  id="pd_reviews_tab"
                  onClick={() => selectCategory(4)}
                >
                  3D Models
                </div>
                <div
                  className={
                    category === 5 ? "p_d_tab p_d_tab_selected" : "p_d_tab"
                  }
                  id="pd_reviews_tab"
                  onClick={() => selectCategory(5)}
                >
                  About
                </div>
              </Visible>
              <Visible md sm xs>
                <div className="p_d_tab_filter_title">Select Tab : </div>
                <select
                  className="p_d_tab_filter"
                  onChange={selectCategoryDropdown}
                >
                  <option value={1}>All</option>
                  <option value={2}>Images</option>
                  <option value={3}>Video</option>
                  <option value={4}>3D Models</option>
                  <option value={5}>About</option>
                  <option value={6}>Followers</option>
                  <option value={7}>Following</option>
                </select>
              </Visible>
            </div>
            <Visible xxl xl lg>
              <div className="p_d_tabs_right" style={{ float: "right" }}>
                <div
                  className={
                    category === 6 ? "p_d_tab p_d_tab_selected" : "p_d_tab"
                  }
                  id="p_d_followers_tab"
                  onClick={() => selectCategory(6)}
                >
                  Followers
                </div>
                <div
                  className={
                    category === 7 ? "p_d_tab p_d_tab_selected" : "p_d_tab"
                  }
                  id="p_d_following_tab"
                  onClick={() => selectCategory(7)}
                >
                  Following
                </div>
              </div>
            </Visible>
          </div>
          <hr style={{ border: "1px solid #eee", marginBottom: "40px" }} />
          {category === 1 && (
            <Row gutterWidth={10}>
              {allFileCount > 0 ? (
                <>
                  {files.map((file, index) => {
                    return (
                      <Col xxl={3} xl={3} lg={4} md={6} sm={6} xs={12}>
                        <div className="p_d_files_container">
                          {file.fileType === "video" ? (
                            <Link to={`/Imageview/${file._id}/${file.userId}`}>
                              <video
                                className="p_d_files"
                                src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${file.file}`}
                                alt=""
                                width={"100%"}
                                height={"250px"}
                              />
                              <img
                                src={videoIcon}
                                alt=""
                                className="p_d_files_video_icon"
                                style={{ top: "calc(50% - 30px)" }}
                              />
                            </Link>
                          ) : (
                            <Link to={`/Imageview/${file._id}/${file.userId}`}>
                              <img
                                className="p_d_files"
                                src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${file.file}`}
                                alt=""
                                width={"100%"}
                                height={"250px"}
                              />
                            </Link>
                          )}
                        </div>
                      </Col>
                    );
                  })}
                </>
              ) : (
                <div
                  style={{
                    fontSize: "22px",
                    fontFamily: "muli-regular",
                    textAlign: "center",
                    marginTop: "35px",
                    marginBottom: "35px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  No files uploaded.
                </div>
              )}

              {/* <div
                className="a_j_load_div"
                style={{ margin: "40px 0px", width: "100%" }}
              >
                <button className="a_j_loadMore_btn">
                  <img src={loadMore} className="a_j_location_logo" />
                  <span className="a_j_location_text">Load More</span>
                </button>{" "}
              </div> */}
            </Row>
          )}
          {category === 2 && (
            <Row gutterWidth={10}>
              {imageFileCount > 0 ? (
                <>
                  {files.map((file, index) => {
                    return (
                      <>
                        {file.fileType === "image" ? (
                          <Col xxl={3} xl={3} lg={4} md={6} sm={6} xs={12}>
                            <div className="p_d_files_container">
                              <img
                                className="p_d_files"
                                src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${file.file}`}
                                alt=""
                                width={"100%"}
                                height={"250px"}
                              />
                            </div>
                          </Col>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                <div
                  style={{
                    fontSize: "22px",
                    fontFamily: "muli-regular",
                    textAlign: "center",
                    marginTop: "35px",
                    marginBottom: "35px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  No image files uploaded.
                </div>
              )}
              {/* <div
                className="a_j_load_div"
                style={{ margin: "40px 0px", width: "100%" }}
              >
                <button className="a_j_loadMore_btn">
                  <img src={loadMore} className="a_j_location_logo" />
                  <span className="a_j_location_text">Load More</span>
                </button>{" "}
              </div> */}
            </Row>
          )}
          {category === 3 && (
            <Row gutterWidth={10}>
              {videoFileCount > 0 ? (
                <>
                  {files.map((file, index) => {
                    return (
                      <>
                        {file.fileType === "video" ? (
                          <Col xxl={3} xl={3} lg={4} md={6} sm={6} xs={12}>
                            <div className="p_d_files_container">
                              <video
                                className="p_d_files"
                                src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${file.file}`}
                                alt=""
                                width={"100%"}
                                height={"250px"}
                              />
                              <img
                                src={videoIcon}
                                alt=""
                                className="p_d_files_video_icon"
                                style={{ top: "calc(50% - 30px)" }}
                              />
                            </div>
                          </Col>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                <div
                  style={{
                    fontSize: "22px",
                    fontFamily: "muli-regular",
                    textAlign: "center",
                    marginTop: "35px",
                    marginBottom: "35px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  No video files uploaded.
                </div>
              )}
              {/* <div
                className="a_j_load_div"
                style={{ margin: "40px 0px", width: "100%" }}
              >
                <button className="a_j_loadMore_btn">
                  <img src={loadMore} className="a_j_location_logo" />
                  <span className="a_j_location_text">Load More</span>
                </button>{" "}
              </div> */}
            </Row>
          )}
          {category === 4 && (
            <Row gutterWidth={10}>
              {file3dCount > 0 ? (
                <>
                  {files.map((file, index) => {
                    return (
                      <>
                        {file.fileType === "3d" ? (
                          <Col xxl={3} xl={3} lg={4} md={6} sm={6} xs={12}>
                            <div className="p_d_files_container">
                              <img
                                className="p_d_files"
                                src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${file.file}`}
                                alt=""
                                width={"100%"}
                                height={"250px"}
                              />
                            </div>
                          </Col>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                  )
                </>
              ) : (
                <div
                  style={{
                    fontSize: "22px",
                    fontFamily: "muli-regular",
                    textAlign: "center",
                    marginTop: "35px",
                    marginBottom: "35px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  No 3d image files uploaded.
                </div>
              )}
              {/* <div
                className="a_j_load_div"
                style={{ margin: "40px 0px", width: "100%" }}
              >
                <button className="a_j_loadMore_btn">
                  <img src={loadMore} className="a_j_location_logo" />
                  <span className="a_j_location_text">Load More</span>
                </button>{" "}
              </div> */}
            </Row>
          )}

          {category === 5 && (
            <Row>
              <Col xl={7} lg={7} md={6} sm={12}>
                <div className="p_d_about_name_container">
                  <div className="p_d_about_title">Name:</div>
                  <div className="p_d_about_name">{pilotData.name}</div>
                </div>
                {pilotData.bio && (
                  <div className="p_d_about_description_container">
                    <div className="p_d_about_title">Description</div>
                    <div className="p_d_about_content">{pilotData.bio}</div>
                  </div>
                )}
                <div className="p_d_about_skills_container">
                  <div className="p_d_about_title">Skills:</div>
                  <div className="p_d_about_skills_keyword_container">
                    {pilotData.skills.map((skill, index) => {
                      return (
                        <div className="p_d_about_skills_keyword">{skill}</div>
                      );
                    })}
                  </div>
                </div>
              </Col>
              <Visible xl>
                <Col xl={1}></Col>
              </Visible>
              <Col xl={4} lg={5} md={6} sm={12}>
                <div className="p_d_pilot_details">
                  <div className="p_d_about_details_title">Pilot type</div>
                  <div
                    className="p_d_about_details_content"
                    style={{ textTransform: "cap" }}
                  >
                    {pilotData.pilotType} pilot
                  </div>
                  <div className="p_d_about_details_title">DOB</div>
                  <div className="p_d_about_details_content">
                    {pilotData.dob}
                  </div>
                  <div className="p_d_about_details_title">Gender</div>
                  <div className="p_d_about_details_content">
                    {pilotData.gender}
                  </div>
                  <div className="p_d_about_details_title">Work type</div>
                  <div className="p_d_about_details_content">
                    {pilotData.workType === "full_time"
                      ? "Full time"
                      : "Part time"}
                  </div>
                  {pilotData.workType === "full_time" ? (
                    <>
                      <div className="p_d_about_details_title">
                        Monthly payment ($)
                      </div>
                      <div className="p_d_about_details_content">
                        {pilotData.monthlyPayment}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p_d_about_details_title">
                        Hourly payment ($)
                      </div>
                      <div className="p_d_about_details_content">
                        {pilotData.hourlyPayment}
                      </div>
                    </>
                  )}
                  <div className="p_d_about_details_title">Industry</div>
                  <div className="p_d_about_details_content">
                    {pilotData.industry.map((industry, index) => {
                      return <>{industry}, </>;
                    })}
                  </div>
                  {pilotData.trainingCenter && (
                    <>
                      <div className="p_d_about_details_title">
                        Training center name
                      </div>
                      <div className="p_d_about_details_content">
                        {pilotData.trainingCenter}
                      </div>
                    </>
                  )}

                  {pilotData.completedYear && (
                    <>
                      <div className="p_d_about_details_title">
                        Completed year
                      </div>
                      <div className="p_d_about_details_content">
                        {pilotData.completedYear}
                      </div>
                    </>
                  )}
                </div>
                <div className="p_d_hire_container">
                  <div className="p_d_hire_content">
                    If you want to hire this pilot, Click the below button
                  </div>
                  <button className="p_d_about_hire_btn">
                    <img
                      src={hirePilotIcon}
                      alt=""
                      height={"20px"}
                      style={{ paddingTop: "2px", marginRight: "10px" }}
                    />{" "}
                    Hire Pilot
                  </button>
                </div>
              </Col>
            </Row>
          )}

          {category === 6 && (
            <div className="p_d_followers_container">
              {followersCount > 0 ? (
                <>
                  {followers.map((follow, index) => {
                    return (
                      <>
                        <Visible xxl xl lg>
                          <Container style={{ width: "80%" }}>
                            <div className="p_d_follower_details_container">
                              <div className="p_d_followers_img_container">
                                <img
                                  src={
                                    follow.profilePic
                                      ? `${follow.profilePic}`
                                      : "https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png"
                                  }
                                  alt=""
                                  height={"150px"}
                                  width={"150px"}
                                  style={{ borderRadius: "75px" }}
                                />
                              </div>
                              <div className="p_d_followers_other_details_xxl">
                                <div className="p_d_followers_name_username">
                                  <div className="p_d_followers_name">
                                    {follow.name}
                                  </div>
                                  <div
                                    className="p_d_followers_username"
                                    style={{
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {follow.role}
                                  </div>
                                </div>
                                <div className="p_d_followers_btn_container">
                                  {myFollowing.includes(follow._id) ? (
                                    <button
                                      className="p_d_followers_follow_btn p_d_followers_follow_btn_xxl"
                                      onClick={() => unfollowId(follow._id)}
                                    >
                                      Unfollow
                                    </button>
                                  ) : (
                                    <button
                                      className="p_d_followers_follow_btn p_d_followers_follow_btn_xxl"
                                      onClick={() => followMeId(follow._id)}
                                    >
                                      Follow
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                            <hr
                              style={{
                                border: "1px solid rgba(112, 112, 112, 0.2)",
                              }}
                            />
                          </Container>
                        </Visible>
                        <Visible md sm xs>
                          <Container>
                            <div className="p_d_follower_details_container">
                              <div className="p_d_followers_img_container">
                                <img
                                  src={
                                    follow.profilePic
                                      ? `${follow.profilePic}`
                                      : "https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png"
                                  }
                                  alt=""
                                  height={"100px"}
                                  width={"100px"}
                                  style={{ borderRadius: "50px" }}
                                />
                              </div>
                              <div className="p_d_followers_other_details_md">
                                <div className="p_d_followers_name">
                                  {follow.name}
                                </div>
                                <div
                                  className="p_d_followers_username"
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {follow.role}
                                </div>
                                <div className="p_d_followers_btn_container">
                                  {myFollowing.includes(follow._id) ? (
                                    <button
                                      className="p_d_followers_follow_btn p_d_followers_follow_btn_xxl"
                                      onClick={() => unfollowId(follow._id)}
                                    >
                                      Unfollow
                                    </button>
                                  ) : (
                                    <button
                                      className="p_d_followers_follow_btn p_d_followers_follow_btn_xxl"
                                      onClick={() => followMeId(follow._id)}
                                    >
                                      Follow
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                            <hr
                              style={{
                                border: "1px solid rgba(112, 112, 112, 0.2)",
                              }}
                            />
                          </Container>
                        </Visible>
                      </>
                    );
                  })}
                </>
              ) : (
                <div
                  style={{
                    fontSize: "22px",
                    fontFamily: "muli-regular",
                    textAlign: "center",
                    marginTop: "35px",
                    marginBottom: "35px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  No followers.
                </div>
              )}

              {/* <div
                className="a_j_load_div"
                style={{ margin: "40px 0px", width: "100%" }}
              >
                <button className="a_j_loadMore_btn">
                  <img src={loadMore} className="a_j_location_logo" />
                  <span className="a_j_location_text">Load More</span>
                </button>{" "}
              </div> */}
            </div>
          )}

          {category === 7 && (
            <div className="p_d_followers_container">
              {followingCount > 0 ? (
                <></>
              ) : (
                <div
                  style={{
                    fontSize: "22px",
                    fontFamily: "muli-regular",
                    textAlign: "center",
                    marginTop: "35px",
                    marginBottom: "35px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  No following.
                </div>
              )}

              {following.map((follow, index) => {
                return (
                  <>
                    <Visible xxl xl lg>
                      <Container style={{ width: "80%" }}>
                        <div className="p_d_follower_details_container">
                          <div className="p_d_followers_img_container">
                            <img
                              src={
                                follow.profilePic
                                  ? `${follow.profilePic}`
                                  : "https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png"
                              }
                              alt=""
                              height={"150px"}
                              width={"150px"}
                              style={{ borderRadius: "75px" }}
                            />
                          </div>
                          <div className="p_d_followers_other_details_xxl">
                            <div className="p_d_followers_name_username">
                              <div className="p_d_followers_name">
                                {follow.name}
                              </div>
                              <div
                                className="p_d_followers_username"
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  textTransform: "capitalize",
                                }}
                              >
                                {follow.role}
                              </div>
                            </div>
                            <div className="p_d_followers_btn_container">
                              {myFollowing.includes(follow._id) ? (
                                <button
                                  className="p_d_followers_follow_btn p_d_followers_follow_btn_xxl"
                                  onClick={() => unfollowId(follow._id)}
                                >
                                  Unfollow
                                </button>
                              ) : (
                                <button
                                  className="p_d_followers_follow_btn p_d_followers_follow_btn_xxl"
                                  onClick={() => followMeId(follow._id)}
                                >
                                  Follow
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <hr
                          style={{
                            border: "1px solid rgba(112, 112, 112, 0.2)",
                          }}
                        />
                      </Container>
                    </Visible>
                    <Visible md sm xs>
                      <Container>
                        <div className="p_d_follower_details_container">
                          <div className="p_d_followers_img_container">
                            <img
                              src={
                                follow.profilePic
                                  ? `${follow.profilePic}`
                                  : "https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png"
                              }
                              alt=""
                              height={"100px"}
                              width={"100px"}
                            />
                          </div>
                          <div className="p_d_followers_other_details_md">
                            <div className="p_d_followers_name">
                              {follow.name}
                            </div>
                            <div
                              className="p_d_followers_username"
                              style={{ textTransform: "capitalize" }}
                            >
                              {follow.role}
                            </div>
                            <div className="p_d_followers_btn_container">
                              {myFollowing.includes(follow._id) ? (
                                <button
                                  className="p_d_followers_follow_btn p_d_followers_follow_btn_xxl"
                                  onClick={() => unfollowId(follow._id)}
                                >
                                  Unfollow
                                </button>
                              ) : (
                                <button
                                  className="p_d_followers_follow_btn p_d_followers_follow_btn_xxl"
                                  onClick={() => followMeId(follow._id)}
                                >
                                  Follow
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <hr
                          style={{
                            border: "1px solid rgba(112, 112, 112, 0.2)",
                          }}
                        />
                      </Container>
                    </Visible>
                  </>
                );
              })}
              {/* <div
                className="a_j_load_div"
                style={{ margin: "40px 0px", width: "100%" }}
              >
                <button className="a_j_loadMore_btn">
                  <img src={loadMore} className="a_j_location_logo" />
                  <span className="a_j_location_text">Load More</span>
                </button>{" "}
              </div> */}
            </div>
          )}
          <Dialog
            open={startProcess}
            onClose={closeProcess}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"md"}
            fullWidth={true}
            PaperProps={{ style: { borderRadius: 20 } }}
          >
            <DialogContent
              className={All.PopupBody}
              style={{ marginBottom: "50px" }}
            >
              <div style={{ position: "absolute", top: "20px", right: "20px" }}>
                <img
                  src={Close}
                  alt=""
                  onClick={closeProcess}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Row style={{ marginTop: "30px" }}>
                <div className="h_p_start_process_form">
                  <div className="h_p_start_process_form_title">Hire Pilot</div>
                  <label
                    htmlFor="hire_description"
                    className="h_p_start_process_form_label"
                  >
                    Description
                  </label>
                  <textarea
                    className="h_p_start_process_form_description"
                    id="hire_description"
                    onChange={hireDescChangeHandler}
                  ></textarea>
                  <div className="login_input_error_msg" id="description_error">
                    Description is required
                  </div>
                 
                  <div className="h_p_start_process_form_btn_container" style={{display : "flex", justifyContent: "center"}}>
                      <button onClick={submitProcess} className='h_p_start_process_form_btn' id='btn1'>Send Mail</button>
                      <button className='h_p_start_process_form_btn' id="btn2" style={{display: "none", textAlign: "center"}}>Mail Sent</button>
                    </div>
                </div>
              </Row>
            </DialogContent>
          </Dialog>
          <Dialog
            open={loginErrorPopup}
            onClose={loginErrorPopupClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"md"}
            fullWidth={true}
            PaperProps={{ style: { borderRadius: 10, width: "820px" } }}
          >
            <DialogContent
              className={All.PopupBody}
              style={{ marginBottom: "50px" }}
            >
              <div style={{ position: "absolute", top: "20px", right: "20px" }}>
                <img
                  src={Close}
                  alt=""
                  onClick={loginErrorPopupClose}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Row style={{ marginTop: "30px" }}>
                <div
                  className="a_j_popup_title"
                  style={{ padding: "0px 60px" }}
                >
                  You aren't logged into DroneZone. Please login to continue?
                </div>
                <div
                  className="u_f_popup_btn_container"
                  style={{ marginTop: "8px" }}
                >
                  <div
                    className="j_l_applyJobLoginBtn"
                    style={{ width: "fit-content" }}
                    onClick={() => history.push("/login")}
                  >
                    Login / Sign Up
                  </div>
                </div>
              </Row>
            </DialogContent>
          </Dialog>
        </Container>
      </section>
    </>
  );
}
