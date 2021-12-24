import React from 'react'
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form";
import { Container, Row, Col } from 'react-grid-system';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Loader from '../Loader/loader'
import swal from 'sweetalert'; 
import { userService } from '../_services/user.service';



export default function EmailNotifications() {
  // const [user, Setuser] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);
  // const [SuccessMessages, setSuccessMessages] = useState(false);
  // const [ErrorMessages, setErrorMessages] = useState(false);
  // const [error, setError] = useState(false);
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false,
    checkedF: false,
    checkedG: false,
  });

  const handleClick = () => {
    setOpen(true);
  }; 

  const [email, setEmail] = useState([]);
  useEffect(() => { 
    userService.Email().then(res => {
        setState({
          ...state, checkedA: res.data.news,
          checkedB: res.data.privacy,
          checkedC: res.data.anyone_hire_me,
          checkedD: res.data.someone_mention,
          checkedE: res.data.invitation,
          checkedF: res.data.follows,
          checkedG: res.data.comments,
        });  
        setEmail(res.data); 
      },
        err => { 
        }
      )

  }, []);
  const onSubmit = (event) => {
    setLoading(true);   
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }
    axios.post('https://demo-nexevo.in/haj/auth-app/public/api/auth/emailsettings', {
      news: event.checkedA, 
      privacy: event.checkedB,
      anyone_hire_me: event.checkedC,
      someone_mention: event.checkedD,
      invitation: event.checkedE,
      follows: event.checkedF,
      comments: event.checkedG,
      // role: 1,
      // password: event.password
    }, config).then(res => {
      swal(res.data.message, {
        icon: "success",
      });
      setLoading(false);
      // setSuccess(true); 
      // setSuccessMessages(res.data.message); 
      // alert(res.data);
      // localStorage.setItem('access_token', res.data.access_token);
      // localStorage.setItem('token_type', res.data.token_type);
      // history.push("/");
    })
      .catch(error => { 
        setLoading(false);
        // setError(true); 
        // setErrorMessages(error.response.data.message.username[0]); 
      });
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const { register, handleSubmit, errors, watch, control } = useForm();

  const [value, setValue] = useState()

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
    <>

      {/* {
        success && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" severity="success">{SuccessMessages}</Alert></Snackbar>
      }
      {error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" severity="error">{ErrorMessages}</Alert></Snackbar>} */}




      <section className={All.PublicProfile}>
        <Container className={All.Container}>
          <Row className={All.ProfileContainer}>
            <Col lg={12}>
              <form className={All.form} onSubmit={handleSubmit(onSubmit)} >
                <Box>
                  <h6 className={`${All.Bold} ${All.paddingbottom_10}`}>Alert & Notifications <span className={` ${All.FSize_13} ${All.paddingleft_10}  ${All.MuliLight}`}> Send me on mail</span> </h6>
                  <Divider />
                </Box>

                <Box py={3}>
                  <FormControlLabel className={`${All.Checkbox} ${All.Bold}`} control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" inputRef={register()} />} /><span className={All.Bold}>Drone Zone News</span>
                  {errors.checkedA &&   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled"  severity="error">{errors.checkedA.message}</Alert></Snackbar>}
                  <p>Get Drone Zone news, announcements, and competition updates</p>
                </Box>

                <Divider />

                <Box py={3}>
                  <FormControlLabel className={`${All.Checkbox} ${All.Bold}`} control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" inputRef={register()} />} /><span className={All.Bold}>Account Privacy</span>
                   {errors.checkedB &&   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled"  severity="error">{errors.checkedB.message}</Alert></Snackbar>}
                  <p>Get important notifications about you.</p>
                </Box>

                <Divider/> 

                <Box py={5}>
                  <h6 className={`${All.Bold} ${All.paddingbottom_10}`}>Account Activity<span span className={` ${All.FSize_13} ${All.paddingleft_10}  ${All.MuliLight}`}> Send me on mail</span></h6>
                  <Box>
                    <Divider />
                  </Box>

                  <Box py={3}>
                    <FormControlLabel className={`${All.Checkbox} ${All.Bold}`} control={<Checkbox checked={state.checkedC} onChange={handleChange} name="checkedC" inputRef={register()} />} /><span className={All.Bold}> Anyone hires me</span>
                     {errors.checkedC &&   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled"  severity="error">{errors.checkedC.message}</Alert></Snackbar>}
                   </Box> 
                  <Divider />
 
                  <Box py={3}>
                    <FormControlLabel className={`${All.Checkbox} ${All.Bold}`} control={<Checkbox checked={state.checkedD} onChange={handleChange} name="checkedD" inputRef={register()} />} /><span className={All.Bold}>Someone mentions me</span>
                    {errors.checkedD &&   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled"  severity="error">{errors.checkedD.message}</Alert></Snackbar>}
                   </Box>

                  <Divider />

                  <Box py={3}>
                    <FormControlLabel className={`${All.Checkbox} ${All.Bold}`} control={<Checkbox checked={state.checkedE} onChange={handleChange} name="checkedE" inputRef={register()} />} /><span className={All.Bold}>Someone accepts my invitation</span>
                    {errors.checkedE &&   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled"  severity="error">{errors.checkedE.message}</Alert></Snackbar>}
                  </Box>

                  <Divider />

                  <Box py={3}>
                    <FormControlLabel className={`${All.Checkbox} ${All.Bold}`} control={<Checkbox checked={state.checkedF} onChange={handleChange} name="checkedF" inputRef={register()} />} /><span className={All.Bold}>Anyone follows me</span>
                    {errors.checkedF && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled"  severity="error">{errors.checkedF.message}</Alert></Snackbar>}
                   </Box>

                  <Divider />

                  <Box py={3}>
                    <FormControlLabel className={`${All.Checkbox} ${All.Bold}`} control={<Checkbox checked={state.checkedG} onChange={handleChange} name="checkedG" inputRef={register()} />} /><span className={All.Bold}>Someone comments on one of my shots</span>
                     {errors.checkedG &&   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled"  severity="error">{errors.checkedG.message}</Alert></Snackbar>}
                   </Box>

                  <Divider />

                </Box>

                <Box pb={5} className={All.FormGroup}>  
                       {isLoading ? ( <>
                          <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.LoaderBtn}>
                          <Loader /> Loading</Button>
                        </> ) : ( <>
                          <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.BtnStyle_5}>
                          Save</Button>
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
