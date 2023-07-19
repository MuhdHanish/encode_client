import { AxiosError } from "axios";
import React, { useState } from "react";
import { User } from "../../../dtos/User";
import { useNavigate } from "react-router-dom";
import { apiError } from "../../../api/ApiInterface";
import { handLogin } from "../../../utils/handleLogin";
import handleForm from "../../../utils/handleFormState";
import CredentialField from "../AuthenticationComponents/Login/CredentialFeild";
import {
  AtuhenticationError,
  PasswordField,
} from "../AuthenticationComponents/Common";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>("");
  const setLoginErr = (error: string) => setLoginError(error);
  const [loginState, setLoginState] = handleForm({credential: "",password: "",});
  const setError = (field: string, errorMessages: string[]) => setErrors({ field, errors: errorMessages });
  const [errors, setErrors] = useState<{field: string, errors: string[]} | null>({ field: "", errors: [""] });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handLogin({setError,
      UseruserPassword: loginState.password as string,
      UseruserCredential: loginState.credential as string,
    })
      .then((res: User | boolean | AxiosError<unknown>) => {
        if (res && typeof res !== "boolean") {
          const user = res as User;
          navigate(`/${user.role}`, { replace: true });
        }
      })
      .catch((err: apiError) => setLoginErr(err.message));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center gap-2 px-5 py-2">
          <div className="flex flex-col gap-1">
            <CredentialField setLoginState={setLoginState} errors={errors} loginState={loginState} setErrors={setErrors}
            />
            <PasswordField setPassedState={setLoginState} errors={errors}passedState={loginState} setErrors={setErrors}/>
            {loginError && <AtuhenticationError passedError={loginError} />}
          </div>
          <div className="flex flex-col">
            <button className="btn-class" type="submit">
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
