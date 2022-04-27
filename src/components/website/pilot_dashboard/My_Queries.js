import React, { useEffect, useState } from 'react'
import "./css/HelpCenter.css"
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import axios from 'axios';
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
  
function My_Queries() {
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  const [data, setData]= useState([])
  useEffect(()=>{
    axios.post(`${domain}/api/query/getQueries`, config).then(res=>{
setData(res.data)
setExpanded(res.data[0]._id)    })
  },[])
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <div>
        <div>
   

        <div className='hc_titleHead '>Your Questions</div>
        </div>

        <div  className="hc_acc_div">
          {
            data.map((item, i)=>{
              return(
                <>
                <Accordion expanded={expanded === item._id} onChange={handleChange(item._id)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{item.query} <span className='mq_badge'>{item.status}</span></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className='mq_desc'>{item.description}</div>
            <div className='mq_ans'>
            {
              item.answer? item.answer : "No answer yet"
            }
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
                </>
              )
            })
          }
     
    </div>
    </div>
  )
}

export default My_Queries