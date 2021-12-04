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
import DronePerson from '../images/drone-person.svg'
import axios from 'axios'
//import DummyImage from '../images/dummy-image.png'
import DroneImg from '../images/drone-img.svg'
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from 'react-router-dom';
import Header from '../header/Header'
import Loader from '../Loader/loader' 
import swal from 'sweetalert'; 
import VisibilityIcon from '@material-ui/icons/Visibility';

function Company() {

  const PasswordShow = () => {
    var x = document.getElementById("password"); 
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
    const confirmPasswordShow = () => {
    var y = document.getElementById("confirmPassword"); 
    if (y.type === "password") {
      y.type = "text";
    } else {
      y.type = "password";
    }
  };

  const { register, handleSubmit, errors, watch, control } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const [value, setValue] = useState()
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');  
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const [error, setError] = useState(false);
  const [test, setTest] = useState(); 

  const [isLoading, setLoading] = useState(false);

  const history = useHistory();
  const onSubmit = (event) => { 
    setLoading(true);  
    axios.post('http://localhost/auth-app/public/api/auth/registerhirer', {
      company_name: event.companyname,
      profession: event.profession,
              location: event.location,
              country: event.country,
                username: event.username,
                email: event.email,
                phone: value, 
                password: event.password 
    }).then(res => {
      setLoading(false);  
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('token_type', res.data.token_type);
      history.push("/OfficeProfile");
      swal('Register Successful', {
        icon: "success",
      });
    })
      .catch(error => {
        setLoading(false); 
        setTest("Something went wrong. Try again")  
        setError(true); 
      }); 
        } 
 
  
        const selectRegion = (region) => { 
          setRegion(region);  
        };
     
        const selectCountry = (country) => { 
          setCountry(country);  
        };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>

      {
        error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled" onClose={handleClose} severity="error">{test}!</Alert></Snackbar>
      }

      {errors.password && errors.password.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}

      {errors.confirmPassword && errors.confirmPassword.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.confirmPassword && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">password does not match</Alert></Snackbar>}
      
      {errors.companyname && errors.companyname.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.companyname && errors.companyname.type === "minLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}

      {errors.pofession && errors.pofession.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.pofession && errors.pofession.type === "minLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a equied feild!</Alert></Snackbar>}
     
      {errors.location && errors.location.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.location && errors.location.type === "minLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a equied feild!</Alert></Snackbar>}
     
      {errors.country && errors.country.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.country && errors.country.type === "minLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a equied feild!</Alert></Snackbar>}

      {errors.email && errors.email.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.email && errors.email.type === "minLength" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.email && errors.email.message && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
 
      {errors.phone && errors.phone.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}

      {errors.checkedA && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}


      <Header/>
      <section className={All.Register}>
      <Container className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}>
          <Row>
            <Col lg={6} className={All.DronePerson}>
              <img src={DronePerson} />
            </Col>
            <Col lg={6}>
              <Box pb={3} className={`${All.pt_sm} ${All.pt_xs} ${All.pt_md}`}>
                <h2>Sign Up with Drone Zone</h2>
              </Box>
              <form className={All.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="name">Company Name <span className = {All.required_field}>*</span></label>
                  <input type="text" name="companyname" className={All.FormControl} id="companyname" ref={register({ required: true, minLength: 2 })} />

                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="username">Profession <span className = {All.required_field}>*</span></label>
                  <input type="text" name="profession" className={All.FormControl} id="profession" ref={register({ required: true, minLength: 2 })} />
                </div>

                
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="username">Country <span className = {All.required_field}>*</span></label>
                  <input type="text" name="country" className={All.FormControl} id="country" ref={register({ required: true, minLength: 2 })} />
                  {/* <CountryDropdown name="country" id="country" className={` ${All.Country}`}  ref={register({ required: true })} 
                    value={country} onChange={selectCountry} /> */}
                </div>


                <div className={All.FormGroup}>
                  <label className={All.Bold} for="username">Location <span className = {All.required_field}>*</span></label>
                  <input type="text" name="location" className={All.FormControl} id="location" ref={register({ required: true, minLength: 2 })} />
                  {/* <RegionDropdown name="location" id="location" className={` ${All.Country}`}   ref={register({ required: true })}
                  country={country} 
                    value={region} onChange={selectRegion} /> */}
                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="email">Email ID <span className = {All.required_field}>*</span></label>
                  <input type="email" className={All.FormControl} id="email" name="email" ref={register({ required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email address" } })} />
                </div>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="phone">Phone Number <span className={All.FSize_12}>(with country code)</span></label>
                  <PhoneInput className={All.Phonenumber} name="phone" id="phone" value={value} onChange={setValue} />
                </div>
                <Box pb={2} className={`${All.Width_76} ${All.shipping_txt} `} textAlign="right" pl={0}><span textAlign="right" className={All.FSize_12}>Only for shipping process</span></Box>
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="password">Password <span className = {All.required_field}>*</span></label>
                  <div className={`${All.Positionrelative} ${All.DisplayFlex}`}>
                  <input name="password" type="password" name="password" className={All.FormControl} id="password" ref={register({ required: "You must specify a password", minLength: { value: 8, message: "Password must have at least 8 characters" } })} />
                  <VisibilityIcon  className={All.VisibilityIcon} onClick={PasswordShow}/> 
             </div>
             
             </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="confirmPassword">Confirm Password <span className = {All.required_field}>*</span></label>
                  <div className={`${All.Positionrelative} ${All.DisplayFlex}`}>
                  <input type="password" name="confirmPassword" className={All.FormControl} id="confirmPassword" ref={register({ validate: value => value === password.current || "The passwords do not match" })} />
                  <VisibilityIcon  className={All.VisibilityIcon} onClick={confirmPasswordShow}/> 
             </div> 
             </div>

                <div className={All.FormGroup}>
                  <FormControlLabel className={`${All.Width_82} ${All.FSize_14} ${All.Checkbox}`} control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" inputRef={register} />} label="Creating an account means you’re okay with our Terms of Service, Privacy Policy, and our default Notification Settings." />
                </div>

                <div className={All.FormGroup}>
                <Box pb={3} pt={6}>
                  {isLoading ? ( <>
                  <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.LoaderBtn}>
                  <Loader /> Loading</Button>
                 </> ) : ( <>
                  <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.BtnStyle_5}>
                  <img style={{ paddingRight: 10 }} src={DroneImg} /> submit</Button>
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

export default Company
