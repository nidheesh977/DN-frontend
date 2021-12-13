import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import 'react-phone-number-input/style.css'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import DronePerson from '../images/drone-person.svg'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import DroneImg from '../images/drone-img.svg'
import Loader from '../Loader/loader'
import swal from 'sweetalert'; 
import VisibilityIcon from '@material-ui/icons/Visibility';

import { authenticationService } from '../../middleware/auth';
import { trackWindowScroll } from 'react-lazy-load-image-component';


const PasswordShow = () => {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};

 const Login = props => {
  function refreshPage() { 
    window.location.reload(false);
  }
 
        if (authenticationService.currentUserValue) {
          props.history.push('/');
          console.log("Redirected to homepage")
      }  
 
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = useState(false);


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } 
    setOpen(false);
  };

  const [user, setUser] = useState({ email: "" });
  const history = useHistory(); 

  // const [error, setError] = useState(false); 

  // const [LoginError, setTestLoginError] = useState(); 

  const onSubmit = (event) => { 
    setLoading(true); 
    var element = document.getElementById("myDIV");
    element.className = element.className.replace(/\bmystyle\b/g, "");   
    axios.post('http://localhost/auth-app/public/api/auth/login', {
      email: event.email,
      password: event.password
    }).then(res => {  
      setLoading(false); 
      // login(props, event); 
      authenticationService.login(props, event)
      swal('Login Successful', {
        icon: "success",
      });
    })
      .catch(error => {
        swal(error.response.data.message, {
          icon: "error",
        });
        setLoading(false);  
        // setError(true);
        // setErrorMessage(error.response.data.message);  
        // setTestLoginError(error.response.data.message)  
      }); 
  }; 
  
  const { register, handleSubmit, errors } = useForm();

  const [value, setValue] = useState()
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  }; 

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>
 
      {/* {
        error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">{LoginError}!</Alert></Snackbar>
      } */}
 
      <Snackbar id="myDIV" className={All.DisplayNone} open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="success">Success!</Alert></Snackbar>
      {errors.password && errors.password.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a password feild!</Alert></Snackbar>}
      {errors.email && errors.email.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.email && errors.email.type === "minLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}

      <section className={All.Signup}>
        <Container className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}>
          <Row>
            <Col lg={6} className={All.DronePerson}>
              <img src={DronePerson} />
            </Col>
            <Col lg={6} className={All.Login}>
              <Box pb={3}>
                <h2>Login with Drone Zone</h2>
              </Box>
              <form className={All.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Email ID:</label>
                  <input type="email" name="email" className={All.FormControl} id="usr" ref={register({ required: true })} />
                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Password:</label>
                <div className={`${All.Positionrelative} ${All.DisplayFlex}`}>
                <input type="password" name="password" className={All.password} id="password" ref={register({ required: true })} />
                      <VisibilityIcon  className={All.VisibilityIcon} onClick={PasswordShow}/> 
                </div>
                <div className={All.FormGroup}>
                  <Link to="/ForgotPassword" className={All.Black}>
                    <Box className={`${All.Width_74} ${All.Width_100}`} textAlign="right" ><span textAlign="right" className={`${All.FSize_12} ${All.MuliLight}`}>Forgot Password</span></Box>
                  </Link>
                </div>

                </div>
                <div className={All.FormGroup}> 
                 {isLoading ? ( <>
                  <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.LoaderBtn}>
                  <Loader /> Loading</Button>
                 </> ) : ( <>
                  <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.BtnStyle_5}>
                  <img style={{ paddingRight: 10 }} src={DroneImg} /> submit</Button>
                 </> )}


                </div>

                <div className={All.FormGroup}>
                  <p>Don't have Drone Zone Account? <Link to="/User" className={All.D_Block_xs}> <span className={All.LightBlue}>Register Here</span></Link></p>
                </div> 

              </form>
            </Col>
          </Row>
        </Container>
      </section> 
    </>
  )
}


export default Login