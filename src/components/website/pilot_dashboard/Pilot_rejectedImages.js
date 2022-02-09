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
import { Item } from "semantic-ui-react";

function mouseGotIN(id) {
  document.getElementById("pd_likes/" + id).style.display = "block";
  document.getElementById("pd_more/" + id).style.display = "block";
  document.getElementById("pd_images_more/" + id).style.display = "none";
}
function mouseGotOut(id) {
  document.getElementById("pd_likes/" + id).style.display = "none";
  document.getElementById("pd_more/" + id).style.display = "none";
}

function showMore(id) {
  document.getElementById("pd_images_more/" + id).style.display = "block";
}

function Pilot_rejectedImages() {
  let details = {
    images: [
      { id: 1, views: "5K", downloads: "2K", likes: "1K", premium: false, tag1: "Tall Building", tag2: "Adult" },
      { id: 2, views: "8K", downloads: "7K", likes: "4K", premium: true, tag1: "Building", tag2: "Adult" },
      { id: 3, views: "3K", downloads: "2K", likes: "1K", premium: false, tag1: "Tall Building", tag2: "Height" },
      { id: 4, views: "9K", downloads: "3K", likes: "2K", premium: true, tag1: "Tall Building", tag2: "Adult" },
      { id: 5, views: "0K", downloads: "9K", likes: "3K", premium: false, tag1: "Abusive", tag2: "Adult" },
      { id: 6, views: "5K", downloads: "8K", likes: "9K", premium: true, tag1: "Tall Building", tag2: "Adult" },
      { id: 7, views: "6K", downloads: "3K", likes: "6K", premium: false, tag1: "Tall Building", tag2: "Adult" },
      { id: 8, views: "7K", downloads: "6K", likes: "0K", premium: true, tag1: "Tall Building", tag2: "Adult" },
      { id: 9, views: "9K", downloads: "7K", likes: "8K", premium: true, tag1: "Tall Building", tag2: "Adult" },
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
                <div style={{ height: "300px" }}>
                  <div
                    className="pd_images_imageContainer"
                    onMouseOver={() => mouseGotIN(item.id)}
                    onMouseOut={() => mouseGotOut(item.id)}
                  >
                    <img src={Picture} className="pd_images_image" />
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
                    className="pd_likes_container"
                    id={"pd_likes/" + item.id}
                  >
                    <img src={viewIcon} className="pd_likes_img" />{" "}
                    <span>{item.views}</span>
                    <img src={downloadIcon} className="pd_likes_img" />{" "}
                    <span>{item.downloads}</span>
                    <img src={productLike} className="pd_likes_img" />{" "}
                    <span>{item.likes}</span>
                  </div>
                  <div
                    className="pd_moreBtn"
                    id={"pd_more/" + item.id}
                    onMouseOver={() => mouseGotIN(item.id)}
                    onMouseOut={() => mouseGotOut(item.id)}
                    onClick={() => showMore(item.id)}
                  >
                    <img src={moreIcon} className="pd_image_more" />
                  </div>
                  <div
                    className="pd_images_moreOptions"
                    id={"pd_images_more/" + item.id}
                  >
                    <div className="pd_images_moreOption">Edit</div>
                    <div className="pd_images_moreOption">Remove</div>
                  </div>

                  {/* tags */}
                      <div className="pd_images_tags">
                      <div className="pd_images_tag1">{item.tag1}</div>
                      <div className="pd_images_tagDanger">{item.tag2}</div>
                      </div>
                  {/* tags */}
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
      <div className="a_j_load_div" style={{ margin: "40px 0px" }}>
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div>
    </div>
  );
}

export default Pilot_rejectedImages;
