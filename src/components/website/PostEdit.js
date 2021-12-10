import React from 'react'
import {Helmet} from "react-helmet"; 
import { Container, Row, Col } from 'react-grid-system';
import '../uploadfile/FileUpload.css'
import All from '../website/All.module.css'
import '../website/upload.css'
import FileUpload from '../uploadfile/FileUpload'
import Form from '../forms/Form' 
import { Link  } from 'react-router-dom'; 
import Upload from '../images/upload.svg'
import swal from 'sweetalert';
import $ from 'jquery' 
import axios from 'axios'
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';   
import { useForm } from "react-hook-form";
import {
    FormControl, 
    Radio,
    RadioGroup
  } from "@material-ui/core";
  import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

  
const API_URL = 'http://localhost/auth-app/public/api/auth';
 
    class PostEdit extends React.Component {  
      constructor(props) {
        super(props);
        this.state = {
          selectedFile: null,
          caption: '',
          imageview: '',
          description: '',
          for_sale: '',
          category_id: '', 
          comments: true,
          showerror: false,
          price: '',  
          loaded: 0,
          file: null,
          dragOver: false,
          errorNoficication: null 
        };

        this.handleAddImage = this.handleAddImage.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleCancelUpload = this.handleCancelUpload.bind(this);
        this.onChangecaption = this.onChangecaption.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
        this.onChangecategory_id = this.onChangecategory_id.bind(this);
        this.onChangecomments = this.onChangecomments.bind(this);
        this.onChangeprice = this.onChangeprice.bind(this);
        this.onChangesale = this.onChangesale.bind(this);
      }
      
      componentDidMount() {
        const id = this.props.match.params.id;
        const user_id = this.props.match.params.user_id
        this.setState({
          fieldVal: id
        }) 
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        }
   
        const url = `${API_URL}/singlelisting/${id}`;
        axios.get(url, config).then(res => res.data)
            .then((data) => {   
              this.setState({
                file: data.src,
                caption: data.title,
                category_id: data.tag,
                description: data.description,  
                comments: data.comments,
                for_sale: data.sale,
                price: data.price,
              });
                // this.setState({ imageview: data }) 
            })   
    }

      onChangeHandler = event => {
  
        var files = event.target.files
        this.setState({
          selectedFile: files,
          loaded: 0
        }) 
      }

      onChangecaption(e){
        this.setState({ caption: e.target.value })  
      }

      onChangedescription(e){
        this.setState({ description: e.target.value })  
      }

      onChangeprice(e){
        this.setState({ price: e.target.value })  
      }

      onChangesale(e){
        this.setState({ for_sale: e.target.value })  
      }

      onChangecategory_id(e){
        this.setState({ category_id: e.target.value })
      }
  
      onChangecomments(e){  
        this.setState({comments: e.currentTarget.checked });  
      }
    
      handleFileChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      handleChangefor_sale = e => {
        this.setState({ for_sale: e.target.value });
        this.setState({ [e.target.name]: e.target.value });
        var saleEdit=e.target.value;
        this.setState(state => {
          state.imageview.sale = saleEdit
          return state
        }) 
      }
    
      handleChangess = e => {
        this.setState({ for_sale: e.target.value });
        this.setState({ [e.target.name]: e.target.value });
        var tagEdit=e.target.value;
        this.setState(state => {
          this.state.category_id = tagEdit
          return state
        }) 
      }
    
      handleChangeComments = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    
        this.setState({
          comments:!this.state.comments
      })

      }
  
        CancelUpload = (e) => { 
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

          handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }  
            this.setState({showerror: false}); 
          };
 
          saveAll = (e) => {     
            e.preventDefault();

            const obj = new FormData();  
              obj.append('file', this.state.file);
              obj.append('caption', this.state.caption);
              obj.append('description', this.state.description);
              obj.append('category_id', this.state.category_id);
              obj.append('comments', this.state.comments);
              obj.append('for_sale', this.state.for_sale);
              obj.append('price', this.state.price); 
            // const obj = {
            //   file : this.state.file.name,
            //   caption: this.state.caption,
            //   description: this.state.description, 
            //   category_id: this.state.category_id,
            //   comments: this.state.comments, 
            //   for_sale: this.state.for_sale,
            //   price: this.state.price,  
            // };

          var imgVal = $('#uploaded').val(); 
          if(imgVal=='') 
          { 
                this.setState({showerror: true}); 

          } else{
            const id = this.props.match.params.id; 
            const data = new FormData()
            for (var x = 0; x < this.state.file.length; x++) {
              data.append('name', this.state.file[x]);
            }

            for (let name in this.state.imageview) { 
              if(name=="tag"){
                data.append('category_id', this.state.imageview['tag']);
              }

              if(name=="title"){ 
                data.append('caption', this.state.imageview['title']);
              }

              if(name=="sale"){  
                data.append('for_sale', this.state.imageview['sale']);
              }

              else{
                data.append(name, this.state.imageview[name]);
              } 
            }  
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
                  axios.post(`http://localhost/auth-app/public/api/auth/editpost/${id}`, obj, config, {
                  })
                    .then(res => {
                      swal(res.data.message, {
                        icon: "success",
                      });  
                      // window.location.reload(); 
                    }) 
                } else {
                  swal("Your imaginary file is safe!");
                }  
              });    
      } 
          } 

          download = () =>{ 
            this.setState({ readOnly:true }) 
            document.getElementById('price').value = ''
        } 

          forsale = () =>{
            this.setState({ readOnly:false });
          }
        

          handleDragEnter(e) {
            e.preventDefault();
         }
         handleDragOver(e) {
            e.preventDefault();
            if (!this.state.dragOver) {
               this.setState({
                  dragOver: true
               });
            }
         }
         handleDragLeave(e) {
            e.preventDefault();
            this.setState({
               dragOver: false
            });
         }
         handleDrop(e) {
            e.preventDefault();
            let file = e.dataTransfer.files[0];
            
            // Validate file is of type Image
            const  fileType = file['type'];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg','video/mp4'];
            if (!validImageTypes.includes(fileType)) {
               console.log("Not an image file"); 
               this.setState({
                  file: null,
                  errortypemsg:true,
                  errorNotification: "Not an image File",
                  dragOver: false
               });
               return setTimeout(() => {
                  this.setState({
                     errorNotification: null
                  });
               }, 3000);
            }
            // this.refs.image.files = e.dataTransfer.files;
            document.getElementById('upload-image-input').fileList =  e.dataTransfer.files[0];
            this.setState({
               file,
               dragOver: false
            });
         }
         
          
         handleAddImage(e) { 

            e.preventDefault();

            var uploaded = $('#uploaded').val();    
            let file = e.target.files[0]; 
            // Validate file is of type Image
            const  fileType = file['type'];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg','video/mp4'];
            if (!validImageTypes.includes(fileType)) {
        
               console.log("Not an image and video (mp4) file");
               this.setState({
                  file: null,
                  errortypemsg:true,
                  errorNotification: "Not an image File",
                  dragOverClass: ""
               });
               return setTimeout(() => {
                  this.setState({
                     errorNotification: null
                  });
               }, 3000);
            }
               
            this.setState({
               file
            });
             
         }
           
         handleCancelUpload (e) {
            e.preventDefault();
            this.setState({
               file: null
            });
         }


         render() {    

          const { imageview, value } = this.state; 
          const { snackBarOpen } = this.state;

                        // Match drag over css to hover css
      let dragOverClass = this.state.dragOver
      ? `display-box drag-over`
      : `display-box`;
   
   // If file is set, change upload box text to file name
   let uploadText = this.state.file ?
    <div>
           <h6>{this.state.file.name ? this.state.file.name : this.state.file}</h6>
           <button 
              className="cancel-upload-button btn btn-warning"
              onClick={this.handleCancelUpload}
           >
              Remove
          </button> 
        </div>
      : <div>
          <p className={All.FSize_16}><span style={{ color: '#67edfa' }} className={All.FSize_16}>browser 
          </span>to choose a File <br/>(1600×1200 or larger recommended, up to 10MB each)<span>
          <Link to='/UpgradeProVersion' style={{ color: '#67edfa', textDecorationLine: 'none' ,zIndex: 1,position: 'relative'}} className={All.FSize_16}> Go Pro</Link></span> 
          </p>
        </div>;
    
   let errorNotification = this.state.errorNotification
      ? <div className="error-notification">
           <p>{this.state.errorNotification}</p>
        </div>
      : null;

         return (
        <>
             <Helmet> 
                <title>UploadFile</title> 
                <meta charSet="utf-8" />
                <meta name="description" content="Nested component" />
            </Helmet> 

   {/* { this.state.showerror && <Alert severity="error">This is an error message!</Alert>} */}
   { this.state.showerror && <Snackbar open={this.state.showerror} autoHideDuration={6000} onClose={this.handleClose}><Alert  variant="filled" onClose={this.handleClose} severity="error">Required feild! Upload image</Alert></Snackbar> }
 
            <section className={All.UploadFile}>
                    <Container className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}>
                        <Row className={All.margin_0} > 
                        <Col lg={8} className={`${All.Dragdrop} upload`}>
                            <div className="image-uploader-wrapper">
                              <div className={dragOverClass}>
                                <div className="icon-text-box">
                                    <div className="upload-icon">
                                    <img src={Upload} />
                                    </div>
                                    <div className="upload-text">
                                      {uploadText}
                                    </div> 
                                </div>
                                <div>
                                    <input
                                      type="file"
                                      ref="image"
                                      id="upload-image-input uploaded"
                                      className="upload-image-input"
                                      accept="video/*,image/*"
                                      name="file" 
                                      onDrop={this.handleDrop}
                                      onDragEnter={this.handleDragEnter}
                                      onDragOver={this.handleDragOver}
                                      onDragLeave={this.handleDragLeave}
                                      onChange={this.handleAddImage}
                                    />
                                </div>
                              </div>
                          </div>


                            </Col>
                            <Col lg={4} className={` ${All.pl_lg_30} ${All.pl_xs_0} ${All.pr_xs_0} ${All.pl_md_0} ${All.pr_md_0} ${All.pl_sm_0} ${All.pr_sm_0}`}>
                                {/* <Form /> */} 
                                <form className={All.form}>   

                                    <div className={All.FormGroup}>
                                        <label for="usr">caption</label> 
                                        <input type="text" className={All.FormControl} name="caption" onChange={this.onChangecaption} defaultValue={this.state.caption}/>
                                    </div>    
 
                                    <div className={All.FormGroup}> 
                                        <FormControl component="fieldset" name="method-of-payment">
                                            <RadioGroup style={{ flexDirection: 'row' }}   onChange={this.onChangecategory_id} name="category_id" >
                                              <FormControlLabel value="1" checked={this.state.category_id === "1"} control={<Radio />} label="Images" />
                                              <FormControlLabel value="2" checked={this.state.category_id === "2"} control={<Radio />} label="360°Image" />
                                              <FormControlLabel value="3" checked={this.state.category_id === "3"} control={<Radio />} label="Video" />
                                              <FormControlLabel value="4" checked={this.state.category_id === "4"} control={<Radio />} label="3D Model" />
                                            </RadioGroup>
                                          </FormControl> 
                                    </div>
  
                                    <div className={All.FormGroup}>
                                        <label for="usr">Say about the shot</label> 
                                        <textarea className={All.FormControl} onChange={this.onChangedescription} rows="4" cols="50" name="description" defaultValue={this.state.description}  />  
                                    </div>   

                                 <div className={All.FormGroup}>
                                        <label for="usr">Comments</label>
                                        {/* <FormControlLabel className={All.Checkbox} control={<Checkbox defaultChecked={this.state.comments === 'true'}  onChange={this.onChangecomments}/>} label="Close Comments"  />   */}
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.comments}
                                            onChange={this.onChangecomments} />} name="comments"  
                                            label="Close Comments"  />
                                    </div>      
  
                                    <div className={All.FormGroup}>
                                    <FormControl component="fieldset" name="method-of-payment">
                                            <RadioGroup style={{flexDirection:'row'}} onChange={this.onChangesale} id="for_sale" name="for_sale">
                                            <FormControlLabel value="forsale" checked={this.state.for_sale === "forsale"} control={<Radio  onClick={this.forsale} />} label="For Sale" />
                                            <FormControlLabel value="download" checked={this.state.for_sale === "download"} control={<Radio onClick={this.download} />} label="Download" /> 
                                            </RadioGroup>
                                        </FormControl> 
                                    </div>
  
                                    <div className={All.FormGroup}>
                                                <label for="usr">Price</label> 
                                                <input  onChange={this.onChangeprice}  disabled={this.state.readOnly} id="price" type="number" defaultValue={this.state.price} className={All.FormControl} name="price"  /> 
                                    </div>

                                    <div className={All.Submit}>
                                    <Link to="/UploadFile">
                                        <Button variant="contained"  color="default" onClick={this.CancelUpload} className={All.BtnStyle_4}>Cancel</Button>  
                                    </Link>
                                        <Button variant="contained" type="button"  color="default"  onClick={this.saveAll} className={All.BtnStyle_5}>Publish</Button>      
                                    </div>     

                                    </form>
                            </Col> 
                        </Row>
                </Container>
            </section> 
        </>
    )
}
}
export default PostEdit