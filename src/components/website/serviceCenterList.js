// import React, { Component } from 'react'
// import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
// import "../css/service_centers.css"
// import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
// import nexevo_img from '../images/nexevo.jpg'
// import DropDownPng from '../images/s_c_dropdown2.png'
// import { Dropdown } from 'materialize-css';
// import All from '../website/All.module.css'
// import nofoundresult from '../images/noresultfound.svg'
// import Box from '@material-ui/core/Box';
// import locationIcon from "../images/s_c_location.svg"
// import { dropRight } from 'lodash';
// import { Helmet } from "react-helmet";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

// class ServiceCenters extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       txt: null,
//       dropdown_selected: null,
//       selected_country: null,
//       selected_state: null,
//       selected_city: null,
//       country_list: ["India", "Pakisthan", "China", "Russia"],
//       state_list: ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh"],
//       city_list: ["Nilgiris", "Coimbatore", "Chennai", "Selam"],
//       service_center_list: [{ name: "Nexevo Technologies1", bio: "Nexevo Technologies is a professional drone service center1", workingHours: "9.30AM to 7.00PM", address: "#2 MH-155, 1st Floor, 2nd H Main, Opp. Cuppa Cafe, East of NGEF, Kasthui Nagar, Bangalore - 560043", rating: 1 }, { name: "Nexevo Technologies2", bio: "Nexevo Technologies is a professional drone service center2", workingHours: "9.30AM to 8.00PM", address: "#2 MH-155, 1st Floor, 2nd H Main, Opp. Cuppa Cafe, East of NGEF, Kasthui Nagar, Bangalore - 560044", rating: 2 }, { name: "Nexevo Technologies3", bio: "Nexevo Technologies is a professional drone service center3", workingHours: "9.30AM to 9.00PM", address: "#2 MH-155, 1st Floor, 2nd H Main, Opp. Cuppa Cafe, East of NGEF, Kasthui Nagar, Bangalore - 560045", rating: 3 }, { name: "Nexevo Technologies4", bio: "Nexevo Technologies is a professional drone service center4", workingHours: "9.30AM to 10.00PM", address: "#2 MH-155, 1st Floor, 2nd H Main, Opp. Cuppa Cafe, East of NGEF, Kasthui Nagar, Bangalore - 560046", rating: 4 }, { name: "Nexevo Technologies5", bio: "Nexevo Technologies is a professional drone service center5", workingHours: "9.30AM to 11.00PM", address: "#2 MH-155, 1st Floor, 2nd H Main, Opp. Cuppa Cafe, East of NGEF, Kasthui Nagar, Bangalore - 560047", rating: 5 },],
//       loading: true
//     };
//   }

//   closeDropDown = () => {
//     this.setState({
//       dropdown_selected: null
//     })
//     document.getElementById("s_c_dropdown_icon1").classList.remove("s_c_dropdown_selected");
//     document.getElementById("s_c_dropdown1").classList.remove("s_c_dropdown_content_selected");
//     document.getElementById("s_c_dropdown_icon2").classList.remove("s_c_dropdown_selected");
//     document.getElementById("s_c_dropdown2").classList.remove("s_c_dropdown_content_selected");
//     document.getElementById("s_c_dropdown_icon3").classList.remove("s_c_dropdown_selected");
//     document.getElementById("s_c_dropdown3").classList.remove("s_c_dropdown_content_selected");
//   }

//   dropDown = (val) => {
//     this.closeDropDown()
//     if (val != this.state.dropdown_selected) {
//       document.getElementById("s_c_dropdown_icon" + val).classList.add("s_c_dropdown_selected");
//       document.getElementById("s_c_dropdown" + val).classList.add("s_c_dropdown_content_selected");
//       this.setState({
//         dropdown_selected: val
//       })

//     }
//     else {
//       this.setState({
//         dropdown_selected: null
//       })
//     }
//   }

//   selectCountry = (country) => {
//     this.setState({
//       selected_country: country
//     })
//     this.closeDropDown()
//   }

//   selectState = (state) => {
//     this.setState({
//       selected_state: state
//     })
//     this.closeDropDown()
//   }

//   selectCity = (city) => {
//     this.setState({
//       selected_city: city
//     })
//     this.closeDropDown()
//   }

