import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";
import Picture from "./images/drone_img.jpg";
import Premium from "./images/goldenStar.svg";
import premiumIcon from "../../images/golden-star.svg";
import viewIcon from "../../images/viewIcon.svg";
import downloadIcon from "../../images/downloadIcon.svg";
import productLike from "../../images/product_like.png";
import moreIcon from "../../images/Path.svg";
import loadMore from "../../images/Group 71.svg";
import All from '../../website/All.module.css'
import person from "../../images/profile.svg"
import "./css/Pilot_downloads.css"
import Heart from "./images/heart-green.png"
import videoIcon from '../../images/video-icon.svg'
import axios from "axios";

const domain = process.env.REACT_APP_MY_API


function mouseGotIN(id) {
  document.getElementById("pd_toshowDetails/" + id).style.display = "block";
//   document.getElementById("pd_more/" + id).style.display = "block";
//   document.getElementById("pd_images_more/" + id).style.display = "none";

}
function mouseGotOut(id) {
    document.getElementById("pd_toshowDetails/" + id).style.display = "none";

//   document.getElementById("pd_likes/" + id).style.display = "none";
//   document.getElementById("pd_more/" + id).style.display = "none";
}


function Pilot_downloadsVideos() {
  let removeVideoIcon = (id) =>{
    document.getElementById(`videoIcon-${id}`).style.display = "none"
  }
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  let [media, setMedia] = useState([])
  useEffect(()=>{
    axios.post(`${domain}/api/pilot/getDownloadedMedia`, config).then(res =>{
      console.log(res.data)
      setMedia(res.data)
    })
  },[])
  return (
    <div>
        <Row gutterWidth={12}>
        {media.map((item, i) => {
            return (
              <>
              { item.fileType === "video" ?
              
              <Col  xl={4} lg={6} md={4} sm={6} xs={12}>
                <div style={{ height: "270px" }}>
                  <div
                    className="pd_images_imageContainer"
                    onMouseOver={() => mouseGotIN(item._id)}
                    onMouseOut={() => mouseGotOut(item._id)}
                  >
 <video
                    className="pd_images_image" style={{backgroundColor:"black", objectFit:"cover"}} controls onPlay={()=>removeVideoIcon(item._id)}
                  >
                    <source src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${item.file}`} type="video/mp4" />
                    <source src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${item.file}`} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>                    <div className={item.premium ? "pd_premiumBadge" : "pd_images_imageHidden"}>
                      <img src={premiumIcon} className="pd_premiumBadge_star" />
                    </div>
                  </div>
                  <div className="pd_video_icon"  id={`videoIcon-${item._id}`}><img src={videoIcon}/></div>

                  <div id={"pd_toshowDetails/" + item._id} style={{display: "none"}}>
                  <div className="pd_person_details">
                    <img src={person} /> <span className="pd_personName">{item.name}</span>
                  </div>

                 <div className="pd_specificLikes">
                     <img src={Heart} /> <span className="pd_personName">{item.likes.length}</span>
                 </div>
                 </div>
                
                </div>
                </Col>
              : null}
              </>
            );
          })}
        </Row>
      <div className="a_j_load_div" style={{margin: "40px 0px"}}>
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div>
    </div>
  );
}

export default Pilot_downloadsVideos;
