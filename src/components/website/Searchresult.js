import React from 'react'
import axios from 'axios'
import { Helmet } from "react-helmet";
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import SearchResults from 'react-filter-search';
import '../filter/Filter.css'
import Button from '@material-ui/core/Button';
import DroneImg from '../images/drone-img.svg'
import Divider from '@material-ui/core/Divider';
import Skeleton from 'react-loading-skeleton';
import work from '../images/work.svg'
import Location from '../images/location.svg'
import nofoundresult from '../images/noresultfound.svg'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Like from '../Like';


const race = ['shots', 'members', 'company'];
const API_URL = 'https://nexevo-demo.in/nidheesh/dn/auth-app/public/api/auth';

export default class Searchresult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            value: '',
            search: [],
            title: [],
            cities: [],
            visible: 10,
            error: false,
            isOpen: false,
            haveText: ""
        };
        this.loadMore = this.loadMore.bind(this);
    }

    loadMore() {
        this.setState((prev) => {
            return { visible: prev.visible + 8 };
        });
    }


    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }



    componentDidMount() {
        const url = `${API_URL}/search?type=shots`;
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        }

        axios.get(url, config).then(res => res.data)
            .then((data) => {
                this.setState({ search: data })
                console.log(data)
            })
    }


    handleText = (ev) => {
        this.setState({
            haveText: ev.currentTarget.textContent
        })

        const url = `${API_URL}/search?type=${ev.currentTarget.textContent}`;
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        }

        axios.get(url, config).then(res => res.data)
            .then((data) => {
                console.log(data)
                this.setState({ search: data })
            })
    }

    itemList = props => {
        const list = props.map((item) => (
            <div
                onClick={this.handleText}
                className="dropdown__item"
                key={item.toString()}>
                {item}
            </div>
        ));
        return (
            <div className="dropdown__items"> {list} </div>
        )
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

    render() {
        const { search, value } = this.state;
        const { isOpen, haveText } = this.state;
        return (
            <>
                <Helmet>
                    <title>Serach</title>
                    <meta charSet="utf-8" />
                    <meta name="description" content="Nested component" />
                </Helmet>

                <section>
                    <Container className={All.Container}>
                        <Row>
                            <Col>
                                <Box className={All.FormGroup} py={4}>
                                    <form className={All.DisplayFlex} onSubmit={(event) => {
                                        event.preventDefault()
                                    }}>
                                        <div className={All.SearchBar}>
                                            <input className="dropdown searchbardropdown" placeholder="Search ..." type="text" value={value} onChange={this.handleChange} />
                                        </div>
                                        <div
                                            className={isOpen ? "dropdown searchbardropdown active" : "dropdown searchbardropdown"}
                                            onClick={this.handleClick} >
                                            <div className="dropdown__text">
                                                {!haveText ? "shots" : haveText}
                                            </div>
                                            {this.itemList(race)}
                                        </div>
                                    </form>
                                </Box>

                                <div className="GalleryTitle">
                                    <h2 className={All.paddingbottom}>Search Result</h2>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className={All.HireDornerJobList}>
                    <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_30}`}>
                        <Row>
                            <Col lg={12}>
                                <SearchResults
                                    value={value}
                                    data={search}
                                    renderResults={results => (
                                        <>

                                            {haveText === 'shots' ? (
                                                <>
                                                    <div>
                                                        <div class="Filters">
                                                            <ul>
                                                                <>
                                                                    {results.length > 0 ? results.slice(0, this.state.visible).map(user => (
                                                                        <li>
                                                                            {user.tag === '1' ? (
                                                                                <div>
                                                                                    <figure>
                                                                                        <Link to={{ pathname: `Imageview/${user.id}/${user.user_id}`, data: user, state: { foo: 'bar' } }} >
                                                                                            <div class="content-overlay"></div>
                                                                                            {user.src ? <img class="GalleryImg" src={user.src} />
                                                                                                : <Skeleton circle={true} height={280} width={280} className={All.SkeletonImg} />}
                                                                                        </Link>
                                                                                        <figcaption>
                                                                                            {user.author ? <span className="FSize_14 Profile_icon">{user.author} </span> : <Skeleton width={250} />}
                                                                                            <span className="LikeIcon  MuliLight">
                                                                                                <Like id={user.id} />{" "}
                                                                                            </span>
                                                                                        </figcaption>
                                                                                    </figure>
                                                                                </div>

                                                                            ) : user.tag === '2' ? (
                                                                                <div>
                                                                                    <figure>
                                                                                        <Link to={{ pathname: `Imageview/${user.id}/${user.user_id}`, data: user, state: { foo: 'bar' } }} >
                                                                                            <div class="content-overlay"></div>
                                                                                            {user.src ? <img class="GalleryImg" src={user.src} />
                                                                                                : <Skeleton circle={true} height={280} width={280} className={All.SkeletonImg} />}
                                                                                        </Link>
                                                                                        <figcaption>
                                                                                            {user.author ? <span className="FSize_14 Profile_icon">{user.author} </span> : <Skeleton width={250} />}
                                                                                            <span className="LikeIcon  MuliLight">
                                                                                                <Like id={user.id} />{" "}
                                                                                            </span>
                                                                                        </figcaption>
                                                                                    </figure>
                                                                                </div>

                                                                            ) : user.tag === '3' ? (
                                                                                <div>
                                                                                    <figure>
                                                                                        <Link to={{ pathname: `Imageview/${user.id}/${user.user_id}`, data: user, state: { foo: 'bar' } }} >
                                                                                            <div class="content-overlay-video" ></div>
                                                                                            <video className="GalleryImg" >
                                                                                                <source src={user.src} type="video/mp4" />
                                                                                                <source src={user.src} type="video/ogg" />
                                                                                            </video>
                                                                                        </Link>
                                                                                        <figcaption>
                                                                                            {user.author ? <span className="FSize_14 Profile_icon">{user.author} </span> : <Skeleton width={250} />}
                                                                                            <span className="LikeIcon  MuliLight">
                                                                                                <Like id={user.id} />{" "}
                                                                                            </span>
                                                                                        </figcaption>
                                                                                    </figure>
                                                                                </div>
                                                                            ) : user.tag === '4' ? (
                                                                                <div>
                                                                                    <figure>
                                                                                        <Link to={{ pathname: `Imageview/${user.id}/${user.user_id}`, data: user, state: { foo: 'bar' } }} >
                                                                                            <div class="content-overlay"></div>
                                                                                            {user.src ? <img class="GalleryImg" src={user.src} />
                                                                                                : <Skeleton circle={true} height={280} width={280} className={All.SkeletonImg} />}
                                                                                        </Link>
                                                                                        <figcaption>
                                                                                            {user.author ? <span className="FSize_14 Profile_icon">{user.author} </span> : <Skeleton width={250} />}
                                                                                            <span className="LikeIcon  MuliLight">
                                                                                                <Like id={user.id} />{" "}
                                                                                            </span>
                                                                                        </figcaption>
                                                                                    </figure>
                                                                                </div>

                                                                            ) : (
                                                                                <div>
                                                                                </div>
                                                                            )}

                                                                        </li>
                                                                    )) :
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
                                                                    }
                                                                </>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {this.state.visible < this.state.search.length &&
                                                        <Box py={6} textAlign={'center'}>
                                                            <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                                                                <img style={{ paddingRight: 10 }} src={DroneImg} />
                                                                Load More</Button>
                                                        </Box>

                                                    }
                                                </>
                                            ) : haveText === 'members' ? (
                                                <>
                                                    {results.length > 0 ? results.slice(0, this.state.visible).map(el => (
                                                        <>
                                                            <Box className={All.JobsList}>
                                                                <Box textAlign={'Left'} pt={3}>
                                                                    {el.profile ? <img className="alignleft" src={el.profile}
                                                                        alt="Image Sample 1" style={{
                                                                            display: "inline",
                                                                            float: "left",
                                                                            width: "75px",
                                                                            height: "75px",
                                                                            borderRadius: "100px",
                                                                            marginRight: '15px'
                                                                        }} /> : <Skeleton style={{ borderRadius: "100px !important" }} circle={true} height={75} width={75} className={All.SkeletonImg} />}
                                                                </Box>

                                                                <Box pt={1}>

                                                                    {el.companyname ? <h2>{el.companyname}</h2> : <Skeleton width={250} />}
                                                                    {el.jobtitle ? <label className={All.Bold}>{el.jobtitle}</label> : <Skeleton width={250} />}
                                                                </Box>

                                                                <Box className={All.JobDescription} >
                                                                    <label className={`${All.lineheight_24} ${All.pt_xs_30} ${All.pt_sm} ${All.pt_md}`}>{el.jobdescription || <Skeleton width={250} />}</label>

                                                                    <Box pb={6} pt={3}>
                                                                        <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                                                            <img style={{ paddingRight: 10 }} src={Location} />
                                                                            {el.joblocation || <Skeleton width={250} />}</Button>
                                                                        <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                                                            <img style={{ paddingRight: 10 }} src={work} />
                                                                            {el.typeofrole || <Skeleton width={250} />}</Button>
                                                                        {el.id ? <Link to={{ pathname: `ViewJob/${el.id}`, data: el, state: { foo: 'bar' } }}  >
                                                                            <Button ml={2} variant="contained" color="default" type="submit" id={el.id} className={`${All.BtnStyle_5} ${All.Bold}  ${All.W_xs_100}`}>
                                                                                View Job</Button>
                                                                        </Link> : <Skeleton width={250} />
                                                                        }
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                            <Divider />
                                                        </>
                                                    )) :
                                                        <Box className={All.Text_center} pt={5}>
                                                            <img src={nofoundresult} className={`${All.W_xs_100} ${All.W_sm_100}`} />
                                                            <Box className={`${All.Text_center}`} px={5} pb={2}>
                                                                <h2>No Results Found</h2>
                                                            </Box>
                                                            <Box className={`${All.Text_center}`} pb={5}>
                                                                <label>It seems we can't find any results based on your search. </label>
                                                            </Box>
                                                        </Box>
                                                    }

                                                    {this.state.visible < this.state.search.length &&
                                                        <Box py={6} textAlign={'center'}>
                                                            <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                                                                <img style={{ paddingRight: 10 }} src={DroneImg} />
                                                                Load More</Button>
                                                        </Box>

                                                    }

                                                </>
                                            ) : haveText === 'company' ? (
                                                <>
                                                    {results.length > 0 ? results.slice(0, this.state.visible).map(el => (
                                                        <>
                                                            <Box className={All.JobsList}>
                                                                <Box textAlign={'Left'} pt={3}>
                                                                    {el.profile ? <img className="alignleft" src={el.profile}
                                                                        alt="Image Sample 1" style={{
                                                                            display: "inline",
                                                                            float: "left",
                                                                            width: "75px",
                                                                            height: "75px",
                                                                            borderRadius: "100px",
                                                                            marginRight: '15px'
                                                                        }} /> : <img className="alignleft" src="https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png"
                                                                        alt="Image Sample 1" style={{
                                                                            display: "inline",
                                                                            float: "left",
                                                                            width: "75px",
                                                                            height: "75px",
                                                                            borderRadius: "100px",
                                                                            marginRight: '15px'
                                                                        }} /> 
                                                                        }
                                                                </Box>

                                                                <Box pt={1}>

                                                                    {el.name ? <h2>{el.name}</h2> : <Skeleton width={250} />}
                                                                    {el.profession ? <label className={All.Bold}>{el.profession}</label> : <Skeleton width={250} />}
                                                                </Box>

                                                                <Box className={All.JobDescription} >
                                                                    <label className={`${All.lineheight_24} ${All.pt_sm} ${All.pt_md}`}>{el.bio || <Skeleton width={250} />}</label>

                                                                    <Box pb={6} pt={3}>
                                                                        <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                                                            <img style={{ paddingRight: 10 }} src={Location} />
                                                                            {el.location || <Skeleton width={250} />}</Button>
                                                                        <Button ml={2} className={`${All.BtnStyle_4} ${All.disabled} ${All.W_xs_45}`} disabled>
                                                                            <img style={{ paddingRight: 10 }} src={Location} />
                                                                            {el.country || <Skeleton width={250} />}</Button>
                                                                        {el.id ? <Link to={{ pathname: `ViewJob/${el.id}`, data: el, state: { foo: 'bar' } }}  >
                                                                            <Button ml={2} variant="contained" color="default" type="submit" id={el.id} className={`${All.BtnStyle_5} ${All.Bold}  ${All.W_xs_100}`}>
                                                                                View Job</Button>
                                                                        </Link> : <Skeleton width={250} />
                                                                        }
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                            <Divider />
                                                        </>
                                                    )) :
                                                        <Box className={All.Text_center} pt={5}>
                                                            <img src={nofoundresult} className={`${All.W_xs_100} ${All.W_sm_100}`} />
                                                            <Box className={`${All.Text_center}`} px={5} pb={2}>
                                                                <h2>No Results Found</h2>
                                                            </Box>
                                                            <Box className={`${All.Text_center}`} pb={5}>
                                                                <label>It seems we can't find any results based on your search. </label>
                                                            </Box>
                                                        </Box>
                                                    }

                                                    {this.state.visible < this.state.search.length &&
                                                        <Box py={6} textAlign={'center'}>
                                                            <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                                                                <img style={{ paddingRight: 10 }} src={DroneImg} />
                                                                Load More</Button>
                                                        </Box>

                                                    }

                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <div class="Filters">
                                                            <ul>
                                                                <>
                                                                    {results.length > 0 ? results.slice(0, this.state.visible).map(user => (
                                                                        <li>
                                                                            {user.tag === '1' ? (
                                                                                <div>
                                                                                    <figure>
                                                                                        <Link to={{ pathname: `Imageview/${user.id}/${user.user_id}`, data: user, state: { foo: 'bar' } }} >
                                                                                            <div class="content-overlay"></div>
                                                                                            {user.src ? <img class="GalleryImg" src={user.src} />
                                                                                                : <Skeleton circle={true} height={280} width={280} className={All.SkeletonImg} />}
                                                                                        </Link>
                                                                                        <figcaption>
                                                                                            {user.author ? <span className="FSize_14 Profile_icon">{user.author} </span> : <Skeleton width={250} />}
                                                                                            <span className="LikeIcon  MuliLight">
                                                                                                <Like id={user.id} />{" "}
                                                                                            </span>
                                                                                        </figcaption>
                                                                                    </figure>
                                                                                </div>
                                                                            ) : user.tag === '2' ? (
                                                                                <div>
                                                                                    <figure>
                                                                                        <Link to={{ pathname: `Imageview/${user.id}/${user.user_id}`, data: user, state: { foo: 'bar' } }} >
                                                                                            <div class="content-overlay"></div>
                                                                                            {user.src ? <img class="GalleryImg" src={user.src} />
                                                                                                : <Skeleton circle={true} height={280} width={280} className={All.SkeletonImg} />}
                                                                                        </Link>
                                                                                        <figcaption>
                                                                                            {user.author ? <span className="FSize_14 Profile_icon">{user.author} </span> : <Skeleton width={250} />}
                                                                                            <span className="LikeIcon  MuliLight">
                                                                                                <Like id={user.id} />{" "}
                                                                                            </span>
                                                                                        </figcaption>
                                                                                    </figure>
                                                                                </div>

                                                                            ) : user.tag === '3' ? (
                                                                                <div>
                                                                                    <figure>
                                                                                        <Link to={{ pathname: `Imageview/${user.id}/${user.user_id}`, data: user, state: { foo: 'bar' } }} >
                                                                                            <div class="content-overlay-video" ></div>
                                                                                            <video className="GalleryImg" >
                                                                                                <source src={user.src} type="video/mp4" />
                                                                                                <source src={user.src} type="video/ogg" />
                                                                                            </video>
                                                                                        </Link>
                                                                                        <figcaption>
                                                                                            {user.author ? <span className="FSize_14 Profile_icon">{user.author} </span> : <Skeleton width={250} />}
                                                                                            <span className="LikeIcon  MuliLight">
                                                                                                <Like id={user.id} />{" "}
                                                                                            </span>
                                                                                        </figcaption>
                                                                                    </figure>
                                                                                </div>
                                                                            ) : user.tag === '4' ? (
                                                                                <div>
                                                                                    <figure>
                                                                                        <Link to={{ pathname: `Imageview/${user.id}/${user.user_id}`, data: user, state: { foo: 'bar' } }} >
                                                                                            <div class="content-overlay"></div>
                                                                                            {user.src ? <img class="GalleryImg" src={user.src} />
                                                                                                : <Skeleton circle={true} height={280} width={280} className={All.SkeletonImg} />}
                                                                                        </Link>
                                                                                        <figcaption>
                                                                                            {user.author ? <span className="FSize_14 Profile_icon">{user.author} </span> : <Skeleton width={250} />}
                                                                                            <span className="LikeIcon  MuliLight">
                                                                                                <Like id={user.id} />{" "}
                                                                                            </span>
                                                                                        </figcaption>
                                                                                    </figure>
                                                                                </div>

                                                                            ) : (
                                                                                <div>
                                                                                </div>
                                                                            )}

                                                                        </li>
                                                                    )) :
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
                                                                    }
                                                                </>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {this.state.visible < this.state.search.length &&
                                                        <Box py={6} textAlign={'center'}>
                                                            <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                                                                <img style={{ paddingRight: 10 }} src={DroneImg} />
                                                                Load More</Button>
                                                        </Box>

                                                    }
                                                </>
                                            )}

                                        </>
                                    )} />

                            </Col>
                        </Row>
                    </Container>
                </section>

            </>

        );
    }
}
