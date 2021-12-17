import React from "react";
import Filter from "../images/Filter.svg";
import { Container, Row, Col } from "react-grid-system";
import All from "../website/All.module.css";
import Box from "@material-ui/core/Box";
import axios from "axios";
import DroneImg from "../images/drone-img.svg";
import Button from "@material-ui/core/Button";
import Skeleton from "react-loading-skeleton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import $ from "jquery";
import SearchResults from "react-filter-search";
import nofoundresult from "../images/noresultfound.svg";
import Like from "../Like";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LanguageIcon from "@material-ui/icons/Language";
import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import ImageIcon from "@material-ui/icons/Image";
import PanoramaIcon from "@material-ui/icons/Panorama";
import VideocamIcon from "@material-ui/icons/Videocam";
import { withStyles } from "@material-ui/core/styles";

const API_URL = "http://localhost/auth-app/public/api/auth";

function handleClick() {
  var v = document.getElementById("FilterDropdowns");
  if (v.style.display === "none") {
    v.style.display = "block";
  } else {
    v.style.display = "none";
  }
}

const styles = (theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: "1200",
  },
  Uploadicon: {
    bottom: "10%",
    right: "10%",
    position: "fixed",
    zIndex: "1200",
    background:
      "transparent linear-gradient(10deg, #00E7FC 0%, #4FFEA3 100%) 0% 0% no-repeat padding-box !important",
  },

  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});

var videos = document.querySelectorAll(".thumbnail");
for (var i = 0; i < videos.length; i++) {
  videos[i].addEventListener("click", clickHandler, false);
}
function clickHandler(el) {
  var mainVideo = document.getElementById("mainVideo");
  mainVideo.src = el.srcElement.currentSrc;
}

class GalleryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userlogin: "",
      listing: [],
      listing_length: 0,
      posttitle: [],
      visible: 10,
      valuees: 0,
      users: "",
      usersid: "",
      all_id: "1",
      value: "",
      loading: true,
      userId: props.user,
      images: "1",
      categoriesImage: "1",
      title: [],
      categories360Image: "2",
      categoriesVideo: "3",
      categories3DImage: "4",
      error: false,
      links: [
        {
          id: 5,
          name: "All",
          className: "GalleryFilter",
        },
        {
          id: 1,
          name: "Images",
          className: "GalleryFilter",
        },
        {
          id: 2,
          name: "360 Images",
          className: "GalleryFilter",
        },
        {
          id: 3,
          name: "Video",
          className: "GalleryFilter",
        },
        {
          id: 4,
          name: "3D images",
          className: "GalleryFilter",
        },
      ],

      times: ["Today", "Week", "Month", "Ever"],

      keywords: [
        {
          key: 1,
          type: "Images",
        },
        {
          key: 2,
          type: "360 Images",
        },
        {
          key: 3,
          type: "Videos",
        },
        {
          key: 4,
          type: "3D Images",
        },
      ],
      activeLink: null,
    };
    this.loadMore = this.loadMore.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.handleChangesTimeframe = this.handleChangesTimeframe.bind(this);
    // this.handleChangeTime = this.handleChangeTime.bind(this);
    // this.handleChangeshot = this.handleChangeshot.bind(this)
  }

  loadMore() {
    this.setState((prev) => {
      return { visible: prev.visible + 8 };
    });
  }

  clickMe(user) {
    this.setState({
      redirect: true,
    });
  }

  handleChanges(event) {
    event.preventDefault();
    let type = $("#type").val();
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios
      .post(
        `http://localhost/auth-app/public/api/homepagelistingfillter?type=${type}`,
        config
      )
      .then((response) => response.data)
      .then(
        (data) => {
          this.setState({ listing: data, listing_length: data.length });
        },
        (err) => { console.log(err) }
      );
  }

  handleChangesTimeframe = (event) => {
    let type = $("#type").val();
    let timeframe = $("#timeframe").val();
    let keywords = $("#keywords").val();
    const config2 = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios
      .post(
        "http://localhost/auth-app/public/api/homepagelistingfillter",
        {
          timeframe: timeframe,
          keywords: keywords,
          type: type,
        },
        config2
      )
      .then((res) => {
        this.setState({ listing: res.data, listing_length: res.data.length });
      })
      .catch((error) => { });
  };

  // onClickAll(event){
  //   const all_idvalues = event.currentTarget.dataset.id
  //   this.setState({ all_id: all_idvalues })

  //   const config = {
  //     headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('access_token')
  //     }
  // }

  // axios.get(`http://localhost/auth-app/public/api/homepagelistingfillter?type=${this.state.all_id}`, config).then(response => response.data)
  //     .then(data => {
  //         this.setState({ listing: data })
  //     },

  //         err => {
  //             console.log(err);
  //         })
  // }

  // Categories filter axios api start
  handleClick = (id) => {
    this.setState({ activeLink: id });
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    switch (id) {
      case 5:
        axios
          .get(`http://localhost/auth-app/public/api/listingall`, config)
          .then((response) => response.data)
          .then(
            (data) => {
              this.setState({ listing: data, listing_length: data.length });
            },
            (err) => { }
          );
        break;
      default:
        axios
          .get(
            `http://localhost/auth-app/public/api/categorylisting/${id}`,
            config
          )
          .then((response) => response.data)
          .then(
            (data) => {
              this.setState({ listing: data, listing_length: data.length });
            },
            (err) => { }
          );
    }
  };
  // Categories filter axios api End

  // handleChangeshot(e){
  //   alert(e.target.id)
  // }

  //   handleChangeTime(e){
  //   alert(e.target.id)
  //   const config = {
  //     headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('access_token')
  //     }
  // }

  //   axios.get(`http://localhost/auth-app/public/api/homepagelistingfillter?timeframe=${e.target.value}&type=${e.target.id}`, config).then(response => response.data)
  //       .then(data => {
  //           this.setState({ listing: data })
  //       },
  //           err => {
  //               console.log(err);
  //           })
  //   }

  handleChange = (event, valuees) => {
    this.setState({ valuees });
  };

  componentDidMount() {
    const token = localStorage.getItem("access_token");
    this.setState({ userlogin: token });

    const urls = `http://localhost/auth-app/public/api/posttitle`;
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    this.setState({ loading: true });
    axios
      .get(`http://localhost/auth-app/public/api/homepagelisting`, config)
      .then((response) => response.data)
      .then(
        (data) => {
          this.setState({
            listing: data,
            listing_length: data.length,
            loading: false,
          });
        },
        (err) => { }
      );
    axios
      .get(urls, config)
      .then((res) => res.data)
      .then((datas) => {
        this.setState({ posttitle: datas });
        this.setState({ loading: false });
      });

    axios.get("http://localhost/auth-app/public/api/auth/user", config).then(
      (res) => {
        this.setState({ users: res.data, usersid: res.data.id });
      },
      (err) => { }
    );
  }

  render() {
    const { links, activeLink } = this.state;
    const { times } = this.state;
    const { follow, valuesss } = this.state;
    const { listing, value } = this.state;
    const { users, valuess } = this.state;
    const { title, values } = this.state;
    const { posttitle, posttitlevalues } = this.state;
    const { valuees, pathMap } = this.state;
    const { loading, data } = this.state;

    const { classes } = this.props;
    var listing_length = this.state.listing_length

    return (
      <>
        <section className={All.Filter}>
          <div className={All.mobileBottomMenu}>
            <BottomNavigation
              value={valuees}
              onChange={this.handleChange}
              showLabels
              className={classes.root}
            >
              <BottomNavigationAction
                label="All"
                onClick={() => this.handleClick(5)}
                icon={<LanguageIcon />}
              />
              <BottomNavigationAction
                label="Images"
                onClick={() => this.handleClick(1)}
                icon={<ImageIcon />}
              />
              <BottomNavigationAction
                label="360"
                onClick={() => this.handleClick(2)}
                icon={<ImageAspectRatioIcon />}
              />
              <BottomNavigationAction
                label="Video"
                onClick={() => this.handleClick(3)}
                icon={<VideocamIcon />}
              />
              <BottomNavigationAction
                label="3D"
                onClick={() => this.handleClick(4)}
                icon={<PanoramaIcon />}
              />
            </BottomNavigation>
          </div>
          <Container
            className={`${All.Container} ${All.pl_xs_50} ${All.pr_xs_50} `}
          >
            <Row>
              <Col lg={12}>
                <Row>
                  <Col lg={2} xs={6} className="DropdownFilter views">
                    <select
                      className="dropdown dropdown__text"
                      onChange={this.handleChanges}
                      id="type"
                      defaultValue={"1"}
                    >
                      <option value="" disabled>
                        All
                      </option>
                      <option value="1">
                        All
                      </option>
                      {this.state.userlogin && (
                        <option value="2">Following</option>
                      )}
                    </select>
                  </Col>

                  <Col lg={8} xs={12} className="categories">
                    <div className="Filters">
                      <form className="GalleryForm">
                        <ul>
                          {links.map((link, index) => {
                            return (
                              <li
                                key={index}
                                onClick={() => this.handleClick(link.id)}
                                className={
                                  link.className +
                                  (link.id === activeLink ? " active_item" : "")
                                }
                              >
                                <input
                                  className="GalleryFilter"
                                  type="checkbox"
                                  id="1"
                                  data-plugininputid="7"
                                />
                                <label
                                  className={
                                    link.id === activeLink && "active!"
                                  }
                                  htmlFor={link.name}
                                >
                                  {" "}
                                  {link.name}
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      </form>
                    </div>
                  </Col>
                  <Col lg={2} xs={6} className="DropdownFilter settings ">
                    <>
                      <Button
                        onClick={handleClick}
                        variant="contained"
                        color="default"
                        className="Btn_Filter"
                      >
                        <img style={{ paddingRight: 10 }} src={Filter} />
                        Filter
                      </Button>
                    </>
                  </Col>
                </Row>
                <div id="FilterDropdowns" style={{ display: "none" }}>
                  <Row className="FilterDropdown">
                    <Col lg={4}>
                      <select
                        className="dropdown dropdown__text"
                        id="timeframe"
                        onChange={this.handleChangesTimeframe}
                        defaultValue={""}
                      >
                        {/* {this.state.times.map(function(data, key){  return (
                      <option  value={data}>{data}</option> )
                    })} */}
                        <option value="" disabled>
                          Time Frame
                        </option>
                        <option value="today">today</option>
                        <option value="week">week</option>
                        <option value="month">month</option>
                        <option value="ever">ever</option>
                      </select>
                    </Col>
                    <Col lg={4}></Col>
                    <Col lg={4}>
                      <select
                        className="dropdown dropdown__text"
                        id="keywords"
                        onChange={this.handleChangesTimeframe}
                      >
                        <option value="" selected disabled>
                          Caption
                        </option>
                        {posttitle.map((title) => (
                          <option value={title.caption}>{title.caption}</option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                </div>

                <div className="GalleryTitle">
                  <h2 className={All.paddingbottom}>
                    Let's bring out your drone skills
                  </h2>
                  <label>Show your talent to the whole world</label>
                </div>
                {loading === true ? (
                  <div>
                    <figure>
                      <Skeleton
                        height={250}
                        width={270}
                        count={4}
                        className={All.SkeletonImg}
                      />
                    </figure>
                  </div>
                ) : (
                  <>
                    <div>
                      {listing_length == 0 ? (
                        <div style={{ margin: "0px auto", display: "block" }}>
                          <Box className={All.Text_center} pt={5}>
                            <img
                              src={nofoundresult}
                              className={`${All.W_xs_100} ${All.W_sm_100}`}
                            />
                            <Box className={`${All.Text_center}`} px={5} pb={2}>
                              <h2>No Results Found</h2>
                            </Box>
                            <Box className={`${All.Text_center}`} pb={5}>
                              <label>
                                It seems we can’t find any results based on your
                                search.{" "}
                              </label>
                            </Box>
                          </Box>
                        </div>
                      ) : (
                        <>
                          <Box>
                            <h5 className={All.Bold}>
                              Check the talent of other droners
                            </h5>
                          </Box>
                          <div className="Filters">
                            <SearchResults
                              value={value}
                              data={listing}
                              renderResults={(results) => (
                                <ul>
                                  <>
                                    {results
                                      .slice(0, this.state.visible)
                                      .map((user, index) => (
                                        <li key={index}>
                                          {user.tag === "1" ? (
                                            <div>
                                              <figure>
                                                <Link
                                                  to={{
                                                    pathname: `Imageview/${user.id}/${user.user_id}`,
                                                    data: user,
                                                    state: { foo: "bar" },
                                                  }}
                                                  onClick={this.clickMe.bind(
                                                    this,
                                                    user
                                                  )}
                                                >
                                                  <div className="content-overlay"></div>
                                                  <img
                                                    className="GalleryImg"
                                                    src={user.src}
                                                  />
                                                </Link>
                                                <figcaption>
                                                  {user.user_id ==
                                                    this.state.usersid ? (
                                                    <Link
                                                      className={All.White}
                                                      to="/Profile/">
                                                      <span className="FSize_14 Profile_icon">
                                                        {user.author} {" "}
                                                      </span>
                                                    </Link>
                                                  ) : (
                                                    <Link
                                                      className={All.White}
                                                      to={{
                                                        pathname: `/ProfileSingle/${user.user_id}`,
                                                      }}
                                                    >
                                                      <span className="FSize_14 Profile_icon">
                                                        {user.author} {" "}
                                                      </span>
                                                    </Link>
                                                  )}
                                                  {this.state.userlogin ? (
                                                    // <span className="LikeIcon MuliLight"> <FormControlLabel className="MuliLight" control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />} label={user.like} /></span>
                                                    <span className="LikeIcon  MuliLight">
                                                      <Like id={user.id} />{" "}
                                                    </span>
                                                  ) : (
                                                    <Link to="/login">
                                                      <span className="LikeIcon MuliLight">
                                                        {" "}
                                                        <FormControlLabel
                                                          className="MuliLight"
                                                          control={
                                                            <Checkbox
                                                              icon={
                                                                <FavoriteBorder />
                                                              }
                                                              checkedIcon={
                                                                <Favorite />
                                                              }
                                                              name="checkedH"
                                                            />
                                                          }
                                                          label={user.like}
                                                        />
                                                      </span>
                                                    </Link>
                                                  )}
                                                </figcaption>
                                              </figure>
                                            </div>
                                          ) : user.tag === "2" ? (
                                            <div>
                                              <figure>
                                                <Link
                                                  to={{
                                                    pathname: `/Imageview/${user.id}/${user.user_id}`,
                                                    data: user,
                                                    state: { foo: "bar" },
                                                  }}
                                                  onClick={this.clickMe.bind(
                                                    this,
                                                    user
                                                  )}
                                                >
                                                  <div className="content-overlay"></div>
                                                  <img
                                                    className="GalleryImg"
                                                    src={user.src}
                                                  />
                                                </Link>
                                                <figcaption>
                                                  {user.user_id ==
                                                    this.state.usersid ? (
                                                    <Link
                                                      className={All.White}
                                                      to={{
                                                        pathname: `/Profile/`,
                                                      }}
                                                    >
                                                      <span className="FSize_14 Profile_icon">
                                                        {user.author}{" "}
                                                      </span>
                                                    </Link>
                                                  ) : (
                                                    <Link
                                                      className={All.White}
                                                      to={{
                                                        pathname: `ProfileSingle/${user.user_id}`,
                                                      }}
                                                    >
                                                      <span className="FSize_14 Profile_icon">
                                                        {user.author}{" "}
                                                      </span>
                                                    </Link>
                                                  )}
                                                  {this.state.userlogin ? (
                                                    // <span className="LikeIcon MuliLight"> <FormControlLabel className="MuliLight" control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />} label={user.like} /></span>
                                                    <span className="LikeIcon  MuliLight">
                                                      <Like id={user.id} />{" "}
                                                    </span>
                                                  ) : (
                                                    <Link to="/login">
                                                      <span className="LikeIcon MuliLight">
                                                        {" "}
                                                        <FormControlLabel
                                                          className="MuliLight"
                                                          control={
                                                            <Checkbox
                                                              icon={
                                                                <FavoriteBorder />
                                                              }
                                                              checkedIcon={
                                                                <Favorite />
                                                              }
                                                              name="checkedH"
                                                            />
                                                          }
                                                          label={user.like}
                                                        />
                                                      </span>
                                                    </Link>
                                                  )}
                                                </figcaption>
                                              </figure>
                                            </div>
                                          ) : user.tag === "3" ? (
                                            <div>
                                              <figure>
                                                <Link
                                                  to={{
                                                    pathname: `Imageview/${user.id}/${user.user_id}`,
                                                    data: user,
                                                    state: { foo: "bar" },
                                                  }}
                                                  onClick={this.clickMe.bind(
                                                    this,
                                                    user
                                                  )}
                                                >
                                                  <div className="content-overlay-video"></div>

                                                  <video className="thumbnail GalleryImg">
                                                    <source
                                                      src={user.src}
                                                      type="video/mp4"
                                                    />
                                                  </video>
                                                </Link>
                                                <figcaption>
                                                  {user.user_id ==
                                                    this.state.usersid ? (
                                                    <Link
                                                      className={All.White}
                                                      to={{
                                                        pathname: `/Profile/`,
                                                      }}
                                                    >
                                                      <span className="FSize_14 Profile_icon">
                                                        {user.author}{" "}
                                                      </span>
                                                    </Link>
                                                  ) : (
                                                    <Link
                                                      className={All.White}
                                                      to={{
                                                        pathname: `ProfileSingle/${user.user_id}`,
                                                      }}
                                                    >
                                                      <span className="FSize_14 Profile_icon">
                                                        {user.author}{" "}
                                                      </span>
                                                    </Link>
                                                  )}
                                                  {this.state.userlogin ? (
                                                    //  <span className="LikeIcon MuliLight"> <FormControlLabel className="MuliLight" control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />} label={user.like} /></span>
                                                    <span className="LikeIcon  MuliLight">
                                                      <Like id={user.id} />{" "}
                                                    </span>
                                                  ) : (
                                                    <Link to="/login">
                                                      <span className="LikeIcon MuliLight">
                                                        {" "}
                                                        <FormControlLabel
                                                          className="MuliLight"
                                                          control={
                                                            <Checkbox
                                                              icon={
                                                                <FavoriteBorder />
                                                              }
                                                              checkedIcon={
                                                                <Favorite />
                                                              }
                                                              name="checkedH"
                                                            />
                                                          }
                                                          label={user.like}
                                                        />
                                                      </span>
                                                    </Link>
                                                  )}
                                                </figcaption>
                                              </figure>
                                            </div>
                                          ) : user.tag === "4" ? (
                                            <div>
                                              <figure>
                                                <Link
                                                  to={{
                                                    pathname: `Imageview/${user.id}/${user.user_id}`,
                                                    data: user,
                                                    state: { foo: "bar" },
                                                  }}
                                                  onClick={this.clickMe.bind(
                                                    this,
                                                    user
                                                  )}
                                                >
                                                  <div className="content-overlay"></div>
                                                  <img
                                                    className="GalleryImg"
                                                    src={user.src}
                                                  />
                                                </Link>
                                                <figcaption>
                                                  {user.user_id ==
                                                    this.state.usersid ? (
                                                    <Link
                                                      className={All.White}
                                                      to={{
                                                        pathname: `/Profile/`,
                                                      }}
                                                    >
                                                      <span className="FSize_14 Profile_icon">
                                                        {user.author}{" "}
                                                      </span>
                                                    </Link>
                                                  ) : (
                                                    <Link
                                                      className={All.White}
                                                      to={{
                                                        pathname: `ProfileSingle/${user.user_id}`,
                                                      }}
                                                    >
                                                      <span className="FSize_14 Profile_icon">
                                                        {user.author}{" "}
                                                      </span>
                                                    </Link>
                                                  )}
                                                  {this.state.userlogin ? (
                                                    <span className="LikeIcon  MuliLight">
                                                      <Like id={user.id} />{" "}
                                                    </span>
                                                  ) : (
                                                    <Link to="/login">
                                                      <span className="LikeIcon MuliLight">
                                                        {" "}
                                                        <FormControlLabel
                                                          className="MuliLight"
                                                          control={
                                                            <Checkbox
                                                              icon={
                                                                <FavoriteBorder />
                                                              }
                                                              checkedIcon={
                                                                <Favorite />
                                                              }
                                                              name="checkedH"
                                                            />
                                                          }
                                                          label={user.like}
                                                        />
                                                      </span>
                                                    </Link>
                                                  )}
                                                </figcaption>
                                              </figure>
                                            </div>
                                          ) : (
                                            <div></div>
                                          )}
                                        </li>
                                      ))}
                                  </>
                                </ul>
                              )}
                            />
                          </div>
                        </>
                      )}
                      {this.state.visible < this.state.listing.length && (
                        <Box py={6} textAlign={"center"}>
                          <Button
                            variant="contained"
                            color="default"
                            type="submit"
                            onClick={this.loadMore}
                            className={`${All.BtnStyle_5} ${All.LoadMore} ${All.W_sm_70} ${All.Bold}`}
                          >
                            <img style={{ paddingRight: 10 }} src={DroneImg} />
                            Load More
                          </Button>
                        </Box>
                      )}
                    </div>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(GalleryFilter);
