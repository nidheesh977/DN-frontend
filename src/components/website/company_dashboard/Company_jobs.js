import React, { useEffect, useState } from "react";
// import "./css/Pilot_images.css";

import { Switch, Route, NavLink } from "react-router-dom";
import Company_applications from "./Company_applications";
import Company_approvedJobs from "./Company_approvedJobs";
import Company_closedJobs from "./Company_closedJobs";
import Company_expiredJobs from "./Company_expiredJobs";
import Company_pendingJobs from "./Company_pendingJobs";
import Alert from '@mui/material/Alert';

function Company_jobs() {
  const [alert, setAlert] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem("job_created") === "true"){
      setAlert(true)
    }
    setTimeout(()=>{
      setAlert(false)
      localStorage.removeItem("job_created")
    }, 2000)
  },[])

  return (
    <div>
      <div style={{display: !alert ? "none" : "block", marginBottom: "15px"}}>
      <Alert severity="success" >Your job has been successfully uploaded.</Alert>
      </div>
      {!window.location.pathname.split("/").includes("applications")
       &&<div className="pd_images_main">
          <div>
            <NavLink
              exact
              activeClassName="pd_images_active"
              to="/company_dashboard/activities/jobs/"
              id="pd_images_navItem"
            >
              Approved
            </NavLink>
          </div>
          <div>
            <NavLink
              activeClassName="pd_images_active"
              to="/company_dashboard/activities/jobs/pending"
              id="pd_images_navItem"
            >
              Pending
            </NavLink>
          </div>
          <div>
            <NavLink
              activeClassName="pd_images_active"
              to="/company_dashboard/activities/jobs/expired"
              id="pd_images_navItem"
            >
              Expired
            </NavLink>
          </div>
        </div>
      }
      <div className="pd_images_content">
        <Switch>
   

        <Route
            path="/company_dashboard/activities/jobs/pending"
            component={Company_pendingJobs}
          />
           <Route
            path="/company_dashboard/activities/jobs/expired"
            component={Company_expiredJobs}
          />
           <Route component={Company_applications} path="/company_dashboard/activities/jobs/applications/:id"/>
          <Route
            path="/company_dashboard/activities/jobs/"
            component={Company_approvedJobs}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Company_jobs;
