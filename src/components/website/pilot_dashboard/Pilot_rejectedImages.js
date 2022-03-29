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
import { Item } from "semantic-ui-react";
import axios from 'axios'
import {Link} from "react-router-dom"

const domain = process.env.REACT_APP_MY_API

function mouseGotIN(id) {
  document.getElementById("pd_more/" + id).style.display = "block";
  document.getElementById("pd_images_more/" + id).style.display = "none";
}
function mouseGotOut(id) {
  document.getElementById("pd_more/" + id).style.display = "none";
}

function showMore(id) {
  document.getElementById("pd_images_more/" + id).style.display = "block";
}

function Pilot_rejectedImages() {
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  useEffect(() => {
    axios.post(`${domain}/api/image/getRejectedImages`,config).then(
      (response) => {
console.log(response.data)       
  setValue(response.data)
  if(response.data.length === 0){
    document.getElementById("toHide").style.display ="block"
  }
      }
    );
  }, []);
  let [value, setValue] = useState([]);
  const deleteImage = (id) =>{
    axios.post(`${domain}/api/image/deleteImage/${id}`, config).then((res)=>{
      axios.post(`${domain}/api/image/getRejectedImages`,config).then(
        (response) => {
  console.log(response.data)       
    setValue(response.data)
    
        }
      ); })
  }
 
  return (
    <div>
        <div id="toHide" style={{fontSize: "22px", fontFamily: "muli-regular", textAlign:"center", marginTop:"35px", display:"none"}}>YAY!! No Rejected Images, Thank you for following the rules</div>
    <Row gutterWidth={12}>
          {value.map((item) => {
            return (
              <Col  xl={4} lg={6} md={4} sm={6} xs={12}>
                <div style={{ height: "310px" }}>
                  <div
                    className="pd_images_imageContainer"
                    onMouseOver={() => mouseGotIN(item._id)}
                    onMouseOut={() => mouseGotOut(item._id)}
                  >
                    <img src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${item.file}`}  className="pd_images_image" />
                    <div
                      className={
                        item.premium
                          ? "pd_premiumBadge"
                          : "pd_images_imageHidden"
                      }
                    >
                      <img src={premiumIcon} className="pd_premiumBadge_star" />
                    </div>
                  </div>
                  <div
                    className="pd_moreBtn"
                    id={"pd_more/" + item._id}
                    onMouseOver={() => mouseGotIN(item._id)}
                    onMouseOut={() => mouseGotOut(item._id)}
                    onClick={() => showMore(item._id)}
                  >
                    <img src={moreIcon} className="pd_image_more" />
                  </div>
                  <div
                    className="pd_images_moreOptions"
                    id={"pd_images_more/" + item._id}
                  >
                    <Link to = {`/edit-file/${item._id}`}><div className="pd_images_moreOption">Edit</div></Link>
                    <div className="pd_images_moreOption" onClick={()=>deleteImage(item._id)}>Remove</div>
                  </div>

                  {/* tags */}
                      <div className="pd_images_tags">
                      <div className="pd_images_tag1">{item.category}</div>
                      <div className="pd_images_tagDanger">{item.rejectReason}</div>
                      </div>
                  {/* tags */}
                </div>
              </Col>
            );
          })}
        </Row>
      {/* <div className="a_j_load_div" style={{ margin: "40px 0px" }}>
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div> */}
    </div>
  );
}

export default Pilot_rejectedImages;
