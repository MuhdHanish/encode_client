import React from 'react'
import Authentication from '../../components/Authentication/Authentication'
import registerPageImg from "../../assets/authentication-images/register-page.png";
import SignupForm from '../../components/Authentication/SignupForm/SignupForm';

const SignupPage:React.FC = () => {
  return (
   <Authentication reverse sideImg={registerPageImg}>
    <SignupForm/>
    </Authentication>
  )
}

export default SignupPage