import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import Authentication from "../../components/Authentication/Authentication";


const LoginPage: React.FC = () => {
  return (
    <>
      <Authentication>
       <LoginForm/>
      </Authentication>
    </>
  );
};

export default LoginPage