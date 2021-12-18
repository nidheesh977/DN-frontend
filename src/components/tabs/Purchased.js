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
import axios from 'axios'
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import DroneImg from '../images/drone-img.svg'
import nofoundresult from '../images/noresultfound.svg'
import Skeleton from 'react-loading-skeleton';

const API_URL = 'http://localhost/auth-app/public/api/auth';

var videos = document.querySelectorAll(".thumbnail");
for (var i = 0; i < videos.length; i++) {
    videos[i].addEventListener('click', clickHandler, false);
}
function clickHandler(el) {
    var mainVideo = document.getElementById("mainVideo");
    mainVideo.src = el.srcElement.currentSrc;
}

function getBase64Image(canvas) {
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
}

function downloadURI(uri, name) {
    // IE10+ : (has Blob, but not a[download] or URL)
    if (navigator.msSaveBlob) {
        const blob = dataURItoBlob(uri);
        return navigator.msSaveBlob(blob, name);
    }
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function dataURItoBlob(dataurl) {
    const parts = dataurl.split(','), mime = parts[0].match(/:(.*?);/)[1];
    if (parts[0].indexOf('base64') !== -1) {
        const bstr = atob(parts[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], { type: mime })
    } else {
        const raw = decodeURIComponent(parts[1])
        return new Blob([raw], { type: mime })
    }
}

export default class Purchased extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            user: [],
            value: '',
            mystore: [],
            loading: true,
            visible: 10,
            error: false,
        };
        this.loadMore = this.loadMore.bind(this);
        this.download = this.download.bind(this);

    }

    loadMore() {
        this.setState((prev) => {
            return { visible: prev.visible + 8 };
        });
    }

    download(event) {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
        }

        axios.get(`http://localhost/auth-app/public/api/auth/download/${event}`, config)
            .then((response) => {
                var img = new Image;
                img.onload = function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    var base64Image = getBase64Image(canvas);
                    downloadURI(base64Image, 'image.png');
                };
                img.setAttribute('crossOrigin', 'anonymous');
                img.src = response.data.src;
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
                axios.get(`${API_URL}/mystore`, config).then(res => res.data)
                    .then((data) => {
                        this.setState({
                            mystore: data,
                            loading: false,
                        })
                    })
                    .catch(err => console.log(err))
            }))
            .catch(err => console.log(err))
    }

    render() {
        const { mystore, value } = this.state;
        const { user, Values } = this.state;
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
                {!mystore.length
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
                    <section className={All.Purchase}>
                        <div className={All.Purchasedlistdesktop}>
                            <Box textAlign={'Left'}>
                                <table>
                                    {this.state.mystore.slice(0, this.state.visible).map(like => (
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
                                                                            borderRadius: "100px",
                                                                            height: '150px',
                                                                            width: "100px",
                                                                            objectFit: "cover",
                                                                            marginRight: '15px'
                                                                        }} />
                                                                ) : like.tag === '3' ? (
                                                                    <video class="thumbnail" style={{
                                                                        display: "inline",
                                                                        float: "left",
                                                                        borderRadius: "100px",
                                                                        height: '150px',
                                                                        width: "150px",
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
                                                                                    borderRadius: "100px",
                                                                                    height: '150px',
                                                                                    width: "100px",
                                                                                    objectFit: "cover",
                                                                                    marginRight: '15px'
                                                                                }} />
                                                                        )}
                                                            </figure>
                                                            <div className={All.UsersListBody}>
                                                                <div>
                                                                    <h5 className={All.Bold}>{like.title}</h5>
                                                                    <p>{like.tag === '1' ? ('Images'
                                                                    ) : like.tag === '2' ? ('360 Images'
                                                                    ) : like.tag === '3' ? ('video'
                                                                    ) : like.tag === '4' ? ('3D Images'
                                                                    ) : ('')} </p>
                                                                    <p className={All.Bold}>Seller: <span className={All.light}>{like.author}</span></p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </td>
                                                    <td > <h5 className={All.light}>${like.price}</h5></td>
                                                    <td className={All.Text_right}>
                                                        <div class="wrapper">

                                                            <span className={`${All.FSize_16} ${All.FloatRight}`}>
                                                                <Button onClick={() => this.download(like.download_id)} className={All.BtnStyle_5}>Download</Button>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </>
                                    ))}
                                </table>
                            </Box>
                            {this.state.visible < this.state.mystore.length &&
                                <Box py={6} textAlign={'center'}>
                                    <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                                        <img style={{ paddingRight: 10 }} src={DroneImg} />
                   Load More</Button>
                                </Box>
                            }

                        </div>
                        <div className={All.Purchasedlistmobile}>
                            <Box >
                                {this.state.mystore.slice(0, this.state.visible).map((like) => (

                                    <li className={All.MyJobList}>
                                        <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
                                            {like.tag === '1' ? (
                                                <img className="alignleft" src={like.src}
                                                    alt="Image Sample 1" style={{
                                                        display: "inline",
                                                        float: "left",
                                                        borderRadius: "100px",
                                                        height: '100px',
                                                        width: "100px",
                                                        objectFit: "cover",
                                                        marginRight: '15px'
                                                    }} />
                                            ) : like.tag === '3' ? (
                                                <video className={`${All.thumbnailVideo} thumbnail`}
                                                    style={{
                                                        display: "inline",
                                                        float: "left",
                                                        borderRadius: "100px",
                                                        height: '100px',
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
                                                                borderRadius: "100px",
                                                                height: '100px',
                                                                width: "100px",
                                                                objectFit: "cover",
                                                                marginRight: '15px'
                                                            }} />
                                                    )}
                                        </figure>
                                        <div className={All.UsersListBody}>
                                            <div>
                                                <h5 className={All.Bold}>{like.title}</h5>
                                                <p>{like.tag === '1' ? ('Images'
                                                ) : like.tag === '2' ? ('360 Images'
                                                ) : like.tag === '3' ? ('video'
                                                ) : like.tag === '4' ? ('3D Images'
                                                ) : ('')} </p>
                                                <p className={All.Bold}>Seller: <span className={All.light}>{like.author}</span></p>
                                                <h5 className={All.light}>${like.price}</h5>
                                                <Box py={2} display="flex">

                                                    <span className={`${All.FSize_16} ${All.FloatRight}`}><Button onClick={this.download} className={All.BtnStyle_5}>Download</Button></span>
                                                </Box>
                                            </div>
                                        </div>
                                    </li>
                                ))}

                            </Box>
                            {this.state.visible < this.state.mystore.length &&
                                <Box py={6} textAlign={'center'}>
                                    <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}>
                                        <img style={{ paddingRight: 10 }} src={DroneImg} />
                   Load More</Button>
                                </Box>
                            }
                        </div>

                    </section>
                }
            </>
    }
}
