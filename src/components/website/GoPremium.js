import React from 'react'
import { Helmet } from "react-helmet";
import All from '../website/All.module.css'
import { Container, Row, Col } from 'react-grid-system';
import Box from '@material-ui/core/Box'; 
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios'

export default function GoPremium() {  
    const[Id0, setId0] = useState([0]);
    const[Id1, setId1] = useState([1]);
    const[Id2, setId2] = useState([2]); 
    const[Amount1, setAmount0] = useState([10]);
    const[Amount2, setAmount1] = useState([50]);
    const[Amount3, setAmount2] = useState([500]);
    const[Day0, setDay0] = useState([]);
    const[Day1, setDay1] = useState([]);
    const[Day2, setDay2] = useState([]);
    const[Plan0, setPlan0] = useState([]);
    const[Plan1, setPlan1] = useState([]);
    const[Plan2, setPlan2] = useState([]);

  const [user, Setuser] = useState([]);   

    useEffect(() => {
  
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        } 

        axios.get('https://demo-nexevo.in/haj/auth-app/public/api/auth/user', config)
        .then(res => {
          Setuser(res.data);  
        },
          err => {
            console.log(err); 
          }
        ) 

        axios.get('https://demo-nexevo.in/haj/auth-app/public/api/auth/plans', config)
          .then(res => { 
              try{
                setId0(res.data[0].id);
                setId1(res.data[1].id);
                setId2(res.data[2].id);
                setAmount0(res.data[0].amount);
                setAmount1(res.data[1].amount);
                setAmount2(res.data[2].amount);
                setDay0(res.data[0].days);
                setDay1(res.data[1].days);
                setDay2(res.data[2].days);
                setPlan0(res.data[0].plan);
                setPlan1(res.data[1].plan);
                setPlan2(res.data[2].plan);
              }catch{
                  console.log(res)
              }
          },
            err => {
              console.log(err);
            }
          )  
    
      }, []);

      function loadScript(src) {
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
   
        async function id(e, data) {
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );
    
            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }
    
            const result = await axios.post(`https://demo-nexevo.in/haj/auth-app/public/api/auth/beforepayment/${data}`,{
                user_id :  user.id,
            });
    
            if (!result) {
                alert("Server error. Are you online?");
                return;
            }
    
            const { amount, id: order_id, currency } = result.data;
    
            // alert(result.data.order_id);
            // alert(result.data.order_id);
            
            const options = {
                key: "rzp_test_tzURXA4gSDw99d", // Enter the Key ID generated from the Dashboard
                amount: amount,
                currency: currency,
                name: user.name,
                description: "Test Transaction",
                // image: { logo }, 
                order_id: order_id, 
                handler: async function (response) {
                    
                    swal("Payment Sucessfull", {
                        icon: "success",
                      });
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone,
                },
                notes: {
                    address: user.location,
                },
                theme: {
                    color: "#61dafb",
                },
            };
    
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        
    }

    return (
        <>
            <Helmet>
                <title>UpgradeProVersion</title>
                <meta charSet="utf-8" />
                <meta name="description" content="Nested component" />
            </Helmet>

            <section className={All.UpgradeProVersion}>
                <Box p={5} textAlign={'center'}>
                        <h2>Upgrade Premium Version</h2>
                        <p className={All.FSize_16}>Choose your price plans</p> 
                </Box> 
                <Container className={`${All.ContainerPackages} ${All.horizontalScrollable} ${All.max_sm_width}`}>
                    <Box >
                        <h2 className={All.Text_center}>Our Best Packages</h2>
                    </Box>
                    <Row className={`${All.Scrollablrow} ${All.White_space_break}`}> 
                    <Col lg={4} className={All.Scrollablecol}>
                            <div className={All.NormalUser}>
                                <Box className={All.paddingtop_90} pt={6} textAlign={'center'}>
                                    <label className={All.ForUser}>For Normal User</label>
                                    <h1>${Amount1/100}<span className={All.Month}>/{Day0}days</span></h1> 
                                </Box>
                                <Box pb={2} textAlign={'center'}> 
                                    <p>{Plan0}</p>
                                    <p>If you want post more than one post,</p>
                                    <p className={All.TextBlueColor}>Upgrade Premium Version</p>
                                </Box>
                                <Box className={All.paddingbottom_90} pb={6} textAlign={'center'}> 
                                    <Button variant="contained" color="default" value={Id0}  onClick={((e) => id(e, Id0))}  className={All.BtnStyle_5}>Go Premium</Button>
                                </Box> 
                            </div>
                        </Col>
                        <Col lg={4} className={All.Scrollablecol}>
                            <div className={All.ProUserMonth}>
                                <Box className={All.paddingtop_90} pt={6} textAlign={'center'}>
                                    <label className={All.ForUser}>For Premium User</label>
                                    <h1>${Amount2/100}<span className={All.Month}>/{Day1}days</span></h1> 
                                </Box> 
                                <Box pb={2} textAlign={'center'}> 
                                    <p>{Plan1}</p>
                                    <p>If you want post more than one post,</p>
                                    <p className={All.TextWhite}>Upgrade Premium Version</p>
                                </Box>
                                <Box pb={6} className={All.paddingbottom_90} textAlign={'center'}> 
                                    <Button variant="contained" color="default" value={Id1}  onClick={((e) => id(e, Id1))}  className={All.BtnStyle_6}>Go Premium</Button>
                                </Box>
                            </div>
                        </Col>
                        <Col lg={4} className={All.Scrollablecol}>
                            <div className={All.ProUserYear}>
                                <Box className={All.paddingtop_90} pt={6} textAlign={'center'}>
                                    <label className={All.ForUser}>For Premium User</label>
                                    <h1>${Amount3/100}<span className={All.Month}>/{Day2}days</span></h1>
                                </Box>
                                <Box pb={2} textAlign={'center'}>
                                    <p>{Plan2}</p>
                                    <p>If you want post more than one post,</p>
                                    <p className={All.TextBlueColor}>Upgrade Premium Version</p>
                                </Box>
                                <Box pb={6} className={All.paddingbottom_90} textAlign={'center'}> 
                                    <Button variant="contained" color="default" value={Id2}  onClick={((e) => id(e, Id2))} className={All.BtnStyle_5}>Go Premium</Button>      
                                </Box> 
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
