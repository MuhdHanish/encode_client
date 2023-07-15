import React from "react";

const EmailOrUsername: React.FC = () => {
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
        />
      </div>
    </>
  );
};

export default EmailOrUsername;
