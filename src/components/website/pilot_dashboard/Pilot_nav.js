import React from 'react';
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'
import "./css/Pilot_nav.css";
import {NavLink, Link} from "react-router-dom"


function Pilot_nav() {
    return <div>
            <div className="p_d_navbar">
            <NavLink to="/pilot_dashboard/activities" activeClassName='pd_nav_active' id="p_d_navitem1">Activities</NavLink>
            <NavLink to="/pilot_dashboard/account" activeClassName='pd_nav_active' id="p_d_navitem2">My Account</NavLink>
            </div>
    </div>;
}

export default Pilot_nav;

