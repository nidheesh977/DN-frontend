import React from 'react'
import Navbar from '../navbarmenu/Navbar' 
import Sidebar from '../navbarmenu/Sidebar'  
 

class Header extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isDesktop: false
      };

      this.updatePredicate = this.updatePredicate.bind(this);
    }

    componentDidMount(){
      if (localStorage.getItem("access_token") == undefined){
        localStorage.clear()
      }
    }

    componentDidMount() {
      this.updatePredicate();
      window.addEventListener("resize", this.updatePredicate);
    }
  
    componentWillUnmount() {
      window.removeEventListener("resize", this.updatePredicate);
    }
  
    updatePredicate() {
      this.setState({ isDesktop: window.innerWidth > 992 });
    }


    render(props) {
      const isDesktop = this.state.isDesktop;

      return (
        <div>
          {isDesktop ? (
            <Navbar auth ={this.props.auth}  />
          ) : (
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          )}
        </div>
      );
    }
  }


  export default Header
