import React from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Box from "@material-ui/core/Box";
import All from "../website/All.module.css";
import Button from "@material-ui/core/Button";
import Purchase from "../images/purchase.png";

const API_URL = "";

export default function Cart() {
  return (
    <section className={All.Purchase}>
      <div className={All.Purchasedlistdesktop}>
        <Box textAlign={"Left"}>
          <table>
            <tbody>
              <tr>
                <td>
                  <li className={All.MyJobList}>
                    <figure
                      className={`${All.Avatar} ${All.AvatarStateSuccess}`}
                    >
                      <img
                        className="alignleft"
                        src={Purchase}
                        alt="Image Sample 1"
                        style={{
                          display: "inline",
                          float: "left",
                          width: "100px",
                          marginRight: "15px",
                        }}
                      />
                    </figure>
                    <div className={All.UsersListBody}>
                      <div>
                        <h5 className={All.Bold}>DJI Inspire 2 (NA)</h5>
                        <p>New Product</p>
                        <p className={All.Bold}>
                          Seller:{" "}
                          <span className={All.light}>Nexevo Technologies</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </td>
                <td>
                  {" "}
                  <h5 className={All.light}>$39.00</h5>
                </td>
                <td className={All.Text_right}>
                  <div class="wrapper">
                    <span className={`${All.FSize_16} ${All.FloatRight}`}>
                      <Button className={All.BtnStyle_5}>Purchased</Button>
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <li className={All.MyJobList}>
                    <figure
                      className={`${All.Avatar} ${All.AvatarStateSuccess}`}
                    >
                      <img
                        className="alignleft"
                        src={Purchase}
                        alt="Image Sample 1"
                        style={{
                          display: "inline",
                          float: "left",
                          width: "100px",
                          marginRight: "15px",
                        }}
                      />
                    </figure>
                    <div className={All.UsersListBody}>
                      <div>
                        <h5 className={All.Bold}>DJI Inspire 2 (NA)</h5>
                        <p>New Product</p>
                        <p className={All.Bold}>
                          Seller:{" "}
                          <span className={All.light}>Nexevo Technologies</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </td>
                <td>
                  {" "}
                  <h5 className={All.light}>$39.00</h5>
                </td>
                <td className={All.Text_right}>
                  <div class="wrapper">
                    <span className={`${All.FSize_16} ${All.FloatRight}`}>
                      <Button className={All.BtnStyle_5}>Purchased</Button>
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <li className={All.MyJobList}>
                    <figure
                      className={`${All.Avatar} ${All.AvatarStateSuccess}`}
                    >
                      <img
                        className="alignleft"
                        src={Purchase}
                        alt="Image Sample 1"
                        style={{
                          display: "inline",
                          float: "left",
                          width: "100px",
                          marginRight: "15px",
                        }}
                      />
                    </figure>
                    <div className={All.UsersListBody}>
                      <div>
                        <h5 className={All.Bold}>DJI Inspire 2 (NA)</h5>
                        <p>New Product</p>
                        <p className={All.Bold}>
                          Seller:{" "}
                          <span className={All.light}>Nexevo Technologies</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </td>
                <td>
                  {" "}
                  <h5 className={All.light}>$39.00</h5>
                </td>
                <td className={All.Text_right}>
                  <div class="wrapper">
                    <span className={`${All.FSize_16} ${All.FloatRight}`}>
                      <Button className={All.BtnStyle_5}>Purchased</Button>
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <li className={All.MyJobList}>
                    <figure
                      className={`${All.Avatar} ${All.AvatarStateSuccess}`}
                    >
                      <img
                        className="alignleft"
                        src={Purchase}
                        alt="Image Sample 1"
                        style={{
                          display: "inline",
                          float: "left",
                          width: "100px",
                          marginRight: "15px",
                        }}
                      />
                    </figure>
                    <div className={All.UsersListBody}>
                      <div>
                        <h5 className={All.Bold}>DJI Inspire 2 (NA)</h5>
                        <p>New Product</p>
                        <p className={All.Bold}>
                          Seller:{" "}
                          <span className={All.light}>Nexevo Technologies</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </td>
                <td>
                  {" "}
                  <h5 className={All.light}>$39.00</h5>
                </td>
                <td className={All.Text_right}>
                  <div class="wrapper">
                    <span className={`${All.FSize_16} ${All.FloatRight}`}>
                      <Button className={All.BtnStyle_5}>Purchased</Button>
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <li className={All.MyJobList}>
                    <figure
                      className={`${All.Avatar} ${All.AvatarStateSuccess}`}
                    >
                      <img
                        className="alignleft"
                        src={Purchase}
                        alt="Image Sample 1"
                        style={{
                          display: "inline",
                          float: "left",
                          width: "100px",
                          marginRight: "15px",
                        }}
                      />
                    </figure>
                    <div className={All.UsersListBody}>
                      <div>
                        <h5 className={All.Bold}>DJI Inspire 2 (NA)</h5>
                        <p>New Product</p>
                        <p className={All.Bold}>
                          Seller:{" "}
                          <span className={All.light}>Nexevo Technologies</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </td>
                <td>
                  {" "}
                  <h5 className={All.light}>$39.00</h5>
                </td>
                <td className={All.Text_right}>
                  <div class="wrapper">
                    <span className={`${All.FSize_16} ${All.FloatRight}`}>
                      <Button className={All.BtnStyle_5}>Purchased</Button>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </div>
      <div className={All.Purchasedlistmobile}>
        <Box>
          <li className={All.MyJobList}>
            <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
              <img
                className="alignleft"
                src={Purchase}
                alt="Image Sample 1"
                style={{
                  display: "inline",
                  float: "left",
                  width: "100px",
                  marginRight: "15px",
                }}
              />
            </figure>
            <div className={All.UsersListBody}>
              <div>
                <h5 className={All.Bold}>DJI Inspire 2 (NA)</h5>
                <p>New Product</p>
                <p className={All.Bold}>
                  Seller: <span className={All.light}>Nexevo Technologies</span>
                </p>
                <h5 className={All.light}>$39.00</h5>
                <Box py={2} display="flex">
                  <span className={`${All.FSize_16} ${All.FloatRight}`}>
                    <Button className={All.BtnStyle_5}>Purchased</Button>
                  </span>
                </Box>
              </div>
            </div>
          </li>
          <li className={All.MyJobList}>
            <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
              <img
                className="alignleft"
                src={Purchase}
                alt="Image Sample 1"
                style={{
                  display: "inline",
                  float: "left",
                  width: "100px",
                  marginRight: "15px",
                }}
              />
            </figure>
            <div className={All.UsersListBody}>
              <div>
                <h5 className={All.Bold}>DJI Inspire 2 (NA)</h5>
                <p>New Product</p>
                <p className={All.Bold}>
                  Seller: <span className={All.light}>Nexevo Technologies</span>
                </p>
                <h5 className={All.light}>$39.00</h5>
                <Box py={2} display="flex">
                  <span className={`${All.FSize_16} ${All.FloatRight}`}>
                    <Button className={All.BtnStyle_5}>Purchased</Button>
                  </span>
                </Box>
              </div>
            </div>
          </li>
          <li className={All.MyJobList}>
            <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
              <img
                className="alignleft"
                src={Purchase}
                alt="Image Sample 1"
                style={{
                  display: "inline",
                  float: "left",
                  width: "100px",
                  marginRight: "15px",
                }}
              />
            </figure>
            <div className={All.UsersListBody}>
              <div>
                <h5 className={All.Bold}>DJI Inspire 2 (NA)</h5>
                <p>New Product</p>
                <p className={All.Bold}>
                  Seller: <span className={All.light}>Nexevo Technologies</span>
                </p>
                <h5 className={All.light}>$39.00</h5>
                <Box py={2} display="flex">
                  <span className={`${All.FSize_16} ${All.FloatRight}`}>
                    <Button className={All.BtnStyle_5}>Purchased</Button>
                  </span>
                </Box>
              </div>
            </div>
          </li>
          <li className={All.MyJobList}>
            <figure className={`${All.Avatar} ${All.AvatarStateSuccess}`}>
              <img
                className="alignleft"
                src={Purchase}
                alt="Image Sample 1"
                style={{
                  display: "inline",
                  float: "left",
                  width: "100px",
                  marginRight: "15px",
                }}
              />
            </figure>
            <div className={All.UsersListBody}>
              <div>
                <h5 className={All.Bold}>DJI Inspire 2 (NA)</h5>
                <p>New Product</p>
                <p className={All.Bold}>
                  Seller: <span className={All.light}>Nexevo Technologies</span>
                </p>
                <h5 className={All.light}>$39.00</h5>
                <Box py={2} display="flex">
                  <span className={`${All.FSize_16} ${All.FloatRight}`}>
                    <Button className={All.BtnStyle_5}>Purchased</Button>
                  </span>
                </Box>
              </div>
            </div>
          </li>
        </Box>
      </div>
    </section>
  );
}
