// import React, { useEffect } from 'react'
// import { Helmet } from "react-helmet";
// import All from '../website/All.module.css'
// import { Container, Row, Col } from 'react-grid-system';
// import Box from '@material-ui/core/Box';
// import Image from '../images/proversion/colour/image.svg'
// import RotateImage from '../images/proversion/colour/RotateImage.svg'
// import ThreeDImage from '../images/proversion/colour/ThreeDImage.svg'
// import Video from '../images/proversion/colour/Video.svg'
// import ImageBlack from '../images/proversion/black/Image.svg'
// import RotateImageBlack from '../images/proversion/black/RotateImage.svg'
// import ThreeDImageBlack from '../images/proversion/black/ThreeDImage.svg'
// import VideoBlack from '../images/proversion/black/Video.svg'
// import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
// import axios from 'axios'
// import { useState } from 'react';


// export default function UpgradeProVersion() {

//     const [role_id, setRoleId] = useState()
//     useEffect(() => {
//         const config = {
//             headers: {
//                 Authorization: 'Bearer ' + localStorage.getItem('access_token')
//             }
//         }

//         axios.get('https://demo-nexevo.in/haj/auth-app/public/api/auth/user', config)
//         .then(res => {
//             setRoleId(res.data.role_id)
//         })

//     })
//     return (
//         <>
//             <Helmet>
//                 <title>Upgrade to Pro Version</title>
//                 <meta charSet="utf-8" />
//                 <meta name="description" content="Nested component" />
//             </Helmet>

//             <section className={All.UpgradeProVersion}>
//                 <Box p={4} textAlign={'center'}>
//                     <h2>Upgrade Pro Version</h2>
//                     <p className={All.FSize_16}>Choose your price plans</p>
//                     {role_id == "2"
//                         ?<p className={All.FSize_16}>If you want Hire droners <Link to='/GoPremium'><span className={`${All.LightBlue} ${All.FSize_16}`}>Go Premium</span></Link></p>
//                         :""
//                     }
//                 </Box>
//                 <Container className={`${All.ContainerPackages} ${All.horizontalScrollable} ${All.max_sm_width}`}>
//                     <Box >
//                         <h2 className={All.Text_center}>Our Best Packages</h2>
//                     </Box>
//                     <Row className={`${All.Scrollablrow} ${All.White_space_break}`}>
//                         <Col lg={4} className={All.Scrollablecol}>
//                             <div className={All.NormalUser}>
//                                 <Box pt={6} textAlign={'center'}>
//                                     <label className={` ${All.padding} ${All.Regular}`}>For Normal User</label>
//                                     <h1 className={All.padding}><span className={All.Dollar}>$</span>0.0</h1>
//                                     <label className={All.LightBrown}>Upload Limited File Size</label>
//                                 </Box>
//                                 <Box pb={2} textAlign={'left'} className={All.Features_div}>
//                                     <ul class='fa-ul'>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={Image} /><span className={All.FSize_13}>10 MB for Image</span></li>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={RotateImage} /><span className={All.FSize_13}>15 MB for 360° Image</span></li>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={ThreeDImage} /><span className={All.FSize_13}>25 MB for 3D Image</span></li>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={Video} /><span className={All.FSize_13}>50 MB for Video file</span></li>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={RotateImage} /><span className={All.FSize_13}>15 MB for 360° Image</span></li>
//                                     </ul>
//                                 </Box>
//                                 <Box pb={8} textAlign={'center'}>
//                                     <Button variant="contained" color="default" className={All.BtnStyle_5}>You Are Here</Button>
//                                 </Box>
//                             </div>
//                         </Col>
//                         <Col lg={4} className={All.Scrollablecol}>
//                             <div className={All.ProUserMonth}>
//                                 <Box pt={6} textAlign={'center'}>
//                                     <label className={` ${All.padding} ${All.Regular}`}>For Pro User</label>
//                                     <h1 className={All.padding}><span className={All.Dollar}>$</span>50.0<span className={All.Month}>/Month</span></h1>
//                                     <label className={All.LightBrown}>Upload Limited File Size</label>
//                                 </Box>
//                                 <Box pb={2} textAlign={'left'} className={All.Features_div}>
//                                     <ul class='fa-ul'>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={ImageBlack} /><span className={All.FSize_13}>More than 10 MB for Image</span></li>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={RotateImageBlack} /><span className={All.FSize_13}>More than 15 MB for 360° Image</span></li>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={ThreeDImageBlack} /><span className={All.FSize_13}>More than 25 MB for 3D Image</span></li>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={VideoBlack} /><span className={All.FSize_13}>More than 50 MB for Video file</span></li>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={RotateImageBlack} /><span className={All.FSize_13}>More than 15 MB for 360° Image</span></li>
//                                     </ul>
//                                 </Box>
//                                 <Box pb={8} textAlign={'center'}>
//                                     <Button variant="contained" color="default" className={All.BtnStyle_6}>Purchase Now</Button>
//                                 </Box>
//                             </div>
//                         </Col>
//                         <Col lg={4} className={All.Scrollablecol}>
//                             <div className={All.ProUserYear}>
//                                 <Box pt={6} textAlign={'center'}>
//                                     <label className={` ${All.padding} ${All.Regular}`}>For Pro User</label>
//                                     <h1 className={All.padding}><span className={All.Dollar}>$</span>500.0<span className={All.Month}>/Year</span></h1>
//                                     <label className={All.LightBrown}>Upload Limited File Size</label>
//                                 </Box>
//                                 <Box pb={2} textAlign={'left'} className={All.Features_div}>
//                                     <ul class='fa-ul'>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={Image} /><span className={All.FSize_13}>10 MB for Image</span></li>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={RotateImage} /><span className={All.FSize_13}>15 MB for 360° Image</span></li>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={ThreeDImage} /><span className={All.FSize_13}>25 MB for 3D Image</span></li>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={Video} /><span className={All.FSize_13}>50 MB for Video file</span></li>
//                                         <li className={All.dept}><img style={{ paddingRight: 10 }} src={RotateImage} /><span className={All.FSize_13}>15 MB for 360° Image</span></li>
//                                     </ul>
//                                 </Box>
//                                 <Box pb={8} textAlign={'center'}>
//                                     <Button variant="contained" color="default" className={All.BtnStyle_5}>Purchase Now</Button>
//                                 </Box>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </section>
//         </>
//     )
// }


