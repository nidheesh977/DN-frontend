import React, { Component } from "react";
import profileImg from "../../images/profile_user@2x.png";
import locationIcon from "../../images/s_c_location.svg";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import "./css/Company_savedPilots.css";
import loadMore from "../../images/Group 71.svg";
import axios from "axios";

const domain = process.env.REACT_APP_MY_API

export class Company_savedPilots extends Component {
  componentDidMount(){
    axios.post(`${domain}/api/savePilot/getSavedPilots`,{folderId: this.props.match.params.id}).then(res=>{
      console.log(res)
      this.setState({
        pilots: res.data
      })
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
      data: [
        {
         
          keywords: [
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "NGO",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
          ],
          rating: 4,
          keywords_visible: 3,
          name: "John Doe",
          profile: "Professional Drone pilot",
          location: "Bangalore, India",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quod, possimus! elit.Quod, possimus!",
          rate: 20,
        },
        {
          keywords: [
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "NGO",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
          ],
          rating: 4,
          keywords_visible: 3,
          name: "Yaseen Ahmed",
          profile: "Pasionate Drone pilot",
          location: "Bangalore, India",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quod, possimus! elit.Quod, possimus!",
          rate: 70,
        },
        {
          keywords: [
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "NGO",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
          ],
          rating: 4,
          keywords_visible: 3,
          name: "John Doe",
          profile: "Professional Drone pilot",
          location: "Bangalore, India",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quod, possimus! elit.Quod, possimus!",
          rate: 20,
        },
        {
          keywords: [
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "NGO",
            "Areal View",
            "Agriculture",
            "NGO",
            "Agriculture",
            "Areal View",
            "Agriculture",
          ],
          rating: 4,
          keywords_visible: 3,
          name: "John Doe",
          profile: "Professional Drone pilot",
          location: "Bangalore, India",
          desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quod, possimus! elit.Quod, possimus!",
          rate: 20,
        },
      ],
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
    this.props.history.push("/pilot_details/" + id)
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
      <div>{
        <>
        <div style={{fontFamily: "muli-bold", fontSize: "24px"}}>{this.state.folderData ? this.state.folderData.folderName : ""}</div>
        <div style={{fontFamily: "muli-regular", fontSize: "18px", margin: "15px 0px"}}>{this.state.folderData ? this.state.folderData.description : ""}</div>
        </>
        }
        
        {this.state.pilots.map((pilot, index)=>{
                        
                        return(
                  <div className='h_p_listing_container'>
                    <Row>
                      <Col>
                        <div className="h_p_listing_img_container">
                          <img src={pilot.pilotId.profilePic} alt="" className='h_p_listing_img' style={{borderRadius: "50px"}} />
                        </div>
                        <div className="h_p_others_container">
                          <div className="h_p_listing_name" onClick={() => this.pilotDetailPage(pilot.pilotId._id)}>{pilot.pilotId.name}</div>
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
                            <button className="h_p_start_process_btn" onClick={() => this.pilotDetailPage(pilot.pilotId._id)}>View Profile</button>
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
