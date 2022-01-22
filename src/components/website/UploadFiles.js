import React, { Component } from 'react'
import UploadFileInstruction from './UploadFileInstruction'
import "../css/UploadFiles.css"
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-grid-system";
import "../uploadfile/FileUpload.css";
import "../website/upload.css";
import All from "../website/All.module.css";
import { Link } from "react-router-dom";
import Upload from "../images/upload.svg";
import addMore from '../images/u_f_plus.png'

class UploadFiles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      instructions: true,
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
      file_edit: 0
    }
  }

  componentDidMount() {
    document.getElementById("u_f_nav_link1").classList.add("u_f_nav_link_selected")
  }

  goToPage = () => {
    this.setState({
      instructions: false,
    })
  }

  changeTab = (tab) => {
    this.setState({
      selected_tab: tab
    })
    document.getElementById('u_f_nav_link1').classList.remove("u_f_nav_link_selected")
    document.getElementById('u_f_nav_link2').classList.remove("u_f_nav_link_selected")
    document.getElementById("u_f_nav_link" + tab).classList.add("u_f_nav_link_selected")
  }

  createFileObject = (files) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        var files_details = this.state.selected_files_details
        files_details[this.state.total_file_objects_count].file = reader.result
        this.setState({
          selected_files_details: files_details,
          file_objects_count: this.state.file_objects_count + 1,
          total_file_objects_count: this.state.total_file_objects_count+1
        })

        if (this.state.file_objects_count != this.state.files_count) {
          this.createFileObject(files)
        }
        else{
          this.setState({
            file_objects_count: 0
          })
        }
      }
    }
    reader.readAsDataURL(files[this.state.file_objects_count])
  }

  chooseFiles = (e) => {
    var row_files = this.state.row_files
    row_files.push(e.target.files)
    this.setState({
      row_files: row_files,
      files_count: e.target.files.length,
    })
    for (var i = 0; i < e.target.files.length; i++) {
      var details = this.state.selected_files_details
      details.push({"file":"", "name": e.target.files[i].name, "type": e.target.files[i].type, "size": e.target.files[i].size, "usage": 'free', "price": "", "category": "", 'experience': "", 'key_words': [], 'suggested': [], 'adult_content': false })
      this.setState({
        selected_files_details: details
      })
    }
    this.setState({
      files_selected: true
    })
    this.createFileObject(e.target.files)
  }

  categoryChanged = (e) => {
    console.log(e.target.value)
    console.log(e.target)
    this.setState({
      selected_category: e.target.value
    })
  }

  selectImage = (id) => {
    this.setState({
      file_edit: id
    })
  }

  fileNameChange = (e) => {
    var files_details = this.state.selected_files_details
    files_details[this.state.file_edit].name = e.target.value
    this.setState({
      selected_files_details: files_details
    })
  }

  priceChange = (e) => {
    var files_details = this.state.selected_files_details
    files_details[this.state.file_edit].price = e.target.value
    this.setState({
      selected_files_details: files_details
    })
  }

  categoryChange = (e) => {
    var files_details = this.state.selected_files_details
    files_details[this.state.file_edit].category = e.target.value
    this.setState({
      selected_files_details: files_details
    })
  }

  experienceChange = (e) => {
    var files_details = this.state.selected_files_details
    files_details[this.state.file_edit].experience = e.target.value
    this.setState({
      selected_files_details: files_details
    })
  }

  changeUsage = (usage) => {
    var files_details = this.state.selected_files_details
    files_details[this.state.file_edit].usage = usage
    this.setState({
      selected_files_details: files_details
    })
  }


  render() {
    console.log(this.state.file_objects_count)
    return (
      <>
        <Helmet>
          <title>Post Edit</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
        <div id="upload_file" className={this.state.instructions ? "upload_inst_open" : "upload_inst_close"}>

          {this.state.instructions
            && <UploadFileInstruction button={<button className='upload_inst_btn' onClick={this.goToPage}>Go to upload page</button>} />
          }
          <div id="upload_file_nav">
            <span className='u_f_nav_link' id='u_f_nav_link1' onClick={() => this.changeTab(1)}>To Submit</span>
            <span className='u_f_nav_link' id='u_f_nav_link2' onClick={() => this.changeTab(2)}>Draft ({this.state.draft_count})</span>
          </div>
          <>
            <section className={All.UploadFile}>
              <Container
                className={`${All.Container} ${All.pr_xs_50} ${All.pl_xs_50}`}
              >

                <Row className={All.margin_0}>

                  <Col lg={8} className={`${All.Dragdrop} upload`}>
                    {this.state.selected_tab == "1"
                      ? <div id="u_f_select_category_container">
                        {this.state.files_selected
                        ?<>
                          <input type="file" name="" id="add_files" multiple style = {{visibility: "hidden"}} onChange = {this.chooseFiles}/>
                          <label style = {{display: "inline-block"}} for = "add_files" id='u_f_add_more'>
                            Add more
                          </label>
                        </>
                        :""}
                        <select name="" id="u_f_select_category" onChange={this.categoryChanged}>
                          <option value="all" selected={this.state.selected_category == "all"}>All Files</option>
                          <option value="image" selected={this.state.selected_category == "image"}>Image</option>
                          <option value="3d_image" selected={this.state.selected_category == "3d_image"}>3D Image</option>
                          <option value="360_image" selected={this.state.selected_category == "360_image"}>360 Image</option>
                          <option value="video" selected={this.state.selected_category == "video"}>Video</option>
                        </select>
                      </div>
                      : ""}
                    <div className="image-uploader-wrapper">
                      {!this.state.files_selected && this.state.selected_tab == 1
                        ? <div className="display-box" style={{ backgroundImage: "url(" + this.state.uploadPreview + ")", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
                          <div className="icon-text-box">
                            <div className="upload-icon">
                              <img src={Upload} />
                            </div>
                            <div className="upload-text">
                              <div>
                                <p className={All.FSize_16}>
                                  <span style={{ color: "#67edfa" }} className={All.FSize_16}>
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
                            {this.state.selected_category == "all"
                              ? <>
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
                              : <>
                                {this.state.selected_category == "video"
                                  ? <input
                                    type="file"
                                    ref="image"
                                    id="upload-image-input uploaded"
                                    className="upload-image-input"
                                    accept="video/mp4,video/x-m4v,video/*"
                                    name="file"
                                    multiple
                                    onChange={this.chooseFiles}
                                  />
                                  : <input
                                    type="file"
                                    ref="image"
                                    id="upload-image-input uploaded"
                                    className="upload-image-input"
                                    accept="image/*"
                                    name="file"
                                    multiple
                                    onChange={this.chooseFiles}
                                  />
                                }
                              </>
                            }
                          </div>
                        </div>
                        :<>
                          <Row id = 'u_f_preview_row'>
                            {this.state.selected_files_details.map((file, key) => {
                              return (
                                <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={6}>
                                  <div className={this.state.file_edit == key ? "u_f_selected_file u_f_file_preview_container" : "u_f_file_preview_container"} onClick={() => { this.selectImage(key) }}>
                                    {file.type[0] == "v"
                                      ? <>
                                          <video src={file.file} />
                                        </>
                                      : <>
                                          <img src={file.file} className={this.state.file_edit == key ? "u_f_selected_file" : ""} />
                                        </>
                                    }
                                  </div>
                                </Col>
                              )
                            })}
                          </Row>
                        </>
                      }
                    </div>
                  </Col>
                  <Col
                    lg={4}
                    className={` ${All.pl_lg_30} ${All.pl_xs_0} ${All.pr_xs_0} ${All.pl_md_0} ${All.pr_md_0} ${All.pl_sm_0} ${All.pr_sm_0}`}
                  >
                    <div id="u_f_details_input">
                      {this.state.files_selected
                        ? <div className="u_f_form_row">
                          <div className='u_f_file'>
                            {this.state.selected_files_details[this.state.file_edit].type[0] == "v"
                              ? <video src={this.state.selected_files_details[this.state.file_edit].file} />
                              : <img src={this.state.selected_files_details[this.state.file_edit].file} />
                            }
                          </div>
                          <span className='u_f_filename'>{this.state.selected_files_details[this.state.file_edit].name}</span>
                        </div>
                        : <div className="u_f_form_row">
                          <div className='u_f_file'>

                            <span id="u_f_file_skeleton"></span>
                          </div>
                          <span className='u_f_filename'>File name</span>
                        </div>
                      }
                      <div className="u_f_input_title">Post name</div>
                      {this.state.files_selected
                        ? <input type="text" name="" id="u_f_post_name" className='u_f_input_field' value={this.state.selected_files_details[this.state.file_edit].name} onChange={this.fileNameChange} />
                        : <input type="text" name="" id="u_f_post_name" className='u_f_input_field' disabled/>
                      }
                      <div className="u_f_input_title">File type</div>
                      <div className='u_f_file_type' id="u_f_file_type1">Images</div>
                      <div className='u_f_file_type' id="u_f_file_type2">Videos</div>
                      <div className='u_f_file_type' id="u_f_file_type3">3D Images</div>
                      <div className='u_f_file_type' id="u_f_file_type4">360 image</div>
                      <div className="u_f_input_title">Usage</div>
                      {this.state.files_selected
                      ?<><div className={this.state.selected_files_details[this.state.file_edit].usage == "free"?'u_f_file_usage_selected u_f_file_usage': "u_f_file_usage"} id="u_f_file_usage1" onClick = {() => this.changeUsage("free")}>Free</div>
                      <div className={this.state.selected_files_details[this.state.file_edit].usage == "paid"?'u_f_file_usage_selected u_f_file_usage': "u_f_file_usage"}  id="u_f_file_usage2" onClick = {() => this.changeUsage("paid")}>Paid</div></>
                      :<><div className="u_f_file_usage" id="u_f_file_usage1">Free</div>
                      <div className='u_f_file_usage' id="u_f_file_usage2">Paid</div></>
                      }
                      <div className="u_f_input_title">Price(Dollars)</div>
                      {this.state.files_selected
                        ? <><input type="number" name="" id="u_f_price" className='u_f_input_field' value={this.state.selected_files_details[this.state.file_edit].price} onChange={this.priceChange} disabled = {this.state.selected_files_details[this.state.file_edit].usage == 'free'} /></>
                        : <input type="number" name="" id="u_f_price" className='u_f_input_field' />
                      }
                      <div className="u_f_input_title">Category</div>
                      {this.state.files_selected
                        ? <input type="text" name="" id="u_f_category" className='u_f_input_field' value={this.state.selected_files_details[this.state.file_edit].category} onChange={this.categoryChange} />
                        : <input type="text" name="" id="u_f_category" className='u_f_input_field' />
                      }
                      <div className="u_f_input_title">Explore your experience <span>(Optional)</span></div>
                      {this.state.files_selected
                        ? <textarea name="" id="u_f_textarea" cols="30" rows="10" className='u_f_textarea' value={this.state.selected_files_details[this.state.file_edit].experience} onChange={this.experienceChange}></textarea>
                        : <textarea name="" id="u_f_textarea" cols="30" rows="10" className='u_f_textarea'></textarea>
                      }
                      <div className="u_f_input_title">Keywords</div>
                      <div className="u_f_input_keywords">Areal view</div>
                      <div className="u_f_input_keywords">UAV</div>
                      <div className="u_f_input_keywords">Aviation</div>
                      <div className="u_f_input_keywords">Drone</div>
                      <div className="u_f_input_title">Suggested</div>
                      <div className="u_f_input_keywords">Areal view</div>
                      <div className="u_f_input_keywords">UAV</div>
                      <div className="u_f_input_keywords">Aviation</div>
                      <div className="u_f_input_keywords">Drone</div>
                      <div className="u_f_input_title">Content</div>
                      <div className="u_f_input_title"><label><input type="checkbox" name="" id="" />Confirm 18+ viewable?</label></div>

                      <div id="u_f_btn">
                        <button id="u_f_save_draft">Save Draft</button>
                        <button id="u_f_submit">Publish</button>
                      </div>

                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </>
        </div>
      </>
    )
  }
}

export default UploadFiles