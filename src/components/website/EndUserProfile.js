import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-grid-system";
import All from "../website/All.module.css";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Hirebtn from "../images/hirebtn.svg";
import TabModel from "../tabs/TabModel";
import Facebook from "../images/socialicons/facebook.svg";
import Instagram from "../images/socialicons/instagram.svg";
import linkedin from "../images/socialicons/linkedin.svg";
import Pinterest from "../images/socialicons/pinterest.svg";
import Twitter from "../images/socialicons/twitter.svg";
import Youtube from "../images/socialicons/youtube.svg";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import ProfileImg from "../ProfileImg/EndProfile";
import CoverImg from "../ProfileCoverImg/EndProfileCoverImg";
import Close from "../images/close.svg";
import FollowBtn from "../tabs/FollowBtn";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { userService } from "../_services/user.service";


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
          <img src={Close} />
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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function EndUserProfile(props) {
  const [profile, setProfile] = useState([]);
  const [social, setSocial] = useState([]);
  const [isBusy, setBusy] = useState(false);
  const [hirestatus, setHirestatus] = useState(false);
  const [Reportstatus, setReportstatus] = useState(false);
  const [user, Setuser] = useState([]);
  const id = props.match.params.id;
  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    userService.User().then((res) => {
      if(res.data.id == props.match.params.id){
        props.history.push("/Profile")
      }
    })

    axios
      .post(
        "http://localhost/auth-app/public/api/auth/profilesingle",
        {
          user_id: props.match.params.id,
        },
        config
      )
      .then(
        (res) => {
          setProfile(res.data);
          console.log(res.data)
          
          setBusy(true);
        },
        (err) => {
          console.log(err.response)
        }
      );

    const url = `http://localhost/auth-app/public/api/auth/hiredstatus/${id}`;
    axios.get(url, config)
    .then((res) => {
      if(res.data.success){
        setHirestatus(true)
      }
      else{
        setHirestatus(false)
      }
    })
    .catch(err => {
      setHirestatus(false)
    })

    const urls = `http://localhost/auth-app/public/api/auth/reportcheck/${id}`;
    axios.get(urls, config).then(
      (res) => {
        setReportstatus(res.data.success);
      },
      (err) => {
        console.log(err);
      }
    );

    userService.Social().then(
      (res) => {
        setSocial(res.data);
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const [open, setOpen] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const { register, handleSubmit, errors } = useForm();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenReport = () => {
    setOpenReport(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  // const HireMe = (event) => {
  const onSubmit = (event) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    axios
      .post(
        "http://localhost/auth-app/public/api/auth/hireme",
        {
          user_id: props.match.params.id,
          name: event.name,
          message: event.message,
        },
        config
      )
      .then((response) => {
        swal(response.data.message, {
          icon: "success",
        });
        setOpen(false);
      })
      .catch((error) => {
        swal(error.response.data.message, {
          icon: "error",
        });
        setOpen(false);
      });
  };

  const onSubmitReport = (event) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios.post("http://localhost/auth-app/public/api/auth/reportuser",
      {
        user_id: props.match.params.id,
        sender_id: "9",
        message: event.message,
      },
      config
    )
    .then((response) => {
      swal(response.data.message, {
        icon: "success",
      });
      setOpenReport(false);
    })
    .catch((error) => {
      swal(error.response.data.message, {
        icon: "error",
      });
      setOpenReport(false);
    });
  };

  return isBusy === true ? (
    <>
      <Helmet>
        <title>Profile</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>

      <section className={` ${All.Profile} ${All.EndUserProfile}`}>
        <Container className={All.Container}>
          <Row>
            <Col
              md={6}
              className={`${All.Order_xs_2} ${All.Order_sm_2} ${All.pr_xs_30} ${All.pl_xs_30} ${All.profileImg}`}
            >
              <Box
                py={1}
                display="flex"
                className={`${All.D_Block_sm} ${All.D_Block_xs}`}
              >
                <Box pr={5}>
                  <ProfileImg id={props.match.params.id} />{" "}
                </Box>
              </Box>

              <Box py={1}>
                <h2>{profile.name || <Skeleton />} </h2>
              </Box>
              <Box py={1}>
                <h1>{profile.profession || <Skeleton />}</h1>
              </Box>
              <Box py={1}>
                <h4>
                  From {profile.location} {profile.country}
                </h4>
              </Box>

              <Box pb={2} pt={2}>
                <label className={All.MuliLight}>
                  {profile.bio || <Skeleton />}
                </label>
              </Box>

              <Box py={4}>
                <FollowBtn ml={2} id={profile.id} className={All.BtnStyle_4} />
                {hirestatus === true ? (
                  <Button
                    ml={2}
                    variant="contained"
                    color="default"
                    className={`${All.BtnStyle_3} ${All.marginright}`}
                  >
                    <img style={{ paddingRight: 10 }} src={Hirebtn} />
                    Already Hired
                  </Button>
                ) : (
                  <Button
                    ml={2}
                    onClick={handleClickOpen}
                    variant="contained"
                    color="default"
                    className={`${All.BtnStyle_3} ${All.marginright}`}
                  >
                    <img style={{ paddingRight: 10 }} src={Hirebtn} />
                    Hire me
                  </Button>
                )}

                {Reportstatus === true ? (
                  <Button
                    ml={2}
                    variant="contained"
                    color="default"
                    className={`${All.BtnStyle_2} ${All.marginright}`}
                  >
                    Already Report
                  </Button>
                ) : (
                  <Button
                    ml={2}
                    onClick={handleClickOpenReport}
                    variant="contained"
                    color="default"
                    className={`${All.BtnStyle_2} ${All.marginright}`}
                  >
                    Report
                  </Button>
                )}
              </Box>
              <Box>
                {/* social media */}
              </Box>
            </Col>
            <Col
              md={6}
              className={`${All.Order_xs_1} ${All.Order_sm_1}  ${All.coverImg} ${All.pr_xs_30} ${All.pl_xs_30}`}
            >
              <CoverImg id={props.match.params.id} />
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container className={All.Container}>
          <Row>
            <Col>
              <TabModel id={profile.id} />
            </Col>
          </Row>
        </Container>
      </section>

      <Dialog
        className="test"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          className={All.PopupHeader}
        >
          <Box display="flex" pt={6}>
            <Box pr={2}>
              <img
                style={{ width: "75px", height: "75px", borderRadius: "50%" }}
                src={profile.profile}
              />
            </Box>
            <Box mt={2}>
              <h3 className={All.Bold}>Hire {profile.name}</h3>
            </Box>
          </Box>
        </DialogTitle>
        <form
          className={`${All.form} ${All.paddingbottom_30}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent className={All.PopupBody}>
            <Box>
              <input
                type="text"
                name="name"
                className={`${All.FormControl} ${All.Popupmodel}`}
                id="name"
                ref={register({ required: true })}
                placeholder="Name"
              />
            </Box>

            <Box>
              <textarea
                col-6
                type="email"
                name="message"
                className={`${All.FormControl} ${All.Popupmodel}`}
                ref={register({ required: true })}
                id="message"
                placeholder="Create the message"
              />
            </Box>
          </DialogContent>
          <Box textAlign="Center" className={All.PopupFooter}>
            {/* <Button  onClose={handleCloseReport} variant="contained" color="default" type="button" className={`${All.BtnStyle_4} ${All.FloatLeft}`}>
              Cancel</Button>  */}
            <Button
              variant="contained"
              color="default"
              type="submit"
              className={`${All.BtnStyle_3} ${All.FloatRight}`}
              id="follow"
            >
              Send
            </Button>
          </Box>
        </form>
      </Dialog>

      <Dialog
        className="test"
        onClose={handleCloseReport}
        aria-labelledby="customized-dialog-title"
        open={openReport}
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleCloseReport}
          className={All.PopupHeader}
        >
          <Box display="flex" pt={6}>
            <Box pr={2}>
              <img
                style={{ width: "75px", height: "75px", borderRadius: "50%" }}
                src={profile.profile}
              />
            </Box>
            <Box mt={2}>
              <h3 className={All.Bold}>Report {profile.name}</h3>
            </Box>
          </Box>
        </DialogTitle>
        <form
          className={`${All.form} ${All.paddingbottom_30}`}
          onSubmit={handleSubmit(onSubmitReport)}
        >
          <DialogContent className={All.PopupBody}>
            <Box>
              <textarea
                col-6
                type="email"
                name="message"
                className={`${All.FormControl} ${All.Popupmodel}`}
                ref={register({ required: true })}
                id="message"
                placeholder="Create the message"
              />
            </Box>
          </DialogContent>
          <Box textAlign="Center" className={All.PopupFooter}>
            {/* <Button  onClose={handleCloseReport} variant="contained" color="default" type="button" className={`${All.BtnStyle_4} ${All.FloatLeft}`}>
              Cancel</Button>  */}
            <Button
              variant="contained"
              color="default"
              type="submit"
              className={`${All.BtnStyle_3} ${All.FloatRight}`}
              id="follow"
            >
              Send
            </Button>
          </Box>
        </form>
      </Dialog>
    </>
  ) : (
    ""
  );
}
