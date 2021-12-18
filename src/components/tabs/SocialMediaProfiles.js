import React from 'react'
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form";
import { Container, Row, Col } from 'react-grid-system';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'; 
import swal from 'sweetalert'; 
import Loader from '../Loader/loader'
import { userService } from '../_services/user.service';


export default function SocialMediaProfiles() {

  const [social, setSocial] = useState([]);
  const [isLoading, setLoading] = useState(false);  
  // const [success, setSuccess] = useState(false);
  // const [SuccessMessages , setSuccessMessages] = useState(false);
  // const[ErrorMessages , setErrorMessages] = useState(false);
  const [error, setError] = useState(false); 
  const [open, setOpen] = React.useState(false);
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } 
    setOpen(false);
  }; 

  
  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => { 
    userService.Social().then(res => {
        setLoading(false);
        setSocial(res.data);
        // console.log(res);
      },
        err => {
          setLoading(false);
          console.log(err);
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
    axios.post('https://nexevo-demo.in/nidheesh/dn/auth-app/public/api/auth/updatesocialmedia', {
      facebook: event.facebook, 
      twitter: event.twitter,
      instagram: event.instagram,
      linkedin: event.linkedin,
      pinterest: event.pinterest,
      youtube: event.youtube, 
    }, config).then(res => {
      setLoading(false);  
      swal(res.data.message, {
        icon: "success",
      });
      // setSuccess(true);  
      // setSuccessMessages(res.data.message);  
    })
      .catch(error => {
        setLoading(false); 

        try{
          swal(error.response.data.message.facebook[0], {
            icon: "error",
          });
        }
        catch{
          try{
            swal(error.response.data.message.twitter[0], {
              icon: "error",
            });
          }
          catch{
            try{
              swal(error.response.data.message.instagram[0], {
                icon: "error",
              });
            }
            catch{
              try{
                swal(error.response.data.message.linkedin[0], {
                  icon: "error",
                });
              }
              catch{
                try{
                  swal(error.response.data.message.pinterest[0], {
                    icon: "error",
                  });
                }
                catch{
                  try{
                    swal(error.response.data.message.youtube[0], {
                      icon: "error",
                    });
                  }
                  catch{
                    swal("Something went wrong. Please try again", {
                      icon: "error",
                    });
                  }
                }
              }
            }
          }
        }
        // setError(true);
        // alert(error.response.data.message.username[0]);
        // setErrorMessages(error.response.data.message.username[0]) ;
      });
  }

  const { register, handleSubmit, errors, watch, control } = useForm();

  const [value, setValue] = useState()
  const [state, setState] = React.useState({
    checkedA: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>

        {/* {success && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled"  severity="success">{SuccessMessages}</Alert></Snackbar>} */}
        {/* {error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled"  severity="error">{ErrorMessages}</Alert></Snackbar>} */}

      <section className={`${All.PublicProfile} ${All.PublicProfileEdit}`}>
        <Container className={All.Container}>
          <Row className={All.ProfileContainer}>
            <Col lg={12}>
              <form className={All.form} onSubmit={handleSubmit(onSubmit)}  >
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Facebook:</label>
                  <input className={All.FormControlSocialIcons} type="text" defaultValue={social.facebook} ref={register({ required: true, pattern: { value:  /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/i, message: "Invalid Url" } })} name="facebook" />
                  {errors.facebook && errors.facebook.type === "required" &&  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} 
                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Twitter:</label>
                  <input className={All.FormControlSocialIcons} type="text" defaultValue={social.twitter} ref={register({ required: true, pattern: { value:  /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/i, message: "Invalid Url" } })} name="twitter" />
                  {errors.twitter && errors.twitter.type === "required" &&  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} 
 
                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Instagram:</label>
                  <input className={All.FormControlSocialIcons} type="text" defaultValue={social.instagram} ref={register({ required: true, pattern: { value:  /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/i, message: "Invalid Url" } })} name="instagram" />
                  {errors.instagram && errors.instagram.type === "required" &&  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} 
 
                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Linkedin:</label>
                  <input className={All.FormControlSocialIcons} type="text" defaultValue={social.linkedin} ref={register({ required: true, pattern: { value:  /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/i, message: "Invalid Url" } })} name="linkedin" />
                  {errors.linkedin && errors.linkedin.type === "required" &&  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} 
 
                </div>


                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">Pinterest:</label>
                  <input className={All.FormControlSocialIcons} type="text" defaultValue={social.pinterest} ref={register({ required: true, pattern: { value:  /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/i, message: "Invalid Url" } })} name="pinterest" />
                  {errors.pinterest && errors.pinterest.type === "required" &&  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} 
 
 
                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="usr">YouTube:</label>
                  <input className={All.FormControlSocialIcons} type="text" defaultValue={social.youtube} ref={register({ required: true, pattern: { value:  /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/i, message: "Invalid Url" } })} name="youtube" />
                  {errors.youtube && errors.youtube.type === "required" &&  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} 
  
                </div>


                <Box pb={4} className={All.FormGroup}> 
                      {isLoading ? ( <>
                          <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.LoaderBtn}>
                          <Loader /> Loading</Button>
                        </> ) : ( <>
                          <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.BtnStyle_5}>
                          Update</Button>
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
