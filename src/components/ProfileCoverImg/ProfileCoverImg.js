import React from "react";
import ReactDom from "react-dom";
import AvatarEditor from "react-avatar-editor";
import Avatar from "material-ui/Avatar";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'  
// import Slider from "material-ui/Slider";
import Slider from '@material-ui/core/Slider';
import All from '../website/All.module.css'
import CoverImg from '../images/cover-img.svg'
import CoverEdit from '../images/cover-edit.svg'
import Box from '@material-ui/core/Box';
import axios from 'axios'
import Skeleton from 'react-loading-skeleton';
import swal from 'sweetalert';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { userService } from '../_services/user.service';
import user_image from "../images/user_image.png"

const domain = process.env.REACT_APP_MY_API;

class ProfileCoverImg extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.setEditorRef = this.setEditorRef.bind(this);
    this.handleZoomSlider = this.handleZoomSlider.bind(this);
    this.state = {
      cropperOpen: false,
      img: null,
      zoom: 2,
      defaultCoverPic: "https://images.unsplash.com/photo-1506947411487-a56738267384?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZHJvbmUlMjBwaWxvdHxlbnwwfHwwfHw%3D&w=1000&q=80",
      croppedImg: "https://images.unsplash.com/photo-1506947411487-a56738267384?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZHJvbmUlMjBwaWxvdHxlbnwwfHwwfHw%3D&w=1000&q=80",
      profile: [],
      user: [],
      open: true,
      // SuccessMessages: [],

    };
  }
  
  handleZoomSlider(event, value) {
    let state = this.state;
    state.zoom = value;
    this.setState(state);
  }

  handleFileChange(e) {
    window.URL = window.URL || window.webkitURL;
    let url = window.URL.createObjectURL(e.target.files[0]);
    ReactDom.findDOMNode(this.refs.in).value = "";
    let state = this.state;
    state.img = url;
    state.cropperOpen = true;
    this.setState(state);
  }
  handleSave(e) {
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();

      let state = this.state;
      state.img = null;
      state.cropperOpen = false;
      state.croppedImg = croppedImg;
      this.setState(state => ({ message: state.text, open: true }));
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }
    }

  }

  componentDidMount(){
    console.log(this.props)
    // axios
    //   .get(`${domain}/api/pilot/pilotDetails/${this.props.match.params.id}`)
    //   .then((response) => {
    //     this.setState({

    //     })
    //     // setPilotData(response.data);
    //     // pilotData.map((item, i)=>{
    //     //   return(
    //     //     fol.push()
    //     //   )
    //     // })
    //     console.log(response);
    //   });
  }
  handleCancel() {
    let state = this.state;
    state.cropperOpen = false;
    this.setState(state);
  }
  setEditorRef(editor) {
    this.editor = editor;
  }

  render() {
    const { open, scroll } = this.state;
    return (
      <>
        {/* <Snackbar  open={this.state.open}  autoHideDuration={6000} ><Alert variant="filled"  severity="success">{this.state.SuccessMessages} </Alert></Snackbar> */}
        <MuiThemeProvider >
          <div>
            <Box position="relative">
              {this.state.croppedImg
                ? <Avatar src={this.state.croppedImg} className={All.BackgroundcoverImg} size={100} />
                : <Avatar src={this.state.defaultCoverPic} className={All.BackgroundcoverImg} size={100} />
              }
              <figure className={All.coverEditIcon} >
              <img src={CoverEdit} />
                <div class="bottom-left"><p className={`${All.FSize_15} ${All.TextWhite}`}>Change Your Cover Pic</p></div>
              </figure>
              <Avatar src={CoverImg} className={All.overlayBackgroundCoverImg} />

            </Box>
            <RaisedButton className={All.CoverImg}
              label="Upload an Image"
              labelPosition="before"
              containerElement="label"
              // style={{
              //   width: '86% ',
              //   height: '86% ',
              // }}
            >
              <input
                ref="in"
                type="file"
                accept="image/*"
                onChange={this.handleFileChange}
              />
            </RaisedButton>
            {this.state.cropperOpen && (
              <>

                <Dialog open={open} onClose={this.handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                  <DialogTitle id="scroll-dialog-title">Edit Cover Profile</DialogTitle>
                  <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText id="scroll-dialog-description" ref={this.descriptionElementRef} tabIndex={-1} >
                      <AvatarEditor
                        ref={this.setEditorRef}
                        image={this.state.img} width={200} height={200} border={50} color={[255, 255, 255, 0.6]} scale={this.state.zoom} />

                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <label style={{ fontSize: 12, marginRight: 10, paddingBottom: 22, fontWeight: 600 }}>Zoom</label>
                        <Slider min={1} max={10} step={0.1} value={this.state.zoom} onChange={this.handleZoomSlider} style={{ width: 200 }} />
                      </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </div>
        </MuiThemeProvider>
      </>
    );
  }
}


export default ProfileCoverImg