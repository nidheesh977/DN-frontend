import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Hidden } from "react-grid-system";
import All from "../website/All.module.css";
import "react-phone-number-input/style.css";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import axios from "axios";
import DronePerson from "../images/drone_person_new.png";
import Loader from "../Loader/loader";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "../css/Login.css";
import Dialog from "@material-ui/core/Dialog";
import Close from "../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";

const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

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
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState();
  const [serverError, setServerError] = useState(false);

  const closeLoginPopup = () => {
    setLoginSuccess(false);
    history.push("/");
    window.location.reload();
  };

  useEffect(()=>{
    window.scrollTo(0,0)
  }, [])

  const handleClick = () => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    if (email === "") {
      document.getElementById("email_error").innerText = "Email ID is required";
      document.getElementById("email_error").style.display = "contents";
      document.getElementById("email").focus();
    } else if (!validateEmail(email)) {
      document.getElementById("email_error").innerText =
        "Email ID is not valid";
      document.getElementById("email_error").style.display = "contents";
      document.getElementById("email").focus();
    } else if (password === "") {
      document.getElementById("password_error").style.display = "contents";
      document.getElementById("password").focus();
    } else {
      setLoading(true);
      axios
        .post(`${domain}/api/user/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data.verify);
          localStorage.setItem("access_token", res.data.token);
          localStorage.setItem("token_type", "Bearer");
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("email", res.data.verify);

          props.updateLoginStatus()

          if (res.data.verify === false) {
            history.push("/verify-email");
          } else if (res.data.role === undefined) {
            history.push("/choose-categories");
          } else if(localStorage.getItem("role") === "pilot"){
            history.push("/pilot_dashboard/account/");
          }else if(localStorage.getItem("role") === "service_center"){
            history.push("/center_dashboard/account/");
          }
          else{
            history.push("/booster_dashboard/account/");

          }

          // history.push("/");
          // window.location.reload();
          setLoading(false);
        })
        .catch((err) => {
          // console.log(err.response)
          try {
            if (err.response.status !== 500) {
              console.log(err.response);
              document.getElementById("invalid_credentials").style.display =
                "contents";
              setLoading(false);
            } else {
              setServerError(true);
              setLoading(false);
            }
          } catch {
            setServerError(true);
            setLoading(false);
          }
        });
    }
  };

  const handleChange = (e) => {
    document.getElementById(`${e.target.id}_error`).style.display = "none";
    document.getElementById(`invalid_credentials`).style.display = "none";
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>

      <section className={All.Signup}>
        <Container
          className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}
        >
          <Row>
            <Col lg={6} className={All.DronePerson}>
              <Hidden xs sm md>
                <img src={DronePerson} alt="dronePerson" />
              </Hidden>
            </Col>
            <Col lg={6} className={All.Login}>
              <Box pb={3}>
                <h2>Login with Drone Zone</h2>
              </Box>
              <form className={All.form}>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="email">
                    Email ID:
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={All.FormControl}
                    id="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <div className="login_input_error_msg" id="email_error">
                    Email ID is required
                  </div>
                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="password">
                    Password:
                  </label>
                  <div className={`${All.Positionrelative} ${All.DisplayFlex}`}>
                    <input
                      type="password"
                      name="password"
                      className={All.password}
                      id="password"
                      value={password}
                      onChange={handleChange}
                    />
                    <VisibilityIcon
                      className={All.VisibilityIcon}
                      onClick={PasswordShow}
                    />
                  </div>
                  <div className={All.FormGroup}>
                    <Link to="/ForgotPassword" className={All.Black}>
                      <Box
                        className={`${All.Width_74}`}
                        style={{ textAlign: "right", width: "100% !important" }}
                      >
                        <span className={`${All.FSize_12} ${All.MuliLight}`}>
                          Forgot Password
                        </span>
                      </Box>
                    </Link>
                  </div>
                  <div className="login_input_error_msg" id="password_error">
                    Password is required
                  </div>
                  <div
                    className="login_input_error_msg"
                    id="invalid_credentials"
                  >
                    Invalid credentials
                  </div>
                </div>
                <div className={All.FormGroup}>
                  {isLoading ? (
                    <>
                      <Button
                        variant="contained"
                        color="default"
                        type="button"
                        className={All.LoaderBtn}
                      >
                        <Loader /> Loading
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="default"
                        type="button"
                        onClick={handleClick}
                        className={All.BtnStyle_5}
                        style={{ fontFamily: "muli-bold!important" }}
                      >
                        Login
                      </Button>
                    </>
                  )}
                </div>

                <div className={All.FormGroup}>
                  <p>
                    Don't have Drone Zone Account?{" "}
                    <Link to="/sign_up" className={All.D_Block_xs}>
                      {" "}
                      <span className={All.LightBlue}>Register Here</span>
                    </Link>
                  </p>
                </div>
              </form>
            </Col>
            <Col lg={6}>
              <Hidden lg xl xxl>
                <img src={DronePerson} width={"80%"} alt="dronePerson" />
              </Hidden>
            </Col>
          </Row>
          <Dialog
            open={loginSuccess}
            onClose={closeLoginPopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"md"}
            fullWidth={true}
            PaperProps={{ style: { width: "820px", borderRadius: "10px" } }}
          >
            <DialogContent
              className={All.PopupBody}
              style={{ marginBottom: "50px" }}
            >
              <div style={{ position: "absolute", top: "20px", right: "20px" }}>
                <img
                  src={Close}
                  alt=""
                  onClick={closeLoginPopup}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Row style={{ marginTop: "30px" }}>
                <div className="u_f_popup_title">Logged in successfully</div>
                <div className="u_f_popup_btn_container">
                  <button className="u_f_popup_btn2" onClick={closeLoginPopup}>
                    Go to home page
                  </button>
                </div>
              </Row>
            </DialogContent>
          </Dialog>
          <Dialog
            open={serverError}
            onClose={() => setServerError(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"md"}
            fullWidth={true}
            PaperProps={{ style: { width: "820px", borderRadius: "10px" } }}
          >
            <DialogContent
              className={All.PopupBody}
              style={{ marginBottom: "50px" }}
            >
              <div style={{ position: "absolute", top: "20px", right: "20px" }}>
                <img
                  src={Close}
                  alt=""
                  onClick={() => setServerError(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Row style={{ marginTop: "30px" }}>
                <div className="u_f_popup_title">
                  Something went wrong on the server. Please try again later.
                </div>
                <div className="u_f_popup_btn_container">
                  <button
                    className="u_f_popup_btn2"
                    onClick={() => setServerError(false)}
                  >
                    Close
                  </button>
                </div>
              </Row>
            </DialogContent>
          </Dialog>
        </Container>
      </section>
    </>
  );
};

export default Login;
