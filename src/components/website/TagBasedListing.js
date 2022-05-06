import React, { Component } from "react";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import All from "../website/All.module.css";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Row, Col, Container } from "react-grid-system";
import "../css/TagBasedListing.css";

const domain = process.env.REACT_APP_MY_API;

export default class TagBasedListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      liked_list: [],
      usersid: "",
      tags: [
        { slug: "ecommerce-for-fun", tag: "Ecommerce" },
        { slug: "drone", tag: "Drone" },
        { slug: "nature", tag: "Nature" },
      ],
    };
  }

  redirectPilotLanding = (id) => {
    console.log(id);
    axios.post(`${domain}/api/pilot/getPilotId`, { userId: id }).then((res) => {
      if (res.data[0]._id) {
        window.location.href = `/pilot_details/${res.data[0]._id}`;
      }
    });
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
              let filesList = this.state.files;
              filesList[index].likes.splice(
                filesList[index].likes.indexOf(res.data._id),
                1
              );
              this.setState({
                liked_list: res.data.likedMedia,
                files: filesList,
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
              let filesList = this.state.files;
              filesList[index].likes.push(res.data._id);
              this.setState({
                liked_list: res.data.likedMedia,
                files: filesList,
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

  componentDidMount() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios.get(`${domain}/api/tag/getTags`)
    .then(res => {
        this.setState({
            tags: res.data
        })
    })

    console.log(this.props.match.params.tag)
    axios
      .post(
        `${domain}/api/tag/imageFilters`,
        { data: this.props.match.params.tag , type: "all"},
        this.config
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          files: res.data,
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
  tagChanged = (slug) =>{
    axios
    .post(
      `${domain}/api/tag/imageFilters`,
      { data: slug , type: "all"},
      this.config
    )
    .then((res) => {
      console.log(res.data);
      this.setState({
        files: res.data,
      });
    })
    .catch((err) => {
      this.setState({
        loading: false,
      });
    });
  }
  render() {
    return (
      <section style={{ background: "#fff" }}>
        <Container style={{ paddingTop: "50px" }}>
          <Row>
            <Col xxl={3} xl={3} lg={4}>
              <h2 style={{ textAlign: "center", fontFamily: "muli-regular", marginBottom: "15px" }}>
                Tags
              </h2>
              <div>
                {this.state.tags.map((tag, index) => {
                  return (
                    <Link to={"/shoots/" + tag.slug} onClick={()=>this.tagChanged(tag.slug)}>
                      <div className="tag-listing-tag">{tag.tag}</div>
                    </Link>
                  );
                })}
              </div>
            </Col>
            <Col>
              <Row gutterWidth={12}>
                {this.state.files.length <= 0 && <h2 style = {{textAlign: "center", width: "100%", margin: "100px 0px 300px 0px"}}>No shoots based on this tag.</h2>}
                <>
                {this.state.files.map((file, index) => {
                  return (
                    <Col
                      xxl={4}
                      xl={4}
                      lg={6}
                      md={4}
                      xm={6}
                      xs={6}
                      style={{ marginBottom: "12px" }}
                    >
                      <Link
                        to={{
                          pathname: `/Imageview/${file._id}/${file.userId}`,
                          data: file,
                          state: { foo: "bar" },
                        }}
                      >
                      <div style={{ position: "relative" }}>
                        <div
                          class="content-overlay"
                          style={{ width: "100%" }}
                        ></div>
                        {file.fileType[0] === "v"
                        ?<video className="thumbnail GalleryImg" style={{ width: "100%" }}>
                        <source
                          src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${file.file}`}
                          type="video/mp4"
                        />
                      </video>
                        :<img
                        src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${file.file}`}
                        style={{ width: "100%", borderRadius: "10px" }}
                        className="thumbnail GalleryImg"
                      />
                        
                        }
                      </div>
                      </Link>

                      <figcaption
                        id={"file_details_" + index}
                        className=""
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          width: "85%",
                          marginLeft: "5%",
                        }}
                      >
                        {file.user_id == this.state.usersid ? (
                          <Link className={All.White} to="/Profile/">
                            <span className="FSize_14 Profile_icon">
                              {file.author}{" "}
                            </span>
                          </Link>
                        ) : (
                          <div
                            className={All.White}
                            // to={{
                            //   pathname: `/pilot_details/${file.userId}`,
                            // }}
                            style={{
                              display: "inline-block",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              this.redirectPilotLanding(file.userId)
                            }
                          >
                            <span className="FSize_14 Profile_icon">
                              {file.name}{" "}
                            </span>
                          </div>
                        )}
                        <span className="LikeIcon MuliLight">
                          {" "}
                          <FormControlLabel
                            onClick={() => this.likeFile(file._id, index)}
                            className="MuliLight"
                            control={
                              <Checkbox
                                icon={
                                  <>
                                    {this.state.liked_list.includes(file._id) &&
                                    localStorage.getItem("access_token") ? (
                                      <Favorite />
                                    ) : (
                                      <FavoriteBorder />
                                    )}
                                  </>
                                }
                                checkedIcon={
                                  <>
                                    {this.state.liked_list.includes(file._id) &&
                                    localStorage.getItem("access_token") ? (
                                      <Favorite />
                                    ) : (
                                      <FavoriteBorder />
                                    )}
                                  </>
                                }
                                name="checkedH"
                              />
                            }
                            label={file.likes.length}
                          />
                        </span>
                      </figcaption>
                    </Col>
                  );
                })}
                </>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
