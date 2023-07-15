import React from "react";

const EmailAndUsername: React.FC = () => {
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
          className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"
          placeholder="email"
        />
      </div>
    </>
  );
};

export default EmailAndUsername;
