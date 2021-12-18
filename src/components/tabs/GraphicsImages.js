import React from 'react'
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';    
import Like from '../Like'
import DroneImg from '../images/drone-img.svg'
import EditIcon from '@material-ui/icons/Edit'; 
import nofoundresult from '../images/noresultfound.svg'

import { userService } from '../_services/user.service';

const API_URL = 'https://nexevo-demo.in/nidheesh/dn/auth-app/public/api/auth';

export default class GraphicsImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listing: [],
            users: '',
            visible: 10,
            id: [],
            userId: props.user, 
            categories: '4',
            loading: true,
            error: false
        };
        this.loadMore = this.loadMore.bind(this);
    }

    loadMore() {
        this.setState((prev) => {
            return { visible: prev.visible + 8 };
        });
 
    }

    componentDidMount() {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        }
        axios.get(`https://nexevo-demo.in/nidheesh/dn/auth-app/public/api/auth/categorylisting/${this.state.userId}/${this.state.categories}`, config).then(response => response.data)
            .then(data => { 
                this.setState({ 
                    listing: data,
                    loading: false,
                 })
            },
                err => { 
                })

                userService.User().then(res => {
                    this.setState({ users: res.data })
                },
                  err => { 
                  }) 
    }

    
    clickMe(user){ 
        this.setState({
          redirect: true
        }) 
      }
      
    render() {
        const { listing, value } = this.state;
        const {users,  values} = this.state;
        const { loading, data } = this.state;
        return loading === true
            
            ? 
            <div>
            <figure> 
                    <Skeleton height={250} width={270} count={4} className={All.SkeletonImg}/>   
            </figure>
        </div> 
            : <><div>
                {!listing.length
                    ? 
                    <div style={{margin: '0px auto',display: 'block'}}>
                            <Box className={All.Text_center} pt={5}>
                            <img src={nofoundresult}  className={`${All.W_xs_100} ${All.W_sm_100}`}/>
                            <Box className={`${All.Text_center}`} px={5} pb={2}>
                              <h2>No Results Found</h2> 
                            </Box>
                              <Box className={`${All.Text_center}`} pb={5}> 
                              <label>It seems we can’t find any results based on your search. </label>
                            </Box>
                            </Box>
                            </div> 
                    :  
                    <div>
                           <div class="Filters">
                                  <ul> 
                    {this.state.listing.slice(0, this.state.visible).map(user => ( 
                                                   <li>
                                                   <div>
                                                        <figure>
                                                        {users.id == this.state.userId ? 
                                                        <figcaption class="edit" style={{top: '0 !important'}}>   
                                                            <Link to={{ pathname: `/PostEdit/${user.id}/${user.user_id}`,  data: user , state: { foo: 'bar'} }} onClick={this.clickMe.bind(this, user)}> 
                                                            <span className="LikeIcon MuliLight"> <EditIcon></EditIcon> </span>
                                                            </Link> </figcaption> : <> </> }  
                                                                <Link  to={{ pathname: `/Imageview/${user.id}/${user.user_id}`,  data: user , state: { foo: 'bar'} }} onClick={this.clickMe.bind(this, user)}>  
                                                            <div class="content-overlay"></div>  
                                                                {user.src ? <img class="GalleryImg" src={user.src} /> 
                                                            :  <Skeleton circle={true} height={280} width={280}  className={All.SkeletonImg}/> }  
                                                            </Link> 
                                                            <figcaption>
                                                            {users.id == this.state.userId ?  <span className="FSize_14 Profile_icon">{user.author} </span> 
                                                            :  <Link className={All.White} to={{ pathname:`/ProfileSingle/${user.user_id}`}}><span className="FSize_14 Profile_icon">{user.author} </span></Link> }      
                                                                <span className="LikeIcon  MuliLight"><Like id={user.id}/> </span>
                                                            </figcaption>
                                                        </figure>
                                        </div>
                                </li>
                        ))}
                        </ul>
                      </div>
                    </div> 
            } 
            </div> 
              {this.state.visible < this.state.listing.length && 
                <Box py={6} textAlign={'center'}>
                <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                    <img style={{paddingRight:10}} src={DroneImg}/>
                    Load More</Button>    
                </Box>  
             }  
             </>
    }

}