import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "./All.module.css";
import { styled } from '@mui/material/styles';
import SearchBar from "material-ui-search-bar";

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import { useHistory } from 'react-router-dom';
import Close from "../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
const domain = process.env.REACT_APP_MY_API;

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
  
const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
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
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.post(`${domain}/api/faq/getFaqs`).then(res=>{
            console.log(res)
            setData(res.data)
            if(res.data.length !== 0){

                setExpanded(res.data[0]._id)
            }
        })
    },[])
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
    const [expanded, setExpanded] = useState('panel1');
    const [myData, setMyData] = useState({
        name: "",
        emailId: "",
        query:"Payment Not Working",
        description: ''
    })
    const [keywords, setKeywords] = useState("")
    let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      const [loginErrorPopup, setLoginErrorPopup] = useState(false)
      const loginErrorPopupClose = () =>{
          setLoginErrorPopup(false)
      }
      const changeHandler1 = (e) =>{
        setMyData({
        ...myData,
        [e.target.id]: e.target.value,
      });
      console.log(myData);
    }
    const addPopup = () =>{
        if(!localStorage.getItem("access_token")){
            setLoginErrorPopup(true)
        }else{
            setaddQuestion(true)
        }
    }
    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    const [addQuestion, setaddQuestion] = useState(false)
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
            document.getElementById("alert").style.display = "block"
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
              setTimeout(()=>{
                  document.getElementById("alert").style.display = "none"
              }, 2000)
        })
    }
    const searchFaq = () =>{
     
            axios.post(`${domain}/api/faq/searchFaqs`,{keyword: keywords}).then(res=>{
                console.log(res)
                setData(res.data)
            })
        
    }
  return (
    <div>
          <div className="h_p_container" style={{ overflowX: "hidden", paddingBottom:"30px" }}>
          <Container className={All.Container}>
         
              <div className='hc_searchtitle'>Seach your query</div>
              <SearchBar
    value={keywords}
    onChange={(newValue) => setKeywords(newValue)}
    style={{marginBottom:"20px"}}
    onRequestSearch={searchFaq}
  />
              <div className='h_p_title'>Search from FAQs or write a query of your own</div>
             
              <div style={{margin: "20px 0px"}}>
              <div className='h_p_create_job_title' style={{display: "inline"}}>Frequently Asked Questions</div>
              <div className='hc_askQuestion' onClick={addPopup}>Ask Query</div>
              </div>
              <div id="alert" style={{display: 'none'}}>
              <Alert severity="info" style={{marginBottom: "10px"}}>Your Query has been submitted Successfully! Track in your dashboard to get answers</Alert>
              </div>
              {
                data.length === 0?  <div>No Searches Matched Try Asking a question</div> : 
                <div  className="hc_acc_div">
                {
                    data.map((item, i)=>{
                        return(
<Accordion expanded={expanded === item._id} onChange={handleChange(item._id)}>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>{item.query}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
      {item.answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
                        )
                    })
                }
    
   
  </div>
              }
             
          </Container>
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
      <Dialog
              open={loginErrorPopup}
              onClose={loginErrorPopupClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"md"}
              fullWidth={true}
              PaperProps={{ style: { borderRadius: 10, width: "820px" } }}
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
                <Row style={{ marginTop: "30px" }}>
                  <div
                    className="a_j_popup_title"
                    style={{ padding: "0px 60px" }}
                  >
                    You aren't logged into DroneZone. Please login to continue?
                  </div>
                  <div
                    className="u_f_popup_btn_container"
                    style={{ marginTop: "8px" }}
                  >
                    <div
                      className="j_l_applyJobLoginBtn"
                      style={{ width: "fit-content" }}
                      onClick={() => history.push("/login")}
                    >
                      Login / Sign Up
                    </div>
                  </div>
                </Row>
              </DialogContent>
            </Dialog>
    </div>
  )
}

export default HelpCenter