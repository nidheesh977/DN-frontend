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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draft_count: 10,
      selected_tab: 1,
      files_selected: false,
      row_files: [],
      selected_files_preview: [],
      selected_files_details: [],
      selected_category: "all",
      files_count: 0,
      total_file_objects_count: 0,
      file_objects_count: 0,
      file_edit: 0,
      upload_choice: true,
      new_keyword: "",
      suggested_keywords: ["Areal View", "UAV", "Aviation", "Drone"],
      showEditOptions: "",
    };
  }

  componentDidMount() {
    document
      .getElementById("u_f_nav_link1")
      .classList.add("u_f_nav_link_selected");
  }

  changeTab = (tab) => {
    this.setState({
      selected_tab: tab,
    });
    document
      .getElementById("u_f_nav_link1")
      .classList.remove("u_f_nav_link_selected");
    document
      .getElementById("u_f_nav_link2")
      .classList.remove("u_f_nav_link_selected");
    document
      .getElementById("u_f_nav_link" + tab)
      .classList.add("u_f_nav_link_selected");
  };

  createFileObject = (files) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        var files_details = this.state.selected_files_details;
        files_details[this.state.total_file_objects_count].file = reader.result;
        this.setState({
          selected_files_details: files_details,
          file_objects_count: this.state.file_objects_count + 1,
          total_file_objects_count: this.state.total_file_objects_count + 1,
        });

        if (this.state.file_objects_count != this.state.files_count) {
          this.createFileObject(files);
        } else {
          this.setState({
            file_objects_count: 0,
          });
          this.refs.addFileRef.value = "";
        }
      }
    };
    reader.readAsDataURL(files[this.state.file_objects_count]);
  };

  chooseFiles = (e) => {
    var row_files = this.state.row_files;
    row_files.push(e.target.files);
    this.setState({
      row_files: row_files,
      files_count: e.target.files.length,
    });
    for (var i = 0; i < e.target.files.length; i++) {
      var details = this.state.selected_files_details;
      details.push({
        file: "",
        name: e.target.files[i].name,
        custom_name: e.target.files[i].name,
        type: e.target.files[i].type,
        size: e.target.files[i].size,
        usage: "free",
        price: "",
        category: "",
        experience: "",
        suggested_keywords: ["Areal View", "UAV", "Aviation", "Drone"],
        keywords: [],
        adult_content: false,
        select_type: e.target.files[i].type,
      });
      this.setState({
        selected_files_details: details,
      });
    }
    this.setState({
      files_selected: true,
    });
    this.createFileObject(e.target.files);
  };

  categoryChanged = (e) => {
    console.log(e.target.value);
    console.log(e.target);
    this.setState({
      selected_category: e.target.value,
    });
  };

  selectImage = (e, id) => {
    this.setState({
      file_edit: id,
    });
  };

  fileNameChange = (e) => {
    var files_details = this.state.selected_files_details;
    files_details[this.state.file_edit].custom_name = e.target.value;
    this.setState({
      selected_files_details: files_details,
    });
  };

  priceChange = (e) => {
    var files_details = this.state.selected_files_details;
    files_details[this.state.file_edit].price = e.target.value;
    this.setState({
      selected_files_details: files_details,
    });
  };

  categoryChange = (e) => {
    var files_details = this.state.selected_files_details;
    files_details[this.state.file_edit].category = e.target.value;
    this.setState({
      selected_files_details: files_details,
    });
  };

  experienceChange = (e) => {
    var files_details = this.state.selected_files_details;
    files_details[this.state.file_edit].experience = e.target.value;
    this.setState({
      selected_files_details: files_details,
    });
  };

  changeUsage = (usage) => {
    var files_details = this.state.selected_files_details;
    files_details[this.state.file_edit].usage = usage;
    this.setState({
      selected_files_details: files_details,
    });
  };

  selectImageType = (type) => {
    var files_details = this.state.selected_files_details;
    files_details[this.state.file_edit].select_type = type;
    this.setState({
      selected_files_details: files_details,
    });
  };

  changeAdultContent = () => {
    var files_details = this.state.selected_files_details;
    files_details[this.state.file_edit].adult_content =
      !files_details[this.state.file_edit].adult_content;
    this.setState({
      selected_files_details: files_details,
    });
  };

  continueEdit = () => {
    this.setState({
      upload_choice: false,
      selected_tab: 2,
    });
    document
      .getElementById("u_f_nav_link1")
      .classList.remove("u_f_nav_link_selected");
    document
      .getElementById("u_f_nav_link2")
      .classList.add("u_f_nav_link_selected");
  };

  uploadNew = () => {
    this.setState({
      upload_choice: false,
      selected_tab: 1,
    });
  };

  closeChoicePopup = () => {
    this.setState({
      upload_choice: false,
    });
  };

  fileNameShow = (id) => {
    document.getElementById("file_name_" + id).style.visibility = "visible";
    document.getElementById("file_adult_" + id).style.visibility = "visible";
    if (this.state.showEditOptions !== id) {
      document.getElementById("u_f_edit_icon_" + id).style.visibility =
        "visible";
    }
  };

  fileNameHide = (id) => {
    document.getElementById("file_name_" + id).style.visibility = "hidden";
    document.getElementById("file_adult_" + id).style.visibility = "hidden";
    document.getElementById("u_f_edit_icon_" + id).style.visibility = "hidden";
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
      !this.state.selected_files_details[
        this.state.file_edit
      ].keywords.includes(this.state.new_keyword)
    ) {
      var files_details = this.state.selected_files_details;
      files_details[this.state.file_edit].keywords.push(this.state.new_keyword);
      this.setState({
        selected_files_details: files_details,
      });
    }

    if (e.key == "Enter") {
      this.setState({
        new_keyword: "",
      });
    }
  };

  selectKeyword = (keyword, id) => {
    var files_details = this.state.selected_files_details;
    files_details[this.state.file_edit].suggested_keywords.splice(id, 1);
    files_details[this.state.file_edit].keywords.push(keyword);
    this.setState({
      selected_files_details: files_details,
    });
  };

  removeSelectedKeyword = (keyword) => {
    var selected_files_details = this.state.selected_files_details;
    var keywords =
      this.state.selected_files_details[this.state.file_edit].keywords;
    var index = keywords.indexOf(keyword);
    if (index > -1) {
      selected_files_details[this.state.file_edit].suggested_keywords.push(selected_files_details[this.state.file_edit].keywords[index]);
      selected_files_details[this.state.file_edit].keywords.splice(index, 1);
    }

    this.setState({
      selected_files_details: selected_files_details,
    });
  };

  showEditOptions = (id) => {
    this.setState({
      showEditOptions: id,
    });
    document.getElementById("u_f_edit_icon_" + id).style.visibility = "hidden";
  };

  hideEditOptions = (id) => {
    this.setState({
      showEditOptions: "",
    });
    document.getElementById("u_f_edit_icon_" + id).style.visibility = "visible";
  };

  removeFile = (id) => {
    if (this.state.total_file_objects_count == 1) {
      this.setState({
        files_selected: false,
        row_files: [],
        selected_files_preview: [],
        selected_files_details: [],
        selected_category: "all",
        files_count: 0,
        total_file_objects_count: 0,
        file_objects_count: 0,
        file_edit: 0,
        upload_choice: false,
        showEditOptions: "",
      });
      document.getElementById("u_f_post_name").value = "";
    } else {
      var row_files = this.state.row_files;
      var selected_files_preview = this.state.selected_files_preview;
      var selected_files_details = this.state.selected_files_details;
      row_files.splice(id, 1);
      selected_files_preview.splice(id, 1);
      selected_files_details.splice(id, 1);
      this.setState({
        row_files: row_files,
        selected_files_preview: selected_files_preview,
        selected_files_details: selected_files_details,
        total_file_objects_count: this.state.total_file_objects_count - 1,
        file_edit: 0,
      });
    }
  };

  changeFile = (e, id) => {
    var row_files = this.state.row_files;
    var details = this.state.selected_files_details;
    details[id].type = e.target.files[0].type;
    details[id].size = e.target.files[0].size;
    row_files[id] = e.target.files;
    this.setState({
      row_files: row_files,
    });
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        details[id].file = reader.result;
        this.setState({
          selected_files_details: details,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Post Edit</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <div
          id="upload_file"
          className={
            this.state.instructions ? "upload_inst_open" : "upload_inst_close"
          }
        >
          <div id="upload_file_nav">
            <span
              className="u_f_nav_link"
              id="u_f_nav_link1"
              onClick={() => this.changeTab(1)}
            >
              To Submit
            </span>
            <span
              className="u_f_nav_link"
              id="u_f_nav_link2"
              onClick={() => this.changeTab(2)}
            >
              Draft ({this.state.draft_count})
            </span>
          </div>
          <>
            <section className={All.UploadFile}>
              <Container
                className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}
              >
                <Row className={All.margin_0}>
                  <Col lg={8} className={`${All.Dragdrop} upload`}>
                    {this.state.selected_tab == "1" ? (
                      <div id="u_f_select_category_container">
                        {this.state.files_selected ? (
                          <>
                            <input
                              type="file"
                              name=""
                              id="add_files"
                              multiple
                              style={{ visibility: "hidden" }}
                              onChange={this.chooseFiles}
                              ref="addFileRef"
                            />
                            <label
                              style={{ display: "inline-block" }}
                              for="add_files"
                              id="u_f_add_more"
                            >
                              <i class="fas fa-plus u_f_add_more_icon"></i> Add
                              more
                            </label>
                          </>
                        ) : (
                          ""
                        )}
                        <select
                          name=""
                          id="u_f_select_category"
                          onChange={this.categoryChanged}
                        >
                          <option
                            value="all"
                            selected={this.state.selected_category == "all"}
                          >
                            All Files
                          </option>
                          <option
                            value="image"
                            selected={this.state.selected_category == "image"}
                          >
                            Image
                          </option>
                          <option
                            value="3d_image"
                            selected={
                              this.state.selected_category == "3d_image"
                            }
                          >
                            3D Image
                          </option>
                          <option
                            value="video"
                            selected={this.state.selected_category == "video"}
                          >
                            Video
                          </option>
                        </select>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="image-uploader-wrapper">
                      {!this.state.files_selected &&
                      this.state.selected_tab == 1 ? (
                        <div
                          className="display-box"
                          style={{
                            backgroundImage:
                              "url(" + this.state.uploadPreview + ")",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="icon-text-box">
                            <div className="upload-icon">
                              <img src={Upload} />
                            </div>
                            <div className="upload-text">
                              <div>
                                <p className={All.FSize_16}>
                                  <span
                                    style={{ color: "#67edfa" }}
                                    className={All.FSize_16}
                                  >
                                    Browse&nbsp;
                                  </span>
                                  to choose a File <br />
                                  If you want to upload more than limited size
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
                            </div>
                          </div>
                          <div>
                            {this.state.selected_category == "all" ? (
                              <>
                                <input
                                  type="file"
                                  ref="image"
                                  id="upload-image-input uploaded"
                                  className="upload-image-input"
                                  accept="video/mp4,video/x-m4v,video/*,image/*"
                                  name="file"
                                  multiple
                                  onChange={this.chooseFiles}
                                />
                              </>
                            ) : (
                              <>
                                {this.state.selected_category == "video" ? (
                                  <input
                                    type="file"
                                    ref="image"
                                    id="upload-image-input uploaded"
                                    className="upload-image-input"
                                    accept="video/mp4,video/x-m4v,video/*"
                                    name="file"
                                    multiple
                                    onChange={this.chooseFiles}
                                  />
                                ) : (
                                  <input
                                    type="file"
                                    ref="image"
                                    id="upload-image-input uploaded"
                                    className="upload-image-input"
                                    accept="image/*"
                                    name="file"
                                    multiple
                                    onChange={this.chooseFiles}
                                  />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <>
                          <Row id="u_f_preview_row">
                            {this.state.selected_files_details.map(
                              (file, index) => {
                                return (
                                  <Col
                                    xxl={6}
                                    xl={6}
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                  >
                                    <div
                                      className={
                                        this.state.file_edit == index
                                          ? "u_f_selected_file u_f_file_preview_container"
                                          : "u_f_file_preview_container"
                                      }
                                      onMouseDown={(e) => {
                                        this.selectImage(e, index);
                                      }}
                                      onMouseOver={() =>
                                        this.fileNameShow(index)
                                      }
                                      onMouseLeave={() =>
                                        this.fileNameHide(index)
                                      }
                                    >
                                      <div className="u_f_file_name_adult_container">
                                        <div
                                          className="u_f_file_name_on_file"
                                          id={"file_name_" + index}
                                        >
                                          {file.name}
                                        </div>
                                        {file.adult_content ? (
                                          <div
                                            className="u_f_file_adult"
                                            id={"file_adult_" + index}
                                          >
                                            Adult
                                          </div>
                                        ) : (
                                          <div id={"file_adult_" + index}></div>
                                        )}
                                      </div>

                                      {file.type[0] == "v" ? (
                                        <>
                                          <video src={file.file} />
                                        </>
                                      ) : (
                                        <>
                                          <img src={file.file} />
                                        </>
                                      )}
                                      <div
                                        className="u_f_edit_icon"
                                        id={`u_f_edit_icon_${index}`}
                                        onClick={() =>
                                          this.showEditOptions(index)
                                        }
                                      >
                                        <img src={moreIcon} alt="" />
                                      </div>
                                      {this.state.showEditOptions === index && (
                                        <div
                                          className="u_f_edit_content"
                                          onMouseLeave={() =>
                                            this.hideEditOptions(index)
                                          }
                                        >
                                          <label>
                                            <input
                                              type="file"
                                              name=""
                                              id=""
                                              accept="video/*,image/*"
                                              style={{ display: "none" }}
                                              onChange={(e) =>
                                                this.changeFile(e, index)
                                              }
                                            />
                                            <div className="u_f_edit_content_title">
                                              Change
                                            </div>
                                          </label>
                                          <div
                                            className="u_f_edit_content_title"
                                            onClick={() =>
                                              this.removeFile(index)
                                            }
                                          >
                                            Remove
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </Col>
                                );
                              }
                            )}
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
                      {this.state.files_selected ? (
                        <div className="u_f_form_row">
                          <div className="u_f_file">
                            {this.state.selected_files_details[
                              this.state.file_edit
                            ].type[0] == "v" ? (
                              <video
                                src={
                                  this.state.selected_files_details[
                                    this.state.file_edit
                                  ].file
                                }
                              />
                            ) : (
                              <img
                                src={
                                  this.state.selected_files_details[
                                    this.state.file_edit
                                  ].file
                                }
                              />
                            )}
                          </div>
                          <span className="u_f_filename">
                            {
                              this.state.selected_files_details[
                                this.state.file_edit
                              ].name
                            }
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
                      {this.state.files_selected ? (
                        <input
                          type="text"
                          name=""
                          id="u_f_post_name"
                          className="u_f_input_field"
                          value={
                            this.state.selected_files_details[
                              this.state.file_edit
                            ].custom_name
                          }
                          onChange={this.fileNameChange}
                        />
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
                      {this.state.files_selected ? (
                        <div className="u_f_input_keywords_container">
                          <div
                            className={
                              this.state.selected_files_details[
                                this.state.file_edit
                              ].select_type[0] == "i"
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
                              this.state.selected_files_details[
                                this.state.file_edit
                              ].select_type[0] == "v"
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
                              this.state.selected_files_details[
                                this.state.file_edit
                              ].select_type == "3D_image"
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
                          <div className="u_f_file_type" id="u_f_file_type4">
                            360 image
                          </div>
                        </div>
                      )}
                      <div className="u_f_input_title">Usage</div>
                      {this.state.files_selected ? (
                        <div className="u_f_input_keywords_container">
                          <div
                            className={
                              this.state.selected_files_details[
                                this.state.file_edit
                              ].usage == "free"
                                ? "u_f_file_usage_selected u_f_file_usage premium_file_type"
                                : "u_f_file_usage"
                            }
                            id="u_f_file_usage1"
                            onClick={() => this.changeUsage("free")}
                          >
                            Free
                          </div>
                          <div
                            className={
                              this.state.selected_files_details[
                                this.state.file_edit
                              ].usage == "paid"
                                ? "u_f_file_usage_selected u_f_file_usage premium_file_type"
                                : "u_f_file_usage"
                            }
                            id="u_f_file_usage2"
                            onClick={() => this.changeUsage("paid")}
                          >
                            Paid
                          </div>
                        </div>
                      ) : (
                        <div className="u_f_input_keywords_container">
                          <div className="u_f_file_usage" id="u_f_file_usage1">
                            Free
                          </div>
                          <div className="u_f_file_usage" id="u_f_file_usage2">
                            Paid
                          </div>
                        </div>
                      )}
                      {/* <div className="u_f_input_title">Price(Dollars)</div>
                      {this.state.files_selected
                        ? <><input type="number" name="" id="u_f_price" className='u_f_input_field' value={this.state.selected_files_details[this.state.file_edit].price} onChange={this.priceChange} disabled={this.state.selected_files_details[this.state.file_edit].usage == 'free'} /></>
                        : <input type="number" name="" id="u_f_price" className='u_f_input_field' disabled/>
                      } */}
                      <div className="u_f_input_title">Category</div>
                      {this.state.files_selected ? (
                        <input
                          type="text"
                          name=""
                          id="u_f_category"
                          className="u_f_input_field"
                          value={
                            this.state.selected_files_details[
                              this.state.file_edit
                            ].category
                          }
                          onChange={this.categoryChange}
                        />
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
                        <span className="u_f_input_title_optional">
                          (Optional)
                        </span>
                      </div>
                      {this.state.files_selected ? (
                        <textarea
                          name=""
                          id="u_f_textarea"
                          cols="30"
                          rows="10"
                          className="u_f_textarea"
                          value={
                            this.state.selected_files_details[
                              this.state.file_edit
                            ].experience
                          }
                          onChange={this.experienceChange}
                        ></textarea>
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
                        disabled={!this.state.files_selected}
                        value={this.state.new_keyword}
                      />
                      {this.state.files_selected && (
                        <div className="u_f_input_keywords_container">
                          {this.state.selected_files_details[
                            this.state.file_edit
                          ].keywords.map((keyword, index) => {
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
                      {this.state.files_selected ? (
                        <div className="u_f_input_keywords_container">
                          {this.state.selected_files_details[
                            this.state.file_edit
                          ].suggested_keywords.map((keyword, index) => {
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
                          })}
                        </div>
                      ) : (
                        <div className="u_f_input_keywords_container">
                          {this.state.suggested_keywords.map(
                            (keyword, index) => {
                              return (
                                <div
                                  className="u_f_input_keywords"
                                >
                                  {keyword} <i class="fas fa-plus"></i>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                      <div className="u_f_input_title">Content </div>
                      {this.state.files_selected ? (
                        <div className="u_f_input_18plus">
                          <label>
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              onChange={this.changeAdultContent}
                              checked={
                                this.state.selected_files_details[
                                  this.state.file_edit
                                ].adult_content
                              }
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
                        <button id="u_f_save_draft">Save Draft</button>
                        <button id="u_f_submit">Publish</button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
              <Dialog
                open={this.state.upload_choice}
                onClose={this.closeChoicePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"md"}
                fullWidth={true}
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
                      onClick={this.closeChoicePopup}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title">
                      You have draft files in your account. Do you want to
                      continue upload
                    </div>
                    <div className="u_f_popup_btn_container">
                      <button
                        className="u_f_popup_btn1"
                        onClick={this.continueEdit}
                      >
                        Continue edit
                      </button>
                      <button
                        className="u_f_popup_btn2"
                        onClick={this.uploadNew}
                      >
                        Upload new
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

export default UploadFiles;
