import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import Authentication from "../../components/Authentication/Authentication";
import loginPageImg from "../../assets/authentication-images/login-page.png";


const LoginPage: React.FC = () => {
  return (
    <>
      <Authentication sideImg={loginPageImg}>
        <LoginForm />
      </Authentication>
    </>
  );
};

export default LoginPage