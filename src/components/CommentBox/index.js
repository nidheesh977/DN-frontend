import React, { useState } from "react";
import "./index.css";
import All from "../website/All.module.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import Loader from "../Loader/loader";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import CommentLike from "../CommentBox/CommentLike";

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: true,
      user_id: "",
      post_id: props.post_id,
      passedVal: "",
      comments: [],
      location: props.passedVal,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.passedVal) {
      this.setState({ location: nextProps.passedVal });
    }

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    const urls = `http://localhost/auth-app/public/api/auth/commentlisting/${nextProps.passedVal}`;
    axios
      .get(urls, config)
      .then((res) => res.data)
      .then((data) => {
        this.setState({ comments: data });
      });

    axios.get("http://localhost/auth-app/public/api/auth/user", config).then(
      (res) => {
        this.setState({ user_id: res.data.id });
      },
      (err) => {}
    );
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = "Show Comments";

    if (this.state.showComments) {
      buttonText = "Hide Comments";
      commentNodes = <div className="comment-list">{comments}</div>;
    }

    return (
      <div className="comment-box">
        <label className={`${All.Bold} ${All.paddingtop} ${All.paddingbottom}`}>
          {" "}
          {this._getCommentsTitle(comments.length)}{" "}
        </label>
        <CommentForm
          names={this.state.user_id}
          post={this.props.passedVal}
          addComment={this._addComment.bind(this)}
        />
        {commentNodes}
      </div>
    );
  } // end render

  _addComment(author, body, names, id, post_id) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body,
    };
    this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments,
    });
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment
          name={comment.name}
          body={comment.body}
          id={comment.id}
          key={comment.id}
          profile={comment.profile}
        />
      );
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return "No comments yet";
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }
} // end CommentBox component

function CommentForm(props) {
  const { register, handleSubmit, errors, watch, control } = useForm();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const handleClick = () => {
    setOpen(true);
  };

  const onSubmit = (event) => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    axios
      .post(
        "http://localhost/auth-app/public/api/auth/commentstore",
        {
          body: event.body,
          user_id: props.names,
          post_id: props.post,
        },
        config
      )
      .then((res) => {
        swal(res.data.message, {
          icon: "success",
        });
        window.location.reload();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <>
      <form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="comment-form-fields">
          <textarea
            placeholder="Comment"
            name="body"
            rows="4"
            className={All.FormControl}
            ref={register({ required: true })}
          ></textarea>
        </div>
        <div className="comment-form-actions">
          {isLoading ? (
            <>
              <Button
                variant="contained"
                color="default"
                type="submit"
                onClick={handleClick}
                className={All.LoaderBtn}
              >
                <Loader /> Loading
              </Button>
            </>
          ) : (
            <>
              <Button
                type="submit"
                onClick={handleClick}
                className={All.BtnStyle_5}
              >
                Post Comment
              </Button>
            </>
          )}
        </div>
      </form>
    </>
  );
}

class Comment extends React.Component {
  render() {
    return (
      <>
        <Box textAlign={"Left"} className="comment">
          <img
            class="alignleft"
            src={this.props.profile}
            alt="Image Sample 1"
            style={{
              display: "inline",
              float: "left",
              width: "45px",
              marginRight: "15px",
              marginTop: "25px",
              height: "45px",
              borderRadius: "100px",
            }}
          />
        </Box>

        <Box pt={1}>
          <label className={All.Bold}>{this.props.name}</label>
        </Box>
        <Box className={`${All.DisplayFlex}  ${All.paddingtop} `}>
          <label style={{ wordBreak: "break-all", width: "80%" }}>
            - {this.props.body}
          </label>
          <figcaption>
            <span className="LikeIcon LikeIcon_slider MuliLight">
              {" "}
              <CommentLike id={this.props.id} />
            </span>
          </figcaption>
        </Box>
      </>
    );
  }
}

export default CommentBox;
