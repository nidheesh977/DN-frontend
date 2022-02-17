import React, { useState } from 'react'
import "./css/Pilot_followers.css"
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import Pilot from "./images/pilot.jpg";
import loadMore from "../../images/Group 71.svg";



function Pilot_followers() {
    let initialValue = {
        profiles: [{ name: "Yasar Arafath", profile: "Professional Pilot" },
        { name: "Yaseen Ahmed", profile: "Passionate Pilot" },
        { name: "Yasar Arafath", profile: "Professional Pilot" },
        { name: "Yaseen Ahmed", profile: "Passionate Pilot" },
        { name: "Yasar Arafath", profile: "Passionate Pilot" },
        { name: "Yaseen Ahmed", profile: "Professional Pilot" },
        { name: "Yasar Arafath", profile: "Professional Pilot" },
        { name: "Yaseen Ahmed", profile: "Passionate Pilot" },

        ]
    }
    let [data, setData] = useState(initialValue);
    return (
        <div className="pd_followers_mainBox">
            <div className='pd_followers_headBox'>
                <Row>
                    <Col>
                        <div className='pd_followers_title'>Followers</div>

                    </Col>
                    <Col>
                        <select className='pd_followers_select'>
                            <option disabled selected>All Profiles</option>
                            <option>Professional Pilot</option>
                            <option>Passionate Pilot</option>
                        </select>
                    </Col>
                </Row>
            </div>
            <hr className='pd_followers_hr' />
            {
                data.profiles.map((item, i) => {
                    return (
                        <div>
                            <Row>
                                <Col xl={1.4} xs={2}>
                                    <div className='pd_followers_pilotImageBox' >
                                        <img src={Pilot} alt="pilot img" className='pd_followers_pilot_img' />
                                    </div>
                                </Col>
                                <Col xs={5.25}>
                                    <div className='pd_followers_pilotDetails'>
                                        <div className='pd_followers_pilotName'>{item.name}</div>
                                        <div className='pd_followers_pilotType'>{item.profile}</div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='pd_followers_profile'>
                                        <div className='pd_followers_profileBox'>
                                            <button className="pd_followers_profileBtn">View Profile</button>
                                            <div className='pd_followers_profileUnfollow'>Remove</div>
                                        </div>
                                    </div>

                                </Col>
                            </Row>
                            <hr className='pd_followers_hr' />
                        </div>
                    )
                })
            }
              <div className="a_j_load_div" style={{margin: "65px 0px"}}>
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div>



        </div>

    );

}

export default Pilot_followers;