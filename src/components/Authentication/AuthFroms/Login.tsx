import React, { useState } from "react";
import handleForm from "../../../utils/handleFormState";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import ErrorTooltip from "../ErrorTooltip/ErrorTooltip";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import { handLogin } from "../../../utils/handleLogin";
import { useNavigate } from "react-router-dom";
import { apiError } from "../../../api/ApiInterface";

const Login: React.FC = () => {
  
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ field: string; errors: string[]; } | null>({ field: "", errors: [""] });
  const [loginError, setLoginError] = useState<string>("");
  const [loginState, setLoginState] = handleForm({ credential: "", password: "" });

  const setError = (field: string, errorMessages: string[]) => setErrors({ field, errors: errorMessages });
  const setLoginErr = (error: string) => setLoginError(error);
 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handLogin({
      UseruserCredential: loginState.credential as string,
      UseruserPassword: loginState.password as string,
      setError
    }).then((res) => { if (res) { navigate("/",{replace:true}) } })
      .catch((err: apiError) => { setLoginErr(err.message) });
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center gap-2 px-5 py-2">
            <>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="credential"
                    className="text-[11px]  text-shadow-black"
                  >
                    Email or Username <span className="text-red-600 ">*</span>
                  </label>
                  <div className="relative flex flex-col justify-center items-center">
                    <input
                      type="text"
                      name="credential"
                      id="credential"
                      onChange={setLoginState}
                      className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
                      placeholder="email or username"
                      onClick={() => setErrors(null)}
                      value={loginState.credential}
                    />
                    {errors?.field === "credential" && (
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
                        value={loginState.password}
                        className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
                        name="password"
                        id="password"
                        onChange={setLoginState}
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
                {loginError && (
                  <div className="relative mb-6 flex justify-center items-center">
                    <div className="flex justify-center items-center mt-10 absolute">
                      <p className="text-[10px] text-red-600 font-semibold">
                        {loginError}
                      </p>
                    </div>
                  </div>
                )}
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