import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import '../css/DownloadSubscription.css'
import All from './All.module.css'
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Close from "../images/close.svg";
import { withStyles } from "@material-ui/core/styles";
import payment_success from '../images/payment_success.png';
import { Helmet } from "react-helmet";

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

class DownloadSubscription extends Component {
    constructor(props) {
        super(props)
        this.state = {
            payment_success: false,
        }
    }

    loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    // async subscribe(amount, id) {
    //     const res = await this.loadScript(
    //         "https://checkout.razorpay.com/v1/checkout.js"
    //     );

    //     if (!res) {
    //         alert("Razorpay SDK failed to load. Are you online?");
    //         return;
    //     }

    //     const options = {
    //         key: "rzp_test_tzURXA4gSDw99d", // Enter the Key ID generated from the Dashboard
    //         amount: amount * 100,
    //         currency: "USD",
    //         name: "User name",
    //         description: "Test Transaction",
    //         // image: { logo }, 
    //         id: id,
    //         prefill: {
    //             name: "User name",
    //             email: "email@gmail.com",
    //             contact: "9876543210",
    //         },
    //         notes: {
    //             address: "Bangalore, Karnataka",
    //         },
    //         theme: {
    //             color: "#61dafb",
    //         },
    //     };

    //     const paymentObject = new window.Razorpay(options);
    //     paymentObject.open();

    // }

    subscribe = (amount, id) => {
        this.setState({
            payment_success: true
        })
    }

    closePaymentPopup = () => {
        this.setState({
            payment_success: false
        })
    }

    render() {
        return (
            <section>
                <Helmet>
                    <title>Download Subscription</title>
                    <meta charSet="utf-8" />
                    <meta name="description" content="Nested component" />
                </Helmet>
                <Container className={All.Container + " u_p_v_container"}>
                    <div className="u_p_v_heading">Simple plans for everyone</div>
                    <Row gutterWidth={34}>
                        <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                            <div className="u_p_v_plan_container u_p_v_plan_selected">
                                <div className="u_p_v_title">Single Image</div>
                                <div className="u_p_v_price">$5.00</div>
                                <button className="u_p_v_button1" onClick={() => this.subscribe(5, 1)}>Subscribe Now</button>
                                <div className="u_p_v_plan_features">
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                            <div className="u_p_v_plan_container">
                                <div className="u_p_v_title">Five Images</div>
                                <div className="u_p_v_price">$20.00</div>
                                <button className="u_p_v_button2" onClick={() => this.subscribe(20, 2)}>Subscribe Now</button>
                                <div className="u_p_v_plan_features">
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                            <div className="u_p_v_plan_container">
                                <div className="u_p_v_title">Ten Images</div>
                                <div className="u_p_v_price">$30.00</div>
                                <button className="u_p_v_button2" onClick={() => this.subscribe(30, 3)}>Subscribe Now</button>
                                <div className="u_p_v_plan_features">
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                    <div className="u_p_v_plan_feature">
                                        <i class="fa fa-check" aria-hidden="true"></i> This plan for free to every users
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Dialog
                    open={this.state.payment_success}
                    onClose={this.closePaymentPopup}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth={"md"}
                    fullWidth={true}
                >

                    <DialogContent className={All.PopupBody} style={{ marginBottom: "50px" }}>
                        <div style={{ position: "absolute", top: '20px', right: '20px' }}>
                            <img src={Close} alt="" onClick={this.closePaymentPopup} style={{ cursor: "pointer" }} />
                        </div>
                        <Row style={{ marginTop: "30px" }}>
                            <img src={payment_success} alt="" style={{ margin: "auto" }} />
                            <div className="u_p_v_popup_title">Thank you</div>
                            <div className="u_p_v_popup_content">We have recieved your payment</div>
                            <button className="u_p_v_popup_close_btn" onClick={this.closePaymentPopup}>Close</button>
                        </Row>
                    </DialogContent>
                </Dialog>
            </section>
        )
    }
}

export default DownloadSubscription