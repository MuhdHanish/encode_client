import React, { useState } from "react";
import Login from "../AuthFroms/Login";
import { Link } from "react-router-dom";
import GoogleAuthLogin from "../GoogleAuth/GoogleAuthLogin";
import Reset from "../AuthFroms/ResetFrom";

const LoginForm: React.FC = () => {
  const [isForgot, setIsForgot] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const setLoginErr = (error: string) => setLoginError(error);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      {!isForgot ?
        (<>
          <div>
            <GoogleAuthLogin setResError={setLoginErr} />
          </div>
          <div className="text-[13px] text-gray-400 flex justify-center items-center gap-2">
            <div className="border w-10"></div>
            <div>Or Login with</div>
            <div className="border w-10"></div>
          </div>
          <>
            <Login
              loginError={loginError}
              setResError={setLoginErr}
              setIsForgot={setIsForgot}
            />
          </>
          <div className="text-primary text-[13px]">
            <div>
              <Link to={"/register"}>Don't have an account?</Link>
            </div>
          </div>
        </>)
        :
        (<>
          <Reset loginError={loginError} setIsForgot={setIsForgot} setResError={setLoginError} />
        </>)}
    </div>
  );
};

export default LoginForm;
