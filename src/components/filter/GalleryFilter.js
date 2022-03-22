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
// import Like from "../Like";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LanguageIcon from "@material-ui/icons/Language";
import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import ImageIcon from "@material-ui/icons/Image";
import PanoramaIcon from "@material-ui/icons/Panorama";
import VideocamIcon from "@material-ui/icons/Videocam";
import { withStyles } from "@material-ui/core/styles";
import "../css/GaleryFilter.css"
import DropDownPng from '../images/s_c_dropdown2.png'
import { Dropdown } from "materialize-css";


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

const domain = process.env.REACT_APP_MY_API;

class GalleryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userlogin: "",
      listing: [],
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

      times: ["Today", "Week", "Month", "Ever"],

      
      activeLink: "all",
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
  handleClick = (id) => {
    this.setState({ activeLink: id });
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    // switch (id) {
    //   case 5:
    //     axios
    //       .get(`https://demo-nexevo.in/haj/auth-app/public/api/listingall`, config)
    //       .then((response) => response.data)
    //       .then(
    //         (data) => {
    //           this.setState({ listing: data, listing_length: data.length });
    //         },
    //         (err) => { }
    //       );
    //     break;
    //   default:
    //     axios
    //       .get(
    //         `https://demo-nexevo.in/haj/auth-app/public/api/categorylisting/${id}`,
    //         config
    //       )
    //       .then((response) => response.data)
    //       .then(
    //         (data) => {
    //           this.setState({ listing: data, listing_length: data.length });
    //         },
    //         (err) => { }
    //       );
    // }
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

  //   axios.get(`https://demo-nexevo.in/haj/auth-app/public/api/homepagelistingfillter?timeframe=${e.target.value}&type=${e.target.id}`, config).then(response => response.data)
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

  handleScroll = () => {
    try {
      const wrappedElement = document.getElementById('main_div');
      if (wrappedElement.getBoundingClientRect().bottom <= window.innerHeight + 1) {
        if (this.state.visible < this.state.listing.length) {
          this.loadMore()
        }
      }
    }
    catch {
      console.log("Error")
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const token = localStorage.getItem("access_token");
    this.setState({ userlogin: token });
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    axios.get(`${domain}/api/image/getImages`, config)
    .then(res => {
      console.log(res.data)
      this.setState({
        listing: res.data,
        loading: false
      })
    })
    .catch(err => {
      this.setState({
        loading: false
      })
    })
  }

  dropdown_open = (id) => {
    document.getElementById("g_f_filter" + id).classList.add("g_f_filter_selected")
  }

  dropdown_close = (id) => {
    document.getElementById("g_f_filter" + id).classList.remove("g_f_filter_selected")
  }

  dropdown_select = (id) => {
    document.getElementById("g_f_filter" + id).classList.remove("g_f_filter_selected")
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  mouseOverFilter = (id) => {
    document.getElementById("file_details_"+id).style.visibility = "visible"
  }

  mouseLeaveFilter = (id) => {
    document.getElementById("file_details_"+id).style.visibility = "hidden"
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
    var dropdown_open = this.dropdown_open
    var dropdown_close = this.dropdown_close
    var dropdown_select = this.dropdown_select

    return (
      <>
        <section className={All.Filter} id="main_div">
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
              {/* <BottomNavigationAction
                label="360"
                onClick={() => this.handleClick(2)}
                icon={<ImageAspectRatioIcon />}
              /> */}
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
                  {/* <Row  gutterWidth={20}>
                    <Col lg = {3}><div className="g_f_filter" onClick = {() => dropdown(1)}>Select Country <span className='g_f_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="g_f_dropdown_icon1" /></span></div></Col>
                    <Col lg = {3}><div className="g_f_filter" onClick = {() => dropdown(2)}>Select City <span className='g_f_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="g_f_dropdown_icon2" /></span></div></Col>
                    <Col lg = {3}><div className="g_f_filter" onClick = {() => dropdown(3)}>Select Industry <span className='g_f_dropdown_icon'><img src={DropDownPng} alt="" height={"14px"} id="g_f_dropdown_icon3" /></span></div></Col>
                    <Col ><button className="g_f_btn1" style = {{margin: "10px 0", borderRadius: "20px !important"}}>Search</button></Col>
                  </Row> */}
                  <Row gutterWidth={20}>
                    <Col xxl = {3} xl = {3} lg = {3} md = {6} sm = {6} xs = {12}>
                      <select className="g_f_filter" id="g_f_filter1" onFocus={() => dropdown_open(1)} onBlur={() => dropdown_close(1)} onChange={() => dropdown_select(1)}>
                        <option disabled selected>Select Country</option>
                        <option>India</option>
                        <option>China</option>
                        <option>Russia</option>
                      </select>
                      {/* <select className="g_f_filter">
                        <option>Hot Dog, Fries and a Soda</option>
                        <option>Burger, Shake and a Smile</option>
                        <option>Sugar, Spice and all things nice</option>
                      </select> */}

                    </Col>
                    <Col xxl = {3} xl = {3} lg = {3} md = {6} sm = {6} xs = {12}>
                      <select className="g_f_filter" id="g_f_filter2" onFocus={() => dropdown_open(2)} onBlur={() => dropdown_close(2)} onChange={() => dropdown_select(2)}>
                        <option disabled selected>Select City</option>
                        <option>Bangalore</option>
                        <option>Chennai</option>
                        <option>Mumbai</option>
                      </select>
                    </Col>
                    <Col xxl = {3} xl = {3} lg = {3} md = {6} sm = {6} xs = {12}>
                      <select className="g_f_filter" id="g_f_filter3" onFocus={() => dropdown_open(3)} onBlur={() => dropdown_close(3)} onChange={() => dropdown_select(3)}>
                        <option disabled selected>Select Industry</option>
                        <option>Nexevo</option>
                        <option>Nexevo technologies</option>
                        <option>Nexevo tech</option>
                      </select>
                    </Col>
                    <Col xxl = {3} xl = {3} lg = {3} md = {6} sm = {6} xs = {12}><button className="g_f_btn1" style={{ margin: "10px 0", borderRadius: "20px !important" }}>Search</button></Col>
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
                    <figure style={{display: "flex", justifyContent: "center"}}>
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
                                        <>
                                        {/* { */}
                                        <li key={index} onMouseOver={() => this.mouseOverFilter(index)} onMouseLeave={() => this.mouseLeaveFilter(index)}>
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
                                                    src={`${domain}/${user.file}`}
                                                    type="video/mp4"
                                                  />
                                                </video>
                                              </Link>
                                              <figcaption id = {"file_details_"+index} className="file_figcaption">
                                                <Link
                                                  className={All.White}
                                                  to={{
                                                    pathname: `/pilot_details/6225df2f6abfb18582fc58c3`,
                                                  }}
                                                >
                                                  <span className="FSize_14 Profile_icon">
                                                    {user.name}{" "}
                                                  </span>
                                                </Link>
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
                                              </figcaption>
                                            </figure>
                                          </div>
                                          ): user.fileType === "image" || user.fileType === "3d" ?(
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
                                                  <img className="thumbnail GalleryImg" src={`${domain}/${user.file}`}/>
                                                </Link>
                                                <figcaption id = {"file_details_"+index} className="file_figcaption">
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
                                                        pathname: `/pilot_details/${user.userId}`,
                                                      }}
                                                    >
                                                      <span className="FSize_14 Profile_icon">
                                                        {user.name} {" "}
                                                      </span>
                                                    </Link>
                                                  )}
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
                                                </figcaption>
                                              </figure>
                                            </div>
                                          ): <></>}
                                        </li>
                                        </>
                                                    // }
                                      ))}
                                  </>
                                </ul>
                              )}
                            />
                          </div>
                        </>
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