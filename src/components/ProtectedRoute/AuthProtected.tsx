import React from 'react'
import { useAuth, useUserRole } from '../../utils/authVerifing';
import { Navigate } from 'react-router-dom';

interface LoginProtected {
  element: React.ReactNode;
  allowedRoles?: string[];
}

const AuthProtected: React.FC<LoginProtected> = (
 element
) => {

  const isLoggedIn = useAuth();
  const role = useUserRole();
  
  if (isLoggedIn) {
      if (role === "student") {
        return <Navigate to="/" replace />; 
      } else if(role === "tutor"){
        return <Navigate to={"/tutor"} replace />; 
      } else if(role === "admin"){
        return <Navigate to={"/admin"} replace />;
      }
  }
  return<>{element}</>

}

export default AuthProtected;