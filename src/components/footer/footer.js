import React, {Component} from "react"
import { Link } from "react-router-dom"
import "./footer.css"
import { Container, Row, Col } from "react-grid-system";


class Footer extends Component{
  render(){
    return(
      <div id = "footer">
          <Row>
            <Col xl={2} md={3.8} sm = {6} xs={6}>
              <ul>
                <li className="footer_title">For Droners</li>
                <li>
                  <Link className="footer_link" style={{fontSize: "30px"}}>Upgrade pro version</Link>
                </li>
                <li>
                  <Link className="footer_link">Explore your Drone work</Link>
                </li>
                <li>
                  <Link className="footer_link">Droner Blog</Link>
                </li>
              </ul>
            </Col>
            <Col xl={2} md={4.2} sm = {6} xs={6}>
              <ul>
                <li className="footer_title">Hire Droners</li>
                <li>
                  <Link className="footer_link">Post job vacancy</Link>
                </li>
                <li>
                  <Link className="footer_link">Post Freelancer Requirement</Link>
                </li>
                <li>
                  <Link className="footer_link">Search Droners</Link>
                </li>
              </ul>
            </Col>
            <Col xl={2} md={4} sm = {6} xs={6}>
              <ul>
                <li className="footer_title">Company</li>
                <li>
                  <Link className="footer_link">Buy Your Dream Drone</Link>
                </li>
                <li>
                  <Link className="footer_link">Sell Your Used Drone</Link>
                </li>
                <li>
                  <Link className="footer_link">Rent Drone</Link>
                </li>
                <li>
                  <Link className="footer_link">Drone Accessories</Link>
                </li>
                <li>
                  <Link className="footer_link">Service Center</Link>
                </li>
              </ul>
            </Col>
            <Col xl={2.5} md={4.7} sm = {6} xs={6}>
              <ul>
                <li className="footer_title">Top Drone Manufacturers</li>
                <li>
                  <Link className="footer_link">Nexevo Technologies</Link>
                </li>
                <li>
                  <Link className="footer_link">Drone Zone</Link>
                </li>
                <li>
                  <Link className="footer_link">Droners.com</Link>
                </li>
                <li>
                  <Link className="footer_link">thedroners.com</Link>
                </li>
                <li>
                  <Link className="footer_link">Drone Power</Link>
                </li>
              </ul>
            </Col>
            
            <Col>
              <ul>
                <li className="footer_title">Top Rated Drones</li>
                <Row>
                  <Col xl = {6} lg = {3.5} md = {5} sm = {4} xs = {4}>
                    <li>
                      <Link className="footer_link">DJI Mavic Air 2</Link>
                    </li>
                    <li>
                      <Link className="footer_link">DJI Mavic 2 Pro</Link>
                    </li>
                    <li>
                      <Link className="footer_link">DJI Mavic Mini</Link>
                    </li>
                    <li>
                      <Link className="footer_link">DJI Mavic 2 Zoom</Link>
                    </li>
                    <li>
                      <Link className="footer_link">DJI Phanton 4</Link>
                    </li>
                  </Col>
                  <Col>
                  <li>
                      <Link className="footer_link">Parrot Anafi</Link>
                  </li>
                    <li>
                      <Link className="footer_link">DJI Mavic Pro</Link>
                    </li>
                    <li>
                      <Link className="footer_link">DJI Inspire 2</Link>
                    </li>
                    <li>
                      <Link className="footer_link">DJI Inspire 1</Link>
                    </li>
                    <li>
                      <Link className="footer_link">Parrot Bebop 2</Link>
                    </li>
                  </Col>
                </Row>
              </ul>
            </Col>
          </Row>
          <Row id = "copyright">
            <Col xl = {8} lg={7} md = {6}>
              <ul>
                <li className="footer_copyright">Copyright &copy; 2020 Company Name. All Rights Reserved</li>
              </ul>
            </Col>
            <Col>
              <ul>
                <li className="footer_copyright">Designed &amp; Developed by Nexevo Technologies.</li>
              </ul>
            </Col>
          </Row>
      </div>
    )
  }
}

export default Footer