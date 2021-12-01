import React from "react";
import Header from '../header/Header'
import { Steps, Step } from "react-step-builder";
import EmailId from "../stepsform/EmailId";
import Otp from "../stepsform/Otp";
// import FinalStep from "../stepsform/FinalStep";   

function ForgotPassword() {
  return (
    <>
    <Header />
    <div>
      <Steps>
        <Step component={EmailId} />
        <Step component={Otp} />
        {/* <Step component={FinalStep} /> */}
      </Steps> 
    </div>
    </>
  );
}

export default ForgotPassword;