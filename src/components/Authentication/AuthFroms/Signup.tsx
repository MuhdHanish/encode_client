import React, { useEffect, useState } from "react";
import handleForm from "../../../utils/handleFormState";
import { formatTime } from "../../../utils/formatTime";
import ErrorTooltip from "../ErrorTooltip/ErrorTooltip";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {
  handleSignupStepOne,
  handleSignupStepTwo,
} from "../../../utils/handleSignup";
import { apiError } from "../../../api/ApiInterface";
import { useNavigate } from "react-router-dom";

interface SingupProps {
  isOtpSended: boolean;
  role: string;
  setIsOtpSended: (value: boolean) => void;
}

const Signup: React.FC<SingupProps> = ({
  isOtpSended,
  role,
  setIsOtpSended,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [otpValidity, setOtpValidity] = useState<number>(120);
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [errors, setErrors] = useState<{
    field: string;
    errors: string[];
  } | null>({ field: "", errors: [""] });
  const [signupError, setSignupError] = useState<string>("");
  const [uId, setUId] = useState<string>("");
  const [signupState, setSignupState] = handleForm({
    username: "",
    email: "",
    password: "",
    role,
  });
  const setError = (field: string, errorMessages: string[]) =>
    setErrors({ field, errors: errorMessages });
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isOtpSended && otpValidity > 0) {
      timer = setInterval(() => {
        setOtpValidity((prevValidity) => prevValidity - 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isOtpSended, otpValidity]);

  const handleStepOne = (event:| React.FormEvent<HTMLFormElement>| React.MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault();
    setSignupError("");
    setOtpValidity(120);
    handleSignupStepOne({
      Userusername: signupState.username as string,
      Useremail: signupState.email as string,
      Userpassword: signupState.password as string,
      role,
      setError,
    })
      .then((res) => {if (res) {setUId(res as string), setIsOtpSended(true),setSignupError("");}
      }).catch((err: apiError) => {setSignupError(err.message);});
  };
  const handleStepTwo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignupStepTwo({
      Userusername: signupState.username as string,
      Useremail: signupState.email as string,
      Userpassword: signupState.password as string,
      UserenteredOtp: enteredOtp,
      role,
      setError,
      uId,
    })
      .then((res) => {
        if (res) {
      if (role === "student") {
        navigate("/", { replace: true });
      } else if (role === "tutor") {
        navigate("/tutor", { replace: true });
      } else if (role === "admin") {
        navigate("/admin", { replace: true });
      }}})
      .catch((err: apiError) => {setSignupError(err.message);});
  };

  return (
    <>
      <div>
        <form onSubmit={isOtpSended ? handleStepTwo : handleStepOne}>
          <div className="flex flex-col justify-center gap-2 px-5 py-2">
            {isOtpSended ? (
              <div className="flex flex-col items-center gap-2 ">
                <label
                  htmlFor="enteredOtp"
                  className="text-[11px] text-shadow-black"
                >
                  Varification code<span className="text-red-600 ml-1">*</span>
                </label>
                <div className="relative flex flex-col justify-center ">
                  <input
                    type="text"
                    name="enteredOtp"
                    id="enteredOtp"
                    value={enteredOtp}
                    onChange={(event) => setEnteredOtp(event.target.value)}
                    placeholder="varification code"
                    onClick={() => setErrors(null)}
                    className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
                  />
                  {errors?.field === "enteredOtp" && (
                    <>
                      <ErrorTooltip setHover={setIsHovered} />
                      <div className={isHovered ? "block" : "hidden"}>
                        <ErrorIndicator errors={errors} />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-center items-center  bottom-0">
                  <p className="text-xs text-shadow-black mt-3">
                    {otpValidity !== 0 && formatTime(otpValidity)}
                    {!otpValidity && (
                      <button
                        onClick={handleStepOne}
                        className="border-none outline-none font-semibold text-[10]px text-blue-700"
                      >
                        Re-send
                      </button>
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-0.5 mb-0.5">
                    <label
                      htmlFor="username"
                      className="text-[11px] text-shadow-black"
                    >
                      Username <span className="text-red-600">*</span>
                    </label>
                    <div className="relative flex flex-col justify-center items-end">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={signupState.username}
                        placeholder="username"
                        onChange={setSignupState}
                        onClick={() => setErrors(null)}
                        className={`border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md `}
                      />
                      {errors?.field === "username" && (
                        <>
                          <ErrorTooltip setHover={setIsHovered} />
                          <div className={isHovered ? "block" : "hidden"}>
                            <ErrorIndicator errors={errors} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label
                      htmlFor="email"
                      className="text-[11px] text-shadow-black"
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <div className="relative flex flex-col justify-center items-center">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={signupState.email}
                        placeholder="email"
                        onChange={setSignupState}
                        onClick={() => setErrors(null)}
                        className={`border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md `}
                      />
                      {errors?.field === "email" && (
                        <>
                          <ErrorTooltip setHover={setIsHovered} />
                          <div className={isHovered ? "block" : "hidden"}>
                            <ErrorIndicator errors={errors} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="felx flex-col items-center relative ">
                    <label
                      htmlFor="password"
                      className="text-[11px] text-shadow-black"
                    >
                      Password <span className="text-red-600">*</span>
                    </label>
                    <div>
                      <div className="relative flex flex-col justify-center items-center ">
                        <input
                          type={isShowPass ? "text" : "password"}
                          placeholder="password"
                          className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
                          value={signupState.password}
                          name="password"
                          id="password"
                          onChange={setSignupState}
                          onClick={() => setErrors(null)}
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
                        </>
                      )}
                    </div>
                  </div>
                  {signupError && (
                    <div className="relative mb-3 flex justify-center items-center">
                      <div className="flex justify-center items-center mt-7  absolute">
                        <p className="text-[10px] text-red-600 font-semibold">
                          {signupError}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            
            <div className="flex flex-col">
              <button className="btn-class" type="submit">
                {isOtpSended ? "Confirm" : "Sign up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
