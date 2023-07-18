import React, { useState } from "react";
import handleForm from "../../../utils/handleFormState";
import { handLogin } from "../../../utils/handleLogin";
import { useNavigate } from "react-router-dom";
import { apiError } from "../../../api/ApiInterface";
import PasswordField from "../AuthenticationComponents/Login/LoginPasswordFeild";
import CredentialField from "../AuthenticationComponents/Login/CredentialFeild";

interface LoginProps {
  role: string;
}

const Login: React.FC<LoginProps> = ({ role }) => {

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>("");
  const setLoginErr = (error: string) => setLoginError(error);
  const [loginState, setLoginState] = handleForm({credential: "",password: "",});
  const setError = (field: string, errorMessages: string[]) => setErrors({ field, errors: errorMessages });
  const [errors, setErrors] = useState<{field: string;errors: string[]} | null>({ field: "", errors: [""] });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handLogin({
      UseruserCredential: loginState.credential as string, UseruserPassword: loginState.password as string, setError
    }).then((res) => {if (res) {
          if (role === "student") navigate("/", { replace: true });
          else if (role === "tutor") navigate("/tutor", { replace: true });
          else if (role === "admin") navigate("/admin", { replace: true });}})
      .catch((err: apiError) => {setLoginErr(err.message)});
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center gap-2 px-5 py-2">
            <>
              <div className="flex flex-col gap-1">
                <CredentialField setLoginState={setLoginState}
                  errors={errors} loginState={loginState}
                />
                <PasswordField setLoginState={setLoginState}
                  errors={errors} loginState={loginState}
                />
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
