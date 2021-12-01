import  React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css' 
import axios from 'axios'
import '../website/All.module.css' 
import Button from '@material-ui/core/Button'; 
import MyPost from '../tabs/MyPosts'
import DraftPost from '../tabs/DraftPost'
import AppliedDroners from '../tabs/AppliedDroners'
import HiredDroners from '../tabs/HiredDroners' 
import { Link } from 'react-router-dom';
import { userService } from '../_services/user.service';

document.addEventListener('click', ({ target: { dataset: { id = '' }}}) => {
  if (id.length > 0) {
    document.querySelectorAll('.tab').forEach(t => t.classList.add('hidden')); 
    document.querySelector(`#${id}`).classList.remove('hidden');
  }
});
 
  export default function EditProfileTab() { 
    
    const[Subscriptioncheck, setSubscriptioncheck] = useState([]); 
    
    useEffect(() => {

      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }
      userService.Subscriptioncheck().then(res => {
        setSubscriptioncheck(res.data); 
        // console.log(res);
      },
        err => {
          console.log(err);
        }
      ) 
    }, []);

      return(
        <div id="container">
           <section className={`${All.Hireprofiletab} tabs-content Hireprofiletab`}>
          <Container className={All.Container}>
            <Row>
              <Col>
              <header class="tabs-nav">
                <ul>
                {/* <span className={All.scrollableShadow}></span> */}
                  <span className="TabModelProfile"> 
                      <li><button data-id="tab1">My Posts</button></li>
                      <li><button data-id="tab2">Applied Droners</button></li>
                      <li><button data-id="tab3">Hired Droners</button></li>
                      <li><button data-id="tab4">Draft Posts</button></li>    
                  </span> 
                  <span>  

                      {Subscriptioncheck.message == 'subscribed' ?
                        <Link to='GetJobs'  className={`${All.padding_0} ${All.DisplayInline}`}>
                        <Button variant="contained" color="default" type="submit" className={`${All.BtnStyle_11}`}>
                            Post Your Jobs
                        </Button>
                        </Link>
                            : 
                        <Link to='GoPremium'  className={`${All.padding_0} ${All.DisplayInline}`}>
                        <Button variant="contained" color="default" type="submit" className={`${All.BtnStyle_11}`}>
                            Post Your Jobs
                        </Button>
                        </Link>
                       }


                  </span> 
                </ul>
              </header>
            </Col>
          </Row>
        
        </Container> 
        </section>
         
        <section class="tabs-content">
        <Container className={All.Container}>
          <Row>
              <Col> 
              <div id="tab1" class="tab"> <MyPost /></div> 
              <div id="tab2" class="tab hidden"> <AppliedDroners /></div> 
              <div id="tab3" class="tab hidden"> <HiredDroners /></div> 
              <div id="tab4" class="tab hidden"> <DraftPost /></div>      
              </Col>
          </Row> 
        </Container> 
        </section>
      </div>
 
      )
    } 
   