import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Box from '@material-ui/core/Box';
import All from '../website/All.module.css'
import utv from '../images/utv.png'
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-grid-system';
import Divider from '@material-ui/core/Divider';
import Track from '../images/clock.svg'
import Purchase from '../images/purchase.png'
import $ from 'jquery'
import axios from 'axios'
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link , useParams } from 'react-router-dom';
import DroneImg from '../images/drone-img.svg'
import nofoundresult from '../images/noresultfound.svg' 
import Skeleton from 'react-loading-skeleton';
  
const API_URL = 'https://demo-nexevo.in/haj/auth-app/public/api/auth';

var videos = document.querySelectorAll(".thumbnail");
for (var i = 0; i < videos.length; i++) {
    videos[i].addEventListener('click', clickHandler, false);
}
function clickHandler(el) {
    var mainVideo = document.getElementById("mainVideo");
    mainVideo.src = el.srcElement.currentSrc;
}
    

export default class Liked extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
          items: [],
          user:  [],
          value: '',
            loading: true,
            likedlisting: [], 
          visible: 10,
          error: false, 
        }; 
        this.loadMore = this.loadMore.bind(this);
      } 
      
      loadMore() {
        this.setState((prev) => {
          return {visible: prev.visible + 8};
        });
      }
   
    componentDidMount() {
        const config = {
                    headers: {
                      Authorization: 'Bearer ' + localStorage.getItem('access_token')
                    }
                  }   
        axios.get(`${API_URL}/user`, config)
        .then(res => this.setState({ user: res.data }, () => { 
                axios.get(`${API_URL}/likedlisting/${res.data.id}`,config).then(res => res.data)
                       .then((data) => { 
                        this.setState({ 
                            likedlisting: data,
                            loading: false,
                         })
                        })    
        })) 
    }
  
      render() {
        const { likedlisting, value } = this.state;  
        const {user , Values} = this.state; 
        const { loading, data } = this.state;

        return loading === true
        ? 
        <>
        <section className={All.Purchase}>
            <div className={All.Purchasedlistdesktop}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <li className={All.MyJobList}>
                                    <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                        <Skeleton circle={true} height={100} width={100} className={`${All.Border_radius_50}`} />
                                    </figure>
                                    <div className={All.UsersListBody}>
                                        <div>
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                        </div>
                                    </div>
                                </li>
                            </td>
                            <td >
                                <h1><Skeleton />  </h1>
                            </td>
                            <td className={All.Text_right}>
                                <div class="wrapper">
                                    <span className={`${All.FSize_16} ${All.FloatRight}`}>
                                        <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                            <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <li className={All.MyJobList}>
                                    <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                        <Skeleton circle={true} height={100} width={100} className={`${All.Border_radius_50}`} />
                                    </figure>
                                    <div className={All.UsersListBody}>
                                        <div>
                                            <Skeleton />
                                            <Skeleton />
                                            <Skeleton />
                                        </div>
                                    </div>
                                </li>
                            </td>
                            <td >
                                <h1><Skeleton />  </h1>
                            </td>
                            <td className={All.Text_right}>
                                <div class="wrapper">
                                    <span className={`${All.FSize_16} ${All.FloatRight}`}>
                                        <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                            <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={All.Purchasedlistmobile}>
                <li className={All.MyJobList}>
                    <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                    <Skeleton circle={true} height={100} width={100} className={`${All.Border_radius_50}`} />
                    </figure>
                        <div className={All.UsersListBody}>
                            <div>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton /> 
                                <Box py={2} display="flex"> 
                                <Button ml={2}  className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                            <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                                </Box>
                            </div>
                        </div> 
                </li>
                   <li className={All.MyJobList}>
                    <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                    <Skeleton circle={true} height={100} width={100} className={`${All.Border_radius_50}`} />
                    </figure>
                        <div className={All.UsersListBody}>
                            <div>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton /> 
                                <Box py={2} display="flex"> 
                                <Button ml={2}  className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                            <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                                </Box>
                            </div>
                        </div> 
                </li>
            </div>
        </section>
    </>
        : <>
          {!likedlisting.length
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
        <section className={All.Purchase}> 
        <div className={All.Purchasedlistdesktop}>
        <Box textAlign={'Left'}>    
                            <table>  
                            { this.state.likedlisting.slice(0, this.state.visible).map(like => ( 
                                <>
                                <tbody>
                                    <tr>
                                        <td>
                                            <li className={All.MyJobList}>
                                                <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                                {like.tag === '1' ? ( 
                                                                        <img className="alignleft" src={like.src}
                                                                            alt="Image Sample 1" style={{
                                                                                display: "inline",
                                                                                float: "left",
                                                                                borderRadius:"100px",
                                                                                height:'150px',
                                                                                width: "100px",
                                                                                objectFit: "cover",
                                                                                marginRight: '15px'
                                                                            }} />
                                                                            ) : like.tag === '2' ? (
                                                                                <img className="alignleft" src={like.src}
                                                                                alt="Image Sample 1" style={{
                                                                                    display: "inline",
                                                                                    float: "left",
                                                                                    borderRadius:"100px",
                                                                                    height:'150px',
                                                                                    width: "100px",
                                                                                    objectFit: "cover",
                                                                                    marginRight: '15px'
                                                                                }} />
                                                                            ) : like.tag === '3' ? (
                                                                                <video class="thumbnail" style={{
                                                                                    display: "inline",
                                                                                    float: "left",
                                                                                    borderRadius:"100px",
                                                                                    height:'150px',
                                                                                    width: "150px",
                                                                                    objectFit: "cover",
                                                                                    marginRight: '15px'
                                                                                }} > 
                                                                                    <source src={like.src} type="video/mp4" />
                                                                                </video>
                                                                                 ) : like.tag === '4' ? (
                                                                                    <img className="alignleft" src={like.src}
                                                                                    alt="Image Sample 1" style={{
                                                                                        display: "inline",
                                                                                        float: "left",
                                                                                        borderRadius:"100px",
                                                                                        height:'150px',
                                                                                        width: "100px",
                                                                                        objectFit: "cover",
                                                                                        marginRight: '15px'
                                                                                    }} />
                                                                                ) : (
                                                                                    <img className="alignleft" src={like.src}
                                                                                    alt="Image Sample 1" style={{
                                                                                        display: "inline",
                                                                                        float: "left",
                                                                                        borderRadius:"100px",
                                                                                        height:'150px',
                                                                                        width: "100px",
                                                                                        objectFit: "cover",
                                                                                        marginRight: '15px'
                                                                                    }} />
                                                                                )}
                                                                        </figure>
                                                <div className={All.UsersListBody}>
                                                    <div>
                                                        <h5 className={All.Bold}>{like.title}</h5>
                                                        <p>{like.profession}</p>
                                                    <p className={All.Bold}>Seller: <span className={All.light}>{like.author}</span></p> 
                                                    </div>
                                                </div>
                                            </li>
                                        </td>
                                        <td > <h5 className={All.light}>${like.price}</h5></td> 
                                        <td className={All.Text_right}> 
                                        <div class="wrapper"> 
                                            <span className={`${All.FSize_16} ${All.FloatRight}`}>
                                            <Link  to={`/ImageView/${like.post_id}/${like.user_id}`}>
                                                <Button className={All.BtnStyle_5}>View</Button>
                                                </Link>
                                                </span>
                                            </div>
                                        </td> 
                                    </tr>   

                                </tbody>
                                             </>
        ))}  
                            </table>  
                        </Box> 
                        {this.state.visible < this.state.likedlisting.length && 
               <Box py={6} textAlign={'center'}>
               <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                   <img style={{paddingRight:10}} src={DroneImg}/>
                   Load More</Button>    
               </Box>  
            }  
                            </div> 
                            <div className={All.Purchasedlistmobile}>
                            <Box >  
                            {this.state.likedlisting.slice(0, this.state.visible).map((like) => (  
                                            <li className={All.MyJobList}> 
                                                                        <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                                                        {like.tag === '1' ? (
                                                                        <img className="alignleft" src={like.src}
                                                                            alt="Image Sample 1" style={{
                                                                                display: "inline",
                                                                                float: "left",
                                                                                borderRadius:"100px",
                                                                                height:'100px',
                                                                                width: "100px",
                                                                                objectFit: "cover",
                                                                                marginRight: '15px'
                                                                            }} />
                                                                            ) : like.tag === '3' ? (
                                                                                <video className={`${All.thumbnailVideo} thumbnail`}
                                                                                style={{
                                                                                    display: "inline",
                                                                                    float: "left",
                                                                                    borderRadius:"100px",
                                                                                    height:'100px',
                                                                                    width: "100px",
                                                                                    objectFit: "cover",
                                                                                    marginRight: '15px'
                                                                                }} >
                                                                                    <source src={like.src} type="image/png" />
                                                                                    <source src={like.src} type="video/mp4" />
                                                                                </video>
                                                                                ) : (
                                                                                    <img className="alignleft" src={like.src}
                                                                                    alt="Image Sample 1" style={{
                                                                                        display: "inline",
                                                                                        float: "left",
                                                                                        borderRadius:"100px",
                                                                                        height:'100px',
                                                                                        width: "100px",
                                                                                        objectFit: "cover",
                                                                                        marginRight: '15px'
                                                                                    }} />
                                                                                )}
                                                                        </figure>
                                                                        <div className={All.UsersListBody}>
                                                                            <div> 
                                                                            <h5 className={All.Bold}>{like.title}</h5>
                                                                                <p>{like.profession}</p>
                                                                            <p className={All.Bold}>Seller: <span className={All.light}>{like.author}</span></p>
                                                                        <h5 className={All.light}>${like.price}</h5>
                                                                                <Box py={2}  display="flex"> 
                                                                                    <span className={`${All.FSize_16} ${All.FloatRight}`}>
                                                                                    <Link  to={`/ImageView/${like.post_id}/${like.user_id}`}>
                                                                                        <Button className={All.BtnStyle_5}>View</Button>
                                                                                        </Link>
                                                                                        </span>
                                                                                </Box>
                                                                            </div>
                                                                        </div> 
                                                                    </li>
                            ))}  
                                                                  
                                            </Box>     
        {this.state.visible < this.state.likedlisting.length && 
               <Box py={6} textAlign={'center'}>
               <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                   <img style={{paddingRight:10}} src={DroneImg}/>
                   Load More</Button>    
               </Box> 
 
            }  
             </div>
        </section>
     }
     </>
}
}
