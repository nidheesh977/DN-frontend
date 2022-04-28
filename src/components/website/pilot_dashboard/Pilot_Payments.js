import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-grid-system";
import "./css/HireProposal.css";
import { jsPDF } from "jspdf";

const domain = process.env.REACT_APP_MY_API


function Pilot_Payments() {
    let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      let [data, setData] = useState([])
    useEffect(()=>{
        axios.get(`${domain}/api/payment/getPayments`, config).then(res=>{
            console.log(res)
            setData(res.data)
        })
    }, [])
    let [pdfData, setPdfData] = useState({
      name: "",
      transactionId: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      date: "",
      plan: "",
      status: "",
      price: ""

    })
    let showMessage = (id) =>{
        let message = document.getElementById(`messageToShow/${id}`);
        if(message.innerHTML == "Show Message"){
            console.log("1")
            message.innerHTML = "Hide Message"
            document.getElementById(`toHideBox/${id}`).style.display = "block"

        }
       else if(message.innerHTML == "Hide Message"){
        console.log("2")

            message.innerHTML = "Show Message"
            document.getElementById(`toHideBox/${id}`).style.display = "none"

        }
        else{
            console.log("3")

            message.innerHTML = "Show Message"
            document.getElementById(`toHideBox/${id}`).style.display = "none"
        }
    }
    let downloadInvoice = (id, name, line1, line2, city, state, country, pinCode, createdAt, status, price, plan) =>{
      setPdfData({
        transactionId: id,
        name: name,
        line1: line1,
        line2,
        city,
        state,
        country,
        pinCode,
        date: createdAt.slice(0,10),
        status,
        price,
        plan
      })
      let doc = new jsPDF("portrait", 'pt', 'A4');
      doc.html(document.getElementById('pdf-view'), {
        callback: () => {
          doc.save('test.pdf');
        }
      });
    }
  return (
    <div>
      <div className="box0">
        <Row  gutterWidth={5}>
          <Col>
            <div>Date</div>
          </Col>
          <Col>
            <div>Description</div>
          </Col>
          <Col>
            <div>Status</div>
          </Col>
          <Col>
            <div>Cost</div>
          </Col>
          <Col>
            <div>Receipt</div>
          </Col>
        </Row>
      </div>
      {
        data.length == 0 ? <div id="tohide" >
        <div>No Payments yet please Upgrade</div>
      </div> : <></>
      }
      

      {
          data.map((item, i)=>{
              return(
                  <>
                  <div>
        <div className="box1">
        <Row  gutterWidth={5}>
          <Col>
            <div>{item.createdAt.slice(0,10)}</div>
          </Col>
          <Col>
            <div style={{textTransform: "capitalize"}}>{item.plan}</div>
          </Col>
          <Col>
            <div style={{textTransform: "capitalize"}}>{item.status}</div>
          </Col>
          <Col>
            <div>{
              item.country !== "India" ? `$ ${item.price/100}.00` : `INR ${item.price}`
          }</div>
          </Col>
          <Col>
            <div style={{textDecoration: "underline", cursor: "pointer"}} onClick={()=>downloadInvoice(item.transactionId, item.name, item.line1, item.line2, item.city, item.state, item.country, item.pinCode, item.createdAt, item.status, item.price, item.plan)}>Download Receipt</div>
          </Col>
        </Row>
        </div>
       
      </div>
                  </>
              )
     })
       } 
       
       <div style={{visibility: 'hidden'}}>
      <div className='pdf_mainDiv'  id="pdf-view" style={{display: "block"}} >
<div className='pdf_imageDiv'>
  <center>

  <img src="https://www.nexevo.in/images/logolast.png" className='pdf_iconImg' />
  </center>
</div>
<div className='pdf_invoiceDiv'>
 <div><b>Payment Invoice</b></div>
 <div><b>Invoice Id :</b> DN{pdfData.transactionId}</div>
</div>
<Row gutterWidth={0}>
<Col style={{border: "1px solid gray", padding: "5px"}}>
  <div className='pdf_client'>Client : </div>
  <div>Nexevo Technologies</div>
  <div>Kasturi Nagar, Rajiv Nagar</div>
  <div>Bangalore Karnataka</div>
  <div>India 560041</div>
  </Col>
  <Col style={{border: "1px solid gray", padding: "5px"}}>
    
  <div className='pdf_client'>Customer : </div>
  <div>{pdfData.name}</div>
  <div>{pdfData.line1}</div>
  <div>{pdfData.line2}</div>
  <div>{pdfData.city} {pdfData.state}</div>
  <div>{pdfData.country} {pdfData.pinCode}</div>
  </Col>
  
</Row>
<Row gutterWidth={0}>
  <Col style={{border: "1px solid gray", padding: "5px"}}>
  <div className='pdf_client'>Payment Date : </div>
  <div>{pdfData.date}</div>

  </Col>
  <Col style={{border: "1px solid gray", padding: "5px"}}>
  <div className='pdf_client'>Total Amount : </div>
  <div>{pdfData.country !== "India" ? `$ ${pdfData.price/100}.00` : `INR ${pdfData.price}`}</div>
 
  </Col>
</Row>
<div className='pdf_statusdiv'>
  <div className='pdf_client'>Payment Status : </div>
  <div>{pdfData.status}</div>
</div>
<div className='pdf_table'>
  <Row className='pdfHeadRow'>
    <Col xl={1.5}>Sl No</Col>
    <Col> Package Name</Col>
    <Col xl={2}>Amount</Col>
  </Row>
  <hr style={{maxWidth: "98%",border: 'none', background:"gray"}}/>
  <Row>
    <Col xl={1.5}>1</Col>
    <Col>{pdfData.plan}</Col>
    <Col xl={2}>{pdfData.country !== "India" ? `US $${pdfData.price/100}.00` : `INR ${pdfData.price}`}</Col>
  </Row>
  <hr style={{maxWidth: "98%", border: 'none', background:"gray"}}/>
  <Row className='pdfHeadRow'>
    <Col xl={1.5}></Col>
    <Col >Total  :</Col>
    <Col xl={2}>{pdfData.country !== "India" ? `US $${pdfData.price/100}.00` : `INR ${pdfData.price}`}</Col>
  </Row>
</div>
<div className='pdf_table'>
  <div>Notice : Payment once paid will not be refunded under any circumstances, your currency is evaluated based on your location of residence. Please find the refund policy in help section for more details</div>
</div>
<div className='pdf_table'>
  <div style={{textAlign : "center"}}>Thank for joining our Pro Team</div>
</div>
</div>
</div>
</div>
  );
}

export default Pilot_Payments;
