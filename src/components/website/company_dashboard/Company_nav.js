import React, { useState } from 'react';
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'
import "./css/Company_nav.css";
import {NavLink, Link} from "react-router-dom";
import All from '../../website/All.module.css'




function Company_nav() {
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

            <div className="c_d_navbar">
            <Container className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>

            <Link to="/company_dashboard/activities/jobs" onClick={changeActive} className={active.link1 ? "cd_nav_active" : ""}   id="c_d_navitem1">Activities</Link>
            <Link to="/company_dashboard/account" onClick={changeActive1} className={active.link2 ? "cd_nav_active" : ""}  id="c_d_navitem2">My Account</Link>
          </Container>
            </div>
    </div>;
}

export default Company_nav;

