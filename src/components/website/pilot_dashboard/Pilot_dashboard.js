import React from 'react'
import { Route, Switch } from "react-router-dom"
import Pilot_nav from "./Pilot_nav";
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system'
import Activities_Sidebar from './Activities_Sidebar'
import Account_Sidebar from './Account_Sidebar';


function Pilot_dashboard() {
    return (
        <>
            <Pilot_nav />
            <Container>
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