import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import All from '../website/All.module.css'
import 'react-phone-number-input/style.css'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link} from 'react-router-dom';
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
  let history = useHistory();

  const [isLoading, setLoading] = useState(false);
  var [email, setEmail] = useState("")
  var [password, setPassword] = useState("")


  const handleClick = () => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    if (email === ""){
      document.getElementById("email_error").innerText = "Email ID is required"
      document.getElementById("email_error").style.display = "contents"
      document.getElementById("email").focus()
    }
    else if (!validateEmail(email)){
      document.getElementById("email_error").innerText = "Email ID is not valid"
      document.getElementById("email_error").style.display = "contents"
      document.getElementById("email").focus()
    }
    else if (password === ""){
      document.getElementById("password_error").style.display = "contents"
      document.getElementById("password").focus()
    }
    else{
      alert("Logged In")
      axios.post("http://localhost:9000/api/user/login", {
      
        email: email,
        password: password,
      }).then((res) => {
  // alert("successful") 
              localStorage.setItem('access_token', res.data.token);
              localStorage.setItem('token_type', "Bearer");
              history.push("/")
              window.location.reload();
              console.log(localStorage.getItem("access_token"))
              console.log(res);

              
      })

        }
  };

  const handleChange = (e) => {
    document.getElementById(`${e.target.id}_error`).style.display = "none"
    if (e.target.name === "email"){
      setEmail(e.target.value)
    }
    else if (e.target.name === "password"){
      setPassword(e.target.value)
    }
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>


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
              <form className={All.form}>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="email">Email ID:</label>
                  <input type="email" name="email" className={All.FormControl} id="email" value = {email} onChange = {handleChange}/>
                  <div className="login_input_error_msg" id = "email_error">Email ID is required</div>
                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="password">Password:</label>
                  <div className={`${All.Positionrelative} ${All.DisplayFlex}`}>
                    <input type="password" name="password" className={All.password} id="password" value = {password} onChange = {handleChange}/>
                    <VisibilityIcon className={All.VisibilityIcon} onClick={PasswordShow} />
                  </div>
                  <div className={All.FormGroup}>
                    <Link to="/ForgotPassword" className={All.Black}>
                      <Box className={`${All.Width_74}`} style = {{textAlign: "right", width: "100% !important"}}><span className={`${All.FSize_12} ${All.MuliLight}`}>Forgot Password</span></Box>
                    </Link>
                  </div>
                  <div className="login_input_error_msg" id = "password_error">Password is required</div>

                </div>
                <div className={All.FormGroup}>
                  {isLoading ? (<>
                    <Button variant="contained" color="default" type="submit" className={All.LoaderBtn}>
                      <Loader /> Loading</Button>
                  </>) : (<>
                    <Button variant="contained" color="default" type="button" onClick={handleClick} className={All.BtnStyle_5} style = {{fontFamily: "muli-bold!important"}}>Login</Button>
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