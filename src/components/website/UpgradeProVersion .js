import React from 'react'
import { Helmet } from "react-helmet";
import All from '../website/All.module.css'
import { Container, Row, Col } from 'react-grid-system';
import Box from '@material-ui/core/Box';
import Image from '../images/proversion/colour/image.svg'
import RotateImage from '../images/proversion/colour/RotateImage.svg'
import ThreeDImage from '../images/proversion/colour/ThreeDImage.svg'
import Video from '../images/proversion/colour/Video.svg' 
import ImageBlack from '../images/proversion/black/Image.svg'
import RotateImageBlack from '../images/proversion/black/RotateImage.svg'
import ThreeDImageBlack from '../images/proversion/black/ThreeDImage.svg'
import VideoBlack from '../images/proversion/black/Video.svg'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Header from '../header/Header'


export default function UpgradeProVersion() {
    return (
        <>
            <Helmet>
                <title>Upgrade to Pro Version</title>
                <meta charSet="utf-8" />
                <meta name="description" content="Nested component" />
            </Helmet>

<Header />
            <section className={All.UpgradeProVersion}>
                <Box p={4} textAlign={'center'}>
                        <h2>Upgrade Pro Version</h2>
                        <p className={All.FSize_16}>Choose your price plans</p>
                        <p className={All.FSize_16}>If you want Hire droners <Link to='/GoPremium'><span className={`${All.LightBlue} ${All.FSize_16}`}>Go Premium</span></Link></p>
                </Box> 
                <Container className={`${All.ContainerPackages} ${All.horizontalScrollable} ${All.max_sm_width}`}>
                    <Box >
                        <h2 className={All.Text_center}>Our Best Packages</h2>
                    </Box>
                    <Row className={`${All.Scrollablrow} ${All.White_space_break}`}> 
                        <Col lg={4} className={All.Scrollablecol}>
                            <div className={All.NormalUser}>
                                <Box pt={6} textAlign={'center'}>
                                <label className={` ${All.padding} ${All.Regular}`}>For Normal User</label>
                                    <h1 className={All.padding}><span className={All.Dollar}>$</span>0.0</h1>
                                    <label className={All.LightBrown}>Upload Limited File Size</label>
                                </Box>
                                <Box pb={2} textAlign={'left'} className={All.Features_div}>
                                <ul class='fa-ul'>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={Image}/><span className={All.FSize_13}>10 MB for Image</span></li>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={RotateImage}/><span className={All.FSize_13}>15 MB for 360° Image</span></li>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={ThreeDImage}/><span className={All.FSize_13}>25 MB for 3D Image</span></li>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={Video}/><span className={All.FSize_13}>50 MB for Video file</span></li>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={RotateImage}/><span className={All.FSize_13}>15 MB for 360° Image</span></li>
                                </ul>
                                </Box>
                                <Box pb={8} textAlign={'center'}>
                                <Button variant="contained" color="default"  className={All.BtnStyle_5}>You Are Here</Button>   
                                </Box> 
                            </div>
                        </Col>
                        <Col lg={4} className={All.Scrollablecol}>
                            <div className={All.ProUserMonth}>
                                <Box pt={6} textAlign={'center'}>
                                 <label className={` ${All.padding} ${All.Regular}`}>For Pro User</label>
                                    <h1 className={All.padding}><span className={All.Dollar}>$</span>50.0<span className={All.Month}>/Month</span></h1> 
                                    <label className={All.LightBrown}>Upload Limited File Size</label>
                                </Box>
                                <Box pb={2}  textAlign={'left'} className={All.Features_div}>
                                <ul class='fa-ul'>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={ImageBlack}/><span className={All.FSize_13}>More than 10 MB for Image</span></li>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={RotateImageBlack}/><span className={All.FSize_13}>More than 15 MB for 360° Image</span></li>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={ThreeDImageBlack}/><span className={All.FSize_13}>More than 25 MB for 3D Image</span></li>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={VideoBlack}/><span className={All.FSize_13}>More than 50 MB for Video file</span></li>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={RotateImageBlack}/><span className={All.FSize_13}>More than 15 MB for 360° Image</span></li>
                                </ul>
                                </Box>
                                <Box pb={8} textAlign={'center'}> 
                                    <Button variant="contained" color="default"  className={All.BtnStyle_6}>Purchase Now</Button>   
                                </Box> 
                            </div>
                        </Col>
                        <Col lg={4} className={All.Scrollablecol}>
                            <div className={All.ProUserYear}>
                                <Box pt={6} textAlign={'center'}>
                                    <label className={` ${All.padding} ${All.Regular}`}>For Pro User</label>
                                    <h1 className={All.padding}><span className={All.Dollar}>$</span>500.0<span className={All.Month}>/Year</span></h1>
                                    <label className={All.LightBrown}>Upload Limited File Size</label>
                                </Box>
                                <Box pb={2}  textAlign={'left'} className={All.Features_div}>
                                <ul class='fa-ul'>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={Image}/><span className={All.FSize_13}>10 MB for Image</span></li>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={RotateImage}/><span className={All.FSize_13}>15 MB for 360° Image</span></li>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={ThreeDImage}/><span className={All.FSize_13}>25 MB for 3D Image</span></li>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={Video}/><span className={All.FSize_13}>50 MB for Video file</span></li>
                                    <li className={All.dept}><img style={{paddingRight:10}} src={RotateImage}/><span className={All.FSize_13}>15 MB for 360° Image</span></li>
                                </ul>  
                                </Box>
                                <Box pb={8} textAlign={'center'}>
                                <Button variant="contained" color="default"  className={All.BtnStyle_5}>Purchase Now</Button>     
                                </Box> 
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
