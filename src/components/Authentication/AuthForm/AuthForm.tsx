import React, { useState } from "react";
import {
  SubmitButton,
  EmailAndUsername,
  EmailOrUsername,
  Password,
} from "../FormComponents";
import OtpFeild from "../OtpField/OtpFeild";

interface AutFormProps {
  role: string;
  method: string;
  isOtpSended?: boolean;
}

const AuthForm: React.FC<AutFormProps> = ({ role, method, isOtpSended }) => {

  return (
    <form>
      <div className="flex flex-col justify-center gap-2 px-5 py-2">
        {isOtpSended ? (
          <OtpFeild isOtpSended />
        ) : (
          <>
            {method === "Sign up" ? <EmailAndUsername /> : <EmailOrUsername />}
            <Password />
          </>
        )}
          <SubmitButton>{isOtpSended ? "Confirm" : method}</SubmitButton>
      </div>
    </form>
  );
};

export default AuthForm;
