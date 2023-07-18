import React from "react";
import { useAuth } from "../../utils/authVerifing";
import { Navigate } from "react-router-dom";

interface AuthProtectedProps {
  element: React.ReactNode;
  allowedRoles?: string[];
}

const AuthProtected: React.FC<AuthProtectedProps> = ({
  element
}) => {
  const isLoggedIn = useAuth();
  if (isLoggedIn) {
      if (isLoggedIn.role === "student") {
        return <Navigate to="/" replace />;
      } else if (isLoggedIn.role === "tutor") {
        return <Navigate to="/tutor" replace />;
      } else if (isLoggedIn.role === "admin") {
        return <Navigate to="/admin" replace />;
      }
  }
  return <>{element}</>;
};

export default AuthProtected;
