import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Location from '../images/location.svg'
import work from '../images/work.svg'
import utv from '../images/utv.png'
import FilterDropdown from '../filter/FilterDropdown'
import Divider from '@material-ui/core/Divider';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import nofoundresult from '../images/noresultfound.svg'
import DroneImg from '../images/UploadFile.svg'

const API_URL = 'http://localhost/auth-app/public/api/auth';

class Posts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myposts: [],
      loading: true,
      visible: 10,
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

    const url = `${API_URL}/mypost`;
    axios.get(url, config).then(response => response.data)
      .then((data) => {
        this.setState({
          myposts: data,
          loading: false,
        })
      })
  }

  deleteRow(id, e) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this job post",
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
          const url = `${API_URL}/DeleteJob/${id}`;
          axios.get(url, config).then(res => {
            const myposts = this.state.myposts.filter(item => item.id !== id);
            this.setState({ myposts });
            swal(res.data.message, {
              icon: "success",
            });
          }).catch(error => {
          });
        } else {
          swal("Your job post is safe!");
        }
      });
  }

  render() {
    const { loading, data } = this.state;
    const { myposts, value } = this.state;

    return loading === true
      ?
      <>
        <Divider />
        <Box className={All.JobsList}>
          <Box textAlign={'Left'} pt={3} className={`${All.Joblist_loading}`}>
            <Skeleton circle={true} height={100} width={100} />
            <Box pt={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Skeleton width={100} />
              <Skeleton width={80} />
            </Box>
          </Box>
          <Box pt={1}>
            <Skeleton />
          </Box>
          <Box className={`${All.JobDescription}`} >
            <Skeleton />
            <Box pb={6} pt={3}>
              <Button ml={2} className={`${All.BtnStyle_4} ${All.W_xs_45} ${All.W_sm_45}`} disabled>
                <img style={{ paddingRight: 10 }} />
              </Button>
              <Button ml={2} className={`${All.BtnStyle_4} ${All.W_xs_45} ${All.W_sm_45}`} disabled>
                <img style={{ paddingRight: 10 }} />
              </Button>

              <Button disabled ml={2} variant="contained" color="default" type="submit" className={`${All.Bold} ${All.BtnStyle_4} ${All.W_xs_100} ${All.W_sm_100} ${All.D_Block_xs} ${All.D_Block_sm}`}>
              </Button>

              <Button disabled ml={2} variant="contained" color="default" type="submit" className={`${All.Bold} ${All.BtnStyle_4} ${All.W_xs_100} ${All.W_sm_100} ${All.D_Block_xs} ${All.D_Block_sm}`}>
              </Button>

              <Button disabled ml={2} variant="contained" color="default" type="submit" className={`${All.Bold} ${All.BtnStyle_4} ${All.W_xs_100} ${All.W_sm_100} ${All.D_Block_xs} ${All.D_Block_sm}  ${All.DisplayNone}`}>

              </Button>
              <Button disabled ml={2} variant="contained" color="default" type="submit" className={`${All.Bold} ${All.BtnStyle_4} ${All.W_xs_100} ${All.W_sm_100} ${All.D_Block_xs} ${All.D_Block_sm}  ${All.DisplayNone}`}>
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Divider />
        <Box className={All.JobsList}>
          <Box textAlign={'Left'} pt={3} className={`${All.Joblist_loading}`}>
            <Skeleton circle={true} height={100} width={100} />
            <Box pt={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Skeleton width={100} />
              <Skeleton width={80} />
            </Box>
          </Box>
          <Box pt={1}>
            <Skeleton />
          </Box>
          <Box className={`${All.JobDescription}`} >
            <Skeleton />
            <Box pb={6} pt={3}>
              <Button ml={2} className={`${All.BtnStyle_4} ${All.W_xs_45} ${All.W_sm_45}`} disabled>
                <img style={{ paddingRight: 10 }} />
              </Button>
              <Button ml={2} className={`${All.BtnStyle_4} ${All.W_xs_45} ${All.W_sm_45}`} disabled>
                <img style={{ paddingRight: 10 }} />
              </Button>

              <Button disabled ml={2} variant="contained" color="default" type="submit" className={`${All.Bold} ${All.BtnStyle_4} ${All.W_xs_100} ${All.W_sm_100} ${All.D_Block_xs} ${All.D_Block_sm}`}>
              </Button>

              <Button disabled ml={2} variant="contained" color="default" type="submit" className={`${All.Bold} ${All.BtnStyle_4} ${All.W_xs_100} ${All.W_sm_100} ${All.D_Block_xs} ${All.D_Block_sm}`}>
              </Button>

              <Button disabled ml={2} variant="contained" color="default" type="submit" className={`${All.Bold} ${All.BtnStyle_4} ${All.W_xs_100} ${All.W_sm_100} ${All.D_Block_xs} ${All.D_Block_sm}  ${All.DisplayNone}`}>

              </Button>
              <Button disabled ml={2} variant="contained" color="default" type="submit" className={`${All.Bold} ${All.BtnStyle_4} ${All.W_xs_100} ${All.W_sm_100} ${All.D_Block_xs} ${All.D_Block_sm}  ${All.DisplayNone}`}>
              </Button>
            </Box>
          </Box>
        </Box>
      </>
      : <>
        {!myposts.length
          ?
          <div style={{ margin: '0px auto', display: 'block' }}>
            <Box className={All.Text_center} pt={5}>
              <img src={nofoundresult} className={`${All.W_xs_100} ${All.W_sm_100}`} />
              <Box className={`${All.Text_center}`} px={5} pb={2}>
                <h2>No Results Found</h2>
              </Box>
              <Box className={`${All.Text_center}`} pb={5}>
                <label>It seems we can't find any results based on your search. </label>
              </Box>
            </Box>
          </div>
          :
          <>
            <section className={All.HireJobList}>
              <Container className={All.Container}>
                <Row>
                  <Col lg={12}>
                    <Divider />
                    {/* {this.state.myposts.map((user) => (   */}
                    <div className="tiles" aria-live="polite">
                      {this.state.myposts.slice(0, this.state.visible).map(user => (
                        <>
                          <Box className={All.JobsList}>
                            <Box textAlign={'Left'} pt={3}>
                              {user.profile ?
                                <img class="alignleft" src={user.profile}
                                  alt="Image Sample 1" style={{
                                    display: "inline",
                                    float: "left",
                                    width: "100px",
                                    marginRight: '15px',
                                    height: '100px',
                                    borderRadius: '100px'
                                  }} /> : <Skeleton circle={true} height={100} width={100} className={All.SkeletonImg} />}
                            </Box>
                            <Box pt={1} className={`${All.DisplayFlex_xl} ${All.flexEnd_xl} ${All.DisplayFlex_lg} ${All.flexEnd_lg} ${All.DisplayFlex_md} ${All.flexEnd_md}`}>
                              <h2 className={All.paddingright}>{user.jobtitle || <Skeleton count={1} />}</h2>
                              <Link to={{ pathname: `PostJobEdit/${user.id}` }}>
                                <Button className={`${All.BtnStyle_8} ${All.Btn_12} ${All.D_None_xs} ${All.D_None_sm} ${All.DisplayBlock}`}>Edit</Button>
                              </Link>

                              {/* <Button className={`${All.BtnStyle_5} ${All.Btn_12}`} onClick={(e) => this.deleteRow(user.id, e)}>Delete</Button> */}
                              <Button className={`${All.BtnStyle_5} ${All.Btn_12} ${All.D_None_xs} ${All.D_None_sm} ${All.DisplayBlock}`} onClick={(e) => this.deleteRow(user.id, e)}>Delete</Button>

                            </Box>
                            <Box pt={1}>
                              <label className={All.Bold}>{user.companyname || <Skeleton />}</label>
                            </Box>
                            <Box className={`${All.JobDescription} ${All.pt_xs_50} ${All.pt_sm_50}  ${All.pt_md_50}`} >
                              <label className={All.Normal}>{user.jobdescription || <Skeleton />}</label>
                              <Box pb={6} pt={3}>
                                <Button ml={2} className={`${All.BtnStyle_4} ${All.W_xs_45} ${All.W_sm_45}`} disabled>
                                  <img style={{ paddingRight: 10 }} src={Location} />
                                  {user.joblocation}</Button>
                                <Button ml={2} className={`${All.BtnStyle_4} ${All.W_xs_45} ${All.W_sm_45}`} disabled>
                                  <img style={{ paddingRight: 10 }} src={work} />
                                  {user.typeofrole}</Button>

                                <Link to={`/JobAppliedDroners/${user.id}`}>
                                  <Button ml={2} variant="contained" color="default" type="submit" className={`${All.Bold} ${All.BtnStyle_2} ${All.W_xs_100} ${All.W_sm_100} ${All.D_Block_xs} ${All.D_Block_sm}`}>
                                    Applied Droners</Button>
                                </Link>

                                <Link to={`/ViewJob/${user.id}`}>
                                  <Button ml={2} variant="contained" color="default" type="submit" className={`${All.Bold} ${All.BtnStyle_3} ${All.W_xs_100} ${All.W_sm_100} ${All.D_Block_xs} ${All.D_Block_sm}`}>
                                    View Job</Button>
                                </Link>

                                <Button ml={2} variant="contained" color="default" type="submit" className={`${All.Bold} ${All.BtnStyle_4} ${All.W_xs_100} ${All.W_sm_100} ${All.D_Block_xs} ${All.D_Block_sm}  ${All.DisplayNone}`}>
                                  Edit Job
                                </Button>
                                <Button ml={2} variant="contained" color="default" type="submit" onClick={(e) => this.deleteRow(user.id, e)} className={`${All.Bold} ${All.BtnStyle_4} ${All.W_xs_100} ${All.W_sm_100} ${All.D_Block_xs} ${All.D_Block_sm}  ${All.DisplayNone}`}>
                                  Delete
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                          <Divider />
                        </>
                      ))}
                    </div>
                    {this.state.visible < this.state.myposts.length &&
                      <Box py={6} textAlign={'center'}>
                        <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={All.BtnStyle_5}>
                          <img style={{ paddingRight: 10 }} src={DroneImg} />
                          Load More</Button>
                      </Box>
                    }
                  </Col>
                </Row>
              </Container>
            </section>
          </>
        }

      </>
  }
}
function MyPostsTitle() {
  return (
    <>

    </>
  )
}


export default function MyPosts() {
  return (
    <>
      <MyPostsTitle />
      <Posts />
    </>
  )
}
