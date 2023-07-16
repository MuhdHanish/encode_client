import React, { useEffect, useState } from 'react'
import HandleForm from '../../utils/HandleForm';
import { formatTime } from '../../utils/formatTime';
import ErrorTooltip from '../Authentication/ErrorTooltip/ErrorTooltip';
import ErrorIndicator from '../Authentication/ErrorIndicator/ErrorIndicator';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

interface SingupProps {
  isOtpSended: boolean,
  role: string,
}

const Signup: React.FC<SingupProps> = ({ isOtpSended, role }) => {
  
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [otpValidity, setOtpValidity] = useState<number>(120);
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [errors, setErrors] = useState<{ field: string, errors: string[] } | null>({ field: "", errors: [""] });
  const [signupState, setSignupState] = HandleForm({username: "",email: "",password: "",role});
    
  useEffect(() => {
      let timer: NodeJS.Timeout | null = null;
      if (isOtpSended && otpValidity > 0) {timer = setInterval(() => {setOtpValidity((prevValidity) => prevValidity - 1)}, 1000)}
      return () => {if (timer) {clearInterval(timer);}};
    }, [isOtpSended, otpValidity]);
  
  return (
    <>
      <div>
        <form >
          <div className="flex flex-col justify-center gap-2 px-5 py-2">
            {isOtpSended ? (
              <div className="flex flex-col">
                <label htmlFor="enteredOtp" className="text-[11px] text-shadow-black"
                >OTP <span className="text-red-600">*</span>
                </label>
                <input type="text" name="enteredOtp" id="enteredOtp"
                  value={enteredOtp} onChange={(event) => setEnteredOtp(event.target.value)} placeholder="otp code"
                  className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"/>
                <p className="text-xs text-shadow-black mt-3">{formatTime(otpValidity)}</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  <label htmlFor="username"className="text-[11px] text-shadow-black">
                    Username <span className="text-red-600">*</span>
                  </label>
                  <div className="relative flex flex-col justify-center items-end">
                    <input type="text" name="username" id="username" value={signupState.username} placeholder="username"
                      onChange={setSignupState}  className={`border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md `}
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
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[11px] text-shadow-black">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <div className="relative flex flex-col justify-center items-center">
                    <input type="text" name="email"id="email"value={signupState.email} placeholder="email"
                      onChange={setSignupState} className={`border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md `}
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
                <div className="felx flex-col items-center relative">
                  <label htmlFor="password" className="text-[11px] text-shadow-black">
                    Password <span className="text-red-600">*</span>
                  </label>
                  <div>
                    <div className="relative flex flex-col justify-center items-center">
                      <input type={isShowPass ? "text" : "password"} name="password" id="password" value={signupState.password}
                        className={`border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md `}
                        onChange={setSignupState} placeholder="password" 
                      />
                      {isShowPass ? (
                        <BsEye style={{position: "absolute",right: "5%",top: "59%",fontSize: "13px",}}
                          onClick={() => setIsShowPass(!isShowPass)}
                        />
                      ) : (
                        <BsEyeSlash style={{position: "absolute",right: "5%",top: "59%",fontSize: "13px",}}
                          onClick={() => setIsShowPass(!isShowPass)}
                        />
                      )}
                    </div>
                    {errors?.field === "password" && (
                      <>
                        <ErrorTooltip setHover={setIsHovered} />
                        <div className={isHovered ? "block" : "hidden"}>
                          <ErrorIndicator errors={errors} />
                        </div>
                      </>
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
    </>
  );
}

export default Signup