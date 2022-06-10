import React from "react";
import { Steps, Step } from "react-step-builder";
import EmailId from "../stepsform/EmailId";
import Otp from "../stepsform/Otp";
import { Helmet } from "react-helmet";
// import FinalStep from "../stepsform/FinalStep";   

function ForgotPassword() {
  return (
    <>
    <Helmet>
          <title>Forget password</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Nested component" />
        </Helmet>
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