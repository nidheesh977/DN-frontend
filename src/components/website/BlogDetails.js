import React from 'react'
import { Helmet } from "react-helmet";
import All from '../website/All.module.css'
import { Container, Row, Col } from 'react-grid-system';
import Box from '@material-ui/core/Box'; 
import Button from '@material-ui/core/Button';
import Placeholder from '../images/placeholder.png'
import { Link } from 'react-router-dom'; 
import axios from 'axios'
import Header from '../header/Header'
const API_URL = 'https://demo-nexevo.in/vijay';
  
export default class BlogDetails extends React.Component { 
    
    constructor(props) {
        super(props);
    
        this.state = { 
          blog: [],
          blogcategories: [],
          visible: 6,
          error: false
        };
    
        this.loadMore = this.loadMore.bind(this);
      }
    
      loadMore() {
        this.setState((prev) => {
          return {visible: prev.visible + 8};
        });
      }
 

      componentDidMount() {
        const url = `${API_URL}/blog`;
        const urls = `${API_URL}/blogcategories`;
        axios.get(url).then(res => res.data)
        .then((data) => {
          this.setState({ blog: data }) 
         })

         axios.get(urls).then(res => res.data)
         .then((datas) => {
           this.setState({ blogcategories: datas }) 
          })

      
      } 
 
      
    render() { 

    // const onSubmit = (data) => {
    //     console.log(data);
    // }
 
    // const { register, handleSubmit, errors } = useForm();

    return (
        <>
            <Helmet>
                <title>Blog Detail</title>
                <meta charSet="utf-8" />
                <meta name="description" content="Nested component" />
            </Helmet>

            <section className={All.BlogDeatail}>
                <Box p={4} textAlign={'center'}>
                    <h2 className = {All.BlogDeatailTitle}>What is Lorem Ipsum?</h2> 
                </Box> 

                <Container className={All.Container}>               
                    <Row>
                        <Col md={8}>
                            <div className={All.BlogDeatailContent}>
                                <img src={Placeholder} alt=""/> 
                                <h4 className = {All.BlogDeatailSubTitle}>Ipsum has been the industry's standard dummy text ever since the 1500s.</h4>
                                <p className= {All.FSize_16} >Description</p>
                            </div>
                        </Col>



                        <Col md={4}>
                            <div className={All.BlogDeatailSidebar}>
                                <Box className={All.Subscription}>
                                    <h4>Subscribe Info for Latest Update</h4>
                                    <p className= {` ${All.FSize_14} ${All.SubscribeDesc} `} >Lorem Ipsum is simply dummy text of the printing</p>
                                    <form>
                                    {/* <form className={All.form} onSubmit={handleSubmit(onSubmit)}>
                                        <div className={All.FormGroup}>
                                        <input type="email" name="email" className={All.FormControl} id="subscription" placeholder="E-mail Address" ref={register ({ required : true ,pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,  message: "invalid email address"  }}) } />
                                            {errors.email && errors.email.type === "required" && <p class="error">This is required field</p>}
                                            {errors.email && errors.email.type === "minLength" && <p class="error">This is field minLength 2</p>}
                                            {errors.email && errors.email.message  && <p class="error">Invalid email address</p>}
                                        </div>  */}
 
                                        <div className={All.FormGroup}> 
                                            <Button variant="contained" color="default" type="submit"  className={All.BtnStyle_3}>Subscribe</Button>   
                                        </div>   

                                    </form>
                                </Box> 
                                
                                <Box pb={2} className={`${All.Catagories} ${All.SpaceBox}`} > 
                                    <h4 className={All.BorderBottom}>Categories</h4>
                                    {this.state.blogcategories.slice(0, this.state.visible).map((item, index) => { 

                                    return (
                                        <> 
                                            <Link to="/"> <span className= {`${All.BtnStyle_4} ${All.BlogBtn}`} >{item.blogcategories} </span></Link>       
                                            </> 
                                            );
                                    })}                                       
                                </Box>


                                <Box pb={2} className={All.Trending} > 
                                    <h4 className={All.BorderBottom}>Trending</h4>

                                    {this.state.blog.slice(0, this.state.visible).map((item, index) => {
                return (
                    <> 

                                    <Link to="/"> 
                                        <div className={All.posts}>
                                            <div className={All.ImageDiv}><img src={Placeholder}></img></div>
                                            <div className={All.ContentDiv}>
                                                <h6>{item.blogtitle}</h6>
                                                <p>{item.blogsubtitle}</p>
                                            </div>
                                        </div>
                                    </Link>

                                    </> 
                );
              })}

                                    {/* <Link to="/"> 
                                        <div className={All.posts}>
                                            <div className={All.ImageDiv}><img src={Placeholder}></img></div>
                                            <div className={All.ContentDiv}>
                                                <h6>Nature</h6>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/"> 
                                        <div className={All.posts}>
                                            <div className={All.ImageDiv}><img src={Placeholder}></img></div>
                                            <div className={All.ContentDiv}>
                                                <h6>Nature</h6>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/"> 
                                        <div className={All.posts}>
                                            <div className={All.ImageDiv}><img src={Placeholder}></img></div>
                                            <div className={All.ContentDiv}>
                                                <h6>Nature</h6>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/"> 
                                        <div className={All.posts}>
                                            <div className={All.ImageDiv}><img src={Placeholder}></img></div>
                                            <div className={All.ContentDiv}>
                                                <h6>Nature</h6>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                        </div>
                                    </Link> */}
                                                            
                                </Box>
                                
                            </div>
                        </Col>
                        
                    </Row>
                </Container>
              
            </section>
        </>
    )
}
}