import React from 'react'
import { Route, Switch } from "react-router-dom"
import Center_nav from './Centernav'
// import Pilot_nav from "./Pilot_nav";
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'
// import Activities_Sidebar from './Activities_Sidebar'
// import Account_Sidebar from './Account_Sidebar';
import All from '../../website/All.module.css'
import ScrollToTop from "react-scroll-to-top";
import Activities_Sidebar from './Activities_sidebar'
import Account_Sidebar from './Acoount_sidebar'
import { Helmet } from 'react-helmet'

function Center_dashboard() {
    return (
        <>
        <Helmet>
          <title>Service center dashboard</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
              {/* <ScrollToTop smooth color="#4ffea3" style={{boxShadow: "3px 2px 7px #0000003A"}} top="500"/> */}

            <Center_nav />
            <Container  className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
                <div style={{marginTop: "40px"}}>

                    <Switch>
                        <Route path="/center_dashboard/activities" component={Activities_Sidebar} />
                        <Route path="/center_dashboard/" component={Account_Sidebar} />

                    </Switch>

                </div>

            </Container>

        </>
    )
}

export default Center_dashboard;