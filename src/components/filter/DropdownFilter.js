 import React from 'react' 
 import './Filter.css' 
 import { Link } from 'react-router-dom'; 
const race = ['Shots', 'Member', 'Industry'];   


export default class DropdownFilter extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      haveText: ""
    }
  }

  render() {
    const {isOpen, haveText} = this.state;

    return (
      <div
        className={isOpen ? "dropdown searchbardropdown active" : "dropdown searchbardropdown"}
        onClick={this.handleClick} >
        <div className="dropdown__text">
          {!haveText ? "Shots" : haveText}
        </div>
        {this.itemList(race)} 
      </div>
    )
  }

 handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleText = (ev) => {
    this.setState({
      haveText: ev.currentTarget.textContent
    })
  }

  itemList = props => {
    const list = props.map((item) => (
       <Link to={item}> 
         <div
        onClick={this.handleText}
        className="dropdown__item"
        key={item.toString()}> 
        {item}
      </div>
     </Link>
       
    
    ));

    return (
      <div className="dropdown__items"> { list } </div>
    )
  }

} 

