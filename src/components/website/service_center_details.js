import React from "react";
import { Helmet } from "react-helmet";
import All from "../website/All.module.css";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Hirebtn from "../images/hirebtn.svg";
import TabModel from "../tabs/TabModel";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import ProfileImg from "../ProfileImg/Profile";
import CoverImg from "../ProfileCoverImg/ProfileCoverImg";
import Close from "../images/close.svg";
import Loader from "../Loader/loader";

import FollowBtn from "../tabs/FollowBtn";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { userService } from "../_services/user.service";
import { Link } from "react-router-dom";
import "../css/service_center_details.css";
import whatsapp_icon from "../images/whatsapp_icon.png";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import s_c_form_img from "../images/s_c_form_img.png";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useParams, useHistory } from "react-router-dom";
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import BookmarkFilled from "../images/bookmarkFilled.png"
import Bookmark from "../images/bookmark.png"
import {
  ScrollingProvider,
  useScrollSection,
  Section,
} from "react-scroll-section";

import $ from "jquery";
import { Item } from "semantic-ui-react";

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

const domain = process.env.REACT_APP_MY_API

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

export default function ServiceCenterDetails(props) {
  const history = useHistory()
  const [service_center, setServiceCenter] = useState({
    id: "1",
    name: "Nexevo Technologies1",
    bio: "Nexevo Technologies is a professional drone service center1",
    workingHours: "9.30AM to 7.00PM",
    location: "Kasthui Nagar, Bangalore.",
    rating: 1,
    phone: "+91 9876543210, +91 9876543210",
    brands: ["DJI", "UVify", "Hubsan", "Parrot", "Autel Robotics"],
    whatsapp_number: "917305055356",
    address:
      "#2, HM-155, 1st Floor, 2nd H Main, Opp. Cuppa cafe, East of NGEF, Kasthuri Nagar, Bangalore - 560043",
    email: "shopname@gmail.com",
    website: "www.domain.com",
    photos: [
      "https://www.bayleafdigital.com/wp-content/uploads/2018/11/5-reasons-demo-software.jpg",
      "https://www.bayleafdigital.com/wp-content/uploads/2018/11/5-reasons-demo-software.jpg",
      "https://www.bayleafdigital.com/wp-content/uploads/2018/11/5-reasons-demo-software.jpg",
      "https://www.bayleafdigital.com/wp-content/uploads/2018/11/5-reasons-demo-software.jpg",
      "https://www.bayleafdigital.com/wp-content/uploads/2018/11/5-reasons-demo-software.jpg",
      "https://www.bayleafdigital.com/wp-content/uploads/2018/11/5-reasons-demo-software.jpg",
    ],
  });

  const [service_center_review, setServiceCenterReview] = useState([
    {
      id: "1",
      img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      name: "Stephen Raj",
      rating: 5,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iste, praesentium ex vitae debitis quidem rem corrupti odio deserunt, aut facere fuga pariatur ducimus id laboriosam aliquid neque libero eveniet soluta, numquam quod.",
      likes: 10,
    },
    {
      id: "1",
      img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      name: "Stephen Raj",
      rating: 4,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iste, praesentium ex vitae debitis quidem rem corrupti odio deserunt, aut facere fuga pariatur ducimus id laboriosam aliquid neque libero eveniet soluta, numquam quod.",
      likes: 10,
    },
    {
      id: "1",
      img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      name: "Stephen Raj",
      rating: 3,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iste, praesentium ex vitae debitis quidem rem corrupti odio deserunt, aut facere fuga pariatur ducimus id laboriosam aliquid neque libero eveniet soluta, numquam quod.",
      likes: 10,
    },
    {
      id: "1",
      img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      name: "Stephen Raj",
      rating: 2,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iste, praesentium ex vitae debitis quidem rem corrupti odio deserunt, aut facere fuga pariatur ducimus id laboriosam aliquid neque libero eveniet soluta, numquam quod.",
      likes: 10,
    },
    {
      id: "1",
      img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      name: "Stephen Raj",
      rating: 1,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iste, praesentium ex vitae debitis quidem rem corrupti odio deserunt, aut facere fuga pariatur ducimus id laboriosam aliquid neque libero eveniet soluta, numquam quod.",
      likes: 10,
    },
  ]);
  const [isLoading, setLoading] = useState(false);

  const [writeReview, setWriteReview] = useState(false);

  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(3);

  const [enquiry, setEnquiry] = useState(false);
  const [enquiry_data, setEnquiryData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  let [loginErrorPopup, setloginErrorPopup] = useState(false);

  const loginErrorPopupClose = () =>{
    setloginErrorPopup(false)
  }
  const submitData = () => {
    axios
      .post(
        `${domain}/api/review/writeReview/${param.id}`,
        {
          review: newReview,
          rating: newRating,
        },
        config
      )
      .then(() => {
        alert("successfull");
        setWriteReview(false)
        axios
          .get(`${domain}/api/review/getReviews/${param.id}`)
          .then((response) => {
            // setData({response})
            // setDetails(response.data);
            // setStatus(response.status);
            setReviews(response.data);
            document.getElementById("toHide").style.display = "none"
            console.log(response);
            // setBrands(response.data.brandOfDrones)
          });
      })
      .catch((err) => {
        console.log(err);
      });

    closeRating();
  };
let [centers, setCenters] = useState([])
let [myData, setMyData] = useState({
  name: "",
  phoneNo: "",
  emailId: "",
})
let [message, setMessage] = useState("")
useEffect(()=>{
  axios.get(`${domain}/api/user/getUserData`, config).then(res=>{
    console.log(res)
    setCenters(res.data.markedCenters)
    setMyData({
      name: res.data.name,
      phoneNo: res.data.phoneNo,
      emailId: res.data.email
    })
  })
}, [])


  const likeReview = (id) => {
    if(!localStorage.getItem("access_token")){
      setloginErrorPopup(true)
    }else{
      axios
      .post(
        `${domain}/api/review/likeReview`,
        {
          reviewId: id,
        },
        config
      )
      .then((response) => {
        console.log(response)
        axios
        .get(`${domain}/api/review/getReviews/${param.id}`)
        .then((response) => {
        
          setReviews(response.data);
          axios
          .post(`${domain}/api/pilot/getSinglePilot`, config)
          .then((response) => {
        
    setLikedReviews(response.data.likedReviews);
    
            console.log(response);
            // setBrands(response.data.brandOfDrones)
          });
          

     
        });
       
      })
      .catch((err) => {
        console.log(err);
      });
    }
   
  };
  
  const unlikeReview = (id) => {
    axios
      .post(
        `${domain}/api/review/unlikeReview`,
        {
          reviewId: id,
        },
        config
      )
      .then((response) => {
        console.log(response)
        axios
        .get(`${domain}/api/review/getReviews/${param.id}`)
        .then((response) => {
        
          setReviews(response.data);
          axios
          .post(`${domain}/api/pilot/getSinglePilot`, config)
          .then((response) => {
        
    setLikedReviews(response.data.likedReviews);
    
            console.log(response);
            // setBrands(response.data.brandOfDrones)
          });
          

     
        });
       
      })
      .catch((err) => {
        console.log(err);
      });
  };


let bookmark = () =>{
  if(localStorage.getItem("access_token")){
    axios.post(`${domain}/api/center/saveCenter/${param.id}`, config).then(res=>{
      console.log(res)
      axios.get(`${domain}/api/user/getUserData`, config).then(res=>{
        console.log(res)
        setCenters(res.data.markedCenters)
      })
    })
  }else{
    setloginErrorPopup(true)
  }
 
}

let unbookmark  = () =>{
  axios.post(`${domain}/api/center/unsaveCenter/${param.id}`, config).then(res=>{
    console.log(res)
    axios.get(`${domain}/api/user/getUserData`, config).then(res=>{
      console.log(res)
      setCenters(res.data.markedCenters)
    })
  })
}

let enquiryChange = (e) =>{
  setMyData({
    ...myData,
    [e.target.name]: e.target.value
  })
  console.log(myData)
}

let changeMessage = (e) =>{
 
setMessage(e.target.value);

}

let captureEnquiry = () =>{
  setLoading(true)
  axios.post(`${domain}/api/enquiry/createEnquiry/${param.id}`, {emailId: myData.emailId, phoneNo: myData.phoneNo, name: myData.name, message: message}, config).then(res=>{
    console.log(res)
    setMessage("")
    setEnquiry(false)
    setLoading(false)

  }).catch(err=>{
    console.log(err)
  })
  console.log(myData, message)
}


  const [rating, setRating] = useState(false);

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [likedReviews, setLikedReviews] = useState([])
  const enquireNow = () => {
    if(localStorage.getItem("access_token")){
      setEnquiry(true);
    }
    else{
      setloginErrorPopup(true)
    }
  };

  const whatsappChat = (whatsapp_number) => {
    window.open("https://wa.me/" + whatsapp_number + "?text=Hello", "_blank");
  };

  const closeEnquiry = () => {
    setEnquiry(false);
  };

  const submitReview = () => {
    if(localStorage.getItem("access_token")){
      if (newReview != "") {
        setRating(true);
      } else {
        document.getElementById("s_c_d_review").focus();
        document.getElementById("s_c_d_review").style.backgroundColor =
          "rgb(255, 219, 219)";
      }
    }else{
        setloginErrorPopup(true)
      }
    
    
  };

  const closeRating = () => {
    setRating(false);
  };
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  const selectTab = (tab_id, container_id) => {
    document
      .getElementById("s_c_d_about_tab")
      .classList.remove("s_c_d_tab_selected");
    document
      .getElementById("s_c_d_brands_tab")
      .classList.remove("s_c_d_tab_selected");
    document
      .getElementById("s_c_d_reviews_tab")
      .classList.remove("s_c_d_tab_selected");
    document.getElementById(tab_id).classList.add("s_c_d_tab_selected");
    $("html, body").animate(
      {
        scrollTop: $("#" + container_id).offset().top - 100,
      },
      1000
    );
  };

  const changeReviewHandler = (e) => {
    setNewReview(e.target.value);
    document.getElementById("s_c_d_review").style.backgroundColor = "white";
  };

  const handleErrorClose = () => {
    setErrorMsg("");
    setError(false);
  };

  $("div.top").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("div.middle").offset().top,
      },
      1000
    );
  });

  const submitEnquiry = () => {
    console.log("Submit");
  };
  //yaseen
  let param = useParams();
  let [details, setDetails] = useState({});
  let [brands, setBrands] = useState([]);
  let [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${domain}/api/center/centerLanding/${param.id}`)
      .then((response) => {
        // setData({response})
        setDetails(response.data);
        // setStatus(response.status);

        console.log(response.status);
        setBrands(response.data.brandOfDrones);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${domain}/api/review/getReviews/${param.id}`)
      .then((response) => {
        // setData({response})
        // setDetails(response.data);
        // setStatus(response.status);
        // setReviews(response.data);
        console.log(response.data)

        console.log(response);
        setReviews(response.data);
        if(response.data.length == 0 ){
document.getElementById("toHide").style.display = "block"        }

        // setBrands(response.data.brandOfDrones)
      });
  }, []);
  useEffect(() => {
    axios
      .post(`${domain}/api/pilot/getSinglePilot`, config)
      .then((response) => {
    
setLikedReviews(response.data.likedReviews);

        console.log(response);
        // setBrands(response.data.brandOfDrones)
      });
  }, []);

  //yaseen
  return (
    <>
      <Helmet>
        <title>Service center details</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>

      <section
        className={` ${All.Profile} ${All.EndUserProfile} s_c_d_container`}
      >

        <Container className={All.Container}>
          <div style={{ position: "relative"}}>
        <img src={details.coverPic} style={{width: "100%", height:"300px", borderRadius:"10px"}} />
        <img src={details.profilePic} style={{width: "200px", height:"200px", borderRadius:"100px", position:"absolute", bottom: "-100px", right:"50px", border: "5px solid white", boxShadow: "5px 5px 5px #ccc"}}/>
        </div>

          <Row>
            <Col
              md={6}
              className={`${All.Order_xs_2} ${All.Order_sm_2} ${All.pr_xs_30} ${All.pl_xs_30} ${All.profileImg}`}
            >
              

              <Box py={1} style={{display:"flex", alignItems:"flex-end"}}>
                <h2 style={{ marginTop: "35px", textTransform: "capitalize" }}>
                  {details.centerName || <Skeleton />}  
                </h2> 


                {
                  centers.includes(param.id) ? <img src={BookmarkFilled} style={{width: "40px", marginLeft:"20px"}} onClick={unbookmark}/> : <img src={Bookmark} style={{width: "40px", marginLeft:"20px"}} onClick={bookmark}/>
                }
                
               
              </Box>
              <Box py={1}>
                <h4>
                  {details.city}, {details.country}.
                </h4>
              </Box>
              <span className="s_c_rating">
                {/* <div className='service_center_rating_md_xl'> */}
                <span
                  className={
                    details.rating >= 1 ? "star_checked" : "star_unchecked"
                  }
                >
                  &#9733;
                </span>
                <span
                  className={
                    details.rating >= 2 ? "star_checked" : "star_unchecked"
                  }
                >
                  &#9733;
                </span>
                <span
                  className={
                    details.rating >= 3 ? "star_checked" : "star_unchecked"
                  }
                >
                  &#9733;
                </span>
                <span
                  className={
                    details.rating >= 4 ? "star_checked" : "star_unchecked"
                  }
                >
                  &#9733;
                </span>
                <span
                  className={
                    details.rating >= 5 ? "star_checked" : "star_unchecked"
                  }
                >
                  &#9733;
                </span>
                {/* </div> */}
              </span>

              <span>
                <Link
                  className="s_c_d_links"
                  onClick={() => {
                    selectTab("s_c_d_reviews_tab", "s_c_d_reviews_container");
                  }}
                >
                  Read Reviews
                </Link>
              </span>
              <div className="s_c_d_other_details">
                <div className="s_c_d_other_details_title">Working time:</div>
                <div className="s_c_d_other_details_content">
                  {details.workingHours}
                </div>


                {/* {

                  details.holidays ? <> <div className="s_c_d_other_details_title">Holidays:</div>
                  <div className="s_c_d_other_details_content">
                    {details.holidays.map((item, i)=>{
  return(<div style={{textTransform :"capitalize"}}>{item}</div>)                  })}
                  </div> </> : <></>
                }
                 */}
                <div className="s_c_d_other_details_title">Address:</div>
                <div className="s_c_d_other_details_content">
                  {details.city} , {details.state}
                </div>
                <div className="s_c_d_other_details_title">
                  Brands we can service
                </div>
                <div className="s_c_d_other_details_content">
                  {brands.slice(0, 2).map((brand, index) => {
                    return (
                      <span className="s_c_d_brand" key={index}>
                        {brand}
                      </span>
                    );
                  })}
                  <Link
                    className="s_c_d_links"
                    onClick={() => {
                      selectTab("s_c_d_brands_tab", "s_c_d_brands_container");
                    }}
                  >
                    View All Brands
                  </Link>
                </div>
              </div>
              <div
                style={{ display: "flex" }}
                className="s_c_d_enquiry_container"
              >
                <button className="s_c_d_button1" onClick={enquireNow}>
                  Enquire Now
                </button>


                {
                  details.whatsappNo ?   <Link onClick={() => whatsappChat(details.whatsappNumber)}>
                  <img src={whatsapp_icon} alt="" height={"35px"} />
                </Link> : <></>
                }
              
              </div>
            </Col>
            
          </Row>
          <div className="s_c_d_tabs">
            <span className="s_c_d_tab s_c_d_tab_selected" id="s_c_d_about_tab">
              <Link
                onClick={() => {
                  selectTab("s_c_d_about_tab", "s_c_d_about_container");
                }}
              >
                About
              </Link>
            </span>
            <span className="s_c_d_tab" id="s_c_d_brands_tab">
              <Link
                onClick={() => {
                  selectTab("s_c_d_brands_tab", "s_c_d_brands_container");
                }}
              >
                Brands
              </Link>
            </span>
            <span className="s_c_d_tab" id="s_c_d_reviews_tab">
              <Link
                onClick={() => {
                  selectTab("s_c_d_reviews_tab", "s_c_d_reviews_container");
                }}
              >
                Reviews
              </Link>
            </span>
          </div>
          <hr style={{ border: "1px solid #eee" }} />
          <Row>
            <Col xl={7} lg={7} md={6} sm={12}>
              <div id="s_c_d_about_container">
                <div className="s_c_d_tab_title">About</div>
                <div className="s_c_d_tab_about_content">
                  {details.description}
                </div>
              </div>
              <div id="s_c_d_brands_container">
                <div className="s_c_d_tab_title">Brands we can service</div>
                {brands.map((brand, index) => {
                  return <div className="s_c_d_tab_brands">{brand}</div>;
                })}
              </div>
              <div id="s_c_d_reviews_container">
                <div>
                  <div
                    className="s_c_d_tab_review_title"
                    style={{ display: "inline-block" }}
                  >
                    Reviews
                  </div>
                  <button
                    className="s_c_d_button2"
                    onClick={() => setWriteReview(!writeReview)}
                  >
                    Write Review
                  </button>
                </div>

                {writeReview ? (
                  <div className="s_c_d_write_review_container">
                    <textarea
                      className="s_c_d_write_review"
                      id="s_c_d_review"
                      onChange={changeReviewHandler}
                    ></textarea>
                    <button
                      className="s_c_d_button2 s_c_d_review_submit"
                      onClick={submitReview}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <div className="s_c_d_review_list">

<div id="toHide" style={{fontSize: "22px", fontFamily:"muli-regular", textAlign: "center", marginTop: "50px", display: "none"}}>No Reviews Yet</div>

                  {/* yaseen                   */}
                  {reviews.map((review, index) => {
                    return (
                      <>
                        <div className="s_c_d_review">
                          <div className="s_c_d_review_img_name">
                            <img
                              src={review.userId.profilePic}
                              alt="" style={{width: "45px", height: "45px", borderRadius:"22.5px"}}
                              className="s_c_d_review_img"
                            />
                            <div className="s_c_d_review_name">
                              {review.pilotName}
                            </div>
                            <span className="s_c_rating">
                              <span
                                className={
                                  review.rating >= 1
                                    ? "s_c_d_star_checked"
                                    : "s_c_d_star_unchecked"
                                }
                              >
                                &#9733;
                              </span>
                              <span
                                className={
                                  review.rating >= 2
                                    ? "s_c_d_star_checked"
                                    : "s_c_d_star_unchecked"
                                }
                              >
                                &#9733;
                              </span>
                              <span
                                className={
                                  review.rating >= 3
                                    ? "s_c_d_star_checked"
                                    : "s_c_d_star_unchecked"
                                }
                              >
                                &#9733;
                              </span>
                              <span
                                className={
                                  review.rating >= 4
                                    ? "s_c_d_star_checked"
                                    : "s_c_d_star_unchecked"
                                }
                              >
                                &#9733;
                              </span>
                              <span
                                className={
                                  review.rating >= 5
                                    ? "s_c_d_star_checked"
                                    : "s_c_d_star_unchecked"
                                }
                              >
                                &#9733;
                              </span>
                            </span>
                          </div>
                          <div className="s_c_d_review_description">
                            {review.review}
                          </div>

                          <div className="s_c_d_review_like_share">

                            {
                              likedReviews.includes(review._id) ?   <div
                              className="s_c_d_review_like"
                              style={{color:"#00e7fc", fontFamily:"muli-bold"}}
                              onClick={() => unlikeReview(review._id)}
                            >
                              Liked ({review.likes.length})
                            </div>  :   <div
                              className="s_c_d_review_like"
                              onClick={() => likeReview(review._id)}
                            >
                              Like ({review.likes.length})
                            </div>
                            }
                          
                            <div className="s_c_d_review_share">
                              Share
                            </div>
                          </div>
                        </div>
                        <hr style={{ border: "1px solid #eee" }} />
                      </>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Visible xl>
              <Col xl={1}></Col>
            </Visible>
            <Col xl={4} lg={5} md={6} sm={12}>
            <div id="s_c_d_contact_details">
{
  details.whatsappNo ? <> <div className="s_c_d_contact_details_title">Chat:</div>
  <div
    className="s_c_d_contact_details_whatsapp"
    onClick={() => whatsappChat(details.whatsappNumber)}
  >
    <img src={whatsapp_icon} alt="" height={"35px"} />
    Chat on whatsapp
  </div></> : <></>
}

              
               
                <div className="s_c_d_contact_details_title">
                  Phone Numbers:
                </div>
                <div className="s_c_d_contact_details_content">
                  <a href="tel:+91 9876543210">
                    {details.phoneNo} {details.secondaryNumber ? "," : ""}  {details.secondaryNumber ? details.secondaryNumber : <></> }
                  </a>
                </div>
                <div className="s_c_d_contact_details_title">Email ID:</div>
                <div className="s_c_d_contact_details_content">
                  <Link>{details.email}</Link>
                </div>
{
  details.website ? <> <div className="s_c_d_contact_details_title">Website:</div>
  <div className="s_c_d_contact_details_content">
    <Link>{details.website}</Link>
  </div> </> : <></>
}

               
                <div className="s_c_d_contact_details_title">Working time</div>
                <div className="s_c_d_contact_details_content">
                  {details.workingHours}
                </div>
{
  details.holidays ? <><div className="s_c_d_contact_details_title">Holidays</div>
  <div className="s_c_d_contact_details_content">
    {details.holidays.map((item, i)=>{
      return(<div style={{textTransform: "capitalize"}}>{item}</div>)
    })}
  </div></> : <></>
}
                
                <div className="s_c_d_contact_details_title">Address</div>
                <div className="s_c_d_contact_details_content">
                  {details.state}, {details.city}
                </div>

             


              </div>
              <div id="s_c_d_photos">
                <div className="s_c_d_photos_title">Photos</div>
                <div className="s_c_d_photos_list">
                  <Row gutterWidth={20}>


                    {details.images ? details.images.map((photo, index) => {
                      return (
                        <Col xs={4} style={{ marginBottom: "20px" }}>
                          <img src={`${photo}`} alt="" width={"100%"} style={{borderRadius :"5px"}} />
                        </Col>
                      );
                    }) : <></>


                    }
                    
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Dialog
          open={enquiry}
          onClose={closeEnquiry}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          PaperProps={{ style: { width: "620px", borderRadius: "10px" } }}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginBottom: "50px" }}
          >
            <div style={{ position: "absolute", top: "20px", right: "20px" }}>
              <img
                src={Close}
                alt=""
                onClick={closeEnquiry}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div style={{marginTop: "30px"}}>
             <div className="sc_popup_head">Contact Service Center</div>
             <div className="sc_popup_desc">Enter the below details to send a Enquiry </div>
             <div className="sc_popup_input_label">Name</div>
             <input type="text" className="sc_popup_input" name="name" onChange={enquiryChange} value={myData.name}/>
             <div className="sc_popup_input_label">Phone No</div>
             <input type="text" className="sc_popup_input" name="phoneNo" onChange={enquiryChange} value={myData.phoneNo}/>
             <div className="sc_popup_input_label">Email Id</div>
             <input type="text" className="sc_popup_input" name="emailId" onChange={enquiryChange} value={myData.emailId}/>
             <div className="sc_popup_input_label">message</div>
             <textarea type="text" className="sc_popup_input1"  value={message} name="message" onChange={changeMessage}/>
             <div style={{width:"100%", textAlign:"center"}}>
             {isLoading ? (
                      <>
                       <button className="sc_popup_submit1" onClick={captureEnquiry}> <Loader /> Sending</button>
                      </>
                    ) : (
                      <>
                        <button className="sc_popup_submit" onClick={captureEnquiry}>Submit</button>
                      </>
                    )}
               
               </div>
               
             
             
             </div>

          </DialogContent>
        </Dialog>
        <Dialog
          open={rating}
          onClose={closeRating}
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
              <img src={Close} alt="" onClick={closeRating} />
            </div>
            <div className="s_c_d_rating_form">
              <div className="s_c_d_rating_form_title">Rate Pilot</div>
              <div className="s_c_d_rating_form_emojis">
                <div className="s_c_d_rating_form_emoji">
                  <div
                    className="s_c_d_rating_form_emoji_pic"
                    onClick={() => setNewRating(1)}
                  ></div>
                  <div
                    className={
                      newRating == 1 && "s_c_d_rating_form_emoji_selector1"
                    }
                  ></div>
                </div>
                <div className="s_c_d_rating_form_emoji">
                  <div
                    className="s_c_d_rating_form_emoji_pic"
                    onClick={() => setNewRating(2)}
                  ></div>
                  <div
                    className={
                      newRating == 2 && "s_c_d_rating_form_emoji_selector2"
                    }
                  ></div>
                </div>
                <div className="s_c_d_rating_form_emoji">
                  <div
                    className="s_c_d_rating_form_emoji_pic"
                    onClick={() => setNewRating(3)}
                  ></div>
                  <div
                    className={
                      newRating == 3 && "s_c_d_rating_form_emoji_selector3"
                    }
                  ></div>
                </div>
                <div className="s_c_d_rating_form_emoji">
                  <div
                    className="s_c_d_rating_form_emoji_pic"
                    onClick={() => setNewRating(4)}
                  ></div>
                  <div
                    className={
                      newRating == 4 && "s_c_d_rating_form_emoji_selector4"
                    }
                  ></div>
                </div>
                <div className="s_c_d_rating_form_emoji">
                  <div
                    className="s_c_d_rating_form_emoji_pic"
                    onClick={() => setNewRating(5)}
                  ></div>
                  <div
                    className={
                      newRating == 5 && "s_c_d_rating_form_emoji_selector5"
                    }
                  ></div>
                </div>
              </div>
              <div className="s_c_d_rating_form_submit_container">
                <button
                  className="s_c_d_button3 s_c_d_rating_form_submit_btn"
                  onClick={() => submitData()}
                >
                  Submit
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* //error  */}

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
                <div
                  style={{ position: "absolute", top: "20px", right: "20px" }}
                >
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
      </section>
    </>
  );
}
