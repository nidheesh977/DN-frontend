import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { Container, Row, Col } from "react-grid-system";
import axios from "axios";
const domain = process.env.REACT_APP_MY_API;

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      tags: []
    };
  }
  componentDidMount() {
    axios.get(`${domain}/api/category/getCategories`).then((res) => {
      console.log(res.data);

      this.setState({
        categories: res.data,
      });
    });
    axios.get(`${domain}/api/tag/getTags`)
    .then(res => {
        this.setState({
            tags: res.data
        })
    })
  }
  render() {
    return (
      <div id="footer">
        <Row>
          <Col xl={2} md={3.8} sm={6} xs={6}>
            <ul>
              <li className="footer_title">Blogs</li>
              {this.state.categories.map((item, i) => {
                return (
                  <li>
                    <a
                      className="footer_link"
                      style={{ fontSize: "30px" }}
                      href={`/blogs/${item.slug}`}
                    >
                      {item.category}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Col>
          <Col xl={2} md={4} sm={6} xs={6}>
            <ul>
              <li className="footer_title">Shoots</li>
              {
                this.state.tags.slice(0,5).map((tag, index) => {
                  return(
                    <li key = {index}>
                      <a href = {`/shoots/${tag.slug}`} className="footer_link">{tag.tag}</a>
                    </li>
                  )
                })
              }
            </ul>
          </Col>
          <Col xl={2} md={4.2} sm={6} xs={6}>
            <ul>
              <li className="footer_title">Useful Links</li>
              <li>
                <Link className="footer_link" to="/help-center">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to = "/" className="footer_link">How it works</Link>
              </li>
              <li>
                <Link to = "/" className="footer_link">Advertise with us</Link>
              </li>
              <li>
                <Link className="footer_link" to="/shoot-of-the-week">
                  Shoot of week
                </Link>
              </li>
              
              <li>
                <Link className="footer_link" to="/DownloadSubscription">
                  Pilot Pro
                </Link>
              </li>
              
              <li>
                <Link className="footer_link" to="/HireSubscription">
                  Company Pro
                </Link>
              </li>
              <li>
                <Link className="footer_link" to="/">
                  Our team
                </Link>
              </li>
            </ul>
          </Col>
        
          <Col xl={2.5} md={4.7} sm={6} xs={6}>
            <ul>
              <li className="footer_title">Social Media</li>
              <li>
                <Link to = "/" className="footer_link">Facebook</Link>
              </li>
              <li>
                <Link to = "/" className="footer_link">Instagram</Link>
              </li>
              <li>
                <Link to = "/" className="footer_link">Twitter</Link>
              </li>
              <li>
                <Link to = "/" className="footer_link">LinkedIn</Link>
              </li>
            </ul>
          </Col>

          <Col>
            <ul>
              <li className="footer_title">Top Rated Drones</li>
              <Row>
                <Col xl={6} lg={3.5} md={5} sm={4} xs={4}>
                  <li>
                    <Link to = "/" className="footer_link">DJI Mavic Air 2</Link>
                  </li>
                  <li>
                    <Link to = "/" className="footer_link">DJI Mavic 2 Pro</Link>
                  </li>
                  <li>
                    <Link to = "/" className="footer_link">DJI Mavic Mini</Link>
                  </li>
                  <li>
                    <Link to = "/" className="footer_link">DJI Mavic 2 Zoom</Link>
                  </li>
                  <li>
                    <Link to = "/" className="footer_link">DJI Phanton 4</Link>
                  </li>
                </Col>
                <Col>
                  <li>
                    <Link to = "/" className="footer_link">Parrot Anafi</Link>
                  </li>
                  <li>
                    <Link to = "/" className="footer_link">DJI Mavic Pro</Link>
                  </li>
                  <li>
                    <Link to = "/" className="footer_link">DJI Inspire 2</Link>
                  </li>
                  <li>
                    <Link to = "/" className="footer_link">DJI Inspire 1</Link>
                  </li>
                  <li>
                    <Link to = "/" className="footer_link">Parrot Bebop 2</Link>
                  </li>
                </Col>
              </Row>
            </ul>
          </Col>
        </Row>
        <Row id="copyright">
          <Col xl={8} lg={7} md={6}>
            <ul>
              <li className="footer_copyright">
                Copyright &copy; 2020 Company Name. All Rights Reserved
              </li>
            </ul>
          </Col>
          <Col>
            <ul>
              <li className="footer_copyright">
                Designed &amp; Developed by <a style = {{color: "#00e7fc"}} href = "https://www.demo-nexevo.in/deva/nexevo/" target = "_blank">Nexevo Technologies</a>.
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Footer;
