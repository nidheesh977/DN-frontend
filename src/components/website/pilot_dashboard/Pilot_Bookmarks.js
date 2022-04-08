import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-grid-system'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import BookmarkFilled from "../../images/bookmarkFilled.png"
import Bookmark from "../../images/bookmark.png"
// import "./css/Bookmarks.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
const domain = process.env.REACT_APP_MY_API


function Pilot_bookmarks() {
    let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      let [data, setData] = useState([])
      let [myCenters, setMyCenters] = useState([])
    useEffect(()=>{
        axios.get(`${domain}/api/user/getUserDataBookmarks`, config).then(res=>{
            setData(res.data)
            axios.get(`${domain}/api/user/getUserData`, config).then(result=>{
                console.log(res)
                setMyCenters(result.data.markedCenters)
               if(res.data.length == 0){
                   document.getElementById("toHide").style.display = "block"
               }
            })
        })
      
    },[])
    let unbookmark  = (id) =>{
        axios.post(`${domain}/api/center/unsaveCenter/${id}`, config).then(res=>{
          console.log(res)
          axios.get(`${domain}/api/user/getUserDataBookmarks`, config).then(res=>{
            setData(res.data)
            axios.get(`${domain}/api/user/getUserData`, config).then(result=>{
                console.log(res)
                setMyCenters(result.data.markedCenters)
                if(res.data.length == 0){
                    document.getElementById("toHide").style.display = "block"
                }
            })
        })
          })
      
      }
  return (
    <div>
        <div id='toHide' style={{display: "none"}}>
<div className='cd_error_msg'>No Bookmarked Service Centers Yet, Check out and save some.</div>
<center>
    <Link to="/service_centers" >
<button  className='cd_error_btn'>See Service Centers</button></Link></center>
</div>
<Row gutterWidth={20}>

{
    data.map((item, i)=>{
        return(
            <>
            <Col xl={6}>
    <div>
    <Card style={{ marginBottom:"20px"}}>
<CardContent>
    
    <div style={{float: "right", height:"40px"}}>  {
            myCenters.includes(item._id) ?<img src={BookmarkFilled}  onClick={()=>unbookmark(item._id)}/> : <img src={Bookmark} />
        }</div>
    <div style={{display:"flex", justifyContent: "flex-start", marginBottom:"10px"}}>
        
    <div><Link to={`/service_center/${item._id}`}><img src={`${item.profilePic}`} style={{height:"35px", borderRadius:"17.5px"}} /></Link>  </div>
    <Link to={`/service_center/${item._id}`}>
<div style={{fontSize: "22px", marginLeft:"10px"}}>{item.centerName}</div>
</Link>
</div>
<div className='cd_card_title'>Working Timings:</div>
<div className='cd_card_content'>{item.workingHours}</div>
<div className='cd_card_title'>Phone Numbers</div>
<div className='cd_card_content'>{item.phoneNo}
{
    item.secondaryNumber ? "," : ""
}
{
    item.secondaryNumber ? item.secondaryNumber : ""
}
</div>
<div className='cd_card_title'>Location</div>
<div className='cd_card_content'>  {
                                item.address ? item.address.split(",")[0]  : ""
                              }
                              {
                                item.address ? item.address.split(",")[1] ? "," + item.address.split(",")[1] : "" : ""
                              }
                            </div>
<div className='cd_card_title'>Brands</div>
<div className='cd_card_content'>{
item.brandOfDrones.slice(0,3).map((item, i)=>{
return(
    `${item}, `
)})

}</div>


</CardContent>

</Card>
    </div>
    </Col>
            </>
        )
    })
}


</Row>


    </div>
  )
}

export default Pilot_bookmarks