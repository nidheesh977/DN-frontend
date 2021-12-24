import React, { useRef } from 'react'
import {Helmet} from "react-helmet"; 
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import Link from '@material-ui/core/Link'; 
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react';
import 'react-phone-number-input/style.css'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'; 
import Button from '@material-ui/core/Button'; 
// import DronePerson from '../images/drone-person.png'

//import DummyImage from '../images/dummy-image.png'
import DroneImg from '../images/UploadFile.svg'
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form"; 
import axios from 'axios'
 

function Register() {
  
  const {register ,handleSubmit, errors, watch ,control  } = useForm();
  const password = useRef({});
  password.current = watch("password", ""); 
   
  const onSubmit = (event) => {
 
    axios.post('https://demo-nexevo.in/haj/auth-app/public/api/auth/register', {
    name: event.name,
    username: event.username,  
    email: event.email,
    phone: event.phone,
    password: event.password
    }).then(res => { 
 
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('token_type', res.data.token_type);
        history.push("/Profile");

      })
      .catch(error => { 
        console.log(error);
      });

  };
    const [value, setValue] = useState()
    const [state, setState] = React.useState({
        checkedA: false, 
      });
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
  return (
    <>
                   <Helmet> 
                <title>Signup</title> 
                <meta charSet="utf-8" />
                <meta name="description" content="Nested component" />
            </Helmet>

            <section className={All.Register}>
                <Container className={All.Container}>
                        <Row> 
                        <Col lg={6} className={All.DronePerson}> 
                        {/* <img src={DronePerson} />  */}
         </Col>
                            <Col lg={6}>
                            <Box pb={3}>
                              <h2>Sign Up with Drone Zone</h2> 
                            </Box>
                            <form className={All.form} onSubmit={handleSubmit(onSubmit)}>
                                    <div className={All.FormGroup}>
                                        <label className={All.Bold} for="usr">Name:</label>
                                        <input type="text" name="name" className={All.FormControl} id="usr" ref={register ({ required : true, minLength : 2}) }/> 
                                          {errors.name && errors.name.type === "required" && <p class="error">This is required field</p>}
                                          {errors.name && errors.name.type === "minLength" && <p class="error">This is field minLength 2</p>}

                                    </div>
                                    <div className={All.FormGroup}>
                                        <label className={All.Bold} for="usr">User Name:</label>
                                        <input type="text" name="username"  className={All.FormControl} id="usr" ref={register ({ required : true, minLength : 2}) }/>
                                        {errors.username && errors.username.type === "required" && <p class="error">This is required field</p>}
                                        {errors.username && errors.username.type === "minLength" && <p class="error">This is field minLength 2</p>}
                                    </div>
                                    <div className={All.FormGroup}>
                                        <label className={All.Bold} for="usr">Email ID:</label>
                                        <input type="email" className={All.FormControl} id="usr" name="email" ref={register ({ required : true ,pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,  message: "invalid email address"  }}) }/>
                                        {errors.email && errors.email.type === "required" && <p class="error">This is required field</p>}
                                        {errors.email && errors.email.type === "minLength" && <p class="error">This is field minLength 2</p>}
                                        {errors.email && errors.email.message  && <p class="error">Invalid email address</p>}
                                    </div>
                                    <div className={All.FormGroup}>
                                        <label className={All.Bold} for="usr">Phone Number <span className={All.FSize_12}>(with country code):</span></label>
                                        <PhoneInput className={All.FormControl} placeholder="Enter phone number" name="phone"  value={value} onChange={setValue}/>
                                        {errors.phone && errors.phone.type === "required" && <p class="error">This is required field</p>}
                                      </div>
                                      <Box  className={`${All.Width_82} ${All.Width_100} ${All.shipping_txt} `} textAlign="right" pl={0}><span textAlign="right" className={All.FSize_12}>Only for shipping process</span></Box>
                                    <div className={All.FormGroup}>  
                                        <label className={All.Bold} for="usr">Password:</label>
                                        <input name="password" type="password" name="password" className={All.FormControl} id="usr" ref={register({ required: "You must specify a password", minLength: {  value: 8, message: "Password must have at least 8 characters" }})}/>
                                        {errors.password && errors.password.type === "required" && <p class="error">This is required field</p>} 
                                        {errors.password && errors.password.type === "minLength" && <p class="error">This is field minLength 8</p>} 
                                    </div>   

                                    <div className={All.FormGroup}>  
                                        <label className={All.Bold} for="usr">Confirm Password:</label>
                                        <input type="password" name="confirmPassword" className={All.FormControl} id="usr" ref={register({validate: value => value === password.current || "The passwords do not match" })}/>
                                        {errors.confirmPassword && <p class="error">{errors.confirmPassword.message}</p>}
                                    </div>    

                                    <div className={All.FormGroup}>
                                    <FormControlLabel className={`${All.Width_82} ${All.FSize_14} ${All.Width_100} ${All.Checkbox}`}  control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA"  inputRef={register} />} label="Creating an account means you’re okay with our Terms of Service, Privacy Policy, and our default Notification Settings."  />
                                    {errors.checkedA && <p class="error">{errors.checkedA.message}</p>}
                                    </div>    
 
                                  <div className={All.FormGroup}> 
                                      <Box py={3}>
                                          <Button variant="contained" color="default" type="submit" className={All.BtnStyle_5}>
                                            <img style={{paddingRight:10}} src={DroneImg} /> 
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

export default Register
  