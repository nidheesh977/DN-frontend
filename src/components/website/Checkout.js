import React, { useEffect, useState } from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "./All.module.css";
import "../css/Checkout.css";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const domain = process.env.REACT_APP_MY_API

function Checkout() {
    const param = useParams();
    const [data, setData] = useState({})
    useEffect(()=>{
        axios.post(`${domain}/api/subscription/getSubscription`, {id: param.id}).then(res=>{
            console.log(res)
            setData(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
  return (
    <div>
      <div className="h_p_container" style={{ overflowX: "hidden" }}>
        <Container className={All.Container}>
          <Row gutterWidth={40}>
            <Col xl={4.5}>
              <div id="h_p_create_job_container">
                <div className="c_sideTitle">By Upgrading You get</div>
                <div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">{data.images} Images</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">{data.videos} Videos</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">{data.images3d} 3D Images</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">Save as Draft Feature</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">Multiple Upload Feature</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      Immediate Approval of Images
                    </span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">Daily Job Notifications</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      Profile in suggestions of Top Jobs
                    </span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      Pro Label on your Profile
                    </span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      Access to rearrange your images to display
                    </span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      Chances to get hired from your shoot pages
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col>
              <div className="c_title">
                Complete your payment and start living your dream.{" "}
              </div>
              <div className="c_payment">Payment Details</div>
              <hr />
             
              <div>
                <label htmlFor="cardNo">
                  <div className="pd_b_i_profile_head">Card Number</div>
                </label>
                <input
                  type="number"
                  className="pd_b_i_profile_input c_input"
                  id="cardNO"
                />
              </div>
              <Row>
                  <Col>
                  <div>
                <label htmlFor="date">
                  <div className="pd_b_i_profile_head">Expiry Date</div>
                </label>
                <select
              name="date"
              className="pd_b_i_profile_input c_input"
              
              id="date"
              style={{ width: "100%", height:"45px" }}
            >
              <option value="1">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="3">April</option>
              <option value="3">May</option>
              <option value="3">June</option>
              <option value="3">July</option>
              <option value="3">August</option>
              <option value="3">September</option>
              <option value="3">October</option>
              <option value="3">November</option>
              <option value="3">December</option>
              

              
            </select>
              </div></Col>
              <Col>
                  <div>
                <label htmlFor="year">
                  <div className="pd_b_i_profile_head">&nbsp;</div>
                </label>
                <select
              name="year"
              className="pd_b_i_profile_input c_input"
              
              id="year"
              style={{ width: "100%", height:"45px" }}
            >
              <option value="1">Year</option>
              <option value="1">2022</option>
              <option value="2">2023</option>
              <option value="3">2024</option>
              <option value="3">2025</option>
              <option value="3">2026</option>
              <option value="3">2027</option>
              <option value="3">2028</option>
              <option value="3">2029</option>
              <option value="3">2030</option>
              <option value="3">2031</option>
              <option value="3">2032</option>
              <option value="3">2033</option>
              

              
            </select>
              </div></Col>
              <Col>
                  <div>
                <label htmlFor="cvv">
                  <div className="pd_b_i_profile_head">CVV/CVC</div>
                </label>
                <input
                style={{width: "92%"}}
                  type="number"
                  className="pd_b_i_profile_input c_input"
                  id="cvv"
                />
              </div></Col>
              </Row>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="email">
                  <div className="pd_b_i_profile_head">Email Id</div>
                </label>
                <input
                  type="email"
                  className="pd_b_i_profile_input c_input"
                  id="email"
                />
              </div>
              <label for="check" style={{cursor: "pointer", marginBottom:"15px"}} className = "signup_terms_conditions">
                  <input
                    type="checkbox"
                    id="check"
                  />{" "}
                 Save Card for Future Payments
                </label>
                <hr />
                <div>
                    <div className="c_payment">Cost BreakDown</div>
                </div>
                <div className="c_costingDiv">
                    <div className="c_costingTitle">Basic Cost</div>
                    <div className="c_costingCost">${data.price}.00 USD</div>
                </div>
               
                <div className="c_costingDiv">
                    <div className="c_costingTitle">GST/Basic Tax</div>
                    <div className="c_costingCost">${data.gst}.00 USD</div>
                </div>

                <div className="c_costingDiv">
                    <div className="c_costingTitle">Total Payment</div>
                    <div className="c_costingCost">${Number(data.price) + Number(data.gst)}.00 USD</div>
                </div>
                <div className="c_disclaimer">All sales are charged in USD and all sales are final. You will be charged ${Number(data.price) + Number(data.gst)}.00 USD immediately. You will be charged every 30 days thereafter while the subscription is active. Cancel any time. Exchange rates are estimated based on our most recent conversion data and may not reflect the full charge value.</div>
                <Link to="/HireSubscription">
                <button className="c_cBtn1" style={{display:"inline-block"}}>
                    Choose Other
                </button>
                </Link>
                
                <button className="c_cBtn" style={{display:"inline-block"}}>
                    Buy Plan
                </button>

            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Checkout;
