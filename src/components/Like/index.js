import React ,{ useState, useReducer, useEffect} from 'react';
import axios from 'axios' 
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import classNames from "classnames";
import './index.css'

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: '',
      likes: null, 
      id: props.id, 
    };
  }

  componentDidMount(){ 
    let id = this.props.id  
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }  
 
          axios.get(`https://nexevo-demo.in/nidheesh/dn/auth-app/public/api/auth/user`, config)
        .then(res => this.setState({ user: res.data }, () => { 
                axios.get(`https://nexevo-demo.in/nidheesh/dn/auth-app/public/api/auth/likecheck/${id}/${res.data.id}`,config).then(res => res.data)
                       .then((data) => { 
                        this.setState({ liked: data.status }) 
                        })    
        })) 

 
    axios.get(`https://nexevo-demo.in/nidheesh/dn/auth-app/public/api/auth/postlikes/${id}`, config)
    .then(res => {    
      this.setState({likes:res.data.count }) 
    })
  }

  updateLikes = num => {
    let id = this.props.id

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    } 
    axios.get(`https://nexevo-demo.in/nidheesh/dn/auth-app/public/api/auth/post/like/${id}`, config)
    .then(res => {  
    })  

    this.setState({
      liked: !this.state.liked,
      likes: this.state.likes + num
    });
  };

  updateDislikes = num => {
    this.setState({
      disliked: !this.state.disliked,
      dislikes: this.state.dislikes + num
    });
  };

  onClickLike = () => { 
    const { liked, disliked } = this.state; 
      if (disliked) { 
        this.updateDislikes(-1);
      } 
      this.updateLikes(liked ? -1 : +1); 
  };
 

  render() {
    const { likes, dislikes, liked, disliked } = this.state;
    const likeClasses = classNames({
      btn: true,
      "btn-success": liked
    });
    const dislikeClasses = classNames({
      btn: true,
      "btn-danger": disliked
    });

    return (
      <div style={{display: 'flex',alignItems: 'center'}}> 
      <div style={{display: 'flex',marginLeft: '8px',alignItems:'center'}}> 
      <span class={likeClasses} onClick={this.onClickLike}>
                {this.state.liked == 1 ?  <Favorite /> : <FavoriteBorder/> } 
            </span> 
            <span>{likes}</span>
        </div>
        </div>
    );
  }
}
  export default Like
      
 


  