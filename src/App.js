import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/website/Home";
import Company from "./components/website/Company";
import SignUp from "./components/website/SignUp";
import Login from "./components/website/Login";
import Profile from "./components/website/Profile";
import ProfileEdit from "./components/website/ProfileEdit";
import TermsCondition from "./components/website/TermsCondition";
import DownloadSubscription from "./components/website/DownloadSubscription";
import GoPremium from "./components/website/GoPremium";
import ViewJob from "./components/website/ViewJob";
import Imageview from "./components/website/Imageview";
import HiringDroners from "./components/website/GetJobs";
import ForgotPassword from "./components/website/ForgotPassword";
import EndUserProfile from "./components/website/EndUserProfile";
import HiringDorners from "./components/website/HiringDorners";
import BlogDetail from "./components/website/BlogDetail";
import BlogCategory from "./components/website/BlogCategory";
import Blog from "./components/website/Blog";
import NoPageFound from "./components/website/NoPageFound.js";
import GetJobs from "../src/components/website/GetJobs";
import OfficeProfileEdit from "../src/components/website/OfficeProfileEdit";
import Industry from "../src/components/website/Industry";
// import Dashboard from '../src/components/website/Dashboard'
import OfficeProfile from "../src/components/website/OfficeProfile";
import Cart from "../src/components/website/Cart";
import "./components/website/All.module.css";
// import Navbar from '../src/components/Navbar'
import { UserContext } from "../src/hooks/UserContext";
import JobPostEdit from "../src/components/website/JobPostEdit";
import PublicRoute from "../src/hooks/PublicRoute";
import PrivateRoute from "../src/hooks/PrivateRoute"; 
import AdminRoute from "../src/hooks/AdminRoute";
import UserRoute from "../src/hooks/UserRoute";
import searchresult from "../src/components/website/Searchresult";
import PostEdit from "../src/components/website/PostEdit";
import JobAppliedDroners from "../src/components/website/JobAppliedDroners";
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
import UpgradeProVersion from './components/website/UpgradeProVersion';
import ApplyJobLanding from "./components/website/ApplyJobLanding";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAdmin: false,
      authState: false,
      checked_auth: false,
      checked_auth_user: false,
      isAdmin: false,
      user: null,
      userState: "",
      admin: "",
      currentUser: "",
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>{
      this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin,
      })
    });
  }

  render() {
    const { currentUser, isAdmin } = this.state;
    return (
      <HashRouter>
        <Header />
        <UserContext.Provider>
          <ScrollToTop />
          <Switch>
            <PublicRoute
              path="/login"
              component={Login}
              exact
            />
            <PublicRoute
              path="/sign_up"
              component={SignUp}
              exact
            />
            <PublicRoute
              path="/select_category"
              component={UserCategory}
              exact
            />
            <PublicRoute
              path="/Company"
              component={Company}
              exact
            />
            <PublicRoute
              exact
              path="/ForgotPassword"
              component={ForgotPassword}
            />
            <PublicRoute component={Home} path="/" exact />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/ProfileEdit" component={ProfileEdit} />
            <PrivateRoute
              exact
              path="/Cart/:slug/download/:userId"
              component={Cart}
            />
            <PrivateRoute
              exact
              path={"/Imageview/:id/:user_id"}
              component={Imageview}
            />
            <AdminRoute
              exact
              path="/GetJobs"
              roles={[Role.Admin]}
              component={GetJobs}
            />
            <PublicRoute
              exact
              path="/TermsCondition"
              component={TermsCondition}
            />
            {/* <PublicRoute
              restricted={true}
              exact
              path="/UpgradeProVersion"
              component={UpgradeProVersion}
            /> */}
            <PublicRoute
              path="/DownloadSubscription"
              component={DownloadSubscription}
              exact
            />
            <PublicRoute
              path="/HireSubscription"
              component={HireSubscription}
              exact
            />
            <PublicRoute
              path="/GoPremium"
              component={GoPremium}
              exact
            />
            {/* <PrivateRoute exact path="/GoPremium" component={GoPremium} /> */}
            {/* <PublicRoute
              restricted={true}
              path="/UploadFile"
              component={UploadFiles}
              exact
            /> */}
            <PrivateRoute exact path={"/ViewJob/:id"} component={ViewJob} />
            {/* <PrivateRoute
              exact
              path="/HiringDroners"
              component={HiringDroners}
            /> */}
            <PublicRoute
              exact
              path="/hire_pilots"
              component={HirePilot}
            />
            <PublicRoute
              exact
              path="/pilot_details/:id"
              component={PilotDetails}
            />
            <PrivateRoute
              exact
              path={"/ProfileSingle/:id"}
              component={EndUserProfile}
            />
            <PrivateRoute
              exact
              path="/HiringDorners"
              component={HiringDorners}
            />
            <AdminRoute
              exact
              path="/PostJobEdit/:id"
              roles={[Role.Admin]}
              component={JobPostEdit}
            />
            <PrivateRoute exact path="/BlogDetail" component={BlogDetail} />
            <PrivateRoute exact path="/BlogCategory" component={BlogCategory} />
            <PrivateRoute
              exact
              path="/OfficeProfileEdit"
              component={OfficeProfileEdit}
            />
            <PrivateRoute exact path="/Blog" component={Blog} />
            {/* <PrivateRoute exact path="/searchresult" component={searchresult} /> */}
            <PublicRoute component = {searchresult} path = "/searchresult" exact />
            <PrivateRoute exact path="/search/Industry" component={Industry} />
            <PrivateRoute
              exact
              path="/OfficeProfile"
              component={OfficeProfile}
            />
            <PrivateRoute
              exact
              path="/JobAppliedDroners/:id"
              component={JobAppliedDroners}
            />
            <UserRoute
              exact
              path="/PostEdit/:id/:user_id"
              roles={[Role.Admin]}
              component={PostEdit}
            />
            <PublicRoute component = {UploadFiles} path = "/UploadFile" exact />
            <PublicRoute component = {ServiceCenters} path = "/service_centers" exact />
            <PublicRoute component = {CreateJob} path = "/create_job" exact />
            <PublicRoute component = {ServiceCenterDetails} path = "/service_center/:id" exact />
            <PublicRoute component = {ServiceCenterDashboard} path = "/service_center_dashboard"/>
            <PublicRoute component = {ApplyJob} path = "/apply_job" exact />
            {/* yaseen */}
            <Route component={Pilot_dashboard} path="/pilot_dashboard" />
            <Route component={ApplyJobLanding} path="/applyJobLanding" />
            <Route component={Company_dashboard} path="/company_dashboard" />
            {/* yaseen */}
            <PublicRoute exact path="*" component={NoPageFound} />
          </Switch>
        </UserContext.Provider>
        <Footer/>
      </HashRouter>
    );
  }
}
export default App;