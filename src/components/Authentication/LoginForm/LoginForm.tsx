import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../AuthFroms/Login";
import { GoogleLogin,GoogleCredentialResponse} from "@react-oauth/google";
import WhichUser from "../WhichUser/WhichUser";

const LoginForm: React.FC = () => {

  const [role, setRole] = useState<string>("student");
  const changeRole = (role: string) => setRole(role);

  const googleLogin = (credentialResponse: GoogleCredentialResponse)=>{
    console.log(credentialResponse);
  }
  
    return (
      <div className="flex flex-col items-center justify-center w-full gap-4 ">
        <WhichUser setRole={changeRole} role={role} />
        <div>
          <div className="flex justify-center items-center border gap-5 rounded-md p-1 w-full shadow-md cursor-pointer ">
            <GoogleLogin
              size="small"text="continue_with"
              onSuccess={(credentialResponse) =>  googleLogin(credentialResponse)}
              onError={() => console.log("Login Failed")}
            />
          </div>
        </div>
        <div className="text-[10px] text-gray-400 flex justify-center items-center gap-2">
          <div className="border  w-10"></div>
          <div>Or Login with</div>
          <div className="border w-10"></div>
        </div>
        <>
          <Login role={role} />
        </>
        <div className="text-primary text-[10px]">
          <div>
            <Link to={"/register"}>Don't have an account?</Link>
          </div>
        </div>
      </div>
    );
};

export default LoginForm;
