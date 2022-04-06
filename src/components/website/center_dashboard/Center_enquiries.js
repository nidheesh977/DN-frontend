import * as React from 'react'; 
import {useEffect, useState} from "react"
import All from "../../website/All.module.css";
import Close from "../../images/close.svg";
import "./css/Bookmarks.css"
import axios from "axios"
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import {Row} from "react-grid-system"
import Table from '@mui/material/Table' ;
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import View from "./images/eye-view.png"
const domain = process.env.REACT_APP_MY_API

const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

export default function BasicTable() {
    let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      let [data, setData] = useState([])
      let [loginErrorPopup, setloginErrorPopup] = useState(false)
      let [popupData, setPopupData] = useState({
          name:"",
          phoneNo: 0,
          emailId: "",
          message: ""
      })
      let loginErrorPopupClose = () => {
        setloginErrorPopup(false)
      }
    useEffect(()=>{
        axios.get(`${domain}/api/enquiry/getEnquiries`, config).then(res=>{
            console.log(res)
            setData(res.data)
        })
    }, [])
    let showPopupwithData = (name, email, phoneNo, message) =>{
        setPopupData({
            name: name,
            emailId: email,
            phoneNo: phoneNo,
            message: message
        })
        setloginErrorPopup(true)

    }
  return (
      <>
    <TableContainer component={Paper}  style={{marginBottom :"30px"}}>
      <Table sx={{ minWidth: 370 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  style={{fontFamily: "muli-bold"}}>Sl.No</TableCell>
            <TableCell  style={{fontFamily: "muli-bold"}}>Name</TableCell>
            <TableCell  style={{fontFamily: "muli-bold"}}>Email Id</TableCell>
            <TableCell  style={{fontFamily: "muli-bold"}}>PhoneNo</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
            data.map((item, i)=>{
                return(
                    <TableRow
             
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                     {i+1}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.emailId}</TableCell>
                    <TableCell>{item.phoneNo}</TableCell>
                    <TableCell><img src={View} style={{height:"30px"}} onClick={()=>showPopupwithData(item.name, item.emailId, item.phoneNo, item.message)}/></TableCell>
                    
      
                    
                  </TableRow>
                )
            })
        }

          
       
            

        </TableBody>


      </Table>
    </TableContainer>


    <Dialog
              open={loginErrorPopup}
              onClose={loginErrorPopupClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"md"}
              fullWidth={true}
              PaperProps={{ style: { borderRadius: 10, width: "600px" } }}
            >
              <DialogContent
                className={All.PopupBody}
                style={{ marginBottom: "50px" }}
              >
                <div
                  style={{ position: "absolute", top: "20px", right: "20px" }}
                >
                  <img
                    src={Close}
                    alt=""
                    onClick={loginErrorPopupClose}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div style={{ marginTop: "30px" }}>
                    <div className='ce_popup_head'>Enquiry</div>
                    <div className='ce_popup_title'>From : &nbsp;
                    <span className='ce_popup_data'>{popupData.name}</span>
                </div>
                <div className='ce_popup_title'>Email : &nbsp;
                    <span className='ce_popup_data'>{popupData.emailId}</span>
                </div>
                <div className='ce_popup_title'>PhoneNo : &nbsp;
                    <span className='ce_popup_data'>{popupData.phoneNo}</span>
                </div>
                    <div className='ce_popup_title1'>Message :- </div>
                    <div className='ce_popup_data'> &nbsp;&nbsp; {popupData.message}</div>
                 
                </div>
              </DialogContent>
            </Dialog>

    
    </>
  );
}
