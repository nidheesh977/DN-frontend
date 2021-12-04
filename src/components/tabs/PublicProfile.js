import React from 'react'
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form";
import { Container, Row, Col } from 'react-grid-system';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Profile from '../ProfileImg/Profile'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Rolling from '../images/loading.svg'
import DroneImg from '../images/drone-img.svg'
import swal from 'sweetalert';
import Loader from '../Loader/loader'
import { userService } from '../_services/user.service';

export default function PublicProfile() {
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    userService.User().then(res => {
      setUser(res.data)
    },
      err => {
        console.log(err);
      }
    )

    userService.Profile().then(res => {
      setProfile(res.data)
    },
      err => {
        console.log(err);
      }
    )

  }, [])

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [LoginError, setTestLoginError] = useState();

  const onSubmit = (event) => {

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }
    axios.post('http://localhost/auth-app/public/api/auth/updateprofile', {
      name: event.name,
      profession: event.profession,
      bio: event.bio,
      portfolio_url: event.portfolio_url,
      password_url: event.portfolio_password,
      location: event.location,
      country: event.country,
    }, config).then(res => {
      swal(res.data.message, {
        icon: "success",
      });
    })
      .catch(error => {
        swal(error.data.message, {
          icon: "error",
        });
      });
  }
  // const load

  const { register, handleSubmit, errors, watch, control } = useForm();

  const [value, setValue] = useState()
  const [state, setState] = React.useState({
    checkedA: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
    <>

      {
        error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">{LoginError}!</Alert></Snackbar>
      }

      {errors.portfolio_url && errors.portfolio_url.message && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Invalid Url Portfolio URL</Alert></Snackbar>}
      {errors.portfolio_password && errors.portfolio_password.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.name && errors.name.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.profession && errors.profession.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.bio && errors.bio.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.location && errors.location.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.country && errors.country.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.portfolio_url && errors.portfolio_url.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.bio && errors.bio.type === "maxLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">The bio may not be greater than 500 characters.</Alert></Snackbar>}


      <section className={` ${All.PublicProfile} ${All.PublicProfileEdit} `}>
        <Container className={All.Container}>
          <Row className={All.ProfileContainer}>
            <Col lg={12}>
              <form className={All.form} onSubmit={handleSubmit(onSubmit)} >
                <div className={`${All.FormGroup} ${All.marginbottom} ${All.pb_xs_50} ${All.PublicProfileEditIcon}`}>
                  <Profile />
                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Name:</label>
                  <input type="text" name="name" className={All.FormControl} id="usr" defaultValue={user.name} ref={register({ required: true })} />

                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Profession:</label>
                  <input type="text" name="profession" className={All.FormControl} id="usr" defaultValue={user.profession} ref={register({ required: true })} />

                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Bio:</label>
                  <textarea name="bio" placeholder="Maximum 50 words..." className={`${All.FormControl} ${All.officePublic}`} rows="4" cols="50" id="usr" form="usrform" defaultValue={profile.bio} ref={register({ required: true, maxLength: 500 })}></textarea>
                  <p>Brief description for your profile. URLs are hyperlinked.</p>
                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Location:</label>
                  <input placeholder="Bangalore" type="text" name="location" className={All.FormControl} defaultValue={user.location} id="usr" ref={register({ required: true })} />

                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Country:</label>
                  <input placeholder="India" type="text" name="country" className={All.FormControl} id="usr" defaultValue={user.country} ref={register({ required: true })} />

                </div>

                <Box pt={6} pb={3}>
                  <h6 className={All.paddingbottom}>Online Presence</h6>
                  <Divider />
                </Box>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Portfolio URL:</label>
                  <input type="text" name="portfolio_url" className={All.FormControl} id="usr" defaultValue={profile.portfolio_url} ref={register({ required: true, pattern: { value: /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/i, message: "Invalid Url" } })} />

                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Portfolio Password:</label>
                  <input type="password" name="portfolio_password" className={All.FormControl} id="usr" defaultValue={profile.password_url} ref={register({ required: true })} />

                </div>


                <Box pt={4} className={` ${All.FormGroup} ${All.marginbottom_60}`}>

                  {isLoading ? (<>
                    <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.LoaderBtn}>
                      <Loader /> Loading</Button>
                  </>) : (<>
                    <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.BtnStyle_5}>
                      submit</Button>
                  </>)}


                </Box>
              </form>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  )
}
