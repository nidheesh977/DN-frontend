import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-grid-system";
import All from "../website/All.module.css";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Header from "../header/Header";
import Skeleton from "react-loading-skeleton";
import swal from "sweetalert";
import viewJobMobileImg from "../images/viewjob_mobile.svg";
import { userService } from "../_services/user.service";

const API_URL = "http://localhost/auth-app/public/api/auth";

export default class ViewJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      hiredorners: "",
      user_id: "",
      visible: 10,
      error: false,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return { visible: prev.visible + 8 };
    });
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    const url = `${API_URL}/ViewJob/${id}`;
    axios
      .get(url, config)
      .then((res) => res.data)
      .then((data) => {
        this.setState({ hiredorners: data });
      });

    userService.User().then(
      (res) => {
        this.setState({ user_id: res.data });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyjob(id, e) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        };
        const url = `${API_URL}/Apply/${id}`;
        axios
          .get(url, config)
          .then((response) => {
            swal(response.data.message, {
              icon: "success",
            });
          })
          .catch((error) => {
            swal(error.response.data.message, {
              icon: "error",
            });
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }

  render() {
    const { hiredorners, value } = this.state;
    const { user_id, values } = this.state;
    return (
      <>
        <Helmet>
          <title>ViewJob</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>

        <Header />
        <section className={All.HiringDronersBanner}>
          <Container
            className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}
          >
            <Row>
              <Col md={6}>
                <div className={All.HireBannerText}>
                  <div className={All.Text}>
                    <h1> {hiredorners.jobtitle || <Skeleton />}</h1>
                    <h5 className={All.light}>
                      {hiredorners.jobdescription || <Skeleton />}
                    </h5>
                  </div>
                </div>
                <div className={All.HireBannerImage}></div>
              </Col>
              <Col md={6}>
                <img src={viewJobMobileImg} className={All.DisplayNone} />
              </Col>
            </Row>
          </Container>
        </section>

        <section className={All.ViewJob}>
          <Container
            className={`${All.Container} ${All.pr_xs_30} ${All.pl_xs_50} ${All.padding_30}`}
          >
            <Row className={`${All.marginleft_60} ${All.marginright_60}`}>
              <Col className={All.joblistview}>
                <table className={All.Joblist}>
                  <tbody className={All.DisplayTable}>
                    {/* <tr>
                                            <td><label className={`${All.Bold} ${All.Jobdetail}`}>Job Title</label> </td>
                                            <td><label className={`${All.light} ${All.JobColon}`}>:</label></td> 
                                            <td><label className={ `${All.MuliLight} ${All.TextBrownColor}`}>Cinematographer</label></td>
                                        </tr>    
                                        <tr>
                                            <td><label className={`${All.Bold} ${All.Jobdetail}`}>Job Description</label> </td>
                                            <td><label className={`${All.light} ${All.JobColon}`}>:</label></td> 
                                            <td><label className={ `${All.MuliLight} ${All.TextBrownColor}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</label></td>
                                        </tr>     */}
                    <tr>
                      <td>
                        <label className={`${All.Bold} ${All.Jobdetail}`}>
                          Type of Droner
                        </label>{" "}
                      </td>
                      <td>
                        <label className={`${All.light} ${All.JobColon}`}>
                          :
                        </label>
                      </td>
                      <td>
                        <label
                          className={`${All.MuliLight} ${All.TextBrownColor}`}
                        >
                          {" "}
                          {hiredorners.typeofdroner || <Skeleton />}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className={`${All.Bold} ${All.Jobdetail}`}>
                          Type of Role
                        </label>{" "}
                      </td>
                      <td>
                        <label className={`${All.light} ${All.JobColon}`}>
                          :
                        </label>
                      </td>
                      <td>
                        <label
                          className={`${All.MuliLight} ${All.TextBrownColor}`}
                        >
                          {hiredorners.typeofrole || <Skeleton />}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className={`${All.Bold} ${All.Jobdetail}`}>
                          Job Location
                        </label>{" "}
                      </td>
                      <td>
                        <label className={`${All.light} ${All.JobColon}`}>
                          :
                        </label>
                      </td>
                      <td>
                        <label
                          className={`${All.MuliLight} ${All.TextBrownColor}`}
                        >
                          {hiredorners.joblocation ? (
                            hiredorners.joblocation
                          ) : (
                            <Skeleton />
                          )}{" "}
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <Box pt={7}>
                  <h5 className={All.Bold}>Company Name</h5>
                </Box>
                <li
                  className={`${All.MyJobList} ${All.ml_xs_auto} ${All.mr_xs_auto} ${All.ml_sm_auto} ${All.mr_sm_auto} ${All.ml_md_auto} ${All.mr_md_auto} `}
                >
                  <figure className={All.Avatar}>
                    {hiredorners.profile ? (
                      <img
                        className="alignleft"
                        src={hiredorners.profile}
                        alt="Image Sample 1"
                        style={{
                          display: "inline",
                          borderRadius: "100px ",
                          height: "100px",
                          float: "left",
                          width: "100px",
                          marginRight: "15px",
                        }}
                      />
                    ) : (
                      <Skeleton circle={true} height={100} width={100} />
                    )}
                  </figure>
                  <div className={All.UsersListBody}>
                    <div>
                      <h2>{hiredorners.companyname || <Skeleton />}</h2>
                      <label className={All.Bold}>
                        {hiredorners.profession || <Skeleton />}
                      </label>
                    </div>
                  </div>
                </li>

                {/* <Box pt={5}>
                                    <label className={All.Bold}>Social Media</label>
                                </Box>
                                <Box pt={3}>
                                    <span className={All.SocialIcon}>
                                    {Facebook ? <img src={Facebook} /> :  <Skeleton circle={true} height={100} width={100}/> } 
                                    {Instagram ? <img src={Instagram} /> :  <Skeleton circle={true} height={100} width={100}/> } 
                                    {linkedin ? <img src={linkedin} /> :  <Skeleton circle={true} height={100} width={100}/> } 
                                    {Pinterest ? <img src={Pinterest} /> :  <Skeleton circle={true} height={100} width={100}/> } 
                                    {Twitter ? <img src={Twitter} /> :  <Skeleton circle={true} height={100} width={100}/> } 
                                    {Youtube ? <img src={Youtube} /> :  <Skeleton circle={true} height={100} width={100}/> }  
                                    </span>
                                </Box> */}

                {user_id.role_id === 1 && (
                  <Box pt={6} pb={6}>
                    <Button
                      variant="contained"
                      color="default"
                      onClick={(e) => this.applyjob(hiredorners.id, e)}
                      className={All.BtnStyle_3}
                    >
                      {" "}
                      Apply Now
                    </Button>
                  </Box>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}
