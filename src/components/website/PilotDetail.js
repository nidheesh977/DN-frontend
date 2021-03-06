import React from "react";
import { Helmet } from "react-helmet";

import All from "../website/All.module.css";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Alert from "@mui/material/Alert";

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
import ProImg from "../images/proIcon.png";

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

  const [allFiles, setAllFiles] = useState([]);
  const [files, setFiles] = useState([]);
  let [pilotData, setPilotData] = useState({});
  let [fol, setFol] = useState([]);
  let [rearrangedImages, setRearrangedImages] = useState([]);
  let [rearrangedVideos, setRearrangedVideos] = useState([]);
  let [rearranged3d, setRearranged3d] = useState([]);

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
  const [subscription, setSubscription] = useState({});
  const [upgradePopup, setUpgradePopup] = useState(false);
  const [limitExceededPopup, setLimitExceededPopup] = useState(false);

  const handleErrorClose = () => {
    setErrorMsg("");
    setError(false);
  };

  const selectCategory = (new_category) => {
    setCategory(new_category);
    if (new_category === 1) {
      setFiles(allFiles);
    } else if (new_category === 2) {
      console.log(rearrangedImages);
      if (rearrangedImages.length !== 0) {
        setFiles(rearrangedImages);
      } else {
        setFiles(allFiles);
      }
    } else if (new_category === 3) {
      if (rearrangedVideos.length !== 0) {
        setFiles(rearrangedVideos);
      } else {
        setFiles(allFiles);
      }
    } else if (new_category === 4) {
      if (rearranged3d.length !== 0) {
        setFiles(rearranged3d);
      } else {
        setFiles(allFiles);
      }
    }
  };

  const selectCategoryDropdown = (e) => {
    setCategory(Number(e.target.value));
    if (e.target.value === "1") {
      setFiles(allFiles);
    } else if (e.target.value === "2") {
      console.log(rearrangedImages);
      if (rearrangedImages.length) {
        setFiles(rearrangedImages);
      } else {
        setFiles(allFiles);
      }
    } else if (e.target.value === "3") {
      if (rearrangedVideos.length !== 0) {
        setFiles(rearrangedVideos);
      } else {
        setFiles(allFiles);
      }
    } else if (e.target.value === "4") {
      if (rearranged3d.length !== 0) {
        setFiles(rearranged3d);
      } else {
        setFiles(allFiles);
      }
    }
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
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    if (subscription.subscription) {
      if (
        subscription.subscription.proposals <= subscription.proposals &&
        subscription.subscription.plan.includes("platinum")
      ) {
        setLimitExceededPopup(true);
      } else if (
        subscription.subscription.proposals <= subscription.proposals &&
        !subscription.subscription.plan.includes("platinum")
      ) {
        setUpgradePopup(true);
      } else {
        setStartProcess(true);
      }
    } else {
      setUpgradePopup(true);
    }
    if (localStorage.getItem("role") === "company") {
      axios
        .get(`${domain}/api/company/getCompanySubscription`, config)
        .then((res) => {
          console.log(res.data);
          setSubscription(res.data);
        });
    }
  };
  const submitProcess = () => {
    if (hireForm.description !== "" && hireForm.description.length <= 200) {
      axios
        .post(
          `${domain}/api/hireProposal/createProposal`,
          { pilotId: pilotData._id, message: hireForm.description },
          config
        )
        .then((res) => {
          if (localStorage.getItem("role") === "company") {
            axios
              .get(`${domain}/api/company/getCompanySubscription`, config)
              .then((res) => {
                console.log(res.data);
                setSubscription(res.data);
              });
          }
          console.log(res);
          setHireForm({
            ...hireForm,
            description: "",
          });

          //test
          if (res.status === 200) {
            document.getElementById("alertBox").style.display = "block";

            document.querySelector(
              ".h_p_start_process_form_description"
            ).style.backgroundColor = "#f5f5f7";
            axios
              .post(`${domain}/api/company/setProposals`, config)
              .then((res) => {
                console.log(res);
              });
          }
          setTimeout(() => {
            return (
              setStartProcess(false),
              (document.getElementById("alertBox").style.display = "none")
            );
          }, 1500);
        });
    } else if (hireForm.description.length >= 200) {
      document.getElementById("hire_description").style.backgroundColor =
        "#FFCCCB";
    } else {
      document.getElementById("description_error").style.display = "contents";
      document.getElementById("hire_description").style.marginBottom = "10px";
    }
  };

  const hireDescChangeHandler = (e) => {
    document.getElementById("hire_description").style.backgroundColor = "white";

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

  useEffect(() => {
    if (localStorage.getItem("role") === "company") {
      axios
        .get(`${domain}/api/company/getCompanySubscription`, config)
        .then((res) => {
          console.log(res.data);
          setSubscription(res.data);
        });
    }
    axios
      .get(`${domain}/api/pilot/pilotDetails/${props.match.params.id}`)
      .then((response) => {
        setPilotData(response.data);
        console.log(response);
        if (response.data.name === "CastError") {
          history.push("/no-page-found");
        }
        setRearrangedImages(response.data.rearrangedImages);
        setRearrangedVideos(response.data.rearrangedVideos);
        setRearranged3d(response.data.rearranged3d);
      })
      .catch((err) => {
        console.log(err.response);
        history.push("/no-page-found");
      });
    axios
      .get(`${domain}/api/pilot/getPilotMedia/${props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
        setAllFiles(res.data);
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
    if (localStorage.getItem("access_token")) {
      axios
        .post(`${domain}/api/follow/createFollow/${pilotData._id}`, config)
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
    } else {
      setLoginErrorPopup(true);
    }
  };
  let unfollow = () => {
    axios
      .post(`${domain}/api/follow/removeFollow/${pilotData._id}`, config)
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
    setLoginErrorPopup(false);
  };
  let [viewImages, setViewImages] = useState(false)
  let [hoveredId, setHoveredId] = useState("")
  let mouseMoviedIn = (id) =>{
    setHoveredId(id)
  }
  let [popupImage, setPopupImage] = useState({})
  let [popupType, setPopupType] = useState("")
  let openPopupImageView = (id, type) =>{
    setPopupType(type)
    axios.post(`${domain}/api/image/getPopupImage`, {id}).then(res=>{
      console.log(res)
      setPopupImage(res.data)
    })
    setViewImages(true)
  }
  let viewNextImage = () =>{
    document.getElementById("leftAngle").style.display = "block"
    document.getElementById("rightAngle").style.display = "block"
    axios.post(`${domain}/api/image/getNextPopupImage`, {currentId: popupImage._id, id: popupImage.userId}).then(res=>{
      console.log(res)
      if(res.data !== "Last Image"){
        setPopupImage(res.data)
      }
      else{
        document.getElementById("rightAngle").style.display = "none"
      }
    })
  }
  let viewPreviousImage = () =>{
    document.getElementById("leftAngle").style.display = "block"
    document.getElementById("rightAngle").style.display = "block"
    axios.post(`${domain}/api/image/getPreviousPopupImage`, {currentId: popupImage._id, id: popupImage.userId}).then(res=>{
      console.log(res)
      if(res.data !== "Last Image"){

        setPopupImage(res.data)
      }else{
        document.getElementById("leftAngle").style.display = "none"

      }
    })
  }
  let followMeId = (id) => {
    if (localStorage.getItem("access_token")) {
      axios
        .post(`${domain}/api/pilot/getPilotId`, { userId: id })
        .then((res) => {
          axios
            .post(
              `${domain}/api/follow/createFollow/${res.data[0]._id}`,
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
        });
    } else {
      setLoginErrorPopup(true);
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
  const upHandler = ({ key }) => {
    if(key === "ArrowRight"){
      if(viewImages === true){
        viewNextImage()
      }
    }else if(key === "ArrowLeft"){
      if(viewImages === true){
        viewPreviousImage()
      }
    }
  };
  React.useEffect(() => {
    
    window.addEventListener("keyup", upHandler);

    return () => {

      window.removeEventListener("keyup", upHandler);
    };
  });
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
                {pilotData.coverPic ? (
                  <img
                    src={`${pilotData.coverPic}`}
                    className="avatar_coverPic"
                    onError={() => setPilotData({ ...pilotData, coverPic: "" })}
                    // onError={(event) => event.target.src = 'https://www.tarkettsee.com/media/img/M/THH_25121917_25131917_25126917_25136917_001.jpg'}
                  />
                ) : (
                  <Skeleton
                    height={"310px"}
                    width={"100%"}
                    count={1}
                    style={{ border: "1px solid #cfcfcf" }}
                  />
                )}
              </MuiThemeProvider>
            </div>
            <div id="div2">
              <MuiThemeProvider>
                <div>
                  {pilotData.profilePic ? (
                    <img
                      src={`${pilotData.profilePic}`}
                      className="avatar_profilePic"
                      onError={() =>
                        setPilotData({ ...pilotData, profilePic: "" })
                      }
                    />
                  ) : (
                    <Skeleton
                      height={"100px"}
                      width={"100px"}
                      count={1}
                      style={{
                        borderRadius: "50px",
                        border: "1px solid #cfcfcf",
                      }}
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
                <div
                  className="p_d_name_container"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="p_d_name">
                    {pilotData.name || <Skeleton />}
                  </div>
                  {pilotData.pilotPro && (
                    <img
                      src={ProImg}
                      alt="Pro Img"
                      height="30px"
                      style={{ marginRight: "20px" }}
                    />
                  )}
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
                {localStorage.getItem("role") === "company" && (
                  <button
                    className="p_d_hire_btn p_d_btn  "
                    onClick={clickHire}
                  >
                    <img
                      className="p_d_soc_icon2"
                      src={hireBtnIcon}
                      alt=""
                      height={"20px"}
                    />{" "}
                    Hire me
                  </button>
                )}
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
                <div className="p_d_tab_mobile_container">
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
                    3D
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
                  <div
                    className={
                      category === 6 ? "p_d_tab p_d_tab_selected" : "p_d_tab"
                    }
                    id="pd_reviews_tab"
                    onClick={() => selectCategory(6)}
                  >
                    Followers
                  </div>
                  <div
                    className={
                      category === 7 ? "p_d_tab p_d_tab_selected" : "p_d_tab"
                    }
                    id="pd_reviews_tab"
                    onClick={() => selectCategory(7)}
                  >
                    Following
                  </div>
                </div>
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
                        <div className="p_d_files_container" onMouseOver={()=>mouseMoviedIn(file._id)}>
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
                            <>
                            <div>
                              <i class="fas fa-eye" style={{position:"absolute", right: "10px", top: "5px", fontSize: "20px",backgroundColor: "#eeeeee80", padding: "5px 10px",cursor: "pointer", borderRadius: "50%", display: hoveredId == file._id ? "block" : "none"}} onClick={()=>openPopupImageView(file._id, "all")}></i>
                            <Link to={`/Imageview/${file._id}/${file.userId}`}>
                              
                              <img
                                className="p_d_files"
                                src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${file.file}`}
                                alt=""
                                width={"100%"}
                                height={"250px"}
                              />
                              
                            </Link>
                            </div>
                            </>
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
                    {pilotData.skills
                      ? pilotData.skills.map((skill, index) => {
                          return (
                            <div className="p_d_about_skills_keyword">
                              {skill}
                            </div>
                          );
                        })
                      : ""}
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
                    {pilotData.industry && pilotData.industry.map((industry, index) => {
                      return <>{industry}, </>;
                    })}
                  </div>
                  <div className="p_d_about_details_title">Drones</div>
                  <div className="p_d_about_details_content">
                    {pilotData.droneType && pilotData.droneType.length !== 0
                      ? pilotData.droneType.map((item, index) => {
                          return <>{item}, </>;
                        })
                      : ""}
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
                              style = {{borderRadius: "50px"}}
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
          {/* <OwlCarousel id = "next_prev_shoot_carousel" className="owl-theme" loop margin={10} nav dots = {false} height = "500px" startPosition={2} items = {1}>
          {files.map((file, index) => {
                    return (
                        <div className="item"  style = {{height: "550px"}}>
                          {file.fileType === "video" ? (
                            <>
                              <video
                                src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${file.file}`}
                                alt=""
                                style = {{maxHeight: "550px"}}
                              />
                              <img
                                src={videoIcon}
                                alt=""
                                className="p_d_files_video_icon"
                                style={{ top: "calc(50% - 30px)" }}
                              />
                            </>
                          ) : (
                              <img
                                src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${file.file}`}
                                alt=""
                                style = {{objectFit: "contain", width: "100%", height: "100%", margin: "auto", verticalAlign: "middle"}}

                              />
                          )}
                        </div>
                    );
                  })}
          </OwlCarousel> */}
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

                  <div
                    className="h_p_start_process_form_btn_container"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      onClick={submitProcess}
                      className="h_p_start_process_form_btn"
                      id="btn1"
                    >
                      Send Mail
                    </button>
                  </div>
                  <div id="alertBox" style={{ display: "none" }}>
                    <Alert severity="success" style={{ marginTop: "20px" }}>
                      Mail Sent Successfully
                    </Alert>
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
          <Dialog
            open={upgradePopup}
            onClose={() => setUpgradePopup(false)}
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
                  onClick={() => setUpgradePopup(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Row style={{ marginTop: "30px" }}>
                <div className="u_f_popup_title">
                  You exceeded your limit. Upgrade to comtinue.
                </div>
                <div className="u_f_popup_btn_container">
                  <button
                    className="u_f_popup_btn1"
                    onClick={() => setUpgradePopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="u_f_popup_btn2"
                    onClick={() => history.push("/HireSubscription")}
                  >
                    Upgrade
                  </button>
                </div>
              </Row>
            </DialogContent>
          </Dialog>
          <Dialog
            open={limitExceededPopup}
            onClose={() => setLimitExceededPopup(false)}
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
                      onClick={()=>setLimitExceededPopup(false)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title">
                      You exceeded your limit.
                    </div>
                    <div className="u_f_popup_btn_container">
                      <button
                        className="u_f_popup_btn1"
                        onClick={()=>setLimitExceededPopup(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Row>
                </DialogContent>
              </Dialog>
              <Dialog
                open={viewImages}
                onClose={()=>setViewImages(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth={true}
                PaperProps={{
                  style: {
                    maxWidth: "80%",
                    borderRadius: "10px",
                  },
                }}
              >
                <DialogContent
                  className={All.PopupBody}
                >
                  
                  <i class="fas fa-angle-right" style={{ position: "absolute", top: "calc(50% - 20px)", right: "20px", fontSize: "40px", zIndex:"1000", cursor: "pointer"}} onClick={viewNextImage} id="rightAngle"></i>
                  <i class="fas fa-angle-left" style={{ position: "absolute", top: "calc(50% - 20px)", left: "20px", fontSize: "40px", cursor: "pointer"}} onClick={viewPreviousImage} id="leftAngle"></i>
                  
                  <div
                    style={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <img
                      src={Close}
                      alt=""
                      onClick={()=>setViewImages(false)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <Row>
                    <Col xl={6}>
                      <img src={`https://dn-nexevo-landing.s3.ap-south-1.amazonaws.com/${popupImage.file}`} style={{width: "100%", height:"350px", objectFit: "cover"}} />
                    </Col>
                    <Col xl={6}>
                      <div style={{margin: "60px 0px"}}>
                        {
                          popupImage.postName ?  
                          <>
                          <div className="p_d_modal_title">Post Name</div>
                          <div className="p_d_modal_detail">{popupImage.postName.slice(0,60)}...</div><div className="p_d_modal_title">Experience</div>
                          <div className="p_d_modal_detail">{popupImage.experience.slice(0,50)}...</div><div className="p_d_modal_title">Industry</div>
                          <div className="p_d_modal_detail">{popupImage.category}</div>
                       
                        </> : ""
                        }
                      </div>
                    </Col>
                  </Row>
                </DialogContent>
              </Dialog>
        </Container>
      </section>
      
    </>
  )
}
