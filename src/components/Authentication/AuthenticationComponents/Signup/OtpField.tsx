import React, { useState } from 'react';
import ErrorTooltip from '../../ErrorTooltip/ErrorTooltip';
import { formatTime } from '../../../../utils/formatTime';
import ErrorIndicator from '../../ErrorIndicator/ErrorIndicator';

interface OtpFieldProps {
  enteredOtp: string;
  setEnteredOtp: (value: string) => void;
  errors: { field: string, errors: string[] } | null;
  setErrors: (value: null) => void;
  handleStepOne: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
  otpValidity: number;
}

const OtpField: React.FC<OtpFieldProps> = ({ errors, setEnteredOtp, handleStepOne, otpValidity, setErrors }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const initialOtpDigits = Array.from({ length: 6 }, () => "");
  const [otpDigits, setOtpDigits] = useState<string[]>(initialOtpDigits);
  const handleInputChange = (index: number, value: string) => {
    const sanitizedValue = /^[0-9]{0,1}$/.test(value) ? value : '';
    setOtpDigits((prevDigits) => {
      const updatedDigits = [...prevDigits];
      updatedDigits[index] = sanitizedValue;
      return updatedDigits;
    });
  };

  const concatenatedOtp = otpDigits.join('');
  setEnteredOtp(concatenatedOtp);

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <label htmlFor="otpFields" className="text-[14px] text-shadow-black">
          Verification code<span className="text-red-600 ml-1">*</span>
        </label>
        <div className="relative flex flex-col justify-center">
          <div className="flex items-center ">
          <div className="flex justify-center items-center gap-1.5">
            {otpDigits.map((digit, index) => (
              <input key={index} type="text" name={`otpField-${index}`}
                id={`otpField-${index}`}value={digit}
                onChange={(event) =>
                  handleInputChange(index, event.target.value)
                } maxLength={1} onClick={() => setErrors(null)}
                className="border border-gray-300  p-2.5 text-[14px] w-[30px] h-[30px] rounded-md outline-none shadow-md"
              />
            ))}
          </div> 
          {errors?.field === "enteredOtp" && (
            <>
              <div className='mb-3 mr-8'>
                <ErrorTooltip setHover={setIsHovered} />  
                <div className={isHovered ? "block" : "hidden"}>
                  <ErrorIndicator errors={errors} />
                </div>
              </div>
            </>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center bottom-0">
          <p className="text-[14px] text-shadow-black mt-3">
            {otpValidity !== 0 && formatTime(otpValidity)}
            {!otpValidity && (
              <button
                onClick={handleStepOne}
                className="border-none outline-none font-semibold text-[14px] text-blue-700"
              >
                Re-send
              </button>
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default OtpField;
