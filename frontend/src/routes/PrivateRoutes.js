import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useGlobalUserContext, UserContext } from "../util/context/UserContext";

function PrivateRoutes(props) {
  const { userData } = useGlobalUserContext(UserContext);
  // We create state for component
  let [loaded, setLoaded] = useState(false);

  // runs every time there is a re-render
  useEffect(() => {
    // Side effect
    // async Callback -- how long to wait before it does that
    setTimeout(() => {
      // When the component first logit ads
      setLoaded(true);
      // How long to wait before it does that
    }, 50);
    // values that our side effect relies upon.
  }, [loaded]);

  if (loaded === true) {
    if (props.roleRequired) {
      return userData.role === props.roleRequired ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      );
    } else if (userData.hasOwnProperty("role")) {
      return userData.role ? <Outlet /> : <Navigate to="/" />;
    } else {
      return <Navigate to="/" />;
    }
  }
}

export default PrivateRoutes;
