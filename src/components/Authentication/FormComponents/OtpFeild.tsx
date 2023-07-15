import React from 'react'

const OtpFeild:React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-2 items-center text-left">
        <label htmlFor="username" className="text-[11px]  text-shadow-black">
          Enter OTP 
        </label>
        <div className='flex gap-1'>
          <input 
            type="text"
            name="first"
            id="first"
            className="border  text-xs p-2 text-[10px] w-[25px] h-[25px] rounded-md outline-none shadow-xl"
          />
          <input
            type="text"
            name="second"
            id="second"
            className="border text-xs p-2 text-[10px] w-[25px] h-[25px] rounded-md outline-none shadow-xl"
          />
          <input
            type="text"
            name="three"
            id="three"
            className="border text-xs p-2 text-[10px] w-[25px] h-[25px] rounded-md outline-none shadow-xl"
          />
          <input
            type="text"
            name="four"
            id="four"
            className="border text-xs p-2 text-[10px] w-[25px] h-[25px] rounded-md outline-none shadow-xl"
          />
          <input
            type="text"
            name="five"
            id="five"
            className="border text-xs p-2 text-[10px] w-[25px] h-[25px] rounded-md outline-none shadow-xl"
          />
          <input
            type="text"
            name="six"
            id="six"
            className="border text-xs p-2 text-[10px] w-[25px] h-[25px] rounded-md outline-none shadow-xl"
          />
        </div>
      </div>
    </>
  );
}

export default OtpFeild