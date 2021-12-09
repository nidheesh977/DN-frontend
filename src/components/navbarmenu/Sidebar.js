import React , { useState, useEffect } from 'react';
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
import MailIcon from '@material-ui/icons/Mail';
import Logo from '../images/Logo.png'
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search'; 
import ExitToAppIcon from '@material-ui/icons/ExitToApp'; 
import PersonIcon from '@material-ui/icons/Person';
import axios from 'axios'
import WorkIcon from '@material-ui/icons/Work';
import All from '../website/All.module.css'
import { logout, isLogin } from '../../middleware/auth';  
import WorkOutlineIcon from '@material-ui/icons/WorkOutline'; 
import BusinessIcon from '@material-ui/icons/Business';

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
  useEffect(() => Setuserlogin(isLogin()), [props])


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
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }
    
    axios.get('http://localhost/auth-app/public/api/auth/user', config)
      .then(res => {
        Setuser(res.data);  
      },
        err => { 
        }
      )  
          axios.get('http://localhost/auth-app/public/api/auth/profile', config)
      .then(res => {
        Setuser(res.data);  
      },
        err => { 
        }
      )  
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
        <Link to='/UpgradeProVersion' className='nav-item'>
            Upgrade Pro Version
          </Link>  
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <CloseIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />  

        <Link  to="/Searchresult"  onClick={handleDrawerClose}>
              <List>
                  {[ 'Search'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>{index % 2 === 0 ? <SearchIcon /> : <MailIcon /> }</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List> 
              </Link> 

              {user.role_id == '2' && 
              <Link  to="/OfficeProfile"  onClick={handleDrawerClose}>
              <List>
                  {[ 'Profile'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>{index % 2 === 0 ? <PersonIcon /> : <MailIcon /> }</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List> 
              </Link> 
        }
        {user.role_id == '1' && 
              <Link  to="/Profile"  onClick={handleDrawerClose}>
              <List>
                  {[ 'Profile'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>{index % 2 === 0 ? <PersonIcon /> : <MailIcon /> }</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List> 
              </Link> 
        }

        <Link to="/GetJobs"  onClick={handleDrawerClose}>
        <List>
                  {['Get Jobs'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>{index % 2 === 0 ? <WorkIcon /> : <MailIcon />}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List> 
        </Link> 

        <Link to="/HiringDorners"  onClick={handleDrawerClose}>
          <List>
                  {[ 'Hire Now'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>{index % 2 === 0 ? <WorkOutlineIcon /> : <MailIcon />}
                      </ListItemIcon> 
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List> 
        </Link>

        {userlogin === false &&
        <Link to="/Login"  onClick={handleDrawerClose}>
          <List>
                  {[ 'Login'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>{index % 2 === 0 ? <ExitToAppIcon /> : <MailIcon />} 
                      </ListItemIcon> 
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List> 
                </Link>
              
        }

        {userlogin === false &&
                <Link to="/User"  onClick={handleDrawerClose}>
                  <List>
                          {[ 'User Register'].map((text, index) => (
                            <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <PersonIcon /> : <MailIcon />}  
                              </ListItemIcon> 
                              <ListItemText primary={text} />
                            </ListItem>
                          ))}
                        </List> 
                </Link>
        }

        {userlogin === false &&
                        <Link to="/Company"  onClick={handleDrawerClose}>
                          <List>
                                  {[ 'Company Register'].map((text, index) => (
                                    <ListItem button key={text}>
                                        <ListItemIcon>{index % 2 === 0 ? <BusinessIcon /> : <MailIcon />}   
                                      </ListItemIcon> 
                                      <ListItemText primary={text} />
                                    </ListItem>
                                  ))}
                                </List> 
                        </Link>
                }
      
        {userlogin === true &&
        <Link onClick={() => handleLogout()} to="/">
          <List className="Signout"> 
                  {['Sign Out'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>{index % 2 === 0 ? <ExitToAppIcon /> : <ExitToAppIcon />}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List> 
        </Link> 
        }  

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