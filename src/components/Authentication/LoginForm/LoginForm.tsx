import React from "react";
import { Link } from "react-router-dom";
import Login from "../AuthFroms/Login";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

const LoginForm: React.FC = () => {
    return (
    <div className="flex flex-col items-center justify-center w-full gap-4 ">
      <div>
      <GoogleAuth  method="Login" />
      </div>
      <div className="text-[10px] text-gray-400 flex justify-center items-center gap-2">
        <div className="border  w-10"></div>
        <div>Or Login with</div>
        <div className="border w-10"></div>
      </div>
        <>
        <Login/>
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
