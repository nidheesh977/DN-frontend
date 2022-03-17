import React, { useState, Component, useEffect, useCallback } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import "./Navbar.css";
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
import { logout, isLogin, login, getRefreshToken } from "../../middleware/auth";
import Tooltip from "@material-ui/core/Tooltip";
import { Alert } from "@material-ui/lab";
import PageLoader from "../Loader/pageloader";
import { authenticationService } from "../../middleware/auth";
import { userService } from "../_services/user.service";
import UploadFileInstruction from "../website/UploadFileInstruction";

import { Container, Nav, Navbar } from "react-bootstrap";

// $(document).ready(function () {
//   $(".SearchBoxIcon").click(function () {
//     $(".search-box").toggle();
//     $(".MenuSearchBox").focus();
//   });
// });

const domain = process.env.REACT_APP_MY_API

function NavBar(props) {
  const history = useHistory();

  // const [user, Setuser] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [userlogin, setUserlogin] = useState(true);
  const [role, setRole] = useState("")
  // useEffect(() => Setuserlogin(isLogin()), [props]);
  // const [auth, setAuth] = React.useState(true);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [anchorEls, setAnchorEls] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const opens = Boolean(anchorEls);
  // const [ProfileImage, setProfileImage] = useState();
  // const [click, setClick] = useState(false);
  // const handleClick = () => setClick(!click);
  // const closeMobileMenu = () => setClick(false);

  // const currentUser = useState(authenticationService.currentUserValue);

  // function refreshPagelogout() {
  //   localStorage.clear();
  //   logout();
  //   Setuserlogin(false);
  // }

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleCloses = () => {
  //   setAnchorEls(null);
  // };

  // const handleLogout = () => {
  //   logout();
  //   Setuserlogin(false);
  // };

  const [instructions, setInstructions] = useState(false);

  const goToPage = () => {
    setInstructions(false);
    history.push("/UploadFile");
  };

  const closePopup = () => {
    setInstructions(false);
  };

  const uploadInstructions = () => {
    setInstructions(true);
  };

  useEffect(() => {
    let access_token = localStorage.getItem("access_token")

    if (access_token){
      axios.post(`${domain}/access_token_valid`, {"access_token": access_token})
      .then(res => {
        setUserlogin(true)
      })
      .catch(err => {
        axios.post(`${domain}/refresh_token`, {"access_token": access_token})
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token)
          setUserlogin(true)
        })
        .catch(err => {
          setUserlogin(false)
        })
      })
    }
    else{
      setUserlogin(false)
    }
  }, [])

  // const openMyAccount = () => {
  //   const userRole = localStorage.getItem("role");
  //   if (
  //     userRole === "pilot" ||
  //     userRole === "visitor" ||
  //     userRole === "candidate"
  //   ) {
  //     history.push("/pilot_dashboard/activities/images");
  //   } else if (userRole === "service_center") {
  //     history.push("/service_center_dashboard");
  //   } else if (userRole === "company") {
  //     history.push("/company_dashboard/activities/jobs");
  //   }
  // };

  // useEffect(() => {
  // userService.User().then((res) => {
  //   setLoading(false);
  //   try {
  //     if (res.data.id >= 0) {
  //       Setuser(res.data);
  //       Setuserlogin(true);
  //     } else {
  // try {
  //   axios
  //     .post(
  //       "https://demo-nexevo.in/haj/auth-app/public/api/auth/refreshtoken",
  //       {
  //         header: {
  //           Refreshtoken: localStorage.getItem("refresh_token"),
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data.token_type === "Bearer") {
  //         localStorage.setItem("access_token", res.data.access_token);
  //         localStorage.setItem("refresh_token", res.data.refresh_token);
  //         Setuserlogin(true);
  //         window.location.reload();
  //       } else {
  //         localStorage.clear();
  //       }
  //     });
  // } catch {
  //   localStorage.clear();
  // }
  // }
  // } catch {
  // try {
  //   axios
  //     .post(
  //       "https://demo-nexevo.in/haj/auth-app/public/api/auth/refreshtoken",
  //       {
  //         header: { Refreshtoken: localStorage.getItem("refresh_token") },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data.token_type === "Bearer") {
  //         localStorage.setItem("access_token", res.data.access_token);
  //         localStorage.setItem("refresh_token", res.data.refresh_token);
  //         window.location.reload();
  //       } else {
  //         localStorage.clear();
  //       }
  //     });
  // } catch {
  //   localStorage.clear();
  // }
  //   }
  // });

  // userService.Profile().then((res) => {
  //   setLoading(false);
  //   if (
  //     res.data.profile !=
  //     "https://demo-nexevo.in/haj/auth-app/public/uploads/profile"
  //   ) {
  //     setProfileImage(res.data.profile);
  //   } else {
  //     setProfileImage(ProfileIcon);
  //   }
  // });
  // }, []
  // );

  render();
  {
    return (
      <div style={{ height: "75px" }}>
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
        {/* {loading === true && <PageLoader />} */}

        <Navbar
          bg="dark"
          variant="dark"
          style={{
            width: "100%",
            height: "75px",
            padding: "25px 30px 25px 19px",
            background: "black"
          }}
        >
          <Container style={{ maxWidth: "1310px" }}>
            <Navbar.Brand>
              <Link to="/" className="nav-item">
                <img className="nav-links" src={Logo} />
              </Link>
            </Navbar.Brand>
            <Nav className="d-flex">
              <Nav.Link>
                <Link to="/searchresult" className="NavLink">
                  <img
                    src={SearchIcon}
                    alt="search_icon"
                    style={{ marginRight: "15px" }}
                  />
                </Link>
              </Nav.Link>
              <Nav.Link style = {{marginRight: "25px"}}>
                <Link to="/apply_job" className="NavLink">
                  Apply jobs
                </Link>
              </Nav.Link>
              <Nav.Link style = {{marginRight: "7px"}}>
                <Link to="/hire_pilots" className="NavLink">
                  Hire Pilots
                </Link>
              </Nav.Link>
              <Nav.Link style = {{marginRight: "14px"}}>
                <Link to="/service_centers" className="NavLink">
                  Find Service Centers
                </Link>
              </Nav.Link>
              {!userlogin
              ?<>
                <Nav.Link style = {{marginRight: "16px"}}>
                  <Link to="/login" className="NavLink NavLinkSignupLogin">
                    Login
                  </Link>
                </Nav.Link>
                <Nav.Link style = {{marginRight: "11px"}}>
                  <Link to="/sign_up" className="NavLink NavLinkSignupLogin">
                    Sign up
                  </Link>
                </Nav.Link>
              </>
              :<Nav.Link>
              <Link
                to="/pilot_dashboard/activities/images"
                className="NavLink NavLinkMyAccount"
              >
                <img
                  src={ProfileIcon}
                  alt=""
                  height={"24px"}
                  width={"24px"}
                />{" "}
                My accout
              </Link>
            </Nav.Link>
              }
              
              
              <Nav.Link>
                <Link className="NavLink NavLinkUploadFile" onClick = {uploadInstructions}>
                  <img src={UploadFile} alt="" height={"18px"} width={"18px"} />{" "}
                  Upload file
                </Link>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {instructions && (
          <UploadFileInstruction
            button={
              <button className="upload_inst_btn" onClick={goToPage}>
                Go to upload page
              </button>
            }
            closePopup={closePopup}
          />
        )}
      </div>
    );
  }
}

export default NavBar;
