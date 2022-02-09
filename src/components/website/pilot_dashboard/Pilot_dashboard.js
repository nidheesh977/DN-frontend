import React from 'react'
import { Route, Switch } from "react-router-dom"
import Pilot_nav from "./Pilot_nav";
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'
import Activities_Sidebar from './Activities_Sidebar'
import Account_Sidebar from './Account_Sidebar';
import All from '../../website/All.module.css'
import ScrollToTop from "react-scroll-to-top";




function Pilot_dashboard() {
    return (
        <>
              <ScrollToTop smooth color="#4ffea3" style={{boxShadow: "3px 2px 7px #0000003A"}} top="500"/>

            <Pilot_nav />
            <Container  className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
                <div style={{marginTop: "40px"}}>

                    <Switch>
                        <Route path="/pilot_dashboard/activities" component={Activities_Sidebar} />
                        <Route path="/pilot_dashboard/account" component={Account_Sidebar} />
                    </Switch>

                </div>

            </Container>

        </>
    )
}

export default Pilot_dashboard;