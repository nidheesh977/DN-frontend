import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import "./css/Pilot_followers.css"
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import Pilot from "./images/pilot.jpg";
import loadMore from "../../images/Group 71.svg";
import { Link } from 'react-router-dom';
import axios from 'axios';


const domain = process.env.REACT_APP_MY_API

function Center_followers() {
    let history = useHistory();

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
    const viewProfile = (userId, role) =>{
if(role === "pilot"){
    console.log("i m a pilot")
    axios.post(`${domain}/api/pilot/getPilotId`,{userId : userId}).then(res=>{
        console.log(res.data[0]._id)
        history.push(`/pilot_details/${res.data[0]._id}`)
    }).catch(err=>
        console.log(err))
}    }


const removeFollow = (userId) =>{
    axios.post(`${domain}/api/follow/unfollow/${userId}`, config).then(res=>{
        axios.post(`${domain}/api/follow/getMyFollowersPopulated`, config).then(
            (res) => {
              console.log(res);
      
             setMyFollowers(res.data)
      
      
      
      })    })
}
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
                            <option>Droners</option>
                            <option>Service Centers</option>
                            <option>Companies</option>
                            <option>DN User</option>
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


                                        {
                                            !item.profilePic ? <img src="https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094623-stock-illustration-female-avatar-woman.jpg" alt="pilot img" className='pd_followers_pilot_img' /> : <img src={item.profilePic} alt="pilot img" className='pd_followers_pilot_img' />
                                        }
                                   
                                    </div>
                                </Col>
                                <Col xs={5.25}>
                                    <div className='pd_followers_pilotDetails'>
                                        <div className='pd_followers_pilotName'>{item.name}</div>
                                        <div className='pd_followers_pilotType' style={{textTransform : "capitalize"}}>{item.role}</div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='pd_followers_profile'>
                                        <div className='pd_followers_profileBox'>
                                            {
                                                item.role === "pilot" ?  
                                                <button className="pd_followers_profileBtn" onClick={()=>viewProfile(item._id, item.role)}>View Profile</button>
                                                 :<div>
                                            <button className="pd_followers_profileBtn" style={{opacity: "0.5"}}>View Profile</button>
                                            </div>
                                            }
                                        
                                            <div className='pd_followers_profileUnfollow' onClick={()=>removeFollow(item._id)}>Remove</div>
                                        </div>
                                    </div>

                                </Col>
                            </Row>
                            <hr className='pd_followers_hr' />
                        </div>
                    )
                })
            }
              {/* <div className="a_j_load_div" style={{margin: "65px 0px"}}>
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div> */}



        </div>

    );

}

export default Center_followers;