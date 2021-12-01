import React from 'react'
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {authenticationService} from '../../middleware/auth'; 
import { userService } from '../_services/user.service';


class FollowBtn extends React.Component {
    constructor(props) {
      super(props);  
      // this.state = {isLoading: false}; 
      this.state = {
        isToggleOn: props.status,
        userId: props.id,
        user_role_id: '',
        open: false,
        currentUser: authenticationService.currentUserValue, 
      };
      this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
      const { currentUser } = this.state; 

      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }

      userService.User().then(res => {  
        this.setState({user_role_id:res.data.role_id}); 
    },
      err => { 
        console.log(err); 
      }
    ) 

      axios.post('http://localhost/auth-app/public/api/auth/followcheck',{
      user_id:this.state.userId,
      }, config)
        .then(res => { 
           if(res.data.message=="unfollow")
           {
            this.setState({isToggleOn:false}); 
           }
           if(res.data.message=="follow")
           {
            this.setState({isToggleOn:true}); 
           } 
        //   this.setState({followers:[]})
        },
          err => { 
          }
        )
    }

    handleTooltipClose = () => {
      this.setState({ open: false });
    };
  
    handleTooltipOpen = () => {
      this.setState({ open: true });
    };
    
    handleClick() {
      // this.setState({isLoading:true}); 
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }
      axios.post('http://localhost/auth-app/public/api/auth/follow',{
      user_id:this.state.userId,
      }, config)
        .then(res => { 
           if(res.data.message=="follow")
           {
            this.setState({isToggleOn:false});  
           }
           if(res.data.message=="unfollow")
           { 
            this.setState({isToggleOn:true});  
           } 
          //  this.setState({isLoading:false}); 
        },
          err => {
            // this.setState({isLoading:false});  
          }
        ) 
    }
  
    render() {
      const { currentUser, userFromApi } = this.state;
      return ( 
                        <form> 
                            <Box textAlign={'right'} className={All.marginright}> 
                            {currentUser === 1 ? 
                            <Button onClick={this.handleClick} id="follow" ml={2} variant="contained" color="default" className={All.BtnStyle_3}>
                                {this.state.isToggleOn ? 'Follow' : 'UnFollow'}</Button> 
                                : 
                                <ClickAwayListener onClickAway={this.handleTooltipClose}>
                                <div>
                                  <Tooltip
                                    PopperProps={{
                                      disablePortal: true,
                                    }}
                                    onClose={this.handleTooltipClose}
                                    open={this.state.open}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title="You don't follow this user"
                                  >
                                    <Button className={All.BtnStyle_3} onClick={this.handleTooltipOpen}>Follow</Button>
                                  </Tooltip>
                                </div>
                              </ClickAwayListener>
                                }
                        </Box>   
                        </form>  
      );
    }
  }

  export default FollowBtn
  
   


  