import { Navigate } from "react-router-dom";
import { useAuth } from "../../../utils/authVerifing";

interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {

  const isLoggedIn = useAuth();
  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(isLoggedIn.role)) {
    if (isLoggedIn.role === "student") {
      return <Navigate to="/" replace={true} />;
    } else if (isLoggedIn.role === "tutor") {
      return <Navigate to={"/tutor"} replace={true} />;
    } else if (isLoggedIn.role === "admin") {
      return <Navigate to={"/admin"} replace={true} />;
    }
  }
  return <>{element}</>;
};

export default ProtectedRoute;