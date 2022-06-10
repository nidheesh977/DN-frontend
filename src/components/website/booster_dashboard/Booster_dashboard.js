import React from 'react'
import { Route, Switch } from "react-router-dom"
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'

import All from '../../website/All.module.css'

import Boosternav from './Boosternav';
import Account_Sidebar from './Account_Sidebar';
import Activities_Sidebar from './Activities_Sidebar';
import { Helmet } from 'react-helmet';

function Booster_dashboard() {
    return (
        <>
        <Helmet>
          <title>Booster dashboard</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
              {/* <ScrollToTop smooth color="#4ffea3" style={{boxShadow: "3px 2px 7px #0000003A"}} top="500"/> */}

            <Boosternav />
            <Container  className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
                <div style={{marginTop: "40px"}}>

                    <Switch>
                        {/* <Route path="/pilot_dashboard/activities" component={Activities_Sidebar} />
                        <Route path="/pilot_dashboard/" exact component={Activities_Sidebar} />
                        <Route path="/pilot_dashboard/account" component={Account_Sidebar} /> */}
 <Route path="/booster_dashboard/activities" component={Activities_Sidebar} />
                        <Route path="/booster_dashboard/" exact component={Activities_Sidebar} />
<Route path="/booster_dashboard/account" component={Account_Sidebar} />
                    </Switch>

                </div>

            </Container>

        </>
    )
}

export default Booster_dashboard;