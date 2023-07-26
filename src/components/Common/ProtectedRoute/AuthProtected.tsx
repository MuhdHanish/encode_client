import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

interface AuthProtectedProps {
  element: React.ReactNode;
  allowedRoles?: string[];
}

const AuthProtected: React.FC<AuthProtectedProps> = ({
  element
}) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  if (user) {
    if (user.role === "student") {
      return <Navigate to="/" replace />;
    } else if (user.role === "tutor") {
      return <Navigate to="/tutor" replace />;
    } else if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
  }
  return <>{element}</>;
};

export default AuthProtected;
