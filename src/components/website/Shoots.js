import React from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "./All.module.css";
import { Helmet } from "react-helmet";
import First from "../images/1stPlace.png"
import Second from "../images/2ndPrize.png"
import View from "../images/viewPost.png"
import Like from "../images/likePost1.png"
import Download from "../images/downloadPost1.png"

function Shoots() {
  return (
    <div>
      <Helmet>
        <title>Shoot of the week</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>
      <div className="h_p_container" style={{ overflowX: "hidden" }}>
      <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
      <Container>
          <div class="MuiBox-root MuiBox-root-11" style={{textAlign: "center"}}>
            <h2 className="All_BlogDeatailTitle__3XrbQ">Shoot of The Week</h2>
          </div>{" "}
          <div style={{position : "relative"}}>
              <img  src="https://dn-nexevo-landing.s3.ap-south-1.amazonaws.com/0-3429_nature-wallpaper-with-flowers-image-good-morning-photo78ae2e630fd5aa189b65585031b0f990fcd3c582b67ff59e0cb6de6d66c5af07.jpg" style={{width: "100%", borderRadius:"10px"}}/>
              <div  style={{position:"absolute", top: '20px', right:"30px", backgroundColor:"#0000007F", padding:"10px", borderRadius:"90px"}}>
              <img src={First}/>
          </div>

          </div>
          <div style={{float:"right", display:"flex", alignItems:"center"}}>
          <img src={Like} style={{height: "35px", marginLeft:"15px"}} /> <span style={{ marginLeft:"10px"}}>25K</span>
          <img src={Download} style={{height: "35px", marginLeft:"15px"}} /> <span style={{ marginLeft:"10px"}}>25K</span>
          <img src={View} style={{height: "35px", marginLeft:"15px"}} /> <span style={{ marginLeft:"10px", marginRight:"20px"}}>25K</span>
          </div>

          <div style={{margin:"20px 0px 50px 0px"}}>
          <Row>
              <Col lg={1.4} xs={3}>
                {" "}
                <img
                  src={`https://dn-nexevo-original-files.s3.ap-south-1.amazonaws.com/profile99fbbd1e140080f2b1ea8306896072342cd8cb506bff644ecd7f2f8b3e6e4e1d.jfif`}
                  style={{
                    height: "75px",
                    width: "75px",
                    borderRadius: "37.5px",
                    cursor: "pointer",
                  }}
                />
              </Col>
              <Col>
                {" "}
                <div className="i_v_name">
                  <div
                    style = {{display: "flex", alignItems: "center", cursor: "pointer" }}
                  >
                    Yaseen Ahmed 
                  </div>
                  <div
                      className="i_v_follow"
                    >
                      Followed
                    </div>
                  
                </div>
              </Col>
            </Row>
            </div>
            <div style={{position : "relative"}}>
              <img  src="https://dn-nexevo-landing.s3.ap-south-1.amazonaws.com/0-3429_nature-wallpaper-with-flowers-image-good-morning-photo78ae2e630fd5aa189b65585031b0f990fcd3c582b67ff59e0cb6de6d66c5af07.jpg" style={{width: "100%", borderRadius:"10px"}}/>
              <div  style={{position:"absolute", top: '20px', right:"30px", backgroundColor:"#0000007F", padding:"10px", borderRadius:"90px"}}>
              <img src={Second}/>
          </div>

          </div>
          <div style={{float:"right", display:"flex", alignItems:"center"}}>
          <img src={Like} style={{height: "35px", marginLeft:"15px"}} /> <span style={{ marginLeft:"10px"}}>25K</span>
          <img src={Download} style={{height: "35px", marginLeft:"15px"}} /> <span style={{ marginLeft:"10px"}}>25K</span>
          <img src={View} style={{height: "35px", marginLeft:"15px"}} /> <span style={{ marginLeft:"10px", marginRight:"20px"}}>25K</span>
          </div>

          <div style={{margin:"20px 0px 50px 0px"}}>
          <Row>
              <Col lg={1.4} xs={3}>
                {" "}
                <img
                  src={`https://dn-nexevo-original-files.s3.ap-south-1.amazonaws.com/profile99fbbd1e140080f2b1ea8306896072342cd8cb506bff644ecd7f2f8b3e6e4e1d.jfif`}
                  style={{
                    height: "75px",
                    width: "75px",
                    borderRadius: "37.5px",
                    cursor: "pointer",
                  }}
                />
              </Col>
              <Col>
                {" "}
                <div className="i_v_name">
                  <div
                    style = {{display: "flex", alignItems: "center", cursor: "pointer" }}
                  >
                    Yaseen Ahmed 
                  </div>
                  <div
                      className="i_v_follow"
                    >
                      Followed
                    </div>
                  
                </div>
              </Col>
            </Row>
            </div>
        </Container>
        </Container>
      </div>
    </div>
  );
}

export default Shoots;
