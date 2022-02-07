import React from 'react';
import "../../css/HirePilot.css";
import dropdown from '../../images/s_c_dropdown2.png';
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import "./css/Activities_Sidebar.css"
// import Pilot_followers from 'Pilot_followers'
import { Route, Switch, NavLink } from "react-router-dom"
import Pilot_followers from './Pilot_followers'
import Pilot_appliedJobs from './Pilot_appliedJobs';
import Pilot_following from "./Pilot_following";
import Pilot_hiredJobs from "./Pilot_hiredJobs";
import Pilot_savedJobs from './Pilot_savedJobs';

class Activities_Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            view_media_filter: true,
            view_store_filter: true,
            view_jobs_filter: true,
            view_inspired_filter: true,

        }
    }

    dropdown = (id) => {
        id = "view_" + id
        this.setState({
            [id]: !this.state[id]
        })
    }

    render() {
        return (
            <div>
                <Row>

                    <Col xxl={2.5} xl={2.6} lg={4.15} md={5.4} >
                        <div className="media_box">
                            <div className="sidebar_filter1_title" onClick={() => this.dropdown("media_filter")}>Media <img src={dropdown} id="dropimg" alt="dropdown img" className={this.state.view_media_filter ? "h_p_filter1_dropdown h_p_dropdown_selected" : "h_p_filter1_dropdown"} /></div>
                            <hr className="sidebar_hr" />
                            <div className={this.state.view_media_filter ? "h_p_filter1_content_container " : "h_p_filter1_content_container h_p_hide_filter"} id="h_p_pilot_type_filter">
                                <div className="h_p_filter1_checkbox_label">Images</div>
                                <div className="h_p_filter1_checkbox_label">360 Images</div>
                                <div className="h_p_filter1_checkbox_label">3D Models</div>
                                <div className="h_p_filter1_checkbox_label">Videos</div>
                            </div>
                        </div>
                        <div className="media_box">
                            <div className="sidebar_filter1_title" onClick={() => this.dropdown("store_filter")}>My Store <img src={dropdown} id="dropimg" alt="dropdown img" className={this.state.view_store_filter ? "h_p_filter1_dropdown h_p_dropdown_selected" : "h_p_filter1_dropdown"} /></div>
                            <hr className="sidebar_hr" />
                            <div className={this.state.view_store_filter ? "h_p_filter1_content_container " : "h_p_filter1_content_container h_p_hide_filter"} id="h_p_pilot_type_filter">
                                <div className="h_p_filter1_checkbox_label">Downloaded files</div>

                            </div>
                        </div>
                        <div className="media_box">
                            <div className="sidebar_filter1_title" onClick={() => this.dropdown("jobs_filter")}>Jobs <img src={dropdown} id="dropimg" alt="dropdown img" className={this.state.view_jobs_filter ? "h_p_filter1_dropdown h_p_dropdown_selected" : "h_p_filter1_dropdown"} /></div>
                            <hr className="sidebar_hr" />
                            <div className={this.state.view_jobs_filter ? "h_p_filter1_content_container " : "h_p_filter1_content_container h_p_hide_filter"} id="h_p_pilot_type_filter">
                            <div  id="pd_filter1_checkbox_label"> <NavLink exact activeClassName='h_p_sidebar_active' to="/pilot_dashboard/activities/appliedJobs">Applied Jobs</NavLink>
                              </div> <div  id="pd_filter1_checkbox_label"> <NavLink exact activeClassName='h_p_sidebar_active' to="/pilot_dashboard/activities/hiredJobs">Hired Jobs</NavLink>
                              </div> <div  id="pd_filter1_checkbox_label"> <NavLink exact activeClassName='h_p_sidebar_active' to="/pilot_dashboard/activities/savedJobs">Saved Jobs</NavLink>
                              </div>
                             
                            </div>
                        </div>
                        <div className="media_box">
                            <div className="sidebar_filter1_title" onClick={() => this.dropdown("inspired_filter")}>Inspired <img src={dropdown} id="dropimg" alt="dropdown img" className={this.state.view_inspired_filter ? "h_p_filter1_dropdown h_p_dropdown_selected" : "h_p_filter1_dropdown"} /></div>
                            <hr className="sidebar_hr" />
                            <div className={this.state.view_inspired_filter ? "h_p_filter1_content_container " : "h_p_filter1_content_container h_p_hide_filter"} id="h_p_pilot_type_filter">
                            <div  id="pd_filter1_checkbox_label"> <NavLink exact activeClassName='h_p_sidebar_active' to="/pilot_dashboard/activities/followers">Followers</NavLink>
                              </div>         <div  id="pd_filter1_checkbox_label"> <NavLink exact activeClassName='h_p_sidebar_active' to="/pilot_dashboard/activities/following">Following</NavLink>
                              </div>   
                            </div>
                        </div>
                    </Col>

                    <Col>
                        <Switch>
                            <Route path="/pilot_dashboard/activities/followers" component={Pilot_followers} />
                            <Route path="/pilot_dashboard/activities/appliedJobs" component={Pilot_appliedJobs} />
                            <Route path="/pilot_dashboard/activities/hiredJobs" component={Pilot_hiredJobs} />
                            <Route path="/pilot_dashboard/activities/savedJobs" component={Pilot_savedJobs} />
                            <Route path="/pilot_dashboard/activities/following" component = {Pilot_following} />
                            {/* <Route exact path="/pilot_dashboard/account" component={Account_Sidebar} /> */}
                        </Switch>
                        
                    </Col>
                </Row>

            </div>
        )
    }
}
export default Activities_Sidebar;