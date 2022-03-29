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
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WhatsappIcon,
} from "react-share";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import close from "../images/close.svg";
import Box from "@material-ui/core/Box";

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
          <img src={close} />
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
  let [share, setShare] = useState(false);
  let [shareLink, setShareLink] = useState("");
  useEffect(() => {
    axios.get(`${domain}/api/image/getImage/${param.id}`).then((res) => {
      console.log(res);
      setImage(res.data[0]);
    });
  }, []);
  useEffect(() => {
    setShareLink(window.location.href)
    axios
      .get(`${domain}/api/image/getUserImages/${param.user_id}`)
      .then((res) => {
        console.log(res.data.slice(0, 5));
        setOtherImages(res.data.slice(0, 6));
      });
  }, []);
  let [pilotData, setPilotData] = useState({});
  useEffect(() => {
    axios.post(`${domain}/api/user/checkUser`, config).then((res) => {
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
  let likeComment = (id) => {
    axios
      .post(
        `http://localhost:9000/api/comments/likeComment`,
        { commentId: id },
        config
      )
      .then((res) => {
        axios
          .get(`http://localhost:9000/api/comments/getComments/${param.id}`)
          .then((res) => {
            console.log(res.data);
            setComments(res.data);
          });
        axios
          .post(`http://localhost:9000/api/comments/getMyComments`, config)
          .then((res) => {
            console.log(res);
            setLikedComments(res.data);
          });
      });
  };

  const handleShareClose = () => {
    setShare(false);
  };

  let unlikeComment = (id) => {
    axios
      .post(
        `http://localhost:9000/api/comments/unlikeComment`,
        { commentId: id },
        config
      )
      .then((res) => {
        axios
          .get(`http://localhost:9000/api/comments/getComments/${param.id}`)
          .then((res) => {
            console.log(res.data);
            setComments(res.data);
          });
        axios
          .post(`http://localhost:9000/api/comments/getMyComments`, config)
          .then((res) => {
            console.log(res);
            setLikedComments(res.data);
          });
      });
  };
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
    axios
      .post(`http://localhost:9000/api/pilot/getPilotId`, { userId: userId })
      .then((res) => {
        console.log(res);
        axios
          .post(
            `http://localhost:9000/api/follow/createFollow/${res.data[0]._id}`,
            config
          )
          .then((response) => {
            axios
              .post(`${domain}/api/follow/getMyFollowing`, config)
              .then((res) => {
                const folowers = res.data;
                console.log(folowers);
                setMyFollowing(folowers);
              });
            console.log(response);
          });
      });
  };
  let unfollow = (userId) => {
    axios
      .post(`http://localhost:9000/api/pilot/getPilotId`, { userId: userId })
      .then((res) => {
        console.log(res);
        axios
          .post(
            `http://localhost:9000/api/follow/removeFollow/${res.data[0]._id}`,
            config
          )
          .then((response) => {
            axios
              .post(`${domain}/api/follow/getMyFollowing`, config)
              .then((res) => {
                const folowers = res.data;
                console.log(folowers);
                setMyFollowing(folowers);
              });
            console.log(response);
            // setBrands(response.data.brandOfDrones)
          });
      });
  };

  const clickShareLink = () => {
    setShare(true)
  }

  //yaseen
  const downloadImage = (id) => {
    saveAs(
      `https://dn-nexevo-original-files.s3.ap-south-1.amazonaws.com/${image.file}`,
      `${image.file}`
    );
    axios
      .post(`${domain}/api/image/downloadImage/${id}`, config)
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
    window.location.href = `/imageview/${id}/${userId}`;
    // history.push(`/imageview/${id}/${userId}`);
    // window.location.reload();
  };
  let likeImage = () => {
    axios
      .post(`${domain}/api/image/likeImage/${image._id}`, config)
      .then((res) => {
        console.log(res.data);
        axios.post(`${domain}/api/user/checkUser`, config).then((res) => {
          setLikedData(res.data.likedMedia);
        });
      });
  };
  let unlikeImage = () => {
    axios
      .post(`${domain}/api/image/unlikeImage/${image._id}`, config)
      .then((res) => {
        console.log(res.data);
        axios.post(`${domain}/api/user/checkUser`, config).then((res) => {
          setLikedData(res.data.likedMedia);
        });
      });
  };
  let [likedComments, setLikedComments] = useState([]);
  useEffect(() => {
    axios
      .post(`http://localhost:9000/api/comments/getMyComments`, config)
      .then((res) => {
        console.log(res);
        setLikedComments(res.data);
      });
  }, []);
  let [userId, setUserId] = useState("");
  useEffect(() => {
    axios
      .post(`http://localhost:9000/api/comments/getMyUserId`, config)
      .then((res) => {
        console.log(res);
        setUserId(res.data);
      });
  }, []);
  let commentsClicked = () => {
    document.getElementById("hideComment").style.display = "block";
  };

  let addComment = () => {
    console.log(comment);
    if(comment === ""){
      document.getElementById("hideComment").style.display = "none";

    }else{

    
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
            setComment("")
          });
      });
    }
  };
  return (
    <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
      <Container>
        <div style={{ marginTop: "35px" }}>
          <div
            className="i_v_back"
            style={{
              width: "50%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {image.postName && image.postName.substring(0, 20)}
            
          </div>
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
          <img src={Share} className="shareImage" onClick = {clickShareLink} />
        </div>

        <Row gutterWidth={45}>
          {/* left */}
          <Col lg={8}>
            <Row>
              <Col lg={1.4} xs={3}>
                {" "}
                <img
                  src={`${image.profilePic}`}
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
                    <div
                      className="i_v_follow"
                      onClick={() => unfollow(image.userId)}
                    >
                      Followed
                    </div>
                  ) : (
                    <div
                      className="i_v_follow"
                      onClick={() => followMe(image.userId)}
                    >
                      Follow
                    </div>
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

                    {
                      comment === "" ?  <div
                      className="i_v_addComment"
                      style={{ margin: "10px" }}
                      onClick={addComment}
                    >
                      Close
                    </div> :
                    <div
                    className="i_v_addComment"
                    style={{ margin: "10px" }}
                    onClick={addComment}
                  >
                    Submit
                  </div>
                    }
                    
                  </div>
                </div>

                {/* comments mapping */}

                {comments.map((item, i) => {
                  return (
                    <>
                      <Row>
                        <Col lg={1.25} xs={2}>
                          <img
                            src={`${item.userId.profilePic}`}
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
                                {likedComments.includes(item._id) ? (
                                  <img
                                    src={Heart}
                                    onClick={() => unlikeComment(item._id)}
                                  />
                                ) : (
                                  <img
                                    src={Like}
                                    onClick={() => likeComment(item._id)}
                                  />
                                )}{" "}
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
                          objectFit: "cover",
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
      <Dialog
        open={share}
        onClose={handleShareClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleShareClose}
          className={All.PopupHeader}
        >
          <Box display="flex" pt={6}>
            <Box mt={2}>
              <h3 className={All.Bold} style={{ textAlign: "center" }}>
                Share
              </h3>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent
          className={All.PopupBody}
          style={{ marginBottom: "50px" }}
        >
            <WhatsappShareButton url={shareLink} style={{ margin: "10px" }}>
              <WhatsappIcon size={52} round={true} />
            </WhatsappShareButton>
            <FacebookShareButton url={shareLink} style={{ margin: "10px" }}>
              <FacebookIcon size={52} round={true} />
            </FacebookShareButton>
            <EmailShareButton url={shareLink} style={{ margin: "10px" }}>
              <EmailIcon size={52} round={true} />
            </EmailShareButton>
            <TwitterShareButton url={shareLink} style={{ margin: "10px" }}>
              <TwitterIcon size={52} round={true} />
            </TwitterShareButton>
            <TelegramShareButton url={shareLink} style={{ margin: "10px" }}>
              <TelegramIcon size={52} round={true} />
            </TelegramShareButton>
            <LinkedinShareButton url={shareLink} style={{ margin: "10px" }}>
              <LinkedinIcon size={52} round={true} />
            </LinkedinShareButton>
            <PinterestShareButton url={shareLink} style={{ margin: "10px" }}>
              <PinterestIcon size={52} round={true} />
            </PinterestShareButton>
            <VKShareButton url={shareLink} style={{ margin: "10px" }}>
              <VKIcon size={52} round={true} />
            </VKShareButton>
            <ViberShareButton url={shareLink} style={{ margin: "10px" }}>
              <ViberIcon size={52} round={true} />
            </ViberShareButton>
            <RedditShareButton url={shareLink} style={{ margin: "10px" }}>
              <RedditIcon size={52} round={true} />
            </RedditShareButton>
            <LineShareButton url={shareLink} style={{ margin: "10px" }}>
              <LineIcon size={52} round={true} />
            </LineShareButton>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Imageview;
