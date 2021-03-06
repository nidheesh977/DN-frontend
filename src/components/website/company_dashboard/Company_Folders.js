import React, { Component } from "react";
import profileImg from "../../images/profile_user@2x.png";
import locationIcon from "../../images/s_c_location.svg";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import "./css/Company_savedPilots.css";
import loadMore from "../../images/Group 71.svg";
import axios from "axios";
import { Link } from "react-router-dom";

const domain = process.env.REACT_APP_MY_API

export class Company_savedPilots extends Component {
  componentDidMount(){
    axios.post(`${domain}/api/savePilot/getSavedPilots`,{folderId: this.props.match.params.id}).then(res=>{
      console.log(res)
      this.setState({
        pilots: res.data
      })
      if(res.data.length === 0){
        document.getElementById("toHideHere").style.display = "block"
      }
    })

    axios.post(`${domain}/api/folder/getFolderData`,{folderId: this.props.match.params.id}).then(res=>{
      console.log(res)
      this.setState({
        folderData: res.data
      })
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      pilots: [],
      folderData: {},
    };
  }
  handleMoreKeyword = () => {
    // if (this.state.keywords_visible === 3) {
    //   this.setState({
    //     keywords_visible: this.state.keywords.length,
    //   });
    // } else {
    //   this.setState({
    //     keywords_visible: 3,
    //   });
    // }
  };
  pilotDetailPage = (id) => {
    this.props.history.push("/pilot/" + id)
  }

  unsavePilot = (id) =>{
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios.post(`${domain}/api/savePilot/unsavePilot`, {pilotId: id}, config).then(res=>{
      console.log(res.data)
      axios.post(`${domain}/api/savePilot/getSavedPilots`,{folderId: this.props.match.params.id}).then(res=>{
        console.log(res)
        this.setState({
          pilots: res.data
        })
      })
    })
  }
  render() {
    return (
      <div>
        
     
        {
        <>
        <div style={{fontFamily: "muli-bold", fontSize: "24px"}}>{this.state.folderData ? this.state.folderData.folderName : ""}</div>
        <div style={{fontFamily: "muli-regular", fontSize: "18px", margin: "15px 0px"}}>{this.state.folderData ? this.state.folderData.description : ""}</div>
        </>
        }
           <div style = {{textAlign: "center", display: "none"}} id="toHideHere">
      <div className="cd_error_msg">No Saved Pilots yet, check them and save</div>
      <Link to = "/hire_pilots"><button className="cd_error_btn" style = {{padding: "10px 30px"}}>Check Pilots</button></Link>
    </div>
        {this.state.pilots.map((pilot, index)=>{
                        
                        return(
                  <div className='h_p_listing_container'>
                    <Row>
                      <Col>
                        <div className="h_p_listing_img_container">
                          <img src={pilot.pilotId.profilePic} alt="" className='h_p_listing_img' style={{borderRadius: "50px"}} />
                        </div>
                        <div className="h_p_others_container">
                          <div className="h_p_listing_name" onClick={() => this.pilotDetailPage(pilot.pilotId.userName)}>{pilot.pilotId.name}</div>
                          <div className="h_p_listing_job">{pilot.pilotId.pilotType === "unlicensed"?"Professional Drone pilot":"Passionate Drone pilot"}</div>
                          <div className="h_p_listing_location"><img src={locationIcon} alt="" height={"13px"} style={{ marginRight: "4px" }} /> {pilot.pilotId.city}, {pilot.pilotId.country}</div>
                          <div className="h_p_listing_description">{pilot.pilotId.bio}</div>
                          <div className="h_p_listing_keywords_container">
                          {pilot.pilotId.skills.slice(0, 3).map((keyword, index) => {
                                return (
                                  <div className="h_p_listing_keyword">{keyword}</div>
                                )
                              })}
                      
                          </div>
                        </div>
                        <div className="h_p_listing_pricing_rating" style={{marginBottom : "15px"}}>
                          {
                            pilot.pilotId.hourlyPayment ? <div className="h_p_listing_price_container">
                            <div className="h_p_listing_price">${pilot.pilotId.hourlyPayment}</div>
                            <div className="h_p_listing_price_per">/hr</div>
                          </div>  :   <div className="h_p_listing_price_container">
                            <div className="h_p_listing_price">${pilot.pilotId.monthlyPayment}</div>
                            <div className="h_p_listing_price_per">/month</div>
                          </div>
                          }
                        
                        
                          <div className="h_p_listing_btn_container">
                            <button className="h_p_start_process_btn" onClick={() => this.pilotDetailPage(pilot.pilotId.userName)}>View Profile</button>
                            <button className="h_p_save_pilot_btn" onClick={()=>this.unsavePilot(pilot.pilotId._id)}><i class="fa fa-heart" style={{color: "black"}}></i></button>
                          </div>
                         
                        </div>
                      </Col>
                    </Row>
                    
                  </div>
                        )})}
       
        {/* <div className="a_j_load_div">
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div> */}

     

      </div>
    );
  }
}

export default Company_savedPilots;
