import React, { useState } from "react";

interface EmailAndUsernameProps {
  role: string,
  onUsernameChange: (value: string) => void;
  onEmailChange: (value: string) => void;

}

const EmailAndUsername: React.FC<EmailAndUsernameProps> = ({ role,onUsernameChange,onEmailChange }) => {
   const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
    onUsernameChange(value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    onEmailChange(value);
  };
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="username" className="text-[11px]  text-shadow-black">
          Username <span className="text-red-600 ">*</span>
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
          placeholder="username"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-[11px]  text-shadow-black">
          Email <span className="text-red-600 ">*</span>
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
          placeholder="email"
        />
      </div>
    </>
  );
};

export default EmailAndUsername;
