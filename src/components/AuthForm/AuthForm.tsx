import React, { useState } from "react";
import { SubmitButton,EmailAndUsername,EmailOrUsername,Password } from "../FormComponents";

interface AutFormProps {
  role: string;
  method: string;
}
const AuthForm: React.FC<AutFormProps> = ({ role, method }) => {
  console.log(role, method);
  return (
    <form>
      <div className="flex flex-col justify-center gap-2 px-5 py-2">
        {method === "Sign up" ? (
          <EmailAndUsername/>
          ) : (
          <EmailOrUsername/>
        )}
        <Password />
        <SubmitButton>{method}</SubmitButton>
      </div>
    </form>
  );
};

export default AuthForm;
