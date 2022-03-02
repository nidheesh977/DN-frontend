import React, { Component } from "react";
import { Row, Col, Container } from "react-grid-system";
import "../css/UploadFileInstruction.css";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Close from "../images/close.svg";
import All from "../website/All.module.css";
import { withStyles } from "@material-ui/core/styles";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

class UploadFileInstruction extends Component {
  render() {
    return (
      <div>
        {/* <Container>
          <h2 className="upload_inst_title1">Show your talent to this world</h2>
          <div className="upload_inst_content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt
            in ea corrupti earum neque harum, debitis, voluptas commodi quas
            quae facilis officia reiciendis distinctio vel molestias
            perspiciatis dolores magni ipsum.
          </div>
          <h3 className="upload_inst_title2">Terms</h3>
          <h5 className="upload_inst_title3">Video</h5>
          <div className="upload_inst_content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            ipsum doloremque cupiditate rerum iusto quas, ut labore nobis
            excepturi nihil beatae eos consectetur odit vero eaque odio. Eius,
            sit voluptas.
          </div>
          <Row>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
          </Row>
          <h5 className="upload_inst_title3">Image</h5>
          <div className="upload_inst_content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            ipsum doloremque cupiditate rerum iusto quas, ut labore nobis
            excepturi nihil beatae eos consectetur odit vero eaque odio. Eius,
            sit voluptas.
          </div>
          <Row>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
          </Row>
          <h5 className="upload_inst_title3">3D Image</h5>
          <div className="upload_inst_content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            ipsum doloremque cupiditate rerum iusto quas, ut labore nobis
            excepturi nihil beatae eos consectetur odit vero eaque odio. Eius,
            sit voluptas.
          </div>
          <Row>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
          </Row>
          <h3 className="upload_inst_title2">Reason for Rejection</h3>
          <Row>
            <span className="upload_inst_error">Size excided</span>
            <span className="upload_inst_error">Size excided</span>
            <span className="upload_inst_error">Size excided</span>
            <span className="upload_inst_error">Size excided</span>
          </Row>
          <div className="upload_inst_btn_continer">{this.props.button}</div>
        </Container> */}

        <Dialog
          open={true}
          onClose={this.closeChoicePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          repositionOnUpdate={false}
          
          PaperProps={{
            style: { maxWidth: "820px", borderRadius: "10px", padding: "0px" },
          }}
        >
          <DialogContent
            className={All.PopupBody}
            style={{ marginTop: "32px", padding: "0px!important" }}
          >
            <h2 className="upload_inst_title1">Show your talent to this world</h2>
          <div className="upload_inst_content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt
            in ea corrupti earum neque harum, debitis, voluptas commodi quas
            quae facilis officia reiciendis distinctio vel molestias
            perspiciatis dolores magni ipsum.
          </div>
          <h3 className="upload_inst_title2">Terms</h3>
          <h5 className="upload_inst_title3">Video</h5>
          <div className="upload_inst_content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            ipsum doloremque cupiditate rerum iusto quas, ut labore nobis
            excepturi nihil beatae eos consectetur odit vero eaque odio. Eius,
            sit voluptas.
          </div>
          <Row>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
          </Row>
          <h5 className="upload_inst_title3">Image</h5>
          <div className="upload_inst_content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            ipsum doloremque cupiditate rerum iusto quas, ut labore nobis
            excepturi nihil beatae eos consectetur odit vero eaque odio. Eius,
            sit voluptas.
          </div>
          <Row>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
          </Row>
          <h5 className="upload_inst_title3">3D Image</h5>
          <div className="upload_inst_content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            ipsum doloremque cupiditate rerum iusto quas, ut labore nobis
            excepturi nihil beatae eos consectetur odit vero eaque odio. Eius,
            sit voluptas.
          </div>
          <Row>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={6}>
              <img
                src={
                  "https://colorlib.com/wp/wp-content/uploads/sites/2/jquery-file-upload-scripts.png"
                }
                className="upload_inst_img"
                width="100%"
              />
            </Col>
          </Row>
          <h3 className="upload_inst_title2">Reason for Rejection</h3>
          <Row>
            <span className="upload_inst_error">Size excided</span>
            <span className="upload_inst_error">Size excided</span>
            <span className="upload_inst_error">Size excided</span>
            <span className="upload_inst_error">Size excided</span>
          </Row>
          <div className="upload_inst_btn_continer">{this.props.button}</div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default UploadFileInstruction;
