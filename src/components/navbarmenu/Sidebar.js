import React, { useState, Component, useEffect, useCallback } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Logo from "../images/Logo.png";
import { Link, NavLink, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import axios from "axios";
import All from "../website/All.module.css";
import JobIcon from "@material-ui/icons/Work";
import UploadFile from "../images/UploadFile.svg";
import UploadFileInstruction from "../website/UploadFileInstruction";
import Button from "@material-ui/core/Button";
import ProfileIcon from "../images/person.svg";
import { width } from "@mui/system";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const domain = process.env.REACT_APP_MY_API

export default function PersistentDrawerLeft(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [userlogin, Setuserlogin] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const [showLogout, setShowLogout] = useState(false)

  const goToPage = () => {
    setInstructions(false);
    history.push("/UploadFile");
  };

  const closePopup = () => {
    setInstructions(false);
  };

  const uploadInstructions = () => {
    if(!localStorage.getItem("access_token")){
      history.push("/login")
    }else{
      var date = new Date()
      var today = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
      var lsd = localStorage.getItem("lsd")
       if (lsd === today){
         history.push("/UploadFile")
       }
       else{
         localStorage.setItem("lsd", today)
         setInstructions(true)
       }
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let access_token = localStorage.getItem("access_token")

    if (access_token){
      Setuserlogin(true)
    }
    else{
      Setuserlogin(false)
    }

    // if (access_token){
    //   axios.post(`${domain}/access_token_valid`, {"access_token": access_token})
    //   .then(res => {
    //     Setuserlogin(true)
    //   })
    //   .catch(err => {
    //     axios.post(`${domain}/refresh_token`, {"access_token": access_token})
    //     .then((res) => {
    //       localStorage.setItem("access_token", res.data.access_token)
    //       Setuserlogin(true)
    //     })
    //     .catch(err => {
    //       Setuserlogin(false)
    //     })
    //   })
    // }
    // else{
    //   Setuserlogin(false)
    // }
  }, [])

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
    }
    else if(localStorage.getItem("role") === "service_center"){
      history.push("/center_dashboard/account/")
    }
    else if(localStorage.getItem("role") === "company"){
      history.push("/company_dashboard/account/")
    }
    else if (localStorage.getItem("role") === "halfCompany"){
      history.push("/createCompany")
    }
    else if (localStorage.getItem("role") === "halfPilot"){
      history.push("/createPilot")
    }
    else{
      history.push("/booster_dashboard/account/")
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            // style = {{paddingRight: "20px"}}
          >
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
                {(localStorage.getItem("role") === "company") && <li className="nav-item">
                  <div className="nav-links">
                    <Button
                      variant="contained"
                      color="default"
                      id="first"
                      className="nav_upload_img"
                      onClick = {()=>history.push("/create_job")}
                      style = {{textTransform: "initial", bottom: "2px", padding: "6px 20px 6px 20px"}}
                    >
                      <img style={{ paddingRight: 10 }} src={UploadFile} />{" "}
                      CreateJob
                    </Button>
                  </div>
                </li>
                }
            <MenuIcon onClick={handleDrawerOpen}/>
          </IconButton>
          <Typography variant="h6" noWrap>
            <Link to="/" className="nav-item">
              <img src={Logo} />
              {/* <p>Logo</p> */}
            </Link>
          </Typography>
          <div className="NavSearchBar">
            {/* <InputBase
        className={classes.input}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>  */}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <CloseIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <Link
          to="/Searchresult"
          onClick={handleDrawerClose}
          style={{ marginLeft: "10px" }}
        >
          <List>
            <ListItem button>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <div
                style={{
                  fontFamily: "muli-bold",
                  display: "inline-block",
                  fontSize: "13px",
                }}
              >
                Search
              </div>
            </ListItem>
          </List>
        </Link>

        <Link
          to="/apply_job"
          onClick={handleDrawerClose}
          style={{ marginLeft: "10px" }}
        >
          <List>
            <ListItem button>
              <ListItemIcon>
                <JobIcon />
              </ListItemIcon>
              <div
                style={{
                  fontFamily: "muli-bold",
                  display: "inline-block",
                  fontSize: "13px",
                }}
              >
                Apply jobs
              </div>
            </ListItem>
          </List>
        </Link>

        <Link
          to="/hire_pilots"
          onClick={handleDrawerClose}
          style={{ marginLeft: "10px" }}
        >
          <List>
            <ListItem button>
              <ListItemIcon>
                <JobIcon />
              </ListItemIcon>
              <div
                style={{
                  fontFamily: "muli-bold",
                  display: "inline-block",
                  fontSize: "13px",
                }}
              >
                Hire Pilots
              </div>
            </ListItem>
          </List>
        </Link>

        <Link
          to="/service_centers"
          onClick={handleDrawerClose}
          style={{ marginLeft: "10px" }}
        >
          <List>
            <ListItem button>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <div
                style={{
                  fontFamily: "muli-bold",
                  display: "inline-block",
                  fontSize: "13px",
                }}
              >
                Find Service Centers
              </div>
            </ListItem>
          </List>
        </Link>

        {/* {user.role_id == '2' &&
          <Link to="/OfficeProfile" onClick={handleDrawerClose}>
            <List>
                <ListItem button key={user.company_name}>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary={user.company_name} />
                </ListItem>
            </List>
          </Link>
        }
        {user.role_id == '1' &&
          <Link to="/Profile" onClick={handleDrawerClose}>
            <List>
                <ListItem button key={user.name}>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary={user.name} />
                </ListItem>
            </List>
          </Link>
        }

        <Link to="/GetJobs" onClick={handleDrawerClose}>
          <List>
              <ListItem button key={"Get job"}>
                <ListItemIcon><WorkIcon /></ListItemIcon>
                <ListItemText primary={"Get job"} />
              </ListItem>
          </List>
        </Link>

        <Link to="/HiringDorners" onClick={handleDrawerClose}>
          <List>
            {['Jobs'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <WorkOutlineIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Link> */}

        {userlogin === false && (
          <>
            <Link
              to="/login"
              onClick={handleDrawerClose}
              style={{ marginLeft: "10px" }}
            >
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <div
                    style={{
                      fontFamily: "muli-bold",
                      display: "inline-block",
                      fontSize: "13px",
                    }}
                  >
                    Login
                  </div>
                </ListItem>
              </List>
            </Link>
            <Link
              to="/sign_up"
              onClick={handleDrawerClose}
              style={{ marginLeft: "10px" }}
            >
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <div
                    style={{
                      fontFamily: "muli-bold",
                      display: "inline-block",
                      fontSize: "13px",
                    }}
                  >
                    Sign up
                  </div>
                </ListItem>
              </List>
            </Link>
          </>
        )}

        {userlogin === true && (
          <>
            <Link
              to="pilot_dashboard/activities/images"
              onClick={handleDrawerClose}
              style={{ marginLeft: "10px" }}
            >
              <List>
                <ListItem button>
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
                      style={{ display: "flex", alignItems: "center", cursor: "pointer", justifyContent: "center", width: "100%" }}
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

                      <span style={{ paddingLeft: "10px", fontSize: "17px" }}>
                        My account
                      </span>
                    </div>
                    {showLogout && 
                      <div class="dropdown-content" onClick = {accountLogout}>
                        <div className="logout_btn" style = {{color: "black", fontSize: "14px"}}>Logout</div>
                      </div>
                    }
                  </span>
                </li>
                </ListItem>
              </List>
            </Link>
          </>
        )}
        {/* <span style={{ marginTop: "auto" }} onClick={handleDrawerClose}>
          <List style={{ margin: "0px 0px 10px 10px", width: "fit-content" }}>
            <ListItem button>
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
                {(localStorage.getItem("role") === "company") && <li className="nav-item">
                  <div className="nav-links">
                    <Button
                      variant="contained"
                      color="default"
                      id="first"
                      className="nav_upload_img"
                      onClick = {()=>history.push("/create_job")}
                      style = {{textTransform: "initial", bottom: "2px", padding: "6px 20px 6px 20px"}}
                    >
                      <img style={{ paddingRight: 10 }} src={UploadFile} />{" "}
                      CreateJob
                    </Button>
                  </div>
                </li>
                }
            </ListItem>
          </List>
        </span> */}
      </Drawer>

      <main
        id={All.SidebarHeader}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
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