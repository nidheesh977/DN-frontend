import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-grid-system";
import "./css/HireProposal.css";
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
            <div>${item.price}.00</div>
          </Col>
          <Col>
            <div style={{textDecoration: "underline", cursor: "pointer"}}>Download Receipt</div>
          </Col>
        </Row>
        </div>
       
      </div>
                  </>
              )
     })
       } 
      
    </div>
  );
}

export default Pilot_Payments;
