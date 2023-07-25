import React, { useState, ChangeEvent } from "react";
import ErrorTooltip from "../../ErrorTooltip/ErrorTooltip";
import ErrorIndicator from "../../ErrorIndicator/ErrorIndicator";
import { FormValues } from "../../../../dtos/Form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface PasswordFieldProps {
  passedState: FormValues;
  errors: { field: string; errors: string[] } | null;
  setPassedState: (event: ChangeEvent<HTMLInputElement>) => void;
  setErrors: (value: null) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  passedState,
  errors,
  setPassedState,
  setErrors,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isShowPass, setIsShowPass] = useState<boolean>(false);

  return (
    <div className="felx flex-col items-center relative">
      <label htmlFor="password" className="text-[14px] text-shadow-black">
        Password <span className="text-red-600">*</span>
      </label>
      <div>
        <div className="relative flex flex-col justify-center items-center ">
          <input
            type={isShowPass ? "text" : "password"}
            placeholder="password"
            onClick={() => setErrors(null)}
            className="border  p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"
            value={passedState.password}
            name="password"
            id="password"
            onChange={setPassedState}
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
            {isShowPass ? (
              <BsEye
                style={{
                  position: "absolute",
                  right: "5%",
                  top: "59%",
                  fontSize: "15px",
                  cursor:"pointer"
                }}
                onClick={() => setIsShowPass(!isShowPass)}
              />
            ) : (
              <BsEyeSlash
                style={{
                  position: "absolute",
                  right: "5%",
                  top: "59%",
                  fontSize: "15px",
                  cursor:"pointer"
                }}
                onClick={() => setIsShowPass(!isShowPass)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordField;
