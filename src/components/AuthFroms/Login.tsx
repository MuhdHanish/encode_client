import React, { useState } from "react";
import HandleForm from "../../utils/HandleForm";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import ErrorTooltip from "../Authentication/ErrorTooltip/ErrorTooltip";
import ErrorIndicator from "../Authentication/ErrorIndicator/ErrorIndicator";

const Login:React.FC = () => {
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [errors, setErrors] = useState<{field: string;errors: string[];} | null>({ field: "", errors: [""] });
  const [loginState, setLoginState] = HandleForm({credential:"",password: ""});
 return (
  <>
      <div>
        <form >
          <div className="flex flex-col justify-center gap-2 px-5 py-2">
            <>
              <div className="flex flex-col gap-1 ">
                <label htmlFor="credential" className="text-[11px]  text-shadow-black" >
                  Email or Username <span className="text-red-600 ">*</span>
                </label>
                <div className="relative flex flex-col justify-center items-center">
                  <input type="text" name="credential" id="credential" onChange={setLoginState}
                    className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
                    placeholder="email or username" onClick={() => setErrors(null)} value={loginState.credential}
                  />
                  {errors?.field === "credential" && (
                    <>
                    <ErrorTooltip setHover={setIsHovered}/>
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
                  <div className="relative flex flex-col justify-center items-center ">
                    <input
                      type={isShowPass ? "text" : "password"} value={loginState.password} placeholder="password"
                      className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
                      name="password" id="password" onChange={() => setLoginState} onClick={() => setErrors(null)}/>
                    {errors?.field === "password" && (
                    <>
                    <ErrorTooltip setHover={setIsHovered}/>
                    <div className={isHovered ? "block" : "hidden"}>
                    <ErrorIndicator errors={errors} />
                    </div>
                    </>
                  )}
                  </div>
                  {errors?.field !== "password" && (
                    <>
                      {isShowPass ? (
                        <BsEye style={{ position: "absolute",right: "5%",top: "59%",fontSize: "13px",}}
                          onClick={() => setIsShowPass(!isShowPass)}
                        />
                      ) : (
                        <BsEyeSlash style={{position: "absolute",right: "5%",top: "59%",fontSize: "13px",}}
                          onClick={() => setIsShowPass(!isShowPass)}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
            <div className="flex flex-col">
              <button className="btn-class" type="submit">
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>  
  </>
 );
};

export default Login;

