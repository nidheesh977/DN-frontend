import React, {Component} from 'react'
import Close from "../images/close.svg";

class Message extends Component{
 constructor(props){
   super(props)
   this.state = {
      messages: [1,2,3,4,5,6,7,8,9,10],
      containerStyle: {},
      closeMsg: true
   }
 }

 closeMessage = () => {
   if(this.state.closeMsg){
     this.setState({
       containerStyle: {
         height: "10px"
       }
     })
   }
   else{
    this.setState({
      containerStyle: {}
    })
   }
 }

 render(){
   return(
    <div className="p_d_message_container" style = {this.state.containerStyle}>
    <div className="p_d_message_user_details">
      <div className="p_d_message_user_image_container">
        <img
          src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png"
          alt=""
          className="p_d_message_user_image"
        />
      </div>
      <div className="p_d_message_user_title">Messaging</div>
      <div className="p_d_message_close_container">
        <img
          src={Close}
          alt=""
          className="p_d_message_close"
          height={"15px"}
          onClick={this.closeMessage}
        />
      </div>
    </div>
    <div className="p_d_message_input_container">
      <input
        type="text"
        className="p_d_message_search"
        placeholder="Search keywords"
      />
    </div>
    {this.state.messages.map((message, index) => {
      return (
        <div className="p_d_message_recieve_container">
          <div className="p_d_message_sender_img_container">
            <img
              src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png"
              alt=""
              className="p_d_message_sender_img"
            />
          </div>
          <div className="p_d_message_content_container">
            <div
              style={{
                width: "240px",
                paddingRight: "10px",
                paddingLeft: "15px",
              }}
            >
              <div className="p_d_message_sender_name">
                User
              </div>
              <div className="p_d_message_text">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </div>
            </div>
            <div className="p_d_message_time">Jan 27</div>
          </div>
        </div>
      );
    })}
  </div>
   )
 }
}

export default Message