import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-grid-system";
import "../uploadfile/FileUpload.css";
import "../website/upload.css";
import All from "../website/All.module.css";
import { Link } from "react-router-dom";
import Upload from "../images/upload.svg";
import swal from "sweetalert";
import $ from "jquery";
import axios from "axios";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { FormControl, Radio, RadioGroup } from "@material-ui/core";

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      caption: "",
      uploadingfile: "",
      uploaderror: false,
      fileextensionserror: false,
      errortypemsg: false,
      description: "",
      for_sales: "",
      category_id: "",
      comments: "",
      showerror: false,
      price: "",
      loaded: 0,
      submitDisabled: true,
      readOnly: true,
      file: "",
      dragOver: false,
      errorNoficication: null,
    };
    this.handleAddImage = this.handleAddImage.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleCancelUpload = this.handleCancelUpload.bind(this);
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ showerror: false });
    this.setState({ uploaderror: false });
    this.setState({ fileextensionserror: false });
    this.setState({ errortypemsg: false });
  };

  onChangeHandler = (event) => {
    var uploaded = $("#uploaded").val();
    let file = event.target.files[0];
    var filePath = file.value;
    if (file.size > 10e6) {
      this.setState({ uploaderror: true });
      return false;
    } else {
      var files = event.target.files;
      this.setState({ selectedFile: files, loaded: 0 });
    }
  };

  handleFileChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // this.setState({submitDisabled: ![e.target.name]});
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleChangefor_sale = (e) => {
    this.setState({ for_sale: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
    // this.setState({submitDisabled: ![e.target.name]});
  };

  handleChangess = (e) => {
    this.setState({ category_id: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeComments = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
    // this.setState({submitDisabled: ![event.target.name]});
  };

  CancelUpload = (e) => {
    swal({
      title: "Are you sure?",
      text: "Once reset, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  saveAll = () => {
    var uploaded = $("#uploaded").val();
    var caption = $("#caption").val();
    // var category_id = $('#category_id').val();
    var description = $("#description").val();
    // var comments = $('#comments').val();
    // var for_sales = $('#for_sales').val();

    if (
      this.state.file === "" ||
      caption == "" ||
      description == "" ||
      this.state.category_id === "" ||
      this.state.for_sales === ""
    ) {
      this.setState({ showerror: true });
    } else if (this.state.for_sales === "forsale") {
      if (this.state.price === "") {
        this.setState({ showerror: true });
      } else {
        const data = new FormData();
        for (var x = 0; x < this.state.file.length; x++) {
          data.append("file", this.state.file[x]);
        }

        for (let name in this.state) {
          data.append(name, this.state[name]);
        }
        swal({
          title: "Are you sure?",
          text: "Once Post, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            const config = {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
              },
            };
            axios
              .post(
                "http://localhost/auth-app/public/api/auth/post",
                data,
                config,
                {}
              )
              .then((res) => {
                swal(res.data.message, {
                  icon: "success",
                });
                window.location.reload();
                // data.reset();
              });
          } else {
            swal("Your imaginary file is safe!");
          }
        });
      }
    } else {
      const data = new FormData();
      for (var x = 0; x < this.state.file.length; x++) {
        data.append("file", this.state.file[x]);
      }

      for (let name in this.state) {
        data.append(name, this.state[name]);
      }
      swal({
        title: "Are you sure?",
        text: "Once Post, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const config = {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          };
          axios
            .post(
              "http://localhost/auth-app/public/api/auth/post",
              data,
              config,
              {}
            )
            .then((res) => {
              swal(res.data.message, {
                icon: "success",
              });
              window.location.reload();
              // data.reset();
            });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    }
  };
  download = () => {
    this.setState({ readOnly: true });
    document.getElementById("price").value = "";
  };

  forsale = () => {
    this.setState({ readOnly: false });
  };

  handleDragEnter(e) {
    e.preventDefault();
  }
  handleDragOver(e) {
    e.preventDefault();
    if (!this.state.dragOver) {
      this.setState({
        dragOver: true,
      });
    }
  }
  handleDragLeave(e) {
    e.preventDefault();
    this.setState({
      dragOver: false,
    });
  }
  handleDrop(e) {
    e.preventDefault();
    let file = e.target.files;
    alert(file);
    // Validate file is of type Image
    const fileTypes = file["type"];
    const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "video/mp4",
    ];
    if (!validImageTypes.includes(fileTypes)) {
      this.setState({
        file: null,
        errortypemsg: true,
        errorNotification: "Not an image File",
        dragOver: false,
      });
      return setTimeout(() => {
        this.setState({
          errorNotification: null,
        });
      }, 3000);
    }
    // this.refs.image.files = e.dataTransfer.files;
    // document.getElementById('upload-image-input').fileList =  e.dataTransfer.files[0];
    this.setState({
      file,
      dragOver: false,
    });
  }

  handleAddImage(e) {
    e.preventDefault();

    var uploaded = $("#uploaded").val();

    let file = this.refs.image.files[0];
    // Validate file is of type Image
    const fileType = file["type"];
    const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "video/mp4",
    ];
    if (!validImageTypes.includes(fileType)) {
      console.log("Not an image and video (mp4) file");
      this.setState({
        file: null,
        errortypemsg: true,
        errorNotification: "Not an image File",
        dragOverClass: "",
      });
      return setTimeout(() => {
        this.setState({
          errorNotification: null,
        });
      }, 3000);
    }

    this.setState({
      file,
    });
  }

  handleCancelUpload(e) {
    e.preventDefault();
    this.setState({
      file: null,
    });
  }

  render() {
    // Match drag over css to hover css
    let dragOverClass = this.state.dragOver
      ? `display-box drag-over`
      : `display-box`;

    // If file is set, change upload box text to file name
    let uploadText = this.state.file ? (
      <div>
        <h6>{this.state.file.name}</h6>
        <button
          className="cancel-upload-button btn btn-warning"
          onClick={this.handleCancelUpload}
        >
          Cancel
        </button>
      </div>
    ) : (
      <div>
        <p className={All.FSize_16}>
          <span style={{ color: "#67edfa" }} className={All.FSize_16}>
            browser
          </span>
          to choose a File <br />
          (1600×1200 or larger recommended, up to 10MB each)
          <span>
            <Link
              to="/UpgradeProVersion"
              style={{
                color: "#67edfa",
                textDecorationLine: "none",
                zIndex: 1,
                position: "relative",
              }}
              className={All.FSize_16}
            >
              {" "}
              Go Pro
            </Link>
          </span>
        </p>
      </div>
    );

    let errorNotification = this.state.errorNotification ? (
      <div className="error-notification">
        <p>{this.state.errorNotification}</p>
      </div>
    ) : null;

    return (
      <>
        <Helmet>
          <title>UploadFile</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>

        {this.state.showerror && (
          <Snackbar
            open={this.state.showerror}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert variant="filled" onClose={this.handleClose} severity="error">
              This is required feild!
            </Alert>
          </Snackbar>
        )}
        {this.state.uploaderror && (
          <Snackbar
            open={this.state.uploaderror}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert variant="filled" onClose={this.handleClose} severity="error">
              Please upload a file smaller than 10 MB
            </Alert>
          </Snackbar>
        )}
        {this.state.fileextensionserror && (
          <Snackbar
            open={this.state.fileextensionserror}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert variant="filled" onClose={this.handleClose} severity="error">
              Please upload file having extensions jpg|gif|png|jpeg|mov|MKV|mp4
              only.
            </Alert>
          </Snackbar>
        )}
        {errorNotification && (
          <Snackbar
            open={this.state.errortypemsg}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert variant="filled" onClose={this.handleClose} severity="error">
              {errorNotification}
            </Alert>
          </Snackbar>
        )}

        <section className={All.UploadFile}>
          <Container
            className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}
          >
            <Row className={All.margin_0}>
              <Col lg={8} className={`${All.Dragdrop} upload`}>
                <div className="image-uploader-wrapper">
                  <div className={dragOverClass}>
                    <div className="icon-text-box">
                      <div className="upload-icon">
                        <img src={Upload} />
                      </div>
                      <div className="upload-text">{uploadText}</div>
                    </div>
                    <div>
                      <input
                        type="file"
                        ref="image"
                        id="upload-image-input uploaded"
                        className="upload-image-input"
                        accept="video/*,image/*"
                        name="file"
                        onDrop={this.handleDrop}
                        onDragEnter={this.handleDragEnter}
                        onDragOver={this.handleDragOver}
                        onDragLeave={this.handleDragLeave}
                        onChange={this.handleAddImage}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                lg={4}
                className={` ${All.pl_lg_30} ${All.pl_xs_0} ${All.pr_xs_0} ${All.pl_md_0} ${All.pr_md_0} ${All.pl_sm_0} ${All.pr_sm_0}`}
              >
                <form className={All.form}>
                  <div className={All.FormGroup}>
                    <label for="usr">caption</label>
                    <input
                      type="text"
                      id="caption"
                      className={All.FormControl}
                      name="caption"
                      onChange={this.handleFileChange}
                    />
                  </div>

                  <div className={All.FormGroup}>
                    <FormControl component="fieldset" name="method-of-payment">
                      <RadioGroup
                        style={{ flexDirection: "row" }}
                        onChange={this.handleChangess}
                        id="category_id"
                        name="category_id"
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="Images"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="360°Image"
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="Video"
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="3D Model"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <div className={All.FormGroup}>
                    <label for="usr">Say about the shot</label>
                    <textarea
                      className={All.FormControl}
                      onChange={this.handleFileChange}
                      rows="4"
                      cols="50"
                      id="description"
                      name="description"
                    />
                  </div>

                  <div className={All.FormGroup}>
                    <label for="usr">Comments</label>
                    <FormControlLabel
                      className={All.Checkbox}
                      control={
                        <Checkbox
                          checked={this.state.comments}
                          onChange={this.handleChangeComments}
                          id="comments"
                          name="comments"
                        />
                      }
                      label="Close Comments"
                    />
                  </div>

                  <div className={All.FormGroup}>
                    <FormControl component="fieldset" name="method-of-payment">
                      <RadioGroup
                        style={{ flexDirection: "row" }}
                        onChange={this.handleChangefor_sale}
                        id="for_sales"
                        name="for_sales"
                      >
                        <FormControlLabel
                          value="forsale"
                          control={<Radio onClick={this.forsale} />}
                          label="For Sale"
                        />
                        <FormControlLabel
                          value="download"
                          control={<Radio onClick={this.download} />}
                          label="Download"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <div className={All.FormGroup}>
                    <label for="usr">Price</label>
                    <input
                      onChange={this.handleFileChange}
                      disabled={this.state.readOnly}
                      id="price"
                      type="number"
                      className={All.FormControl}
                      name="price"
                    />
                  </div>

                  <div className={All.Submit}>
                    <Link to="/UploadFile">
                      <Button
                        variant="contained"
                        color="default"
                        onClick={this.CancelUpload}
                        className={All.BtnStyle_4}
                      >
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      type="button"
                      color="default"
                      onClick={this.saveAll}
                      className={All.BtnStyle_5}
                    >
                      Publish
                    </Button>
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default UploadFile;
