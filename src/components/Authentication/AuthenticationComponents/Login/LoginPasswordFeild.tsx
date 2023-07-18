import React,{ChangeEvent, useState} from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FormValues } from "../../../../dtos/Form";
import ErrorTooltip from "../../ErrorTooltip/ErrorTooltip";
import ErrorIndicator from "../../ErrorIndicator/ErrorIndicator";

interface PasswordFieldProps {
  loginState: FormValues;
  errors: { field: string; errors: string[] } | null;
  setLoginState: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ loginState, setLoginState, errors, }) => {
  
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false); 

  return (
    <div className="felx flex-col items-center relative">
      <label htmlFor="password" className="text-[11px] text-shadow-black">
        Password <span className="text-red-600">*</span>
      </label>
      <div>
        <div className="relative flex flex-col justify-center items-center ">
          <input type={isShowPass ? "text" : "password"}placeholder="password"value={loginState.password}
            onChange={setLoginState}className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
            name="password"id="password"
          />
          {errors?.field === "password" && (
            <>
            <ErrorTooltip setHover={setIsHovered} />
              <div className={isHovered ? "block" : "hidden"}>
                <ErrorIndicator errors={errors} />
              </div>
            </>
          )}
        </div>
        {errors?.field !== "password" && (
          <>
            {isShowPass ? (<BsEye style={{position: "absolute",right: "5%",top: "59%",fontSize: "13px",}}
                onClick={() => setIsShowPass(!isShowPass)}/>) : (
              <BsEyeSlash style={{position: "absolute",right: "5%",top: "59%",fontSize: "13px",}}
                onClick={() => setIsShowPass(!isShowPass)}/>)}
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordField;
