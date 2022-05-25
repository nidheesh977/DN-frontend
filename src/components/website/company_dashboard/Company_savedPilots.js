import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import { Row, Col } from "react-grid-system";
import { useHistory } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import All from "../../website/All.module.css";
import "./css/SavedFolders.css";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import Close from "../../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import AddFolder from "./images/addFolder1.png";
import bin from "./images/c_j_bin.png";
import edit from "./images/c_j_edit.png";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const customStyles = {
  container: (provided) => ({
    ...provided,
    height: 50,
  }),
};
const domain = process.env.REACT_APP_MY_API;

function Company_savedPilots() {
  let history = useHistory();
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  let [data, setData] = useState([]);
  let [addFolder, setAddFolder] = useState(false);
  let [foldername, setFoldername] = useState("");
  let [desc, setDesc] = useState("");
  let [deleteId, setDeleteId] = useState("");
  let [editItem, setEditItem] = useState({});
  let [editFolderConfirmation, setEditFolderConfirmation] = useState(false);
  let [confirmDelete, setConfirmDelete] = useState(false)

  let folderHandler = (e) => {
    document.getElementById("name").style.backgroundColor = "white";

    setFoldername(e.target.value);
  };
  let descHandler = (e) => {
    document.getElementById("description").style.backgroundColor = "white";

    setDesc(e.target.value);
  };
  useEffect(() => {
    axios.get(`${domain}/api/folder/getMyFolders`, config).then((res) => {
      console.log(res);
      setData(res.data);
    });
  }, []);
  let closeAddFolder = () => {
    setAddFolder(false);
  };
let moveToFolder = (id) =>{
  history.push(`/company_dashboard/activities/savedPilots/${id}`)
}
  let submitCreateFolder = () => {
    if (foldername == "" || foldername.length >= 100) {
      document.getElementById("name").style.backgroundColor = "#ffcccb";
    } else if (desc == "" || desc.length >= 200) {
      document.getElementById("description").style.backgroundColor = "#ffcccb";
    } else {
      axios
        .post(
          `${domain}/api/folder/createFolder`,
          { folderName: foldername, description: desc },
          config
        )
        .then((res) => {
          setFoldername("");
          setDesc("");
          axios.get(`${domain}/api/folder/getMyFolders`, config).then((res) => {
            console.log(res);
            setData(res.data);
          });
          setAddFolder(false);
        });
    }
  };

  const editFolder = (folder) => {
    setEditItem(folder)
    setEditFolderConfirmation(true)
  }

  const saveFolderChanges = () => {
    if (editItem.folderName == "" || editItem.folderName.length >= 100) {
      document.getElementById("name").style.backgroundColor = "#ffcccb";
    } else if (editItem.description == "" || editItem.description.length >= 200) {
      document.getElementById("description").style.backgroundColor = "#ffcccb";
    } else {
      axios
        .post(
          `${domain}/api/folder/updateFolderData`,
          { folderId: editItem._id, folderName: editItem.folderName, description: editItem.description },
          config
        )
        .then((res) => {
          console.log(editItem)
          console.log(res.data)
          setFoldername("");
          setDesc("");
          axios.get(`${domain}/api/folder/getMyFolders`, config).then((res) => {
            console.log(res);
            setData(res.data);
          });
          setAddFolder(false);
        })
        .catch(err => {
          console.log(err)
          console.log(err.response)
        });
      console.log("Save changes")
      setEditItem({})
      setEditFolderConfirmation(false)
    }
    
  }

  const deleteFolder = () => {
    axios.post(`${domain}/api/folder/deleteFolder`, {folderId: deleteId})
    axios.get(`${domain}/api/folder/getMyFolders`, config).then((res) => {
      console.log(res);
      setData(res.data);
      setConfirmDelete(false)
      setDeleteId("")
    });
  }

  const deleteConfirmation = (id) => {
    setDeleteId(id)
    setConfirmDelete(true)
  }

  return (
    <div>
      <div className="savedPilotsDesc">Select a folder to see Saved Pilots or Create new</div>
      <Row gutterWidth={25}>
        {data.map((item, i) => {
          return (
            <>
            
              <Col xl={4} xs={6}>
                <div className="savePilotFolderContainer">

                  <Card style={{ cursor: "pointer", marginBottom: "15px" }} onClick={()=>moveToFolder(item._id)}>
                    <CardContent>
                      <div className="folderTitle">
                        {item.folderName.length < 15
                          ? item.folderName
                          : item.folderName.slice(0, 15) + "..."}
                      </div>
                      <div className="folderDesc">
                        {item.description.length < 40
                          ? item.description
                          : item.description.slice(0, 38) + "..."}
                      </div>
                      <div className="folderDelEditContainer">
                      </div>
                    </CardContent>
                  </Card>
                  <div className="folderDelEditBtn">
                        <img src={edit} onClick = {()=>editFolder(item)} alt="" className="folderDelEdit"/>
                        <img src={bin} onClick = {()=>deleteConfirmation(item._id)} alt="" className="folderDelEdit"/>
                      </div>
                </div>
              </Col>
            </>
          );
        })}

        <Col xl={4} xs={6}>
          <Card style={{marginBottom : "15px", cursor: "pointer" }}
                  onClick={() => setAddFolder(true)}>
            <div
              style={{
                height: "131px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <img
                  src={AddFolder}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Dialog
        open={addFolder}
        onClose={closeAddFolder}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
        PaperProps={{
          style: { width: "620px", borderRadius: "10px" },
        }}
      >
        <DialogContent
          className={All.PopupBody}
          style={{ marginBottom: "50px" }}
        >
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
          >
            <img
              src={Close}
              alt=""
              onClick={closeAddFolder}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <div className="sc_popup_head">Create Folder</div>
            <div className="sc_popup_desc">
              Enter the below details to create a folder{" "}
            </div>
            <div className="sc_popup_input_label">Folder Name</div>
            <input
              type="text"
              className="sc_popup_input"
              name="name"
              id="name"
              value={foldername}
              onChange={folderHandler}
            />
            <div className="login_input_error_msg" id="name_error"></div>
            <div className="sc_popup_input_label">Description</div>
            <input
              type="text"
              className="sc_popup_input"
              name="description"
              id="description"
              value={desc}
              onChange={descHandler}
            />
            <div className="login_input_error_msg" id="description_error"></div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <button className="sc_popup_submit" onClick={submitCreateFolder}>
                Submit
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={editFolderConfirmation}
        onClose={() => setEditFolderConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
        PaperProps={{
          style: { width: "620px", borderRadius: "10px" },
        }}
      >
        <DialogContent
          className={All.PopupBody}
          style={{ marginBottom: "50px" }}
        >
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
          >
            <img
              src={Close}
              alt=""
              onClick={() => setEditFolderConfirmation(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <div className="sc_popup_head">Edit Folder</div>
            <div className="sc_popup_desc">
              Enter the below details to create a folder{" "}
            </div>
            <div className="sc_popup_input_label">Folder Name</div>
            <input
              type="text"
              className="sc_popup_input"
              name="name"
              id="name"
              value={editItem.folderName}
              onChange={(e) => {
                setEditItem({...editItem, folderName: e.target.value})
                document.getElementById("name").style.backgroundColor = "#ffffff";
              }}
            />
            <div className="login_input_error_msg" id="name_error"></div>
            <div className="sc_popup_input_label">Description</div>
            <input
              type="text"
              className="sc_popup_input"
              name="description"
              id="description"
              value={editItem.description}
              onChange={(e) => {
                setEditItem({...editItem, description: e.target.value})
                document.getElementById("description").style.backgroundColor = "#ffffff";
              }}
            />
            <div className="login_input_error_msg" id="description_error"></div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <button className="sc_popup_submit" onClick={saveFolderChanges}>
                Update
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
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
          <div style={{ position: "absolute", top: "20px", right: "20px" }}>
            <img
              src={Close}
              alt=""
              onClick={() => setConfirmDelete(false)
              }
              style={{ cursor: "pointer" }}
            />
          </div>
          <Row style={{ marginTop: "30px" }}>
            <div className="u_f_popup_title">Are you sure? All saved pilots of this folder will be deleted.</div>
            <div className="u_f_popup_btn_container">
              <button
                className="u_f_popup_btn1"
                onClick={() =>
                  setConfirmDelete(false)
                }
              >
                Cancel
              </button>
              
                <button
                  className="u_f_popup_btn2"
                  onClick={ deleteFolder }
                >
                  Delete
                </button>
              
            </div>
          </Row>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Company_savedPilots;
