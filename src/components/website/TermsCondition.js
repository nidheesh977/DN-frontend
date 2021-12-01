import React from 'react' 
import {Helmet} from "react-helmet";
import { Container, Row, Col } from 'react-grid-system';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { AllInbox } from '@material-ui/icons';
import All from '../website/All.module.css'
import Header from '../header/Header'

export default function TermsCondition() {
    return (
        <>
             <Helmet> 
                <title>TermsCondition</title> 
                <meta charSet="utf-8" />
                <meta name="description" content="Nested component" />
            </Helmet>
<Header />  
            <section className={All.TermsCondition}> 
            <Box textAlign={'Center'}>  
               <h2>Terms & Conditions</h2>
               </Box>
                <Container className={All.Container}>
                    <Row>
                        <Col>
                                <Box pt={5}>
                                    <Box>
                                    <h5 className={All.Bold}>Lorem Ipsum is simply dummy text</h5>
                                    </Box>
                                    <Box>
                                        <label className={`${All.paddingtop} ${All.Normal}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</label>
                                    </Box>
                                </Box>


                                <Box pt={5}>
                                    <Box>
                                    <h5 className={All.Bold}>Lorem Ipsum is simply dummy text</h5>
                                    </Box>
                                    <Box>
                                        <label className={`${All.paddingtop} ${All.Normal}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</label>
                                    </Box>
                                </Box>


                                <Box pt={5}>
                                    <Box>
                                    <h5 className={All.Bold}>Lorem Ipsum is simply dummy text</h5>
                                    </Box>
                                    <Box>
                                        <label className={`${All.paddingtop} ${All.Normal}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</label>
                                    </Box>
                                </Box>


                                <Box pt={5}>
                                    <Box>
                                    <h5 className={All.Bold}>Lorem Ipsum is simply dummy text</h5>
                                    </Box>
                                    <Box>
                                        <label className={`${All.paddingtop} ${All.Normal}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</label>
                                    </Box>
                                </Box>


                                <Box pt={5}>
                                    <Box>
                                    <h5 className={All.Bold}>Lorem Ipsum is simply dummy text</h5>
                                    </Box>
                                    <Box>
                                        <label className={`${All.paddingtop} ${All.Normal}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</label>
                                    </Box>
                                </Box>

                                <Box pt={10} pb={3} textAlign={'Center'} className={All.JobsList}> 
                                        <Button variant="contained" color="default" type="submit" className={All.BtnStyle_5}>
                                        {/* <img style={{paddingRight:10}} src={DroneImg} />  */}
                                        Decline</Button>  

                                        <Button variant="contained" color="default" type="submit" className={All.BtnStyle_5}>
                                        {/* <img style={{paddingRight:10}} src={DroneImg} />  */}
                                        Accept the Terms</Button>  
                                </Box>
                                
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
