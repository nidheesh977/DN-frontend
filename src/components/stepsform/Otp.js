import React, { useState, useRef } from 'react'
import { Helmet } from "react-helmet";
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import 'react-phone-number-input/style.css'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import DronePerson from '../images/drone-person.svg'
import DroneImg from '../images/drone-img.svg'
import swal from 'sweetalert';  
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Loader from '../Loader/loader'

export default function Otp(props) {
    const { register, handleSubmit, errors, watch, control } = useForm();
    const password = useRef({});
    const history = useHistory();
    password.current = watch("password", "");
    const onSubmit = (event) => {
        setLoading(true); 
        axios.post('https://nexevo-demo.in/nidheesh/dn/auth-app/public/api/auth/password/reset', {
            email: props.state.email,
            code:   event.code, 
            password: event.password 
                }).then(res => {   
                    swal('Reset Password Successful', {
                    icon: "success",
                    }); 
                    setLoading(false); 
                    history.push("/Login");
                })
            .catch(error => {
              swal(error.response.data.message.password[0], {
                icon: "error"
              })
              setLoading(false); 
            });                                                                                                                  
    }

    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState()
    const [state, setState] = React.useState({
        checkedA: true,
    });

    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <>
      
       
        {errors.password_confirmation && errors.password_confirmation.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
        {errors.password_confirmation && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled" onClose={handleClose} severity="error">password does not match</Alert></Snackbar>}
        {errors.password && errors.password.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
        {errors.password && errors.password.type === "maxLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled" onClose={handleClose} severity="error">Password must be of Maxmum 12 characters</Alert></Snackbar>}
        {errors.password && errors.password.type === "minLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled" onClose={handleClose} severity="error">Password must be of Minimum 6 characters</Alert></Snackbar>}
        {errors.code && errors.code.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} 
        {errors.code && errors.code.type === "maxLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled" onClose={handleClose} severity="error">Password must be of Maxmum 6 characters</Alert></Snackbar>} 
        {errors.code && errors.code.type === "minLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled" onClose={handleClose} severity="error">Password must be of Minimum 6 characters</Alert></Snackbar>} 
            

            <Helmet>
                <title>Enter Your OTP</title>
                <meta charSet="utf-8" />
                <meta name="description" content="Nested component" />
            </Helmet>

            <section className={All.Signup}>
                <Container className={All.Container}>
                    <Row>
                        <Col lg={6} className={All.DronePerson}>
                            <img src={DronePerson} />
                        </Col>
                        <Col lg={6} className={All.Login}>
                            <Box pb={3}>
                                <h2>{props.state.email}</h2> 
                            </Box>
                            <form className={All.form} onSubmit={handleSubmit(onSubmit)} >

                                <div className={All.FormGroup}>
                                    <label className={All.Bold} for="usr">OTP:</label>
                                    <input type="text" name="code" className={All.FormControl} id="usr"  ref={register({ required: true,  maxLength: 6 ,  minLength: 6  })} />
 
                                </div>

                                <div className={All.FormGroup}>
                                    <label className={All.Bold} for="usr">Password:</label>
                                    <input type="password" name="password" className={All.FormControl} id="usr"  ref={register({ required: true  , maxLength: 12 ,  minLength: 6})} />
 
                                </div> 
                                <div className={All.FormGroup}>
                                    <label className={All.Bold} for="usr">Confirm Password :</label>
                                    <input type="password" name="password_confirmation" className={All.FormControl} id="usr" ref={register({ validate: value => value === password.current || "The passwords do not match" })} />
 
                                </div> 

                                <Box pt={4}>
                                    {isLoading ? ( <>
                                        <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.LoaderBtn}>
                                        <Loader /> Loading</Button>
                                        </> ) : ( <>
                                        <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.BtnStyle_5}>
                                        <img style={{ paddingRight: 10 }} src={DroneImg} /> submit</Button>
                                        </> )}
                                </Box>


                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>

        </>
    )
}
