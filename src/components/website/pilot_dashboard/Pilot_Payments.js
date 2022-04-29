import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-grid-system";
import "./css/HireProposal.css";
import { jsPDF } from "jspdf";
import Dialog from "@material-ui/core/Dialog";
import Close from "../../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import All from "../All.module.css";

const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function Pilot_Payments() {
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  let [data, setData] = useState([]);
  let [cancelSubscriptionPopup, setCancelSubscriptionPopup] = useState(false);

  let [subscriptionDetails, setSubscriptionDetails] = useState({});

  let [uploadedImages, setUploadedImages] = useState([]);
  let [uploaded3d, setUploaded3d] = useState([]);
  let [uploadedVideos, setUploadedVideos] = useState([]);

  let [pendingImages, setPendingImages] = useState([]);
  let [pending3d, setPending3d] = useState([]);
  let [pendingVideos, setPendingVideos] = useState([]);

  useEffect(() => {
    axios.get(`${domain}/api/payment/getPayments`, config).then((res) => {
      console.log(res);
      setData(res.data);
    });
    axios
      .get(`${domain}/api/pilotSubscription/getMySubscriptionData`, config)
      .then((res) => {
        setSubscriptionDetails(res.data);
        console.log(res.data);
      });
  }, []);
  let [pdfData, setPdfData] = useState({
    name: "",
    transactionId: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    date: "",
    plan: "",
    status: "",
    price: "",
  });

  let cancelSubscription = () => {
    axios
      .post(`${domain}/api/image/getApprovedImages`, config)
      .then((response) => {
        console.log(response.data);
        setUploadedImages(response.data);
      });
    axios
      .post(`${domain}/api/image/getApprovedVideos`, config)
      .then((response) => {
        console.log(response.data);
        setUploadedVideos(response.data);
      });
    axios.post(`${domain}/api/image/getApproved3d`, config).then((response) => {
      console.log(response.data);
      setUploaded3d(response.data);
    });
    axios
      .post(`${domain}/api/image/getPendingImages`, config)
      .then((response) => {
        console.log(response.data);
        setPendingImages(response.data);
      });
    axios
      .post(`${domain}/api/image/getPendingVideos`, config)
      .then((response) => {
        console.log(response.data);
        setPendingVideos(response.data);
      });
    axios.post(`${domain}/api/image/getPending3d`, config).then((response) => {
      console.log(response.data);
      setPending3d(response.data);
    });

    setCancelSubscriptionPopup(true);
  };

  let showMessage = (id) => {
    let message = document.getElementById(`messageToShow/${id}`);
    if (message.innerHTML == "Show Message") {
      console.log("1");
      message.innerHTML = "Hide Message";
      document.getElementById(`toHideBox/${id}`).style.display = "block";
    } else if (message.innerHTML == "Hide Message") {
      console.log("2");

      message.innerHTML = "Show Message";
      document.getElementById(`toHideBox/${id}`).style.display = "none";
    } else {
      console.log("3");

      message.innerHTML = "Show Message";
      document.getElementById(`toHideBox/${id}`).style.display = "none";
    }
  };
  let downloadInvoice = (
    id,
    name,
    line1,
    line2,
    city,
    state,
    country,
    pinCode,
    createdAt,
    status,
    price,
    plan
  ) => {
    setPdfData({
      transactionId: id,
      name: name,
      line1: line1,
      line2,
      city,
      state,
      country,
      pinCode,
      date: createdAt.slice(0, 10),
      status,
      price,
      plan,
    });
    let doc = new jsPDF("portrait", "pt", "A4");
    doc.html(document.getElementById("pdf-view"), {
      callback: () => {
        doc.save("test.pdf");
      },
    });
  };
  return (
    <div>
      <Row className="sub_det_container">
        <Col xxl={12} className="sub_det_col1">
          <div className="sub_det_plan">
            {subscriptionDetails.sub ? subscriptionDetails.sub.plan : "Plan"}
          </div>
        </Col>
        <Col className="sub_det_col2">
          {/* <div style={{ textAlign: "center" }}>
                <img
                  src={profilePic}
                  alt="profile pic"
                  style={{ borderRadius: "200px" }}
                />
              </div> */}
          <div>
            <div className="sub_det_title">Price :</div>
            <div className="sub_det_content" id="sub_det_price">
              {subscriptionDetails.currency === "inr" ? "INR " : "US $"}
              {subscriptionDetails.price / 100}
            </div>
          </div>
          <div>
            <div className="sub_det_title">Status :</div>
            <div
              className="sub_det_content"
              id="sub_det_status"
              style={{ textTransform: "capitalize" }}
            >
              {subscriptionDetails.status}
            </div>
          </div>
          <div>
            <div className="sub_det_title">Current start date :</div>
            <div className="sub_det_content" id="sub_det_start_date">
              {subscriptionDetails.startDate
                ? new Date(subscriptionDetails.startDate * 1e3)
                    .toISOString()
                    .slice(0, 10)
                : ""}
            </div>
          </div>
          <div>
            <div className="sub_det_title">Current end date :</div>
            <div className="sub_det_content" id="sub_det_end_date">
              {subscriptionDetails.endDate
                ? new Date(subscriptionDetails.endDate * 1e3)
                    .toISOString()
                    .slice(0, 10)
                : ""}
            </div>
          </div>
          <div>
            <div className="sub_det_title">Image Limit :</div>
            <div className="sub_det_content" id="sub_det_start_date">
              {subscriptionDetails.sub ? subscriptionDetails.sub.images : ""}{" "}
              Images
            </div>
          </div>
        </Col>
        <Col className="sub_det_col3">
          <div>
            <div className="sub_det_title">Uploaded images :</div>
            <div className="sub_det_content" id="sub_det_start_date">
              {subscriptionDetails.images} Images
            </div>
          </div>
          <div>
            <div className="sub_det_title">Video Limit :</div>
            <div className="sub_det_content" id="sub_det_start_date">
              {subscriptionDetails.sub ? subscriptionDetails.sub.videos : ""}{" "}
              Videos
            </div>
          </div>
          <div>
            <div className="sub_det_title">Uploaded videos :</div>
            <div className="sub_det_content" id="sub_det_start_date">
              {subscriptionDetails.videos} Videos
            </div>
          </div>
          <div>
            <div className="sub_det_title">3dimages Limit :</div>
            <div className="sub_det_content" id="sub_det_start_date">
              {subscriptionDetails.sub ? subscriptionDetails.sub.images3d : ""}{" "}
              3dimages
            </div>
          </div>
          <div>
            <div className="sub_det_title">Uploaded 3dimages :</div>
            <div className="sub_det_content" id="sub_det_start_date">
              {subscriptionDetails.images3d} 3dimages
            </div>
          </div>
        </Col>
        <Col xxl={12} style={{ textAlign: "right", marginTop: "20px" }}>
          <button className="c_cBtn3" onClick={cancelSubscription}>
            Cancel Subscription
          </button>
        </Col>
      </Row>
      <div className="box0">
        <Row gutterWidth={5}>
          <Col>
            <div>Date</div>
          </Col>
          <Col>
            <div>Description</div>
          </Col>
          <Col>
            <div>Status</div>
          </Col>
          <Col>
            <div>Cost</div>
          </Col>
          <Col>
            <div>Receipt</div>
          </Col>
        </Row>
      </div>
      {data.length == 0 ? (
        <div id="tohide">
          <div>No Payments yet please Upgrade</div>
        </div>
      ) : (
        <></>
      )}

      {data.map((item, i) => {
        return (
          <>
            <div>
              <div className="box1">
                <Row gutterWidth={5}>
                  <Col>
                    <div>{item.createdAt.slice(0, 10)}</div>
                  </Col>
                  <Col>
                    <div style={{ textTransform: "capitalize" }}>
                      {item.plan}
                    </div>
                  </Col>
                  <Col>
                    <div style={{ textTransform: "capitalize" }}>
                      {item.status}
                    </div>
                  </Col>
                  <Col>
                    <div>
                      {item.country !== "India"
                        ? `$ ${item.price / 100}.00`
                        : `INR ${item.price / 100}`}
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() =>
                        downloadInvoice(
                          item.transactionId,
                          item.name,
                          item.line1,
                          item.line2,
                          item.city,
                          item.state,
                          item.country,
                          item.pinCode,
                          item.createdAt,
                          item.status,
                          item.price,
                          item.plan
                        )
                      }
                    >
                      Download Receipt
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </>
        );
      })}

      <div style={{ visibility: "hidden" }}>
        <div className="pdf_mainDiv" id="pdf-view" style={{ display: "block" }}>
          <div className="pdf_imageDiv">
            <center>
              <img
                src="https://www.nexevo.in/images/logolast.png"
                className="pdf_iconImg"
              />
            </center>
          </div>
          <div className="pdf_invoiceDiv">
            <div>
              <b>Payment Invoice</b>
            </div>
            <div>
              <b>Invoice Id :</b> DN{pdfData.transactionId}
            </div>
          </div>
          <Row gutterWidth={0}>
            <Col style={{ border: "1px solid gray", padding: "5px" }}>
              <div className="pdf_client">Client : </div>
              <div>Nexevo Technologies</div>
              <div>Kasturi Nagar, Rajiv Nagar</div>
              <div>Bangalore Karnataka</div>
              <div>India 560041</div>
            </Col>
            <Col style={{ border: "1px solid gray", padding: "5px" }}>
              <div className="pdf_client">Customer : </div>
              <div>{pdfData.name}</div>
              <div>{pdfData.line1}</div>
              <div>{pdfData.line2}</div>
              <div>
                {pdfData.city} {pdfData.state}
              </div>
              <div>
                {pdfData.country} {pdfData.pinCode}
              </div>
            </Col>
          </Row>
          <Row gutterWidth={0}>
            <Col style={{ border: "1px solid gray", padding: "5px" }}>
              <div className="pdf_client">Payment Date : </div>
              <div>{pdfData.date}</div>
            </Col>
            <Col style={{ border: "1px solid gray", padding: "5px" }}>
              <div className="pdf_client">Total Amount : </div>
              <div>
                {pdfData.country !== "India"
                  ? `$ ${pdfData.price / 100}.00`
                  : `INR ${pdfData.price}`}
              </div>
            </Col>
          </Row>
          <div className="pdf_statusdiv">
            <div className="pdf_client">Payment Status : </div>
            <div>{pdfData.status}</div>
          </div>
          <div className="pdf_table">
            <Row className="pdfHeadRow">
              <Col xl={1.5}>Sl No</Col>
              <Col> Package Name</Col>
              <Col xl={2}>Amount</Col>
            </Row>
            <hr
              style={{ maxWidth: "98%", border: "none", background: "gray" }}
            />
            <Row>
              <Col xl={1.5}>1</Col>
              <Col>{pdfData.plan}</Col>
              <Col xl={2}>
                {pdfData.country !== "India"
                  ? `US $${pdfData.price / 100}.00`
                  : `INR ${pdfData.price}`}
              </Col>
            </Row>
            <hr
              style={{ maxWidth: "98%", border: "none", background: "gray" }}
            />
            <Row className="pdfHeadRow">
              <Col xl={1.5}></Col>
              <Col>Total :</Col>
              <Col xl={2}>
                {pdfData.country !== "India"
                  ? `US $${pdfData.price / 100}.00`
                  : `INR ${pdfData.price}`}
              </Col>
            </Row>
          </div>
          <div className="pdf_table">
            <div>
              Notice : Payment once paid will not be refunded under any
              circumstances, your currency is evaluated based on your location
              of residence. Please find the refund policy in help section for
              more details
            </div>
          </div>
          <div className="pdf_table">
            <div style={{ textAlign: "center" }}>
              Thank for joining our Pro Team
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={cancelSubscriptionPopup}
        onClose={() => setCancelSubscriptionPopup(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
      >
        <DialogContent
          className={All.PopupBody}
          style={{ marginBottom: "50px" }}
        >
          <div style={{ position: "absolute", top: "20px", right: "20px" }}>
            <img
              src={Close}
              alt=""
              onClick={() => setCancelSubscriptionPopup(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <Row style={{ marginTop: "30px" }}>
            {uploadedImages.length + pendingImages >
              5 ||
            uploaded3d.length + pending3d > 0 ||
            uploadedVideos.length + pendingVideos >
              0 ? (
              <>
                <div className="u_f_popup_title" style={{ width: "100%" }}>
                  Delete some files to cancel subscription
                </div>
                <div className="u_f_popup_title2" style={{ width: "100%" }}>
                  Images (Maximum 6) :
                </div>
                <div className="u_f_popup_title3" style={{ width: "100%" }}>
                  Uploaded Images :
                </div>
                <Row>
                  {uploadedImages.map((image, index) => {
                    return(
                      <Col>
                        <div>
                          <img src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`} alt="uploaded image" width = {"200px"} style = {{borderRadius: "10px"}}/>
                        </div>
                      </Col>
                    )
                  })}
                </Row>
                <div className="u_f_popup_title3" style={{ width: "100%" }}>
                  Pending Images :
                </div>
                <Row>
                  {pendingImages.map((image, index) => {
                    return(
                      <Col>
                        <div>
                          <img src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`} alt="uploaded image" width = {"200px"} style = {{borderRadius: "10px"}}/>
                        </div>
                      </Col>
                    )
                  })}
                </Row>
                <div className="u_f_popup_btn_container">
                  <button
                    className="u_f_popup_btn2"
                    onClick={() => setCancelSubscriptionPopup(false)}
                  >
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="u_f_popup_title" style={{ width: "100%" }}>
                  Are you sure. Do you want to cancel the subscription?
                </div>
                <div className="u_f_popup_btn_container">
                  <button
                    className="u_f_popup_btn2"
                    onClick={() => setCancelSubscriptionPopup(false)}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </Row>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Pilot_Payments;
