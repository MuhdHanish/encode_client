import loginPageImg from "../../assets/authentication-images/login-page.png";
import { ReactNode } from "react";

interface AuthenticationProps {
  children: ReactNode;
  reverse: boolean
}

const Authentication = ({ children,reverse }: AuthenticationProps) => {
  return (
    <div className="bg-authentication-background bg-cover flex justify-center items-center w-screen h-screen py-10 px-5">
      <div className="bg-white  w-full sm:max-w-[80%] h-full overflow-auto rounded-md flex justify-center items-center shadow-xl p-3 gap-5">
        <div className="justify-center  items-center   text-center hidden md:flex flex-col sm:w-1/2 relative">
          <div className="font-semibold text-sm w-full">
            <span className="font-bold text-2xl ">En-Code</span> <br />
            Online Learning Platform
          </div>
          <img
            src={loginPageImg}
            className="w-full max-h-full"
            alt="login-page-vector"
          />
        </div>
        <div
          className="sm:w-1/2  w-full h-full flex flex-col justify-center items-center
        "
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Authentication;

