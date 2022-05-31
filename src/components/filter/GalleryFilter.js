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
import $, { data } from "jquery";
import SearchResults from "react-filter-search";
import nofoundresult from "../images/noresultfound.svg";
// import Like from "../Like";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LanguageIcon from "@material-ui/icons/Language";
import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import ImageIcon from "@material-ui/icons/Image";
import PanoramaIcon from "@material-ui/icons/Panorama";
import VideocamIcon from "@material-ui/icons/Videocam";
import { withStyles } from "@material-ui/core/styles";
import "../css/GaleryFilter.css";
import DropDownPng from "../images/s_c_dropdown2.png";
import { Dropdown } from "materialize-css";
import Search from "../images/search123.png";
import Close from "../images/close.svg";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { Redirect } from "react-router-dom";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function handleClick() {
  var v = document.getElementById("FilterDropdowns");
  var y = document.getElementById("mainFilter");
  if (v.style.display === "none") {
    v.style.display = "block";
    y.style.display = "none";
  } else {
    v.style.display = "none";
    y.style.display = "block";
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

const domain = process.env.REACT_APP_MY_API;

class GalleryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
      dropdown: "all",
      userlogin: "",
      listing: [],
      visible: 20,
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
      followingDropdown: 0,
      links: [
        {
          id: "all",
          name: "All",
          className: "GalleryFilter",
        },
        {
          id: "image",
          name: "Images",
          className: "GalleryFilter",
        },
        {
          id: "video",
          name: "Video",
          className: "GalleryFilter",
        },
        {
          id: "3d",
          name: "3D images",
          className: "GalleryFilter",
        },
      ],

      activeLink: "all",
      liked_list: [],
      loginError: false,
      redirectToPilot: false,
      redirectToPilotPath: "",
    };
    this.loadMore = this.loadMore.bind(this);
    // this.handleChanges = this.handleChanges.bind(this);
    // this.handleChangesTimeframe = this.handleChangesTimeframe.bind(this);
    // this.handleChangeTime = this.handleChangeTime.bind(this);
    // this.handleChangeshot = this.handleChangeshot.bind(this)
  }

  loadMore() {
    this.setState((prev) => {
      return { visible: prev.visible + 20 };
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

    // axios
    //   .post(
    //     `https://demo-nexevo.in/haj/auth-app/public/api/homepagelistingfillter?type=${type}`,
    //     config
    //   )
    //   .then(
    //     (data) => {
    //       this.setState({ listing: data, listing_length: data.length });
    //     },
    //     (err) => { console.log(err) }
    //   );
  }

  handleChangesTimeframe = (event) => {
    let type = $("#type").val();
    let timeframe = $("#timeframe").val();

    // axios
    //   .post(
    //     "https://demo-nexevo.in/haj/auth-app/public/api/homepagelistingfillter",
    //     {
    //       timeframe: timeframe,
    //       keywords: keywords,
    //       type: type,
    //     },
    //     config2
    //   )
    //   .then((res) => {
    //     this.setState({ listing: res.data, listing_length: res.data.length });
    //   })
    //   .catch((error) => { });
  };

  // onClickAll(event){
  //   const all_idvalues = event.currentTarget.dataset.id
  //   this.setState({ all_id: all_idvalues })

  //   const config = {
  //     headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('access_token')
  //     }
  // }

  // axios.get(`https://demo-nexevo.in/haj/auth-app/public/api/homepagelistingfillter?type=${this.state.all_id}`, config).then(response => response.data)
  //     .then(data => {
  //         this.setState({ listing: data })
  //     },

  //         err => {
  //             console.log(err);
  //         })
  // }

  // Categories filter axios api start
  handleClick = async (id) => {
    this.setState({ activeLink: id });
    this.setState({
      listing: [],
      loading: true,
    });

    await axios
      .post(
        `${domain}/api/image/imageFilters?page=1`,
        { data: "", type: id },
        this.config
      )
      .then((res) => {
        console.log(res);
        this.setState({
          listing: res.data.results,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };

  handleChange = (event, valuees) => {
    this.setState({ valuees });
  };

  handleScroll = () => {
    try {
      const wrappedElement = document.getElementById("main_div");
      if (
        wrappedElement.getBoundingClientRect().bottom <=
        window.innerHeight + 1
      ) {
        if (this.state.visible < this.state.listing.length) {
          this.loadMore();
        }
      }
    } catch {
      console.log("Error");
    }
  };

  likeFile = (id, index) => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    if (localStorage.getItem("access_token")) {
      if (this.state.liked_list.includes(id)) {
        axios.post(`${domain}/api/image/unlikeImage/${id}`, config).then(() => {
          axios
            .post(`${domain}/api/user/checkUser`, config)
            .then((res) => {
              console.log(res.data);
              let filesList = this.state.listing;
              filesList[index].likes.splice(
                filesList[index].likes.indexOf(res.data._id),
                1
              );
              this.setState({
                liked_list: res.data.likedMedia,
                listing: filesList,
              });
            })
            .catch((err) => {
              this.setState({});
            });
        });
      } else {
        axios.post(`${domain}/api/image/likeImage/${id}`, config).then(() => {
          axios
            .post(`${domain}/api/user/checkUser`, config)
            .then((res) => {
              console.log(res.data);
              let filesList = this.state.listing;
              filesList[index].likes.push(res.data._id);
              this.setState({
                liked_list: res.data.likedMedia,
                listing: filesList,
              });
            })
            .catch((err) => {
              this.setState({});
            });
        });
      }
    } else {
      this.setState({
        loginError: true,
      });
    }
  };

  closeLoginError = () => {
    this.setState({
      loginError: false,
    });
  };

  redirectPilotLanding = (id) => {
    console.log(id);
    axios.post(`${domain}/api/pilot/getPilotId`, { userId: id }).then((res) => {
      if (res.data[0]._id) {
        this.setState({
          redirectToPilot: true,
          redirectToPilotPath: `/pilot/${res.data[0].userName}`,
        });
      }
    });
  };
  followingChanged = async (e) => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    this.setState({
      loading: true,
      listing: [],
    });
    await this.setState({
      followingDropdown: e.target.value,
    });
    if (this.state.followingDropdown == 2) {
      await axios
        .post(`${domain}/api/image/getFollowersMedia?page=1`, config)
        .then((res) => {
          console.log(res);
          this.setState({
            listing: res.data.results,
            loading: false,
          });
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
        });
    } else {
      axios
        .get(`${domain}/api/image/getImages?page=1`, config)
        .then((res) => {
          console.log(res.data);
          this.setState({
            listing: res.data.results,
            loading: false,
          });
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
        });
    }
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    const token = localStorage.getItem("access_token");
    this.setState({ userlogin: token });
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    axios
      .get(`${domain}/api/image/getImages?page=1`, config)
      .then((res) => {
        console.log(res.data);
        this.setState({
          listing: res.data.results,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
    axios.post(`${domain}/api/user/checkUser`, config).then((res) => {
      console.log(res.data);
      this.setState({
        liked_list: res.data.likedMedia,
      });
    });
  }

  dropdown_open = (id) => {
    document
      .getElementById("g_f_filter" + id)
      .classList.add("g_f_filter_selected");
  };

  dropdown_close = (id) => {
    document
      .getElementById("g_f_filter" + id)
      .classList.remove("g_f_filter_selected");
  };

  dropdown_select = (id) => {
    document
      .getElementById("g_f_filter" + id)
      .classList.remove("g_f_filter_selected");
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  mouseOverFilter = (id) => {
    document.getElementById("file_details_" + id).style.visibility = "visible";
  };

  mouseLeaveFilter = (id) => {
    document.getElementById("file_details_" + id).style.visibility = "hidden";
  };
  dropdownChanged = async (e) => {
    this.setState({
      listing: [],
      loading: true,
    });
    await this.setState({
      dropdown: e.target.value,
    });
    await axios
      .post(
        `${domain}/api/image/imageFilters?page=1`,
        { data: this.state.keywords, type: this.state.dropdown },
        this.config
      )
      .then((res) => {
        console.log(res);
        this.setState({
          listing: res.data.results,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };

  keywordsClicked = async (e) => {
    await this.setState({
      keywords: e.target.value,
    });
  };

  submitted = async (e) => {
    console.log(this.state.keywords);
    e.preventDefault();
    this.setState({
      listing: [],
      loading: true,
    });
    await axios
      .post(
        `${domain}/api/image/imageFilters?page=1`,
        { data: this.state.keywords, type: this.state.dropdown },
        this.config
      )
      .then((res) => {
        console.log(res);
        this.setState({
          listing: res.data.results,
          loading: false,
        });
      });
    this.setState({
      loading: false,
    });
  };

  render() {
    const { links, activeLink } = this.state;
    const { listing, value } = this.state;
    const { valuees } = this.state;
    const { loading } = this.state;

    const { classes } = this.props;

    return (
      <>
        <section className={All.Filter}>
          {this.state.redirectToPilot && (
            <Redirect to={this.state.redirectToPilotPath} />
          )}
          <div className={All.mobileBottomMenu}>
            <BottomNavigation
              value={valuees}
              onChange={this.handleChange}
              showLabels
              className={classes.root}
            >
              <BottomNavigationAction
                label="All"
                onClick={() => this.handleClick("all")}
                icon={<LanguageIcon />}
              />
              <BottomNavigationAction
                label="Images"
                onClick={() => this.handleClick("image")}
                icon={<ImageIcon />}
              />
              {/* <BottomNavigationAction
                label="360"
                onClick={() => this.handleClick(2)}
                icon={<ImageAspectRatioIcon />}
              /> */}
              <BottomNavigationAction
                label="Video"
                onClick={() => this.handleClick("video")}
                icon={<VideocamIcon />}
              />
              <BottomNavigationAction
                label="3D"
                onClick={() => this.handleClick("3d")}
                icon={<PanoramaIcon />}
              />
            </BottomNavigation>
          </div>
          <Container className={`${All.Container}`}>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col lg={2} xs={6} className="DropdownFilter views">
                    {localStorage.getItem("access_token") && (
                      <label>
                        <select
                          className="dropdown dropdown__text"
                          onChange={this.followingChanged}
                          id="type"
                          defaultValue={"1"}
                        >
                          <option value="1">All</option>
                          {this.state.userlogin && (
                            <option value="2">Following</option>
                          )}
                        </select>
                        <img
                          src={DropDownPng}
                          alt=""
                          style={{
                            height: "15px",
                            width: "15px",
                            position: "absolute",
                            top: "11px",
                            right: "50px",
                          }}
                        />
                      </label>
                    )}
                  </Col>

                  <Col lg={8} xs={12} className="categories">
                    <div className="Filters" id="mainFilter">
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
                  {/* <Row  gutterWidth={20}>
                    <Col lg = {3}><div className="g_f_filter" onClick = {() => dropdown(1)}>Select Country <span className='g_f_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="g_f_dropdown_icon1" /></span></div></Col>
                    <Col lg = {3}><div className="g_f_filter" onClick = {() => dropdown(2)}>Select City <span className='g_f_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="g_f_dropdown_icon2" /></span></div></Col>
                    <Col lg = {3}><div className="g_f_filter" onClick = {() => dropdown(3)}>Select Industry <span className='g_f_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="g_f_dropdown_icon3" /></span></div></Col>
                    <Col ><button className="g_f_btn1" style = {{margin: "10px 0", borderRadius: "20px !important"}}>Search</button></Col>
                  </Row> */}
                  <Container>
                    <Row
                      gutterWidth={0}
                      style={{
                        margin: "auto",
                        maxWidth: "80%",
                        marginTop: "35px",
                      }}
                    >
                      <Col lg={2} xs={2}>
                        <select
                          className="g_f_searchBox1"
                          style={{ width: "100%" }}
                          onChange={this.dropdownChanged}
                        >
                          <option value="all">All Media</option>
                          <option value="image">Images</option>
                          <option value="video">Videos</option>
                          <option value="3d">3D Videos</option>
                        </select>
                      </Col>
                      <Col>
                        <form onSubmit={this.submitted}>
                          <input
                            className="g_f_searchBox2"
                            type="text"
                            style={{ width: "105%" }}
                            placeholder="Enter Keywords to match your search"
                            onChange={this.keywordsClicked}
                          />
                        </form>
                      </Col>
                      <Col lg={0.5}>
                        <img
                          src={Search}
                          style={{ cursor: "pointer" }}
                          onClick={this.submitted}
                        />
                      </Col>

                      {/* <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
                      <select
                        className="g_f_filter"
                        id="g_f_filter1"
                        onFocus={() => dropdown_open(1)}
                        onBlur={() => dropdown_close(1)}
                        onChange={() => dropdown_select(1)}
                      >
                        <option disabled selected>
                          Select Country
                        </option>
                        <option>India</option>
                        <option>China</option>
                        <option>Russia</option>
                      </select>
                   
                    </Col>
                    <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
                      <select
                        className="g_f_filter"
                        id="g_f_filter2"
                        onFocus={() => dropdown_open(2)}
                        onBlur={() => dropdown_close(2)}
                        onChange={() => dropdown_select(2)}
                      >
                        <option disabled selected>
                          Select City
                        </option>
                        <option>Bangalore</option>
                        <option>Chennai</option>
                        <option>Mumbai</option>
                      </select>
                    </Col>
                    <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
                      <select
                        className="g_f_filter"
                        id="g_f_filter3"
                        onFocus={() => dropdown_open(3)}
                        onBlur={() => dropdown_close(3)}
                        onChange={() => dropdown_select(3)}
                      >
                        <option disabled selected>
                          Select Industry
                        </option>
                        <option>Nexevo</option>
                        <option>Nexevo technologies</option>
                        <option>Nexevo tech</option>
                      </select>
                    </Col>
                    <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
                      <button
                        className="g_f_btn1"
                        style={{
                          margin: "10px 0",
                          borderRadius: "20px !important",
                        }}
                      >
                        Search
                      </button>
                    </Col> */}
                    </Row>
                  </Container>
                </div>

                <div className="GalleryTitle">
                  <h2 className={All.paddingbottom}>
                    Let's bring out your drone skills
                  </h2>
                  <label>Show your talent to the whole world</label>
                </div>
                {loading === true ? (
                  <div>
                    <figure
                      style={{ display: "flex", justifyContent: "center" }}
                    >
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
                      {listing.length === 0 ? (
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
                          <div className="Filters" id="main_div">
                            <SearchResults
                              value={value}
                              data={listing}
                              renderResults={(results) => (
                                <ul>
                                  <>
                                    {results
                                      .slice(0, this.state.visible)
                                      .map((user, index) => (
                                        <>
                                          {this.state.activeLink === "all" ||
                                          this.state.activeLink ===
                                            user.fileType ? (
                                            <>
                                              <li
                                                key={index}
                                                onMouseOver={() =>
                                                  this.mouseOverFilter(index)
                                                }
                                                onMouseLeave={() =>
                                                  this.mouseLeaveFilter(index)
                                                }
                                              >
                                                {user.fileType === "video" ? (
                                                  <div>
                                                    <figure>
                                                      <Link
                                                        to={{
                                                          pathname: `Imageview/${user._id}/${user.userId}`,
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
                                                            src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${user.file}`}
                                                            type="video/mp4"
                                                          />
                                                        </video>
                                                      </Link>
                                                      <figcaption
                                                        id={
                                                          "file_details_" +
                                                          index
                                                        }
                                                        className="file_figcaption"
                                                      >
                                                        <div
                                                          className={All.White}
                                                          // to={{
                                                          //   pathname: `/pilot_details/${user.userId}`,
                                                          // }}
                                                          style={{
                                                            display:
                                                              "inline-block",
                                                            cursor: "pointer",
                                                          }}
                                                          onClick={() =>
                                                            this.redirectPilotLanding(
                                                              user.userId
                                                            )
                                                          }
                                                        >
                                                          <span className="FSize_14 Profile_icon">
                                                            {user.name}{" "}
                                                          </span>
                                                        </div>
                                                        <span className="LikeIcon MuliLight">
                                                          {" "}
                                                          <FormControlLabel
                                                            className="MuliLight"
                                                            control={
                                                              <Checkbox
                                                                onClick={() =>
                                                                  this.likeFile(
                                                                    user._id,
                                                                    index
                                                                  )
                                                                }
                                                                icon={
                                                                  <>
                                                                    {this.state.liked_list.includes(
                                                                      user._id
                                                                    ) &&
                                                                    localStorage.getItem(
                                                                      "access_token"
                                                                    ) ? (
                                                                      <Favorite />
                                                                    ) : (
                                                                      <FavoriteBorder />
                                                                    )}
                                                                  </>
                                                                }
                                                                checkedIcon={
                                                                  <>
                                                                    {this.state.liked_list.includes(
                                                                      user._id
                                                                    ) &&
                                                                    localStorage.getItem(
                                                                      "access_token"
                                                                    ) ? (
                                                                      <Favorite />
                                                                    ) : (
                                                                      <FavoriteBorder />
                                                                    )}
                                                                  </>
                                                                }
                                                                name="checkedH"
                                                              />
                                                            }
                                                            label={
                                                              user.likes.length
                                                            }
                                                          />
                                                        </span>
                                                      </figcaption>
                                                    </figure>
                                                  </div>
                                                ) : user.fileType === "image" ||
                                                  user.fileType === "3d" ? (
                                                  <div>
                                                    <figure>
                                                      <Link
                                                        to={{
                                                          pathname: `Imageview/${user._id}/${user.userId}`,
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
                                                          className="thumbnail GalleryImg"
                                                          src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${user.file}`}
                                                        />
                                                      </Link>
                                                      <figcaption
                                                        id={
                                                          "file_details_" +
                                                          index
                                                        }
                                                        className="file_figcaption"
                                                      >
                                                        {user.user_id ==
                                                        this.state.usersid ? (
                                                          <Link
                                                            className={
                                                              All.White
                                                            }
                                                            to="/Profile/"
                                                          >
                                                            <span className="FSize_14 Profile_icon">
                                                              {user.author}{" "}
                                                            </span>
                                                          </Link>
                                                        ) : (
                                                          <div
                                                            className={
                                                              All.White
                                                            }
                                                            // to={{
                                                            //   pathname: `/pilot_details/${user.userId}`,
                                                            // }}
                                                            style={{
                                                              display:
                                                                "inline-block",
                                                              cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                              this.redirectPilotLanding(
                                                                user.userId
                                                              )
                                                            }
                                                          >
                                                            <span className="FSize_14 Profile_icon">
                                                              {user.name}{" "}
                                                            </span>
                                                          </div>
                                                        )}
                                                        <span className="LikeIcon MuliLight">
                                                          {" "}
                                                          <FormControlLabel
                                                            className="MuliLight"
                                                            control={
                                                              <Checkbox
                                                                onClick={() =>
                                                                  this.likeFile(
                                                                    user._id,
                                                                    index
                                                                  )
                                                                }
                                                                icon={
                                                                  <>
                                                                    {this.state.liked_list.includes(
                                                                      user._id
                                                                    ) &&
                                                                    localStorage.getItem(
                                                                      "access_token"
                                                                    ) ? (
                                                                      <Favorite />
                                                                    ) : (
                                                                      <FavoriteBorder />
                                                                    )}
                                                                  </>
                                                                }
                                                                checkedIcon={
                                                                  <>
                                                                    {this.state.liked_list.includes(
                                                                      user._id
                                                                    ) &&
                                                                    localStorage.getItem(
                                                                      "access_token"
                                                                    ) ? (
                                                                      <Favorite />
                                                                    ) : (
                                                                      <FavoriteBorder />
                                                                    )}
                                                                  </>
                                                                }
                                                                name="checkedH"
                                                              />
                                                            }
                                                            label={
                                                              user.likes.length
                                                            }
                                                          />
                                                        </span>
                                                      </figcaption>
                                                    </figure>
                                                  </div>
                                                ) : (
                                                  <></>
                                                )}
                                              </li>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                        // }
                                      ))}
                                  </>
                                </ul>
                              )}
                            />
                          </div>
                          {this.state.visible < listing.length ? (
                            <div
                              style={{
                                textAlign: "center",
                                marginTop: "20px",
                                fontFamily: "muli-regular",
                                fontSize: "18px",
                              }}
                            >
                              Loading...
                            </div>
                          ) : (
                            <div
                              style={{
                                textAlign: "center",
                                marginTop: "20px",
                                color: "gray",
                                marginBottom: "20px",
                              }}
                            >
                              No more Shoots.
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </>
                )}
              </Col>
            </Row>
            <Dialog
              open={this.state.loginError}
              onClose={this.closeLoginError}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"md"}
              fullWidth={true}
              PaperProps={{ style: { borderRadius: 10, width: "820px" } }}
            >
              <DialogContent
                className={All.PopupBody}
                style={{ marginBottom: "50px" }}
              >
                <div
                  style={{ position: "absolute", top: "20px", right: "20px" }}
                >
                  <img
                    src={Close}
                    alt=""
                    onClick={this.closeLoginError}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Row style={{ marginTop: "30px" }}>
                  <div
                    className="a_j_popup_title"
                    style={{ padding: "0px 60px" }}
                  >
                    You aren't logged into DroneZone. Please login to continue?
                  </div>
                  <div
                    className="u_f_popup_btn_container"
                    style={{ marginTop: "8px" }}
                  >
                    <div
                      className="j_l_applyJobLoginBtn"
                      style={{ width: "fit-content" }}
                      onClick={() => (window.location.href = "/login")}
                    >
                      Login / Sign Up
                    </div>
                  </div>
                </Row>
              </DialogContent>
            </Dialog>
          </Container>
        </section>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(GalleryFilter);
