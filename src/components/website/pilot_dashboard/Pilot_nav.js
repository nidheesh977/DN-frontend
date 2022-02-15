import React, { useState } from 'react';
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'
import "./css/Pilot_nav.css";
import {NavLink, Link} from "react-router-dom";
import All from '../../website/All.module.css'


function Pilot_nav() {
    let [active, setActive] = useState({
        link1: true,
        link2: false,
    })

    function changeActive() {
        setActive({
            link1: true,
            link2: false
        })    }   
         function changeActive1() {
            setActive({
                link1: false,
                link2: true
            })    }
    return <div>

            <div className="p_d_navbar">
            <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>

            <Link to="/pilot_dashboard/activities/images" onClick={changeActive} className={active.link1 ? "pd_nav_active" : ""}   id="p_d_navitem1">Activities</Link>
            <Link to="/pilot_dashboard/account" onClick={changeActive1} className={active.link2 ? "pd_nav_active" : ""}  id="p_d_navitem2">My Account</Link>
          </Container>
            </div>
    </div>;
}

export default Pilot_nav;

