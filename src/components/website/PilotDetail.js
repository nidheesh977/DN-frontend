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
import ProfileImg from "../ProfileImg/Profile";
import CoverImg from "../ProfileCoverImg/ProfileCoverImg";
import Close from "../images/close.svg";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import whatsapp_icon from "../images/whatsapp_icon.png";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import s_c_form_img from "../images/s_c_form_img.png";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import '../css/PilotDetail.css'
import addIcon from '../images/add.png'
import hireBtnIcon from '../images/hirebtn.svg'
import productLike from '../images/product_like.png'
import viewIcon from '../images/viewIcon.svg'
import userIcon from '../images/userIcon.svg'
import moreIcon from '../images/moreIcon.svg'
import messageIcon from '../images/messageIcon.svg'
import hirePilotIcon from '../images/hirePilotIcon.svg'
import downloadIcon from '../images/downloadIcon.svg'
import videoIcon from '../images/video-icon.svg'

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

  useEffect(() => {
    console.log(props.match.params.id)
  }, [])

  const [service_center, setServiceCenter] = useState({ id: "1", name: "Nexevo Technologies1", bio: "Nexevo Technologies is a professional drone service center1", workingHours: "9.30AM to 7.00PM", location: "Kasthui Nagar, Bangalore.", rating: 1, phone: "+91 9876543210, +91 9876543210", brands: ["DJI", "UVify", "Hubsan", "Parrot", "Autel Robotics"], whatsapp_number: "917305055356", address: "#2, HM-155, 1st Floor, 2nd H Main, Opp. Cuppa cafe, East of NGEF, Kasthuri Nagar, Bangalore - 560043", email: "shopname@gmail.com", website: "www.domain.com", photos: ["https://www.bayleafdigital.com/wp-content/uploads/2018/11/5-reasons-demo-software.jpg", "https://www.bayleafdigital.com/wp-content/uploads/2018/11/5-reasons-demo-software.jpg", "https://www.bayleafdigital.com/wp-content/uploads/2018/11/5-reasons-demo-software.jpg", "https://www.bayleafdigital.com/wp-content/uploads/2018/11/5-reasons-demo-software.jpg", "https://www.bayleafdigital.com/wp-content/uploads/2018/11/5-reasons-demo-software.jpg", "https://www.bayleafdigital.com/wp-content/uploads/2018/11/5-reasons-demo-software.jpg"] });

  const [service_center_review, setServiceCenterReview] = useState([{ id: "1", img: "https://cdn-icons-png.flaticon.com/512/149/149071.png", name: "Stephen Raj", rating: 5, description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iste, praesentium ex vitae debitis quidem rem corrupti odio deserunt, aut facere fuga pariatur ducimus id laboriosam aliquid neque libero eveniet soluta, numquam quod.", likes: 10 }, { id: "1", img: "https://cdn-icons-png.flaticon.com/512/149/149071.png", name: "Stephen Raj", rating: 4, description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iste, praesentium ex vitae debitis quidem rem corrupti odio deserunt, aut facere fuga pariatur ducimus id laboriosam aliquid neque libero eveniet soluta, numquam quod.", likes: 10 }, { id: "1", img: "https://cdn-icons-png.flaticon.com/512/149/149071.png", name: "Stephen Raj", rating: 3, description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iste, praesentium ex vitae debitis quidem rem corrupti odio deserunt, aut facere fuga pariatur ducimus id laboriosam aliquid neque libero eveniet soluta, numquam quod.", likes: 10 }, { id: "1", img: "https://cdn-icons-png.flaticon.com/512/149/149071.png", name: "Stephen Raj", rating: 2, description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iste, praesentium ex vitae debitis quidem rem corrupti odio deserunt, aut facere fuga pariatur ducimus id laboriosam aliquid neque libero eveniet soluta, numquam quod.", likes: 10 }, { id: "1", img: "https://cdn-icons-png.flaticon.com/512/149/149071.png", name: "Stephen Raj", rating: 1, description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iste, praesentium ex vitae debitis quidem rem corrupti odio deserunt, aut facere fuga pariatur ducimus id laboriosam aliquid neque libero eveniet soluta, numquam quod.", likes: 10 }])

  const [writeReview, setWriteReview] = useState(false)

  const [newReview, setNewReview] = useState('')

  const [newRating, setNewRating] = useState(3)

  const [enquiry, setEnquiry] = useState(false)

  const [rating, setRating] = useState(false)

  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const [category, setCategory] = useState(1)

  const [files, setFiles] = useState([1, 2, 3, 4, 5, 6, 7, 8])

  const [skills, setSkills] = useState(["Ariel View", "UAV", "Aviation", "Drone", "Forest", "Road", "Eagle view", "Top view", "Forest", "Ariel View", "UAV", "Drone", "Forest", "Road", "Aviation", "Drone", "Forest", "Road", "Eagle view", "Top view", "Forest", "Drone", "Forest", "Road", "Ariel View", "UAV", "Aviation", "Drone", "Forest", "Road", "Eagle view", "Top view", "Forest"])

  const [viewMessage, setViewMessage] = useState(false)

  const messages = [1, 2, 3, 4, 5, 6]
  const follows = [1, 2, 3, 4, 5, 6]

  const enquireNow = () => {
    setEnquiry(true)
  }

  const whatsappChat = (whatsapp_number) => {
    window.open("https://wa.me/" + whatsapp_number + "?text=Hello", "_blank")
  }

  const closeEnquiry = () => {
    setEnquiry(false)
  }

  const submitReview = () => {
    if (newReview != "") {
      setRating(true)
    }
    else {
      setError(true)
      setErrorMsg("Review is required")
    }
  }

  const closeRating = () => {
    setRating(false)
  }

  const changeReviewHandler = (e) => {
    setNewReview(e.target.value)
  }

  const handleErrorClose = () => {
    setErrorMsg("")
    setError(false)
  }

  const selectCategory = (new_category) => {
    setCategory(new_category)
  }

  const selectCategoryDropdown = (e) => {
    setCategory(Number(e.target.value))
  }

  const showFileDetails = (id) => {
    document.getElementById("p_d_file_details_" + id).style.visibility = "visible"
  }

  const hideFileDetails = (id) => {
    document.getElementById("p_d_file_details_" + id).style.visibility = "hidden"
  }

  const openMessage = () => {
    setViewMessage(true)
  }

  const closeMessage = () => {
    setViewMessage(false)
  }

  return (
    <>
      <Helmet>
        <title>Pilot details</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>

      <section className={` ${All.Profile} ${All.EndUserProfile} s_c_d_container`}>
        {viewMessage &&
          <div className="p_d_message_container">
            <div className="p_d_message_user_details">
              <div className="p_d_message_user_image_container">
                <img src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png" alt="" className="p_d_message_user_image" />
              </div>
              <div className="p_d_message_user_title">Messaging</div>
              <div className="p_d_message_close_container">
                <img src={Close} alt="" className="p_d_message_close" height={"15px"} onClick={closeMessage} />
              </div>
            </div>
            <div className="p_d_message_input_container">
              <input type="text" className="p_d_message_search" placeholder="Search keywords"/>
            </div>
            {messages.map((message, index) => {
              return (
                <div className="p_d_message_recieve_container">
                  <div className="p_d_message_sender_img_container">
                    <img src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png" alt="" className="p_d_message_sender_img" />
                  </div>
                  <div className="p_d_message_content_container">
                    <div style={{ width: "240px", paddingRight: "10px", paddingLeft: "15px" }}>
                      <div className="p_d_message_sender_name">John Doe</div>
                      <div className="p_d_message_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                    </div>
                    <div className="p_d_message_time">Jan 27</div>
                  </div>
                </div>
              )
            })}
          </div>
        }
        <Container className={All.Container}>
          {
            error && <Snackbar open={error} autoHideDuration={3000} onClose={handleErrorClose}><Alert variant="filled" onClose={handleErrorClose} severity="error">{errorMsg}</Alert></Snackbar>
          }
          <Row>
            <Col
              md={6}
              className={`${All.Order_xs_2} ${All.Order_sm_2} ${All.pr_xs_30} ${All.pl_xs_30} ${All.profileImg}`}
            >
              <Box
                py={1}
                display="flex"
                className={`${All.D_Block_sm} ${All.D_Block_xs}`}
              >
                <Box pr={5}>
                  <ProfileImg />
                </Box>
              </Box>

              <Box py={1}>
                <div className="p_d_name_container">
                  <div className="p_d_name">{"Stephen Raj" || <Skeleton />}</div>
                  <span className="s_c_rating">
                    <span className='star_checked'>&#9733;</span>
                    <span className='star_checked'>&#9733;</span>
                    <span className='star_checked'>&#9733;</span>
                    <span className='star_unchecked'>&#9733;</span>
                    <span className='star_unchecked'>&#9733;</span>
                  </span>
                </div>
              </Box>
              <Box py={1}>
                <div className="p_d_profession">
                  Professional Pilot
                </div>
              </Box>

              <div className='p_d_location'>
                Bangalore, India
              </div>

              {/* <div className="p_d_description">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, possimus quia. Nostrum explicabo mollitia velit saepe quasi totam cum neque. Ea natus voluptatem ipsa id qui odio, ipsam sit est.
              </div> */}

              <div className="p_d_btn_container">
                <button className="p_d_follow_btn p_d_btn    "><img className="p_d_soc_icon1" src={addIcon} alt="" height={"20px"} /> Follow me</button>
                <button className="p_d_hire_btn p_d_btn  "><img className="p_d_soc_icon2" src={hireBtnIcon} alt="" height={"20px"} /> Hire me</button>
                <button className="p_d_message_btn p_d_btn " onClick={openMessage}><img className="p_d_soc_icon3" src={messageIcon} alt="" height={"20px"} /> Message</button>
                <button className="p_d_more_btn p_d_btn ">
                  <img src={moreIcon} alt="" style={{ marginBottom: "5px" }} />
                </button>
              </div>
            </Col>
            <Col
              md={6}
              className={`${All.Order_xs_1} ${All.Order_sm_1}  ${All.coverImg} ${All.pr_xs_30} ${All.pl_xs_30}`}
            >
              <CoverImg />
            </Col>
          </Row>
          <div className="p_d_tabs">
            <div className="p_d_tabs_left" style={{ display: "inline-block" }}>
              <Visible xxl xl lg>
                <div className={category === 1 ? "p_d_tab p_d_tab_selected" : "p_d_tab"} id="s_c_d_about_tab" onClick={() => selectCategory(1)}>All</div>
                <div className={category === 2 ? "p_d_tab p_d_tab_selected" : "p_d_tab"} id="pd_brands_tab" onClick={() => selectCategory(2)}>Images</div>
                <div className={category === 3 ? "p_d_tab p_d_tab_selected" : "p_d_tab"} id="pd_reviews_tab" onClick={() => selectCategory(3)}>Videos</div>
                <div className={category === 4 ? "p_d_tab p_d_tab_selected" : "p_d_tab"} id="pd_reviews_tab" onClick={() => selectCategory(4)}>3D Models</div>
                <div className={category === 5 ? "p_d_tab p_d_tab_selected" : "p_d_tab"} id="pd_reviews_tab" onClick={() => selectCategory(5)}>About</div>
              </Visible>
              <Visible md sm xs>
                <div className="p_d_tab_filter_title">Select Tab : </div>
                <select className="p_d_tab_filter" onChange={selectCategoryDropdown}>
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
                <div className="p_d_tab" className={category === 6 ? "p_d_tab p_d_tab_selected" : "p_d_tab"} id="p_d_followers_tab" onClick={() => selectCategory(6)}>Followers</div>
                <div className="p_d_tab" className={category === 7 ? "p_d_tab p_d_tab_selected" : "p_d_tab"} id="p_d_following_tab" onClick={() => selectCategory(7)}>Following</div>
              </div>
            </Visible>
          </div>
          <hr style={{ border: "1px solid #eee" }} />
          {category === 1 &&
            <Row gutterWidth={10}>
              {files.map((id, index) => {
                return (
                  <Col xxl={3} xl={3} lg={4} md={6} sm={6} xs={12}>
                    <div className="p_d_files_container" onMouseOver={() => showFileDetails(id)} onMouseLeave={() => hideFileDetails(id)}>
                      <img className="p_d_files" src="https://149355317.v2.pressablecdn.com/wp-content/uploads/2019/04/Drone-Photography-UAV-Coach.jpg" alt="" width={"100%"} height={"250px"} />
                      {id % 3 === 0 ? <img src={videoIcon} alt="" className="p_d_files_video_icon" /> : ""}
                      <div className="p_d_file_details_container" id={"p_d_file_details_" + id}>
                        <div className="p_d_file_user_name"><img src={userIcon} alt="" className="p_d_files_icon" style={{ marginRight: "6px" }} /> Yasar Arfath</div>
                        <div className="p_d_file_other_details">
                          <div className="p_d_file_views"><img src={viewIcon} alt="" className="p_d_files_icon" height={'10px'} style={{ marginTop: "4px" }} /> 5k</div>
                          <div className="p_d_file_downloads"><img src={downloadIcon} alt="" /> 2k</div>
                          <div className="p_d_file_likes"><img src={productLike} alt="" height="15px" /> 1k</div>
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              })}
            </Row>
          }
          {category === 2 &&
            <Row gutterWidth={10}>
              {files.map((id, index) => {
                return (
                  <Col xxl={3} xl={3} lg={4} md={6} sm={6} xs={12}>
                    <div className="p_d_files_container" onMouseOver={() => showFileDetails(id)} onMouseLeave={() => hideFileDetails(id)}>
                      <img className="p_d_files" src="https://149355317.v2.pressablecdn.com/wp-content/uploads/2019/04/Drone-Photography-UAV-Coach.jpg" alt="" width={"100%"} height={"250px"} />
                      <div className="p_d_file_details_container" id={"p_d_file_details_" + id}>
                        <div className="p_d_file_user_name"><img src={userIcon} alt="" className="p_d_files_icon" style={{ marginRight: "6px" }} /> Yasar Arfath</div>
                        <div className="p_d_file_other_details">
                          <div className="p_d_file_views"><img src={viewIcon} alt="" className="p_d_files_icon" height={'10px'} style={{ marginTop: "4px" }} /> 5k</div>
                          <div className="p_d_file_downloads"><img src={downloadIcon} alt="" /> 2k</div>
                          <div className="p_d_file_likes"><img src={productLike} alt="" height="15px" /> 1k</div>
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              })}
            </Row>
          }
          {category === 3 &&
            <Row gutterWidth={10}>
              {files.map((id, index) => {
                return (
                  <Col xxl={3} xl={3} lg={4} md={6} sm={6} xs={12}>
                    <div className="p_d_files_container" onMouseOver={() => showFileDetails(id)} onMouseLeave={() => hideFileDetails(id)}>
                      <img className="p_d_files" src="https://149355317.v2.pressablecdn.com/wp-content/uploads/2019/04/Drone-Photography-UAV-Coach.jpg" alt="" width={"100%"} height={"250px"} />
                      <img src={videoIcon} alt="" className="p_d_files_video_icon" />
                      <div className="p_d_file_details_container" id={"p_d_file_details_" + id}>
                        <div className="p_d_file_user_name"><img src={userIcon} alt="" className="p_d_files_icon" style={{ marginRight: "6px" }} /> Yasar Arfath</div>
                        <div className="p_d_file_other_details">
                          <div className="p_d_file_views"><img src={viewIcon} alt="" className="p_d_files_icon" height={'10px'} style={{ marginTop: "4px" }} /> 5k</div>
                          <div className="p_d_file_downloads"><img src={downloadIcon} alt="" /> 2k</div>
                          <div className="p_d_file_likes"><img src={productLike} alt="" height="15px" /> 1k</div>
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              })}
            </Row>
          }
          {category === 4 &&
            <Row gutterWidth={10}>
              {files.map((id, index) => {
                return (
                  <Col xxl={3} xl={3} lg={4} md={6} sm={6} xs={12}>
                    <div className="p_d_files_container" onMouseOver={() => showFileDetails(id)} onMouseLeave={() => hideFileDetails(id)}>
                      <img className="p_d_files" src="https://149355317.v2.pressablecdn.com/wp-content/uploads/2019/04/Drone-Photography-UAV-Coach.jpg" alt="" width={"100%"} height={"250px"} />
                      <div className="p_d_file_details_container" id={"p_d_file_details_" + id}>
                        <div className="p_d_file_user_name"><img src={userIcon} alt="" className="p_d_files_icon" style={{ marginRight: "6px" }} /> Yasar Arfath</div>
                        <div className="p_d_file_other_details">
                          <div className="p_d_file_views"><img src={viewIcon} alt="" className="p_d_files_icon" height={'10px'} style={{ marginTop: "4px" }} /> 5k</div>
                          <div className="p_d_file_downloads"><img src={downloadIcon} alt="" /> 2k</div>
                          <div className="p_d_file_likes"><img src={productLike} alt="" height="15px" /> 1k</div>
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              })}
            </Row>
          }

          {category === 5 &&
            <Row>
              <Col xl={7} lg={7} md={6} sm={12}>
                <div className="p_d_about_name_container">
                  <div className="p_d_about_title">
                    Name:
                  </div>
                  <div className="p_d_about_name">
                    Stephen Raj
                  </div>
                </div>

                <div className="p_d_about_description_container">
                  <div className="p_d_about_title">
                    Description
                  </div>
                  <div className="p_d_about_content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, in ipsa. Soluta non veritatis aliquam ducimus ipsum accusantium possimus earum officiis nesciunt eos? Obcaecati dolorem id architecto, totam provident suscipit repudiandae error, perferendis doloribus iste magni culpa velit et aspernatur ipsam nobis hic sint quisquam, cupiditate fugiat temporibus! Pariatur fugiat animi, ex repellat ratione nobis nemo maxime modi ipsa voluptas. Rem exercitationem possimus aliquid distinctio. Officiis quas reprehenderit quaerat minima voluptatem distinctio, cum culpa quos hic reiciendis provident praesentium iusto! Aperiam voluptatem magnam aliquam sunt totam nisi repellat ab! Quibusdam, repellat earum minus laboriosam possimus iure ullam, corporis aliquam fuga minima, dolorum quaerat voluptate eius asperiores dignissimos.
                  </div>
                </div>

                <div className="p_d_about_skills_container">
                  <div className="p_d_about_title">
                    Skills:
                  </div>
                  <div className="p_d_about_skills_keyword_container">
                    {skills.map((skill, index) => {
                      return (
                        <div className="p_d_about_skills_keyword">{skill}</div>
                      )
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
                  <div className="p_d_about_details_content">Passionate Pilot</div>
                  <div className="p_d_about_details_title">DOB</div>
                  <div className="p_d_about_details_content">14 July, 2021</div>
                  <div className="p_d_about_details_title">Gender</div>
                  <div className="p_d_about_details_content">Male</div>
                  <div className="p_d_about_details_title">Work type</div>
                  <div className="p_d_about_details_content">Full time</div>
                  <div className="p_d_about_details_title">Monthly payment ($)</div>
                  <div className="p_d_about_details_content">10 - 50</div>
                  <div className="p_d_about_details_title">Industry</div>
                  <div className="p_d_about_details_content">Agriculture</div>
                  <div className="p_d_about_details_title">Training center name</div>
                  <div className="p_d_about_details_content">Nexevo technologies</div>
                  <div className="p_d_about_details_title">Coaching year</div>
                  <div className="p_d_about_details_content">2018 - 2020</div>
                </div>
                <div className="p_d_hire_container">
                  <div className="p_d_hire_content">If you want to hire this pilot, Click the below button</div>
                  <button className="p_d_about_hire_btn"><img src={hirePilotIcon} alt="" height={"20px"} style={{ paddingTop: "2px", marginRight: "10px" }} /> Hire Pilot</button>
                </div>
              </Col>
            </Row>
          }

          {category === 6 &&
            <div className="p_d_followers_container">
              {follows.map((follow, index) => {
                return (
                  <>
                    <Visible xxl xl lg>
                      <Container style={{ width: "80%" }}>
                        <div className="p_d_follower_details_container">
                          <div className="p_d_followers_img_container">
                            <img src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png" alt="" height={"150px"} width={"150px"} style={{ borderRadius: "75px" }} />
                          </div>
                          <div className="p_d_followers_other_details_xxl">
                            <div className="p_d_followers_name_username">
                              <div className="p_d_followers_name">Yasar Arafath</div>
                              <div className="p_d_followers_username" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>User_Name_Yasar_Arafath</div>
                            </div>
                            <div className="p_d_followers_btn_container">
                              <button className="p_d_followers_follow_btn p_d_followers_follow_btn_xxl">Follow</button>
                            </div>
                          </div>

                        </div>
                        <hr style={{ border: "1px solid rgba(112, 112, 112, 0.2)" }} />
                      </Container>
                    </Visible>
                    <Visible md sm xs>
                      <Container>
                        <div className="p_d_follower_details_container">
                          <div className="p_d_followers_img_container">
                            <img src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png" alt="" height={"100px"} width={"100px"} style={{ borderRadius: "50px" }} />
                          </div>
                          <div className="p_d_followers_other_details_md">
                            <div className="p_d_followers_name">Yasar Arafath</div>
                            <div className="p_d_followers_username">User_Name_Yasar_Arafath</div>
                            <div className="p_d_followers_btn_container">
                              <button className="p_d_followers_follow_btn">Follow</button>
                            </div>
                          </div>
                        </div>
                        <hr style={{ border: "1px solid rgba(112, 112, 112, 0.2)" }} />
                      </Container>
                    </Visible>
                  </>
                )
              })}
            </div>
          }

          {category === 7 &&
            <div className="p_d_followers_container">
              {follows.map((follow, index) => {
                return (
                  <>
                    <Visible xxl xl lg>
                      <Container style={{ width: "80%" }}>
                        <div className="p_d_follower_details_container">
                          <div className="p_d_followers_img_container">
                            <img src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png" alt="" height={"150px"} width={"150px"} style={{ borderRadius: "75px" }} />
                          </div>
                          <div className="p_d_followers_other_details_xxl">
                            <div className="p_d_followers_name_username">
                              <div className="p_d_followers_name">Yasar Arafath</div>
                              <div className="p_d_followers_username" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>User_Name_Yasar_Arafath</div>
                            </div>
                            <div className="p_d_followers_btn_container">
                              <button className="p_d_followers_follow_btn p_d_followers_follow_btn_xxl">Unfollow</button>
                            </div>
                          </div>

                        </div>
                        <hr style={{ border: "1px solid rgba(112, 112, 112, 0.2)" }} />
                      </Container>
                    </Visible>
                    <Visible md sm xs>
                      <Container>
                        <div className="p_d_follower_details_container">
                          <div className="p_d_followers_img_container">
                            <img src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png" alt="" height={"100px"} width={"100px"} />
                          </div>
                          <div className="p_d_followers_other_details_md">
                            <div className="p_d_followers_name">Yasar Arafath</div>
                            <div className="p_d_followers_username">User_Name_Yasar_Arafath</div>
                            <div className="p_d_followers_btn_container">
                              <button className="p_d_followers_follow_btn">Unfollow</button>
                            </div>
                          </div>
                        </div>
                        <hr style={{ border: "1px solid rgba(112, 112, 112, 0.2)" }} />
                      </Container>
                    </Visible>
                  </>
                )
              })}
            </div>
          }
        </Container>
      </section>
    </>
  )
}
