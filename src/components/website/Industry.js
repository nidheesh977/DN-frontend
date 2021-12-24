import React from 'react'
import { Helmet } from "react-helmet";
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Location from '../images/location.svg'
import work from '../images/work.svg'
import utv from '../images/utv.png' 
import Divider from '@material-ui/core/Divider'; 
import SearchResults from 'react-filter-search';
import DroneImg from '../images/UploadFile.svg'
import DropdownFilter from '../filter/DropdownFilter'



const API_URL = 'https://demo-nexevo.in/haj/auth-app/public/api/auth';
 
export default class Industry extends React.Component {
  
    constructor(props) {
      super(props);

      this.state = {
        items: [],
        value: '',
        hiredorners: [],
        visible: 10,
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
        const url = `${API_URL}/hiredorners`;
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        } 
        axios.get(url, config).then(res => res.data)
        .then((data) => {
          this.setState({ hiredorners: data }) 
          console.log(data)
         })

         .catch(err => {
           console.log(err.response)
         })
      }

        handleChange = event => {
          const { value } = event.target;
          this.setState({ value });
        };
 
        handleChanges = event => {
          const { value } = event.target;
          this.setState({ value });
        };

  
    render() {
      const { hiredorners, value } = this.state;
      return (

        <>
        <Helmet>
            <title>Search Industry</title>
            <meta charSet="utf-8" />
            <meta name="description" content="Nested component" />
        </Helmet>

        <section>
      <Container className={All.Container}>
          <Row>
              <Col>   
                  <Box className={All.FormGroup} py={4}>
                    {/* <input type="text" className={All.FormControl} name="search" placeholder="Search item name"/> */}
                    <form className={All.DisplayFlex}  action="http://localhost:3000/member" method="GET"> 
                    {/* <SearchBar className={All.SearchBar} />  */}
                    <div className={All.SearchBar}>
                       <input className="dropdown searchbardropdown" placeholder="Search ..." type="text" value={value} onChange={this.handleChange} /> 
                   </div>
                    <DropdownFilter />
                    </form>
                  </Box>
              </Col> 
          </Row>
      </Container>
  </section>

 
          <section className={All.HireJobList}>
          <Container className={All.Container}>
                <Row>
                    <Col lg={12}>  

                    <SearchResults
                        value={value}
                        data={hiredorners}
                        renderResults={results => ( 
                <> 
              <div className="tiles" aria-live="polite">
              {results.slice(0, this.state.visible).map(el => ( 
                    <>
                    <Box className={All.JobsList}>  
                    <Box textAlign={'Left'} pt={3}>   
                                <img class="alignleft" src={utv}
                            alt="Image Sample 1" style={{
                                display: "inline",
                                float: "left",
                                width: "100px",
                                marginRight: '15px' 
                            }} /> 
                            </Box>  

                            <Box pt={1}> 
                                <h2>{el.jobtitle}</h2>
                                <label className={All.Bold}>{el.companyname}</label>
                            </Box>

                            <Box className={All.JobDescription} >
                            <label className={All.Normal}>{el.jobdescription}</label>

                            <Box pb={6} pt={3}>
                                <Button ml={2} className={All.BtnStyle_4} disabled>
                                    <img style={{ paddingRight: 10 }} src={Location} />
                                    {el.joblocation}</Button>
                                <Button ml={2}  className={All.BtnStyle_4} disabled>
                                    <img style={{ paddingRight: 10 }} src={work} />
                                    {el.typeofrole}</Button>
                                <Button ml={2} variant="contained" color="default" type="submit"   className={All.BtnStyle_5}>
                                View Job</Button>  

                                </Box>
                            </Box>  
           </Box> 
           
           <Divider />
           </>
                // );
          ))}
            </div>
            {this.state.visible < this.state.hiredorners.length && 
               <Box py={6} textAlign={'center'}>
               <Button variant="contained" color="default" type="submit" onClick={this.loadMore} className={All.BtnStyle_5}>
                   <img style={{paddingRight:10}} src={DroneImg} />
                   Load More</Button>    
               </Box> 
            } 
            </>
                    )}/> 
</Col> 
            </Row>
        </Container> 


          </section>
          
          </>
  
      );
    }
  } 
 