import React, { useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import Picture from "./images/drone_img.jpg";
import Premium from "./images/goldenStar.svg";
import premiumIcon from "../../images/golden-star.svg";
import loadMore from "../../images/Group 71.svg";
import person from "../../images/profile.svg";
import "../pilot_dashboard/css/Pilot_downloads.css";
import Heart from "./images/heart-green.png";

function mouseGotIN(id) {
  document.getElementById("pd_toshowDetails/" + id).style.display = "block";
}
function mouseGotOut(id) {
  document.getElementById("pd_toshowDetails/" + id).style.display = "none";
}

function Company_downloadsImages() {
  let details = {
    images: [
      {
        id: 1,
        views: "5K",
        downloads: "2K",
        likes: "1K",
        premium: false,
        pilot: "Yasar Arafath",
        src: "https://wallpaperaccess.com/thumb/104870.jpg",
      },
      {
        id: 2,
        views: "8K",
        downloads: "7K",
        likes: "4K",
        premium: true,
        pilot: "Yaseen Ahmed",
        src: "https://wallpaperaccess.com/thumb/228944.jpg",
      },
      {
        id: 3,
        views: "3K",
        downloads: "2K",
        likes: "1K",
        premium: false,
        pilot: "Yasar Arafath",
        src: "https://wallpaperaccess.com/thumb/33971.jpg",
      },
      {
        id: 4,
        views: "9K",
        downloads: "3K",
        likes: "2K",
        premium: true,
        pilot: "Yasar Arafath",
        src: "https://wallpaperaccess.com/thumb/4896.jpg",
      },
      {
        id: 5,
        views: "0K",
        downloads: "9K",
        likes: "3K",
        premium: false,
        pilot: "Yasar Arafath",
        src: "https://wallpaperaccess.com/full/309831.jpg",
      },
      {
        id: 6,
        views: "5K",
        downloads: "8K",
        likes: "9K",
        premium: true,
        pilot: "Yasar Arafath",
        src: "https://wallpaperaccess.com/thumb/449975.jpg",
      },
      {
        id: 7,
        views: "6K",
        downloads: "3K",
        likes: "6K",
        premium: false,
        pilot: "Yasar Arafath",
        src: "https://wallpaperaccess.com/thumb/132010.png",
      },
      {
        id: 8,
        views: "7K",
        downloads: "6K",
        likes: "0K",
        premium: true,
        pilot: "Yasar Arafath",
        src: "https://wallpaperaccess.com/full/211836.jpg",
      },
      {
        id: 9,
        views: "9K",
        downloads: "7K",
        likes: "8K",
        premium: true,
        pilot: "Yasar Arafath",
        src: "https://wallpaperaccess.com/thumb/196893.jpg",
      },
    ],
  };

  let [data, setData] = useState(details);
  return (
    <div>
      <Row gutterWidth={7}>
        {data.images.map((item) => {
          return (
            <Col xl={4} lg={6} md={4} sm={6} xs={12}>
              <div style={{ height: "270px" }}>
                <div
                  className="pd_images_imageContainer"
                  onMouseOver={() => mouseGotIN(item.id)}
                  onMouseOut={() => mouseGotOut(item.id)}
                >
                  <img src={item.src} className="pd_images_image" />
                  <div
                    className={
                      item.premium ? "pd_premiumBadge" : "pd_images_imageHidden"
                    }
                  >
                    <img src={premiumIcon} className="pd_premiumBadge_star" />
                  </div>
                </div>
                <div
                  id={"pd_toshowDetails/" + item.id}
                  style={{ display: "none" }}
                >
                  <div className="pd_person_details">
                    <img src={person} />{" "}
                    <span className="pd_personName">{item.pilot}</span>
                  </div>

                  <div className="pd_specificLikes">
                    <img src={Heart} />{" "}
                    <span className="pd_personName">{item.likes}</span>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <div className="a_j_load_div" style={{ margin: "40px 0px" }}>
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div>
    </div>
  );
}

export default Company_downloadsImages;