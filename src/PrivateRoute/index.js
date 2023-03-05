import React from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [jwt, setJwtToken] = useLocalState("", "jwt");

  return jwt ? (
    children
  ) : (
    <Navigate to="/login" state={{ prev: location.pathname }} />
  );
};

export default PrivateRoute;
