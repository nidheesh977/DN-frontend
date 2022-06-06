import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";
import Picture from "./images/drone_img.jpg";
import Premium from "./images/goldenStar.svg";
import premiumIcon from "../../images/golden-star.svg";
import viewIcon from "../../images/viewIcon.svg";
import downloadIcon from "../../images/downloadIcon.svg";
import productLike from "../../images/product_like.png";
import moreIcon from "../../images/Path.svg";
import loadMore from "../../images/Group 71.svg";
import All from "../../website/All.module.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./css/Pilot_custom.css";
import RearrangeFiles from "./RearrangeFiles";
import "./css/Pilot_Payments.css";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Close from "../../images/close.svg";
import { withStyles } from "@material-ui/core/styles";


const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function mouseGotIN(_id) {
  document.getElementById("pd_likes/" + _id).style.display = "block";
  document.getElementById("pd_more/" + _id).style.display = "block";
  document.getElementById("pd_images_more/" + _id).style.display = "none";
}
function mouseGotOut(_id) {
  document.getElementById("pd_likes/" + _id).style.display = "none";
  document.getElementById("pd_more/" + _id).style.display = "none";
}

function showMore(_id) {
  document.getElementById("pd_images_more/" + _id).style.display = "block";
}

function Pilot_approvedImages() {
  const history = useHistory();
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  let [rearrange, setRearrange] = useState(false);
  let [proPilot, setProPilot] = useState(false);
  let [pilotId, setPilotId] = useState("");
  let [deleteId, setDeleteId] = useState("");
  let [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    axios.post(`${domain}/api/user/pilotDetails`, config).then((res) => {
      console.log(res.data);
      if (res.data.pilotPro) {
        setProPilot(true);
      } else {
        setProPilot(false);
      }
      setPilotId(res.data.userId);
      if (res.data.rearrangedImages.length === 0) {
        axios
          .post(`${domain}/api/image/getApprovedImages`, config)
          .then((response) => {
            console.log(response.data);
            setValue(response.data);
            if (response.data.length === 0) {
              document.getElementById("toHide").style.display = "block";
            }
          });
      } else {
        setValue(res.data.rearrangedImages);
      }
    });
  }, []);
  let [value, setValue] = useState([]);
  const deleteImage = () => {
    setConfirmDelete(false)
    axios.post(`${domain}/api/image/deleteImage/${deleteId}`, config).then((res) => {
      axios
        .post(`${domain}/api/image/getApprovedImages`, config)
        .then((response) => {
          console.log(response.data);
          setValue(response.data);
        });
    });
  };

  const deleteImageConfirmation = (id) => {
    setDeleteId(id)
    setConfirmDelete(true)
  }

  const cancelRearrange = () => {
    setRearrange(false);
    window.scrollTo(0, 0);
  };

  const startRearrange = () => {
    setRearrange(true);
  };

  const redirectImage = (id) => {
    history.push(`/Imageview/${id}/${pilotId}`);
  };

  return (
    <div>
      <div id="toHide" style={{ display: "none" }}>
        <div
          style={{
            fontSize: "22px",
            fontFamily: "muli-regular",
            textAlign: "center",
            marginTop: "35px",
          }}
        >
          No Approved Images Now, Upload and check back later
        </div>
        <center>
          <Link to="/uploadFile">
            <button className="uploadNow_btn">Upload Now</button>
          </Link>
        </center>
      </div>
      {value.length > 1 && !rearrange && proPilot ? (
        <div style={{ textAlign: "right" }}>
          <button className="rearrange_file" onClick={startRearrange}>
            Rearrange
          </button>
        </div>
      ) : (
        ""
      )}
      <Row gutterWidth={12}>
        {!rearrange ? (
          <>
            {value.map((item) => {
              return (
                <Col xl={4} lg={6} md={4} sm={6} xs={12}>
                  <div style={{ height: "310px" }}>
                    <div
                      className="pd_images_imageContainer"
                      onMouseOver={() => mouseGotIN(item._id)}
                      onMouseOut={() => mouseGotOut(item._id)}
                    >
                      <img
                        src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${item.file}`}
                        className="pd_images_image"
                        onClick={() => redirectImage(item._id)}
                        style={{ cursor: "pointer" }}
                      />
                      <div
                        className={
                          item.premium
                            ? "pd_premiumBadge"
                            : "pd_images_imageHidden"
                        }
                      >
                        <img
                          src={premiumIcon}
                          className="pd_premiumBadge_star"
                        />
                      </div>
                    </div>
                    <div
                      className="pd_likes_container"
                      id={"pd_likes/" + item._id}
                    >
                      <img src={viewIcon} className="pd_likes_img" />{" "}
                      <span>{item.views}</span>
                      <img src={downloadIcon} className="pd_likes_img" />{" "}
                      <span>{item.downloads.length}</span>
                      <img src={productLike} className="pd_likes_img" />{" "}
                      <span>{item.likes.length}</span>
                    </div>
                    <div
                      className="pd_moreBtn"
                      id={"pd_more/" + item._id}
                      style={{ cursor: "pointer" }}
                      onMouseOver={() => mouseGotIN(item._id)}
                      onMouseOut={() => mouseGotOut(item._id)}
                      onClick={() => showMore(item._id)}
                    >
                      <img src={moreIcon} className="pd_image_more" />
                    </div>
                    <div
                      className="pd_images_moreOptions"
                      id={"pd_images_more/" + item._id}
                    >
                      <Link to={`/edit-file/${item._id}`}>
                        <div className="pd_images_moreOption">Edit</div>
                      </Link>
                      <div
                        className="pd_images_moreOption"
                        onClick={() => deleteImageConfirmation(item._id)}
                      >
                        Remove
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </>
        ) : (
          <RearrangeFiles
            type="images"
            cancelButton={
              <button className="r_f_cancel_btn" onClick={cancelRearrange}>
                Cancel
              </button>
            }
            saveButton={
              <button className="r_f_save_btn" onClick={cancelRearrange}>
                Save
              </button>
            }
            changeValue={setValue}
          />
        )}
      </Row>
      {/* <div className="a_j_load_div" style={{margin: "40px 0px"}}>
        <button className="a_j_loadMore_btn">
          <img src={loadMore} className="a_j_location_logo" />
          <span className="a_j_location_text">Load More</span>
        </button>{" "}
      </div> */}
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
        PaperProps={{
          style: {
            maxWidth: "700px",
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
            <div className="u_f_popup_title">Are you sure?</div>
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
                  onClick={ deleteImage }
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

export default Pilot_approvedImages;