//   render() {
//     const dropDown = this.dropDown
//     const selectCountry = this.selectCountry
//     const selectState = this.selectState
//     const selectCity = this.selectCity
//     var loading = this.state.loading
//     return (
//       <>
//         <Helmet>
//           <title>Service centers</title>
//           <meta charSet="utf-8" />
//           <meta name="description" content="Nested component" />
//         </Helmet>
//         <div id="service_centers">
//           <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
//             <Row id="s_c_filter" gutterWidth={20}>
//               <Col xs={12} sm={6} md={6} lg={3} xl={3}>
//                 <ul>
//                   <li className='s_c_dropdown_title'>Country</li>
//                   <li>
//                     <div id="select_country" className='service_center_filter' onClick={() => dropDown(1)}>{this.state.selected_country
//                       ? this.state.selected_country
//                       : this.state.country_list[0]
//                     }<span className='s_c_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="s_c_dropdown_icon1" /></span>
//                     </div>
//                   </li>
//                   <li>
//                     <div class="s_c_dropdown-content" id="s_c_dropdown1">
//                       {this.state.country_list.map((country, index) => {
//                         return (
//                           <li onClick={() => { selectCountry(country) }} key={index}>{country}</li>
//                         )
//                       })}
//                     </div>
//                   </li>
//                 </ul>
//               </Col>
//               <Col xs={12} sm={6} md={6} lg={3} xl={3}>
//                 <ul>
//                   <li className='s_c_dropdown_title'>State</li>
//                   <li>
//                     <div id="select_state" className='service_center_filter' onClick={() => dropDown(2)}>{this.state.selected_state
//                       ? this.state.selected_state
//                       : this.state.state_list[0]
//                     }<span className='s_c_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="s_c_dropdown_icon2" /></span></div>
//                   </li>
//                   <li>
//                     <div class="s_c_dropdown-content" id="s_c_dropdown2">
//                       {this.state.state_list.map((state, index) => {
//                         return (
//                           <li onClick={() => selectState(state)} key={index}>{state}</li>
//                         )
//                       })}
//                     </div>
//                   </li>
//                 </ul>
//               </Col>
//               <Col xs={12} sm={6} md={6} lg={3} xl={3}>
//                 <ul>
//                   <li className='s_c_dropdown_title'>City Name</li>
//                   <li>
//                     <div id="select_city" className='service_center_filter' onClick={() => dropDown(3)}>
//                       {this.state.selected_city
//                         ? this.state.selected_city
//                         : this.state.city_list[0]
//                       }<span className='s_c_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="s_c_dropdown_icon3" /></span></div>
//                   </li>
//                   <li>
//                     <div class="s_c_dropdown-content" id="s_c_dropdown3">
//                       {this.state.city_list.map((city, index) => {
//                         return (
//                           <li onClick={() => selectCity(city)} key={index}>{city}</li>
//                         )
//                       })}
//                     </div>
//                   </li>
//                 </ul>
//               </Col>
//               <Col xs={12} sm={6} md={6} lg={3} xl={3}>
//                 <ul>
//                   <li className='s_c_dropdown_title'>&nbsp;</li>
//                   <li><button className='s_c_button1' onClick={() => this.closeDropDown()}>Search</button></li>
//                 </ul>
//               </Col>
//             </Row>
//             <Row>
//               <Col>
//                 <ul>
//                   <li className='s_c_list_title'>Service centers {this.state.selected_city ? "in " + this.state.selected_city : "near you"}</li>
//                 </ul>
//               </Col>
//               <Col>
//                 <ul>
//                   <li className='s_c_location'><img src={locationIcon} alt="" style={{ paddingRight: "10px", float: "left" }} />{this.state.selected_city ? this.state.selected_city : this.state.city_list[0]}, {this.state.selected_state ? this.state.selected_state : this.state.state_list[0]}.</li>
//                 </ul>
//               </Col>
//             </Row>
//             {loading ? <SkeletonTheme highlightColor="#efefef"><Skeleton height={180} width={"100%"} count={1} style={{ backgroundColor: "white", marginBottom: "20px" }} /></SkeletonTheme> : ""}
//             {this.state.service_center_list.length
//               ?
//               <>
//                 {this.state.service_center_list.map((service_center, index) => {
//                   return (
//                     <Row>
//                       <Col>
//                         <div className="service_center_list">
//                           <Row>
//                             <Col xl={10} lg={9.5} md={8.7} sm={12}>
//                               <div className="s_c_profile_container">
//                                 <img src={nexevo_img} alt="" width="50px" />
//                               </div>
//                               <span className="service_center_name">
//                                 {service_center.name}
//                               </span>
//                               <div className='s_c_other_details'>
//                                 <div className='s_c_other_details_content'>{service_center.bio}</div>
//                                 <div className='s_c_other_details_title'>Working time:</div>
//                                 <div className='s_c_other_details_content'>{service_center.workingHours}</div>
//                                 <div className='s_c_other_details_title'>Address:</div>
//                                 <div className='s_c_other_details_content'>{service_center.address}</div>
//                               </div>
//                             </Col>
//                             <Col xl={2} lg={2.5} md={3.3} sm={0} xs={0}>
//                               <Hidden sm xs>
//                                 <div className='rating_request_md_xl'>
//                                   <span className='service_center_rating_md_xl'>
//                                     <span className={service_center.rating >= 1 ? 'star_checked' : 'star_unchecked'}>&#9733;</span>
//                                     <span className={service_center.rating >= 2 ? 'star_checked' : 'star_unchecked'}>&#9733;</span>
//                                     <span className={service_center.rating >= 3 ? 'star_checked' : 'star_unchecked'}>&#9733;</span>
//                                     <span className={service_center.rating >= 4 ? 'star_checked' : 'star_unchecked'}>&#9733;</span>
//                                     <span className={service_center.rating >= 5 ? 'star_checked' : 'star_unchecked'}>&#9733;</span>
//                                   </span>
//                                   <br />
//                                   <button className="s_c_button2">Request Quote</button>
//                                 </div>
//                               </Hidden>
//                             </Col>
//                             <Col sm={12}>
//                               <Visible sm xs>
//                                 <div className='rating_request_xs_sm'>
//                                   <span className='service_center_rating_xs_sm'>
//                                     <span className='star_checked'>&#9733;</span>
//                                     <span className='star_checked'>&#9733;</span>
//                                     <span className='star_checked'>&#9733;</span>
//                                     <span className='star_unchecked'>&#9733;</span>
//                                     <span className='star_unchecked'>&#9733;</span>
//                                   </span>
//                                   <br />
//                                   <button className="s_c_button2">Request Quote</button>
//                                 </div>
//                               </Visible>

