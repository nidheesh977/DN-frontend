import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import All from "../website/All.module.css";
import "./Imageview.css";
import Like from "../images/heart (3).svg";
import Heart from "../images/heart-blue.svg";
import Share from "../images/share.png";
import { saveAs } from "file-saver";
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";

const domain = process.env.REACT_APP_MY_API;


function Imageview() {
  let param = useParams();
  let history = useHistory();
  let [image, setImage] = useState([]);
  let [otherImages, setOtherImages] = useState([]);
  let [likedData, setLikedData] = useState([]);
  useEffect(() => {
    axios
      .get(`${domain}/api/image/getImage/${param.id}`)
      .then((res) => {
        console.log(res);
        setImage(res.data[0]);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${domain}/api/image/getUserImages/${param.user_id}`)
      .then((res) => {
        console.log(res.data.slice(0, 5));
        setOtherImages(res.data.slice(0, 5));
      });
  }, []);
  useEffect(() => {
    axios
      .post(`${domain}/api/user/checkUser`, config)
      .then((res) => {
        console.log(res.data);

        setLikedData(res.data.likedMedia);
      });
  }, []);
  const downloadImage = (id) => {
    saveAs(`${domain}/${image.file}`, `${image.file}`);
    axios
      .post(`${domain}/api/image/downloadImage/${id}`, config)
      .then((res) => {
        console.log(res.data);
      });
  };
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  let clicked = (id, userId) => {
    window.location.href = `/imageview/${id}/${userId}`
    // history.push(`/imageview/${id}/${userId}`);
    // window.location.reload();
  };
  let likeImage = () => {
    axios
      .post(`${domain}/api/image/likeImage/${image._id}`, config)
      .then((res) => {
        console.log(res.data);
        axios
          .post(`${domain}/api/user/checkUser`, config)
          .then((res) => {
            setLikedData(res.data.likedMedia);
          });
      });
  };
  let unlikeImage = () => {
    axios
      .post(`${domain}/api/image/unlikeImage/${image._id}`, config)
      .then((res) => {
        console.log(res.data);
        axios
          .post(`${domain}/api/user/checkUser`, config)
          .then((res) => {
            setLikedData(res.data.likedMedia);
          });
      });
  };

  let commentsClicked =() =>{
document.getElementById("hideComment").style.display = "block"
  }

  let addComment =() =>{
    document.getElementById("hideComment").style.display = "none"
      }
  return (
    <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
      <Container>
        <div style={{ marginTop: "35px" }}>
          <div className="i_v_back" style = {{width: "50%", overflow: "hidden", textOverflow: "ellipsis"}}>{image.postName}</div>
          <button
            className="i_v_download"
            onClick={() => downloadImage(image._id)}
          >
            Download
          </button>
        </div>
        {image.fileType === "video" ? (
          <video
            className="mainImage"
            style={{
              backgroundColor: "black",
              objectFit: "cover",
              width: "100%",
              margin: "32px 0px 45px 0px",
              borderRadius: "10px",
            }}
            controls
          >
            <source src={`https://dn-nexevo-landing.s3.ap-south-1.amazonaws.com/${image.file}`} type="video/mp4" />
            <source src={`https://dn-nexevo-landing.s3.ap-south-1.amazonaws.com/${image.file}`} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            style={{
              width: "100%",
              margin: "32px 0px 45px 0px",
              borderRadius: "10px",
            }}
            className="mainImage"
            src={`https://dn-nexevo-landing.s3.ap-south-1.amazonaws.com/${image.file}`}
          />
        )}

        <div>
          {likedData.includes(image._id) ? (
            <img src={Heart} className="likeImage" onClick={unlikeImage} />
          ) : (
            <img src={Like} className="likeImage" onClick={likeImage} />
          )}
        </div>
        <div>
          <img src={Share} className="shareImage" />
        </div>

        <Row gutterWidth={45}>
          {/* left */}
          <Col lg={8}>
            <Row>
              <Col lg={1.4} xs={3}>
                {" "}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQarxp3w2V2uosNwCyzIp1tILCurA27Wq0tXXjO_xykwjz2aIWKABGd621rpjLWcR3ZGs8&usqp=CAU"
                  style={{
                    height: "75px",
                    width: "75px",
                    borderRadius: "37.5px",
                  }}
                />
              </Col>
              <Col>
                {" "}
                <div className="i_v_name">
                  <div>{image.name}</div>
                  <div className="i_v_follow">Follow</div>
                </div>
              </Col>
            </Row>
            <div style={{ marginTop: "20px" }}>
              <div className="i_v_hello">Hello Everyone,</div>
              <div className="i_v_experience">{image.experience}</div>
            </div>
            <div className="i_v_create">Wanna create something great?</div>
            <div className="i_v_contact">
              Feel Free to contact us{" "}
              <span className="i_v_email"> info@nexevo.in</span>
            </div>
            <Row>
              <Col lg={9}>
                <div style={{ marginBottom: "60px" }}>
                  <div className="i_v_commentsTitle">Comments</div>
                  <div className="i_v_addComment" onClick={commentsClicked}>Add a comment</div>

                  <div className="comments_to_hide" id="hideComment" style={{display: "none"}}>
                    <textarea className="i_v_commentInput" type="text" style={{height:"50px", width: "100%", borderRadius: "10px", border: "1px solid lightgray", padding: "10px"}} />
                    <div className="i_v_addComment" style={{margin:"10px"}} onClick={addComment}>Submit</div>
                  </div>
                </div>

                <Row>
                  <Col lg={1.25} xs={2}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQarxp3w2V2uosNwCyzIp1tILCurA27Wq0tXXjO_xykwjz2aIWKABGd621rpjLWcR3ZGs8&usqp=CAU"
                      style={{
                        height: "45px",
                        width: "45px",
                        borderRadius: "22.5px",
                      }}
                    />
                  </Col>
                  <Col>
                    <div className="i_v_comment_pilotName">Yaseen Ahmed</div>
                    <div style={{ float: "right" }}>
                      <Row gutterWidth={5}>
                        <Col>
                          <img src={Like} />{" "}
                        </Col>
                        <Col>
                        <div>10</div></Col>
                      </Row>
                    </div>
                    <div>This is a test comment for the image</div>
                  </Col>
                </Row>

                <hr className="i_v_hr" />
                <Row>
                  <Col lg={1.25} xs={2}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQarxp3w2V2uosNwCyzIp1tILCurA27Wq0tXXjO_xykwjz2aIWKABGd621rpjLWcR3ZGs8&usqp=CAU"
                      style={{
                        height: "45px",
                        width: "45px",
                        borderRadius: "22.5px",
                      }}
                    />
                  </Col>
                  <Col>
                    <div className="i_v_comment_pilotName">Yaseen Ahmed</div>
                    <div style={{ float: "right" }}>
                      <Row gutterWidth={5}>
                        <Col>
                          <img src={Like} />{" "}
                        </Col>
                        <Col>
                        <div>10</div></Col>
                      </Row>
                    </div>
                    <div>This is a test comment for the image</div>
                  </Col>
                </Row>

                <hr className="i_v_hr" />
                <Row>
                  <Col lg={1.25} xs={2}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQarxp3w2V2uosNwCyzIp1tILCurA27Wq0tXXjO_xykwjz2aIWKABGd621rpjLWcR3ZGs8&usqp=CAU"
                      style={{
                        height: "45px",
                        width: "45px",
                        borderRadius: "22.5px",
                      }}
                    />
                  </Col>
                  <Col>
                    <div className="i_v_comment_pilotName">Yaseen Ahmed</div>
                    <div style={{ float: "right" }}>
                      <Row gutterWidth={5}>
                        <Col>
                          <img src={Like} />{" "}
                        </Col>
                        <Col>
                        <div>10</div></Col>
                      </Row>
                    </div>
                    <div>This is a test comment for the image</div>
                  </Col>
                </Row>

                <hr className="i_v_hr" />
              </Col>
              
            </Row>
            
          </Col>

          {/* //right */}
          <Col lg={4}>
            <div className="i_v_text1">Like what you see?</div>
            <div className="i_v_text2">This Droner is available for work</div>
            <button className="hire_btn">Hire This Droner</button>

            <div className="i_v_moreShots">More Shots from Stephen Raj</div>
            <Row>
              {otherImages.map((item, i) => {
                return (
                  <Col lg={6} xs={6}>
                    {" "}
                    {item.fileType === "video" ? (
                      <video
                        style={{
                          backgroundColor: "black",
                          objectFit: "cover",
                          width: "100%",
                          height: "130px",
                          margin: "0px 0px 10px 0px",
                          borderRadius: "5px",
                        }}
                        controls
                        onClick={() => clicked(item._id, item.userId)}
                      >
                        <source
                          src={`https://dn-nexevo-thumbnail.s3.ap-south-1.amazonaws.com/${item.file}`}
                          type="video/mp4"
                        />
                        <source
                          src={`https://dn-nexevo-thumbnail.s3.ap-south-1.amazonaws.com/${item.file}`}
                          type="video/ogg"
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        style={{
                          width: "100%",
                          height: "130px",
                          margin: "0px 0px 10px 0px",
                          borderRadius: "5px",
                          objectFit: "cover"
                        }}
                        src={`https://dn-nexevo-thumbnail.s3.ap-south-1.amazonaws.com/${item.file}`}
                        onClick={() => clicked(item._id, item.userId)}
                      />
                    )}
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Imageview;