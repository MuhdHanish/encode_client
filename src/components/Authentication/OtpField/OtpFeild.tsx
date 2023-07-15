import React, { useState, useEffect } from "react";

interface OtpFeildProps {
  isOtpSended: boolean;
}

const OtpFeild: React.FC<OtpFeildProps> = ({ isOtpSended }) => {
  const [otpValidity, setOtpValidity] = useState<number>(120);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isOtpSended && otpValidity > 0) {
      timer = setInterval(() => {
        setOtpValidity((prevValidity) => prevValidity - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isOtpSended, otpValidity]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-2 px-5 py-2">
        {isOtpSended === true ? (
          <div className="flex flex-col gap-1 justify-center items-center">
            <>
              <div className="flex flex-col gap-2 items-center text-left">
                <label
                  htmlFor="username"
                  className="text-[11px] text-shadow-black"
                >
                  Enter OTP
                </label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    name="first"
                    id="first"
                    className="border text-xs p-2 text-[10px] w-[25px] h-[25px] rounded-md outline-none shadow-xl"
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
            <p className="text-xs text-shadow-black mt-3">
              {formatTime(otpValidity)}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default OtpFeild;
