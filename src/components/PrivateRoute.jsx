// src/components/PrivateRoute.js

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DotSpinner from "./TotalLoader/DotSpinner";

const PrivateRoute = ({ children }) => {

  const { user, loading } = useAuth();


  if (loading) {
    return <DotSpinner/> // یا یک کامپوننت اسپینر زیبا
  }


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;