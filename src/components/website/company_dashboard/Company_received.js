import React, { useState } from "react";
import "../pilot_dashboard/css/Pilot_appliedJobs.css";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import profileUser from "../../images/profile-user.svg";
import money from "../../images/money.svg";
import location from "../../images/location.svg";
import work from "../../images/work.svg";
import heart from "../../images/heart (3).svg";
import heartLike from "../../images/heart-blue.svg";
import { Link, Route, Switch } from "react-router-dom";
import loadMore from "../../images/Group 71.svg";
import bin from "./images/c_j_bin.png";
import edit from "./images/c_j_edit.png";
import "./css/Company_received.css";

import Company_receivedListing from "./Company_receivedListing";
import Company_applications from "./Company_applications";

function Company_received() {

  return (
   
    <div>
       <Switch>
       <Route component={Company_applications} path="/company_dashboard/activities/received/applications"/>

       <Route component={Company_receivedListing} path="/company_dashboard/activities/received/"/>
    </Switch>
      
    </div>
  );
}

export default Company_received;
