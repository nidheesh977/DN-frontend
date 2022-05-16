import React, { useEffect, useState } from "react";
import { Container, Row, Col, Visible, Hidden } from "react-grid-system";
import All from "../All.module.css";
import "../../css/Checkout.css";
import { Link, useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Select from "react-select";
import Countries from "../../../apis/country.json";
import Dialog from "@material-ui/core/Dialog";
import Close from "../../images/close.svg";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";

const domain = process.env.REACT_APP_MY_API;

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function CompanyPaymentAddress() {
  const param = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState([
    2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033,
  ]);
  const [secret, setSecret] = useState("");

  const history = useHistory();

  const [addressSaved, setAddressSaved] = useState(false);
  const [addressFailed, setAddressFailed] = useState(false);
  const [formData, setFormData] = useState({
    line1: "",
    line2: "",
    pin_code: "",
    city: "",
    state: "",
    country: "",
    country_code: "",
    country_object: "",
  });
  const [profilePic, setProfilePic] = useState(
    "https://iconape.com/wp-content/png_logo_vector/user-circle.png"
  );

  const customStyles = {
    container: (provided) => ({
      ...provided,
      height: 50,
    }),
  };

  let [country_list, setCountryList] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
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
        console.log(res.data);
        setFormData({
          ...formData,
          line1: res.data.line1 ? res.data.line1 : "",
          line2: res.data.line2 ? res.data.line2 : "",
          pin_code: res.data.pin_code ? Number(res.data.pin_code) : "",
          city: res.data.city ? res.data.city : "",
          state: res.data.state ? res.data.state : "",
          country: country.label ? country.label : "",
          country_code: country.value ? country.value : "",
          country_object: country ? country : "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .post(`${domain}/api/user/pilotDetails`, config)
    //   .then((res) => {
    //     console.log(res);
    //     setProfilePic(res.data.profilePic);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // axios
    //   .post(`${domain}/api/subscription/getSubscription`, { id: param.id })
    //   .then((res) => {
    //     console.log(res);
    //     setData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const options = Countries.map((d) => ({
      value: d.code,
      label: d.name,
    }));
    setCountryList(options);
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

    var fields = ["line1", "line2", "city", "state", "country"];

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
        line1: formData.line1,
        line2: formData.line2,
        pin_code: formData.pin_code,
        city: formData.city,
        state: formData.state,
        country: formData.country_code,
      };

      axios
        .post(`${domain}/api/company/updateCompanyAddress`, submitData, config)
        .then((res) => {
          console.log(res.data);
          setAddressSaved(true);
        })
        .catch((err) => {
          console.log(err);
          setAddressFailed(true);
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

  return (
    <div>
      <div style={{ overflowX: "hidden" }}>
        <Container className={All.Container}>
          
          <Row gutterWidth={40}>
            <Col>
              <div className="c_title" style={{ marginBottom: "20px" }}>
                Payment address{" "}
              </div>

              <Row>
                <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                  <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="line1">
                      <div className="pd_b_i_profile_head">Address Line1</div>
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
                      <div className="pd_b_i_profile_head">Address Line2</div>
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

                    <div id="address_page_country">
                      <Select
                        styles={{
                          ...customStyles,
                          border: "1px solid grey",
                        }}
                        isDisabled = {true}
                        options={country_list}
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
              <div style={{ marginBottom: "250px" }}>
                <button
                  className="c_cBtn"
                  style={{ display: "inline-block" }}
                  onClick={submitStep1}
                >
                  Save Changes
                </button>
              </div>
            </Col>
          </Row>
        </Container>
        <Dialog
          open={addressSaved}
          onClose={() => setAddressSaved(false)}
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
                onClick={() => setAddressSaved(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title" style={{ width: "100%" }}>
                Changes saved successfully
              </div>
              <div className="u_f_popup_btn_container">
                <button
                  className="u_f_popup_btn2"
                  onClick={() => setAddressSaved(false)}
                >
                  Close
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
        <Dialog
          open={addressFailed}
          onClose={() => setAddressFailed(false)}
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
                onClick={() => setAddressFailed(false)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <Row style={{ marginTop: "30px" }}>
              <div className="u_f_popup_title" style={{ width: "100%" }}>
                Address change failed
              </div>
              <div className="u_f_popup_btn_container">
                <button
                  className="u_f_popup_btn2"
                  onClick={() => setAddressFailed(false)}
                >
                  Close
                </button>
              </div>
            </Row>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CompanyPaymentAddress;
