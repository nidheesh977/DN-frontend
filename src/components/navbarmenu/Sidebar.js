import React, { useState, Component, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Logo from '../images/Logo.png'
import { Link } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import axios from 'axios'
import WorkIcon from '@material-ui/icons/Work';
import Hiring from '../images/hiring.svg'
import All from '../website/All.module.css'
import { logout, isLogin, login, getRefreshToken } from '../../middleware/auth';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import BusinessIcon from '@material-ui/icons/Business';
import UploadFileIcon from '@material-ui/icons/CloudUpload';
import JobIcon from '@material-ui/icons/Work';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const [user, Setuser] = useState([]);
  const [profile, Setprofile] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [userlogin, Setuserlogin] = useState(false)


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleLogout = () => {
    logout();
    Setuserlogin(false)
    setOpen(false);
  }


  useEffect(() => {
    Setuserlogin(isLogin())
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }

    axios.get('https://demo-nexevo.in/haj/auth-app/public/api/auth/user', config)
      .then(res => {
        try{
          if(res.data.id>=0){
            Setuser(res.data);
          }
          else{
            localStorage.clear()
          }
        }
        catch{
          localStorage.clear()
        }
      })
    }, []);

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
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <Link to='/' className='nav-item'>
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
            {theme.direction === 'ltr' ? <CloseIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <Link to="/Searchresult" onClick={handleDrawerClose}>
          <List>
            <ListItem button>
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <div style = {{fontFamily: "muli-bold", display: "inline-block", fontSize: "13px"}}>Search</div>
            </ListItem>
          </List>
        </Link>

        <Link to="/apply_job" onClick={handleDrawerClose}>
          <List>
            <ListItem button>
              <ListItemIcon><JobIcon /></ListItemIcon>
              <div style = {{fontFamily: "muli-bold", display: "inline-block", fontSize: "13px"}}>Apply jobs</div>
            </ListItem>
          </List>
        </Link>

        <Link to="/hire_pilots" onClick={handleDrawerClose}>
          <List>
            <ListItem button>
              <ListItemIcon><JobIcon /></ListItemIcon>
              <div style = {{fontFamily: "muli-bold", display: "inline-block", fontSize: "13px"}}>Hire Pilots</div>
            </ListItem>
          </List>
        </Link>

        <Link to="/service_centers" onClick={handleDrawerClose}>
          <List>
            <ListItem button>
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <div style = {{fontFamily: "muli-bold", display: "inline-block", fontSize: "13px"}}>Find Service Centers</div>
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

        {userlogin === false &&
          <>
            <Link to="/login" onClick={handleDrawerClose}>
              <List>
                  <ListItem button>
                    <ListItemIcon><ExitToAppIcon />
                    </ListItemIcon>
                    <div style = {{fontFamily: "muli-bold", display: "inline-block", fontSize: "13px"}}>Login</div>
                  </ListItem>
              </List>
            </Link>
            <Link to="/sign_up" onClick={handleDrawerClose}>
              <List>
                  <ListItem button>
                    <ListItemIcon><PersonIcon />
                    </ListItemIcon>
                    <div style = {{fontFamily: "muli-bold", display: "inline-block", fontSize: "13px"}}>Sign up</div>
                  </ListItem>
              </List>
            </Link>
          </>
        }

        {userlogin === true &&
          <>
            <Link to="" onClick={handleDrawerClose}>
              <List>
                  <ListItem button>
                    <ListItemIcon><PersonIcon />
                    </ListItemIcon>
                    <div style = {{fontFamily: "muli-bold", display: "inline-block", fontSize: "13px"}}>My account</div>
                  </ListItem>
              </List>
            </Link>
            
            <Link to="">
              <List className="Signout">
                <ListItem button key={'Sign Out'}>
                  <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                  <ListItemText primary={''} />
                  <div style = {{fontFamily: "muli-bold", display: "inline-block", fontSize: "13px"}}>Sign Out</div>
                </ListItem>
              </List>
            </Link>
          </>
        }
        <Link to="/UploadFile" onClick={handleDrawerClose}>
          <List>
              <ListItem button>
                <ListItemIcon><UploadFileIcon />
                </ListItemIcon>
                <div style = {{fontFamily: "muli-bold", display: "inline-block", fontSize: "13px"}}>Upload file</div>
              </ListItem>
          </List>
        </Link>

      </Drawer>

      <main id={All.SidebarHeader}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}