import React, { useState } from "react";
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
import "../pilot_dashboard/css/Pilot_downloads.css"
import Heart from "./images/heart-green.png"
import videoIcon from '../../images/video-icon.svg'




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


function Company_downloadsVideos() {
  let details = {
    images: [
      { id: 1, views: "5K", downloads: "2K", likes: "1K", premium: false, pilot: "Yasar Arafath" },
      { id: 2, views: "8K", downloads: "7K", likes: "4K",premium: true, pilot: "Yaseen Ahmed" },
      { id: 3, views: "3K", downloads: "2K", likes: "1K", premium: false, pilot: "Yasar Arafath" },
      { id: 4, views: "9K", downloads: "3K", likes: "2K",premium: true, pilot: "Yasar Arafath" },
      { id: 5, views: "0K", downloads: "9K", likes: "3K",premium: false, pilot: "Yasar Arafath" },
      { id: 6, views: "5K", downloads: "8K", likes: "9K", premium: true, pilot: "Yasar Arafath" },
      { id: 7, views: "6K", downloads: "3K", likes: "6K",premium: false, pilot: "Yasar Arafath" },
      { id: 8, views: "7K", downloads: "6K", likes: "0K", premium: true, pilot: "Yasar Arafath" },
      { id: 9, views: "9K", downloads: "7K", likes: "8K", premium: true, pilot: "Yasar Arafath" },
    ],
  };

  let [data, setData] = useState(details);
  return (
    <div>
      <Container>
        <Row gutterWidth={7}>
          {data.images.map((item) => {
            return (
              <Col  xl={4} lg={6} md={4} sm={6} xs={12}>
                <div style={{ height: "270px" }}>
                  <div
                    className="pd_images_imageContainer"
                    onMouseOver={() => mouseGotIN(item.id)}
                    onMouseOut={() => mouseGotOut(item.id)}
                  >
                    <img src={Picture} className="pd_images_image" />
                    <div className={item.premium ? "pd_premiumBadge" : "pd_images_imageHidden"}>
                      <img src={premiumIcon} className="pd_premiumBadge_star" />
                    </div>
                  </div>
                  <div className="pd_video_icon"><img src={videoIcon}/></div>

                  <div id={"pd_toshowDetails/" + item.id} style={{display: "none"}}>
                  <div className="pd_person_details">
                    <img src={person} /> <span className="pd_personName">{item.pilot}</span>
                  </div>

                 <div className="pd_specificLikes">
                     <img src={Heart} /> <span className="pd_personName">{item.likes}</span>
                 </div>
                 </div>
                
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
      <div className="a_j_load_div" style={{margin: "40px 0px"}}>
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div>
    </div>
  );
}

export default Company_downloadsVideos;