//                             </Col>
//                           </Row>
//                         </div>
//                       </Col>
//                     </Row>
//                   )
//                 })}
//               </>
//               :
//               <div style={{ margin: '0px auto', display: 'block' }}>
//                 <Box className={All.Text_center} pt={5}>
//                   <img src={nofoundresult} className={`${All.W_xs_100} ${All.W_sm_100}`} />
//                   <Box className={`${All.Text_center}`} px={5} pb={2}>
//                     <h2>No Results Found</h2>
//                   </Box>
//                   <Box className={`${All.Text_center}`} pb={5}>
//                     <label>It seems we can't find any results based on your search. </label>
//                   </Box>
//                 </Box>
//               </div>
//             }
//           </Container>
//         </div>
//       </>
//     );
//   }
// }

// export default ServiceCenters

import React, { Component } from 'react'
import "../css/service_centers.css"
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import nexevo_img from '../images/nexevo.jpg'
import DropDownPng from '../images/s_c_dropdown2.png'
import All from '../website/All.module.css'
import nofoundresult from '../images/noresultfound.svg'
import Box from '@material-ui/core/Box';
import locationIcon from "../images/s_c_location.svg"
import { Helmet } from "react-helmet";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import axios from 'axios';
import { Link } from 'react-router-dom';
import whatsapp_icon from "../images/whatsapp_icon.png"
import share2 from '../images/share2.png'

