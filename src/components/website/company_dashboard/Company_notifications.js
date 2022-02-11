import React from 'react';
import "../pilot_dashboard/css/Pilot_notifications.css"
import Edit from "./images/edit (3).svg"

function Company_notifications() {
  return <div className='pd_notifications_main'>
<div className='pd_notifications_mainBox'>
    <div className='pd_notifications_main_title'>Notifications Settings</div>
    <img src={Edit}  className="pd_notifications_edit"/>
    
    </div>
    <div className='pd_notifications_alert'>
    <div className='pd_notifications_alert_title'>Alert & Notifications</div>
    <div className='pd_notifications_alert_side'>Send me an mail</div>
        </div>  
        <hr className='pd_notifications_hr'/>
        <div>
            <label className='pd_notifications_label'>
            <input type="checkbox" /> <span className='pd_notifications_title'>Drone Zone News</span>
            </label>
            <div className='pd_notifications_desc'>Get Drone Zone news, announcements and competition updates</div>
        </div>
        <hr className='pd_notifications_hr'/> <div>
            <label className='pd_notifications_label'>
            <input type="checkbox" /> <span className='pd_notifications_title'>Account Privacy</span>
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
            <input type="checkbox" /> <span className='pd_notifications_title'>Anyone hires me</span>
            </label>
        </div>
        <hr className='pd_notifications_hr'/><div>
            <label className='pd_notifications_label2'>
            <input type="checkbox" /> <span className='pd_notifications_title'>Someone mentions me</span>
            </label>
        </div>
        <hr className='pd_notifications_hr'/><div>
            <label className='pd_notifications_label2'>
            <input type="checkbox" /> <span className='pd_notifications_title'>Someone accepts my invitation</span>
            </label>
        </div>
        <hr className='pd_notifications_hr'/><div>
            <label className='pd_notifications_label2'>
            <input type="checkbox" /> <span className='pd_notifications_title'>Anyone follows me</span>
            </label>
        </div>
        <hr className='pd_notifications_hr'/><div>
            <label className='pd_notifications_label2'>
            <input type="checkbox" /> <span className='pd_notifications_title'>Someone comments on one of my shots</span>
            </label>
        </div>
        <hr className='pd_notifications_hr'/>

        <div className='pd_notifications_save'>
            <button className='pd_notifications_saveBtn'>Save Changes</button>

        </div>


</div>;
}

export default Company_notifications;
