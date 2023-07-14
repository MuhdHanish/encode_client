import React,{useState} from "react";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";


const LoginForm: React.FC = () => {
  const [role, setRole] = useState<string>("student");
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 ">
      <div className="flex items-center justify-center gap-12">
        <div
          className={
            role === "student"
              ? "text-primary font-semibold text-[10px] cursor-pointer border border-primary px-3 py-0.5 rounded-lg shadow-lg"
              : "text-black text-[10px] cursor-pointer"
          }
          onClick={() => setRole("student")}
        >
          STUDENT
        </div>
        <div
          className={
            role === "tutor"
              ? "text-primary font-semibold text-[10px] cursor-pointer border border-primary px-3 py-0.5 rounded-lg shadow-lg"
              : "text-black text-[10px] cursor-pointer "
          }
          onClick={() => setRole("tutor")}
        >
          TUTOR
        </div>
      </div>
      <div>
        <GoogleAuth role={role} method="login" />
      </div>
      <div className="text-[10px] text-gray-400 flex justify-center items-center gap-2">
        <div className="border  w-10"></div>
        <div>Or sign with</div>
        <div className="border w-10"></div>
      </div>
      <div>
        <AuthForm role="student" method="login" />
      </div>
      <div className=" text-primary text-[10px]">
        <div><Link to={"/register"}>Dont have an account ?</Link></div>
      </div>
    </div>
  );
};

export default LoginForm;
