import React from 'react'
import { Helmet } from "react-helmet";
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import OfficeProfileTabs from '../tabs/OfficeProfile'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ProfileImg from '../ProfileImg/Profile'
import CoverImg from '../ProfileCoverImg/ProfileCoverImg'
import { useState, useEffect } from 'react';
import { userService } from '../_services/user.service';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
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

export default function OfficeProfile() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [Subscriptioncheck, setSubscriptioncheck] = useState([]);


  useEffect(() => {

    userService.User().then(res => {
      setUser(res.data);
      // console.log(res);
    },
      err => {
        console.log(err);
      }
    )

    userService.Subscriptioncheck().then(res => {
      setSubscriptioncheck(res.data);
      // console.log(res);
    },
      err => {
        console.log(err);
      }
    )


    userService.Profile().then(res => {
      setProfile(res.data);
      // console.log(res);
    },
      err => {
        console.log(err);
      }
    )

  }, []);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>

      <section className={` ${All.Profile} ${All.Hireprofile}`}>
        <Container className={All.Container}>
          <Row>
            <Col md={6} className={`${All.Order_xs_2} ${All.Order_sm_2} ${All.pr_xs_30} ${All.pl_xs_30}`}>
              <Box py={1} display="flex" className={`${All.D_Block_sm} ${All.D_Block_xs}`}>
                <Box pr={5}><ProfileImg /> </Box>
                <Box mt={5} className={`${All.textAlign_xs} ${All.textAlign_sm} ${All.pt_xs_50} ${All.pt_xs_50} ${All.pt_sm_50}`}>
                  <Link to="/OfficeProfileEdit">
                    <Button className={`${All.BtnStyle_8} ${All.Btn_12} ${All.mr_sm_auto} ${All.mr_xs_auto}`}>Edit</Button>
                  </Link>
                </Box>
              </Box>

              <Box py={1}>
                <h2>{user.company_name}</h2>
              </Box>
              <Box py={1}>
                <h1>{user.profession}</h1>
              </Box>
              <Box py={1}>
                <h4>{user.location} {user.country}</h4>
              </Box>

              <Box py={4}>
                <h5 style={{ color: "gray" }}>Dolore in esse mollit adipisicing cupidatat Lorem.</h5>
              </Box>

              <Box >
                <Button ml={2} variant="contained" color="default" className={All.BtnStyle_11}>
                  Post a Job - as $200/month</Button><span className={`${All.Gray} ${All.FSize_13} ${All.paddingleft} ${All.pt_sm} ${All.pt_xs} ${All.pt_md} ${All.D_Block_xs} ${All.D_Block_sm} ${All.D_Block_md} ${All.D_Block_lg}`}>{Subscriptioncheck.message}</span>
              </Box>

            </Col>
            <Col md={6} className={`${All.Order_xs_1} ${All.Order_sm_1}  ${All.coverImg} ${All.pr_xs_30} ${All.pl_xs_30}`}>
              <CoverImg />
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col>
              <OfficeProfileTabs Postsubscription={Subscriptioncheck} />
            </Col>
          </Row>
        </Container>
      </section>

      <Dialog className={All.HireMeModel} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>

        <DialogContent>
          <Typography gutterBottom>
            <div className={All.FormGroup}>
              <label className={All.Bold} for="usr">Email ID:</label>
              <input type="email" name="email" className={All.FormControl} id="usr" />
            </div>
          </Typography>
        </DialogContent>

        <DialogTitle id="scroll-dialog-title">
          <Button autoFocus onClick={handleClose} ml={2} variant="contained" color="default" className={All.BtnStyle_3}>
            Close
          </Button>
        </DialogTitle>
      </Dialog>


    </>
  )
}