import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'; 
import All from '../website/All.module.css'
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Radio from '@material-ui/core/Radio';
import swal from 'sweetalert'; 
import $ from 'jquery'
import axios, { post } from 'axios';
import Alert from '@material-ui/lab/Alert'; 
import Snackbar from '@material-ui/core/Snackbar'; 
import FileUpload from '../uploadfile/FileUpload'
 
function download(){
  document.getElementById('div1').style.display ='none';
}
function forsale(){
  document.getElementById('div1').style.display = 'block';
}

export default function Form(props) {
  
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
      const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        }
           axios.post('https://demo-nexevo.in/haj/auth-app/public/api/auth/post', {
          // name: event.name,
          caption: event.caption,
          category_id:state,
          description:event.description,
          comments:event.comments, 
          for_sale:selectedValues, 
          price:event.price,
        },config).then(res => {    
        swal(res.data.message, {
          icon: "success",
        }); 
      }).catch(error => {  
    });  
    } else {
      swal("Your imaginary file is safe!");
    }
  });   
}
  
const [open, setOpen] = React.useState(false);
const [selectedValues, setSelectedValues] = React.useState('');
const [state, setState] = React.useState('');
const handleClicks = () => {
  setOpen(true);
};

const handleChanges = (event) => {
  setSelectedValues(event.target.value);
}; 

const handleChange = (event) => {
  setState(event.target.value);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  } 
  setOpen(false);
};

const { register, handleSubmit, errors } = useForm();
   
      const [StateComments, setStateComments] = React.useState({ comments: false,});
 


      const handleChangeComments =(event) =>{
        setStateComments({ ...state, [event.target.name]: event.target.checked });
      }

      function CancelUpload() { 
        swal({
            title: "Are you sure?",
            text: "Once reset, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
              window.location.reload(); 
            } else {
              swal("Your imaginary file is safe!");
            }
          }); 
      }
 

      function handleClick() { 
        var v = document.getElementById("Download"); 
        if (v.style.display === "none") {
            v.style.display = "block"; 
        } else {
            v.style.display = "none";
        }
      }

    return (
        <> 
        {errors.caption && errors.caption.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
        {errors.description && errors.description.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>}
        {/* {errors.price && errors.price.type === "required" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}><Alert variant="filled" onClose={handleClose} severity="error">This is a requied feild!</Alert></Snackbar>} */}
           <form className={All.form} onSubmit={handleSubmit(onSubmit)}>   

                <div className={All.FormGroup}>
                    <label for="usr">Caption</label>
                    <input type="text" className={All.FormControl} name="caption" id="usr" ref={register({ required: true})}/> 
                </div>   

                <div className={All.FormGroup}>
                <label for="usr" className={All.paddingbottom_10}>Category</label>
                {/* <FormControlLabel className={All.Checkbox} control={<Checkbox checked={state.image} onChange={handleChange} inputRef={register()}  name="image" />} label="Image"  />
                <FormControlLabel className={All.Checkbox} control={<Checkbox checked={state.rotateimage} onChange={handleChange} inputRef={register()}  name="rotateimage" />} label="360°Image"  />
                <FormControlLabel className={All.Checkbox} control={<Checkbox checked={state.video} onChange={handleChange} inputRef={register()}  name="video" />} label="Video"  /> 
                <FormControlLabel className={All.Checkbox} control={<Checkbox checked={state.threedmodelimage} onChange={handleChange} inputRef={register()}  name="threedmodelimage" />} label="3D Model"  />
               */}
                 <Radio  className={All.Checkbox} checked={state === '1'}  onChange={handleChange} value="1"  color="default"  name="radio_button_demo" inputProps={{ 'aria-label': 'A' }}  /><span>Image</span> 
                 <Radio  className={All.Checkbox} checked={state === '2'}  onChange={handleChange} value="2"  color="default"  name="radio_button_demo" inputProps={{ 'aria-label': 'A' }}  /><span>360°Image</span>  
                 <Radio  className={All.Checkbox} checked={state === '3'}  onChange={handleChange} value="3"  color="default"  name="radio_button_demo" inputProps={{ 'aria-label': 'A' }}  /><span>Video</span>  
                 <Radio  className={All.Checkbox} checked={state === '4'}  onChange={handleChange} value="4"  color="default"  name="radio_button_demo" inputProps={{ 'aria-label': 'A' }}  /><span>3D Model</span>  
              </div>   

                <div className={All.FormGroup}>
                    <label for="usr">Say about the shot</label> 
                    <textarea className={All.FormControl} rows="4" cols="50" name="description" id="usr" form="usrform" ref={register({ required: true})}></textarea>  
                </div>   

                <div className={All.FormGroup}>
                    <label for="usr">Comments</label>
                    <FormControlLabel className={All.Checkbox} control={<Checkbox checked={StateComments.comments} onChange={handleChangeComments} inputRef={register()}  name="comments" />} label="Close Comments"  /> 
                </div>    

                <div className={All.FormGroup} >
                <label for="usr" className={All.paddingbottom_10}>Features</label> 
                  <Radio  className={All.Checkbox} checked={selectedValues === 'forsale'}   onClick={forsale}   onChange={handleChanges} value="forsale"  color="default"  name="radio_button_demo"   inputProps={{ 'aria-label': 'A' }}  /><span>For Sale</span>
                  <Radio  className={All.Checkbox} checked={selectedValues === 'download'}  onClick={download}  onChange={handleChanges} value="download"   color="default"  name="radio_button_demo" inputProps={{ 'aria-label': 'A' }}  /><span>Download</span>
                </div>    
  
                 <div className={All.FormGroup} id="div1" style={{display:'none'}}>
                            <label for="usr">Price</label>
                            <input type="number" className={All.FormControl} name="price" id="price" ref={register()} /> 
                  </div>

                <div className={All.Submit}>
                <Link to="/UploadFile">
                     <Button variant="contained"  color="default" onClick={CancelUpload} className={All.BtnStyle_4}>Cancel</Button>  
                </Link>
                     <Button variant="contained" type="submit"  color="default"  onClick={handleClicks} className={All.BtnStyle_5}>Publish</Button>    
                </div>     

           </form>
        </>
    )
}



