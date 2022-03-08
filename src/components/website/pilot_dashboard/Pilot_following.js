import React, { useState, useEffect } from 'react'
import "./css/Pilot_followers.css"
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import Pilot from "./images/pilot.jpg";
import loadMore from "../../images/Group 71.svg";
import {Link} from "react-router-dom"
import axios from 'axios';

function Pilot_following() {
    let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };

      let [myFollowing, setMyFollowing] = useState([]);
  useEffect(()=>{
    axios.post(`http://localhost:9000/api/follow/getMyFollowingPopulated`, config).then(
      (res) => {
 
        const folowers = res.data;
        console.log(folowers);
setMyFollowing(folowers) 


})

  }, [])
    let initialValue = {
        profiles: [{ name: "Abhishek", profile: "Passionate Pilot" , src: "https://i.pinimg.com/474x/0e/9c/eb/0e9ceb5002e527dd90b14be502ae91b7.jpg"},
        { name: "Shahrukh Khan", profile: "Professional Pilot", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd1UoWwl6Ts_ZFvqHq8A8QxjRGPSQfWOiC4zUAWVUmYmHukvKGsIYakl7i9qcGEfAuTPM&usqp=CAU" },
        { name: "Yasar Arafath", profile: "Passionate Pilot", src: "https://i.pinimg.com/474x/82/ab/35/82ab3533ee71daf256f23c1ccf20ad6f--avatar-maker.jpg" },
        { name: "Yaseen Ahmed", profile: "Professional Pilot", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3skJyybaYrESeetWiGU5ybPilo9jez3w5u4JeS2EUUsqG7ZSTEP90tRAsvUNQ8pNEaeE&usqp=CAU" },
        { name: "Yasar Arafath", profile: "Passionate Pilot" , src: "https://cdn2.vectorstock.com/i/1000x1000/38/21/male-face-avatar-logo-template-pictograph-vector-11333821.jpg"},
        { name: "Yaseen Ahmed", profile: "Professional Pilot", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNo2N_JJycCNmkFVJPVNdTZcx5QSVpQvir2QpzMzxN80U3QOO1FbWwpsz-Axd8VW7ADTY&usqp=CAU" },
        { name: "Yasar Arafath", profile: "Professional Pilot", src: "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg" },
        { name: "Yaseen Ahmed", profile: "Passionate Pilot", src: "https://i.pinimg.com/474x/82/ab/35/82ab3533ee71daf256f23c1ccf20ad6f--avatar-maker.jpg" },

        ]
    }
    let [data, setData] = useState(initialValue);
    return (
        <div className="pd_followers_mainBox">
            <div className='pd_followers_headBox'>
                <Row>
                    <Col>
                        <div className='pd_followers_title'>Following</div>
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
                myFollowing.map((item, i) => {
                    return (
                        <div>
                            <Row>
                                <Col xl={1.4} xs={2}>
                                    <div className='pd_followers_pilotImageBox' >
                                        <img src="https://i.pinimg.com/474x/82/ab/35/82ab3533ee71daf256f23c1ccf20ad6f--avatar-maker.jpg" alt="pilot img" className='pd_followers_pilot_img' />
                                    </div>
                                </Col>
                                <Col xs={5.25}>
                                    <div className='pd_followers_pilotDetails'>
                                        <div className='pd_followers_pilotName'>{item.name}</div>
                                        <div className='pd_followers_pilotType'>{item.pilotType}</div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='pd_followers_profile'>
                                        <div className='pd_followers_profileBox'>
                                            <Link to={`/pilot_details/${item._id}`}>
                                            <button className="pd_followers_profileBtn">View Profile</button>
                                            </Link>
                                            <div className='pd_followers_profileUnfollow'>Unfollow</div>
                                        </div>
                                    </div>

                                </Col>
                            </Row>
                            <hr className='pd_followers_hr' />
                        </div>
                    )
                })
            }
              <div className="a_j_load_div" style={{margin: "40px 0px"}}>
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div>



        </div>

    );

}

export default Pilot_following;