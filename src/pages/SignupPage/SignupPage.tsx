import React from 'react'
import Authentication from '../../components/Authentication/Authentication'
import registerPageImg from "../../assets/authentication-images/register-page.png";
import RegisterForm from '../../components/RegisterForm/SignupForm';

const SignupPage:React.FC = () => {
  return (
   <Authentication reverse sideImg={registerPageImg}>
    <RegisterForm/>
    </Authentication>
  )
}

export default SignupPage