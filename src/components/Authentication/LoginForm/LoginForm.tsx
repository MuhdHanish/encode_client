import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../../AuthFroms/Login";
import WhichUser from "../WhichUser/WhichUser";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

const LoginForm: React.FC = () => {
  const [role, setRole] = useState<string>("student");
  const changeRole = (role:string) => {
    setRole(role)
  }
    return (
    <div className="flex flex-col items-center justify-center w-full gap-4 ">
      <WhichUser setRole={changeRole} role={role} />
      <div>
      <GoogleAuth role={role} method="Login" />
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
