import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import "../css/UserCategory.css"
import { Radio } from "@material-ui/core";


class UserCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      user_category: "pilot"
    }
  }

  componentWillMount(){
    try{
      this.setState({
        name: this.props.location.state.name,
        email: this.props.location.state.email,
        phone: this.props.location.state.phone,
        password: this.props.location.state.password,
      })
    }
    catch{
      this.props.history.push("/sign_up")
    }
  }


  userCategoryDivClick = (val) => {
    this.setState({
      user_category: val
    });
  }

  submitCategory = () => {
    console.log(this.state.name)
    console.log(this.state.email)
    console.log(this.state.phone)
    console.log(this.state.password)
    console.log(this.state.user_category)
  }

  render() {

    return (
      <Container className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`} id="user_category_container">

        <h2 className='user_categories_title'>Choose what are you looking for?</h2>
        <Row>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12} xs={12}>
            <div className='user_categories' onClick={() => this.userCategoryDivClick("pilot")}>
              {this.state.user_category == "pilot"
                ? <div className="u_c_r_icon_selected user_category_radio">
                  <div className="u_c_r_inner_selected"></div>
                </div>
                : <div className="u_c_r_icon  user_category_radio">
                  <div className="u_c_r_inner"></div>
                </div>
              }
              <div className='user_categories_subtitle'>Upload Ariel Shots</div>
              <div className="user_category_content">You will register as a drone piolet. Here you can Upload and sell your drone shots. Alse, you can apply all type of jobs [Full time, Part time & Freelance] and you can find service center.</div>
            </div>
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12} xs={12}>
            <div className='user_categories' onClick={() => this.userCategoryDivClick("service_center")}>
              {this.state.user_category == "service_center"
                ? <div className="u_c_r_icon_selected user_category_radio">
                  <div className="u_c_r_inner_selected"></div>
                </div>
                : <div className="u_c_r_icon  user_category_radio">
                  <div className="u_c_r_inner"></div>
                </div>
              }
              <div className='user_categories_subtitle'>Want to list the service center?</div>
              <div className="user_category_content">You will register as a drone piolet. Here you can Upload and sell your drone shots. Alse, you can apply all type of jobs [Full time, Part time & Freelance] and you can find service center.</div>
            </div>
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12} xs={12}>
            <div className='user_categories' onClick={() => this.userCategoryDivClick("visitor")}>
              {this.state.user_category == "visitor"
                ? <div className="u_c_r_icon_selected user_category_radio">
                  <div className="u_c_r_inner_selected"></div>
                </div>
                : <div className="u_c_r_icon  user_category_radio">
                  <div className="u_c_r_inner"></div>
                </div>
              }
              <div className='user_categories_subtitle'>Buy Creatives?</div>
              <div className="user_category_content">You will register as a drone piolet. Here you can Upload and sell your drone shots. Alse, you can apply all type of jobs [Full time, Part time & Freelance] and you can find service center.</div>
            </div>
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12} xs={12}>
            <div className='user_categories' onClick={() => this.userCategoryDivClick("company")}>
              {this.state.user_category == "company"
                ? <div className="u_c_r_icon_selected user_category_radio">
                  <div className="u_c_r_inner_selected"></div>
                </div>
                : <div className="u_c_r_icon  user_category_radio">
                  <div className="u_c_r_inner"></div>
                </div>
              }
              <div className='user_categories_subtitle'>Hire a pilot / post a job?</div>
              <div className="user_category_content">You will register as a drone piolet. Here you can Upload and sell your drone shots. Alse, you can apply all type of jobs [Full time, Part time & Freelance] and you can find service center.</div>
            </div>
          </Col>
          <Col xxl={4} xl={4} lg={6} md={6} sm={12} xs={12}>
            <div className='user_categories' onClick={() => this.userCategoryDivClick("candidate")}>
              {this.state.user_category == "candidate"
                ? <div className="u_c_r_icon_selected user_category_radio">
                  <div className="u_c_r_inner_selected"></div>
                </div>
                : <div className="u_c_r_icon  user_category_radio">
                  <div className="u_c_r_inner"></div>
                </div>
              }
              <div className='user_categories_subtitle'>Apply a job</div>
              <div className="user_category_content">You will register as a drone piolet. Here you can Upload and sell your drone shots. Alse, you can apply all type of jobs [Full time, Part time & Freelance] and you can find service center.</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="btn_container">
              <button className='user_category_submit' onClick={this.submitCategory}>Submit</button>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default UserCategory