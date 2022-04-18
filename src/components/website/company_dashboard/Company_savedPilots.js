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
  return (
    <div>
      <div className="savedPilotsDesc">Select a folder to see Saved Pilots or Create new</div>
      <Row gutterWidth={25}>
        {data.map((item, i) => {
          return (
            <>
            
              <Col xl={4} xs={6}>
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
                  </CardContent>
                </Card>
              </Col>
            </>
          );
        })}

        <Col xl={4} xs={6}>
          <Card style={{marginBottom : "15px"}}>
            <div
              style={{
                height: "126px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <img
                  src={AddFolder}
                  style={{ cursor: "pointer" }}
                  onClick={() => setAddFolder(true)}
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
    </div>
  );
}

export default Company_savedPilots;
