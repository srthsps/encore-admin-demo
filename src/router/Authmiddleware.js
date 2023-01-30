import React from "react";
import { Route, Redirect } from "react-router-dom";

// const auth = true;
const Authmiddleware = ({ component: Component, isAuthProtected, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthProtected && !localStorage.getItem("admin-token")) {
        return (
          <Redirect
            to={{ pathname: "/auth/sign-in", state: { from: props.location } }}
          />
        );
      }

      return <Component {...props} />;
    }}
  />
);

export default Authmiddleware;
