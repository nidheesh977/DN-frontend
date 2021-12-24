import React from 'react';
import axios from 'axios'
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import classNames from "classnames";
import './index.css'

class CommentLike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: '',
      likes: null,
      id: props.id,
    };
  }

  componentDidMount() {
    let id = this.props.id
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }

    axios.get(`https://demo-nexevo.in/haj/auth-app/public/api/auth/user`, config)
      .then(res => {
        try {
          if (res.data.id){
            axios.get(`https://demo-nexevo.in/haj/auth-app/public/api/auth/commentcheck/${id}/${res.data.id}`, config).then(res => res.data)
            .then((res) => {
              if(res.data.status){
                this.setState({ liked: res.data.status })
              }
            })
          }
        }
        catch { 
          
        }
      })

    axios.get(`https://demo-nexevo.in/haj/auth-app/public/api/auth/commentlikes/${id}`, config)
      .then(res => {
        try{
          this.setState({ likes: res.data.count })
        }
        catch{}
      })
  }

  updateLikes = num => {
    let id = this.props.id

    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      }
    }
    axios.get(`https://demo-nexevo.in/haj/auth-app/public/api/auth/comment/like/${id}`, config)
      .then(res => {

        this.setState({
          liked: !this.state.liked,
          likes: this.state.likes + num
        });
      })
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', marginLeft: '8px', alignItems: 'center' }}>
          <span class={likeClasses} onClick={this.onClickLike}>
            {this.state.liked == 1 ? <Favorite /> : <FavoriteBorder />}
          </span>
          <span>{likes}</span>
        </div>
      </div>
    );
  }
}
export default CommentLike