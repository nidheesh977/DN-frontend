import React from 'react'
import {Helmet} from "react-helmet";
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'  

import Box from '@material-ui/core/Box';

import OfficeEditProfileTab from '../tabs/OfficeEditProfileTab.js' 
import Button from '@material-ui/core/Button'; 

import Facebook from '../images/socialicons/facebook.svg'
import Instagram from '../images/socialicons/instagram.svg'
import linkedin from '../images/socialicons/linkedin.svg'
import Pinterest from '../images/socialicons/pinterest.svg'
import Twitter from '../images/socialicons/twitter.svg'
import Youtube from '../images/socialicons/youtube.svg'
import ProfileImg from '../ProfileImg/Profile'
import CoverImg from '../ProfileCoverImg/ProfileCoverImg'
import { useState, useEffect } from 'react';
import Header from '../header/Header'
import { userService } from '../_services/user.service';

// $(function() {
//     $('.tabs-nav a').click(function() { 
//       // Check for active
//       $('.tabs-nav li').removeClass('active');
//       $(this).parent().addClass('active');
  
//       // Display active tab
//       let currentTab = $(this).attr('href');
//       $('.tabs-content div.TabsContent').hide();
//       $(currentTab).show();
  
//       return false;
//     });
//   });


export default function OfficeProfileEdit() { 
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [social, setSocial] = useState([]);
    const[Subscriptioncheck, setSubscriptioncheck] = useState([]);
    
  
    useEffect(() => { 
        userService.User().then(res => {
            setUser(res.data);
            // console.log(res);
          },
            err => {
              console.log(err);
            }
          )

          userService.Subscriptioncheck().then(res => {
            setSubscriptioncheck(res.data); 
            // console.log(res);
          },
            err => {
              console.log(err);
            }
          ) 


          userService.Profile().then(res => {
            setProfile(res.data);
            // console.log(res);
          },
            err => {
              console.log(err);
            }
          )
          userService.Social().then(res => {
            setSocial(res.data);
            // console.log(res);
          },
            err => {
              console.log(err);
            }
          )
    
      }, []);
    
    return (
        <>
             <Helmet> 
                <title>Profile Edit</title> 
                <meta charSet="utf-8" />
                <meta name="description" content="Nested component" />
            </Helmet>

<Header />
            <section className={All.Profile}>
            <Container className={All.Container}>
                    <Row>
                    <Col md={6} className={`${All.Order_xs_2} ${All.Order_sm_2} ${All.pr_xs_30} ${All.pl_xs_30}`}>

                        <Box py={1} display="flex">
                            <Box pr={5}><ProfileImg /> </Box> 
                          </Box>
 
                            <Box py={1} className={`${All.pt_xs_50} ${All.pt_xs_50} ${All.pt_sm_50}`}>
                                <h2>{user.company_name}</h2> 
                            </Box>
                            <Box py={1}> 
                                <h1>{user.profession}</h1> 
                             </Box>
                             <Box py={1}>  
                                <h4>From {user.location} {user.country}</h4>
                             </Box> 
 
                             <Box py={4}>
                                <span className={All.SocialIcon}> 
                                <a href={social.facebook} target="_blank" ><img  src={Facebook} className={`${All.pr_xs} ${All.pr_sm} ${All.pr_md}`}/></a>
                                <a href={social.instagram} target="_blank"><img src={Instagram} className={`${All.pr_xs} ${All.pr_sm} ${All.pr_md}`}/> </a>
                                <a href={social.linkedin}  target="_blank"><img src={linkedin}  className={`${All.pr_xs} ${All.pr_sm} ${All.pr_md}`}/> </a>
                                <a href={social.pinterest} target="_blank"><img src={Pinterest} className={`${All.pr_xs} ${All.pr_sm} ${All.pr_md}`}/> </a>
                                <a href={social.twitter}   target="_blank"><img src={Twitter}  className={`${All.pr_xs} ${All.pr_sm} ${All.pr_md}`}/> </a>
                                <a href={social.youtube}   target="_blank"><img src={Youtube}  className={`${All.pr_xs} ${All.pr_sm} ${All.pr_md}`}/> </a> 
                              </span>
                             </Box>

                             <Box >
                              <Button ml={2}  variant="contained" color="default" className={All.BtnStyle_11}> 
                                        Post a Job - as $200/month</Button><span className={`${All.Gray} ${All.FSize_13} ${All.paddingleft} ${All.pt_sm} ${All.pt_xs} ${All.pt_md} ${All.D_Block_xs} ${All.D_Block_sm} ${All.D_Block_md} ${All.D_Block_lg}`}>{Subscriptioncheck.message}</span>
                              </Box> 

                        </Col>
                        <Col md={6} className={`${All.Order_xs_1} ${All.Order_sm_1}  ${All.coverImg} ${All.pr_xs_30} ${All.pl_xs_30}`}>
                          <CoverImg />
                        </Col>
                    </Row>
                </Container>
            </section>


            <section>
                <Container>
                    <Row>
                        <Col> 
                            <OfficeEditProfileTab />
                        </Col>
                    </Row>
                </Container>
            </section>
 

        </>
    )
}
