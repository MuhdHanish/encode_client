import { Navigate } from "react-router-dom";
import { useAuth, useUserRole } from "../../utils/authVerifing";

interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const isLoggedIn = useAuth();
  const role = useUserRole();
  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role as string)) {
    if (role === "student") {
    return <Navigate to="/" replace />; 
  } else if(role === "tutor"){
    return <Navigate to={"/tutor"} replace />; 
  } else if(role === "admin"){
    return <Navigate to={"/admin"} replace />;
  }
  }

  return <>{element}</>;
};

export default ProtectedRoute;