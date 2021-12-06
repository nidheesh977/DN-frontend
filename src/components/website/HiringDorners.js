import React, { useState } from 'react'
import { Helmet } from "react-helmet";
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Location from '../images/location.svg'
import work from '../images/work.svg'
import Divider from '@material-ui/core/Divider';
import SearchResults from 'react-filter-search';
import { Link } from 'react-router-dom';
import $ from "jquery";
import nofoundresult from '../images/noresultfound.svg'
import Skeleton from 'react-loading-skeleton';
import viewJobMobileImg from '../images/viewjob_mobile.svg'
import DroneImg from '../images/drone-img.svg'

const API_URL = 'http://localhost/auth-app/public/api/auth';

class Hiring extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      value: '',
      hiredorners: [],
      title: [],
      loading: true,
      cities: [],
      visible: 10,
      error: false,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return { visible: prev.visible + 8 };
    });
  }

  handleChanges = (event) => {
    let job_title = $('#job_title').val();
    let job_location = $('#job_location').val();
    let job_category = $('#job_category').val();
    const config2 = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }

    axios.post('http://localhost/auth-app/public/api/auth/hiredornersfillter', {
      job_title: job_title,
      job_location: job_location,
      job_category: job_category,
    }, config2).then(res => {
      this.setState({ hiredorners: res.data.reverse() })
      console.log(res)

    }).catch(error => {
      console.log(error);
    });
  };

  componentDidMount() {
    this.getUsersData()
  }

  async getUsersData() {
    const url = `${API_URL}/hiredorners`;
    const urls = `${API_URL}/cities`;
    const urlss = `${API_URL}/jobtitle`;
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }

    return await setTimeout(async () => {
      const res = await axios.get(url, config)
      const ress = await axios.get(urls, config)
      const resss = await axios.get(urlss, config)

      const users = res.data.reverse()
      const datas = ress.data
      const data1 = resss.data
      this.setState({ users })
      this.setState({
        hiredorners: users,
        loading: false,
        title: data1,
        cities: datas,
      })
    }, 3000)
  }

  clickMe(el) {
    this.setState({
      redirect: true
    })
  }


  render() {
    const { hiredorners, value } = this.state;
    const { cities, values } = this.state;
    const { title, values1 } = this.state;
    const { loading, data } = this.state;
    return (
      <>
        <section className={All.HiringDronersFliter}>
          <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
            <Row class="FilterDropdown" >
              <Col lg={4} >
                <label className={All.Bold}>Job Title</label>
                <select className="dropdown dropdown__text" id="job_title" onChange={this.handleChanges} >
                  <option value="" selected>All Titles</option>
                  {title.map((option) => (
                    <option value={option.jobtitle}>{option.jobtitle}</option>
                  ))}
                </select>
              </Col>
              <Col lg={4} >
                <label className={All.Bold}>Job Category</label>

                <select className="dropdown dropdown__text" id="job_category" onChange={this.handleChanges} >
                  <option value="" selected>All Categories</option>
                  <option value="full_time">Full-Time</option>
                  <option value="part_time">Part-Time</option>
                  <option value="freelanchers">Freelanchers</option>
                </select>
              </Col>
              <Col lg={4} >

                <label className={All.Bold}>Job Location</label>

                <select className="dropdown dropdown__text" id="job_location" onChange={this.handleChanges} >
                  <option value="" selected disabled>All Locations</option>
                  {cities.map((option) => (
                    <option value={option.location}>{option.location}</option>
                  ))}
                </select>
              </Col>
            </Row>
          </Container>
        </section>
        {loading === true
          ?
          <section className={All.HireDornerJobList}>
            <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_30} ${All.paddingtop_10}`}>
              <Row>
                <Col lg={12}>
                  <Box className={All.JobsList}>
                    <div className={All.Joblist_loading}>
                      <div>
                        <Skeleton circle={true} height={100} width={100} className={`${All.Border_radius_50}`} />
                      </div>
                      <div>
                        {loading === true ? <Skeleton /> : <h2></h2>}
                        {loading === true ? <Skeleton /> : <h2></h2>}
                        <div>
                          <Skeleton />
                          <Box pb={6} pt={3}>
                            <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                              <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                            <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                              <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                            <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                              <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>

                          </Box>
                        </div>
                      </div>
                    </div>
                  </Box>
                  <Box className={All.JobsList}>
                    <div className={All.Joblist_loading}>
                      <div>
                        <Skeleton circle={true} height={100} width={100} className={`${All.Border_radius_50}`} />
                      </div>
                      <div>
                        {loading === true ? <Skeleton /> : <h2></h2>}
                        {loading === true ? <Skeleton /> : <h2></h2>}
                        <div>
                          <Skeleton />
                          <Box pb={6} pt={3}>
                            <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                              <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                            <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                              <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                            <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                              <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>

                          </Box>
                        </div>
                      </div>
                    </div>
                  </Box>
                  <Box className={All.JobsList}>
                    <div className={All.Joblist_loading}>
                      <div>
                        <Skeleton circle={true} height={100} width={100} className={`${All.Border_radius_50}`} />
                      </div>
                      <div>
                        {loading === true ? <Skeleton /> : <h2></h2>}
                        {loading === true ? <Skeleton /> : <h2></h2>}
                        <div>
                          <Skeleton />
                          <Box pb={6} pt={3}>
                            <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                              <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                            <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                              <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>
                            <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                              <img style={{ paddingRight: 10 }} /> <Skeleton /></Button>

                          </Box>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Col>
              </Row>
            </Container>
          </section>
          : <>
            {!hiredorners.length
              ?
              <>
                <div style={{ margin: '0px auto', display: 'block' }}>
                  <Box className={All.Text_center} pt={5}>
                    <img src={nofoundresult} className={`${All.W_xs_100} ${All.W_sm_100}`} />
                    <Box className={`${All.Text_center}`} px={5} pb={2}>
                      <h2>No Results Found</h2>
                    </Box>
                    <Box className={`${All.Text_center}`} pb={5}>
                      <label>It seems we can’t find any results based on your search. </label>
                    </Box>
                  </Box>
                </div>
              </>
              :
              <>


                <section className={All.HireDornerJobList}>
                  <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_30}`}>
                    <Row>
                      <Col lg={12}>

                        <SearchResults
                          value={value}
                          data={hiredorners}
                          renderResults={results => (
                            <>
                              <div className="tiles" aria-live="polite">

                                {results.slice(0, this.state.visible).map(el => (
                                  <>
                                    <Divider />
                                    <Box className={All.JobsList}>
                                      <Box textAlign={'Left'} pt={3}>
                                        {this.state.loading ? <Skeleton circle={true} height={75} width={75} style={{ borderRadius: '100%' }} className={All.SkeletonImg} />
                                          : <>
                                              {el.profile 
                                                ?<img className="alignleft" src={el.profile}
                                                  alt="Image Sample 1" style={{
                                                    display: "inline",
                                                    float: "left",
                                                    width: "75px",
                                                    height: "75px",
                                                    borderRadius: "100px",
                                                    marginRight: '15px'
                                                  }} 
                                                />
                                                :<img className="alignleft" src={"https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png"}
                                                alt="Image Sample 1" style={{
                                                  display: "inline",
                                                  float: "left",
                                                  width: "75px",
                                                  height: "75px",
                                                  borderRadius: "100px",
                                                  marginRight: '15px'
                                                }} 
                                              />
                                              }
                                            </>
                                            }</Box>

                                      <Box pt={1}>

                                        {this.state.loading ? <Skeleton /> : <h2>{el.jobtitle}</h2>}
                                        {this.state.loading ? <Skeleton /> : <label className={All.Bold}>{el.companyname}</label>}
                                      </Box>

                                      <Box className={All.JobDescription} >
                                        {this.state.loading ? <Skeleton /> : <label className={`${All.lineheight_24} ${All.pt_xs_30} ${All.pt_sm} ${All.pt_md}`}>{el.jobdescription}</label>}

                                        <Box pb={6} pt={3}>
                                          <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                            <img style={{ paddingRight: 10 }} src={Location} />
                                            {el.joblocation || <Skeleton />}</Button>
                                          <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                            <img style={{ paddingRight: 10 }} src={work} />
                                            {el.typeofrole || <Skeleton />}</Button>
                                          {el.id ? <Link to={{ pathname: `ViewJob/${el.id}`, data: el, state: { foo: 'bar' } }} onClick={this.clickMe.bind(this, el)}>
                                            <Button ml={2} variant="contained" color="default" type="submit" id={el.id} className={`${All.BtnStyle_5} ${All.Bold}  ${All.W_xs_100}`}>
                                              View Job</Button>
                                          </Link> : <Skeleton />
                                          }
                                        </Box>
                                      </Box>
                                    </Box>
                                  </>
                                ))}

                              </div>
                              {this.state.visible < this.state.hiredorners.length &&
                                <Box py={6} textAlign={'center'}>
                                  <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                                    <img style={{ paddingRight: 10 }} src={DroneImg} />
                                    Load More</Button>
                                </Box>
                              }
                            </>
                          )} />

                      </Col>
                    </Row>
                  </Container>
                </section>
              </>
            }
          </>
        }
      </>
    )
  }
}
function HiringTitle() {
  return (
    <>

      <Helmet>
        <title>HiringDorners</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Nested component" />
      </Helmet>

      <section className={All.HiringDronersBanner}>
        <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
          <Row>
            <Col md={6}>
              <div className={All.HireBannerText} >
                <div className={All.Text}>
                  <h1>Droners Jobs</h1>
                  <h5 className={All.light}>Drone is the drones community and the best resource to discover and connect with droners and jobs providers.</h5>
                </div>
              </div>
              <div className={All.HireBannerImage}>
              </div>
            </Col>
            <Col md={6}>
              <img src={viewJobMobileImg} className={All.DisplayNone} />
            </Col>
          </Row>
        </Container>
      </section>

    </>
  )
}



export default function HiringDorners() {
  return (
    <>
      <HiringTitle />
      <Hiring />
    </>
  )
}
