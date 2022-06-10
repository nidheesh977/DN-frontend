import React from 'react'
import { Route, Switch } from "react-router-dom"
// import Pilot_nav from "./Pilot_nav";
import Company_nav from './Company_nav'
import { Container} from 'react-grid-system'

import All from '../../website/All.module.css'
import ScrollToTop from "react-scroll-to-top";
import Activities_Sidebar from './Activities_Sidebar'
import Account_Sidebar from './Account_Sidebar'
import { Helmet } from 'react-helmet'

function Company_dashboard() {
    return (
        <>
        <Helmet>
          <title>Company dashboard</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
              {/* <ScrollToTop smooth color="#4ffea3" style={{boxShadow: "3px 2px 7px #0000003A"}} top="500"/> */}
            <Company_nav />
            {/* <Pilot_nav /> */}
            <Container  className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}>
                <div style={{marginTop: "40px"}}>

                    <Switch>
                    <Route path="/company_dashboard/activities" component={Activities_Sidebar} />
                    <Route path="/company_dashboard/account" component={Account_Sidebar} />
                        {/* <Route path="/company_dashboard/account" component={Account_Sidebar} /> */}
                    </Switch>

                </div>

            </Container>

        </>
    )
}

export default Company_dashboard;