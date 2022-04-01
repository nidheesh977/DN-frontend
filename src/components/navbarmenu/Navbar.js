import React, { useState, Component, useEffect, useCallback } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import "../Navbar.css";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import All from "../website/All.module.css";
import Button from "@material-ui/core/Button";
import Logo from "../images/Logo.png";
import ProfileIcon from "../images/person.svg";
import UploadFile from "../images/UploadFile.svg";
import SearchIcon from "../images/search.png";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Joyride from "react-joyride";
import getSteps from "../website/getSteps";
import axios from "axios";
import { render } from "@testing-library/react";
import $ from "jquery";
import Tooltip from "@material-ui/core/Tooltip";
import { Alert } from "@material-ui/lab";
import PageLoader from "../Loader/pageloader";

import { authenticationService } from "../../middleware/auth";
import { userService } from "../_services/user.service";
import UploadFileInstruction from "../website/UploadFileInstruction";
import "./Navbar.css"

$(document).ready(function () {
  $(".SearchBoxIcon").click(function () {
    $(".search-box").toggle();
    $(".MenuSearchBox").focus();
  });
});

function Navbar(props) {

  const history = useHistory()

  const [user, Setuser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userlogin, Setuserlogin] = useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEls, setAnchorEls] = React.useState(null);
  const open = Boolean(anchorEl);
  const opens = Boolean(anchorEls);
  const [ProfileImage, setProfileImage] = useState();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [showLogout, setShowLogout] = useState(false)

  const currentUser = useState(authenticationService.currentUserValue);


  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloses = () => {
    setAnchorEls(null);
  };


  const [instructions, setInstructions] = useState(false)

  const goToPage = () => {
      setInstructions(false)
      history.push("/UploadFile")
  };

  const closePopup = () => {
    setInstructions(false)
  }

  const uploadInstructions = () => {
    if(!localStorage.getItem("access_token")){
     history.push("/login")
    }
    else{
      setInstructions(true)
    }

  }

  const accountLogout = () => {
    localStorage.clear()
    props.updateLoginStatus()
    history.push("/")
  }

