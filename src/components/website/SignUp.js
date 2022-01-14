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
  const [value, setValue] = useState()
  const [viewPassword, setViewPassword] = useState()
  const [state, setState] = React.useState({
    checkedA: false,
  });
  
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [error_msg, setErrorMsg] = useState("");

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
          name: event.name,
          email: event.email,
          phone: value,
          password: event.password
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

  const handleClick = () => {
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
 
      {
        error && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}><Alert  variant="filled" onClose={handleClose} severity="error">{error_msg}</Alert></Snackbar>
      }

      {errors.confirmPassword && !errors.name && !errors.email && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">password does not match</Alert></Snackbar>}
      {errors.confirmPassword && errors.confirmPassword.type === "required" && !errors.name && !errors.email && !errors.password && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Confirm password is required!</Alert></Snackbar>}

      {errors.password && errors.password.message && !errors.name && !errors.email && !errors.confirmPassword && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Password must have at least 8 characters</Alert></Snackbar>}

      {errors.password && errors.password.type === "required" && !errors.name && !errors.email && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Password is required!</Alert></Snackbar>}
      {errors.phone && !errors.name && !errors.email && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Phone number is required!</Alert></Snackbar>}
      {errors.phone && !errors.name && !errors.email && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Phone number is required!</Alert></Snackbar>}
      {errors.email && errors.email.type === "required" && !errors.name && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Email ID is required!</Alert></Snackbar>}
      {errors.email && errors.email.type === "minLength" && !errors.name && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Enter valid email id</Alert></Snackbar>}
      {errors.email && errors.email.message && !errors.name && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Enter valid email id</Alert></Snackbar>}
      {errors.name && errors.name.type === "required" && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Name is a required!</Alert></Snackbar>}
      {errors.name && errors.name.type === "minLength" && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Name must have at least 2 characters</Alert></Snackbar>}

      <section className={All.Register}>
      <Container className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}>
          <Row>
            <Col lg={6} className={All.DronePerson} style = {{marginTop: "50px"}}>
              <img src={DronePerson} />
            </Col>
            <Col lg={6}>
              <Box pb={3} className={`${All.pt_sm} ${All.pt_xs} ${All.pt_md}`}>
                <h2>Sign Up</h2>
              </Box>
              <form className={All.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="name">Name <span className = {All.required_field}>*</span></label>
                  <input type="text" name="name" className={All.FormControl} id="name" ref={register({ required: true, minLength: 2 })}/>

                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="email">Email ID <span className = {All.required_field}>*</span></label>
                  <input type="email" className={All.FormControl} id="email" name="email" ref={register({ required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email address" } })} />
                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="phone">Phone Number <span className={All.FSize_12}>(with country code)</span>  <span className = {All.required_field}>*</span></label>
                  <PhoneInput className={All.Phonenumber} name="phone" id="phone" value={value} onChange={setValue}/>
                </div>

                 
                <Box pb={2} className={`${All.Width_76} ${All.shipping_txt} `} textAlign="right" pl={0}><span textAlign="right" className={All.FSize_12}>Only for shipping process</span></Box>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="password">Create Password <span className = {All.required_field}>*</span></label>
                  <div className={`${All.Positionrelative} ${All.DisplayFlex}`}>
                  <input name="password" type="password" name="password" className={All.FormControl} id="password" ref={register({ required: "You must specify a password", minLength: { value: 8, message: "Password must have at least 8 characters" } })} />
                  {viewPassword?<VisibilityIcon  className={All.VisibilityIcon} onClick={PasswordShow}/>:<img src = {invisible} className={All.VisibilityIcon} onClick={PasswordShow} style = {{padding: "2px 1px 0px 0px"}}/>}
             </div>
               
                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="confirmPassword">Confirm Password <span className = {All.required_field}>*</span></label>
                  <div className={`${All.Positionrelative} ${All.DisplayFlex}`}>
                  <input type="password" name="confirmPassword" className={All.FormControl} id="confirmPassword" ref={register({ validate: value => value === password.current || "The passwords do not match", required: "You must specify a password" })} />
                  {viewPassword?<VisibilityIcon  className={All.VisibilityIcon} onClick={PasswordShow}/>:<img src = {invisible} className={All.VisibilityIcon} onClick={PasswordShow} style = {{padding: "2px 1px 0px 0px"}}/>}
             </div> 
                </div>

                <div className={All.FormGroup}>
                <Box pb={3} pt={6}>
                {isLoading ? ( <>
                  <Button variant="contained" color="default" type="submit" className={All.LoaderBtn}>
                  <Loader /> Loading</Button>
                 </> ) : ( <>
                  <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.BtnStyle_5}>
                  {/* <Button variant="contained" color="default" type="submit" className={All.BtnStyle_5}> */}
                  <img style={{ paddingRight: 10 }} src={DroneImg} /> Submit</Button>
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