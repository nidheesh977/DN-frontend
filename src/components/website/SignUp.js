import React, { useRef } from 'react'
import { Helmet } from "react-helmet";
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react';
import 'react-phone-number-input/style.css'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import DronePerson from '../images/drone-person.svg'
import axios from 'axios'
//import DummyImage from '../images/dummy-image.png'
import DroneImg from '../images/UploadFile.svg'
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from 'react-router-dom';


function SignUp() {

  const { register, handleSubmit, errors, watch, control } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const [value, setValue] = useState()
  const [state, setState] = React.useState({
    checkedA: false,
  });
  const history = useHistory();
  const onSubmit = (event) => {

    axios.post('https://demo-nexevo.in/haj/auth-app/public/api/auth/register', {
      name: event.name,

      username: event.username,
      email: event.email,
      phone: value,
      role: 1,
      password: event.password
    }).then(res => {
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('token_type', res.data.token_type);
      history.push("/");
    })
      .catch(error => {
        console.log(error);
      });

  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>


      {errors.name && errors.name.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.name && errors.name.type === "minLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}

      {errors.username && errors.username.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.username && errors.username.type === "minLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a equied feild!</Alert></Snackbar>}

      {errors.email && errors.email.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.email && errors.email.type === "minLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.email && errors.email.message && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}

      {errors.password && errors.password.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}

      {errors.confirmPassword && errors.confirmPassword.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.confirmPassword && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">password does not match</Alert></Snackbar>}

      {errors.phone && errors.phone.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}

      {errors.checkedA && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}


      <section className={All.Register}>
        <Container className={All.Container}>
          <Row>
            <Col lg={6} className={All.DronePerson}>
              <img src={DronePerson} />
            </Col>
            <Col lg={6}>
              <Box pb={3} className={`${All.pt_sm} ${All.pt_xs} ${All.pt_md}`}>
                <h2>Sign Up with Drone Zone</h2>
              </Box>
              <form className={All.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="name">Name</label>
                  <input type="text" name="name" className={All.FormControl} id="name" ref={register({ required: true, minLength: 2 })} />

                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="username">User Name</label>
                  <input type="text" name="username" className={All.FormControl} id="username" ref={register({ required: true, minLength: 2 })} />
                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="email">Email ID</label>
                  <input type="email" className={All.FormControl} id="email" name="email" ref={register({ required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email address" } })} />
                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="phone">Phone Number <span className={All.FSize_12}>(with country code)</span></label>
                  <PhoneInput className={All.Phonenumber} name="phone" id="phone" value={value} onChange={setValue} />
                </div>
                <Box pb={2} className={`${All.Width_76} ${All.Width_100} ${All.shipping_txt} `} textAlign="right" pl={0}><span textAlign="right" className={All.FSize_12}>Only for shipping process</span></Box>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="password">Password</label>
                  <input name="password" type="password" name="password" className={All.FormControl} id="password" ref={register({ required: "You must specify a password", minLength: { value: 8, message: "Password must have at least 8 characters" } })} />
                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="confirmPassword">Confirm Password</label>
                  <input type="password" name="confirmPassword" className={All.FormControl} id="confirmPassword" ref={register({ validate: value => value === password.current || "The passwords do not match" })} />
                </div>

                <div className={All.FormGroup}>
                  <FormControlLabel className={`${All.Width_82} ${All.FSize_14} ${All.Width_100} ${All.Checkbox}`} control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" inputRef={register} />} label="Creating an account means you’re okay with our Terms of Service, Privacy Policy, and our default Notification Settings." />
                </div>

                <div className={All.FormGroup}>
                  <Box pb={3} pt={6}>
                    <Button variant="contained" color="default" onClick={handleClick} type="submit" className={All.BtnStyle_5}>
                      <img style={{ paddingRight: 10 }} src={DroneImg} />
                      Submit</Button>
                  </Box>
                </div>

              </form>
            </Col>
          </Row>
        </Container>
      </section>


    </>
  )
}

export default SignUp
