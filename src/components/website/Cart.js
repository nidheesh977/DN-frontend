import React, {useEffect} from 'react'
import { useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import All from '../website/All.module.css'
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { BuildOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'; 
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors'; 
import { useForm } from "react-hook-form"; 
import GPay from '../images/google-pay.svg'
import PhonePe from '../images/phonepe.svg'
import Paytm from '../images/paytm.svg'
import clock from '../images/clock.svg'
import Radio from '@material-ui/core/Radio';
import Header from '../header/Header'
import axios from 'axios';
import { useParams } from "react-router-dom";
import swal from 'sweetalert';


const API_URL = 'http://localhost/auth-app/public/api/auth';


const emails = ['Stephen Raj', 'Vijay'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
 
    const classes = useStyles();
    const { onClose, selectedValue, open } = props; 
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Change account</DialogTitle>
        <List>
          {emails.map((email) => (
            <ListItem button onClick={() => handleListItemClick(email)} key={email}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          ))}
  
          <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItem>
        </List>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

export default function Cart(props) {
  const [user, Setuser] = useState([]); 

  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

let { slug } = useParams(); 
let { userId } = useParams(); 

useEffect(() => { 
const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('access_token')
  }
}

axios.get('http://localhost/auth-app/public/api/auth/user', config)
.then(res => { 
  Setuser(res.data);  
},
  err => {
    console.log(err); 
  }
)   
 
 
axios.get(`http://localhost/auth-app/public/api/auth/${slug}/download?user_id=${userId}`, config)
.then(res => { 
  setCart(res.data);  
},
  err => {
    console.log(err); 
  }
)   

}, []); 

async function displayRazorpay() {
  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
);

if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
}

const result = await axios.get(`http://localhost/auth-app/public/api/auth/${slug}/download?user_id=${userId}`);

if (!result) {
    alert("Server error. Are you online?");
    return;
}

const { price , id, order_id, user_id,  currency } = result.data;
  
let val=result.data.order_id;
let userid = result.data.user_id
const options = {
    key: "rzp_test_tzURXA4gSDw99d", // Enter the Key ID generated from the Dashboard
    amount: price,  
    currency: currency,
    name: user.name,
    description: "Test Transaction",
    // image: { logo }, 
    id: id,  
    handler: async function (response) {     
        const data = { 
            user_id: userid,
            orderCreationId: val,
            razorpay_payment_id: response.razorpay_payment_id,
            // razorpayOrderId: response.razorpay_order_id,
            // razorpaySignature: response.razorpay_signature, 
        };   
        const config = {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }}
        const result = await axios.post("http://localhost/auth-app/public/api/auth/downloadpayment", data)
        .then(res => res.data)
              .then((data) => {
                swal("Download Sucessfull", {
                  icon: "success",
                });
              })
    },
    prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
    },
    notes: {
        address: user.location,
    },
    theme: {
        color: "#61dafb",
    },
};

