import React, { useState, useEffect } from 'react'
import "./css/Pilot_followers.css"
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import Pilot from "./images/pilot.jpg";
import loadMore from "../../images/Group 71.svg";
import { Link } from 'react-router-dom';
import axios from 'axios';


const domain = process.env.REACT_APP_MY_API

function Pilot_followers() {

    let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };

      let [myFollowers, setMyFollowers] = useState([]);
  useEffect(()=>{
    axios.post(`${domain}/api/follow/getMyFollowersPopulated`, config).then(
      (res) => {
        console.log(res);

       setMyFollowers(res.data)



})

  }, [])
    let initialValue = {
        profiles: [{ name: "Yasar Arafath", profile: "Professional Pilot", src: "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094623-stock-illustration-female-avatar-woman.jpg" },
        { name: "Haj Mohammed", profile: "Licensed Pilot", src :"https://t3.ftcdn.net/jpg/03/08/77/90/360_F_308779037_iftiqKoqVTDzTnG4t8SSnwnb4s6qRG20.jpg" },
        { name: "Habeeb Mohammed", profile: "Professional Pilot", src: "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/60-512.png" },
        { name: "Yasar Arafath", profile: "Passionate Pilot", src: "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/58-512.png" },
        { name: "Nidheesh Shetty", profile: "Passionate Pilot", src: "https://t3.ftcdn.net/jpg/03/08/77/90/360_F_308779037_iftiqKoqVTDzTnG4t8SSnwnb4s6qRG20.jpg" },
        { name: "Yaseen Ahmed", profile: "Professional Pilot", src: "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/60-512.png" },
        { name: "Yasar Arafath", profile: "Professional Pilot", src: "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/58-512.png" },
        { name: "Yaseen Ahmed", profile: "Passionate Pilot", src: "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/58-512.png" },

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
                myFollowers.map((item, i) => {
                    return (
                        <div>
                            <Row>
                                <Col xl={1.4} xs={2}>
                                    <div className='pd_followers_pilotImageBox' >
                                        <img src="https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094623-stock-illustration-female-avatar-woman.jpg" alt="pilot img" className='pd_followers_pilot_img' />
                                    </div>
                                </Col>
                                <Col xs={5.25}>
                                    <div className='pd_followers_pilotDetails'>
                                        <div className='pd_followers_pilotName'>{item.name}</div>
                                        <div className='pd_followers_pilotType'>{item.roleType}</div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='pd_followers_profile'>
                                        <div className='pd_followers_profileBox'>
                                            {
                                                item.role === "pilot" ?  <Link to={`/pilot_details/${item.roleId}`}>
                                                <button className="pd_followers_profileBtn">View Profile</button>
                                                </Link> :<div>
                                            <button className="pd_followers_profileBtn" style={{opacity: "0.5"}}>View Profile</button>
                                            </div>
                                            }
                                        
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