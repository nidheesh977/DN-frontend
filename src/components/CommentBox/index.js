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
      comments_length : 0,
      comment_body: "",
      isLoading: false,

    };
  }

  componentDidMount(){
    
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    const urls = `https://demo-nexevo.in/haj/auth-app/public/api/auth/commentlisting/${this.props.passedVal}`;
    axios
      .get(urls, config)
      .then(res => {
        try{
          this.setState({ 
            comments: res.data,
            comments_length: res.data.length
          });
        }
        catch{
          
        }
      })

    axios.get("https://demo-nexevo.in/haj/auth-app/public/api/auth/user", config).then(
      (res) => {
        this.setState({ user_id: res.data.id });
      },
      (err) => {}
    );
  }

  postComment = (event) => {
    event.preventDefault()
    this.setState({
      comment_body: ""
    })
    console.log(this.state.comment_body)
    this.setState({
      isLoading: true
    })
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    axios
      .post(
        "https://demo-nexevo.in/haj/auth-app/public/api/auth/commentstore",
        {
          body: this.state.comment_body,
          user_id: this.state.user_id,
          post_id: this.props.passedVal,
        },
        config
      )
      .then((res) => {
        swal("Comment sent successfully", {
          icon: "success",
        });
        this.setState({
          isLoading: false
        })
        console.log(res)
        axios
        .get( `https://demo-nexevo.in/haj/auth-app/public/api/auth/commentlisting/${this.props.passedVal}`, config)
        .then((res) => {
          this.setState({
            comments: res.data,
            comments_length: res.data.length
          });
          this.setState({
            isLoading: false
          })
        });
        this.mainInput.value = "";
      })
      .catch(err => {
        swal("Comment not send", {
          icon: "error",
        });
        console.log(err)
        this.setState({
          isLoading: false
        })
        this.mainInput.value = "";
      })

      
  };

  commentChangeHandler = (e) => {
    this.setState({
      comment_body: e.target.value
    })
  }

  render() {
    var comments = this.state.comments
    var comments_length = this.state.comments_length
    var isLoading = this.state.isLoading
    var postComment = this.postComment
    var commentChangeHandler = this.commentChangeHandler
    let buttonText = "Show Comments";

    return (
      <div className="comment-box">
        <label className={`${All.Bold} ${All.paddingtop} ${All.paddingbottom}`}>
          {" "}
          {comments_length 
            ? <>{comments_length} Comments</>
            : <>No comments yet</>
          }
          {" "}
        </label>
        <>
          <form className="comment-form" onSubmit={postComment}>
            <div className="comment-form-fields">
              <textarea
                ref={(ref) => this.mainInput= ref}
                id = "comment_input"
                placeholder="Comment"
                name="body"
                rows="4"
                className={All.FormControl}
                onChange = {commentChangeHandler}
                required
              ></textarea>
            </div>
            <div className="comment-form-actions">
              {isLoading ? 
                <>
                  <Button
                    variant="contained"
                    color="default"
                    type="submit"
                    className={All.LoaderBtn}
                  >
                    <Loader /> Loading
                  </Button>
                </>
               : 
                <>
                  <Button
                    type="submit"
                    className={All.BtnStyle_5}
                  >
                    Post Comment
                  </Button>
                </>
              }
            </div>
          </form>
        </>
        <div className="comment-list">
          {comments.map((comment, index) => {
            return(
              <>
                <Box textAlign={"Left"} className="comment">
                  {comment.profile != "https://demo-nexevo.in/haj/auth-app/public/uploads/profile" && comment.profile
                    ?<img
                      class="alignleft"
                      src={comment.profile}
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
                    :<img
                      class="alignleft"
                      src="https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png"
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
                  }
                </Box>

                <Box pt={1}>
                  <label className={All.Bold}>{comment.name}</label>
                </Box>
                <Box className={`${All.DisplayFlex}  ${All.paddingtop} `}>
                  <label style={{ wordBreak: "break-all", width: "80%" }}>
                    - {comment.body}
                  </label>
                  <figcaption>
                    <span className="LikeIcon LikeIcon_slider MuliLight">
                      {" "}
                      <CommentLike id={comment.id} />
                    </span>
                  </figcaption>
                </Box>
              </>
            )
          })}
        </div>
      </div>
    );
  } // end render

  
}




export default CommentBox;
