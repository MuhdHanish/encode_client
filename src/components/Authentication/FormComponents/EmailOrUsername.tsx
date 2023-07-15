import React, { useState } from "react";

interface EmailOrUsernameProps {
  role: string,
  onCredentialChange: (value: string) => void;
}

const EmailOrUsername: React.FC<EmailOrUsernameProps> = ({ role, onCredentialChange }) => {

  const [credential, setCredential] = useState("");
  const handleCredentialChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCredential(value);
    onCredentialChange(value);
  }
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="credential" className="text-[11px]  text-shadow-black">
          Email or Username <span className="text-red-600 ">*</span>
        </label>
        <input
          type="text"
          name="credential"
          id="credential"
          className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
          placeholder="email or username"
          value={credential}
          onChange={handleCredentialChange}
        />
      </div>
    </>
  );
};

export default EmailOrUsername;
