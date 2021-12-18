import React from 'react'
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import utv from '../images/utv.png'
import SearchResults from 'react-filter-search';
import DropdownFilter from '../filter/DropdownFilter'
import { Link } from 'react-router-dom';
import DroneImg from '../images/drone-img.svg'
const API_URL = 'https://nexevo-demo.in/nidheesh/dn/auth-app/public/api/auth';

class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myjobs: [],
      value: '',
      visible: 10,
      error: false,
      items: [],
      hiredorners: [],
      title: [],
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

  componentDidMount() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }
    const url = `${API_URL}/hiredorners`;
    axios.get(url, config).then(res => res.data)
      .then((data) => {
        this.setState({ hiredorners: data })
      })
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };



  render() {
    // const { myjobs, value } = this.state;  
    const { hiredorners, value } = this.state;

    return (
      <>
        <section>
          <Container className={All.Container}>
            <Row>
              <Col>
                <Box className={All.FormGroup} py={4}>
                  <form className={All.DisplayFlex} method="GET">
                    <div className={All.SearchBar}>
                      <input className="dropdown searchbardropdown" placeholder="Search ..." type="text" value={value} onChange={this.handleChange} />
                    </div>
                    <DropdownFilter />
                  </form>
                </Box>
              </Col>
            </Row>
          </Container>
        </section>


        <section className="Myjobs">
          <Container className={All.Container}>
            <Row>
              <Col>
                <SearchResults
                  value={value}
                  data={hiredorners}
                  renderResults={results => (
                    <div>
                      <>
                        <Box className={All.Myjobslistdesktop} textAlign={'Left'}>
                          <table>
                            <thead>
                              <tr className={All.Bold}>
                                <th><h5 className={`${All.paddingbottom} ${All.paddingtop_30}`}>Company Profile</h5></th>
                                <th><h5 className={`${All.paddingbottom} ${All.paddingtop_30}`}>Job Title</h5></th>
                                <th><h5 className={`${All.paddingbottom} ${All.paddingtop_30}`}>Post on</h5></th>
                                <th><h5 className={`${All.paddingbottom} ${All.paddingtop_30}`}>Action</h5></th>
                              </tr>
                            </thead>
                            {results.slice(0, this.state.visible).map(user => (

                              <tbody>
                                <tr>
                                  <td data-column="Company Profile">
                                    <li className={All.MyJobList}>
                                      <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                        <img className={`${All.height_auto_xs} ${All.height_auto_sm} alignleft`} src={user.profile}
                                          alt="Image Sample 1" style={{
                                            display: "inline",
                                            float: "left",
                                            width: "100px",
                                            marginRight: '15px',
                                            height: '100px',
                                            borderRadius: '100px'
                                          }} />
                                      </figure>
                                      <div className={All.UsersListBody}>
                                        <div>
                                          <h5 className={All.Bold}>{user.companyname}</h5>
                                          <label>{user.username}</label>
                                        </div>
                                      </div>
                                    </li>
                                  </td>
                                  <td data-column="Job Title"> <li className={All.MyJobList}><label>{user.jobtitle}</label></li></td>
                                  <td data-column="Post on"><li className={All.MyJobList}><label>{user.hired}</label></li></td>
                                  <td data-column="Action">
                                    <li className={`${All.MyJobList} ${All.JobsList}`}>
                                      <Link to={`/ProfileSingle/${user.user_id}`}>
                                        <Button mr={2} variant="contained" color="default" type="submit" className={All.BtnStyle_5}>
                                          View Profile</Button>
                                      </Link>
                                      <Button mr={2} variant="contained" color="default" onClick={(e) => this.deleteRow(user.id, e)} className={All.BtnStyle_4}>
                                        Delete</Button>
                                    </li>
                                  </td>
                                </tr>
                              </tbody>

                            ))}
                          </table>

                        </Box>

                        <Box className={All.Myjobslistmobile}>
                          {this.state.hiredorners.slice(0, this.state.visible).map((item, index) => {
                            return (
                              <>
                                <Box >
                                  <li className={All.MyJobList}>
                                    <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                      <img className="alignleft" src={utv}
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
                                        <label className={`${All.Bold} ${All.padding_5}`}>{item.jobtitle}</label>
                                        <label className={`${All.Bold} ${All.padding_5}`}>{item.companyprofilejobtitle}</label>
                                        <span className={` ${All.padding_5}`}>{item.companyusername}</span>
                                      </div>
                                    </div>
                                    <label className={`${All.Bold} `}>{item.poston}</label>
                                  </li>
                                </Box>
                              </>
                            )
                          })}

                        </Box>



                        {this.state.visible < this.state.hiredorners.length &&
                          <Box py={6} textAlign={'center'}>
                            <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={All.BtnStyle_5}>
                              <img style={{ paddingRight: 10 }} src={DroneImg} />
                              Load More</Button>
                          </Box>
                        }
                      </>
                    </div>
                  )} />
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default Member