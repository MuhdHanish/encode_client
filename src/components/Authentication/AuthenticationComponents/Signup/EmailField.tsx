import React,{ChangeEvent,useState} from 'react'
import { FormValues } from '../../../../dtos/Form';
import ErrorTooltip from '../../ErrorTooltip/ErrorTooltip';
import ErrorIndicator from '../../ErrorIndicator/ErrorIndicator';

interface EmailfiledProps {
  signupState: FormValues;
  errors: { field: string; errors: string[] } | null;
  setErrors: (value: null) => void;
  setSignupState: (event: ChangeEvent<HTMLInputElement>) => void;
}

const EmailField:React.FC<EmailfiledProps> = ({signupState, setSignupState, errors,setErrors}) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="email" className="text-[14px] text-shadow-black">
          Email <span className="text-red-600">*</span>
        </label>
        <div className="relative flex flex-col justify-center items-center">
          <input type="text" name="email" id="email "value={signupState.email}
            placeholder="email" onChange={setSignupState} onClick={()=>setErrors(null)}
            className="border  p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"
          />
          {errors?.field === "email" && (
            <>
              <ErrorTooltip setHover={setIsHovered} />
              <div className={isHovered ? "block" : "hidden"}>
                <ErrorIndicator errors={errors} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default EmailField;