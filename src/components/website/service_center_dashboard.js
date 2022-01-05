import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-grid-system";
import All from "../website/All.module.css";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Hirebtn from "../images/hirebtn.svg";
import TabModel from "../tabs/TabModel";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import ProfileImg from "../ProfileImg/Profile";
import CoverImg from "../ProfileCoverImg/ProfileCoverImg";
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

export default function ServiceCenterDashboard(props) {
  const [profile, setProfile] = useState([]);
  const [social, setSocial] = useState([]);
  const [isBusy, setBusy] = useState(false);
  const [hirestatus, setHirestatus] = useState(false);
  const [Reportstatus, setReportstatus] = useState(false);
  const [role_id, setRole_id] = useState([]);
  const id = props.match.params.id;

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
        "https://demo-nexevo.in/haj/auth-app/public/api/auth/hireme",
        {
          user_id: props.match.params.id,
          name: event.name,
          message: event.message,
        },
        config
      )
      .then((response) => {
        swal("Hired successfully", {
          icon: "success",
        });
        setOpen(false);
        setHirestatus(true)
      })
      .catch((error) => {
        try{
          swal(error.response.data.message, {
            icon: "error",
          });
          setOpen(false);
        }
        catch{
          console.log(error.response)
          swal("Something went wrong. We will fix it soon", {
            icon: "error",
          });
          setOpen(false);
        }
      });
  };

  const onSubmitReport = (event) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios.post("https://demo-nexevo.in/haj/auth-app/public/api/auth/reportuser",
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

  return(
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
                  <ProfileImg/>
                </Box>
              </Box>

              <Box py={1}>
                <h2>{"UTV Motion Pictures" || <Skeleton />} </h2>
              </Box>
              <Box py={1}>
                <h1>{"Cinema Productions" || <Skeleton />}</h1>
              </Box>
              <Box py={1}>
                <h4>
                  From India
                </h4>
              </Box>
            </Col>
            <Col
              md={6}
              className={`${All.Order_xs_1} ${All.Order_sm_1}  ${All.coverImg} ${All.pr_xs_30} ${All.pl_xs_30}`}
            >
              <CoverImg/>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
