import React, {  useState } from 'react'
import ErrorTooltip from '../../ErrorTooltip/ErrorTooltip';
import { formatTime } from '../../../../utils/formatTime';
import ErrorIndicator from '../../ErrorIndicator/ErrorIndicator';

interface OtpFieldProps {
  enteredOtp: string;
  setEnteredOtp: (value:string) => void;
  errors: { field: string, errors: string[] } | null;
  setErrors: (value: null) => void;
  handleStepOne: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void
  otpValidity: number,
}


const OtpField: React.FC<OtpFieldProps> = ({enteredOtp,errors,setEnteredOtp,handleStepOne,otpValidity,setErrors}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col items-center gap-2 ">
        <label htmlFor="enteredOtp" className="text-[11px] text-shadow-black">
          Varification code<span className="text-red-600 ml-1">*</span>
        </label>
        <div className="relative flex flex-col justify-center ">
          <input
            type="text" name="enteredOtp" id="enteredOtp" value={enteredOtp} onClick={()=>setErrors(null)}
            onChange={(event) => setEnteredOtp(event.target.value)} placeholder="varification code"
            className="border text-xs p-2 text-[10px] sm:w-[250px] rounded-md outline-none shadow-md"/>
          {errors?.field === "enteredOtp" && (
            <>
              <ErrorTooltip setHover={setIsHovered} />
              <div className={isHovered ? "block" : "hidden"}>
                <ErrorIndicator errors={errors} />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center items-center  bottom-0">
          <p className="text-xs text-shadow-black mt-3">
            {otpValidity !== 0 && formatTime(otpValidity)}
            {!otpValidity && (
              <button onClick={handleStepOne}
                className="border-none outline-none font-semibold text-[10]px text-blue-700"
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