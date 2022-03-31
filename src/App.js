import React, { useEffect, useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/website/Home";
import SignUp from "./components/website/SignUp";
import Login from "./components/website/Login";
import TermsCondition from "./components/website/TermsCondition";
import DownloadSubscription from "./components/website/DownloadSubscription";
import GoPremium from "./components/website/GoPremium";
import Imageview from "./components/website/Imageview";
import ForgotPassword from "./components/website/ForgotPassword";
import NoPageFound from "./components/website/NoPageFound.js";
// import Dashboard from '../src/components/website/Dashboard'
import "./components/website/All.module.css";
// import Navbar from '../src/components/Navbar'
import { UserContext } from "../src/hooks/UserContext";
import searchresult from "../src/components/website/Searchresult";
// import Alert from "../src/components/alert/Alert.component";
import Role from "../src/components/_helpers/role";
import { authenticationService } from "../src/middleware/auth";
import ServiceCenters from "./components/website/serviceCenterList";
import Footer from "./components/footer/footer";
import UserCategory from "./components/website/UserCategory";
import UploadFiles from "./components/website/UploadFiles";
import ServiceCenterDetails from "./components/website/service_center_details";
import ApplyJob from "./components/website/ApplyJob";
import HireSubscription from "./components/website/HireSubscription"
import HirePilot from './components/website/HirePilot'
import Pilot_dashboard from "./components/website/pilot_dashboard/Pilot_dashboard"
import ScrollToTop from "./components/website/ScrollToTop";
import PilotDetails from './components/website/PilotDetail'
import ServiceCenterDashboard from "./components/website/ServiceCenterDashboard/ServiceCenterDashboard";
import CreateJob from './components/website/CreateJob'
import Company_dashboard from "./components/website/company_dashboard/Company_dashboard";
import ApplyJobLanding from "./components/website/ApplyJobLanding";
import Admin_dashboard from "./components/adminDashboard/Admin_dashboard";
import CreatePilot from "./components/website/CreatePilot";
import CreateCompany from "./components/website/CreateCompany";
import CreateServiceCenter from "./components/website/CreateServiceCenter";
import Categories from "./components/website/Categories";
import EmailVerification from "./components/website/EmailVerification";
import VerifiedEmail from "./components/website/VerifiedEmail";
import RecoverPassword from "./components/website/RecoverPassword";
import EditFile from "../src/components/website/EditFile"
import Center_dashboard from "./components/website/center_dashboard/Center_dashboard";
import PilotRoute from "./PilotRoute";
function App(){

  useEffect(()=>{
    let access_token = localStorage.getItem("access_token")
    if (access_token){
      setLoginStatus(true)
    }else{
      setLoginStatus(false)
    }
  }, [])

  const [loginStatus, setLoginStatus] = useState(true)

  const updateLoginStatus = () => {
    let access_token = localStorage.getItem("access_token")
    if (access_token){
      setLoginStatus(true)
    }else{
      setLoginStatus(false)
    }
  }

    return (
      <HashRouter>
        <Header loginStatus = {loginStatus} updateLoginStatus = {updateLoginStatus}/>
        {/* <Message /> */}
        <UserContext.Provider>
          <ScrollToTop />
          <Switch>
            <Route
              path="/login"
              component={routeProps => <Login  updateLoginStatus = {updateLoginStatus}/>}
              exact
            />

            <PilotRoute component={Pilot_dashboard} path="/pilot_dashboard" />

            <Route
              path="/sign_up"
              component={routeProps => <SignUp  updateLoginStatus = {updateLoginStatus}/>}
              exact
            />
            <Route
              path="/select_category"
              component={UserCategory}
              exact
            />
            <Route
              exact
              path="/ForgotPassword"
              component={ForgotPassword}
            />
            <Route component={Home} path="/" exact />
            <Route
              exact
              path="/TermsCondition"
              component={TermsCondition}
            />
            <Route
              path="/DownloadSubscription"
              component={DownloadSubscription}
              exact
            />
            <Route
              path="/HireSubscription"
              component={HireSubscription}
              exact
            />
            <Route
              path="/GoPremium"
              component={GoPremium}
              exact
            />
            <Route
              exact
              path={"/Imageview/:id/:user_id"}
              component={Imageview}
            />
            <Route
              exact
              path="/hire_pilots"
              component={HirePilot}
            />
            <Route
              exact
              path="/pilot_details/:id"
              component={PilotDetails}
            />
            <Route component = {searchresult} path = "/searchresult" exact />
            <PilotRoute component = {UploadFiles} path = "/UploadFile" exact />
            <Route component = {EditFile} path = "/edit-file/:id" exact />
            <Route component = {ServiceCenters} path = "/service_centers" exact />
            <Route component = {CreateJob} path = "/create_job" exact />
            <Route component = {ServiceCenterDetails} path = "/service_center/:id" exact />
            <Route component = {ServiceCenterDashboard} path = "/service_center_dashboard"/>
            <Route component = {ApplyJob} path = "/apply_job" exact />
            <Route component = {CreateCompany} path = "/createCompany" />
            <Route component = {CreateServiceCenter} path = "/createServiceCenter" />
            {/* yaseen */}
            {/* <Route component={Pilot_dashboard} path="/pilot_dashboard" /> */}
            <Route component={Center_dashboard} path="/center_dashboard" />
            <Route component={ApplyJobLanding} path="/applyJobLanding/:id" />
            <Route component={Company_dashboard} path="/company_dashboard" />
            <Route component={Admin_dashboard} path="/Admin_dashboard" />
            <Route component={CreatePilot} path="/createPilot" />
            <Route component={Categories} path="/choose-categories" />
            <Route component={EmailVerification} path="/verify-email" />
            <Route component={VerifiedEmail} path="/users/:id/verify/:token" />
            <Route component={RecoverPassword} path="/users/:id/forgetPassword/:token" />
            <Route exact path="/NoComponent" component={NoPageFound} />

            {/* yaseen */}
            <Route exact path="*" component={NoPageFound} />
          </Switch>
        </UserContext.Provider>
        <Footer/>
      </HashRouter>
    );
  
}
export default App;

