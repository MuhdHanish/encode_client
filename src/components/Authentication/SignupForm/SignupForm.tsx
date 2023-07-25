import React, { useState } from "react";
import { Link } from "react-router-dom";
import WhichUser from "../WhichUser/WhichUser";
import Signup from "../AuthFroms/Signup";
import GoogleAuthSingup from "../GoogleAuth/GoogleAuthSignup";


const SignupForm: React.FC = () => {
  const [role, setRole] = useState<string>("student");
  const changeRole = (role: string) => setRole(role);
  const [isOtpSended, setIsOtpSended] = useState<boolean>(false);
  const setOtpSended = (value: boolean) => setIsOtpSended(value); 
  const [signupError, setSignupError] = useState<string>("");
  const setSignupErr = (error: string) => setSignupError(error);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3">
      {isOtpSended ? (
        <div className="flex flex-col justify-center items-center text-lg font-semibold">
          <span>OTP verification</span>
        </div>
      ) : (
        <>
          <WhichUser setRole={changeRole} role={role} />
          <div>
            <GoogleAuthSingup role={role} setResError={setSignupError} />
          </div>
          <div className="text-[13px] text-gray-400 flex justify-center items-center gap-2">
            <div className="border w-10"></div>
            <div>Or Sign up with</div>
            <div className="border w-10"></div>
          </div>
        </>
      )}
      <>
        <Signup
          isOtpSended={isOtpSended}
          role={role}
          setIsOtpSended={setOtpSended}
          setResError={setSignupErr}
          signupError={signupError}
        />
      </>
      {isOtpSended ? (
        ""
      ) : (
        <>
          <div className="text-primary text-[13px]">
            <div>
              <Link to={"/login"}>Already have an account?</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignupForm;
