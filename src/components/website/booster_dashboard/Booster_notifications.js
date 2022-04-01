import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./css/Pilot_notifications.css"
import Edit from "./images/edit (3).svg"
const domain = process.env.REACT_APP_MY_API

function Booster_notifications() {
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
              
            }
        )
    })
}, [])
    let [notifications, setNotifications] = useState({
        drone_zone_news: true,
        account_privacy: false,
       
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
axios.post(`${domain}/api/user/updateNotifications`, {droneNews: notifications.drone_zone_news, accountPrivacy: notifications.account_privacy
}, config).then(res=>{
    axios.get(`${domain}/api/user/getUserData`, config).then(res=>{
        console.log(res.data)
        setNotifications(
            {
                drone_zone_news: res.data.droneNews,
                account_privacy: res.data.accountPrivacy,
             
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
       

        {edit &&
            <div className='pd_notifications_save'>
                <button className='pd_notifications_saveBtn' onClick = {saveChanges}>Save Changes</button>

            </div>
        }


</div>;
}

export default Booster_notifications;
