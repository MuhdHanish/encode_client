import { AxiosError } from "axios";
import React, { useState } from "react";
import { User } from "../../../dtos/User";
import { useNavigate } from "react-router-dom";
import { apiError } from "../../../api/ApiInterface";
import handleForm from "../../../utils/handleFormState";
import { handLogin } from "../../../utils/Authentication/handleLogin";
import CredentialField from "../AuthenticationComponents/Login/CredentialFeild";
import {
  AtuhenticationError,
  PasswordField,
} from "../AuthenticationComponents/Common";

interface LoginProps {
  loginError: string;
  setResError: (value: string) => void;
  setIsForgot:(value:boolean) => void;
}

const Login: React.FC<LoginProps> = ({ loginError, setResError, setIsForgot }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [loginState, setLoginState] = handleForm({
    credential: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    field: string;
    errors: string[];
  } | null>({
    field: "",
    errors: [""],
  });
  const setError = (field: string, errorMessages: string[]) => setErrors({ field, errors: errorMessages });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setResError("")
    event.preventDefault();
    handLogin({
      setError,
      UseruserPassword: loginState.password as string,
      UseruserCredential: loginState.credential as string,
    })
      .then((res: User | boolean | AxiosError<unknown>) => {
        setLoading(false);
        if (res && typeof res !== "boolean") {
          const user = res as User;
          if (user.role === "student") {
            navigate(`/`, { replace: true });
          } else {
            navigate(`/${user.role}`, { replace: true });
          }
        }
      })
      .catch((err: apiError) => {
        setLoading(false);
        setResError(err.message);
      });
  };

  return (
    <div>
       <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center gap-3 px-5 py-2">
          <div className="flex flex-col gap-2">
            <CredentialField
              setLoginState={setLoginState}
              errors={errors}
              loginState={loginState}
              setErrors={setErrors}
            />
            <PasswordField
              setPassedState={setLoginState}
              errors={errors}
              passedState={loginState}
              setErrors={setErrors}
            />
            {loginError && <AtuhenticationError passedError={loginError} />}
          </div>
          <div className="flex w-full h-fit justify-end items-center text-primary text-[13px] ">
            <span onClick={()=>setIsForgot(true)} className="w-fit h-fit cursor-pointer">Forgot password ?</span>
          </div>
          <div className="flex flex-col items-center ">
            {loading && (<div className="loaderBar"></div>)}
            {
              
              <button
                className="btn-class w-full flex justify-center items-center gap-2"
                type="submit"
              >
                Log in
              </button>
            
            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
