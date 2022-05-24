import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Row, Col } from "react-grid-system";
import Alert from '@mui/material/Alert';
import { useHistory } from "react-router-dom";
import All from "../../website/All.module.css";
import Dialog from "@material-ui/core/Dialog";
import Close from "../../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  
function HelpCenter() {
  const history = useHistory()
    const [myData, setMyData] = useState({
        name: "",
        emailId: "",
        query:"Payment Not Working",
        description: ''
    })
    let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };

    useEffect(() => {
        axios.get(`${domain}/api/user/getUserData`, config).then((res) => {
          console.log(res);
 
          setMyData({
              ...myData,
            name: res.data.name,
            emailId: res.data.email,
          });
     
        });
      }, []);
    const changeHandler1 = (e) =>{
        setMyData({
        ...myData,
        [e.target.id]: e.target.value,
      });
      console.log(myData);
    }
    const [addQuestion, setaddQuestion] = useState(false)
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    const closeAddFolder = () =>{
        setaddQuestion(false)
    }
    const createQuery = () =>{
        axios.post(`${domain}/api/query/createQuery`,{
            name: myData.name,
            emailId: myData.emailId,
            description: myData.description,
            query: myData.query
        } ,config).then(res=>{
            setaddQuestion(false)
            document.getElementById("alert1").style.display = "block"
            setMyData({
                name: "",
                emailId: "",
                query:"Payment Not Working",
                description: ''
            })
            axios.get(`${domain}/api/user/getUserData`, config).then((res) => {
       
                setMyData({
                  name: res.data.name,
                  emailId: res.data.email,
                });
           
              });
              
        })
    }
  return (
    <div>
        <div id="alert1" style={{display: 'none'}}>
              <Alert severity="info" style={{marginBottom: "10px"}}>Your Query has been submitted Successfully!</Alert>
              </div>
        <div>
        <div className='hc_askQuestion'onClick={()=>setaddQuestion(true)}>Ask Question</div>

        <div className='hc_titleHead '>Frequently Asked Questions</div>
        </div>

        <div  className="hc_acc_div">
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Payment Pending, What to do?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Amount debited and no active Status</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Does recurring mean we should pay our whole life??</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <center>

      <div className='hc_showMore' onClick={()=>history.push("/help-center")}>Show more</div>
      </center>
    </div>
    <Dialog
        open={addQuestion}
        onClose={closeAddFolder}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
        PaperProps={{
          style: { width: "620px", borderRadius: "10px" },
        }}
      >
        <DialogContent
          className={All.PopupBody}
          style={{ marginBottom: "50px" }}
        >
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
          >
            <img
              src={Close}
              alt=""
              onClick={closeAddFolder}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <div className="sc_popup_head">Ask a question?</div>
            <div className="sc_popup_desc">
              Enter the below details to ask a question our team will connect with you soon{" "}
            </div>
            <div className="sc_popup_input_label">Name</div>
            <input
              type="text"
              className="sc_popup_input"
              name="name"
              id="name"
              value={myData.name}
              onChange={changeHandler1}
            />
            <div className="login_input_error_msg" id="name_error"></div>
            <div className="sc_popup_input_label">EmailId</div>
            <input
              type="email"
              className="sc_popup_input"
              name="emailId"
              id="emailId"
              onChange={changeHandler1}
              value={myData.emailId}
            />
            <div>
            <label htmlFor = "query">
            <div className="pd_b_i_profile_head">Query</div>
            </label>
            <select
              name="query"
              className="sc_popup_input"
                value={myData.query}
              id="query"
              onChange={changeHandler1}
              style={{ width: "100%" }}
            >
              <option value="Payment Not Working" selected>Payment Not Working</option>
              <option value="Money stuck in Bank">Money stuck in Bank</option>
              <option value="Want to know some details">Want to know some details</option>
              <option value="Others">Others</option>
            </select>
           
          </div>
            <div className="login_input_error_msg" id="description_error"></div>
            <div className="sc_popup_input_label">Description</div>
            <textarea
              type="text"
              onChange={changeHandler1}
              className="sc_popup_input"
              name="description"
              id="description"
              style={{height:"140px", paddingTop: "10px"}}
            />
            <div className="login_input_error_msg" id="name_error"></div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <button className="sc_popup_submit" onClick={createQuery}>
                Submit
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default HelpCenter