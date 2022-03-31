import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./css/Pilot_notifications.css"
import Edit from "./images/edit (3).svg"

function Pilot_notifications() {
    let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
    let [data, setData] = useState({})
useEffect(()=>{
    axios.get(`${domain}/api/user/getUserData`, config).then(res=>{
        console.log(res.data)
        setNotifications(
            {
                drone_zone_news: res.data.droneNews,
                account_privacy: res.data.accountPrivacy,
                hires_me: res.data.hiresMe,
                follow_me: res.data.followsMe,
                comments: res.data.commentsMe
            }
        )
    })
}, [])
    let [notifications, setNotifications] = useState({
        drone_zone_news: true,
        account_privacy: false,
        hires_me: false,
       
        follow_me: false,
        comments: false
    })
    let [edit, setEdit] = useState(false)

    const clickEdit = () => {
        setEdit(true)
    }

    const changeHandler = (e) => {
        let value = notifications[e.target.id]
        setNotifications({
            ...notifications,
            [e.target.id]: !value
        })
    }

    const saveChanges = () => {
axios.post(`${domain}/api/user/updateNotifications`, {droneNews: notifications.drone_zone_news, accountPrivacy: notifications.account_privacy,
hiresMe: notifications.hires_me, followsMe: notifications.follow_me, commentsMe: notifications.comments}, config).then(res=>{
    axios.get(`${domain}/api/user/getUserData`, config).then(res=>{
        console.log(res.data)
        setNotifications(
            {
                drone_zone_news: res.data.droneNews,
                account_privacy: res.data.accountPrivacy,
                hires_me: res.data.hiresMe,
                follow_me: res.data.followsMe,
                comments: res.data.commentsMe
            }
        )
    })

setEdit(false)
})    }

  return <div className='pd_notifications_main'>
<div className='pd_notifications_mainBox'>
    <div className='pd_notifications_main_title'>Notifications Settings</div>
    <img src={Edit}  className="pd_notifications_edit" onClick = {clickEdit}/>
    
    </div>
    <div className='pd_notifications_alert'>
    <div className='pd_notifications_alert_title'>Alert & Notifications</div>
    <div className='pd_notifications_alert_side'>Send me an mail</div>
        </div>
        <hr className='pd_notifications_hr'/>
        <div>
            <label className='pd_notifications_label'>
            <input type="checkbox" disabled = {!edit} checked = {notifications.drone_zone_news} id = "drone_zone_news" onChange = {changeHandler}/> <span className='pd_notifications_title'>Drone Zone News</span>
            </label>
            <div className='pd_notifications_desc'>Get Drone Zone news, announcements and competition updates</div>
        </div>
        <hr className='pd_notifications_hr'/> <div>
            <label className='pd_notifications_label'>
            <input type="checkbox" disabled = {!edit} checked = {notifications.account_privacy} id = "account_privacy" onChange={changeHandler}/> <span className='pd_notifications_title'>Account Privacy</span>
            </label>
            <div className='pd_notifications_desc'>Get important notifications about you</div>
        </div>
        <hr className='pd_notifications_hr'/>

        <div style={{marginTop : "50px"}}>
    <div className='pd_notifications_alert_title'>Account Activity</div>
    <div className='pd_notifications_alert_side'>Send me an mail</div>
        </div>  
        <hr className='pd_notifications_hr'/>
        <div>
            <label className='pd_notifications_label2'>
            <input type="checkbox" disabled = {!edit} checked = {notifications.hires_me} id = "hires_me" onChange = {changeHandler}/> <span className='pd_notifications_title'>Anyone hires me</span>
            </label>
        </div>
     
        <hr className='pd_notifications_hr'/><div>
            <label className='pd_notifications_label2'>
            <input type="checkbox" disabled = {!edit} checked = {notifications.follow_me} id = "follow_me" onChange={changeHandler}/> <span className='pd_notifications_title'>Anyone follows me</span>
            </label>
        </div>
        <hr className='pd_notifications_hr'/><div>
            <label className='pd_notifications_label2'>
            <input type="checkbox" disabled = {!edit} checked = {notifications.comments} id = "comments" onChange={changeHandler}/> <span className='pd_notifications_title'>Someone comments on one of my shots</span>
            </label>
        </div>
        <hr className='pd_notifications_hr'/>

        {edit &&
            <div className='pd_notifications_save'>
                <button className='pd_notifications_saveBtn' onClick = {saveChanges}>Save Changes</button>

            </div>
        }


</div>;
}

export default Pilot_notifications;
