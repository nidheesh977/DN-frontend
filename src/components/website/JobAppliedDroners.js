import React from 'react';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Box from '@material-ui/core/Box';
import All from '../website/All.module.css'
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-grid-system';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import nofoundresult from '../images/noresultfound.svg'
import DroneImg from '../images/drone-img.svg'
import Skeleton from 'react-loading-skeleton';

const API_URL = 'https://nexevo-demo.in/nidheesh/dn/auth-app/public/api/auth';

export default class JobAppliedDroners extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applieddroners: [],
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

    getData() {
        setTimeout(() => {
            const id = this.props.match.params.id;
            const config = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            }
            const url = `${API_URL}/jobapplieddroners/${id}`;
            axios.get(url, config).then(res => res.data)
                .then((data) => {
                    this.setState({
                        applieddroners: data,
                        loading: false,
                    })
                })
        }, 3000)
    }

    componentDidMount() {
        this.getData();
    }


    render() {
        const { applieddroners, value } = this.state;
        const { loading, data } = this.state;

        return (
            <>
                <Helmet>
                    <title>Job Applied Droners</title>
                    <meta charSet="utf-8" />
                    <meta name="description" content="Nested component" />
                </Helmet>

                <section>
                    <Container className={All.Container}>
                        <Row>
                            <Col className={`${All.p_xs_0} ${All.p_md_0} ${All.p_sm_0}`}>
                                <Box className={`${All.padding_30} ${All.padding_30} ${All.padding_30} ${All.Text_center}`}>
                                    <h2>Job Applied List</h2>
                                </Box>
                                <Box pb={4} className={`${All.p_xs_0} ${All.p_md_0} ${All.p_sm_0}`}>
                                    <Divider />
                                </Box>

                                {loading === true
                                    ?
                                    <>
                                        <Box className={All.Myjobslistdesktop} textAlign={'Left'}>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td data-column="Company Profile">
                                                            <li className={All.MyJobList}>
                                                                <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                                                    <Skeleton circle={true} height={100} width={100} />
                                                                </figure>
                                                                <div className={All.UsersListBody}>
                                                                    <div>
                                                                        <Skeleton width={100} />
                                                                        <Skeleton width={100} />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </td>
                                                        <td data-column="Job Title"> <li className={All.MyJobList}><Skeleton width={100} /></li></td>
                                                        <td data-column="Post on"><li className={All.MyJobList}><Skeleton width={80} /></li></td>
                                                        <td data-column="Action">
                                                            <li className={`${All.MyJobList} ${All.JobsList}`}>
                                                                <Button mr={2} disabled variant="contained" color="default" type="submit" className={All.BtnStyle_4}>
                                                                </Button>
                                                                <Button mr={2} disabled variant="contained" color="default" className={All.BtnStyle_4}>
                                                                </Button>
                                                            </li>
                                                        </td>
                                                    </tr>
                                                    <Divider />
                                                    <tr>
                                                        <td data-column="Company Profile">
                                                            <li className={All.MyJobList}>
                                                                <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                                                    <Skeleton circle={true} height={100} width={100} />
                                                                </figure>
                                                                <div className={All.UsersListBody}>
                                                                    <div>
                                                                        <Skeleton width={100} />
                                                                        <Skeleton width={100} />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </td>
                                                        <td data-column="Job Title"> <li className={All.MyJobList}><Skeleton width={100} /></li></td>
                                                        <td data-column="Post on"><li className={All.MyJobList}><Skeleton width={80} /></li></td>
                                                        <td data-column="Action">
                                                            <li className={`${All.MyJobList} ${All.JobsList}`}>
                                                                <Button mr={2} disabled variant="contained" color="default" type="submit" className={All.BtnStyle_4}>
                                                                </Button>
                                                                <Button mr={2} disabled variant="contained" color="default" className={All.BtnStyle_4}>
                                                                </Button>
                                                            </li>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Box>
                                        <Box className={All.Myjobslistmobile}>
                                            <>
                                                <Box >
                                                    <li className={All.MyJobList}>
                                                        <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                                            <Skeleton circle={true} height={100} width={100} />
                                                        </figure>
                                                        <div className={All.UsersListBody}>
                                                            <div>
                                                                <Skeleton width={100} />
                                                                <Skeleton width={100} />
                                                                <Skeleton width={100} />
                                                                <Skeleton width={100} />
                                                                <Box py={2} display="flex">
                                                                    <Button mr={2} variant="contained" color="default" type="submit" className={All.BtnStyle_4}>
                                                                    </Button>
                                                                    <Button mr={2} variant="contained" color="default" className={`${All.BtnStyle_4} ${All.marginleft_20}`}>
                                                                    </Button>
                                                                </Box>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className={All.MyJobList}>
                                                        <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                                            <Skeleton circle={true} height={100} width={100} />
                                                        </figure>
                                                        <div className={All.UsersListBody}>
                                                            <div>
                                                                <Skeleton width={100} />
                                                                <Skeleton width={100} />
                                                                <Skeleton width={100} />
                                                                <Skeleton width={100} />
                                                                <Box py={2} display="flex">
                                                                    <Button mr={2} variant="contained" color="default" type="submit" className={All.BtnStyle_4}>
                                                                    </Button>
                                                                    <Button mr={2} variant="contained" color="default" className={`${All.BtnStyle_4} ${All.marginleft_20}`}>
                                                                    </Button>
                                                                </Box>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </Box>
                                            </>
                                        </Box>
                                    </>

                                    : <><div>
                                        {!applieddroners.length
                                            ?
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
                                            :
                                            <>
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
                                                        {this.state.applieddroners.slice(0, this.state.visible).map(user => (
                                                            <>
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
                                                                                        <h5 className={All.Bold}>{user.name}</h5>
                                                                                        <label>{user.username}</label>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </td>
                                                                        <td data-column="Job Title"> <li className={All.MyJobList}><label>{user.jobtitle}</label></li></td>
                                                                        <td data-column="Post on"><li className={All.MyJobList}><label>{user.applied}</label></li></td>
                                                                        <td data-column="Action">
                                                                            <li className={`${All.MyJobList} ${All.JobsList}`}>
                                                                                <Link to={`/ProfileSingle/${user.user_id}`}>
                                                                                    <Button mr={2} variant="contained" color="default" type="submit" className={All.BtnStyle_5}>
                                                                                        View Profile</Button>
                                                                                </Link>
                                                                            </li>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </>
                                                        ))}
                                                    </table>
                                                    {this.state.visible < this.state.applieddroners.length &&
                                                        <Box py={6} textAlign={'center'}>
                                                            <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                                                                <img style={{ paddingRight: 10 }} src={DroneImg} />
                                                                Load More</Button>
                                                        </Box>
                                                    }
                                                </Box>

                                                <Box className={All.Myjobslistmobile}>
                                                    {this.state.applieddroners.slice(0, this.state.visible).map((item, index) => {

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
                                                                                <label className={`${All.Bold} ${All.padding_5}`}>{item.name}</label>
                                                                                <span className={` ${All.padding_5}`}>{item.username}</span>
                                                                                <label className={`${All.Bold} ${All.padding_5}`}>Job Title : <sapn className={All.MuliLight}>{item.jobtitle}</sapn></label>
                                                                                <label className={`${All.Bold} ${All.padding_5}`}>Applied on : <sapn className={All.MuliLight}> {item.applied}</sapn></label>
                                                                                <Box py={2} display="flex">
                                                                                    <Link to={`/ProfileSingle/${item.user_id}`}>
                                                                                        <Button mr={2} variant="contained" color="default" type="submit" className={All.BtnStyle_5}>
                                                                                            View Profile</Button>
                                                                                    </Link>
                                                                                </Box>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </Box>
                                                            </>
                                                        )
                                                    })}
                                                    {this.state.visible < this.state.applieddroners.length &&
                                                        <Box py={6} textAlign={'center'}>
                                                            <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                                                                <img style={{ paddingRight: 10 }} src={DroneImg} />
                                                                Load More</Button>
                                                        </Box>
                                                    }
                                                </Box>
                                            </>
                                        }
                                    </div>
                                    </>
                                }


                            </Col>
                        </Row>
                    </Container>
                </section>
            </>
        );
    }
}

