// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../../src/middleware/auth';

//  const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (isLogin() ? <Component {...props} /> : <Redirect to="/login" />)} />
// )

// export default PrivateRoute

import React from "react";
import { Route, Redirect } from "react-router-dom";

import { authenticationService } from "../middleware/auth";

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = authenticationService.currentUserValue;
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
