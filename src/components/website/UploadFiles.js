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

class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draft_count: 0,
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
      upload_choice: false,
      new_keyword: "",
      suggested_keywords: ["Areal View", "UAV", "Aviation", "Drone"],
      showEditOptions: "",
      error: false,
      industries: [],
      industryOptions: [],
      resolutionCheckCount: 0,
      file_count_exceed: false,
      subscribed: false,
      subscription_popup: false,
      subscription_msg: "",
      imageLimit: 0,
      videoLimit: 0,
      img3dLimit: 0,
    };
  }

  componentDidMount() {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios
      .get(`${domain}/api/pilotSubscription/getMySubscription`, config)
      .then((res) => {
        if(typeof(res.data.images)=== "number"){
          console.log("ImagesThere")
          this.setState({
            imageLimit: res.data.subscription.images - res.data.images,
            videoLimit: res.data.subscription.videos - res.data.videos,
            img3dLimit: res.data.subscription.images3d - res.data.images3d,
          });
        }
      
        console.log(res)
        // console.log(res.data.subscription.videos)
        // console.log(res.data.subscription.)
      }).catch(err=>{
        console.log(err)
      })

    axios
      .get(`${domain}/api/user/getUserData`, config)
      .then((res) => {
        console.log(res.data);
        this.setState({
          subscribed: res.data.pilotPro,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    document
      .getElementById("u_f_nav_link1")
      .classList.add("u_f_nav_link_selected");
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
    axios.post(`${domain}/api/draft/getDrafts`, config).then((res) => {
      this.setState({
        draft_count: res.data.length,
      });
      if (res.data.length >= 1) {
        this.setState({
          upload_choice: true,
        });
      }
    });
  }

  changeTab = (tab) => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    if (tab === 1 && this.state.selected_tab !== 1) {
      this.setState({
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
        new_keyword: "",
        showEditOptions: "",
        error: false,
        resolutionCheckCount: 0,
      });
    }

    if (tab === 2 && this.state.selected_tab !== 2) {
      this.setState({
        selected_tab: 2,
        files_selected: false,
        row_files: [],
        selected_files_preview: [],
        selected_files_details: [],
        selected_category: "all",
        files_count: 0,
        total_file_objects_count: 0,
        file_objects_count: 0,
        file_edit: 0,
        new_keyword: "",
        showEditOptions: "",
        error: false,
        resolutionCheckCount: 0,
      });
      axios
        .post(`${domain}/api/draft/getDrafts`, config)
        .then((res) => {
          console.log(res.data);
          let files = [];
          for (var i = 0; i < res.data.length; i++) {
            let keywords = [];
            for (let j = 0; j < this.state.suggested_keywords.length; j++) {
              keywords.push(this.state.suggested_keywords[j]);
            }

            var file = {
              file: `https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${res.data[i].file}`,
              filePath: `${res.data[i].file}`,
              row: res.data[i].file,
              name: res.data[i].postName,
              custom_name: res.data[i].postName,
              type: res.data[i].fileType,
              experience: res.data[i].experience,
              keywords: res.data[i].keywords,
              adult: res.data[i].adult,
              category:
                res.data[i].category !== "undefined"
                  ? res.data[i].category
                  : "",
              resolution_satisfied: true,
              suggested_keywords: keywords,
              select_type: res.data[i].fileType,
              // size: res.data.file.size,
              draft: true,
              draft_changed: false,
              industryOptions: this.state.industryOptions,
              upload_status: "selected",
              id: res.data[i]._id,
            };
            files.push(file);
          }
          console.log(files);
          this.setState({
            selected_files_details: files,
          });
          if (files.length > 0) {
            this.setState({
              files_selected: true,
            });
          }
        })
        .catch((err) => {
          console.log(err.data);
        });
    }

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

  checkResolution = () => {
    if (
      this.state.resolutionCheckCount < this.state.selected_files_details.length
    ) {
      // setTimeout(()=>{
      //   console.log(document.getElementById("u_f_video_0").videoHeight)
      //   console.log(document.getElementById("u_f_video_0").videoWidth)
      // },1000)
      if (
        this.state.selected_files_details[this.state.resolutionCheckCount]
          .select_type[0] !== "v"
      ) {
        let resolution_satisfied = true;
        let img = new Image();
        img.src = window.URL.createObjectURL(
          this.state.selected_files_details[this.state.resolutionCheckCount].row
        );
        img.onload = () => {
          if (img.width < 1100 || img.height < 500) {
            resolution_satisfied = false;
          } else {
            resolution_satisfied = true;
          }
          let files = this.state.selected_files_details;
          files[this.state.resolutionCheckCount].resolution_satisfied =
            resolution_satisfied;
          this.setState({
            selected_files_details: files,
            resolutionCheckCount: this.state.resolutionCheckCount + 1,
          });
          setTimeout(() => {
            this.checkResolution();
          }, 20);
        };
      } else {
        this.setState({
          resolutionCheckCount: this.state.resolutionCheckCount + 1,
        });
        setTimeout(() => {
          this.checkResolution();
        }, 20);
      }
    }
  };

  createFileObject = (files) => {
    const reader = new FileReader();
    reader.onload = (e) => {
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
          this.checkResolution();
        }
      }
    };
    reader.readAsDataURL(files[this.state.file_objects_count]);
  };

  chooseFiles = (e) => {
    if (
      !this.state.subscribed &&
      e.target.files.length + this.state.selected_files_details.length > 1
    ) {
      this.setState({
        subscription_popup: true,
        subscription_msg: "Upgrade to upload multiple files",
      });
      // document.getElementById(e.target.id).value = ""
      e.target.value = "";
    } else {
      console.log("selected");
      if (
        this.state.selected_files_details.length + e.target.files.length >
        20
      ) {
        this.setState({ file_count_exceed: true });
      } else {
        var row_files = this.state.row_files;
        row_files.push(e.target.files);
        this.setState({
          row_files: row_files,
          files_count: e.target.files.length,
        });
        for (var i = 0; i < e.target.files.length; i++) {
          // let resolution_satisfied = true
          // let img = new Image();
          // img.src = window.URL.createObjectURL(e.target.files[0]);
          // img.onload = () => {
          //   alert(img.width + " " + img.height);
          //   if (img.width < 1100 || img.height < 500){
          //     resolution_satisfied = false
          //   }
          //   else{
          //     resolution_satisfied = true
          //   }
          // };
          var details = this.state.selected_files_details;
          var keywords = [];
          for (var j = 0; j < this.state.suggested_keywords.length; j++) {
            keywords.push(this.state.suggested_keywords[j]);
          }

          details.push({
            file: "",
            name: e.target.files[i].name,
            custom_name: "",
            type: e.target.files[i].type,
            size: e.target.files[i].size,
            usage: "free",
            price: "",
            category: "",
            experience: "",
            suggested_keywords: keywords,
            keywords: [],
            adult_content: false,
            select_type: e.target.files[i].type,
            row: e.target.files[i],
            upload_status: "selected",
            resolution_satisfied: true,
            draft: false,
          });
          this.setState({
            selected_files_details: details,
          });
        }
        this.setState({
          files_selected: true,
        });
        this.createFileObject(e.target.files);
      }
    }
  };

  categoryChanged = (e) => {
    this.setState({
      selected_category: e.target.value,
    });
  };
  //yaseen

  customStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#999999" : null,
        color: "#333333",
      };
    },
  };
  colourStyles = {
    menuList: (styles) => ({
      ...styles,
      background: "papayawhip",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused
        ? "hsla(291, 64%, 42%, 0.5)"
        : isSelected
        ? "hsla(291, 64%, 42%, 1)"
        : undefined,
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

  //yaseen
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

  categoryChange = (value) => {
    var files_details = this.state.selected_files_details;
    files_details[this.state.file_edit].category = value;

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
    if (
      this.state.selected_files_details[this.state.file_edit].select_type[0] ===
        "i" &&
      (type === "image" || type === "3d")
    ) {
      var files_details = this.state.selected_files_details;
      files_details[this.state.file_edit].select_type = type;
      this.setState({
        selected_files_details: files_details,
      });
    } else if (
      this.state.selected_files_details[this.state.file_edit].select_type[0] ===
        "3" &&
      (type === "image" || type === "3d")
    ) {
      var files_details = this.state.selected_files_details;
      files_details[this.state.file_edit].select_type = type;
      this.setState({
        selected_files_details: files_details,
      });
    }
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
    document
      .getElementById("u_f_nav_link1")
      .classList.remove("u_f_nav_link_selected");
    document
      .getElementById("u_f_nav_link2")
      .classList.add("u_f_nav_link_selected");

    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    this.setState({
      selected_tab: 2,
      files_selected: false,
      row_files: [],
      selected_files_preview: [],
      selected_files_details: [],
      selected_category: "all",
      files_count: 0,
      total_file_objects_count: 0,
      file_objects_count: 0,
      file_edit: 0,
      new_keyword: "",
      showEditOptions: "",
      error: false,
      resolutionCheckCount: 0,
      upload_choice: false,
    });
    axios
      .post(`${domain}/api/draft/getDrafts`, config)
      .then((res) => {
        console.log(res.data);
        let files = [];
        for (var i = 0; i < res.data.length; i++) {
          let keywords = [];
          for (let j = 0; j < this.state.suggested_keywords.length; j++) {
            keywords.push(this.state.suggested_keywords[j]);
          }

          var file = {
            file: `https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${res.data[i].file}`,
            filePath: `${res.data[i].file}`,
            row: res.data[i].file,
            name: res.data[i].postName,
            custom_name: res.data[i].postName,
            type: res.data[i].fileType,
            experience: res.data[i].experience,
            keywords: res.data[i].keywords,
            adult: res.data[i].adult,
            adult_content: res.data[i].adult,
            category:
              res.data[i].category !== "undefined" ? res.data[i].category : "",
            resolution_satisfied: true,
            suggested_keywords: keywords,
            select_type: res.data[i].fileType,
            // size: res.data.file.size,
            draft: true,
            draft_changed: false,
            industryOptions: this.state.industryOptions,
            upload_status: "selected",
            id: res.data[i]._id,
          };
          files.push(file);
        }
        console.log(files);
        this.setState({
          selected_files_details: files,
        });
        this.setState({
          files_selected: true,
        });
      })
      .catch((err) => {
        console.log(err.data);
      });
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
      selected_files_details[this.state.file_edit].suggested_keywords.push(
        selected_files_details[this.state.file_edit].keywords[index]
      );
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

  removeFile = (id, fileId) => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    if (this.state.selected_files_details.length == 1) {
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
        resolutionCheckCount: 0,
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
        resolutionCheckCount: this.state.resolutionCheckCount - 1,
      });
    }
    if (this.state.selected_tab === 2) {
      axios
        .post(`${domain}/api/draft/deleteDraft`, { id: fileId }, config)
        .then((res) => {
          console.log(res);
          this.setState({
            draft_count: this.state.draft_count - 1,
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  changeFile = (e, id) => {
    var row_files = this.state.row_files;
    var details = this.state.selected_files_details;
    details[id].type = e.target.files[0].type;
    details[id].size = e.target.files[0].size;
    details[id].row = e.target.files[0];
    row_files[id] = e.target.files;
    this.setState({
      row_files: row_files,
    });
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (details[id].draft === true) {
          details[id].draft_changed = true;
        }
        details[id].file = reader.result;
        this.setState({
          selected_files_details: details,
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    if (e.target.files[0].type[0] !== "v") {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      img.onload = () => {
        if (img.width < 1100 || img.height < 500) {
          let files = this.state.selected_files_details;
          files[id].resolution_satisfied = false;
          this.setState({
            selected_files_details: files,
          });
        } else {
          let files = this.state.selected_files_details;
          files[id].resolution_satisfied = true;
          this.setState({
            selected_files_details: files,
          });
        }
      };
    } else {
      let files = this.state.selected_files_details;
      files[id].resolution_satisfied = true;
      this.setState({
        selected_files_details: files,
      });
    }
  };

  saveFiles = (type) => {
    console.log(this.state)
    if (!this.state.subscribed && type === "draft") {
      this.setState({
        subscription_popup: true,
        subscription_msg: "Upgrade to save files to draft",
      });
    } else {
      var imageCount = 0;
      var videoCount = 0;
      var img3dCount = 0;
      let selected_files = this.state.selected_files_details;
      for (let i = selected_files.length - 1; i >= 0; i--) {
        if (
          ((selected_files[i].row.type[0] === "v" &&
            selected_files[i].size / 1000000 <= 20) ||
            (selected_files[i].row.type[0] !== "v" &&
              selected_files[i].size / 1000000 <= 5)) &&
          selected_files[i].resolution_satisfied === true &&
          selected_files[i].upload_status !== "uploaded"
        ) {
          if (selected_files[i].select_type[0] === "v") {
            videoCount += 1;
          } else if (selected_files[i].select_type[0] === "i") {
            imageCount += 1;
          } else {
            img3dCount += 1;
          }
        }
      }

      if (imageCount > this.state.imageLimit && imageCount !==0) {
        // if ()
        this.setState({
          subscription_popup: true,
          subscription_msg: "Images limit exceeded. Upgrade to continue",
        });
      } else if (videoCount > this.state.videoLimit && videoCount !== 0) {
        this.setState({
          subscription_popup: true,
          subscription_msg: "Videos limit exceeded. Upgrade to continue",
        });
      } else if (img3dCount > this.state.img3dLimit && img3dCount !== 0) {
        this.setState({
          subscription_popup: true,
          subscription_msg: "3D images limit exceeded. Upgrade to continue",
        });
      } else {
        let error = false;
        for (let i = selected_files.length - 1; i >= 0; i--) {
          if (!selected_files[i].draft) {
            if (
              ((selected_files[i].row.type[0] === "v" &&
                selected_files[i].size / 1000000 <= 20) ||
                (selected_files[i].row.type[0] !== "v" &&
                  selected_files[i].size / 1000000 <= 5)) &&
              selected_files[i].resolution_satisfied === true
            ) {
              let file_error = false;
              if (selected_files[i].custom_name === "" && type === "publish") {
                error = true;
                file_error = true;
                selected_files[i].error = true;
                this.setState({
                  selected_files_details: selected_files,
                  file_edit: i,
                });
                let y =
                  document
                    .getElementById(`u_f_file_${i}`)
                    .getBoundingClientRect().top +
                  window.pageYOffset +
                  -150;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
              if (selected_files[i].category === "" && type === "publish") {
                error = true;
                file_error = true;
                selected_files[i].error = true;
                this.setState({
                  selected_files_details: selected_files,
                  file_edit: i,
                });
                let y =
                  document
                    .getElementById(`u_f_file_${i}`)
                    .getBoundingClientRect().top +
                  window.pageYOffset +
                  -150;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
              if (selected_files[i].experience === "" && type === "publish") {
                error = true;
                file_error = true;
                selected_files[i].error = true;
                this.setState({
                  selected_files_details: selected_files,
                  file_edit: i,
                });
                let y =
                  document
                    .getElementById(`u_f_file_${i}`)
                    .getBoundingClientRect().top +
                  window.pageYOffset +
                  -150;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
              if (
                selected_files[i].keywords.length === 0 &&
                type === "publish"
              ) {
                error = true;
                file_error = true;
                selected_files[i].error = true;
                this.setState({
                  selected_files_details: selected_files,
                  file_edit: i,
                });
                let y =
                  document
                    .getElementById(`u_f_file_${i}`)
                    .getBoundingClientRect().top +
                  window.pageYOffset +
                  -150;
                window.scrollTo({ top: y, behavior: "smooth" });
              }

              if (!file_error) {
                selected_files[i].error = false;
                this.setState({
                  selected_files_details: selected_files,
                });
              }
            }
          } else {
            let file_error = false;
            if (selected_files[i].custom_name === "" && type === "publish") {
              error = true;
              file_error = true;
              selected_files[i].error = true;
              this.setState({
                selected_files_details: selected_files,
                file_edit: i,
              });
              let y =
                document.getElementById(`u_f_file_${i}`).getBoundingClientRect()
                  .top +
                window.pageYOffset +
                -150;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
            if (selected_files[i].category === "" && type === "publish") {
              error = true;
              file_error = true;
              selected_files[i].error = true;
              this.setState({
                selected_files_details: selected_files,
                file_edit: i,
              });
              let y =
                document.getElementById(`u_f_file_${i}`).getBoundingClientRect()
                  .top +
                window.pageYOffset +
                -150;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
            if (selected_files[i].experience === "" && type === "publish") {
              error = true;
              file_error = true;
              selected_files[i].error = true;
              this.setState({
                selected_files_details: selected_files,
                file_edit: i,
              });
              let y =
                document.getElementById(`u_f_file_${i}`).getBoundingClientRect()
                  .top +
                window.pageYOffset +
                -150;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
            if (selected_files[i].keywords.length === 0 && type === "publish") {
              error = true;
              file_error = true;
              selected_files[i].error = true;
              this.setState({
                selected_files_details: selected_files,
                file_edit: i,
              });
              let y =
                document.getElementById(`u_f_file_${i}`).getBoundingClientRect()
                  .top +
                window.pageYOffset +
                -150;
              window.scrollTo({ top: y, behavior: "smooth" });
            }

            if (!file_error) {
              selected_files[i].error = false;
              this.setState({
                selected_files_details: selected_files,
              });
            }
          }
        }

        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        };

        if (this.state.selected_tab === 2 && !error) {
          for (let i = 0; i < this.state.selected_files_details.length; i++) {
            let files = this.state.selected_files_details;
            let currentFile = files[i];
            let data = {};

            let link = `${domain}/api/draft/createDraft`;
            if (type === "draft") {
              data = new FormData();

              data.append("file", currentFile.row);
              data.append("postName", currentFile.custom_name);
              if (currentFile.select_type[0] === "v") {
                data.append("fileType", "video");
              } else if (currentFile.select_type[0] === "i") {
                data.append("fileType", "image");
              } else {
                data.append("fileType", currentFile.select_type);
              }
              data.append("experience", currentFile.experience);
              data.append("keywords", currentFile.keywords);
              data.append("adult", currentFile.adult_content);
              data.append("category", currentFile.category.value);

              link = `${domain}/api/draft/createDraft`;
            } else {
              let category = currentFile.category;
              if (currentFile.category.value) {
                category = currentFile.category.value;
              }
              if (!currentFile.draft_changed) {
                data = {
                  file: currentFile.filePath,
                  postName: currentFile.custom_name,
                  fileType: currentFile.select_type,
                  experience: currentFile.experience,
                  keywords: currentFile.keywords,
                  adult: currentFile.adult_content,
                  category: category,
                };

                link = `${domain}/api/draft/uploadDraft`;
              } else {
                data = new FormData();

                data.append("file", currentFile.row);
                data.append("postName", currentFile.custom_name);
                if (currentFile.select_type[0] === "v") {
                  data.append("fileType", "video");
                } else if (currentFile.select_type[0] === "i") {
                  data.append("fileType", "image");
                } else {
                  data.append("fileType", currentFile.select_type);
                }
                data.append("experience", currentFile.experience);
                data.append("keywords", currentFile.keywords);
                data.append("adult", currentFile.adult_content);
                if (currentFile.category.value) {
                  data.append("category", currentFile.category.value);
                } else {
                  data.append("category", currentFile.category);
                }

                link = `${domain}/api/image/createImage`;
              }
            }
            console.log(data);
            axios
              .post(link, data, config)
              .then((res) => {
                let config = {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                  },
                };
            
                axios
                  .get(`${domain}/api/pilotSubscription/getMySubscription`, config)
                  .then((res) => {
                    if(typeof(res.data.images)=== "number"){
                      console.log("ImagesThere")
                      this.setState({
                        imageLimit: res.data.subscription.images - res.data.images,
                        videoLimit: res.data.subscription.videos - res.data.videos,
                        img3dLimit: res.data.subscription.images3d - res.data.images3d,
                      });
                    }
                  
                    console.log(res)
                    // console.log(res.data.subscription.videos)
                    // console.log(res.data.subscription.)
                  }).catch(err=>{
                    console.log(err)
                  })
                console.log(res.data);
                files[i].upload_status = "uploaded";
                this.setState({
                  selected_files_details: files,
                });

                if (link === `${domain}/api/draft/uploadDraft`) {
                  axios
                    .post(
                      `${domain}/api/draft/deleteDraft`,
                      { id: files[i].id },
                      config
                    )
                    .then((res) => {
                      let config = {
                        headers: {
                          Authorization: "Bearer " + localStorage.getItem("access_token"),
                        },
                      };
                  
                      axios
                        .get(`${domain}/api/pilotSubscription/getMySubscription`, config)
                        .then((res) => {
                          if(typeof(res.data.images)=== "number"){
                            console.log("ImagesThere")
                            this.setState({
                              imageLimit: res.data.subscription.images - res.data.images,
                              videoLimit: res.data.subscription.videos - res.data.videos,
                              img3dLimit: res.data.subscription.images3d - res.data.images3d,
                            });
                          }
                        
                          console.log(res)
                          // console.log(res.data.subscription.videos)
                          // console.log(res.data.subscription.)
                        }).catch(err=>{
                          console.log(err)
                        })
                      console.log(res);
                      this.setState({
                        draft_count: this.state.draft_count - 1,
                      });
                    })
                    .catch((err) => {
                      console.log(err.response);
                    });
                }

                if (link === `${domain}/api/draft/createDraft`) {
                  this.setState({
                    draft_count: this.state.draft_count + 1,
                  });
                }
              })
              .catch((err) => {
                console.log(err.response);
                files[i].upload_status = "upload_failed";
                this.setState({
                  selected_files_details: files,
                });
              });
          }
        } else {
          if (!error) {
            for (let i = 0; i < this.state.selected_files_details.length; i++) {
              let currentFile = this.state.selected_files_details[i];
              if (
                ((selected_files[i].row.type[0] === "v" &&
                  selected_files[i].size / 1000000 <= 20) ||
                  (selected_files[i].row.type[0] !== "v" &&
                    selected_files[i].size / 1000000 <= 5)) &&
                selected_files[i].resolution_satisfied === true
              ) {
                if (currentFile.upload_status !== "uploaded") {
                  let files = this.state.selected_files_details;
                  files[i].upload_status = "uploading";
                  this.setState({
                    selected_files_details: files,
                  });

                  let data = new FormData();

                  data.append("file", currentFile.row);
                  data.append("postName", currentFile.custom_name);
                  if (currentFile.select_type[0] === "v") {
                    data.append("fileType", "video");
                  } else if (currentFile.select_type[0] === "i") {
                    data.append("fileType", "image");
                  } else {
                    data.append("fileType", currentFile.select_type);
                  }
                  data.append("experience", currentFile.experience);
                  data.append("keywords", currentFile.keywords);
                  data.append("adult", currentFile.adult_content);
                  data.append("category", currentFile.category.value);

                  let link = `${domain}/api/image/createImage`;
                  if (type === "draft") {
                    link = `${domain}/api/draft/createDraft`;
                  } else {
                    link = `${domain}/api/image/createImage`;
                  }

                  axios
                    .post(link, data, config)
                    .then((res) => {
                      let config = {
                        headers: {
                          Authorization: "Bearer " + localStorage.getItem("access_token"),
                        },
                      };
                  
                      axios
                        .get(`${domain}/api/pilotSubscription/getMySubscription`, config)
                        .then((res) => {
                          if(typeof(res.data.images)=== "number"){
                            console.log("ImagesThere")
                            this.setState({
                              imageLimit: res.data.subscription.images - res.data.images,
                              videoLimit: res.data.subscription.videos - res.data.videos,
                              img3dLimit: res.data.subscription.images3d - res.data.images3d,
                            });
                          }
                        
                          console.log(res)
                          // console.log(res.data.subscription.videos)
                          // console.log(res.data.subscription.)
                        }).catch(err=>{
                          console.log(err)
                        })
                      console.log(res.data);
                      console.log(files[i].row);
                      files[i].upload_status = "uploaded";
                      this.setState({
                        selected_files_details: files,
                      });

                      if (link === `${domain}/api/draft/createDraft`) {
                        this.setState({
                          draft_count: this.state.draft_count + 1,
                        });
                      }
                    })
                    .catch((err) => {
                      files[i].upload_status = "upload_failed";
                      this.setState({
                        selected_files_details: files,
                      });
                    });
                }
              }
            }
          }
        }
      }
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Upload file</title>
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
                    {this.state.selected_tab === 1 ? (
                      <div id="u_f_select_category_container">
                        {this.state.files_selected ? (
                          <>
                            <input
                              type="file"
                              accept="video/mp4,video/x-m4v,video/*,image/*"
                              name=""
                              id="add_files"
                              multiple
                              style={{ visibility: "hidden" }}
                              onChange={this.chooseFiles}
                              ref="addFileRef"
                            />
                            {this.state.selected_files_details.length < 20 && (
                              <label
                                style={{
                                  display: "inline-block",
                                  marginBottom: "10px",
                                }}
                                for="add_files"
                                id="u_f_add_more"
                              >
                                <i class="fas fa-plus u_f_add_more_icon"></i>{" "}
                                Add more
                              </label>
                            )}
                            <select
                              name=""
                              id="u_f_select_category"
                              onChange={this.categoryChanged}
                              style={{ marginRight: "10px" }}
                            >
                              <option
                                value="all"
                                selected={
                                  this.state.selected_category === "all"
                                }
                              >
                                All Files
                              </option>
                              <option
                                value="image"
                                selected={
                                  this.state.selected_category === "image"
                                }
                              >
                                Image
                              </option>
                              <option
                                value="3d_image"
                                selected={
                                  this.state.selected_category === "3d_image"
                                }
                              >
                                3D Image
                              </option>
                              <option
                                value="video"
                                selected={
                                  this.state.selected_category === "video"
                                }
                              >
                                Video
                              </option>
                            </select>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="image-uploader-wrapper">
                      {!this.state.files_selected &&
                      this.state.selected_tab === 1 ? (
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
                                  to choose a File
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            {this.state.selected_category === "all" ? (
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
                                {this.state.selected_category === "video" ? (
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
                                  <>
                                    {(this.state.selected_files_details[index]
                                      .select_type[0] ===
                                      this.state.selected_category[0] ||
                                      this.state.selected_category ===
                                        "all") && (
                                      <Col
                                        xxl={6}
                                        xl={6}
                                        lg={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        id={`u_f_file_${index}`}
                                      >
                                        <div
                                          className={
                                            this.state.file_edit == index
                                              ? "u_f_selected_file u_f_file_preview_container"
                                              : file.error
                                              ? "u_f_file_preview_container u_f_file_error"
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
                                            {file.category ? (
                                              <div
                                                className="u_f_file_name_on_file"
                                                id={"file_name_" + index}
                                              >
                                                {file.category.value
                                                  ? file.category.value
                                                  : file.category}
                                              </div>
                                            ) : (
                                              <div
                                                id={"file_name_" + index}
                                              ></div>
                                            )}
                                            {file.adult_content ? (
                                              <div
                                                className="u_f_file_adult"
                                                id={"file_adult_" + index}
                                              >
                                                Adult
                                              </div>
                                            ) : (
                                              <div
                                                id={"file_adult_" + index}
                                              ></div>
                                            )}
                                          </div>

                                          {file.type[0] == "v" ? (
                                            <>
                                              <video
                                                src={file.file}
                                                style={{ borderRadius: "9px" }}
                                                id={`u_f_video_${index}`}
                                              />
                                              {file.upload_status ===
                                                "uploading" && (
                                                <>
                                                  <div className="u_f_uploading_border"></div>
                                                  <div className="u_f_upload_percentage">
                                                    75%
                                                  </div>
                                                </>
                                              )}
                                              {file.upload_status ===
                                                "uploaded" && (
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
                                              {file.size / 1000000 > 20 && (
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
                                                file.size / 1000000 <= 20 && (
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
                                                      File Resolution should be
                                                      minimum 1100x500
                                                    </div>
                                                  </>
                                                )}
                                            </>
                                          ) : (
                                            <>
                                              <img
                                                src={file.file}
                                                style={{ borderRadius: "9px" }}
                                              />
                                              {file.upload_status ===
                                                "uploading" && (
                                                <>
                                                  <div className="u_f_uploading_border"></div>
                                                  <div className="u_f_upload_percentage">
                                                    75%
                                                  </div>
                                                </>
                                              )}
                                              {file.upload_status ===
                                                "uploaded" && (
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

                                              {file.size / 1000000 > 5 && (
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
                                                file.size / 1000000 <= 5 && (
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
                                                      File Resolution should be
                                                      minimum 1100x500
                                                    </div>
                                                  </>
                                                )}
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
                                          {this.state.showEditOptions ===
                                            index &&
                                            file.upload_status ===
                                              "selected" && (
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
                                                    this.removeFile(
                                                      index,
                                                      file.id
                                                    )
                                                  }
                                                >
                                                  Remove
                                                </div>
                                              </div>
                                            )}
                                        </div>
                                      </Col>
                                    )}
                                  </>
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
                            {this.state.selected_files_details[
                              this.state.file_edit
                            ].name.length > 50
                              ? `${this.state.selected_files_details[
                                  this.state.file_edit
                                ].name.slice(0, 50)} ...`
                              : this.state.selected_files_details[
                                  this.state.file_edit
                                ].name}
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
                        <>
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
                          {this.state.selected_files_details[
                            this.state.file_edit
                          ].error === true &&
                            this.state.selected_files_details[
                              this.state.file_edit
                            ].custom_name === "" && (
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
                              ].select_type === "3d"
                                ? "u_f_file_type u_f_file_usage_selected"
                                : "u_f_file_type"
                            }
                            id="u_f_file_type3"
                            onClick={() => this.selectImageType("3d")}
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
                      {this.state.files_selected ? (
                        <>
                          {this.state.selected_files_details[
                            this.state.file_edit
                          ].category.value ? (
                            <Select
                              options={this.state.industryOptions}
                              onChange={this.categoryChange}
                              styles={this.customStyles}
                              value={
                                this.state.selected_files_details[
                                  this.state.file_edit
                                ].category
                              }
                              className="u_f_category_dropdown"
                            />
                          ) : (
                            <Select
                              options={this.state.industryOptions}
                              onChange={this.categoryChange}
                              styles={this.customStyles}
                              value={{
                                value:
                                  this.state.selected_files_details[
                                    this.state.file_edit
                                  ].category,
                                label:
                                  this.state.selected_files_details[
                                    this.state.file_edit
                                  ].category,
                              }}
                              className="u_f_category_dropdown"
                            />
                          )}

                          <div style={{ marginBottom: "30px" }}></div>
                          {this.state.selected_files_details[
                            this.state.file_edit
                          ].error === true &&
                            this.state.selected_files_details[
                              this.state.file_edit
                            ].category === "" && (
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
                      {this.state.files_selected ? (
                        <>
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
                          {this.state.selected_files_details[
                            this.state.file_edit
                          ].error === true &&
                            this.state.selected_files_details[
                              this.state.file_edit
                            ].experience === "" && (
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
                        disabled={!this.state.files_selected}
                        value={this.state.new_keyword}
                        placeholder="Type and press enter to select."
                      />

                      {this.state.files_selected && (
                        <div className="u_f_input_keywords_container">
                          {this.state.selected_files_details[
                            this.state.file_edit
                          ].error === true &&
                            this.state.selected_files_details[
                              this.state.file_edit
                            ].keywords.length === 0 && (
                              <div className="u_f_error_msg">
                                Select atleast one keyword.
                              </div>
                            )}
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
                                {keyword} &nbsp;
                                <i class="fa fa-times" aria-hidden="true"></i>
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
                                <div className="u_f_input_keywords">
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
                        {this.state.selected_tab === 1 ? (
                          <button
                            id="u_f_save_draft"
                            onClick={() => this.saveFiles("draft")}
                          >
                            Save Draft
                          </button>
                        ) : (
                          <button
                            id="u_f_save_draft"
                            style={{ opacity: "0.5", cursor: "not-allowed" }}
                          >
                            Save Draft
                          </button>
                        )}

                        <button
                          id="u_f_submit"
                          onClick={() => this.saveFiles("publish")}
                        >
                          Publish
                        </button>
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
              <Dialog
                open={this.state.file_count_exceed}
                onClose={() => this.setState({ file_count_exceed: false })}
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
                      onClick={() =>
                        this.setState({ file_count_exceed: false })
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title">
                      You cannot upload more than 20 files at a time.
                    </div>
                    <div className="u_f_popup_btn_container">
                      <button
                        className="u_f_popup_btn1"
                        onClick={() =>
                          this.setState({ file_count_exceed: false })
                        }
                      >
                        Close
                      </button>
                    </div>
                  </Row>
                </DialogContent>
              </Dialog>
              <Dialog
                open={this.state.subscription_popup}
                onClose={() => this.setState({ subscription_popup: false })}
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
                      onClick={() =>
                        this.setState({ subscription_popup: false })
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <Row style={{ marginTop: "30px" }}>
                    <div className="u_f_popup_title">
                      {this.state.subscription_msg}
                    </div>
                    <div className="u_f_popup_btn_container">
                      <button
                        className="u_f_popup_btn1"
                        onClick={() =>
                          this.setState({ subscription_popup: false })
                        }
                      >
                        Cancel
                      </button>
                      <button
                        className="u_f_popup_btn2"
                        onClick={() =>
                          this.props.history.push("/DownloadSubscription")
                        }
                      >
                        Upgrade
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
