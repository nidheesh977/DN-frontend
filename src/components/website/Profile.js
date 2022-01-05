import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-grid-system";
import All from "../website/All.module.css";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DroneImg from "../images/UploadFile.svg";
import TabModel from "../tabs/TabModel";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import ProfileImg from "../ProfileImg/Profile";
import CoverImg from "../ProfileCoverImg/ProfileCoverImg";
import Profileuser from "../images/profile_user.png";
import Close from "../images/close.svg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
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

export default function Profile() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [social, setSocial] = useState([]);
  const [isBusy, setBusy] = useState(false);

  useEffect(() => {
    userService.User().then(
      (res) => {
        setUser(res.data);
        setBusy(true);
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    userService.Profile().then(
      (res) => {
        setProfile(res.data);
        // console.log(res);
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

  const [open, setOpen, openReport] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickReportPopupOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>

      <section className={All.Profile}>
        <Container className={`${All.Container}`}>
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
                  <ProfileImg />{" "}
                </Box>
                <Box
                  pt={5}
                  className={`${All.textAlign_xs} ${All.textAlign_sm} ${All.pt_xs_50} ${All.pt_xs_50} ${All.pt_sm_50}`}
                >
                  <Link to="/ProfileEdit">
                    <Button
                      className={`${All.BtnStyle_8} ${All.Btn_12} ${All.mr_sm_auto} ${All.mr_xs_auto}`}
                    >
                      Edit
                    </Button>
                  </Link>
                </Box>
              </Box>

              <Box py={1}>
                {user.name ? <h2>{user.name}</h2> : <Skeleton />}
              </Box>
              <Box py={1}>
                {user.profession ? <h2>{user.profession}</h2> : <Skeleton />}
              </Box>
              <Box py={1}>
                {user.location ? (
                  <h4>
                    From {user.location} {user.country}
                  </h4>
                ) : (
                  <Skeleton />
                )}
              </Box>
              <Box pb={2} pt={2}>
                {profile.bio ? (
                  <label className={All.MuliLight}>{profile.bio}</label>
                ) : (
                  <Skeleton />
                )}
              </Box>

              {user.role_id === 1 ? (
                //  {user.role_id ===1 &&
                <></>
              ) : (
                <Box py={4}>
                  <Button
                    ml={2}
                    variant="contained"
                    color="default"
                    className={All.BtnStyle_4}
                  >
                    <img style={{ paddingRight: 10 }} src={DroneImg} />
                    Follow me
                  </Button>

                  <Button
                    ml={2}
                    onClick={handleClickOpen}
                    variant="contained"
                    color="default"
                    className={All.BtnStyle_3}
                  >
                    <img style={{ paddingRight: 10 }} src={DroneImg} />
                    Hire me
                  </Button>

                  <Popup
                    trigger={<Button className={All.BtnStyle_10}>...</Button>}
                    position="bottom center"
                  >
                    <Box p={1} textAlign="center">
                      <p>Block UserName</p>
                    </Box>
                    <Box p={1} pt={0} textAlign="center">
                      <p onClick={handleClickReportPopupOpen}>
                        Report UserName
                      </p>
                    </Box>
                  </Popup>
                </Box>
              )}
              <Box>
                {/* social media */}
              </Box>
            </Col>
            <Col
              md={6}
              className={`${All.Order_xs_1} ${All.Order_sm_1}  ${All.coverImg} ${All.pr_xs_30} ${All.pl_xs_30}`}
            >
              <CoverImg />
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container
          className={`${All.Container} ${All.pl_xs_30} ${All.pr_xs_30} ${All.pl_sm_30} ${All.pr_sm_30}`}
        >
          <Row>
            <Col>
              <TabModel id={user.id} />
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
              <img src={Profileuser} />
            </Box>
            <Box mt={2}>
              <h3 className={All.Bold}>Hire {user.name}</h3>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className={All.PopupBody}>
          <form className={All.form}>
            <Box>
              <input
                type="email"
                name="email"
                className={`${All.FormControl} ${All.Popupmodel}`}
                id="usr"
                placeholder="Name"
              />
            </Box>

            <Box>
              <textarea
                col-6
                type="email"
                name="email"
                className={`${All.FormControl} ${All.Popupmodel}`}
                id="usr"
                placeholder="Create the message"
              />
            </Box>
          </form>
        </DialogContent>
        <Box textAlign="Center" className={All.PopupFooter}>
          <Button
            onClose={handleClose}
            variant="contained"
            color="default"
            type="submit"
            className={`${All.BtnStyle_4} ${All.FloatLeft}`}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="default"
            type="submit"
            className={`${All.BtnStyle_3} ${All.FloatRight}`}
          >
            Send
          </Button>
        </Box>
      </Dialog>
    </>
  )
}
