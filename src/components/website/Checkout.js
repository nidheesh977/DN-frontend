import React, { useEffect, useState } from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "./All.module.css";
import "../css/Checkout.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Select from "react-select";
import Countries from "../../apis/country.json";
import Dialog from "@material-ui/core/Dialog";
import Close from "../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Loader from "../Loader/loader";

const domain = process.env.REACT_APP_MY_API;
const stripePromise = loadStripe(
  "pk_test_51KqxC0SBkY4kbyYOgZAaa1VUn9UVe4FC4tR2rGAo6XqkpbJXFAz0p3ZZJhAipUxPG78kxQLTAPSG3hxVpRLHdHe500fGatStGD"
);

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function Checkout() {
  const param = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState([
    2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033,
  ]);
  const [secret, setSecret] = useState(
    ""
  );

  const history = useHistory()

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    line1: "",
    line2: "",
    pin_code: "",
    city: "",
    state: "",
    country: "",
    country_code: "",
    country_object: "",
  });

  const customStyles = {
    container: (provided) => ({
      ...provided,
      height: 50,
    }),
  };

  let [test, setTest] = useState([]);
  let [payment_success, setPayment_success] = useState(false);

  useEffect(() => {
    axios
      .post(`${domain}/api/subscription/getSubscription`, { id: param.id })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    const options = Countries.map((d) => ({
      value: d.code,
      label: d.name,
    }));
    setTest(options);
  }, []);
  const options = {
    clientSecret: secret,
  };

  const submitStep1 = () => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    var fields = [
      "name",
      "email",
      "line1",
      "line2",
      "city",
      "state",
      "country",
    ];

    let error = false;
    let focusField = "";
    for (var i = 0; i < fields.length; i++) {
      if (fields[i] !== "line2" && fields[i] !== "state") {
        if (formData[fields[i]] === "") {
          error = true;
          document.getElementById(`${fields[i]}_error`).style.display =
            "contents";
          if (focusField === "" && fields[i] !== "country") {
            focusField = fields[i];
          }
        } else {
          if (
            fields[i] === "name" &&
            (formData.name.length > 100 || formData.name.length < 2)
          ) {
            error = true;
            document.getElementById(`${fields[i]}_error`).innerText =
              "Name length should be between 2 and 100";
            document.getElementById(`${fields[i]}_error`).style.display =
              "contents";
            if (focusField === "") {
              focusField = fields[i];
            }
          }
          if (fields[i] === "email") {
            console.log(formData.email)
            if (formData.email.length > 100) {
              error = true;
              document.getElementById(`${fields[i]}_error`).innerText =
                "EmailID length should not exceed 100";
              document.getElementById(`${fields[i]}_error`).style.display =
                "contents";
              if (focusField === "") {
                focusField = fields[i];
              }
            } else if (!validateEmail(formData.email)) {
              error = true;
              document.getElementById(`${fields[i]}_error`).innerText =
                "EmailId is not valid";
              document.getElementById(`${fields[i]}_error`).style.display =
                "contents";
              if (focusField === "") {
                focusField = fields[i];
              }
            }
          }
          if (fields[i] === "line1" && formData.line1.length > 100) {
            error = true;
            document.getElementById(`${fields[i]}_error`).innerText =
              "Address Line1 length should not exceed 100";
            document.getElementById(`${fields[i]}_error`).style.display =
              "contents";
            if (focusField === "") {
              focusField = fields[i];
            }
          }
          if (fields[i] === "city" && formData.city.length > 100) {
            error = true;
            document.getElementById(`${fields[i]}_error`).innerText =
              "City length should not exceed 100";
            document.getElementById(`${fields[i]}_error`).style.display =
              "contents";
            if (focusField === "") {
              focusField = fields[i];
            }
          }
          if (fields[i] === "country" && formData.country.length > 100) {
            error = true;
            document.getElementById(`${fields[i]}_error`).innerText =
              "Country length should not exceed 100";
            document.getElementById(`${fields[i]}_error`).style.display =
              "contents";
            if (focusField === "") {
              focusField = fields[i];
            }
          }
        }
      } else {
        if (fields[i] === "line2" && formData.line2.length > 100) {
          error = true;
          document.getElementById(`${fields[i]}_error`).innerText =
            "Address Line2 length should not exceed 100";
          document.getElementById(`${fields[i]}_error`).style.display =
            "contents";
          if (focusField === "") {
            focusField = fields[i];
          }
        }
        if (fields[i] === "state" && formData.state.length > 100) {
          error = true;
          document.getElementById(`${fields[i]}_error`).innerText =
            "State length should not exceed 100";
          document.getElementById(`${fields[i]}_error`).style.display =
            "contents";
          if (focusField === "") {
            focusField = fields[i];
          }
        }
      }
    }
    if (!error) {

      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      
      let submitData = {
        name: formData.name,
        email: formData.email,
        line1: formData.line1,
        line2: formData.line2,
        pin_code: formData.pin_code,
        city: formData.city,
        state: formData.state,
        country: formData.country_code,
      };
      console.log(formData.country_code)
      axios.post(`${domain}/api/payment/startPaymentProcess`, submitData, config)
      .then(res=>{
        console.log(res.data)
        setSecret(res.data.clientSecret)
        setStep(2);
        window.scrollTo(0, 150);
      });
    } else {
      document.getElementById(focusField).focus();
    }
  };

  const formChangeHandler = (e) => {
    if (e.target.name === "pin_code") {
      setFormData({
        ...formData,
        pin_code: e.target.value.slice(0, 6),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    document.getElementById(`${e.target.name}_error`).style.display = "none";
  };

  const closePaymentPopup = () => {
    history.push("/pilot_dashboard")
  }

  const countryChangeHandler = (country) => {
    console.log(country);
    setFormData({
      ...formData,
      country: country.label,
      country_code: country.value,
      country_object: country,
    });
    document.getElementById("country_error").style.display = "none";
  };

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
        console.log("Loading");
        return;
      }

      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        // confirmParams: {
        //   return_url:
        //     "http://localhost:3000/pilot_dashboard/activities/images",
        // },
        redirect: "if_required",
      });

      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result);
      } else {
        setPayment_success(true)
        console.log(result)
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div style={{ textAlign: "right" }}>
          <button
            disabled={!stripe}
            className="c_cBtn"
            style={{ display: "inline-block" }}
          >
            Submit
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <div className="h_p_container" style={{ overflowX: "hidden" }}>
        <Container className={All.Container}>
          <Row gutterWidth={40}>
            <Col xl={4.5}>
              <div id="h_p_create_job_container">
                <div className="c_sideTitle">By Upgrading You get</div>
                <div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">{data.images} Images</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">{data.videos} Videos</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      {data.images3d} 3D Images
                    </span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">Save as Draft Feature</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">Multiple Upload Feature</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      Immediate Approval of Images
                    </span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">Daily Job Notifications</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      Profile in suggestions of Top Jobs
                    </span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      Pro Label on your Profile
                    </span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      Access to rearrange your images to display
                    </span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      Chances to get hired from your shoot pages
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col>
              <div className="c_title">
                Complete your payment and start living your dream.{" "}
              </div>
              <div className="c_payment">Checkout Details</div>
              <hr />

              <div className="c_costingDiv">
                <div className="c_costingTitle">Basic Cost</div>
                <div className="c_costingCost">${data.price}.00 USD</div>
              </div>

              <div className="c_costingDiv">
                <div className="c_costingTitle">GST/Basic Tax</div>
                <div className="c_costingCost">${data.gst}.00 USD</div>
              </div>

              <div className="c_costingDiv">
                <div className="c_costingTitle">Total Payment</div>
                <div className="c_costingCost">
                  ${Number(data.price) + Number(data.gst)}.00 USD
                </div>
              </div>
              <div className="c_disclaimer">
                All sales are charged in USD and all sales are final. You will
                be charged ${Number(data.price) + Number(data.gst)}.00 USD
                immediately. You will be charged every 30 days thereafter while
                the subscription is active. Cancel any time. Exchange rates are
                estimated based on our most recent conversion data and may not
                reflect the full charge value.
              </div>
              <hr />
              {step === 1 ? (
                <>
                  <Row>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                      <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="name">
                          <div className="pd_b_i_profile_head">Name</div>
                        </label>
                        <input
                          type="text"
                          className="pd_b_i_profile_input c_input"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={formChangeHandler}
                        />
                      </div>
                      <div className="login_input_error_msg" id="name_error">
                        Name is required
                      </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                      <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="email">
                          <div className="pd_b_i_profile_head">Email Id</div>
                        </label>
                        <input
                          type="email"
                          className="pd_b_i_profile_input c_input"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={formChangeHandler}
                        />
                      </div>
                      <div className="login_input_error_msg" id="email_error">
                        EmailID is required
                      </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                      <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="line1">
                          <div className="pd_b_i_profile_head">
                            Address Line1
                          </div>
                        </label>
                        <input
                          type="text"
                          className="pd_b_i_profile_input c_input"
                          id="line1"
                          name="line1"
                          value={formData.line1}
                          onChange={formChangeHandler}
                        />
                      </div>
                      <div className="login_input_error_msg" id="line1_error">
                        Address Line1 is required
                      </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                      <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="line2">
                          <div className="pd_b_i_profile_head">
                            Address Line2
                          </div>
                        </label>
                        <input
                          type="text"
                          className="pd_b_i_profile_input c_input"
                          id="line2"
                          name="line2"
                          value={formData.line2}
                          onChange={formChangeHandler}
                        />
                      </div>
                      <div className="login_input_error_msg" id="line2_error">
                        Address Line2 length should not exceed 100
                      </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                      <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="pin_code">
                          <div className="pd_b_i_profile_head">Postal code</div>
                        </label>
                        <input
                          type="number"
                          className="pd_b_i_profile_input c_input"
                          id="pin_code"
                          name="pin_code"
                          value={formData.pin_code}
                          onChange={formChangeHandler}
                        />
                      </div>
                      <div className="login_input_error_msg" id="pin_code_error"></div>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                      <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="city">
                          <div className="pd_b_i_profile_head">City</div>
                        </label>
                        <input
                          type="text"
                          className="pd_b_i_profile_input c_input"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={formChangeHandler}
                        />
                      </div>
                      <div className="login_input_error_msg" id="city_error">
                        City is required
                      </div>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                      <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="state">
                          <div className="pd_b_i_profile_head">State</div>
                        </label>
                        <input
                          type="text"
                          className="pd_b_i_profile_input c_input"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={formChangeHandler}
                        />
                      </div>
                      <div className="login_input_error_msg" id="state_error"></div>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                      <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="country">
                          <div className="pd_b_i_profile_head">Country</div>
                        </label>

                        <div id="checkout_page_country">
                          <Select
                            styles={{
                              ...customStyles,
                              border: "1px solid grey",
                            }}
                            options={test}
                            value={formData.country_object}
                            onChange={countryChangeHandler}
                          />
                        </div>
                      </div>
                      <div className="login_input_error_msg" id="country_error">
                        Country is required
                      </div>
                    </Col>
                  </Row>
                  <div style={{ textAlign: "right", marginBottom: "250px" }}>
                    <button
                      className="c_cBtn"
                      style={{ display: "inline-block" }}
                      onClick={submitStep1}
                    >
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm />
                </Elements>
              )}

              {/* <label
                for="check"
                style={{ cursor: "pointer", marginBottom: "15px" }}
                className="signup_terms_conditions"
              >
                <input type="checkbox" id="check" /> Save Card for Future
                Payments
              </label> */}
              {/* <hr />

              <Link to="/HireSubscription">
                <button className="c_cBtn1" style={{ display: "inline-block" }}>
                  Choose Other
                </button>
              </Link> */}
            </Col>
          </Row>
        </Container>
        <Dialog
          open={payment_success}
          onClose={closePaymentPopup}
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
                onClick={closePaymentPopup}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <img src={payment_success} alt="" style={{ margin: "auto" }} />
              <div className="u_p_v_popup_title">Thank you</div>
              <div className="u_p_v_popup_content">
                We have recieved your payment
              </div>
              <button
                className="u_p_v_popup_close_btn"
                onClick={closePaymentPopup}
              >
                Close
              </button>
            </Row>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Checkout;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
