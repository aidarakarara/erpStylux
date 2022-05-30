import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
export default function Protected({ component: Component, ...rest }) {
  const token = localStorage.getItem("user-token");
  const role = localStorage.getItem("user-role");
  if (!token) {
    return <Navigate to="/login" replace />;
  }else{

    switch (role) {
      case "pompiste":
        return <Navigate to="/pompistes" replace />;
        break;
      case "chefpiste":
        return <Navigate to="/chefpistes" replace />;
        break;
      case "gerant":
        return <Component {...rest} />;
        break;
      case "admin":
        return <Navigate to="/admin" replace />;
        break;
      default:
        return <Navigate to="/login" replace />;
        break;
    }
  }
}
