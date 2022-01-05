import React, { useState, Component, useEffect , useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import All from '../website/All.module.css';
import Button from '@material-ui/core/Button'; 
import Logo from '../images/Logo.png';
import ProfileIcon from '../images/person.svg';
import UploadFile from '../images/UploadFile.svg';
import SearchIcon from '../images/search.png';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Joyride from "react-joyride";
import getSteps from '../website/getSteps';
import axios from 'axios';
import { render } from '@testing-library/react'; 
import $ from 'jquery'
import { logout, isLogin ,login ,getRefreshToken } from '../../middleware/auth'; 
import Tooltip from '@material-ui/core/Tooltip';
import { Alert } from '@material-ui/lab'; 
import PageLoader from '../Loader/pageloader'

import {authenticationService} from '../../middleware/auth'; 
import { userService } from '../_services/user.service';

 
$(document).ready(function() {
  $(".SearchBoxIcon").click(function() { 
     $(".search-box").toggle();      
      $(".MenuSearchBox").focus();
   }); 
}); 
 
function Navbar(props) {  
  const [user, Setuser] = useState([]);    
  const [loading, setLoading] = useState(false) 
  const [userlogin, Setuserlogin] = useState(false) 
  useEffect(() => Setuserlogin(isLogin()), [props]) 
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEls, setAnchorEls] = React.useState(null);
  const open = Boolean(anchorEl);
  const opens = Boolean(anchorEls);
  const [ProfileImage, setProfileImage] = useState(); 
  const [click, setClick] = useState(false); 
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const currentUser = useState(authenticationService.currentUserValue); 
 
  function refreshPagelogout() {
    localStorage.clear(); 
    logout();
    Setuserlogin(false) 
  } 


  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenus = (event) => {
    setAnchorEls(event.currentTarget);
  };

  const handleMenusOpen = (event) => {
    setAnchorEls(true);
  };

  const handleMenusClose = (event) => {
    setAnchorEls(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloses = () => {
    setAnchorEls(null);
  };

  const handleLogout = () => {
    logout();
    Setuserlogin(false)
}
 
  useEffect(() => {   

    userService.User().then(res => {
      setLoading(false);
        try{
          if (res.data.id >= 0){
            Setuser(res.data);
          }
          else{
            try{
              axios.post("https://demo-nexevo.in/haj/auth-app/public/api/auth/refreshtoken",{ header: {"Refreshtoken": localStorage.getItem("refresh_token")}})
              .then(res => {
                if (res.data.token_type === "Bearer"){
                  localStorage.setItem("access_token", res.data.access_token)
                  localStorage.setItem("refresh_token", res.data.refresh_token)
                  window.location.reload()
                }
                else{
                  localStorage.clear()
                }
              })
            }
            catch{
              localStorage.clear()
            }
          }
        }
        catch{
          try{
            axios.post("https://demo-nexevo.in/haj/auth-app/public/api/auth/refreshtoken",{ header: {"Refreshtoken": localStorage.getItem("refresh_token")}})
            .then(res => {
              if (res.data.token_type === "Bearer"){
                localStorage.setItem("access_token", res.data.access_token)
                localStorage.setItem("refresh_token", res.data.refresh_token)
                window.location.reload()
              }
              else{
                localStorage.clear()
              }
            })
          }
          catch{
            localStorage.clear()
          }
        }
      })

      userService.Profile().then(res => {
        setLoading(false);
        if (res.data.profile != "https://demo-nexevo.in/haj/auth-app/public/uploads/profile"){
          setProfileImage(res.data.profile);
        }else{
          setProfileImage(ProfileIcon)
        }
      })
  }, []);



  render()
  {


    return (
      <>
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
        <nav className='navbar navbar-desktop'>
          <Link to='/' className='nav-item'>
            <img className="nav-links" src={Logo} />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <span className="menu">

            {currentUser[0] == '2' &&   
            <Link to='/GetJobs'   className='nav-links' id="third" onClick={closeMobileMenu}>
              <li className='nav-item'>     Post Jobs  </li> 
            </Link>
             }

              <Link to='/HiringDorners'  className='nav-links' id="fouth" onClick={closeMobileMenu}>
                <li className='nav-item'>  Jobs </li>
              </Link> 
            </span>
            <span className="menu">
                        <li className='nav-item SearchBoxIcon'>
                        {/* <Search /> */}
            {/* <i class="fa fa-search" aria-hidden="true"></i> */}
            <Link to='/Searchresult'><img className="fa fa-search" src={SearchIcon} /></Link>
            {/* <div class="search-box">
              <form action={`${process.env.PUBLIC_URL}/Search`}>
                <input type="text" className="MenuSearchBox" placeholder=""/>
                <input type="submit" value="Search" />
                </form>
              </div> */}
              {/* <input type="text" className="search-field" placeholder="Search …" value="" name="sad" /> */}
              {/* <SearchFilter /> */}
            </li>
            {userlogin === false &&
                <>
                  <li className='nav-item'>
                  <Link  className='nav-links'  onClick={handleMenus} onMouseEnter={handleMenusOpen} onMouseLeave={handleMenusClose}>
                      Sign up
                  </Link>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEls}
                  keepMounted
                  open={Boolean(anchorEls)}
                  onClose={handleCloses}
                >
                  <MenuItem  className='nav-links' onClick={handleCloses}>   <Link to='/User'   className='navSignup padding_0' onClick={closeMobileMenu}>User</Link></MenuItem>
                  <MenuItem  className='nav-links' onClick={handleCloses}>   <Link to='/Company'  className='navSignup padding_0' onClick={closeMobileMenu}>Company</Link></MenuItem> 
                </Menu>

                  </li>
                  <li className='nav-item'>
                    <Link to='/login'  className='nav-links' onClick={closeMobileMenu}>Log In</Link>
                  </li>
                </>
                }
              <li className='nav-item' id="five">
                {auth && (
                  <Link to='/UpgradeProVersion' className='nav-links' onClick={closeMobileMenu}>
                    Upgrade Pro Version
                  </Link>
                )}
              </li>
              {userlogin === true &&
                <li className='nav-item'>   
                 {ProfileImage ?  <img className ="nav-links" style={{width:'40px', height:'40px' , borderRadius:'100%'}} src={ProfileImage} onClick={handleMenu} /> :   <img className ="nav-links" style={{width:'30px', height:'30px' , borderRadius:'100%'}} src={ProfileIcon} onClick={handleMenu} />}
                  <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem  className='nav-links' onClick={handleClose}>  
                {currentUser[0] == '2' &&
                <Link to='/OfficeProfile' className='navSignup padding_0' onClick={closeMobileMenu}> {(user.company_name)}</Link> } 
                  {currentUser[0] == '1' &&  
                <Link to='/Profile' className='navSignup padding_0' onClick={closeMobileMenu}> {(user.name)}</Link> } 
                </MenuItem>
                <MenuItem  className='nav-links' onClick={handleClose}>   <Link to='/UpgradeProVersion' className='navSignup padding_0' onClick={closeMobileMenu}>My account </Link></MenuItem> 
                <MenuItem  className='nav-links' onClick={refreshPagelogout}>   <Link to='/' className='navSignup padding_0' onClick={closeMobileMenu}>
                {userlogin && <Link onClick={() => handleLogout()} to="/">Logout</Link>}
                  </Link>
                  </MenuItem>
              </Menu>
                </li>
               }
                {currentUser[0] == '1' &&   
                    <li className='nav-item'> 
                        <Link to='/UploadFile' className="nav-links">  
                          <Button variant="contained" color="default" id="first" className={All.BtnStyle_3}><img style={{ paddingRight: 10 }} src={UploadFile} /> Upload File</Button>
                        </Link> 
                    </li>
                }
            </span>
          </ul>
        </nav>
        </section>
      </>
    );
  }
}

export default Navbar;