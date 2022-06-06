import React, {useEffect} from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
const domain = process.env.REACT_APP_MY_API;

const PilotRoute = ({component: Component, ...rest}) => {
    let history = useHistory()
    let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
    useEffect(()=>{
        axios.get(`${domain}/api/user/getUserData`, config).then(res=>{
            console.log(res)
          localStorage.setItem("email", res.data.verify)
          localStorage.setItem("role", res.data.role)
          if(res.data.role !== "pilot"){
              history.push("/NoComponent")
          }
        }
        
        )
      },[])
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
 
!localStorage.getItem("role")  ?   <Redirect to="/login" />
 :

            localStorage.getItem("role") === "pilot" ?
                <Component {...props} />
            : <Redirect to="/NoComponent" />
        )} />
    );
};

export default PilotRoute;