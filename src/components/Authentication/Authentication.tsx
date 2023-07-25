import React, { ReactNode } from "react";

interface AuthenticationProps {
  children: ReactNode;
  reverse?: boolean;
  sideImg?: string;
}

const Authentication: React.FC<AuthenticationProps> = ({
  children,
  sideImg,
  reverse,
}) => {
  return (
    <div
      className="bg-authentication-background bg-cover flex justify-center items-center w-screen h-screen py-7 px-5"
    >
      <div
        className={`bg-white w-full max-w-[80%] h-full overflow-auto rounded-md flex justify-center items-center shadow-xl p-3 gap-5 ${
          reverse ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="justify-center items-center text-center hidden lg:flex flex-col lg:w-1/2 relative">
          <div className="font-semibold text-lg w-full">
            <span className="font-bold text-4xl">En-Code</span> <br />
            Online Learning Platform
          </div>
          <img
            src={sideImg}
            className="w-full h-full object-cover"
            alt="login-page-vector"
          />
        </div>
        <div className="sm:w-1/2 w-full h-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
