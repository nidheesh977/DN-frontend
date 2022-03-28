import React, { useState } from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import "./css/Pilot_nav.css";
import { NavLink, Link, useHistory } from "react-router-dom";
import All from "../../website/All.module.css";

function Center_nav() {
  let [active, setActive] = useState({
    link1: false,
    link2: true,
  });
  let history = useHistory();

  function changeActive() {
    setActive({
      link1: true,
      link2: false,
    });
  }
  function changeActive1() {
    setActive({
      link1: false,
      link2: true,
    });
  }
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
            to="/center_dashboard/activities"
            onClick={changeActive}
            className={active.link1 ? "pd_nav_active" : ""}
            id="p_d_navitem1"
          >
            Activities
          </Link>
          <Link
            to="/center_dashboard/"
            onClick={changeActive1}
            className={active.link2 ? "pd_nav_active" : ""}
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
