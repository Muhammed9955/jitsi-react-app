import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";

import { useAuthState } from "../context/auth";

function AuthRoute({ component: Component, ...rest }) {
  const state = useContext(useAuthState);

  return (
    <Route
      {...rest}
      render={(props) =>
        state?.user ? <Navigate to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
