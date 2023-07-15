import React from "react";
import {
  EmailAndUsername,
  EmailOrUsername,
  Password,
} from "../FormComponents";
import OtpFeild from "../OtpField/OtpFeild";
import HandleForm from "../../../utils/HandleForm";

interface AutFormProps {
  role: string;
  method: string;
  isOtpSended?: boolean;
}

const AuthForm: React.FC<AutFormProps> = ({ role, method, isOtpSended }) => {
  
    const [signupState, setSignupState] = HandleForm({
      username: "",
      email: "",
      password: "",
    });
  
    const [loginState, setLoginState] = HandleForm({
      credential:"",
      password: "",
    });
    
    console.log(signupState,loginState)
  
  return (
    <form>
      <div className="flex flex-col justify-center gap-2 px-5 py-2">
        {isOtpSended ? (
          <OtpFeild isOtpSended />
        ) : (
          <>
            {method === "Sign up" ? (
              <EmailAndUsername
                onUsernameChange={() => setSignupState}
                onEmailChange={() => setSignupState}
                role={role}
              />
            ) : (
              <EmailOrUsername
                role={role}
                onCredentialChange={() => setLoginState}
              />
            )}
            {method === "Sign up" ? (
              <Password onPasswordChange={() => setSignupState} />
            ) : (
              <Password onPasswordChange={() => setLoginState} />
            )}
          </>
        )}
        <div className="flex flex-col">
          <button
            className={`border text-xs text-shadow-black
           text-white p-2 text-[10px] bg-primary sm:w-[250px] mt-2
            rounded-md outline-none shadow-md transition duration-300
            hover:bg-purple-600 
           `}
          >
            {isOtpSended ? "Confirm" : method}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
