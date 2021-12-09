import React from 'react'
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form"; 
import { Container, Row, Col } from 'react-grid-system';
import Button from '@material-ui/core/Button'; 
import { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider'; 
import Profile from '../ProfileImg/Profile'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'; 
import axios from 'axios'
import Loader from '../Loader/loader'
import swal from 'sweetalert';    


export default function OfficePublicProfile() {
  // const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState([]);
    useEffect(() => {

        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        }
        axios.get('http://localhost/auth-app/public/api/auth/user', config)
          .then(res => {
            setLoading(false); 
            setUser(res.data)
            console.log(res);
          },
            err => {
              setLoading(false); 
              console.log(err);
            }
          ) 
      }, []);

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        } 
        setOpen(false);
      };

      const handleClick = () => {
        setOpen(true);
      };

    const onSubmit = (event) => {
      setLoading(true); 
        const config = {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
          }
          axios.post('http://localhost/auth-app/public/api/auth/updateprofile', {
            company_name: event.company_name,
            profession: event.profession,
            country: event.country,
            location: event.location, 
            // role: 1,
            // password: event.password
          },config).then(res => {
            // setSuccess(true); 
            setLoading(false);    
            swal(res.data.message, {
              icon: "success",
            });

            console.log(res)
          })
            .catch(error => {
              setLoading(false);
              console.log(error);
            });
    }

    const {register ,handleSubmit, errors, watch ,control  } = useForm();

      const [value, setValue] = useState()
      const [state, setState] = React.useState({
          checkedA: false,
        });
        const handleChange = (event) => {
          setState({ ...state, [event.target.name]: event.target.checked });
        };


    return (
        <> 
          {/* {
             success && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled"  severity="success">Success Updated</Alert></Snackbar>
          } */}

      {errors.country && errors.country.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} 
      {errors.bio && errors.bio.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} 
      {errors.location && errors.location.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} 
      {errors.profession && errors.profession.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} 
      {errors.company_name && errors.company_name.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} 
     

                    <section className={` ${All.PublicProfile} ${All.PublicProfileEdit} ${All.OfficeProfileEdit} `}>
                        <Container className={All.Container}>
                        <Row className={All.ProfileContainer}>  
                            <Col lg={12}> 
                            <form className={All.form} onSubmit={handleSubmit(onSubmit)}  > 
                            <div className={`${All.FormGroup} ${All.marginbottom}`}>
                                <Profile />
                            </div> 
                            <div className={All.FormGroup}>
                                <label className={All.Bold} for="usr">Name:</label>
                                <input type="text" name="company_name" className={All.FormControl} id="usr" defaultValue={user.company_name} ref={register ({ required : true, minLength : 2}) }/> 
                             </div>

                            <div className={All.FormGroup}>
                                <label className={All.Bold} for="profession">Profession:</label>
                                <input type="text" name="profession" className={All.FormControl} id="profession" defaultValue={user.profession} ref={register ({ required : true, minLength : 2}) }/> 
                            </div> 

                            <div className={All.FormGroup}>
                                <label className={All.Bold} for="location">Location:</label>
                                <input placeholder="Bangalore" type="text" name="location" className={All.FormControl} defaultValue={user.location} id="location" ref={register ({ required : true, minLength : 2}) }/> 
                         </div> 

                            <div className={All.FormGroup}>
                                <label className={All.Bold} for="country">Country:</label>
                                <input placeholder="India" type="text" name="country" className={All.FormControl} id="country" defaultValue={user.country} ref={register ({ required : true, minLength : 2}) }/> 
                              </div>  

                        <div className={All.FormGroup}> 
                        {isLoading ? ( <>
                          <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.LoaderBtn}>
                          <Loader /> Loading</Button>
                        </> ) : ( <>
                          <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.BtnStyle_5}>
                          save</Button>
                        </> )}
                        </div>    
           </form>
                            </Col> 
                        </Row>
                </Container>
            </section> 
            
        </>
    )
}
