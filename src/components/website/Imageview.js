import React, { useEffect, useState, useRef } from "react";
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
  const formRef = useRef();

  let param = useParams();
  let history = useHistory();
  let [image, setImage] = useState([]);
  let [otherImages, setOtherImages] = useState([]);
  let [likedData, setLikedData] = useState([]);
  let [comment, setComment] = useState("");
  let [comments, setComments] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/image/getImage/${param.id}`)
      .then((res) => {
        console.log(res);
        setImage(res.data[0]);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/image/getUserImages/${param.user_id}`)
      .then((res) => {
        console.log(res.data.slice(0, 5));
        setOtherImages(res.data.slice(0, 6));
      });
  }, []);
  let [pilotData, setPilotData] = useState({});
  useEffect(() => {
    axios
      .post(`http://localhost:9000/api/user/checkUser`, config)
      .then((res) => {
        console.log(res.data);

        setLikedData(res.data.likedMedia);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/comments/getComments/${param.id}`)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      });
  }, []);
let likeComment = (id) =>{
  axios.post(`http://localhost:9000/api/comments/likeComment`, {commentId : id}, config).then(res=>{
    axios
    .get(`http://localhost:9000/api/comments/getComments/${param.id}`)
    .then((res) => {
      console.log(res.data);
      setComments(res.data);
    });
    axios.post(`http://localhost:9000/api/comments/getMyComments`,config).then(res=>{
      console.log(res)
      setLikedComments(res.data)
})
  })
 
}

let unlikeComment = (id) =>{
  axios.post(`http://localhost:9000/api/comments/unlikeComment`, {commentId : id}, config).then(res=>{
    axios
    .get(`http://localhost:9000/api/comments/getComments/${param.id}`)
    .then((res) => {
      console.log(res.data);
      setComments(res.data);
    });
    axios.post(`http://localhost:9000/api/comments/getMyComments`,config).then(res=>{
      console.log(res)
      setLikedComments(res.data)
})
  })

}
  //yaseen
  let [fol, setFol] = useState([]);

  let [myFollowing, setMyFollowing] = useState([]);
  useEffect(() => {
    axios.post(`${domain}/api/follow/getMyFollowing`, config).then((res) => {
      const folowers = res.data;
      console.log(folowers);
      setMyFollowing(folowers);
    });
  }, []);

  let followMe = (userId) => {
    axios.post(`http://localhost:9000/api/pilot/getPilotId`,{userId : userId}).then(res=>{
      console.log(res)
        axios
        .post(`http://localhost:9000/api/follow/createFollow/${res.data[0]._id}`, config)
        .then((response) => {
          axios.post(`${domain}/api/follow/getMyFollowing`, config).then((res) => {
            const folowers = res.data;
            console.log(folowers);
            setMyFollowing(folowers);
          });
          console.log(response);
      });
    })
  };
  let unfollow = (userId) => {
axios.post(`http://localhost:9000/api/pilot/getPilotId`,{userId : userId}).then(res=>{
console.log(res)
  axios
  .post(`http://localhost:9000/api/follow/removeFollow/${res.data[0]._id}`, config)
  .then((response) => {
    axios.post(`${domain}/api/follow/getMyFollowing`, config).then((res) => {
      const folowers = res.data;
      console.log(folowers);
      setMyFollowing(folowers);
    });
    console.log(response);
    // setBrands(response.data.brandOfDrones)
  });})

  };

  //yaseen
  const downloadImage = (id) => {
    saveAs(`https://dn-nexevo-original-files.s3.ap-south-1.amazonaws.com/${image.file}`, `${image.file}`);
    axios
      .post(`http://localhost:9000/api/image/downloadImage/${id}`, config)
      .then((res) => {
        console.log(res.data);
      });
  };
  let commentChangeHandler = (e) => {
    setComment(e.target.value);
  };
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  let clicked = (id, userId) => {
    history.push(`/imageview/${id}/${userId}`);
    window.location.reload();
  };
  let likeImage = () => {
    axios
      .post(`http://localhost:9000/api/image/likeImage/${image._id}`, config)
      .then((res) => {
        console.log(res.data);
        axios
          .post(`http://localhost:9000/api/user/checkUser`, config)
          .then((res) => {
            setLikedData(res.data.likedMedia);
          });
      });
  };
  let unlikeImage = () => {
    axios
      .post(`http://localhost:9000/api/image/unlikeImage/${image._id}`, config)
      .then((res) => {
        console.log(res.data);
        axios
          .post(`http://localhost:9000/api/user/checkUser`, config)
          .then((res) => {
            setLikedData(res.data.likedMedia);
          });
      });
  };
  let [likedComments, setLikedComments] = useState([])
  useEffect(()=>{
    axios.post(`http://localhost:9000/api/comments/getMyComments`,config).then(res=>{
      console.log(res)
      setLikedComments(res.data)
    })
    },[])
    let [userId, setUserId] = useState("")
    useEffect(()=>{
      axios.post(`http://localhost:9000/api/comments/getMyUserId`,config).then(res=>{
        console.log(res)
setUserId(res.data)      })
      },[])
  let commentsClicked = () => {
    document.getElementById("hideComment").style.display = "block";
  };

  let addComment = () => {
    console.log(comment);
    axios
      .post(
        `http://localhost:9000/api/comments/createComment/${param.id}`,
        { comment },
        config
      )
      .then((res) => {
        axios
          .get(`http://localhost:9000/api/comments/getComments/${param.id}`)
          .then((res) => {
            console.log(res.data);
            setComments(res.data);
            document.getElementById("hideComment").style.display = "none";
            formRef.current.value = "";
          });
      });
  };
  return (
    <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
      <Container>
        <div style={{ marginTop: "35px" }}>
          <div className="i_v_back">Back</div>
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
              height: "700px",
              margin: "32px 0px 45px 0px",
              borderRadius: "10px",
            }}
            controls
          >
            <source
              src={`https://dn-nexevo-landing.s3.ap-south-1.amazonaws.com/${image.file}`}
              type="video/mp4"
            />
            <source
              src={`https://dn-nexevo-landing.s3.ap-south-1.amazonaws.com/${image.file}`}
              type="video/ogg"
            />
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
                  src={`${domain}/${image.profilePic}`}
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
                  {myFollowing.includes(image.userId) ? (
                    <div className="i_v_follow" onClick={()=>unfollow(image.userId)}>Followed</div>
                  ) : (
                    <div className="i_v_follow"  onClick={()=>followMe(image.userId)}>Follow</div>
                  )}
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
                  <div className="i_v_addComment" onClick={commentsClicked}>
                    Add a comment
                  </div>

                  <div
                    className="comments_to_hide"
                    id="hideComment"
                    style={{ display: "none" }}
                  >
                    <textarea
                      className="i_v_commentInput"
                      type="text"
                      ref={formRef}
                      style={{
                        height: "50px",
                        width: "100%",
                        borderRadius: "10px",
                        border: "1px solid lightgray",
                        padding: "10px",
                      }}
                      onChange={commentChangeHandler}
                    />
                    <div
                      className="i_v_addComment"
                      style={{ margin: "10px" }}
                      onClick={addComment}
                    >
                      Submit
                    </div>
                  </div>
                </div>

                {/* comments mapping */}

                {comments.map((item, i) => {
                  return (
                    <>
                      <Row>
                        <Col lg={1.25} xs={2}>
                          <img
                            src={`${domain}/${item.profilePic}`}
                            style={{
                              height: "45px",
                              width: "45px",
                              borderRadius: "22.5px",
                            }}
                          />
                        </Col>
                        <Col>
                          <div className="i_v_comment_pilotName">
                            {item.name}
                          </div>
                          <div style={{ float: "right" }}>
                            <Row gutterWidth={10}>
                              <Col>
                              {
                                likedComments.includes(item._id) ? <img src={Heart}  onClick={()=>unlikeComment(item._id)}/> : <img src={Like} onClick={()=>likeComment(item._id)} />
                              }
                                {" "}
                              </Col>
                              <Col>
                                <div>{item.likes.length}</div>
                              </Col>
                            </Row>
                          </div>
                          <div>{item.comment}</div>
                        </Col>
                      </Row>

                      <hr className="i_v_hr" />
                    </>
                  );
                })}
              </Col>
            </Row>
          </Col>

          {/* //right */}
          <Col lg={4}>
            <div className="i_v_text1">Like what you see?</div>
            <div className="i_v_text2">This Droner is available for work</div>
            <button className="hire_btn">Hire This Droner</button>

            <div className="i_v_moreShots">More Shots from {image.name}</div>
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
                          height: "115px",
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
                          margin: "0px 0px 10px 0px",
                          borderRadius: "5px",
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
