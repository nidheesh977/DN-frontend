import React from 'react'
import { Container, Row, Col } from 'react-grid-system';
import Box from '@material-ui/core/Box';
import All from '../website/All.module.css'
import Divider from '@material-ui/core/Divider';
import FollowBtn from './FollowBtn'
import axios from 'axios'
import { Link } from 'react-router-dom';
import nofoundresult from '../images/noresultfound.svg'
import DroneImg from '../images/drone-img.svg'
import Button from '@material-ui/core/Button';
import Skeleton from 'react-loading-skeleton';
 
export default class HiringDorners extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            loading: true,
            following:[],
            visible: 10, 
            userId: props.user
        }; 
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
                }}
              axios.post('http://localhost/auth-app/public/api/auth/following', {
                  user_id:this.props.user,
              },config)
                .then(res => {    
                    this.setState({ 
                        following: res.data.followers,
                        loading: false,
                     })
                },
                  err => { 
                  })
      }

      render() {
        const { loading, data } = this.state;
        const { following, value } = this.state;  

        return loading === true
        ? 
        <section>
        <Container>
          <Row>
            <Col>
            <Box >
                              <ul className={`${All.ListGroup} ${All.ListGroupFlush} ${All.Purchasedlistdesktop}`}>
                              <li className={`${All.ListGroupItem} ${All.padding_0}`}>  
                                      <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                         <Skeleton circle={true} height={100} width={100} className={`${All.Border_radius_50}`} />
                                      </figure>
                                      <div className={All.UsersListBody}>
                                          <div>  
                                          <Skeleton width={130}/>
                                          <Skeleton width={155}/>
                                           </div>
                                          <div className={` ${All.UsersListAction} ${All.pt_sm_0} ${All.p_md_0}  `}>
                                          <Button ml={2}  className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                               <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                                          </div>
                                      </div>
                                  </li>
                              <li className={`${All.ListGroupItem} ${All.padding_0}`}>  
                                      <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                         <Skeleton circle={true} height={100} width={100} className={`${All.Border_radius_50}`} />
                                      </figure>
                                      <div className={All.UsersListBody}>
                                          <div>  
                                          <Skeleton width={130}/>
                                          <Skeleton width={155}/>
                                           </div>
                                          <div className={` ${All.UsersListAction} ${All.pt_sm_0} ${All.p_md_0}  `}>
                                          <Button ml={2}  className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                               <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                                          </div>
                                      </div>
                                  </li>
                                  <Divider className={`${All.D_None_xs} ${All.D_None_sm} ${All.D_None_md}`}/> 
                              </ul>
                              
                              <ul className={`${All.ListGroup} ${All.ListGroupFlush} ${All.Purchasedlistmobile}`}>
                              <li className={`${All.ListGroupItem} ${All.paddingtop_10}`}>  
                                      <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                         <Skeleton circle={true} height={100} width={100} className={`${All.Border_radius_50}`} />
                                      </figure>
                                      <div className={All.UsersListBody}>
                                          <div>  
                                          <Skeleton width={130}/>
                                          <Skeleton width={155}/>
                                          <Button ml={2}  className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                               <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                                           </div> 
                                      </div>
                                  </li>
                              <li className={`${All.ListGroupItem} ${All.paddingtop_10}`}>  
                                      <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                         <Skeleton circle={true} height={100} width={100} className={`${All.Border_radius_50}`} />
                                      </figure>
                                      <div className={All.UsersListBody}>
                                          <div>  
                                          <Skeleton width={130}/>
                                          <Skeleton width={155}/>
                                          <Button ml={2}  className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                               <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                                           </div> 
                                      </div>
                                  </li>
                                  <Divider className={`${All.D_None_xs} ${All.D_None_sm} ${All.D_None_md}`}/> 
                              </ul>
                          </Box> 
            </Col>
          </Row>
        </Container>
      </section>
        : <>
          {!following.length
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
        <section className={All.Following}>
            <Container className={All.Container}>
                <Row className={`${All.marginleft_90} ${All.marginright_90}`}>
                    <Col lg={12} className={All.padding_0}> 
                            {this.state.following.slice(0, this.state.visible).map(user => (
                        <>
                        <Box>
                            <ul className={`${All.ListGroup}  ${All.ListGroupFlush}`}>
                                <li className={`${All.ListGroupItem} ${All.padding_0}`}>
                                    <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                        <img className={`${All.height_auto_sm} ${All.height_auto_xs} alignleft`} src={user.profile}
                                            alt="Image Sample 1" style={{
                                                display: "inline",
                                                float: "left",
                                                width: "100px",
                                                height: "150px",
                                                borderRadius: "100px",
                                                marginRight: '30px'
                                            }} />
                                    </figure>
                                    <div className={All.UsersListBody}>
                                        <div>
                                        <Link  to={{ pathname: `ProfileSingle/${user.user_id}`  }} >  
                                            <h4 className={` ${All.paddingbottom} ${All.p_xs_0} ${All.p_sm_0} ${All.p_md_0}`}>{user.user}</h4>
                                            </Link>
                                            <label className={All.wordbreak_breakAll}>{user.user_name}</label> 
                                        </div>
                                        <div className={` ${All.UsersListAction} ${All.p_sm_0} ${All.p_md_0} `}>
                                        <FollowBtn id={user.user_id} />
                                        </div>
                                    </div>
                                </li>
                                <Divider className={`${All.D_None_xs} ${All.D_None_sm} ${All.D_None_md}`}/> 
                            </ul>
                        </Box>
                                </>
                                    ))}
                        {/* <FollowBtn />
                    <FollowBtn /> */}

                {this.state.visible < this.state.following.length && 
                    <Box py={6} textAlign={'center'}>
                    <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                        <img style={{paddingRight:10}} src={DroneImg}/>
                        Load More</Button>    
                        </Box>  
                        }  

                    </Col>
                </Row>
            </Container>
</section>
    }
    </>
}
}