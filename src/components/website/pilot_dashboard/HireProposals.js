import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-grid-system";
import "./css/HireProposal.css";
const domain = process.env.REACT_APP_MY_API


function HireProposals() {
    let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      let [data, setData] = useState([])
    useEffect(()=>{
        axios.post(`${domain}/api/hireProposal/pilotProposals`, config).then(res=>{
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
          <Col xl={3} xs={3}>
            <div>Company Name</div>
          </Col>
          <Col xl={3} xs={3}>
            <div>Contact No</div>
          </Col>
          <Col xl={3.5} xs={3}>
            <div>Email Id</div>
          </Col>
          <Col xl={2.5} xs={3}>
            <div>Message</div>
          </Col>
        </Row>
      </div>

      {
          data.map((item, i)=>{
              return(
                  <>
                  <div>
        <div className="box1">
          <Row gutterWidth={5}>
            <Col xl={3} xs={3}>
              <div>{item.companyId.companyName}</div>
            </Col>
            <Col xl={2} xs={3}>
              <div>{item.companyId.phoneNo}</div>
            </Col>
            <Col xl={4.5} xs={3}>
              <div>{item.companyId.emailId}</div>
            </Col>
            <Col xl={2.5} xs={3}>
              <div className="showMessage" id={`messageToShow/${item._id}`} onClick={()=>showMessage(item._id)}>Show Message</div>
            </Col>
          </Row>
        </div>
        <div className="box2" id={`toHideBox/${item._id}`}>
          <Row>
            <Col>
              <div className="message_title">Message :-</div>
              <div>
                {item.message}
              </div>
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

export default HireProposals;
