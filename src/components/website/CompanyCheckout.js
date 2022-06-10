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
import payment_success from "../images/payment_success.png";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Loader from "../Loader/loader";
import { Helmet } from "react-helmet";

const domain = process.env.REACT_APP_MY_API;
const stripePromise = loadStripe(
  "pk_test_51KqxC0SBkY4kbyYOgZAaa1VUn9UVe4FC4tR2rGAo6XqkpbJXFAz0p3ZZJhAipUxPG78kxQLTAPSG3hxVpRLHdHe500fGatStGD"
);

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function CompanyCheckout(props) {
  let { plan } = useParams();

  const param = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [payment_creation_failed, setPaymentCreationFailed] = useState(false);
  const [payment_failed, setPaymentFailed] = useState(false);
  const [years, setYears] = useState([
    2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033,
  ]);
  const [secret, setSecret] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [code, setCode] = useState("");

  const history = useHistory();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    pin_code: "",
    city: "",
    state: "",
    country: "",
    country_code: "",
    country_object: "",
    gstNo: "",
  });

  const customStyles = {
    container: (provided) => ({
      ...provided,
      height: 50,
    }),
  };

  let [test, setTest] = useState([]);
  let [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    let role = localStorage.getItem("role");
    if (role && role !== "company") {
      history.push("/no-page-found")
    }
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
    if (localStorage.getItem("role") === "company") {
      axios
        .post(`${domain}/api/company/getCompanyAddress`, config)
        .then((res) => {
          console.log(res.data);
          const options = Countries.map((d) => ({
            value: d.code,
            label: d.name,
          }));
          var country = {};
          for (var i = 0; i < Countries.length; i++) {
            if (
              Countries[i].name === res.data.country ||
              Countries[i].code === res.data.country
            ) {
              country = { value: Countries[i].code, label: Countries[i].name };
              break;
            }
          }
          setFormData({
            ...formData,
            name: res.data.name ? res.data.name : "",
            email: res.data.email ? res.data.email : "",
            line1: res.data.line1 ? res.data.line1 : "",
            line2: res.data.line2 ? res.data.line2 : "",
            pin_code: res.data.pin_code ? Number(res.data.pin_code) : "",
            city: res.data.city ? res.data.city : "",
            state: res.data.state ? res.data.state : "",
            country: country.label,
            country_code: country.value,
            country_object: country,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const countries = Countries.map((d) => ({
      value: d.code,
      label: d.name,
    }));
    setTest(countries);

    // axios
    //   .post(`${domain}/api/subscription/getSubscription`, { id: param.id })
    //   .then((res) => {
    //     console.log(res);
    //     setData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);
  const options = {
    clientSecret: secret,
  };
  const [subId, setSubId] = useState("");

  const submitStep1 = () => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (localStorage.getItem("role") === "company") {
      var fields = [
        "name",
        "email",
        "line1",
        "line2",
        "city",
        "state",
        "country",
      ];
    } else {
      var fields = [
        "name",
        "email",
        "phone",
        "line1",
        "line2",
        "city",
        "state",
        "country",
      ];
    }

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
            console.log(formData.email);
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
          if (fields[i] === "phone" && formData.phone.length < 10) {
            error = true;
            document.getElementById(`${fields[i]}_error`).innerText =
              "Phone number should have 10 numbers";
            document.getElementById(`${fields[i]}_error`).style.display =
              "contents";
            if (focusField === "") {
              focusField = fields[i];
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
      setLoading(true);
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
        planName:
          (plan.includes("gold") ? "Gold " : "Platinum ") +
          (plan.includes("monthly") ? "Monthly" : "Yearly"),
      };
      console.log(submitData);
      if (localStorage.getItem("role") === "company") {
        axios
          .post(`${domain}/api/payment/startCompanyPayment`, submitData, config)
          .then((res) => {
            if (saveAddress) {
              axios
                .post(
                  `${domain}/api/company/updateCompanyAddress`,
                  submitData,
                  config
                )
                .then((res) => console.log(res.data));
            }
            setLoading(false);
            console.log(res.data);
            setSecret(res.data.clientSecret);
            setSubId(res.data.subscriptionId);
            setStep(2);
            window.scrollTo(0, 150);
          })
          .catch((err) => {
            setLoading(false);
            setPaymentCreationFailed(true);
          });
      } else {
        axios
          .post(`${domain}/api/user/createNewUser`, {
            name: formData.name,
            email: formData.email,
            phoneNo: formData.phone,
            country: formData.country,
            role: "halfCompany",
          })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("access_token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("email", res.data.verify)
            const config_temp = {
              headers: {
                Authorization: "Bearer " + res.data.token,
              },
            };
            axios
              .post(
                `${domain}/api/payment/startCompanyPayment`,
                submitData,
                config_temp
              )
              .then((res) => {
                if (saveAddress) {
                  axios
                    .post(
                      `${domain}/api/company/updateCompanyAddress`,
                      submitData,
                      config
                    )
                    .then((res) => console.log(res.data));
                }
                setLoading(false);
                console.log(res.data);
                setSecret(res.data.clientSecret);
                setSubId(res.data.subscriptionId);
                setStep(2);
                window.scrollTo(0, 150);
              })
              .catch((err) => {
                setLoading(false);
                setPaymentCreationFailed(true);
              });
          })
          .catch((err) => {
            try {
              if (err.response.data === "User already exists") {
                document.getElementById(`email_error`).innerText =
                  "EmailId already exists";
                document.getElementById(`email_error`).style.display =
                  "contents";
                document.getElementById(`email`).focus();
                setLoading(false);
              } else {
                alert("Something went wrong. Try again later.");
              }
            } catch {
              alert("Something went wrong. Try again later.");
            }
          });
      }
    } else {
      document.getElementById(focusField).focus();
    }
  };

  const phoneChangeHandler = (e) => {
    try {
      if (
        Number(e.target.value.slice(code.length + 1, 10 + code.length + 1)) ||
        e.target.value.slice(code.length + 1, 10 + code.length + 1) === ""
      ) {
        setFormData({
          ...formData,
          ["phone"]: e.target.value.slice(
            code.length + 1,
            10 + code.length + 1
          ),
        });
        document.getElementById(e.target.name + "_error").style.display =
          "none";
      }
    } catch {
      console.log("Not number");
    }
  };

  const formChangeHandler = (e) => {
    console.log(e.target);
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
    if (localStorage.getItem("role") === "company") {
      history.push("/company_dashboard/account/my_subscription");
    } else {
      history.push("/createCompany");
      props.updateLoginStatus();
    }
  };

  const countryChangeHandler = (country) => {
    var result = Countries.filter(
      (obj) => obj.code == country.value || obj.label == country.value
    );
    console.log(result[0].dial_code);
    setCode(result[0].dial_code);
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

    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
      setCheckoutLoading(true);
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
        if (result.error.payment_intent) {
          console.log(result);
          const config = {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          };
          console.log(result.error);
          axios
            .post(
              `${domain}/api/payment/createPayment`,
              {
                userRole: "pilot",
                plan:
                  (plan.includes("gold") ? "Gold " : "Platinum ") +
                  (plan.includes("monthly") ? "Monthly" : "Yearly"),
                transactionId: result.error.payment_intent.id,
                price: result.error.payment_intent.amount,
                status:
                  result.error.payment_intent.last_payment_error.decline_code,
                name: formData.name,
                line1: formData.line1,
                line2: formData.line2,
                city: formData.city,
                country: formData.country,
                pinCode: formData.pin_code,
                state: formData.state,
                gstNo: formData.gstNo,
              },
              config
            )
            .then((res) => {
              console.log(res);
              setPaymentFailed(true);
            });
          setCheckoutLoading(false);
        } else {
          setCheckoutLoading(false);
        }
      } else {
        console.log(result);
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        };
        axios
          .post(
            `${domain}/api/payment/createPayment`,
            {
              userRole: "pilot",
              plan:
                (plan.includes("gold") ? "Gold " : "Platinum ") +
                (plan.includes("monthly") ? "Monthly" : "Yearly"),
              transactionId: result.paymentIntent.id,
              price: result.paymentIntent.amount,
              status: result.paymentIntent.status,
              name: formData.name,
              line1: formData.line1,
              line2: formData.line2,
              city: formData.city,
              country: formData.country,
              pinCode: formData.pin_code,
              state: formData.state,
              gstNo: formData.gstNo,
            },
            config
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err.response);
          });
        setPaymentSuccess(true);
        setCheckoutLoading(false);
        axios
          .post(
            `${domain}/api/companySubscription/createCompanySubscription`,
            {
              plan: plan,
              paymentId: subId,
            },
            config
          )
          .then((res) => {
            console.log(res);
          });
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div>
          <button
            disabled={!stripe}
            className="c_cBtn"
            style={{ display: "flex", marginLeft: "auto" }}
          >
            {checkoutLoading ? <Loader /> : ""}
            Submit
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <Helmet>
          <title>Company checkout</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
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
                    <span className="c_sideSpan">
                      No of active Jobs :{" "}
                      {plan.includes("gold")
                        ? plan.includes("monthly")
                          ? "5"
                          : "60"
                        : plan.includes("monthly")
                        ? "10"
                        : "120"}
                    </span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      Profile View Count :{" "}
                      {plan.includes("gold")
                        ? plan.includes("monthly")
                          ? "50"
                          : "600"
                        : plan.includes("monthly")
                        ? "100"
                        : "1200"}
                    </span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">Saving Pilots</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">
                      Email proposals (Direct Hire) :{" "}
                      {plan.includes("gold")
                        ? plan.includes("monthly")
                          ? "100"
                          : "1200"
                        : plan.includes("monthly")
                        ? "200"
                        : "2400"}
                    </span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">Draft access</span>
                  </div>
                  <div className="c_sideFeaturesDiv">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "#4ffea3", fontSize: "22px" }}
                    />
                    <span className="c_sideSpan">Suggested Candidated</span>
                  </div>
                  {plan.includes("platinum") ? (
                    <>
                      <div className="c_sideFeaturesDiv">
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          style={{ color: "#4ffea3", fontSize: "22px" }}
                        />
                        <span className="c_sideSpan">Boost Job</span>
                      </div>
                      <div className="c_sideFeaturesDiv">
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          style={{ color: "#4ffea3", fontSize: "22px" }}
                        />
                        <span className="c_sideSpan">
                          Verified Recruiter Indication
                        </span>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
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
                <div className="c_costingCost">
                  $
                  {plan.includes("gold")
                    ? plan.includes("monthly")
                      ? "50.00 USD"
                      : "500.00 USD"
                    : plan.includes("monthly")
                    ? "100.00 USD"
                    : "1000.00 USD"}
                </div>
              </div>

              <div className="c_costingDiv">
                <div className="c_costingTitle">GST/Basic Tax</div>
                <div className="c_costingCost">$0.00 USD</div>
              </div>

              <div className="c_costingDiv">
                <div className="c_costingTitle">Total Payment</div>
                <div className="c_costingCost">
                  $
                  {plan.includes("gold")
                    ? plan.includes("monthly")
                      ? "50.00 USD"
                      : "500.00 USD"
                    : plan.includes("monthly")
                    ? "100.00 USD"
                    : "1000.00 USD"}
                </div>
              </div>
              <div className="c_disclaimer">
                All sales are charged in USD and all sales are final. You will
                be charged $
                {plan.includes("gold")
                  ? plan.includes("monthly")
                    ? "50.00 USD"
                    : "500.00 USD"
                  : plan.includes("monthly")
                  ? "100.00 USD"
                  : "1000.00 USD "}
                immediately. You will be charged every{" "}
                {plan.includes("monthly") ? "30" : "365"} days thereafter while
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
                          className="a_j_filter_address"
                          style={{ height: "40px" }}
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={formChangeHandler}
                          disabled={
                            localStorage.getItem("role") === "pilot" ||
                            localStorage.getItem("role") === "company"
                          }
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
                          className="a_j_filter_address"
                          style={{ height: "40px" }}
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={formChangeHandler}
                          disabled={
                            localStorage.getItem("role") === "pilot" ||
                            localStorage.getItem("role") === "company"
                          }
                        />
                      </div>
                      <div className="login_input_error_msg" id="email_error">
                        EmailID is required
                      </div>
                    </Col>
                    {!(
                      localStorage.getItem("role") ||
                      localStorage.getItem("role") === "undefined"
                    ) && (
                      <Col>
                        <div className={All.FormGroup}>
                          <label for="phone">
                            <div className="pd_b_i_profile_head">
                              Phone Number{" "}
                            </div>
                          </label>
                          {/* <PhoneInput defaultCountry="IN" className={All.Phonenumber} name="phone" id="phone" value={value} onChange={setValue}/> */}
                          <input
                            type="text"
                            name="phone"
                            className="a_j_filter_address"
                            id="phone"
                            style={{ height: "40px" }}
                            value={`${code} ${formData.phone}`}
                            onChange={phoneChangeHandler}
                            autoComplete={false}
                          />
                          <div
                            className="login_input_error_msg"
                            id="phone_error"
                          >
                            Phone number is required
                          </div>
                        </div>
                      </Col>
                    )}
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                      <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="line1">
                          <div className="pd_b_i_profile_head">
                            Address Line1
                          </div>
                        </label>
                        <input
                          type="text"
                          className="a_j_filter_address"
                          style={{ height: "40px" }}
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
                          className="a_j_filter_address"
                          style={{ height: "40px" }}
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
                          className="a_j_filter_address"
                          style={{ height: "40px" }}
                          id="pin_code"
                          name="pin_code"
                          value={formData.pin_code}
                          onChange={formChangeHandler}
                        />
                      </div>
                      <div
                        className="login_input_error_msg"
                        id="pin_code_error"
                      ></div>
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                      <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="city">
                          <div className="pd_b_i_profile_head">City</div>
                        </label>
                        <input
                          type="text"
                          className="a_j_filter_address"
                          style={{ height: "40px" }}
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
                          className="a_j_filter_address"
                          style={{ height: "40px" }}
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={formChangeHandler}
                        />
                      </div>
                      <div
                        className="login_input_error_msg"
                        id="state_error"
                      ></div>
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
                              cursor: "pointer",
                            }}
                            isDisabled={
                              localStorage.getItem("role") === "pilot" ||
                              localStorage.getItem("role") === "company"
                            }
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
                    {formData.country_code === "IN" ? (
                      <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                        <div style={{ marginBottom: "10px" }}>
                          <label htmlFor="gstNo">
                            <div className="pd_b_i_profile_head">
                              GSTNO (optional)
                            </div>
                          </label>
                          <input
                            type="text"
                            className="a_j_filter_address"
                            style={{ height: "40px" }}
                            id="gstNo"
                            name="gstNo"
                            value={formData.gstNo}
                            onChange={formChangeHandler}
                          />
                        </div>
                        <div
                          className="login_input_error_msg"
                          id="gstNo_error"
                        ></div>
                      </Col>
                    ) : (
                      <></>
                    )}
                  </Row>
                  {localStorage.getItem("role") === "company" && (
                    <label style={{ width: "fit-content", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        name="save_address"
                        id="save_address"
                        checked={saveAddress}
                        style={{ marginRight: "10px" }}
                        onChange={() => setSaveAddress(!saveAddress)}
                      />
                      Save address for future payments.
                    </label>
                  )}
                  <div style={{ textAlign: "right", marginBottom: "250px" }}>
                    <button
                      className="c_cBtn"
                      style={{ display: "flex", marginLeft: "auto" }}
                      onClick={submitStep1}
                    >
                      {loading ? <Loader /> : ""}
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
          open={paymentSuccess}
          onClose={closePaymentPopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          style={{ textAlign: "center" }}
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
            <div style={{ marginTop: "30px" }}>
              <img
                src={payment_success}
                alt=""
                style={{ margin: "auto", height: "200px" }}
              />
              <div
                className="u_p_v_popup_title"
                style={{ fontFamily: "muli-bold", fontSize: "24px" }}
              >
                Thank you
              </div>
              <div
                className="u_p_v_popup_content"
                style={{ marginBottom: "20px" }}
              >
                We have recieved your payment
              </div>
              {localStorage.getItem("role") === "company" ? (
                <>
                  <button className="c_cBtn3" onClick={closePaymentPopup}>
                    Go to Dashboard
                  </button>
                  <button
                    className="c_cBtn4"
                    onClick={() => history.push("/create_job")}
                  >
                    Go to Create Jobs
                  </button>
                </>
              ) : (
                <button
                  className="c_cBtn4"
                  onClick={() => {
                    history.push("/createCompany");
                    props.updateLoginStatus();
                  }}
                >
                  Complete profile
                </button>
              )}
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={payment_failed}
          onClose={closePaymentPopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          style={{ textAlign: "center" }}
          PaperProps={{
            style: {
              maxWidth: "600px",
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
                onClick={closePaymentPopup}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div style={{ marginTop: "30px" }}>
              <div
                className="u_p_v_popup_title"
                style={{
                  fontFamily: "muli-bold",
                  fontSize: "24px",
                  marginBottom: "10px",
                }}
              >
                Payment failed. Try again later.
              </div>
              <button
                className="c_cBtn3"
                onClick={closePaymentPopup}
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={payment_creation_failed}
          onClose={() => history.push("/HireSubscription")}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"md"}
          fullWidth={true}
          style={{ textAlign: "center" }}
          PaperProps={{
            style: {
              maxWidth: "600px",
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
                onClick={() => history.push("/HireSubscription")}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div style={{ marginTop: "30px" }}>
              <div
                className="u_p_v_popup_title"
                style={{
                  fontFamily: "muli-bold",
                  fontSize: "24px",
                  marginBottom: "10px",
                }}
              >
                Something went wrong. Try again later.
              </div>
              <button
                className="c_cBtn3"
                onClick={() => history.push("/HireSubscription")}
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CompanyCheckout;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
