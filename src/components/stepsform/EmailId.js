import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import 'react-phone-number-input/style.css'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form";
import axios from 'axios'
import DronePerson from '../images/drone-person.svg'
import DroneImg from '../images/drone-img.svg'
import swal from 'sweetalert';  
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Loader from '../Loader/loader'

export default function EmailId(props) {

    const { register, handleSubmit, errors } = useForm();
    const [open, setOpen] = React.useState(false);
    const onSubmit = (event) => {
        setLoading(true);   
        axios.post('http://localhost/auth-app/public/api/auth/forgotpassword', {
            email: event.email, 
          }).then(res => {   
            swal('Check Your Email', {
              icon: "success",
            });
            setLoading(false); 
            props.next();            
          })
            .catch(error => {
              console.log(error.response)
              setLoading(false); 
            });                                                                                    
    }
    
    const [isLoading, setLoading] = useState(false);
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
        {errors.email && errors.email.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled" onClose={handleClose} severity="error">{errors.email.message}</Alert></Snackbar>} 
        {errors.email && errors.email.type === "pattern" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled" onClose={handleClose} severity="error"> Enter a valid e-mail address</Alert></Snackbar>} 
    
            <Helmet>
                <title>Forgot Password</title>
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
                                <h2>Forgot Password</h2>
                            </Box>
                            <form className={All.form} onSubmit={handleSubmit(onSubmit)}>
                                <div className={All.FormGroup}>
                                    <label className={All.Bold} for="usr">Email ID:</label>
                                    <input type="text" className={All.FormControl} id="usr" value={props.getState("email", "")} onChange={props.handleChange} name="email" 
                                            ref={register({
                                                required: "Enter your e-mail",
                                                pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: "Enter a valid e-mail address",
                                                },
                                            })}
                                    />

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

 






