import React, { useEffect, useRef, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Visible } from "react-grid-system";
import All from "../website/All.module.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import "react-phone-number-input/style.css";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import DronePerson from "../images/drone_person_new.png";
import axios from "axios";
//import DummyImage from '../images/dummy-image.png'
import DroneImg from "../images/drone-img.svg";
import Box from "@material-ui/core/Box";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from "react-router-dom";
import Loader from "../Loader/loader";
import swal from "sweetalert";
import VisibilityIcon from "@material-ui/icons/Visibility";
import invisible from "../images/invisible (2).png";
import Dialog from "@material-ui/core/Dialog";
import Close from "../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import "../css/Signup.css"
import Countries from "../../apis/country.json"

const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
function SignUp(props) {
  let [test, setTest] = useState([])

 

  
    const [value1, setValue1] = useState('')
    // const options = useMemo(() => countryList().getData(), [])
  const [codes, setCodes] = useState([])
  const [code, setCode] = useState('')
    const changeHandler1 = value => {
      setValue1(value)
      console.log(value)

      setFormValues({
        ...formValues,
        ["country"]: value.label,
      });

      console.log(formValues)

      var result= codes.filter(obj=> obj.code == value.value);
console.log(result[0].dial_code);
setCode(result[0].dial_code);
    }
    useEffect(() => {
      console.log(Countries)
    //   axios.get(`https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json`).then(
    //     (response) => {
    // console.log(response.data)       
    // const data = response.data
    
    const options = Countries.map(d => ({
      "value" : d.code,
      "label" : d.name
    
    }))
    setTest(options)
    setCodes(Countries) 
    // }
    //   );
    }, []);

   
  const { register, handleSubmit, errors, watch, control } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const [value, setValue] = useState("+91");
  const [viewPassword, setViewPassword] = useState();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [error_msg, setErrorMsg] = useState("");
  const [dob, setDob] = useState(new Date());
  const [serverError, setServerError] = useState(false);
  const [accept_conditions, setAccept_conditions] = useState(false)

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();
  const onSubmit = (event) => {
    if (value) {
      if(accept_conditions){

        setLoading(true);
  
        axios
          .post(`${domain}/api/user/checkMail`, { email: formValues.email })
          .then((res) => {
            setLoading(true);
            axios
                .post(
                  `${domain}/api/user/register`,
                  {
                    name: formValues.name,
                    email: formValues.email,
                    phoneNo: formValues.phone,
                    password: formValues.password,
                    country: formValues.country,
                  }              )
                .then((res) => {
                 
                  console.log(res);
                  localStorage.setItem("access_token", res.data.token);
                  localStorage.setItem("token_type", "Bearer");
                  localStorage.setItem("role", res.data.role);
                  localStorage.setItem("email", res.data.verify);
                  console.log(localStorage.getItem("access_token"));
                  setLoading(false);
                  props.updateLoginStatus()
                  history.push("/verify-email")
                })
                .catch((err) => {
                 console.log(err)
                 setLoading(false);
                });
              
          })
          .catch((err) => {
            console.log(err.response);
            try {
              if (err.response.data === "User already exists") {
                setLoading(false);
  
                document.getElementById("email_error").innerText =
                  "Email ID already taken";
                document.getElementById("email_error").style.display = "contents";
                document.getElementById("email").focus();
              } else {
                serverError(true);
                setLoading(false);
              }
            } catch {
              setServerError(true);
              setLoading(false);
            }
          });
      }
      else{
        alert("Accept terms and conditions to sign up.")
      }
    } else {
      setError(true);
      setErrorMsg("Phone number is required");
    }
  };

  const PasswordShow = () => {
    setViewPassword(!viewPassword);
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
   
  };
  const customStyles = {
    container: provided => ({
      ...provided,
height: 50,
})
  };
  const [open, setOpen] = React.useState(false);

  const changeHandler = (e) => {
    if (e.target.name!=="phone"){
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
      document.getElementById(e.target.name + "_error").style.display = "none";
    }
    else{
      try{
        if (Number(e.target.value.slice(code.length+1,10+code.length+1)) || e.target.value.slice(code.length+1,10+code.length+1) === ""){
          setFormValues({
            ...formValues,
            ["phone"]: e.target.value.slice(code.length+1,10+code.length+1),
          });
          document.getElementById(e.target.name + "_error").style.display = "none";
        }
      }
      catch{
        console.log("Not number")
      }
    }

    if (e.target.name === "name") {
      if (e.target.value.length > 100) {
        console.log(e.target.value.length);
        document.getElementById(`name_error`).innerText =
          "Name should not exceed 100 characters";
        document.getElementById(`name_error`).style.display = "contents";
        document.getElementById("name").focus();
      }
    }

    if (e.target.name === "email") {
      document.getElementById("email").innerText = "Email ID is required";
    }
  };

  const phoneChangeHandler = (e) => {
    document.getElementById(`phone_error`).style.display = "none";
    try {
      if (e.length >= 1) {
        setFormValues({
          ...formValues,
          phone: e,
        });
      } else {
        setFormValues({
          ...formValues,
          phone: "",
        });
      }
    } catch {
      setFormValues({
        ...formValues,
        phone: "",
      });
    }
  };

  const handleClick = () => {
    const raiseError = (id, msg) => {
      document.getElementById(`${id}_error`).innerText = msg;
      document.getElementById(`${id}_error`).style.display = "contents";
      if (id === "phone") {
        document.getElementById("phone").focus();
      }
    };

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (
      formValues.name === "" ||
      formValues.name.length < 2 ||
      formValues.name.length > 100
    ) {
      if (formValues.name === "") {
        raiseError("name", "Name is required");
      } else if (formValues.name.length < 2) {
        raiseError("name", "Name must have atleast 2 characters");
      } else if (formValues.name.length > 100) {
        raiseError("name", "Name should not exceed 100 characters");
      }
    }
    
    if (formValues.email === "" || !validateEmail(formValues.email)) {
      if (formValues.email === "") {
        raiseError("email", "Email ID is required");
      } else {
        raiseError("email", "Email ID is not valid");
      }
    }

    if (
      formValues.phone === "" ||
      formValues.phone.length < 10 ||
      formValues.phone.length > 13
    ) {
      if (formValues.phone === "") {
        raiseError("phone", "Phone number is required");
      } else if (formValues.phone.length < 10) {
        raiseError("phone", "Phone number must have atleast 10 characters");
      } else if (formValues.phone.length > 13) {
        raiseError("phone", "Phone number should not exceed 13 characters");
      }
    }


    if (formValues.password === "" || formValues.password.length < 8) {
      if (formValues.password === "") {
        raiseError("password", "Password is required");
      } else {
        raiseError("password", "Password must have atleast 8 characters");
      }
    }

   

    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setError(false);
    setErrorMsg("");
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>

      <section className={All.Register}>
        <Container
          className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}
        >
          <Row>
            <Visible xxl xl lg>
              <Col
                lg={6}
                className={All.DronePerson}
                style={{ marginTop: "50px" }}
              >
                <img src={DronePerson} />
              </Col>
            </Visible>
            <Col lg={6}>
              <Box pb={3} className={`${All.pt_sm} ${All.pt_xs} ${All.pt_md}`}>
                <h2>Create an account</h2>
              </Box>
              <form className={All.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={All.FormGroup}>
                  <label className={All.Bold + " form_label"} htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className={All.FormControl}
                    id="name"
                    ref={register({
                      required: true,
                      minLength: 2,
                      maxLength: 100,
                    })}
                    onChange={changeHandler}
                  />
                  <div className="login_input_error_msg" id="name_error">
                    Name is required
                  </div>
                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold + " form_label"} for="email">
                    Email ID{" "}
                  </label>
                  <input
                    type="text"
                    className={All.FormControl}
                    id="email"
                    name="email"
                    ref={register({
                      required: true,
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                        message: "invalid email address",
                      },
                    })}
                    onChange={changeHandler}
                  />
                  <div className="login_input_error_msg" id="email_error">
                    Email ID is required
                  </div>
                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold + " form_label"} for="country">
                    Select Country{" "}
                  </label>
                  <div className="react-select-dropdown">
                <Select  styles={customStyles}
   options={test} value={value1} onChange={changeHandler1} />

                </div>
                </div>
             
                <div className={All.FormGroup}>
                  <label className={All.Bold + " form_label"} for="phone">
                    Phone Number{" "}
                  </label>
                  {/* <PhoneInput defaultCountry="IN" className={All.Phonenumber} name="phone" id="phone" value={value} onChange={setValue}/> */}
                  <input
                    type="text"
                    name="phone"
                    className={All.FormControl}
                    id="phone"
                    value={`${code} ${formValues.phone}`}
                    ref={register({
                      required: true,
                      minLength: 10,
                      // maxLength: 13,
                    })}
                    onChange={changeHandler}
                    autoComplete = {false}
                  />
                  <div className="login_input_error_msg" id="phone_error">
                    Phone number is required
                  </div>
                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold + " form_label"} for="password">
                    Create Password{" "}
                  </label>
                  <div className={`${All.Positionrelative} ${All.DisplayFlex}`}>
                    <input
                      name="password"
                      type="password"
                      className={All.FormControl}
                      id="password"
                      ref={register({
                        required: "You must specify a password",
                        minLength: {
                          value: 8,
                          message: "Password must have at least 8 characters",
                        },
                      })}
                      onChange={changeHandler}
                    />
                    {viewPassword ? (
                      <VisibilityIcon
                        className={All.VisibilityIcon}
                        onClick={PasswordShow}
                      />
                    ) : (
                      <img
                        src={invisible}
                        className={All.VisibilityIcon}
                        onClick={PasswordShow}
                        style={{ padding: "2px 1px 0px 0px" }}
                      />
                    )}
                  </div>
                  <div className="login_input_error_msg" id="password_error">
                    Password is required
                  </div>
                </div>
               
                <label><input type = "checkbox" onClick = {()=>setAccept_conditions(!accept_conditions)}/> Accept terms and conditions</label>
                <div className={All.FormGroup}>
                  <Box pb={3} pt={6}>
                    {isLoading ? (
                      <>
                        <Button
                          variant="contained"
                          color="default"
                          type="submit"
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
                          type="submit"
                          onClick={handleClick}
                          className={All.BtnStyle_5}
                        >
                          Submit
                        </Button>
                      </>
                    )}
                  </Box>
                </div>
              </form>
            </Col>
          </Row>
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
}

export default SignUp;
