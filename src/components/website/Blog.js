import React from "react";
import { Helmet } from "react-helmet";
import All from "../website/All.module.css";
import { Container, Row, Col } from "react-grid-system";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Placeholder from "../images/placeholder.png";
import Calendar from "../images/calendar.svg";
import Pin from "../images/pin.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";
import DroneImg from "../images/drone-img.svg";
const API_URL = "https://demo-nexevo.in/vijay";
const domain = process.env.REACT_APP_MY_API;

export default class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      blog: [],
      blogcategories: [],
      visible: 6,
      error: false,
      trendingBlogs: [],
    };

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return { visible: prev.visible + 8 };
    });
  }

  componentDidMount() {
    const url = `${API_URL}/blog`;
    axios
      .post(`${domain}/api/category/getOneCategory`, {
        slug: this.props.match.params.slug,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          metaTitle: res.data.metaTitle,
          metaDescription: res.data.metaDescription,
          metaKeywords: res.data.metaKeywords,
        });
        axios
          .post(`${domain}/api/blog/getBlogs`, { category: res.data.category })
          .then((res) => {
            console.log(res);
            this.setState({ blog: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
        axios.get(`${domain}/api/blog/getBlogsTrending`).then((res) => {
          console.log(res);
          this.setState({
            trendingBlogs: res.data,
          });
        });
      });

    axios
      .get(`${domain}/api/category/getCategories`)

      .then((res) => {
        this.setState({ blogcategories: res.data });
      });
  }

  categoryClicked = (slug, category) => {
    axios
      .post(`${domain}/api/category/getOneCategory`, { slug: slug })
      .then((res) => {
        console.log(res);
        this.setState({
          metaTitle: res.data.metaTitle,
          metaDescription: res.data.metaDescription,
          metaKeywords: res.data.metaKeywords,
        });
        axios
          .post(`${domain}/api/blog/getBlogs`, { category: res.data.category })
          .then((res) => {
            console.log(res);
            this.setState({ blog: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  render() {
    // const onSubmit = (data) => {
    //     console.log(data);
    // }

    // const { register, handleSubmit, errors } = useForm();

    return (
      <>
        <Helmet>
          <title>{this.props.match.params.slug}</title>
          <meta charSet="utf-8" />
          <meta name="description" content={this.state.metaDescription} />
          <meta name="keywords" content={this.state.metaKeywords} />
        </Helmet>

        <section className={All.BlogDeatail}>
          <Box p={4} textAlign={"center"}>
            <h2 className={All.BlogDeatailTitle}>Our Blog</h2>
          </Box>

          <Container className={All.Container}>
            <Row>
              <Col md={8}>
                {this.state.blog.length <= 0 ? (
                  <h2 style={{ textAlign: "center" }}>
                    No blogs yet on this category
                  </h2>
                ) : (
                  <Row>
                    {this.state.blog
                      // .slice(0, this.state.visible)
                      .map((item, index) => {
                        return (
                          <>
                            <Col md={6} className={All.Blog}>
                              <Link to={`/blog/${item.slug}`} id={item.id}>
                                <div className={All.ListBlogs}>
                                  <img
                                    class={All.BlogImage}
                                    src={
                                      item.image
                                        ? `https://dn-nexevo-original-files.s3.ap-south-1.amazonaws.com/${item.image}`
                                        : Placeholder
                                    }
                                    width="100%"
                                    style={{ height: "240px" }}
                                  ></img>
                                  <div
                                    className={`${All.Bgcolordynamic} ${All.Content}`}
                                  >
                                    <h6>{item.category}</h6>
                                    <p className={All.BlogDesc}>{item.title}</p>
                                    <span className={All.PublishedDate}>
                                      {" "}
                                      <img src={Calendar}></img>{" "}
                                      {item.createdAt.slice(0, 10)}
                                    </span>
                                    <span className={All.Location}>
                                      {" "}
                                      <img src={Pin}></img> {item.location}{" "}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </Col>
                          </>
                        );
                      })}
                  </Row>
                )}

                {this.state.visible < this.state.blog.length && (
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
              </Col>

              <Col md={4}>
                <div
                  className={` ${All.BlogDeatailSidebar} ${All.Catagories} ${All.SpaceBox} ${All.D_None_sm} ${All.D_None_xs}`}
                >
                  <Box className={All.Subscription}>
                    <h4>Subscribe Info for Latest Update</h4>
                    <p className={` ${All.FSize_14} ${All.SubscribeDesc} `}>
                      Lorem Ipsum is simply dummy text of the printing
                    </p>
                    {/* <form className={All.form} onSubmit={handleSubmit(onSubmit)}> */}
                    <form>
                      <div className={All.FormGroup}>
                        <input
                          type="email"
                          name="email"
                          className={All.FormControl}
                          id="subscription"
                          placeholder="E-mail Address"
                        />
                        {/* {errors.email && errors.email.type === "required" && <p class="error">This is required field</p>}
                                            {errors.email && errors.email.type === "minLength" && <p class="error">This is field minLength 2</p>}
                                            {errors.email && errors.email.message  && <p class="error">Invalid email address</p>} */}
                      </div>

                      <div className={All.FormGroup}>
                        <Button
                          variant="contained"
                          color="default"
                          type="submit"
                          className={All.BtnStyle_3}
                        >
                          Subscribe
                        </Button>
                      </div>
                    </form>
                  </Box>
                  <Box
                    pb={2}
                    className={`${All.Catagories} ${All.SpaceBox} ${All.D_None_sm} ${All.D_None_xs}`}
                  >
                    <h4 className={All.BorderBottom}>Categories</h4>
                    {this.state.blogcategories
                      .map((item, index) => {
                        return (
                          <>
                            <Link
                              to={`/blogs/${item.slug}`}
                              onClick={() =>
                                this.categoryClicked(item.slug, item.category)
                              }
                            >
                              {" "}
                              <span
                                className={`tag-listing-tag`}
                                style = {item.slug === this.props.match.params.slug ? {backgroundColor: "#4ffea3"} :{}}
                              >
                                {item.category}{" "}
                              </span>
                            </Link>
                          </>
                        );
                      })}
                  </Box>

                  <Box pb={2} className={All.Trending}>
                    <h4 className={All.BorderBottom}>Trending</h4>

                    {this.state.trendingBlogs.map((item, index) => {
                      return (
                        <>
                          <Link to={`/blog/${item.slug}`}>
                            <div className={All.posts}>
                              <div className={All.ImageDiv}>
                                <img
                                  src={
                                    item.image
                                      ? `https://dn-nexevo-original-files.s3.ap-south-1.amazonaws.com/${item.image}`
                                      : Placeholder
                                  }
                                  style={{ height: "65px" }}
                                ></img>
                              </div>
                              <div className={All.ContentDiv}>
                                <h6>{item.category}</h6>
                                <p>{item.title}</p>
                              </div>
                            </div>
                          </Link>
                        </>
                      );
                    })}
                  </Box>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}
