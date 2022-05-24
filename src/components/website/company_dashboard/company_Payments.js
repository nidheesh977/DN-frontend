import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import "./css/HireProposal.css";
import { jsPDF } from "jspdf";
import Dialog from "@material-ui/core/Dialog";
import Close from "../../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import All from "../All.module.css";
import { useHistory } from "react-router-dom";

const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function CompanyPayments() {
  const history = useHistory();
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  let [data, setData] = useState([]);
  let [cancelSubscriptionPopup, setCancelSubscriptionPopup] = useState(false);

  let [subscriptionDetails, setSubscriptionDetails] = useState("No Subscription");
  let [subscriptionDetailsLoading, setSubscriptionDetailsLoading] = useState(true);
  let [subscriptionCancelled, setSubscriptionCancelled] = useState(false);

  let [uploadedImages, setUploadedImages] = useState([]);
  let [uploaded3d, setUploaded3d] = useState([]);
  let [uploadedVideos, setUploadedVideos] = useState([]);

  let [pendingImages, setPendingImages] = useState([]);
  let [pending3d, setPending3d] = useState([]);
  let [pendingVideos, setPendingVideos] = useState([]);

  useEffect(() => {
    setSubscriptionDetailsLoading(true)
    axios.get(`${domain}/api/payment/getPayments`, config).then((res) => {
      console.log(res);
      setData(res.data);
    });
    axios
      .post(`${domain}/api/companySubscription/getSubscriptionCompany`, config)
      .then((res) => {
        setSubscriptionDetailsLoading(false)
        setSubscriptionDetails(res.data);
        console.log(res);
      })
      .catch((err) => {
        setSubscriptionDetailsLoading(false)
      })
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
    gstNo: "123"
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
    plan,
    gstNo
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
      gstNo
    });
    let doc = new jsPDF("portrait", "pt", "A4");
    doc.html(document.getElementById("pdf-view"), {
      callback: () => {
        doc.save("test.pdf");
      },
    });
  };

  const deleteImage = (id, path) => {
    axios.post(`${domain}/api/image/deleteImage/${id}`, config).then((res) => {
      axios.post(`${domain}/api/image/${path}`, config).then((response) => {
        console.log(response.data);
        if (path === "getApprovedImages") {
          setUploadedImages(response.data);
        } else if (path === "getPendingImages") {
          setPendingImages(response.data);
        } else if (path === "getApprovedVideos") {
          setUploadedVideos(response.data);
        } else if (path === "getPendingVideos") {
          setPendingVideos(response.data);
        } else if (path === "getApproved3d") {
          setUploaded3d(response.data);
        } else if (path === "getPending3d") {
          setPending3d(response.data);
        }
      });
    });
  };

  const confirmCancelSubscription = () => {
    console.log("Subscription cancelled");
    setCancelSubscriptionPopup(false);
    
   axios.post(`${domain}/api/companySubscription/cancelSubscription`, config).then(res=>{
    axios
    .post(`${domain}/api/companySubscription/getSubscriptionCompany`, config)
    .then((res) => {
      setSubscriptionDetailsLoading(false)
      setSubscriptionDetails(res.data);
      console.log(res);
    })
    .catch((err) => {
      setSubscriptionDetailsLoading(false)
    })
   }).catch(err=>{
     console.log(err)
   })

  };

  return (
    <div>
      {!subscriptionDetailsLoading ?
      <>{subscriptionDetails !== "No Subscription" ? (
        <Row className="sub_det_container">
          <Col xxl={12} className="sub_det_col1">
            <div className="sub_det_plan" style = {{textTransform: "capitalize"}}>
              {subscriptionDetails.subscription ? subscriptionDetails.subscription.plan : "Plan"}
            </div>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6} className="sub_det_col2">
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
              <div className="sub_det_title">Duration :</div>
              <div className="sub_det_content" id="sub_det_start_date">
                {subscriptionDetails.startDate
                  ? new Date(subscriptionDetails.startDate * 1e3)
                      .toISOString()
                      .slice(0, 10) + " -> " + new Date(subscriptionDetails.endDate * 1e3)
                      .toISOString()
                      .slice(0, 10)
                  : ""}
              </div>
            </div>
          </Col>
          <Col className="sub_det_col3">
            <div>
              <div className="sub_det_title">No of active jobs :</div>
              <div className="sub_det_content" id="sub_det_start_date">
                {subscriptionDetails.subscription.activeJobs}
              </div>
            </div>
            <div>
              <div className="sub_det_title">Profile View Count :</div>
              <div className="sub_det_content" id="sub_det_start_date">
                {/* {subscriptionDetails.sub ? subscriptionDetails.sub.videos-subscriptionDetails.videos : ""} Videos */} {subscriptionDetails.subscription.views}
              </div>
            </div>
            <div>
              <div className="sub_det_title">Email proposals (Direct Hire) :</div>
              <div className="sub_det_content" id="sub_det_start_date">
              {/* {subscriptionDetails.sub
                  ? subscriptionDetails.sub.images3d - subscriptionDetails.images3d
                  : ""} 3dimages */} {subscriptionDetails.subscription.proposals}
              </div>
            </div>
          </Col>
          <div
            style={{ textAlign: "center", width: "100%", marginTop: "30px" }}
          >
            {subscriptionDetails.sub && (
              subscriptionDetails.sub.plan&&<>
                {subscriptionDetails.sub.plan.includes("Gold") && (
                  <button
                    className="c_cBtn3"
                    onClick={() => history.push("/DownloadSubscription")}
                  >
                    Upgrade to Platinum
                  </button>
                )}
              </>
            )}
            <button className="c_cBtn4" onClick={cancelSubscription}>
              Cancel Subscription
            </button>
          </div>
        </Row>
      ) : (
        <div id="tohide" style={{ textAlign: "center" }}>
          <div>No Subscriptions yet please Upgrade</div>
          <button
            className="c_cBtn3"
            onClick={() => history.push("/DownloadSubscription")}
          >
            Upgrade
          </button>
        </div>
      )}</> 
      :<div id="tohide" style={{ textAlign: "center" }}>
      <div>Loading ...</div>
    </div>
      }

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
      {data.length === 0 ? (
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
                          item.plan, 
                          item.gstNo
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
            {
              pdfData.gstNo ? 
              
              <Col style={{ border: "1px solid gray", padding: "5px" }}>
              <div className="pdf_client">GST No : </div>
              <div>{pdfData.gstNo}</div>
            </Col> : <></>
            }
            
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
            {uploadedImages.length + pendingImages.length > 6 ||
            uploaded3d.length + pending3d.length > 0 ||
            uploadedVideos.length + pendingVideos.length > 0 ? (
              <>
                <div
                  className="u_f_popup_title"
                  style={{ width: "100%", marginBottom: "0px" }}
                >
                  Delete some files to cancel subscription
                </div>
                <div
                  className="u_f_popup_title"
                  style={{ width: "100%", fontSize: "20px" }}
                >
                  All draft files will be deleted
                </div>
                {uploadedImages.length + pendingImages.length > 6 ? (
                  <>
                    <div className="u_f_popup_title2" style={{ width: "100%" }}>
                      Images (Maximum 6) :
                    </div>
                    <div className="u_f_popup_title3" style={{ width: "100%" }}>
                      {uploadedImages.length > 0 ? "Uploaded Images :" : ""}
                    </div>
                    <Row style={{ width: "100%" }}>
                      {uploadedImages.map((image, index) => {
                        return (
                          <>
                            <Col md={3} sm={4} xs={6}>
                              <div className="u_i_file_container">
                                <img
                                  src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`}
                                  alt="uploaded image"
                                  width={"100%"}
                                  style={{ borderRadius: "10px" }}
                                />
                                <div
                                  className="u_i_trash"
                                  onClick={() =>
                                    deleteImage(image._id, "getApprovedImages")
                                  }
                                >
                                  <i class="fas fa-trash-alt"></i>
                                </div>
                              </div>
                            </Col>
                          </>
                        );
                      })}
                    </Row>
                    <div className="u_f_popup_title3" style={{ width: "100%" }}>
                      {pendingImages.length ? "Pending Images :" : ""}
                    </div>
                    <Row style={{ width: "100%" }}>
                      {pendingImages.map((image, index) => {
                        return (
                          <>
                            <Col md={3} sm={4} xs={6}>
                              <div className="u_i_file_container">
                                <img
                                  src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`}
                                  alt="pending image"
                                  width={"100%"}
                                  style={{ borderRadius: "10px" }}
                                />
                                <div
                                  className="u_i_trash"
                                  onClick={() =>
                                    deleteImage(image._id, "getPendingImages")
                                  }
                                >
                                  <i class="fas fa-trash-alt"></i>
                                </div>
                              </div>
                            </Col>
                          </>
                        );
                      })}
                    </Row>
                  </>
                ) : (
                  ""
                )}

                {uploadedVideos.length + pendingVideos.length !== 0 ? (
                  <>
                    <div className="u_f_popup_title2" style={{ width: "100%" }}>
                      Videos (Remove all) :
                    </div>
                    <div className="u_f_popup_title3" style={{ width: "100%" }}>
                      {uploadedVideos.length > 0 ? "Uploaded Videos :" : ""}
                    </div>
                    <Row style={{ width: "100%" }}>
                      {uploadedVideos.map((image, index) => {
                        return (
                          <>
                            <Col md={3} sm={4} xs={6}>
                              <div className="u_i_file_container">
                                <video
                                  src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`}
                                  width={"100%"}
                                  style={{ borderRadius: "10px" }}
                                ></video>
                                <div
                                  className="u_i_trash"
                                  onClick={() =>
                                    deleteImage(image._id, "getApprovedVideos")
                                  }
                                >
                                  <i class="fas fa-trash-alt"></i>
                                </div>
                              </div>
                            </Col>
                          </>
                        );
                      })}
                    </Row>
                    <div className="u_f_popup_title3" style={{ width: "100%" }}>
                      {pendingVideos.length > 0 ? "Pending Videos :" : ""}
                    </div>
                    <Row style={{ width: "100%" }}>
                      {pendingVideos.map((image, index) => {
                        return (
                          <>
                            <Col md={3} sm={4} xs={6}>
                              <div className="u_i_file_container">
                                <video
                                  src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`}
                                  alt="pending image"
                                  width={"100%"}
                                  style={{ borderRadius: "10px" }}
                                ></video>
                                <div
                                  className="u_i_trash"
                                  onClick={() =>
                                    deleteImage(image._id, "getPendingVideos")
                                  }
                                >
                                  <i class="fas fa-trash-alt"></i>
                                </div>
                              </div>
                            </Col>
                          </>
                        );
                      })}
                    </Row>
                  </>
                ) : (
                  ""
                )}

                {uploaded3d.length + pending3d.length !== 0 ? (
                  <>
                    <div className="u_f_popup_title2" style={{ width: "100%" }}>
                      3d Images (Remove all) :
                    </div>
                    <div className="u_f_popup_title3" style={{ width: "100%" }}>
                      {uploaded3d.length > 0 ? "Uploaded 3d Images :" : ""}
                    </div>
                    <Row style={{ width: "100%" }}>
                      {uploaded3d.map((image, index) => {
                        return (
                          <>
                            <Col md={3} sm={4} xs={6}>
                              <div className="u_i_file_container">
                                <img
                                  src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`}
                                  alt="uploaded image"
                                  width={"100%"}
                                  style={{ borderRadius: "10px" }}
                                />
                                <div
                                  className="u_i_trash"
                                  onClick={() =>
                                    deleteImage(image._id, "getApproved3d")
                                  }
                                >
                                  <i class="fas fa-trash-alt"></i>
                                </div>
                              </div>
                            </Col>
                          </>
                        );
                      })}
                    </Row>
                    <div className="u_f_popup_title3" style={{ width: "100%" }}>
                      {pending3d.length > 0 ? "Pending 3d Images :" : ""}
                    </div>
                    <Row style={{ width: "100%" }}>
                      {pending3d.map((image, index) => {
                        return (
                          <>
                            <Col md={3} sm={4} xs={6}>
                              <div className="u_i_file_container">
                                <img
                                  src={`https://dn-nexevo-home.s3.ap-south-1.amazonaws.com/${image.file}`}
                                  alt="pending image"
                                  width={"100%"}
                                  style={{ borderRadius: "10px" }}
                                />
                                <div
                                  className="u_i_trash"
                                  onClick={() =>
                                    deleteImage(image._id, "getPending3d")
                                  }
                                >
                                  <i class="fas fa-trash-alt"></i>
                                </div>
                              </div>
                            </Col>
                          </>
                        );
                      })}
                    </Row>
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <div className="u_f_popup_title" style={{ width: "100%" }}>
                  Are you sure. Do you want to cancel the subscription?
                </div>
                <div className="u_f_popup_btn_container">
                  <button
                    className="u_f_popup_btn2"
                    onClick={confirmCancelSubscription}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </Row>
        </DialogContent>
      </Dialog>
      <Dialog
        open={subscriptionCancelled}
        onClose={() => setSubscriptionCancelled(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth={true}
        PaperProps={{ style: { width: "820px", borderRadius: "10px" } }}
      >
        <DialogContent
          className={All.PopupBody}
          style={{ marginBottom: "50px" }}
        >
          <div style={{ position: "absolute", top: "20px", right: "20px" }}>
            <img
              src={Close}
              alt=""
              onClick={() => setSubscriptionCancelled(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <Row style={{ marginTop: "30px" }}>
            <div className="u_f_popup_title">
              Subscription cancelled successfully.
            </div>
            <div className="u_f_popup_btn_container">
              <button
                className="u_f_popup_btn2"
                onClick={() => setSubscriptionCancelled(false)}
              >
                Close
              </button>
            </div>
          </Row>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CompanyPayments;
