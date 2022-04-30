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

            <Header />
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
                                <p className= {All.FSize_16} >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                                <h6 className= {All.Quote}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</h6>

                                <p className= {All.FSize_16}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>

                                <p className= {All.FSize_16}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolor</p>
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