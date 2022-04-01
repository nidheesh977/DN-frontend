import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const BoosterRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
 
!localStorage.getItem("role")  ?   <Redirect to="/login" />
 :

            localStorage.getItem("role") === "booster" ?
                <Component {...props} />
            : <Redirect to="/NoComponent" />
        )} />
    );
};

export default BoosterRoute;