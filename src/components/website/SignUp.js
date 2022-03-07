import React, { useEffect, useRef } from 'react'
import { Helmet } from "react-helmet";
import { Container, Row, Col, Visible } from 'react-grid-system';
import All from '../website/All.module.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react';
import 'react-phone-number-input/style.css'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import DronePerson from '../images/drone_person_new.png'
import axios from 'axios'
//import DummyImage from '../images/dummy-image.png'
import DroneImg from '../images/drone-img.svg'
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from 'react-router-dom';
import Loader from '../Loader/loader' 
import swal from 'sweetalert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import invisible from '../images/invisible (2).png'


function SignUp(props) {

  const { register, handleSubmit, errors, watch, control} = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const [value, setValue] = useState("+91")
  const [viewPassword, setViewPassword] = useState()
  
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [error_msg, setErrorMsg] = useState("");

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "+91",
    password: "",
    confirmPassword: ""
  })

  const history = useHistory();
  const onSubmit = (event) => {
    //   axios.post("https://demo-nexevo.in/haj/auth-app/public/api/emailcheck", {email: event.email})
    //   .then(res => {
    //     if (res.data.message == "Email Available!"){
    //       setLoading(true);
    //       axios.post('https://demo-nexevo.in/haj/auth-app/public/api/auth/register', {
    //         name: event.name,
    //         email: event.email,
    //         phone: value,
    //         password: event.password
    //       }).then(res => {
    //         try{
    //           if (res.data.token_type == "Bearer"){
    //             swal('Register Successfull', {
    //               icon: "success",
    //             });
    //             setLoading(false);
    //             localStorage.setItem('access_token', res.data.access_token);
    //             localStorage.setItem('token_type', res.data.token_type);
    //             history.push("/Profile");
    //           }
    //           else{
    //             try{
    //               setError(true)
    //               setErrorMsg(res.data.message.phone[0])
    //             }

    //             catch(err){
    //               setLoading(false);  
    //               swal("Some error occured on the server. We will fix it soon.", {
    //                 icon: "error",
    //               });
    //             }
    //           }
    //         }
    //         catch{
    //           setLoading(false);  
    //             swal("Some error occured on the server. We will fix it soon.", {
    //               icon: "error",
    //             });
    //         }
            
    //       })
    //     }
    //     else{
    //       setError(true)
    //       setErrorMsg(res.data.message)
    //     }
    //   })

    // setLoading(false);  
 


    if (value){

      props.history.push({
        pathname: "/select_category",
        state: {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          password: formValues.password,
        }
      })
    }else{
      setError(true)
      setErrorMsg("Phone number is required")
    }
    
    }  

        const PasswordShow = () => {
          setViewPassword(!viewPassword)
          var x = document.getElementById("password"); 
          if (x.type === "password") {
            x.type = "text";
          } else {
            x.type = "password";
          }
          var y = document.getElementById("confirmPassword"); 
          if (y.type === "password") {
            y.type = "text";
          } else {
            y.type = "password";
          }
        };

    
  const [open, setOpen] = React.useState(false);

  const changeHandler = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
    document.getElementById(e.target.name+"_error").style.display = "none"
  }

  const phoneChangeHandler = (e) => {
    document.getElementById(`phone_error`).style.display = "none"
    try{
      if(e.length>=1){
        setFormValues({
          ...formValues,
          phone: e
        })
      }
      else{
        setFormValues({
          ...formValues,
          phone: ""
        })
      }
    }
    catch{
      setFormValues({
        ...formValues,
        phone: ""
      })
    }
  }

  const handleClick = () => {
    const raiseError = (id, msg) => {
      document.getElementById(`${id}_error`).innerText = msg
      document.getElementById(`${id}_error`).style.display = "contents"
      if(id === "phone"){
        document.getElementById("phone").focus()
      }
    }

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (formValues.name === "" || formValues.name.length < 2){
      if (formValues.name === ""){
        raiseError("name", "Name is required")
      }
      else{
        raiseError("name", "Name must have atleast 2 characters")
      }
    }

    else if (formValues.email === "" || !validateEmail(formValues.email)){
      if (formValues.email === ""){
        raiseError("email", "Email ID is required")
      }
      else{
        raiseError("email", "Email ID is not valid")
      }
    }

    else if (formValues.phone === "" || formValues.phone.length <= 7){
      if (formValues.phone === ""){
        raiseError("phone", "Phone number is required")
      }
      else{
        raiseError("phone", "Phone number is not valid")
      }
    }

    else if (formValues.password === "" || formValues.password.length < 8){
      if (formValues.password === ""){
        raiseError("password", "Password is required")
      }
      else{
        raiseError("password", "Password must have atleast 8 characters")
      }
    }

    else if (formValues.password!==formValues.confirmPassword){
      raiseError("confirmPassword", "Password doesn't match")
    }

    setOpen(true);
   
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } 
    setOpen(false);
    setError(false)
    setErrorMsg("")
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>

      <section className={All.Register}>
      <Container className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}>
          <Row>
            <Visible xxl xl lg>
              <Col lg={6} className={All.DronePerson} style = {{marginTop: "50px"}}>
                <img src={DronePerson} />
              </Col>
            </Visible>
            <Col lg={6}>
              <Box pb={3} className={`${All.pt_sm} ${All.pt_xs} ${All.pt_md}`}>
                <h2>Sign Up</h2>
              </Box>
              <form className={All.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={All.FormGroup}>
                  <label className={All.Bold + " form_label"} htmlFor="name">Name</label>
                  <input type="text" name="name" className={All.FormControl} id="name" ref={register({ required: true, minLength: 2 })} onChange = {changeHandler}/>
                  <div className="login_input_error_msg" id = "name_error">Name is required</div>
                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold + " form_label"} for="email">Email ID </label>
                  <input type="text" className={All.FormControl} id="email" name="email" ref={register({ required: true, pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i, message: "invalid email address" } })} onChange = {changeHandler} />
                  <div className="login_input_error_msg" id = "email_error">Email ID is required</div>
                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold + " form_label"} for="phone">Phone Number <span className={All.FSize_12}>(with country code)</span></label>
                  {/* <PhoneInput defaultCountry="IN" className={All.Phonenumber} name="phone" id="phone" value={value} onChange={setValue}/> */}
                  <PhoneInput defaultCountry="IN" className={All.Phonenumber} name="phone" id="phone" value={formValues.phone}  onChange={phoneChangeHandler} />
                  <div className="login_input_error_msg" id = "phone_error">Phone number is required</div>
                </div>

                <Box pb={2} className={`${All.Width_76} ${All.shipping_txt} `} textAlign="right" pl={0}><span textAlign="right" className={All.FSize_12}></span></Box>
                <div className={All.FormGroup}>
                  <label className={All.Bold + " form_label"} for="password">Create Password </label>
                  <div className={`${All.Positionrelative} ${All.DisplayFlex}`}>
                  <input name="password" type="password" className={All.FormControl} id="password" ref={register({ required: "You must specify a password", minLength: { value: 8, message: "Password must have at least 8 characters" } })} onChange = {changeHandler} />
                  {viewPassword?<VisibilityIcon  className={All.VisibilityIcon} onClick={PasswordShow}/>:<img src = {invisible} className={All.VisibilityIcon} onClick={PasswordShow} style = {{padding: "2px 1px 0px 0px"}}/>}
             </div>
                  <div className="login_input_error_msg" id = "password_error">Password is required</div>

                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold + " form_label"} for="confirmPassword">Confirm Password </label>
                  <div className={`${All.Positionrelative} ${All.DisplayFlex}`}>
                  <input type="password" name="confirmPassword" className={All.FormControl} id="confirmPassword" ref={register({ validate: value => value === password.current || "The passwords do not match", required: "You must specify a password" })} onChange = {changeHandler} />
                  {viewPassword?<VisibilityIcon  className={All.VisibilityIcon} onClick={PasswordShow}/>:<img src = {invisible} className={All.VisibilityIcon} onClick={PasswordShow} style = {{padding: "2px 1px 0px 0px"}}/>}
             </div>
                  <div className="login_input_error_msg" id = "confirmPassword_error">Confirm password is required</div>
                </div>

                <div className={All.FormGroup}>
                <Box pb={3} pt={6}>
                {isLoading ? ( <>
                  <Button variant="contained" color="default" type="submit" className={All.LoaderBtn}>
                  <Loader /> Loading</Button>
                 </> ) : ( <>
                  <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.BtnStyle_5} >
                  {/* <Button variant="contained" color="default" type="submit" className={All.BtnStyle_5}> */}
                   Submit</Button>
                 </> )}
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