import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Password: React.FC = () => {
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  return (
    <>
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
    </>
  );
};

export default Password;
