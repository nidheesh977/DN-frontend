import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Box from '@material-ui/core/Box';
import All from '../website/All.module.css'
import utv from '../images/utv.png'
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-grid-system';
import Divider from '@material-ui/core/Divider';
import axios from 'axios' 
import swal from 'sweetalert';  
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link , useParams } from 'react-router-dom';
import nofoundresult from '../images/noresultfound.svg'
import DroneImg from '../images/drone-img.svg' 
import Skeleton from 'react-loading-skeleton';

export default class MyJobs extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
            loading: true,
            myjobs: [],
        visible: 1,
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

    const url = `https://demo-nexevo.in/haj/auth-app/public/api/auth/myjobs`;
    axios.get(url,config).then(response => response.data)
    .then((data) => {
      this.setState({ 
        myjobs: data,
        loading: false,
     }) 
     })
  }  

  deleteRow(id, e){  
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        }
        const url = `https://demo-nexevo.in/haj/auth-app/public/api/auth/deletemyjob/${id}`;
        axios.get(url, config).then(response => {  
              const myjobs = this.state.myjobs.filter(item => item.id !== id);
              this.setState({ myjobs });   
              swal(response.data.message, {
                icon: "success",
              });
            }).catch(error => {   
              swal(error.message, {
                icon: "error",
              });
            });  
        } else {
          swal("Your imaginary file is safe!");
        }
      });  
    } 

    render() {  
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
                                      </div>
                                  </div>
                              </li>
                          </td>
                          <td ><h1><Skeleton width={100}/>  </h1></td> 
                          <td ><h1><Skeleton width={100}/>  </h1></td> 
                          <td ><h1><Skeleton width={100}/>  </h1></td> 
                          <td className={All.Text_right}>
                              <div class="wrapper">
                                  <span className={`${All.FSize_16} ${All.FloatRight}`}>
                                      <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                          <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
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
                                      </div>
                                  </div>
                              </li>
                          </td>
                          <td ><h1><Skeleton width={100}/>  </h1></td> 
                          <td ><h1><Skeleton width={100}/>  </h1></td> 
                          <td ><h1><Skeleton width={100}/>  </h1></td> 
                          <td className={All.Text_right}>
                              <div class="wrapper">
                                  <span className={`${All.FSize_16} ${All.FloatRight}`}>
                                      <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                          <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
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
                          <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
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
                          <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                          <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                              </Box>
                          </div>
                      </div> 
              </li>
          </div>
      </section>
  </>
      : <>
        {!this.state.myjobs.length
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
        <section>
              <Container className={All.Container}>
                <Row>
                    <Col className={`${All.p_xs_0} ${All.p_md_0} ${All.p_sm_0}`}> 
                    <Box className={All.Myjobslistdesktop} textAlign={'Left'}> 
                    <table>
                                <thead>
                                    <tr>
                                        <th><h5 className={`${All.Bold} ${All.Applieddronerslist}`}>Droner Profile</h5></th>
                                        <th><h5 className={`${All.Bold} ${All.Applieddronerslist}`}>Job Title</h5></th>
                                        <th><h5 className={`${All.Bold} ${All.Applieddronerslist}`}>Applied on</h5></th>
                                        <th><h5 className={`${All.Bold} ${All.Applieddronerslist}`}>Action</h5></th>
                                    </tr>
                                </thead>
 
                            { this.state.myjobs.slice(0, this.state.visible).map(user => (
                                <> 
                                <tbody>
                                    <tr>
                                        <td data-column="Company Profile">
                                            <li className={All.MyJobList}>
                                                <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                                  <Link to={`/ProfileSingle/${user.user_id}`}>
                                                    <img className={`${All.height_auto_xs} ${All.height_auto_sm} alignleft`} src={user.profile} 
                                                        alt="Image Sample 1" style={{
                                                            display: "inline",
                                                            float: "left",
                                                            width: "100px",
                                                            marginRight: '15px',
                                                            height: '100px',
                                                            borderRadius: '100px'
                                                        }} />
                                                        </Link>
                                                </figure>
                                                <div className={All.UsersListBody}>
                                                    <div>
                                                    <Link to={`/ProfileSingle/${user.user_id}`}>
                                                        <h5 className={All.Bold}>{user.name}</h5>
                                                        </Link>
                                                        <label>{user.username}</label>
                                                    </div>
                                                </div>
                                            </li>
                                        </td>
                                        <td data-column="Job Title"> <li className={All.MyJobList}><label>{user.jobtitle}</label></li></td>
                                        <td data-column="Post on"><li className={All.MyJobList}><label>{user.applied}</label></li></td>
                                        <td data-column="Action">
                                        <li  className={`${All.MyJobList} ${All.JobsList}`}>
                                          <Link  to={`/ViewJob/${user.job_id}`}> 
                                            <Button mr={2} variant="contained" color="default" type="submit" className={All.BtnStyle_5}>
                                               View Job</Button>
                                               </Link>
                                            <Button mr={2} variant="contained" color="default" onClick={(e) => this.deleteRow(user.id, e)} className={All.BtnStyle_4}>
                                                Delete</Button>
                                                </li>
                                        </td>
                                    </tr> 
                                </tbody> 
                             
               </>
        ))}
                             </table>  
                             {this.state.visible < this.state.myjobs.length && 
                                            <Box py={6} textAlign={'center'}>
                                            <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                                                <img style={{paddingRight:10}} src={DroneImg}/>
                                                Load More</Button>    
                                            </Box>  
            }  
                        </Box> 

                        <Box className={All.Myjobslistmobile}>  
                               { this.state.myjobs.slice(0, this.state.visible).map((item, index) => {
                                return (
                                                <>
                                            <Box >  
                                            <li className={All.MyJobList}> 
                                                                        <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                                                        <img className={`${All.height_auto_xs} ${All.height_auto_sm} alignleft`} src={item.profile} 
                                                                                alt="Image Sample 1" style={{
                                                                                    display: "inline",
                                                                                    float: "left",
                                                                                    width: "100px",
                                                                                    borderRadius: "100px",
                                                                                    height: "100px",
                                                                                    marginRight: '15px'
                                                                                }} />
                                                                        </figure>
                                                                        <div className={All.UsersListBody}>
                                                                            <div>  
                                                                                <label className={`${All.Bold} ${All.padding_5}`}>{item.dornername}</label>
                                                                                <span className={` ${All.padding_5}`}>{item.dornerusername}</span>
                                                                                <label className={`${All.Bold} ${All.padding_5}`}>Job Title : <sapn className={All.MuliLight}>{item.jobtitle}</sapn></label>
                                                                                <label className={`${All.Bold} ${All.padding_5}`}>Applied on : <sapn className={All.MuliLight}> {item.applied}</sapn></label>
                                                                                <Box py={2}  display="flex">
                                                                                <Link  to={`/ProfileSingle/${item.user_id}`}> 
                                                                                <Button mr={2} variant="contained" color="default" type="submit" className={All.BtnStyle_5}>
                                                                                    View Profile</Button>
                                                                                    </Link>
                                                                                <Button mr={2} variant="contained" color="default" onClick={(e) => this.deleteRow(item.id, e)} className={`${All.BtnStyle_4} ${All.marginleft_20}`}>
                                                                                    Delete</Button>
                                                                                </Box>
                                                                            </div>
                                                                        </div> 
                                                                    </li>
                                            </Box>                                    
                                    </> 
                            )})
                            }  
                                            {this.state.visible < this.state.myjobs.length && 
                                            <Box py={6} textAlign={'center'}>
                                            <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                                                <img style={{paddingRight:10}} src={DroneImg}/>
                                                Load More</Button>    
                                            </Box>  
            }  
                                </Box>  
                    </Col>
                </Row>
            </Container>
        </section>  
        }
        </>
} 
}