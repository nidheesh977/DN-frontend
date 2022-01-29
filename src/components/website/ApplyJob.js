import React, {Component} from 'react'
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from './All.module.css'
import '../css/ApplyJob.css'

class ApplyJob extends Component{
  render(){
    return(
      <div>
        <Container className={All.Container}>
          <Row>
            <Col>
              <h1>Apply Jobs</h1>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default ApplyJob