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
import videoIcon from "../../images/video-icon.svg";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import RearrangeFiles from "./RearrangeFiles";

const domain = process.env.REACT_APP_MY_API;

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

function Pilot_approvedVideos() {

  const history = useHistory()

  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  let [rearrange, setRearrange] = useState(false);
  let [proPilot, setProPilot] = useState(false);
  let [value, setValue] = useState([]);
  let [pilotId, setPilotId] = useState("")

  useEffect(() => {
      axios.post(`${domain}/api/user/pilotDetails`, config)
      .then((res) => {
        console.log(res.data)
        if (res.data.pilotPro){
          setProPilot(true)
        }else{
          setProPilot(false)
        }
        setPilotId(res.data.userId)
        if (res.data.rearrangedVideos.length === 0) {
          axios
          .post(`${domain}/api/image/getApprovedVideos`, config)
          .then((response) => {
            console.log(response.data);
            setValue(response.data);
            if (response.data.length === 0) {
              document.getElementById("toHide").style.display = "block";
            }
          });
        }else{
          setValue(res.data.rearrangedVideos);
        }
      })
  }, []);
  

  const deleteImage = (id) => {
    axios.post(`${domain}/api/image/deleteImage/${id}`, config).then((res) => {
      axios
        .post(`${domain}/api/image/getApprovedVideos`, config)
        .then((response) => {
          console.log(response.data);
          setValue(response.data);
        });
    });
  };

  // let removeVideoIcon = (id) => {
  //   document.getElementById(`videoIcon-${id}`).style.display = "none";
  // };

  const cancelRearrange = () => {
    setRearrange(false);
    window.scrollTo(0, 0);
  };

  const startRearrange = () => {
    setRearrange(true);
  };

  const redirectImage = (id) => {
    history.push(`/Imageview/${id}/${pilotId}`)
  }

  return (
    <div>
      <div id="toHide" style={{ display: "none" }}>
        <div
          style={{
            fontSize: "22px",
            fontFamily: "muli-regular",
            textAlign: "center",
            marginTop: "35px",
          }}
        >
          No Approved Videos Now, Upload and check back later
        </div>
        <center>
          <Link to="/uploadFile">
            <button className="uploadNow_btn">Upload Now</button>
          </Link>
        </center>
      </div>
      {value.length > 0 && !rearrange && proPilot ? (
        <div style={{ textAlign: "right" }}>
          <button className="rearrange_file" onClick={startRearrange}>
            Rearrange
          </button>
        </div>
      ) : (
        ""
      )}
      
        {!rearrange ? (
          <>
          <Row gutterWidth={12}>
            {value.map((item) => {
              return (
                <Col xl={4} lg={6} md={4} sm={6} xs={12}>
                  <div style={{ height: "310px" }}>
                    <div
                      className="pd_images_imageContainer"
                      onMouseOver={() => mouseGotIN(item._id)}
                      onMouseOut={() => mouseGotOut(item._id)}
                    >
                      <video
                        className="pd_images_image"
                        style={{ backgroundColor: "black", objectFit: "cover", cursor: "pointer" }}
                        onClick = {()=>redirectImage(item._id)}
                      >
                        <source
                          src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${item.file}`}
                          type="video/mp4"
                        />
                        <source
                          src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${item.file}`}
                          type="video/ogg"
                        />
                        Your browser does not support the video tag.
                      </video>{" "}
                      <div
                        className={
                          item.premium
                            ? "pd_premiumBadge"
                            : "pd_images_imageHidden"
                        }
                      >
                        <img
                          src={premiumIcon}
                          className="pd_premiumBadge_star"
                        />
                      </div>
                    </div>
                    <div className="pd_video_icon" id={`videoIcon-${item._id}`} style = {{cursor: "pointer"}} onClick = {()=>redirectImage(item._id)}>
                      <img src={videoIcon} />
                    </div>
                    <div
                      className="pd_likes_container"
                      id={"pd_likes/" + item._id}
                    >
                      <img src={viewIcon} className="pd_likes_img" />{" "}
                      <span>{item.views}</span>
                      <img src={downloadIcon} className="pd_likes_img" />{" "}
                      <span>{item.downloads.length}</span>
                      <img src={productLike} className="pd_likes_img" />{" "}
                      <span>{item.likes.length}</span>
                    </div>
                    <div
                      className="pd_moreBtn"
                      style={{ cursor: "pointer" }}
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
                      <Link to={`/edit-file/${item._id}`}>
                        <div className="pd_images_moreOption">Edit</div>
                      </Link>
                      <div
                        className="pd_images_moreOption"
                        onClick={() => deleteImage(item._id)}
                      >
                        Remove
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
            </Row>
          </>
        ) : (
            <RearrangeFiles
              type="videos"
              cancelButton={
                <button className="r_f_cancel_btn" onClick={cancelRearrange}>
                  Cancel
                </button>
              }
              saveButton = {
                <button className="r_f_save_btn" onClick = {cancelRearrange}>Save</button>
              }
              changeValue = {setValue}
            />
        )}
      {/* <div className="a_j_load_div" style={{margin: "40px 0px"}}>
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div> */}
    </div>
  );
}

export default Pilot_approvedVideos;
