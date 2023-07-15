import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface PasswordProps {
  onPasswordChange: (value: string) => void;
}
  // const [isShowPass, setIsShowPass] = useState<boolean>(false);
const Password: React.FC<PasswordProps> = ({onPasswordChange }) => {
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    onPasswordChange(value);
  };
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
            value={password}
            onChange={handlePasswordChange}
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
