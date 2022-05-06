import React, { useEffect, useState } from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "./All.module.css";
import { Helmet } from "react-helmet";
import First from "../images/1stPlace.png";
import Alert from '@material-ui/lab/Alert';

import Second from "../images/2ndPlace.png";
import Third from "../images/3rdPlace.png";
import View from "../images/viewPost.png";
import Like from "../images/likePost1.png";
import Download from "../images/downloadPost1.png";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Close from "../images/close.svg";
import { useParams, useHistory, Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import close from "../images/close.svg";
const domain = process.env.REACT_APP_MY_API;
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
function Shoots() {
  let param = useParams();
  let history = useHistory();
  const [data, setData] = useState([]);
  const [myFollowing, setMyFollowing] = useState([])
  let [loginError, setLoginError] = useState(false)

  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  useEffect(() => {
    axios.get(`${domain}/api/shoot/getShoots`).then((res) => {
      console.log(res);
      setData(res.data);
    })
    axios.post(`${domain}/api/follow/getMyFollowing`, config).then((res) => {
      const folowers = res.data;
      console.log(folowers);
      setMyFollowing(folowers);
    });
  }, []);
    useEffect(()=>{
axios.get(`${domain}/api/user/checkPilotPro`, config).then(res=>{
  console.log(res)
  if(res.data === false){
document.getElementById("alertToShow").style.display = "flex"
  }

  setTimeout(()=>{
    document.getElementById("alertToShow").style.display = "none"

  }, 5000)
})
    },[])
  
  let followMe = (userId) => {
    if(localStorage.getItem("access_token")){
      axios
        .post(`${domain}/api/pilot/getPilotId`, { userId: userId })
        .then((res) => {
          console.log(res);
          axios
            .post(`${domain}/api/follow/createFollow/${res.data[0]._id}`, config)
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
    }
    else{
      setLoginError(true)
      console.log("login first")
    }
  };
  const closeLoginError = () => {
    setLoginError(false)
  }

  let unfollow = (userId) => {
    axios
      .post(`${domain}/api/pilot/getPilotId`, { userId: userId })
      .then((res) => {
        console.log(res);
        axios
          .post(`${domain}/api/follow/removeFollow/${res.data[0]._id}`, config)
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
  return (
    <div>
      <Helmet>
        <title>Shoot of the week</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>
      <div className="h_p_container" style={{ overflowX: "hidden" }}>
        <Container
          className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}
        >
          <Container>
          <Alert severity="info" style={{border: "1px solid lightBlue", marginBottom:"10px", display:"none"}} id="alertToShow">Upgrade to PilotPro for a chance to get your shoots here</Alert>

            
            <div
              class="MuiBox-root MuiBox-root-11"
              style={{ textAlign: "center" }}
            >
              <h2 className="All_BlogDeatailTitle__3XrbQ">Shoots of The Week</h2>
            </div>{" "}
            {data.map((item, i) => {
              return (
                <>
                
                  <div style={{ position: "relative" }}>
                    <img
                      src={`https://dn-nexevo-landing.s3.ap-south-1.amazonaws.com/${item.imageId.file}`}
                      style={{ width: "100%", borderRadius: "10px" }}
                    />
                    {
                      item.place === 1 ?   <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "30px",
                        backgroundColor: "#0000007F",
                        padding: "10px",
                        borderRadius: "90px",
                      }}
                    >
                      <img src={First} />
                    </div>
                   : <></>
                    }
                    {
                      item.place === 2 ?   <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "30px",
                        backgroundColor: "#0000007F",
                        padding: "10px",
                        borderRadius: "90px",
                      }}
                    >
                      <img src={Second} />
                    </div>
                   : <></>
                    }
                    {
                      item.place === 3 ?   <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "30px",
                        backgroundColor: "#0000007F",
                        padding: "10px",
                        borderRadius: "90px",
                      }}
                    >
                      <img src={Third} />
                    </div>
                   : <></>
                    }
                  </div>
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={Like}
                      style={{ height: "35px", marginLeft: "15px" }}
                    />{" "}
                    <span style={{ marginLeft: "10px" }}>
                      {item.imageId.likes.length}
                    </span>
                    <img
                      src={Download}
                      style={{ height: "35px", marginLeft: "15px" }}
                    />{" "}
                    <span style={{ marginLeft: "10px" }}>
                      {item.imageId.downloads.length}
                    </span>
                    <img
                      src={View}
                      style={{ height: "35px", marginLeft: "15px" }}
                    />{" "}
                    <span style={{ marginLeft: "10px", marginRight: "20px" }}>
                      {item.imageId.views}
                    </span>
                  </div>

                  <div style={{ margin: "20px 0px 50px 0px" }}>
                    <Row>
                      <Col lg={1.4} xs={3}>
                        <img
                          src={item.pilotId.profilePic}
                          style={{
                            height: "75px",
                            width: "75px",
                            borderRadius: "37.5px",
                            cursor: "pointer",
                          }}
                        />
                      </Col>
                      <Col>
                        {" "}
                        <div className="i_v_name">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            {item.pilotId.name}
                          </div>
                          {myFollowing.includes(item.pilotId._id) ? (
                    <div
                      className="i_v_follow"
                      onClick={() => unfollow(item.pilotId._id)}
                    >
                      Followed
                    </div>
                  ) : (
                    <div
                      className="i_v_follow"
                      onClick={() => followMe(item.pilotId._id)}
                    >
                      Follow
                    </div>
                  )}                        </div>
                      </Col>
                    </Row>
                  </div>
                </>
              );
            })}
          </Container>
        </Container>
      </div>
      <Dialog
        open={loginError}
        onClose={closeLoginError}
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
          <div style={{ position: "absolute", top: "20px", right: "20px" }}>
            <img
              src={Close}
              alt=""
              onClick={closeLoginError}
              style={{ cursor: "pointer" }}
            />
          </div>
          <Row style={{ marginTop: "30px" }}>
            <div className="a_j_popup_title" style={{ padding: "0px 60px" }}>
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
    </div>
  );
}

export default Shoots;
