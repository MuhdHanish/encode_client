import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface AutFormProps {
  role: string;
  method: string;
}
const AuthForm: React.FC<AutFormProps> = ({ role, method }) => {
  console.log(role, method);
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  return (
    <form>
      <div className="flex flex-col justify-center gap-3 px-5 py-2">
        <div className="flex flex-col">
          <label
            htmlFor="credential"
            className="text-[11px]  text-shadow-black"
          >
            Email or Username <span className="text-red-600 ">*</span>
          </label>
          <input
            type="text"
            name="credential"
            id="credential"
            className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
            placeholder="email or username"
          />
        </div>
        <div className="felx flex-col items-center relative ">
          <label htmlFor="password " className="text-[11px] text-shadow-black">
            Password <span className="text-red-600 ">*</span>
          </label>
          <div>
            <input
              type={isShowPass ? "text" : "password"}
              className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
              name="password"
              id="password"
              placeholder="password"
            />
          </div>
          {isShowPass ? (
            <BsEye
              style={{
                position: "absolute",
                right: "5%",
                top: "59%",
                fontSize: "13px",
              }}
              onClick={() => setIsShowPass(!isShowPass)}
            />
          ) : (
            <BsEyeSlash
              style={{
                position: "absolute",
                right: "5%",
                top: "59%",
                fontSize: "13px",
              }}
              onClick={() => setIsShowPass(!isShowPass)}
            />
          )}
        </div>
        <div className="flex flex-col ">
          <button className="border text-xs text-shadow-black
           text-white p-2 text-[10px] bg-primary sm:w-[250px] mt-2
            rounded-md outline-none shadow-md transition duration-300
           hover:bg-purple-600 
           ">
            Sign in
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
