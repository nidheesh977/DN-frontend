import React from 'react';
import { Link } from 'react-router-dom';
import All from '../website/All.module.css'
import {Helmet} from "react-helmet";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-grid-system';  
import Header from '../header/Header'

const NoPageFound = () => (
  <>
                 <Helmet> 
                <title>NoPageFound</title> 
                <meta charSet="utf-8" />
                <meta name="description" content="Nested component" />
            </Helmet>

            <Header />
<section className={All.PageNotFound} style={{ textAlign: 'center' , padding: '50px', margin: '50px' }}>
  <Container className={All.Container}>
    <Row>
      <Col>
      <Box pb={2}>
        <h1>Oops! Page not found</h1>
          </Box>
          <Box >
              <p className={All.MuliLight}>Sorry, the page you're looking for doesn't exit. If you think something is broken, report a problem</p> 
          </Box>

          <Box >
            <h1 className={All.Pagenotfound}>404</h1>
          </Box>

      <Box py={4}>
      <Link to="/">
            <Button className={All.BtnStyle_2}>Back to home</Button>
          </Link>
          <Link to="/">
            <Button className={All.BtnStyle_3}>Report</Button>
          </Link>
      </Box>
      </Col>
    </Row>
  </Container>
</section> 

  
  </>
);

export default NoPageFound;