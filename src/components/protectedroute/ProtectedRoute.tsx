import React, { Component, FunctionComponent } from "react";
import { Redirect, Route } from "react-router-dom";
import { RouteComponentProps } from "@reach/router";

interface Props extends RouteComponentProps {
  component: FunctionComponent;
}

const ProtectedRoute: React.FC<Props> = ({ component, ...restOfProps }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);

  return (
    <Route
      exact
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
