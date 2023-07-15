import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import WhichUser from "../WhichUser/WhichUser";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { BsEye, BsEyeSlash,BsExclamationCircle} from "react-icons/bs";
import { formatTime } from "../../../utils/formatTime";
import HandleForm from "../../../utils/HandleForm";
import { handleSignupValidation } from "../../../utils/formValidators";
import ErrorIndicator from "../../ErrorIndicator/ErroIndicator";

const SignupForm: React.FC = () => {
  const [role, setRole] = useState<string>("student");
  const [isOtpSended, setIsOtpSended] = useState<boolean>(false);
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [otpValidity, setOtpValidity] = useState<number>(120);
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [errors, setErrors] = useState<{ field: string, errors: string[] }|null>({ field: "", errors: [] });
  const [signupState, setSignupState] = HandleForm({
    username: "",
    email: "",
    password: "",
    role,
  });
  const changeRole = (role: string) => {
  
    setErrors(null)
    setRole(role);
  }
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

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = handleSignupValidation(signupState.username as string, signupState.email as string, signupState.password as string);
    setErrors(errors);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-3">
      {isOtpSended ? (
        <div className="flex flex-col justify-center items-center font-semibold">
          <span>OTP verification</span>
        </div>
      ) : (
        <>
          <WhichUser setRole={changeRole} role={role} />
          <div>
            <GoogleAuth role={role} method="Sign up" />
          </div>
          <div className="text-[10px] text-gray-400 flex justify-center items-center gap-2">
            <div className="border w-10"></div>
            <div>Or Sign up with</div>
            <div className="border w-10"></div>
          </div>
        </>
      )}
      <div>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col justify-center gap-2 px-5 py-2">
            {isOtpSended ? (
              <div className="flex flex-col">
                <label
                  htmlFor="enteredOtp"
                  className="text-[11px] text-shadow-black"
                >
                  OTP <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="enteredOtp"
                  id="enteredOtp"
                  value={enteredOtp}
                  onChange={(event) => setEnteredOtp(event.target.value)}
                  className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
                  placeholder="otp code"
                />
                <p className="text-xs text-shadow-black mt-3">
                  {formatTime(otpValidity)}
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  <label
                    htmlFor="username"
                    className="text-[11px] text-shadow-black"
                  >
                    Username <span className="text-red-600">*</span>
                  </label>
                  <div className="flex justify-between relative">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={signupState.username}
                      onChange={setSignupState}
                      className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
                      placeholder="username"
                    />
                    {errors?.field === "username" && (
                      <div>
                        <div
                          className="cursor-pointer"
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <BsExclamationCircle
                            style={{
                              color: "red",
                              fontSize: "12px",
                              position: "absolute",
                              marginTop: "10px",
                              right: "10px",
                            }}
                          />
                        </div>
                        {isHovered && <ErrorIndicator errors={errors} />}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-[11px] text-shadow-black"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={signupState.email}
                    onChange={setSignupState}
                    className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
                    placeholder="email"
                  />
                  {errors?.field === "email" && (
                    <div>
                      <div
                        className="cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <BsExclamationCircle
                          style={{
                            color: "red",
                            fontSize: "12px",
                            position: "absolute",
                            marginTop: "10px",
                            right: "10px",
                          }}
                        />
                      </div>
                      {isHovered && <ErrorIndicator errors={errors} />}
                    </div>
                  )}
                </div>
                <div className="felx flex-col items-center relative">
                  <label
                    htmlFor="password"
                    className="text-[11px] text-shadow-black"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <div>
                    <input
                      type={isShowPass ? "text" : "password"}
                      className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
                      name="password"
                      id="password"
                      value={signupState.password}
                      onChange={setSignupState}
                      placeholder="password"
                    />
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
                    {errors?.field === "password" && (
                      <div>
                        <div
                          className="cursor-pointer"
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <BsExclamationCircle
                            style={{
                              color: "red",
                              fontSize: "12px",
                              position: "absolute",
                              marginTop: "10px",
                              right: "10px",
                            }}
                          />
                        </div>
                        {isHovered && <ErrorIndicator errors={errors} />}
                      </div>
                    )}
                  </div>
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
      {isOtpSended ? (
        ""
      ) : (
        <>
          <div className="text-primary text-[10px]">
            <div>
              <Link to={"/login"}>Already have an account?</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignupForm;