class ServiceCenters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txt: null,
      dropdown_selected: null,
      selected_country: null,
      selected_state: null,
      selected_city: null,
      selected_brand: null,
      country_list: [],
      state_list: [],
      city_list: [],
      brand_list: ["DJI Mavic Air 2", "DJI Mavic 2 Pro", "DJI Mavic Mini", "DJI Mavic 2 Zoom", "DJI Phanton 4", "Parrot Anafi", "DJI Mavic Pro", "DJI Inspire 2", "DJI Inspire 1", "Parrot Bebop 2"],
      service_center_list: [{ name: "Nexevo Technologies1", bio: "Nexevo Technologies is a professional drone service center1", workingHours: "9.30AM to 7.00PM", location: "Kasthui Nagar, Bangalore.", rating: 1, phone: "+91 9876543210, +91 9876543210", brands: "DJI, UVify, Hubsan, Parrot, Autel Robotics." }, { name: "Nexevo Technologies2", bio: "Nexevo Technologies is a professional drone service center2", workingHours: "9.30AM to 8.00PM", location: "Kasthui Nagar, Bangalore.", rating: 2, phone: "+91 9876543210, +91 9876543210", brands: "DJI, UVify, Hubsan, Parrot, Autel Robotics." }, { name: "Nexevo Technologies3", bio: "Nexevo Technologies is a professional drone service center3", workingHours: "9.30AM to 9.00PM", location: "Kasthui Nagar, Bangalore.", rating: 3, phone: "+91 9876543210, +91 9876543210", brands: "DJI, UVify, Hubsan, Parrot, Autel Robotics." }, { name: "Nexevo Technologies4", bio: "Nexevo Technologies is a professional drone service center4", workingHours: "9.30AM to 10.00PM", location: "Kasthui Nagar, Bangalore.", rating: 4, phone: "+91 9876543210, +91 9876543210", brands: "DJI, UVify, Hubsan, Parrot, Autel Robotics." }, { name: "Nexevo Technologies5", bio: "Nexevo Technologies is a professional drone service center5", workingHours: "9.30AM to 11.00PM", location: "Kasthui Nagar, Bangalore.", rating: 5, phone: "+91 9876543210, +91 9876543210", brands: "DJI, UVify, Hubsan, Parrot, Autel Robotics." },],
      loading: false,
      open: true,
    };
  }

  componentDidMount() {
    axios.get("https://api.countrystatecity.in/v1/countries", { headers: { "X-CSCAPI-KEY": "M3Z5NGJjcmhtYm5JQ1pmckZIbHpiYVR6TVBzV0VnQUhpeTVzUmNzdw==" } })
      .then(res => {
        this.setState({
          country_list: res.data
        })
        console.log(res.data)
      })
  }

  closeDropDown = () => {
    this.setState({
      dropdown_selected: null
    })
    document.getElementById("s_c_dropdown_icon1").classList.remove("s_c_dropdown_selected");
    document.getElementById("s_c_dropdown1").classList.remove("s_c_dropdown_content_selected");
    document.getElementById("s_c_dropdown_icon2").classList.remove("s_c_dropdown_selected");
    document.getElementById("s_c_dropdown2").classList.remove("s_c_dropdown_content_selected");
    document.getElementById("s_c_dropdown_icon3").classList.remove("s_c_dropdown_selected");
    document.getElementById("s_c_dropdown3").classList.remove("s_c_dropdown_content_selected");
    document.getElementById("s_c_dropdown_icon4").classList.remove("s_c_dropdown_selected");
    document.getElementById("s_c_dropdown4").classList.remove("s_c_dropdown_content_selected");
  }

  dropDown = (val) => {
    this.closeDropDown()
    if (val != this.state.dropdown_selected) {
      document.getElementById("s_c_dropdown_icon" + val).classList.add("s_c_dropdown_selected");
      document.getElementById("s_c_dropdown" + val).classList.add("s_c_dropdown_content_selected");
      this.setState({
        dropdown_selected: val
      })

    }
    else {
      this.setState({
        dropdown_selected: null
      })
    }
  }

  selectCountry = (country) => {
    this.setState({
      selected_country: country
    })
    axios.get("https://api.countrystatecity.in/v1/countries/" + country.iso2 + "/states", { headers: { "X-CSCAPI-KEY": "M3Z5NGJjcmhtYm5JQ1pmckZIbHpiYVR6TVBzV0VnQUhpeTVzUmNzdw==" } })
      .then(res => {
        this.setState({
          state_list: res.data
        })
        console.log(res.data[0])
      })
      .catch(err => {
        console.log(err)
      })
    this.closeDropDown()
  }

  selectState = (state) => {
    this.setState({
      selected_state: state
    })
    this.closeDropDown()
    axios.get("https://api.countrystatecity.in/v1/countries/" + this.state.selected_country.iso2 + "/states/" + state.iso2 + "/cities", { headers: { "X-CSCAPI-KEY": "M3Z5NGJjcmhtYm5JQ1pmckZIbHpiYVR6TVBzV0VnQUhpeTVzUmNzdw==" } })
      .then(res => {
        this.setState({
          city_list: res.data,
          selected_city: res.data[0]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  selectCity = (city) => {
    this.setState({
      selected_city: city
    })
    this.closeDropDown()
  }

  selectBrand = (brand) => {
    this.setState({
      selected_brand: brand
    })
    this.closeDropDown()
  }

  render() {
    console.log(window.location.href)
    const dropDown = this.dropDown
    const selectCountry = this.selectCountry
    const selectState = this.selectState
    const selectCity = this.selectCity
    const selectBrand = this.selectBrand
    var loading = this.state.loading
    return (
      <>
        <Helmet>
          <title>Service centers</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <div id="service_centers">
          <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
            <Row id="s_c_filter" gutterWidth={20}>
              <Col xs={12} sm={6} md={6} lg={4} xl={12 / 5}>
                <ul>
                  <li className='s_c_dropdown_title'>Country</li>
                  <li>
                    <div id="select_country" className='service_center_filter' onClick={() => dropDown(1)}>{this.state.selected_country
                      ? this.state.selected_country.name
                      : "Select country"
                    }<span className='s_c_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="s_c_dropdown_icon1" /></span>
                    </div>
                  </li>
                  <li>
                    <div class="s_c_dropdown-content" id="s_c_dropdown1">
                      {this.state.country_list.map((country, index) => {
                        return (
                          <li onClick={() => { selectCountry(country) }} key={index}>{country.name}</li>
                        )
                      })}
                    </div>
                  </li>
                </ul>
              </Col>
              <Col xs={12} sm={6} md={6} lg={4} xl={12 / 5}>
                <ul>
                  <li className='s_c_dropdown_title'>State</li>
                  <li>
                    <div id="select_state" className='service_center_filter' onClick={() => dropDown(2)}>{this.state.selected_state
                      ? this.state.selected_state.name
                      : "Select state"
                    }<span className='s_c_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="s_c_dropdown_icon2" /></span></div>
                  </li>
                  <li>
                    <div class="s_c_dropdown-content" id="s_c_dropdown2">
                      {this.state.state_list.map((state, index) => {
                        return (
                          <li onClick={() => selectState(state)} key={index}>{state.name}</li>
                        )
                      })}
                    </div>
                  </li>
                </ul>
              </Col>
              <Col xs={12} sm={6} md={6} lg={4} xl={12 / 5}>
                <ul>
                  <li className='s_c_dropdown_title'>City</li>
                  <li>
                    <div id="select_city" className='service_center_filter' onClick={() => dropDown(3)}>
                      {this.state.selected_city
                        ? this.state.selected_city.name
                        : "Select city"
                      }<span className='s_c_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="s_c_dropdown_icon3" /></span></div>
                  </li>
                  <li>
                    <div class="s_c_dropdown-content" id="s_c_dropdown3">
                      {this.state.city_list.map((city, index) => {
                        return (
                          <li onClick={() => selectCity(city)} key={index}>{city.name}</li>
                        )
                      })}
                    </div>
                  </li>
                </ul>
              </Col>
              <Col xs={12} sm={6} md={6} lg={4} xl={12 / 5}>
                <ul>
                  <li className='s_c_dropdown_title'>Brand</li>
                  <li>
                    <div id="select_brand" className='service_center_filter' onClick={() => dropDown(4)}>
                      {this.state.selected_brand
                        ? this.state.selected_brand
                        : "Select brand"
                      }<span className='s_c_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="s_c_dropdown_icon4" /></span></div>
                  </li>
                  <li>
                    <div class="s_c_dropdown-content" id="s_c_dropdown4">
                      {this.state.brand_list.map((brand, index) => {
                        return (
                          <li onClick={() => selectBrand(brand)} key={index}>{brand}</li>
                        )
                      })}
                    </div>
                  </li>
                </ul>
              </Col>
              <Col xs={12} sm={6} md={6} lg={4} xl={12 / 5}>
                <ul>
                  <li className='s_c_dropdown_title'>&nbsp;</li>
                  <li><button className='s_c_button1' onClick={() => this.closeDropDown()}>Search</button></li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col>
                <div>
                  <ul>
                    <li className='s_c_list_title'>Service centers {this.state.selected_city ? "in " + this.state.selected_city.name : "near you"}</li>
                  </ul>
                </div>
              </Col>
              <Col>
                <ul>
                  <li className='s_c_location'><img src={locationIcon} alt="" style={{ paddingRight: "10px", float: "left" }} />{this.state.selected_city ? this.state.selected_city.name : "Bangalore"}, {this.state.selected_state ? this.state.selected_state.name : "Karnataka"}.</li>
                </ul>
              </Col>
            </Row>

            {this.state.service_center_list.length
              ?
              <>
                <Row>
                  <Col md={6} sm={12}>
                    {loading ? <SkeletonTheme highlightColor="#eee"><Skeleton height={300} width={"100%"} count={1} style={{ backgroundColor: "white", marginBottom: "20px" }} /></SkeletonTheme> : ""}
                  </Col>
                  <Col md={6} sm={12}>
                    {loading ? <SkeletonTheme highlightColor="#eee"><Skeleton height={300} width={"100%"} count={1} style={{ backgroundColor: "white", marginBottom: "20px" }} /></SkeletonTheme> : ""}
                  </Col>
                  <Col md={6} sm={12}>
                    {loading ? <SkeletonTheme highlightColor="#eee"><Skeleton height={300} width={"100%"} count={1} style={{ backgroundColor: "white", marginBottom: "20px" }} /></SkeletonTheme> : ""}
                  </Col>
                  <Col md={6} sm={12}>
                    {loading ? <SkeletonTheme highlightColor="#eee"><Skeleton height={300} width={"100%"} count={1} style={{ backgroundColor: "white", marginBottom: "20px" }} /></SkeletonTheme> : ""}
                  </Col>
                </Row>
                <Row>

                  {this.state.service_center_list.map((service_center, index) => {
                    return (
                      <Col lg={6} md={12}>
                        <div className="service_center_list">
                          <div className="s_c_profile_container">
                            <img src={nexevo_img} alt="" width="50px" />
                          </div>
                          <span className="service_center_name">
                            {service_center.name}
                          </span>
                          <div className='rating_request_md_xl'>
                            <div className='service_center_rating_md_xl'>
                              <span className={service_center.rating >= 1 ? 'star_checked' : 'star_unchecked'}>&#9733;</span>
                              <span className={service_center.rating >= 2 ? 'star_checked' : 'star_unchecked'}>&#9733;</span>
                              <span className={service_center.rating >= 3 ? 'star_checked' : 'star_unchecked'}>&#9733;</span>
                              <span className={service_center.rating >= 4 ? 'star_checked' : 'star_unchecked'}>&#9733;</span>
                              <span className={service_center.rating >= 5 ? 'star_checked' : 'star_unchecked'}>&#9733;</span>
                            </div>
                            <div>
                              <Link className='s_c_review_link'>Read Reviews</Link>
                            </div>
                          </div>
                          <div className='s_c_other_details'>
                            <div className='s_c_other_details_content'>{service_center.bio}</div>
                            <div className='s_c_other_details_title'>Working time:</div>
                            <div className='s_c_other_details_content'>{service_center.workingHours}</div>
                            <div className='s_c_other_details_title'>Phone Number:</div>
                            <div className='s_c_other_details_content s_c_other_details_phone'>{service_center.phone}</div>
                            <div className='s_c_other_details_title'>Location:</div>
                            <div className='s_c_other_details_content'>{service_center.location}</div>
                            <div className='s_c_other_details_title'>Brands:</div>
                            <div className='s_c_other_details_content'>{service_center.brands}</div>
                          </div>
                          <hr />
                          <div style={{display: "flex"}}>
                            <button className='s_c_button2'>Enquire Now</button>
                            <img src={whatsapp_icon} alt="" height={"35px"} />
                            <img src={share2} alt="" className='s_c_share' />
                          </div>
                        </div>
                      </Col>
                    )
                  })}
                </Row>
              </>
              :
              <div style={{ margin: '0px auto', display: 'block' }}>
                <Box className={All.Text_center} pt={5}>
                  <img src={nofoundresult} className={`${All.W_xs_100} ${All.W_sm_100}`} />
                  <Box className={`${All.Text_center}`} px={5} pb={2}>
                    <h2>No Results Found</h2>
                  </Box>
                  <Box className={`${All.Text_center}`} pb={5}>
                    <label>It seems we can't find any results based on your search. </label>
                  </Box>
                </Box>
              </div>
            }
          </Container>
        </div>
      </>
    );
  }
}

export default ServiceCenters