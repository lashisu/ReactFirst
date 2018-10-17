import * as React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        props => (
          // isAuthenticated ? (
          <C {...props} />
        )
        // ) : (
        //   <Redirect
        //      to={`/login?redirect=${props.location.pathname}${
        //      props.location.search
        //    }`}
        //  />
        // )
      }
    />
  );
};
