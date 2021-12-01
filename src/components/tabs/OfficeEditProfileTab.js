import React from 'react' 
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css' 
import '../website/All.module.css'
import Divider from '@material-ui/core/Divider'; 
import $ from 'jquery'
import Box from '@material-ui/core/Box'; 
import OfficePublicProfile from '../tabs/OfficePublicProfile'
import AdvancedInformation from '../tabs/AdvancedInformation'
import SocialMediaProfiles from '../tabs/SocialMediaProfiles'
import EmailNotification from '../tabs/EmailNotifications'


document.addEventListener('click', ({ target: { dataset: { id = '' }}}) => {
  if (id.length > 0) {
    document.querySelectorAll('.tab').forEach(t => t.classList.add('hidden'));
    document.querySelector(`#${id}`).classList.remove('hidden');
  }
});


export default class EditProfileTab extends React.Component {
    render(){
      return(
        <div id="container">
           <section class="tabs-content">
          <Container className={All.Container}>
            <Row>
              <Col>
              <header class="tabs-nav">
                <ul>
                {/* <span className={All.scrollableShadow}></span> */}
                  <span className="EditProfile"> 
                      <li><button data-id="tab1">Public Profile</button></li>
                      <li><button data-id="tab2">Advanced Information</button></li>
                      <li><button data-id="tab3"> Social Media Profiles</button></li> 
                  </span> 
                </ul>
              </header>
            </Col>
          </Row>
       
      
          <Box pb={5} className={`${All.pb_xs} ${All.pb_sm} ${All.pb_md}`}>
            <Divider />
        </Box>
        </Container> 
        </section>  
        
        <section className={`${All.paddingbottom_20} tabs-content`}>
        <Container className={All.Container}>
          <Row>
              <Col> 
                  <div id="tab1" class="tab"> <OfficePublicProfile /></div> 
                  <div id="tab2" class="tab hidden"> <AdvancedInformation /></div> 
                  <div id="tab3" class="tab hidden"> <SocialMediaProfiles /></div>  
              </Col>
          </Row> 
        </Container> 
        </section>
      </div>
 
      )
    }
  }
   