let AccountButton = () =>{
  if(localStorage.getItem("email")=== "false"){
    history.push("/verify-email")
  }else if(localStorage.getItem("role") === "undefined"){
    history.push("/choose-categories")
  }else if(localStorage.getItem("role") === "pilot"){
    history.push("/pilot_dashboard/account/")
  }else{
    history.push("/booster_dashboard/account/")
  }
}

  render();
  {
    return (
      <div id="navbar">
        {/* <Joyride steps={getSteps()}
          showSkipButton={true}
          styles={{
            options: {
              primaryColor: "#4FFEA3",
              outline: "none",
              textColor: "#333",
            },
            buttonClose: {
              display: 'none',
            },
            tooltipContainer: {
              textAlign: "left"
            }
          }}
        /> */}
        {loading === true && <PageLoader />}
        <section className="navbar_sticky">
          <nav className="navbar navbar-desktop" style = {{background: "black"}}>
            <Link to="/" className="nav-item">
              <img className="nav-links" src={Logo} />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <span className="menu">
                <Link className="nav-item"></Link>
              </span>
              <span className="menu">
              
                <li className="nav-item">
                  <NavLink
                    to="/apply_job"
                    className="nav-links"
                    activeStyle={{ color: "blue!important" }}
                  >
                    Apply jobs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link to="/hire_pilots" className="nav-links">
                    Hire Pilots
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-links" to="/service_centers">
                    Find Service Centers
                  </Link>
                </li>

                {/* ============================== testing ================================ */}

                <>
                  <li
                    className="nav-item"
                    id="login"
                    style={{
                      display: props.loginStatus
                        ? "none"
                        : "block",
                      marginTop: "25px",
                    }}
                  >
                    <Link
                      to="/login"
                      className="nav-links2"
                      onClick={closeMobileMenu}
                    >
                      Log In
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    id="signup"
                    style={{
                      display: props.loginStatus
                        ? "none"
                        : "block",
                      marginTop: "25px",
                    }}
                  >
                    <Link className="nav-links2" to="/sign_up">
                      Sign up
                    </Link>
                  </li>
                </>
                {/* ============================== testing ================================ */}
                {/* {userlogin === false &&
                  <>
                    <li className='nav-item'>
                      <Link to='/login' className='nav-links2' onClick={closeMobileMenu}>Log In</Link>
                    </li>
                    <li className='nav-item'>
                      <Link className='nav-links2' to="/sign_up">
                        Sign up
                      </Link>

                    </li>
                  </>
                } */}
                {/* {userlogin === true &&
                  // <li className='nav-item'>
                  //   {ProfileImage ? <Link><img className="nav-links" style={{ width: '40px', height: '40px', borderRadius: '100%' }} src={ProfileImage} onClick={handleMenu} />My account</Link> : <Link><img className="nav-links" style={{ width: '30px', height: '30px', borderRadius: '100%' }} src={ProfileIcon} onClick={handleMenu}/><span style = {{marginTop: "25px"}}>My account</span></Link>}
                  //   <Menu
                  //     id="simple-menu"
                  //     anchorEl={anchorEl}
                  //     keepMounted
                  //     open={Boolean(anchorEl)}
                  //     onClose={handleClose}
                  //   >
                  //     <MenuItem className='nav-links' onClick={handleClose}>
                  //       {currentUser[0] == '2' &&
                  //         <Link to='/OfficeProfile' className='navSignup padding_0' onClick={closeMobileMenu}> {(user.company_name)}</Link>}
                  //       {currentUser[0] == '1' &&
                  //         <Link to='/Profile' className='navSignup padding_0' onClick={closeMobileMenu}> {(user.name)}</Link>}
                  //     </MenuItem>
                  //     <MenuItem className='nav-links' onClick={handleClose}>   <Link to='/UpgradeProVersion' className='navSignup padding_0' onClick={closeMobileMenu}>My account </Link></MenuItem>
                  //   </Menu>
                  // </li>
                  <>
                    <li className='nav-item'>
                      <Link className="nav-links my_account_btn" style={{ display: "flex", alignItems: 'center' }}>
                        <img style={{ width: '30px', height: '30px', borderRadius: '100%' }} src={ProfileIcon} /><span style={{ paddingLeft: "10px", fontSize: "16px" }}>My account</span>
                      </Link>
                    </li>
                  </>
                } */}

                <li
                  className="nav-item"
                  style={{
                    display: props.loginStatus
                      ? "block"
                      : "none",
                    marginTop: "15px",
                  }}
                  id="myAccount"
                >
                  <span onMouseLeave = {() => setShowLogout(false)}>

                    <div
                      className="nav-links my_account_btn"
                      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                      onClick={AccountButton}
                      onMouseOver = {() => setShowLogout(true)}
                      
                    >
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "100%",
                        }}
                        src={ProfileIcon}
                      />

                      <span style={{ paddingLeft: "10px", fontSize: "16px" }}>
                        My account
                      </span>
                    </div>
                    {showLogout && 
                      <div class="dropdown-content" onClick = {accountLogout}>
                        <div className="logout_btn">Logout</div>
                      </div>
                    }
                  </span>
                </li>
                {(!props.loginStatus || localStorage.getItem("role") === "pilot") && <li className="nav-item">
                  <div className="nav-links">
                    <Button
                      variant="contained"
                      color="default"
                      id="first"
                      className="nav_upload_img"
                      onClick = {uploadInstructions}
                      style = {{textTransform: "initial", bottom: "2px", padding: "6px 20px 6px 20px"}}
                    >
                      <img style={{ paddingRight: 10 }} src={UploadFile} />{" "}
                      Upload file
                    </Button>
                  </div>
                </li>
                }
                {instructions && (
                  <UploadFileInstruction
                    button={
                      <button
                        className="upload_inst_btn"
                        onClick={goToPage}
                      >
                        Go to upload page
                      </button>
                    }
                    closePopup = {closePopup}
                  />
                )}
              </span>
            </ul>
          </nav>
        </section>
      </div>
    );
  }
}

export default Navbar;