const paymentObject = new window.Razorpay(options);
paymentObject.open();
 
}

 

  const [selectedValues, setSelectedValue] = React.useState('a');
  const [Cart, setCart] = useState([]);   
  const handleChanges = (event) => {
    setSelectedValue(event.target.value);
  }; 


    const {register ,handleSubmit, errors, watch ,control  } = useForm();
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValues] = React.useState(emails[1]);

    const [value, setValue] = useState()
    const [state, setState] = React.useState({
        checkedA: false, 
      });
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
  
    const handleClickOpens = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValues(value);
    };

    return (
        <>
        <Header />
                        <section className={All.Cart}>
                            <Container className={All.Container}>
                            <Row> 
                                    <Col lg={8}> 
                                        <Box className={All.BoxShadow}> 
                                        <div className={All.CartUserDetail}>
                                                <figure className={`${All.Avatar} ${All.Darkgreen} ${All.AvatarStateSuccess}`}>
                                                <i class="fa fa-check" aria-hidden="true"></i>
                                                </figure>
                                                <div className={All.UsersListBody}>
                                                    <Box>
                                                        <h5 className={All.Bold}>Login</h5>
                                                        <Typography className={All.LoggedUser} variant="subtitle1">{Cart.author}</Typography>  
                                                    </Box>
                                                    <Box> 
                                                    {/* <Button ml={2} onClick={handleClickOpens} variant="contained" className={All.BtnStyle_7}>
                                                            Change
                                                        </Button> */}

                                                        <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
                                                    </Box>
                                                </div>
                                            </div>
                                        </Box>
                                        <Box className={All.BoxShadow} my={4}> 
                                        <div className={All.CartUserDetail}>
                                                <figure className={`${All.Avatar} ${All.Darkgreen} ${All.AvatarStateSuccess}`}>
                                                <i class="fa fa-check" aria-hidden="true"></i>
                                                </figure>
                                                <div className={All.UsersListBody}>
                                                    <Box pb={4}>
                                                        <h5 className={`${All.Bold} ${All.paddingbottom}`}>File Detail</h5>
                                                        <Box>
                                                        <label className={` ${All.Bold} ${All.paddingtop} ${All.paddingbottom}`}>{Cart.title}</label>
                                                        <label>Posted by {Cart.author} on dn</label>
                                                        </Box>
                                                    </Box> 
                                                </div>
                                            </div>
                                        </Box> 
                                    </Col>
                                    <Col lg={4}> 
                                    <Box className={All.BoxShadow} p={0}  mb={4}>
                                    <Box px={5.5} py={2} style={{borderBottom: '1px dashed #00000038' }}> 
                                             <h5 className={All.Bold}>Price Details</h5>
                                        </Box>
                                        <Box px={5.5}  py={0} mb={0}> 
                                             <p className={`${All.paddingtop} ${All.paddingbottom_5}`} >Price Details <span className={All.FloatRight}>${Cart.price}</span></p>
                                             <p className={`${All.paddingbottom_20} ${All.paddingtop_5}`} style={{borderBottom: '2px dashed #00000038' }}>Delivery Charge <span className={All.FloatRight}>$39</span></p>
                                        </Box>
                                        <Box className={All.TotalAmount} px={5.5}  py={2}>  
                                             <h5 className={All.Bold}>Total Payment <span className={All.FloatRight}><h5 className={All.Bold}>${Number(Cart.price) + Number(39)}</h5></span></h5>
                                        </Box>
                                        </Box>  
                                    </Col> 

                                    <Col lg={8}>
                                    <Box className={All.BoxShadow} my={0}> 
                                        <div className={All.CartUserDetail}>
                                                <figure className={All.AvatarStateSuccess}>
                                                <img src={clock}/>
                                                </figure>
                                                <div>
                                                    <Box>
                                                        <h5 className={`${All.Bold} ${All.paddingbottom}`}>Payment Option</h5>

                                                        <Box pt={2} pb={5}> 
                                                            <div className={All.FormGroup}>
                                                            <Radio checked={selectedValues === 'a'}  onChange={handleChanges} value="a"  color="default"  name="radio-button-demo" inputProps={{ 'aria-label': 'A' }}  /><img src={GPay} />
                                                            <Radio checked={selectedValues === 'b'}  onChange={handleChanges}  value="b"  color="default"  name="radio-button-demo"  inputProps={{ 'aria-label': 'B' }}  /><img src={PhonePe} />
                                                            <Radio checked={selectedValues === 'c'}  onChange={handleChanges}  value="c"  color="default"  name="radio-button-demo"  inputProps={{ 'aria-label': 'B' }}  /><img src={Paytm} /> 
                                                            </div>   
                                                        </Box>


                                                        <Box mb={3}>
                                                        <Button onClick={displayRazorpay}  variant="contained" className={`${All.BtnStyle_5} ${All.LoadMore}`}>
                                                        Pay with Razorpay
                                                        </Button>
                                                        </Box>
                                                    </Box> 
                                                </div>
                                            </div>
                                        </Box> 
                                    </Col>
                                    <Col lg={4}>
                                    </Col>
                            </Row>
                    </Container>
            </section> 
        </>
    )
}
