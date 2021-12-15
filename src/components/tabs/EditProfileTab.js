import React from "react";
import { Container, Row, Col } from "react-grid-system";
import All from "../website/All.module.css";
import "../website/All.module.css";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import PublicProfile from "../tabs/PublicProfile";
import AccountSetting from "../tabs/AccountSetting";
import EmailNotification from "../tabs/EmailNotifications";

document.addEventListener(
  "click",
  ({
    target: {
      dataset: { id = "" },
    },
  }) => {
    if (id.length > 0) {
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.add("hidden"));
      document.querySelector(`#${id}`).classList.remove("hidden");
      document.querySelectorAll('.select_tab').forEach(t => t.classList.remove(All.BtnStyle_12));
      document.querySelector(`#select_${id}`).classList.add(All.BtnStyle_12);
    }
  }
);

export default class EditProfileTab extends React.Component {
  render() {
    return (
      <div id="container">
        <section className="tabs-content">
          <Container className={All.Container}>
            <Row>
              <Col>
                <header class="tabs-nav">
                  <ul>
                    {/* <span className={All.scrollableShadow}></span> */}
                    <span className="EditProfile">
                      <li id = "select_tab1" className={"select_tab "+All.BtnStyle_12}>
                        <button data-id="tab1">Public Profile</button>
                      </li>
                      <li id = "select_tab2" className="select_tab">
                        <button data-id="tab2">Account Settings</button>
                      </li>
                      <li id = "select_tab3" className="select_tab">
                        <button data-id="tab3">Email Notifications</button>
                      </li>
                    </span>
                  </ul>
                </header>
              </Col>
            </Row>

            <Box pb={5}>
              <Divider />
            </Box>
          </Container>
        </section>

        <section class="tabs-content">
          <Container className={All.Container}>
            <Row>
              <Col>
                <div id="tab1" class="tab">
                  {" "}
                  <PublicProfile />
                </div>
                <div id="tab2" class="tab hidden">
                  <AccountSetting />
                </div>
                <div id="tab3" class="tab hidden">
                  <EmailNotification />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}
