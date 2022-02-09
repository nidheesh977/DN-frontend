import React, {Component} from 'react'
import All from '../../website/All.module.css'
import ServiceCenterActivities from './ServiceCenterActivities'
import {Container, Row, Col, Visible, Hidden} from 'react-grid-system'
import {NavLink, Switch, Route} from 'react-router-dom'

class ServiceCenterDashboard extends Component{

  constructor(props){
    super(props)
    this.state = {
      main_tab : 1
    }
  }

  selectMainTab = (tab, to) => {
    this.setState({
      main_tab: tab
    })
    this.props.history.push(to)
  }

  render(){
    return(
      <>
        <div className="s_c_db_main_tabs">
          <Visible md>
            <div style ={{marginTop: "15px"}}></div>
          </Visible>
          <Visible  sm>
            <div style ={{marginTop: "20px"}}></div>
          </Visible>
          <Visible xs>
            <div style ={{marginTop: "25px"}}></div>
          </Visible>
          <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
            <div style={{display: "flex"}}>
              <div className={this.state.main_tab===1?"s_c_db_main_tab s_c_db_main_tab_selected":"s_c_db_main_tab"} onClick={() => this.selectMainTab(1, "/service_center_dashboard")}>Activities</div>
              <div className={this.state.main_tab===2?"s_c_db_main_tab s_c_db_main_tab_selected":"s_c_db_main_tab"} onClick={() => this.selectMainTab(2, "/service_center_dashboard/account")}>My Account</div>
            </div>
          </Container>
        </div>
        <Switch>
          <Route path = "/service_center_dashboard" component = {ServiceCenterActivities} />
          <Route path = "/service_center_dashboard/account" component = {ServiceCenterActivities} />
        </Switch>
      </>
    )
  }
}

export default ServiceCenterDashboard