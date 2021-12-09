import React from 'react'
import All from '../website/All.module.css'
import { useForm } from "react-hook-form";
import { Container, Row, Col } from 'react-grid-system';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Loader from '../Loader/loader'
import swal from 'sweetalert';
import { userService } from '../_services/user.service';

export default function AdvancedInformation() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [SuccessMessages, setSuccessMessages] = useState(false);
  const [user, setUser] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [profile, setProfile] = useState([]);
  const handleClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    userService.User().then(res => {
      setUser(res.data);
      setSuccess(true);
      setLoading(false);
    },
      err => {
        setLoading(false);
      })

    userService.Profile().then(res => {
      setProfile(res.data);
    },
      err => {
        setLoading(false);
      }
    )
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onSubmit = (event) => {
    setSuccess(false);
    setLoading(true);
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }
    axios.post('http://localhost/auth-app/public/api/auth/accountsettings', {
      name: event.name,
      company_website: event.company_website,
    }, config)
      .then(res => {
        setSuccess(true);
        setLoading(false);
        setSuccessMessages(res.data.message);
        swal(res.data.message, {
          icon: "success",
        });
      })
      .catch(error => {
        setSuccess(true);
        setLoading(false);
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
      {/* {
             success && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled"  severity="success">{SuccessMessages}</Alert></Snackbar>
          } */}

      {errors.counamentry && errors.name.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
      {errors.company_website && errors.company_website.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}


      <section className={All.PublicProfile}>
        <Container className={All.Container}>
          <Row className={All.ProfileContainer}>
            <Col lg={12}>
              <form className={All.form} onSubmit={handleSubmit(onSubmit)}  >
                <div className={All.FormGroup}>
                  <label className={All.Bold} for="name">Contact Person Name:</label>
                  <input type="text" name="name" className={All.FormControl} id="name" defaultValue={user.name} ref={register({ required: true, minLength: 2 })} />
                  {errors.name && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" severity="error">This is a requied feild!</Alert></Snackbar>}

                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="email">Email ID:</label>
                  <input type="text" name="email" className={All.FormControl} id="email" defaultValue={user.email} readOnly />
                  {errors.email && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" severity="error">This is a requied feild!</Alert></Snackbar>}
                </div>

                <div className={All.FormGroup}>
                  <label className={All.Bold} for="company_website">Company Website:</label>
                  <input type="text" name="company_website" className={All.FormControl} id="company_website" defaultValue={profile.company_website} ref={register({ required: true, pattern: { value: /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/i, message: "Invalid Url" } })} />
                  {errors.company_website && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" severity="error">This is a requied feild!</Alert></Snackbar>}

                </div>

                <div className={All.FormGroup}>

                  {isLoading ? (<>
                    <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.LoaderBtn}>
                      <Loader /> Loading</Button>
                  </>) : (<>
                    <Button variant="contained" color="default" type="submit" onClick={handleClick} className={All.BtnStyle_5}>
                      save</Button>
                  </>)}

                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  )
}
