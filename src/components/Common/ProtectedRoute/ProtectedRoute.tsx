import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {

  const { user } = useSelector((state: RootState) => state.userReducer);
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "student") {
      return <Navigate to="/" replace={true} />;
    } else if (user.role === "tutor") {
      return <Navigate to={"/tutor"} replace={true} />;
    } else if (user.role === "admin") {
      return <Navigate to={"/admin"} replace={true} />;
    }
  }
  return <>{element}</>;
};

export default ProtectedRoute;