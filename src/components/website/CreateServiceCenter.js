import React, { Component } from "react"
import All from '../website/All.module.css'
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'
import Cover from './pilot_dashboard/images/cover.jpg'
import "./pilot_dashboard/css/Pilot_BasicInfo.css"
import "../css/ServiceCenterAccount.css"
import Pilot from './pilot_dashboard/images/pilot.jpg'
import Edit from "./pilot_dashboard/images/edit-1.svg"
import Edit2 from "./pilot_dashboard/images/edit (3).svg"
import service_center_1 from "../images/service_center_1.jpg"
import service_center_2 from "../images/service_center_2.jpg"
import service_center_3 from "../images/service_center_3.jpg"
import service_center_4 from "../images/service_center_4.jpg"
import plusicon from '../images/s_d_a_plus_icon.png'
import deleteIcon from './company_dashboard/images/c_j_bin.png'
import PhoneInput from 'react-phone-number-input'

class CreateServiceCenter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active_tab: 1,
      photos: [service_center_1, service_center_2, service_center_3, service_center_4],
      service_center_name: "",
      email: "",
      phone: "+91",
      whatsapp_number: "+91",
      address: "",
      street_name: "",
      area_name: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      edit: true,
      working_hours: "",
      secondary_mob: "",
      website: "",
      brand: "",
      brands: [],
      description: "",
      notifications: {
        drone_zone_news: true,
        account_privacy: false,
        hires_me: false,
        mensions_me: true,
        accept_invitation: false,
        follow_me: false,
        comments: true
      },
      focusField: "",
    }
  }

  changeActiveTab = (tab) => {
    this.setState({
      edit: false,
      active_tab: tab
    })
  }

  addPhoto = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState(prevState => ({
          photos: [...prevState.photos, reader.result]
        }))
        this.refs.add_photo.value = ""
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  showRemoveIcon = (id) => {
    document.getElementById(id).style.visibility = "visible"
  }

  hideRemoveIcon = (id) => {
    document.getElementById(id).style.visibility = "hidden"
  }

  removePhoto = (id) => {
    if(this.state.edit){
      var photos = this.state.photos
      photos.splice(id, 1)
      this.setState({
        photos: photos
      })
    }
  }

  handleChange = (e, field) => {
    if(field == "bio"){
      document.getElementById(`bio_error`).style.display = "none"
    }else{
      document.getElementById(`${field}_error`).style.visibility = "hidden"
    }
    this.setState({
      [field]: e.target.value
    })
    console.log(this.state)
  }

  phoneChangeHandler = (e) => {
    document.getElementById(`phone_error`).style.visibility = "hidden"
    try{
      if(e.length>=1){
        this.setState({
          phone: e
        })
      }
      else{
        this.setState({
          phone: ""
        })
      }
    }
    catch{
      this.setState({
        phone: ""
      })
    }
  }

  whatsappNumberChangeHandler = (e) => {
    document.getElementById(`whatsapp_number_error`).style.visibility = "hidden"
    try{
      if(e.length>=1){
        this.setState({
          whatsapp_number: e
        })
      }
      else{
        this.setState({
          whatsapp_number: ""
        })
      }
    }
    catch{
      this.setState({
        whatsapp_number: ""
      })
    }
  }

  secPhoneChangeHandler = (e) => {
    document.getElementById(`secondary_mob_error`).style.visibility = "hidden"
    try{
      if(e.length>=1){
        this.setState({
          secondary_mob: e
        })
      }
      else{
        this.setState({
          secondary_mob: ""
        })
      }
    }
    catch{
      this.setState({
        secondary_mob: ""
      })
    }
  }

  saveChangesTab1 = () => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    var fields = ["service_center_name", "email", "phone", "whatsapp_number", "address", "street_name", "area_name", "city", "state", "country", "pincode"]
    var error = false

    for (var i = 0; i <= fields.length; i++){
      if (fields[i] === "email"){
        if (this.state[fields[i]] === ""){
          document.getElementById(`${fields[i]}_error`).innerText = "Email is required"
          document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
          error = true
          if(this.state.focus === ""){
            this.setState({
              focusField: fields[i]
            })
          }
        }
        if (!validateEmail(this.state.email)){
          document.getElementById(`${fields[i]}_error`).innerText = "Email is not valid"
          document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
          error = true
          if(this.state.focus === ""){
            this.setState({
              focusField: fields[i]
            })
          }
        }
      }
      if (fields[i] === "phone" || fields[i] === "whatsapp_number"){
        if (this.state[fields[i]] === ""){
          document.getElementById(`${fields[i]}_error`).innerText = `${fields[i]} is required`
          document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
          error = true
          if(this.state.focus === ""){
            this.setState({
              focusField: fields[i]
            })
          }
        }
        else if (this.state[fields[i]].length <= 7){
          document.getElementById(`${fields[i]}_error`).innerText = `${fields[i]} is not valid`
          document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
          error = true
          if(this.state.focus === ""){
            this.setState({
              focusField: fields[i]
            })
          }
        }
      }
      if (this.state[fields[i]] === ""){
        document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
        error = true
        if(this.state.focus === ""){
          this.setState({
            focusField: fields[i]
          })
        }
      }
    }
    if (this.state.focusField !== ""){
      document.getElementById(this.state.focusField).focus()
      this.setState({
        focusField: ""
      })
    }
    if (!error){
      alert("Ready to submit")
    }
  }

  saveChangesTab2 = () => {

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    var fields = ["service_center_name", "email", "phone", "whatsapp_number", "address", "street_name", "area_name", "city", "state", "country", "pincode", "working_hours", "secondary_mob", "website", "brand", "description"]
    var error = false
    for (var i = 0; i < fields.length; i++){
      if (fields[i] === "email"){
        if (this.state[fields[i]] === ""){
          document.getElementById(`${fields[i]}_error`).innerText = "Email is required"
          document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
          document.getElementById(`${fields[i]}`).focus()
          error = true
          if(this.state.focus === ""){
            this.setState({
              focusField: fields[i]
            })
          }
        }
        else if (!validateEmail(this.state.email)){
          document.getElementById(`${fields[i]}_error`).innerText = "Email is not valid"
          document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
          document.getElementById(`${fields[i]}`).focus()
          error = true
          if(this.state.focus === ""){
            this.setState({
              focusField: fields[i]
            })
          }
        }
      }
      if (fields[i] === "phone" || fields[i] === "whatsapp_number"){
        if (this.state[fields[i]] === ""){
          document.getElementById(`${fields[i]}_error`).innerText = `${fields[i]} is required`
          document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
          document.getElementById(`${fields[i]}`).focus()
          error = true
          if(this.state.focus === ""){
            this.setState({
              focusField: fields[i]
            })
          }
        }
        else if (this.state[fields[i]].length <= 7){
          document.getElementById(`${fields[i]}_error`).innerText = `${fields[i]} is not valid`
          document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
          document.getElementById(`${fields[i]}`).focus()
          error = true
          if(this.state.focus === ""){
            this.setState({
              focusField: fields[i]
            })
          }
        }
      }
      if (this.state[fields[i]] === ""){
        document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
        document.getElementById(`${fields[i]}`).focus()
        error = true
        if(this.state.focus === ""){
          this.setState({
            focusField: fields[i]
          })
        }
      }
      if (fields[i] === "brand"){
        if(this.state.brands.length === 0){
          document.getElementById(`brand_error`).style.visibility = "visible"
          document.getElementById(`brand_input`).focus()
          error = true
          if(this.state.focus === ""){
            this.setState({
              focusField: fields[i]
            })
          }
        }
        // continue
      }

      if(this.state[fields[i]] === ""){
        document.getElementById(`${fields[i]}_error`).style.visibility = "visible"
        document.getElementById(`${fields[i]}_input`).focus()
        error = true
        if(this.state.focus === ""){
          this.setState({
            focusField: fields[i]
          })
        }
      }
      if (i == 1 && this.state.secondary_mob.length<=7){
        document.getElementById("secondary_mob_error").style.visibility = "visible"
        document.getElementById("secondary_mob_error").innerText = "Phone number is not valid"
        document.getElementById(`secondary_mob_input`).focus()
        error = true
        if(this.state.focus === ""){
          this.setState({
            focusField: fields[i]
          })
        }
      }
    }

    if (this.state.focusField !== ""){
      document.getElementById(this.state.focusField).focus()
      this.setState({
        focusField: ""
      })
    }

    if(!error){
      alert("Ready to submit")
    }
  }

  saveChangesTab3 = () => {
    alert("Ready to submit")
  }

  clickEdit = (id) => {
    this.setState({edit: true})
    setTimeout(() => {
      document.getElementById(id).focus()
    }, 10)
  }

  addBrand = (e) => {
    if(e.key === "Enter"){
      this.setState(prevState => ({
        brands: [...prevState.brands, prevState.brand],
        brand: ""
      }))
      document.getElementById(`brand_error`).style.visibility = "hidden"
    }
  }

  removeBrand = (id) => {
    var brands = this.state.brands
    brands.splice(id, 1)
    this.setState({
      brands: brands
    })
  }

  notificationChangeHandler = (e) => {
    var notifications = this.state.notifications
    notifications[e.target.id] = !notifications[e.target.id]
    this.setState({
      notifications: notifications
    })
  }

  render() {
    return (
      <>
        <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
 <Row>
            <Col lg={6} className={All.DronePerson} >
              <Hidden xs sm md>
                <div className="backgroundImginPage"></div>
              </Hidden>
            </Col>
            <Col lg={6}>      
                <div className='pd_b_i_main'>
                  
                  <div className="pd_b_i_profile_titleBox">
                  <div className="pd_b_i_profile_title" style={{fontSize: "20px"}}>Welcome almost done, Please fill below fields to complete your profile setup</div>                  </div>
                 
                  <div>
                        <label htmlFor="service_center_name" className='pd_b_i_profile_head'>Service center name</label>
                        <input type="text" className='pd_b_i_profile_input' id = "service_center_name" onChange = {(e) => this.handleChange(e, "service_center_name")} disabled = {!this.state.edit}/>
                        <div className="input_error_msg" id = "service_center_name_error">Service center name is required</div>
                      </div>
                  <Row>
                    <Col lg = {6}>
                    <div>
                        <div>
                          <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="whatsapp_number" className='pd_b_i_profile_head1'>Center Contact Number</label>
                          </div>
                        </div>
                        <PhoneInput defaultCountry="IN" className={All.Phonenumber + " s_c_d_phone_input"} name="phone" id="whatsapp_number" value={this.state.whatsapp_number} onChange = {this.whatsappNumberChangeHandler} disabled = {!this.state.edit}/>
                        <div className="input_error_msg" id = "whatsapp_number_error">Whatsapp number is required</div>
                      </div>
                    </Col>
                    
                    <Col>
                      <div>
                        <div>
                          <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="whatsapp_number" className='pd_b_i_profile_head1'>Whatsapp Number</label>
                          </div>
                        </div>
                        <PhoneInput defaultCountry="IN" className={All.Phonenumber + " s_c_d_phone_input"} name="phone" id="whatsapp_number" value={this.state.whatsapp_number} onChange = {this.whatsappNumberChangeHandler} disabled = {!this.state.edit}/>
                        <div className="input_error_msg" id = "whatsapp_number_error">Whatsapp number is required</div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col xl={6}>
                      <div>
                        <label htmlFor="street_name" className='pd_b_i_profile_head'>Street name</label>
                        <input type="text" className='pd_b_i_profile_input' id = 'street_name' onChange = {(e) => this.handleChange(e, "street_name")} disabled = {!this.state.edit}/>
                        <div className="input_error_msg" id = "street_name_error">Street name is required</div>
                      </div>
                    </Col><Col xl={6}>
                      <div>
                        <label htmlFor="area_name" className='pd_b_i_profile_head'>Area name</label>
                        <input type="text" className='pd_b_i_profile_input' id = "area_name" onChange = {(e) => this.handleChange(e, "area_name")} disabled = {!this.state.edit}/>
                        <div className="input_error_msg" id = "area_name_error">Area name is required</div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={6}>
                      <div>
                        <label htmlFor="city" className='pd_b_i_profile_head'>City</label>
                        <input type="text" className='pd_b_i_profile_input' id = 'city' onChange = {(e) => this.handleChange(e, "city")} disabled = {!this.state.edit}/>
                        <div className="input_error_msg" id = "city_error">City is required</div>
                      </div>
                    </Col><Col xl={6}>
                      <div>
                        <label htmlFor="state" className='pd_b_i_profile_head'>State</label>
                        <input type="text" className='pd_b_i_profile_input' id = "state" onChange = {(e) => this.handleChange(e, "state")} disabled = {!this.state.edit}/>
                        <div className="input_error_msg" id = "state_error">State is required</div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={6}>
                      <div>
                        <label htmlFor="country" className='pd_b_i_profile_head'>Country</label>
                        <input type="text" className='pd_b_i_profile_input' id = "country" onChange = {(e) => this.handleChange(e, "country")} disabled = {!this.state.edit}/>
                        <div className="input_error_msg" id = "country_error">Country is required</div>
                      </div>
                    </Col><Col xl={6}>
                      <div>
                        <label htmlFor="pincode" className='pd_b_i_profile_head'>Pincode</label>
                        <input type="number" className='pd_b_i_profile_input' id = "pincode" onChange = {(e) => this.handleChange(e, "pincode")} disabled = {!this.state.edit}/>
                        <div className="input_error_msg" id = "pincode_error">Pincode is required</div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className='pd_b_i_main'>
                  
                  <div>
                    <label htmlFor="working_hours_input" className='pd_b_i_profile_head'>Working Hours</label>
                    <input type="text" className='pd_b_i_profile_input' id = "working_hours_input" placeholder="9.00 AM - 8.00 PM" disabled = {!this.state.edit} onChange={(e) => this.handleChange(e, "working_hours")}/>
                    <div className="input_error_msg" id = "working_hours_error">Working hours is required</div>
                  </div>
                  <Row>
                    <Col sm={12} md={6}>
                      <div>
                        <div>
                          <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="secondary_phone" className='pd_b_i_profile_head1'>Alternate Number (optional)</label>
                          </div>
                        </div>
                        {/* <input type="text" id = "secondary_phone" className='pd_b_i_profile_input' disabled = {!this.state.edit}/> */}
                        <PhoneInput defaultCountry="IN" className={All.Phonenumber + " s_c_d_phone_input"} name="phone" id="secondary_mob_input" value={this.state.phone} onChange = {this.secPhoneChangeHandler} disabled = {!this.state.edit}/>
                        <div className="input_error_msg" id = "secondary_mob_error">Secondary mobile number is required</div>
                      </div>
                    </Col><Col sm={12} md={6}>
                      <div>
                        <div>

                          <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="website" className='pd_b_i_profile_head1'>Website</label>
                          </div>
                        </div>


                        <input type="text" id = "website_input" placeholder="Ex: www.test.com" className='pd_b_i_profile_input' disabled = {!this.state.edit} onChange={(e) => this.handleChange(e, "website")} />
                        <div className="input_error_msg" id = "website_error">Website is required</div>
                      </div>
                    </Col>
                  </Row>
                  <div>
                    <label htmlFor="brand_input" className='pd_b_i_profile_head'>Brand of drones</label>
                    <input type="text" id = "brand_input"  className='pd_b_i_profile_input' placeholder="Type and click Enter to add" disabled = {!this.state.edit} onChange={(e) => this.handleChange(e, "brand")} onKeyDown = {this.addBrand} value = {this.state.brand}/>
                    <div className="input_error_msg" id = "brand_error">Brand of drones is required</div>
                  </div>
                  <div className="s_c_a_brand_container">
                    {this.state.brands.map((brand, index) => {
                      return (
                        <div className="s_c_a_brand" onClick = {() => this.removeBrand(index)}>{brand} <i class="fa fa-check" aria-hidden="true" style={{ marginLeft: "20px" }}></i></div>
                      )
                    })}
                  </div>
                  <div>
                    <label htmlFor="description" className='pd_b_i_profile_head'>Description</label>
                    <textarea type="text" className='pd_b_i_profile_inputDesc' id = "description_input" placeholder='Write description about your service center' style={{ marginBottom: "10px" }} disabled = {!this.state.edit} onChange={(e) => this.handleChange(e, "description")}></textarea>
                    <div className="input_error_msg" id = "description_error">Description is required</div>
                  </div>
                  <div className="s_c_a_photos">
                    <div className="pd_b_i_profile_head">Photos</div>
                    <div className="s_c_a_photos_container">
                      {this.state.photos.map((photo, index) => {
                        return (
                          <div className="s_c_a_photo" key={index} onMouseOver = {() => this.showRemoveIcon(`s_c_a_remove_img_${index}`)} onMouseLeave = {() => this.hideRemoveIcon(`s_c_a_remove_img_${index}`)}>
                            <img src={photo} alt="" className="s_c_a_photo_img" />
                            <img src={deleteIcon} alt="" className="s_c_a_remove_img" id={`s_c_a_remove_img_${index}`} onClick = {() => this.removePhoto(index)}/>
                          </div>
                        )
                      })}

                      <label className="s_c_a_photo_add">
                        <input type="file" name="" id="" style={{ display: "none" }} onChange={this.addPhoto} ref = "add_photo"  accept="image/*" disabled = {!this.state.edit}/>
                        <div className="s_c_a_photo_add_symbol">
                          <img src={plusicon} alt="" className="s_c_a_plus_icon" />
                        </div>
                        <div className="s_c_a_photo_add_text">Add photos</div>
                      </label>
                    </div>
                  </div>
                  <div className='pd_b_i_notifications_save'>
                    <button className='pd_b_i_notifications_saveBtn' onClick = {this.saveChangesTab2}>Save Changes</button>

                  </div>
                </div>
              </Col>
              </Row>
        </Container>
      </>
    )
  }
}

export default CreateServiceCenter