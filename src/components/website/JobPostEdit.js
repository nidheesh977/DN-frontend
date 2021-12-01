import React, { useState , useEffect} from 'react'
import { Helmet } from "react-helmet";
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Radio from '@material-ui/core/Radio';  
import swal from 'sweetalert';
import Alert from '@material-ui/lab/Alert'; 
import Snackbar from '@material-ui/core/Snackbar';
import Header from '../header/Header'
import { Link } from 'react-router-dom';


export default function JobPostEdit(props) {

  const handleClick = () => {
    setOpen(true);
  };
  const { register, handleSubmit, errors ,control  } = useForm();
 

    const [hiredorners, setDr] = useState([]); 
    const [Radiobtn, setRadiobtn] = React.useState([]);  
    // const [selectedValues, setSelectedValue] = React.useState({Radiobtn});
    const [selectedValues, setSelectedValue] = useState(); 
    
  const id =props.match.params.id;
  const API_URL = 'http://localhost/auth-app/public/api/auth';
  useEffect(() => {

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }
  const url = `${API_URL}/Edit/${id}`;
  axios.get(url,config).then(res => res.data)
  .then((data) => {
    setDr(data)
    setRadiobtn(data.typeofrole) 
   })  
    
  }, []);



    // const onSubmit = (event) => {  
     
    // }
      
 
 
      const handleChanges = (event) => {
        setSelectedValue(event.target.value); 
      };  

    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState(false);


    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };
   

    // 
    const onSubmit = (event) => {  
      swal({
        title: "Are you sure?",
        text: "Once Post, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => { 
        if (willDelete) {
          const url1 = `${API_URL}/EditJob/${id}`;
          const config1 = {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
              }
            }
          axios.post(url1, {
              job_title: event.job_title,
              job_description: event.comment,
              job_location:event.job_location,
              type_of_droner:event.type_of_droner,
              type_of_role:selectedValues,
              number_of_people:event.apply_form,
              status:status,
  
          },config1).then(res => {
            swal(res.data.message, {
              icon: "success",
            }); 
          }).catch(error => {  
        });
        } else {
          swal("Your imaginary file is safe!");
        }
      });  
      setStatus(false);
    }

    function handleAlternate(event) { 
    if(setOpen=== false){
      swal({
        title: "Are you sure?",
        text: "Once Post, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => { 
        if (willDelete) {
          const url1 = `${API_URL}/EditJob/${id}`;
          const config1 = {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
              }
            }
          axios.post(url1, {
              job_title: event.job_title,
              job_description: event.comment,
              job_location:event.job_location,
              type_of_droner:event.type_of_droner,
              type_of_role:selectedValues,
              number_of_people:event.apply_form,
              status:status,
  
          },config1).then(res => {
            swal(res.data.message, {
              icon: "success",
            });
          }).catch(error => { 
            swal(error.response.data.message.job_title[0], {
              icon: "error",
            }); 
        }); 
        } else {
          swal("Your imaginary file is safe!");
        }
      });  
    }
    setStatus(true);
    setOpen(true);
    } 

    return (
        <>
          
            {errors.apply_form && errors.apply_form.message  && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Invalid Apply Form</Alert></Snackbar>} 

             {errors.youtube && errors.youtube.message  && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Invalid Youtube Url</Alert></Snackbar>} 
                
             {errors.linkedin && errors.linkedin.message  && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert  variant="filled" onClose={handleClose} severity="error">Invalid Linkedin Url</Alert></Snackbar>} 
            
            
             {errors.twitter && errors.twitter.message  && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Invalid Twitter Url</Alert></Snackbar>} 

               {errors.pinterest && errors.pinterest.message  && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Invalid Pinterest Url</Alert></Snackbar>} 

             {errors.instagram && errors.instagram.message  && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Invalid Instagram Url</Alert></Snackbar>} 
            
            {errors.facebook && errors.facebook.message  && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Invalid FacebookUrl</Alert></Snackbar>} 
      
            {errors.type_of_droner && errors.type_of_droner.type === "required"  && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">Select Type of Droner!</Alert></Snackbar>} 
  
            {errors.job_title && errors.job_title.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}

            {errors.company_name && errors.company_name.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}

            {errors.job_description && errors.job_description.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}

            {errors.job_location && errors.job_location.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}

         
            <Helmet> 
                <title>Post Job Edit</title> 
                <meta charSet="utf-8" />
                <meta name="description" content="Nested component" />
            </Helmet>
 
 <Header />

            <section className={All.HiringDronersBanner}> 
                <Container className={All.Container}>
                    <Row>
                        <Col lg={6}>
                            <div className={All.HireBannerText} >
                                <div className={All.Text}>
                                    <h2 p={3}>The #1 Job Board for</h2>
                                    <h1>Hiring Droners and Creative Professionals</h1>
                                </div>
                            </div>
                            <div className={All.HireBannerImage}>
                            </div>
                        </Col>
                        <Col lg={6}></Col>
                    </Row>
                </Container> 
            </section>

            <section className={All.HiringDroners}>
                <Container className={All.Container}>
                    <Row>
                        <Col lg={12}>
                            <Box pb={4}  className={`${All.form} ${All.pb_md} ${All.pb_sm} ${All.pb_xs} ${All.pt_md} ${All.pt_sm} ${All.pt_xs}`}> 
                                 <h5 className={All.Bold}>Edit Your Job</h5>
                            </Box>
                            <form className={All.form}  onSubmit={handleSubmit(onSubmit)}>
                                <div className={All.FormGroup}>
                                    <label className={All.Bold} for="usr">Job Title</label>
                                    <input type="text" name="job_title" className={All.FormControl}  defaultValue={hiredorners.companyname}  id="usr" placeholder="Photographer, Cinematographer & etc..."  ref={register({ required: true,  })} />
                                 </div>
 
                                <div className={All.FormGroup}>
                                    <label className={All.Bold} for="usr">Job Description</label>
                                    <p>Already have one written? Copy and paste from an existing job post (on the web or from a Word or Google Doc).</p>
                                    <textarea defaultValue={hiredorners.jobdescription} className={All.FormControl} ref={register({ required: true })} rows="4" cols="50"  name="comment" id="usr" form="usrform" ref={register({ required: true, })}></textarea> 
                                </div>

                                <div className={All.FormGroup}>
                                    <label className={All.Bold} for="usr">Job Location</label>
                                    <input type="text" name="job_location" defaultValue={hiredorners.jobdescription} className={All.FormControl} id="usr" ref={register({ required: true,  })}  />
                                 </div> 

                                    <div className={All.FormGroup}>
                                    <label  className={All.Bold} htmlFor="type_of_droner" > Type of Droner</label>
                                    <select  className={`${All.FormControl} ${All.dropdown} `} name="type_of_droner" value={hiredorners.typeofdroner} ref={register({ required: "select one option" })} > 
                                        <option value="">Select droners category</option> 
                                        <option value="user" >Small</option>
                                        <option value="user">Medium</option>
                                        <option value="user">Large</option>
                                    </select> 
                                </div>

                                <div className={All.FormGroup}>
                                    <label className={`${All.Bold} ${All.RadioGroup}`} for="usr">Type of Role</label>   
                                <Radio checked={selectedValues==='full_time'}  onChange={handleChanges} value="full_time"  color="default"  name="typeofrole"  /><span className={`${All.FormControlLabel} ${All.paddingright_30} ${All.pr_md} ${All.pr_sm} ${All.pr_xs}`}>Full Time</span>     
                                <Radio checked={selectedValues==='part_time'}  onChange={handleChanges}   value="part_time"  color="default"  name="typeofrole"     /><span className={`${All.FormControlLabel} ${All.paddingright_30} ${All.pr_md} ${All.pr_sm} ${All.pr_xs}`}>Part Time</span>
                                <Radio checked={selectedValues==='freelanchers'} onChange={handleChanges}   value="freelanchers"  color="default"  name="typeofrole" /><span className={`${All.FormControlLabel} ${All.paddingright_30} ${All.pr_md} ${All.pr_sm} ${All.pr_xs}`}>Freelanchers</span>
                                     

                          </div>    
                          
                                <Box pb={7} pt={3}>
                                    <Button ml={2} variant="contained" color="default" type="submit" onClick={handleClick}  className={All.BtnStyle_2}>
                                        {/* <img style={{paddingRight:10}} src={DroneImg} /> */}
                                        Post</Button>
                                    <Button ml={2} variant="contained" color="default" type="submit" onClick={ (handleClick), handleAlternate.bind(this)}  className={All.BtnStyle_3}>
                                        {/* <img style={{paddingRight:10}} src={DroneImg} /> */}
                                        Draft</Button>
                                        <Link  to='OfficeProfile'>
                                        <Button ml={2}  variant="contained" color="default" className={All.BtnStyle_4}> 
                                        Cancel</Button>
                                        </Link>
                               
                                </Box>

                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
 
        </>
    )
    
}


