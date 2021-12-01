import React from 'react' 
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import Following from './Following'
import Followers from './Followers'
import MyJobs from './MyJobs'
import MyStore from './MyStore'
import AllImage from '../tabs/All' 
import '../website/All.module.css'
import Divider from '@material-ui/core/Divider'; 
import $ from 'jquery'
import Box from '@material-ui/core/Box';
import Alls from './All'
import Image from '../tabs/Image'
import RotateImages from '../tabs/RotateImages'
import Video from '../tabs/Video'
import GraphicsImages from './GraphicsImages.js'  
import styled from 'styled-components';
import axios from 'axios'
import { userService } from '../_services/user.service';


document.addEventListener('click', ({ target: { dataset: { id = '' }}}) => {
  if (id.length > 0) {
    document.querySelectorAll('.tab').forEach(t => t.classList.add('hidden'));
    document.querySelector(`#${id}`).classList.remove('hidden'); 
  }
}); 

document.addEventListener('click', ({ target: { dataset: { pluginid = '' }}}) => {
  if (pluginid.length > 0) {
    document.querySelectorAll('.tabs').forEach(t => t.classList.add('deactive'));
    document.querySelector(`#${pluginid}`).classList.remove('deactive'); 
    
  }
});  

export default class TabModel extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      user: [],
      userId: props.id,
      categories : '1'
    };  
  }

  componentDidMount() {  
    userService.User().then(res => res.data)
    .then((data) => {
      this.setState({ user: data }) 
     }) 
  }  
    render(){
 
      const { user, value } = this.state;  
      return( 

        <div id="container">
           <section class="tabs-content"> 
              <header class="tabs-nav">
                <ul className="TabModelProfile">
                  {/* <span className={All.scrollableShadow}></span> */}
                  <span>
                      <li><button data-id="tab1" data-pluginid="tab1" class="tabs">All</button></li>
                      <li><button data-id="tab2" data-pluginid="tab2" class="tabs deactive">Images</button></li>
                      <li><button data-id="tab3" data-pluginid="tab3" class="tabs deactive"> 360° Images</button></li>
                      <li><button data-id="tab4" data-pluginid="tab4" class="tabs deactive">Videos</button></li>    
                      <li><button data-id="tab5" data-pluginid="tab5" class="tabs deactive">3D Models</button></li> 
                      {user.id == this.props.id ? <>
                        <li><button data-id="tab6" data-pluginid="tab6" class="tabs deactive">My Store</button></li>
                        <li><button data-id="tab7" data-pluginid="tab7" class="tabs deactive"> My Jobs</button></li></> : <> </> } 
                     </span>

                  <span className={All.tabsmodel_li}>
                      <li><button data-id="tab8" data-pluginid="tab8" class="tabs deactive">Followers</button></li>
                      <li><button data-id="tab9" data-pluginid="tab9" class="tabs deactive">Following</button></li>  
                  </span> 
                </ul>
              </header> 
       
        <Box pb={1}>
        <Divider />
        </Box> 
        </section>  
        
        <section className={`${All.pt_md_0} ${All.pt_xs_0} ${All.pt_sm_0} tabs-content`}>  
              <div id="tab1" class="tab"> <Alls user={this.props.id}/></div> 
              <div id="tab2" class="tab hidden"> <Image user={this.props.id} categories={this.state.categories}/></div> 
              <div id="tab3" class="tab hidden"> <RotateImages user={this.props.id}/></div> 
              <div id="tab4" class="tab hidden"> <Video user={this.props.id}/></div>  
              <div id="tab5" class="tab hidden"> <GraphicsImages user={this.props.id}/></div> 
              <div id="tab6" class="tab hidden"> <MyStore /></div> 
              <div id="tab7" class="tab hidden"> <MyJobs /></div> 
              <div id="tab8" class="tab hidden"> <Followers user={this.props.id} /></div> 
              <div id="tab9" class="tab hidden"> <Following user={this.props.id} /></div>    
        </section>
      </div>
 
      )
    }
  }
   
