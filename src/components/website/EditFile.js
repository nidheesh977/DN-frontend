import React, { Component } from "react";
import UploadFileInstruction from "./UploadFileInstruction";
import "../css/UploadFiles.css";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-grid-system";
import "../uploadfile/FileUpload.css";
import "../website/upload.css";
import All from "../website/All.module.css";
import { Link } from "react-router-dom";
import Upload from "../images/upload.svg";
import addMore from "../images/u_f_plus.png";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Close from "../images/close.svg";
import { withStyles } from "@material-ui/core/styles";
import moreIcon from "../images/Path.svg";
import axios from "axios";
import Select from "react-select";

const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

class EditFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row_files: [],
      selected_files_details: [],
      files_count: 0,
      total_file_objects_count: 0,
      file_objects_count: 0,
      file_edit: 0,
      new_keyword: "",
      suggested_keywords: [],
      industryOptions: [],
      error: false,
      loading: true,
      file: {},
      fileChanged: false,
      editFilePopup: false
    };
  }

  componentDidMount() {
    axios
      .get(`${domain}/api/image/getImage/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res);
        let file = {
          name: res.data[0].postName,
          custom_name: res.data[0].postName,
          file: `https://dn-nexevo-original-files.s3.ap-south-1.amazonaws.com/${res.data[0].file}`,
          filePath: res.data[0].file,
          keywords: res.data[0].keywords,
          select_type: res.data[0].fileType,
          category: res.data[0].category,
          experience: res.data[0].experience,
          adult_content: res.data[0].adult,
          type: res.data[0].fileType,
          resolution_satisfied: true,
        };

        this.setState({
          file: file,
        });
        this.setState({
          loading: false,
        });

        axios.get(`${domain}/api/industry/getIndustries`).then((res) => {
          this.setState({
            industries: res.data,
          });
          const options = this.state.industries.map((d) => ({
            value: d.industry,
            label: d.industry,
          }));
          this.setState({
            industryOptions: options,
          });
        });
        axios.get(`${domain}/api/keyword/getKeywords`).then((res) => {
          let keywords = [];
          for (let i = 0; i < res.data.length; i++) {
            keywords.push(res.data[i].keyword);
          }
          this.setState({
            suggested_keywords: keywords,
          });
        });
      })
      .catch((err) => {
        this.props.history.push("/no-page-found");
      });
  }

  fileNameChange = (e) => {
    var files_details = this.state.file;
    files_details.custom_name = e.target.value;

    this.setState({
      file: files_details,
    });
  };

  categoryChange = (e) => {
    var files_details = this.state.file;
    files_details.category = e.value;

    this.setState({
      file: files_details,
    });
  };

  customStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#999999" : null,
        color: "#333333",
      };
    },
  };

  experienceChange = (e) => {
    var files_details = this.state.file;
    files_details.experience = e.target.value;

    this.setState({
      file: files_details,
    });
  };

  selectImageType = (type) => {
    if (this.state.file.select_type !== "video" && type !== "video"){
    var files_details = this.state.file;
    files_details.select_type = type;
    this.setState({
      file: files_details,
    });
  }
  };

  changeAdultContent = () => {
    var files_details = this.state.file;
    files_details.adult_content = !files_details.adult_content;
    this.setState({
      file: files_details,
    });
  };

  newKeywordChange = (e) => {
    this.setState({
      new_keyword: e.target.value,
    });
  };

  checkNewKeywordSubmit = (e) => {
    if (
      e.key == "Enter" &&
      this.state.new_keyword != "" &&
      !this.state.file.keywords.includes(this.state.new_keyword)
    ) {
      var files_details = this.state.file;
      files_details.keywords.push(this.state.new_keyword);
      this.setState({
        file: files_details,
      });
    }

    if (e.key == "Enter") {
      this.setState({
        new_keyword: "",
      });
    }
  };

  selectKeyword = (keyword, id) => {
    var files_details = this.state.file;
    var suggested_keywords = this.state.suggested_keywords;
    suggested_keywords.splice(id, 1);
    files_details.keywords.push(keyword);
    this.setState({
      file: files_details,
      suggested_keywords: suggested_keywords,
    });
  };

  removeSelectedKeyword = (keyword) => {
    var selected_files_details = this.state.file;
    var keywords = this.state.file.keywords;
    var index = keywords.indexOf(keyword);
    var suggested_keywords = this.state.suggested_keywords;
    if (index > -1) {
      suggested_keywords.push(selected_files_details.keywords[index]);
      selected_files_details.keywords.splice(index, 1);
    }

    this.setState({
      file: selected_files_details,
      suggested_keywords: suggested_keywords,
    });
  };

  changeFile = (e, id) => {
    
    if (e.target.files[0]) {
      var file = this.state.file;
      var selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          file.file = reader.result;
          file.size = selectedFile.size;
          file.row = selectedFile;
          if (selectedFile.type[0] === "v") {
            file.select_type = "video";
            file.type = "video";
          } else {
            file.select_type = "image";
            file.type = "image";
          }
          this.setState({
            file: file,
            fileChanged: true,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);

      if (e.target.files[0].type[0] !== "v") {
        let img = new Image();
        img.src = window.URL.createObjectURL(e.target.files[0]);
        img.onload = () => {
          if (img.width < 1100 || img.height < 500) {
            let files = this.state.file;
            files.resolution_satisfied = false;
            this.setState({
              file: files,
            });
          } else {
            let files = this.state.file;
            files.resolution_satisfied = true;
            this.setState({
              file: files,
            });
          }
        };
      } else {
        let files = this.state.file;
        files.resolution_satisfied = true;
        this.setState({
          file: files,
        });
      }
    }
  };

  publish = () => {
    var file = this.state.file;
    file.error = false;
    this.setState({
      file: file,
    });

    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    if (file.name === "") {
      file.error = true;
    } else if (file.keywords.length === 0) {
      file.error = true;
    } else if (file.type === "") {
      file.error = true;
    } else if (file.type === "") {
      file.type = true;
    } else if (file.category === "") {
      file.category = true;
    } else if (file.experience === "") {
      file.error = true;
    }

    this.setState({
      file: file,
    });

    if (!file.error && file.resolution_satisfied) {
      if (!this.state.fileChanged) {
        file.upload_status = "uploading";
        this.setState({
          file: file,
        });

        var fileDetails = {
          postName: file.name,
          file: file.filePath,
          keywords: file.keywords,
          fileType: file.type,
          category: file.category,
          experience: file.experience,
          adult: file.adult_content,
        };

        axios
          .post(
            `${domain}/api/image/editImage1/${this.props.match.params.id}`,
            fileDetails,
            config
          )
          .then((res) => {
            console.log(res.data);
            file.upload_status = "uploaded";
            this.setState({
              file: file,
            });
            this.props.history.goBack()
          })
          .catch((err) => {
            console.log(err);
            file.upload_status = "upload_failed";
            this.setState({
              file: file,
            });
          });
      } else {
        if (
          (file.type[0] === "v" && file.size / 1000000 <= 10) ||
          (file.type[0] !== "v" && file.size / 1000000 <= 2)
        ) {
          var formData = new FormData();
          formData.append("postName", file.name);
          console.log(file.row);
          formData.append("file", file.row);
          formData.append("keywords", file.keywords);
          formData.append("fileType", file.type);
          formData.append("category", file.category);
          formData.append("experience", file.experience);
          formData.append("adult", file.adult_content);

          axios
            .post(
              `${domain}/api/image/editImage/${this.props.match.params.id}`,
              formData,
              config
            )
            .then((res) => {
              console.log(res.data);
              file.upload_status = "uploaded";
              this.setState({
                file: file,
              });
              this.props.history.goBack()
            })
            .catch((err) => {
              console.log(err);
              file.upload_status = "upload_failed";
              this.setState({
                file: file,
              });
            });
        }
      }
    }
  };

  render() {
    let file = this.state.file;
    return (
      <>
        <Helmet>
          <title>Edit file</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <div
          id="upload_file"
          className={
            this.state.instructions ? "upload_inst_open" : "upload_inst_close"
          }
        >
          <>
            <section className={All.UploadFile}>
              <Container
                className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}
              >
                <Row className={All.margin_0}>
                  <Col lg={8} className={`${All.Dragdrop} upload`}>
                    <div className="image-uploader-wrapper">
                      {!this.state.loading && (
                        <>
                          <Row id="u_f_preview_row">
                            <>
                              <Col
                                xxl={12}
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                id={`u_f_file_edit`}
                              >
                                <div
                                  style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                    borderRight: "10px",
                                    border: "2px solid #f5f5f7",
                                  }}
                                >
                                  <div className="u_f_file_name_adult_container">
                                    {file.category ? (
                                      <div
                                        className="u_f_file_name_on_file"
                                        style={{ visibility: "visible" }}
                                      >
                                        {this.state.file.category}
                                      </div>
                                    ) : (
                                      <div id={"file_name"}></div>
                                    )}
                                    {file.adult_content ? (
                                      <div
                                        className="u_f_file_adult"
                                        id={"file_adult"}
                                        style={{ visibility: "visible" }}
                                      >
                                        Adult
                                      </div>
                                    ) : (
                                      <div id={"file_adult"}></div>
                                    )}
                                  </div>

                                  {file.type[0] === "v" ? (
                                    <>
                                      <video
                                        src={`${file.file}`}
                                        style={{
                                          borderRadius: "9px",
                                          objectFit: "cover",
                                          width: "100%",
                                        }}
                                      />
                                      {file.upload_status === "uploading" && (
                                        <>
                                          <div className="u_f_uploading_border"></div>
                                          <div className="u_f_upload_percentage">
                                            75%
                                          </div>
                                        </>
                                      )}
                                      {file.upload_status === "uploaded" && (
                                        <>
                                          <div className="u_f_upload_success_border"></div>
                                          <div className="u_f_upload_success_tick">
                                            <i
                                              class="fa fa-check"
                                              aria-hidden="true"
                                            ></i>
                                          </div>
                                        </>
                                      )}
                                      {file.size / 1000000 > 10 && (
                                        <>
                                          <div className="u_f_size_exceed_border"></div>
                                          <div className="u_f_size_exceed_close">
                                            <i
                                              class="fa fa-times"
                                              aria-hidden="true"
                                              style={{ fontSize: "25px" }}
                                            ></i>
                                          </div>
                                          <div className="u_f_size_exceed_msg">
                                            Size excided
                                          </div>
                                        </>
                                      )}
                                      {!file.resolution_satisfied &&
                                        file.size / 1000000 <= 10 && (
                                          <>
                                            <div className="u_f_size_exceed_border"></div>
                                            <div className="u_f_size_exceed_close">
                                              <i
                                                class="fa fa-times"
                                                aria-hidden="true"
                                                style={{
                                                  fontSize: "25px",
                                                }}
                                              ></i>
                                            </div>
                                            <div
                                              className="u_f_size_exceed_msg"
                                              style={{
                                                fontSize: "11px",
                                              }}
                                            >
                                              File Resolution should be minimum
                                              1100x500
                                            </div>
                                          </>
                                        )}
                                    </>
                                  ) : (
                                    <>
                                      <img
                                        src={`${file.file}`}
                                        style={{
                                          borderRadius: "9px",
                                          objectFit: "cover",
                                          width: "100%",
                                        }}
                                      />
                                      {file.upload_status === "uploading" && (
                                        <>
                                          <div className="u_f_uploading_border"></div>
                                          <div className="u_f_upload_percentage">
                                            75%
                                          </div>
                                        </>
                                      )}
                                      {file.upload_status === "uploaded" && (
                                        <>
                                          <div className="u_f_upload_success_border"></div>
                                          <div className="u_f_upload_success_tick">
                                            <i
                                              class="fa fa-check"
                                              aria-hidden="true"
                                            ></i>
                                          </div>
                                        </>
                                      )}
                                      {file.upload_status ===
                                        "upload_failed" && (
                                        <i
                                          class="fa fa-times-circle"
                                          aria-hidden="true"
                                          style={{
                                            position: "absolute",
                                            top: "calc(50% - 50px)",
                                            left: "calc(50% - 50px)",
                                            color: "red",
                                            fontSize: "100px",
                                            opacity: "0.7",
                                          }}
                                        ></i>
                                      )}
                                      {file.size / 1000000 > 2 && (
                                        <>
                                          <div className="u_f_size_exceed_border"></div>
                                          <div className="u_f_size_exceed_close">
                                            <i
                                              class="fa fa-times"
                                              aria-hidden="true"
                                              style={{
                                                fontSize: "25px",
                                              }}
                                            ></i>
                                          </div>
                                          <div className="u_f_size_exceed_msg">
                                            Size exceeded
                                          </div>
                                        </>
                                      )}
                                      {!file.resolution_satisfied &&
                                        (file.size / 1000000 <= 2 ||
                                          !this.state.fileChanged) && (
                                          <>
                                            <div className="u_f_size_exceed_border"></div>
                                            <div className="u_f_size_exceed_close">
                                              <i
                                                class="fa fa-times"
                                                aria-hidden="true"
                                                style={{
                                                  fontSize: "25px",
                                                }}
                                              ></i>
                                            </div>
                                            <div
                                              className="u_f_size_exceed_msg"
                                              style={{
                                                fontSize: "11px",
                                              }}
                                            >
                                              File Resolution should be minimum
                                              1100x500
                                            </div>
                                          </>
                                        )}
                                    </>
                                  )}

                                  <div className="u_f_edit_content">
                                      <div className="u_f_edit_content_title" onClick = {()=>this.setState({editFilePopup: true})}>
                                        Change
                                      </div>
                                      <input
                          type="file"
                          name="edit_file"
                          id="edit_file"
                          accept="video/*,image/*"
                          style={{ display: "none" }}
                          onChange={(e) => this.changeFile(e)}
                        />
                                  </div>
                                </div>
                              </Col>
                            </>
                          </Row>
                        </>
                      )}
                    </div>
                  </Col>
                  <Col
                    lg={4}
                    className={` ${All.pl_lg_30} ${All.pl_xs_0} ${All.pr_xs_0} ${All.pl_md_0} ${All.pr_md_0} ${All.pl_sm_0} ${All.pr_sm_0}`}
                  >
                    <div id="u_f_details_input">
                      {!this.state.loading ? (
                        <div className="u_f_form_row">
                          <div className="u_f_file">
                            {this.state.file.type[0] == "v" ? (
                              this.state.fileChanged ? (
                                <video src={`${file.file}`} />
                              ) : (
                                <video
                                  src={`https://dn-nexevo-thumbnail.s3.ap-south-1.amazonaws.com/${file.filePath}`}
                                />
                              )
                            ) : this.state.fileChanged ? (
                              <img src={`${file.file}`} />
                            ) : (
                              <img
                                src={`https://dn-nexevo-thumbnail.s3.ap-south-1.amazonaws.com/${file.filePath}`}
                              />
                            )}
                          </div>
                          <span className="u_f_filename">
                            {this.state.file.name}
                          </span>
                        </div>
                      ) : (
                        <div className="u_f_form_row">
                          <div className="u_f_file">
                            <span id="u_f_file_skeleton"></span>
                          </div>
                          <span className="u_f_filename">File name</span>
                        </div>
                      )}
                      <div className="u_f_input_title">Post name</div>
                      {!this.state.loading ? (
                        <>
                          <input
                            type="text"
                            name=""
                            id="u_f_post_name"
                            className="u_f_input_field"
                            value={this.state.file.custom_name}
                            onChange={this.fileNameChange}
                          />
                          {this.state.file.error === true &&
                            this.state.file.custom_name === "" && (
                              <div className="u_f_error_msg">
                                Post name is required
                              </div>
                            )}
                        </>
                      ) : (
                        <input
                          type="text"
                          name=""
                          id="u_f_post_name"
                          className="u_f_input_field"
                          disabled
                        />
                      )}
                      <div className="u_f_input_title">File type</div>
                      {!this.state.loading ? (
                        <div className="u_f_input_keywords_container">
                          <div
                            className={
                              this.state.file.select_type[0] == "i"
                                ? "u_f_file_type u_f_file_usage_selected"
                                : "u_f_file_type"
                            }
                            id="u_f_file_type1"
                            onClick={() => this.selectImageType("image")}
                          >
                            Images
                          </div>
                          <div
                            className={
                              this.state.file.select_type[0] === "v"
                                ? "u_f_file_type u_f_file_usage_selected"
                                : "u_f_file_type"
                            }
                            id="u_f_file_type2"
                            onClick={() => this.selectImageType("video")}
                          >
                            Videos
                          </div>
                          <div
                            className={
                              this.state.file.select_type === "3D_image"
                                ? "u_f_file_type u_f_file_usage_selected"
                                : "u_f_file_type"
                            }
                            id="u_f_file_type3"
                            onClick={() => this.selectImageType("3D_image")}
                          >
                            3D Images
                          </div>
                        </div>
                      ) : (
                        <div className="u_f_input_keywords_container">
                          <div className="u_f_file_type" id="u_f_file_type1">
                            Images
                          </div>
                          <div className="u_f_file_type" id="u_f_file_type2">
                            Videos
                          </div>
                          <div className="u_f_file_type" id="u_f_file_type3">
                            3D Images
                          </div>
                        </div>
                      )}

                      <div className="u_f_input_title">Industry</div>
                      {!this.state.loading ? (
                        <>
                          <Select
                            options={this.state.industryOptions}
                            onChange={this.categoryChange}
                            styles={this.customStyles}
                            value={{
                              value: this.state.file.category,
                              label: this.state.file.category,
                            }}
                            className="u_f_category_dropdown"
                          />
                          <div style={{ marginBottom: "30px" }}></div>
                          {/* <input
                            type="text"
                            name=""
                            id="u_f_category"
                            className="u_f_input_field"
                            value={
                              this.state.file.category
                            }
                            onChange={this.categoryChange}
                          /> */}
                          {this.state.file.error === true &&
                            this.state.file.category === "" && (
                              <div className="u_f_error_msg">
                                Industry is required
                              </div>
                            )}
                        </>
                      ) : (
                        <input
                          type="text"
                          name=""
                          id="u_f_category"
                          className="u_f_input_field"
                          disabled
                        />
                      )}
                      <div className="u_f_input_title">
                        Explore your experience{" "}
                      </div>
                      {!this.state.loading ? (
                        <>
                          <textarea
                            name=""
                            id="u_f_textarea"
                            cols="30"
                            rows="10"
                            className="u_f_textarea"
                            value={this.state.file.experience}
                            onChange={this.experienceChange}
                          ></textarea>
                          {this.state.file.error === true &&
                            this.state.file.experience === "" && (
                              <div className="u_f_error_msg">
                                Experience is required
                              </div>
                            )}
                        </>
                      ) : (
                        <textarea
                          name=""
                          id="u_f_textarea"
                          cols="30"
                          rows="10"
                          className="u_f_textarea"
                          disabled
                        ></textarea>
                      )}
                      <div className="u_f_input_title">Keywords</div>
                      <input
                        type="text"
                        name=""
                        id="u_f_new_keyword"
                        className="u_f_input_field"
                        onChange={this.newKeywordChange}
                        onKeyUp={this.checkNewKeywordSubmit}
                        disabled={this.state.loading}
                        value={this.state.new_keyword}
                        placeholder="Type and press enter to select."
                      />

                      {!this.state.loading && (
                        <div className="u_f_input_keywords_container">
                          {this.state.file.error === true &&
                            this.state.file.keywords.length === 0 && (
                              <div className="u_f_error_msg">
                                Select atleast one keyword.
                              </div>
                            )}
                          {this.state.file.keywords.map((keyword, index) => {
                            return (
                              <div
                                className="u_f_input_keywords"
                                onClick={() =>
                                  this.removeSelectedKeyword(keyword)
                                }
                              >
                                {keyword}{" "}
                                <i class="fa fa-check" aria-hidden="true"></i>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div className="u_f_input_title">Suggested</div>
                      {!this.state.loading ? (
                        <div className="u_f_input_keywords_container">
                          {this.state.suggested_keywords.map(
                            (keyword, index) => {
                              return (
                                <div
                                  className="u_f_input_keywords"
                                  onClick={() =>
                                    this.selectKeyword(keyword, index)
                                  }
                                >
                                  {keyword} <i class="fas fa-plus"></i>
                                </div>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        <div className="u_f_input_keywords_container">
                          {this.state.suggested_keywords.map(
                            (keyword, index) => {
                              return (
                                <div className="u_f_input_keywords">
                                  {keyword} <i class="fas fa-plus"></i>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                      <div className="u_f_input_title">Content </div>
                      {!this.state.loading ? (
                        <div className="u_f_input_18plus">
                          <label>
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              onChange={this.changeAdultContent}
                              checked={this.state.file.adult_content}
                            />
                            Confirm 18+ viewable?
                          </label>
                        </div>
                      ) : (
                        <div className="u_f_input_18plus">
                          <label>
                            <input type="checkbox" name="" id="" disabled />
                            Confirm 18+ viewable?
                          </label>
                        </div>
                      )}
                      <div id="u_f_btn">
                        <button id="u_f_submit" onClick={this.publish}>
                          Save changes
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
              <Dialog
                open={this.state.editFilePopup}
                onClose={() => this.setState({ editFilePopup: false })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth={true}
                PaperProps={{
                  style: {
                    maxWidth: "820px",
                    borderRadius: "10px",
                  },
                }}
              >
                <DialogContent
                  className={All.PopupBody}
                  style={{ marginBottom: "50px" }}
                >
                  <div
                    style={{ position: "absolute", top: "20px", right: "20px" }}
                  >
                    <img
                      src={Close}
                      alt=""
                      onClick={() => this.setState({ editFilePopup: false })}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title">
                      Your Image views, downloads, likes and comments will be
                      reseted
                    </div>
                    <div className="u_f_popup_btn_container">
                      <button
                        className="u_f_popup_btn1"
                        onClick={()=>this.setState({
                          editFilePopup: false
                        })}
                      >
                        <label style = {{cursor: "pointer"}} htmlFor="edit_file">
                       
                          Continue
                        </label>
                      </button>
                      <button
                        className="u_f_popup_btn2"
                        onClick={() => this.setState({ editFilePopup: false })}
                      >
                        Cancel
                      </button>
                    </div>
                  </Row>
                </DialogContent>
              </Dialog>
            </section>
          </>
        </div>
      </>
    );
  }
}

export default EditFile;
