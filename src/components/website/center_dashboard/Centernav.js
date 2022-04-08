import React, { useEffect, useState } from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import "./css/Pilot_nav.css";
import { NavLink, Link, useHistory, useParams } from "react-router-dom";
import All from "../../website/All.module.css";

function Center_nav() {
 
  let history = useHistory();
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
          <Link
            to="/center_dashboard/activities/downloads/"
            id="p_d_navitem1"
          >
            Activities
          </Link>
          <Link
            to="/center_dashboard/account/"
            id="p_d_navitem2"
          >
            My Account
          </Link>
          <Link style={{ float: "right" }} onClick={logout}>
            Logout
          </Link>
        </Container>
      </div>
    </div>
  );
}

export default Center_nav;
