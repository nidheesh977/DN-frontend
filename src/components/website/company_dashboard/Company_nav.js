import React, { useState, useEffect } from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import "./css/Pilot_nav.css";
import { NavLink, Link, useHistory, useParams } from "react-router-dom";
import All from "../../website/All.module.css";

function Company_nav() {
  let param = useParams();

  useEffect(()=>{
    if(window.location.href.includes("activities")){
      document.getElementById("p_d_navitem1").classList.add("pd_nav_active")
      document.getElementById("p_d_navitem2").classList.remove("pd_nav_active")
    }
  else if(window.location.href.includes("account")){
      document.getElementById("p_d_navitem2").classList.add("pd_nav_active")
      document.getElementById("p_d_navitem1").classList.remove("pd_nav_active")
    }
  })
 
  let history = useHistory();

 
  function logout() {
    window.localStorage.clear();
    history.push("/");
    window.location.reload();
  }
  return (
    <div>
      <div className="p_d_navbar">
        <Container
          className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50}`}
        >

{/* "pd_nav_active" */}
          <Link
            to="/company_dashboard/activities/jobs"
            className=""
            id="p_d_navitem1"
          >
            Activities
          </Link>
          <Link
            to="/company_dashboard/account"
            className=""
            id="p_d_navitem2"
          >
            My Account
          </Link>
        </Container>
      </div>
    </div>
  );
}

export default Company_nav;
