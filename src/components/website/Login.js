import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { Container, Row, Col, Hidden } from 'react-grid-system';
import All from '../website/All.module.css'
import 'react-phone-number-input/style.css'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import DronePerson from '../images/drone_person_new.png'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import DroneImg from '../images/drone-img.svg'
import Loader from '../Loader/loader'
import swal from 'sweetalert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { authenticationService } from '../../middleware/auth';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import "../css/Login.css"

const PasswordShow = () => {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};

const Login = (props) => {
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
    axios.post('https://demo-nexevo.in/haj/auth-app/public/api/auth/login', {
      email: event.email,
      password: event.password
    }).then(res => {
      setLoading(false);
      try{
        if (res.data.token_type == "Bearer"){
          // login(props, event);
          localStorage.setItem('access_token', res.data.access_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
          localStorage.setItem('token_type', res.data.token_type);
          const config = {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
          }
          axios.get('https://demo-nexevo.in/haj/auth-app/public/api/auth/user', config)
          .then(user => {
            try{
              localStorage.setItem('currentUser', JSON.stringify(user.data.role_id));
              swal('Login Successful', {
                icon: "success",
              });
              window.location.reload()
              props.history.push("/")
            }
            catch{
              swal('An error occured on the server. We will fix it soon.', {
                icon: "error",
              });
              localStorage.clear();
            }
          })
        }
        
        else{
          swal(res.data.message, {
            icon: "error",
          });
          setLoading(false);
        }
      }
      catch{
        swal("An error occured on the server. We will fix it soon.", {
          icon: "error",
        });
        setLoading(false);
      }
    })
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

      {/* <Snackbar id="myDIV" className={All.DisplayNone} open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="success">Success!</Alert></Snackbar>
      {errors.password && errors.password.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a required feild!</Alert></Snackbar>}
      {errors.email && errors.email.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.email && errors.email.type === "minLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} */}

      <section className={All.Signup}>
        <Container className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}>
          <Row>
            <Col lg={6} className={All.DronePerson}>
              <Hidden xs sm md>
                <img src={DronePerson} />
              </Hidden>
            </Col>
            <Col lg={6} className={All.Login}>
              <Box pb={3}>
                <h2>Login with Drone Zone</h2>
              </Box>
              <form className={All.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="email">Email ID:</label>
                  <input type="email" name="email" className={All.FormControl} id="email" ref={register({ required: true })} />
                  <div className="login_input_error_msg" id = "service_center_name_error">Service center name is required</div>
                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="password">Password:</label>
                  <div className={`${All.Positionrelative} ${All.DisplayFlex}`}>
                    <input type="password" name="password" className={All.password} id="password" ref={register({ required: true })} />
                    <VisibilityIcon className={All.VisibilityIcon} onClick={PasswordShow} />
                  </div>
                  <div className={All.FormGroup}>
                    <Link to="/ForgotPassword" className={All.Black}>
                      <Box className={`${All.Width_74}`} style = {{textAlign: "right", width: "100% !important"}}><span className={`${All.FSize_12} ${All.MuliLight}`}>Forgot Password</span></Box>
                    </Link>
                  </div>
                  <div className="login_input_error_msg" id = "service_center_name_error">Password is required</div>

                </div>
                <div className={All.FormGroup}>
                  {isLoading ? (<>
                    <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.LoaderBtn}>
                      <Loader /> Loading</Button>
                  </>) : (<>
                    <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.BtnStyle_5}>
                      <img style={{ paddingRight: 10 }} src={DroneImg} /> Submit</Button>
                  </>)}


                </div>

                <div className={All.FormGroup}>
                  <p>Don't have Drone Zone Account? <Link to="/sign_up" className={All.D_Block_xs}> <span className={All.LightBlue}>Register Here</span></Link></p>
                </div>

              </form>
            </Col>
            <Col lg={6}>
              <Hidden lg xl xxl>
                <img src={DronePerson} width={"80%"}/>
              </Hidden>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Login