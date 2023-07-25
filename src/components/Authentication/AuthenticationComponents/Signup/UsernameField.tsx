import { FormValues } from "../../../../dtos/Form";
import React, { ChangeEvent, useState } from "react";
import ErrorTooltip from "../../ErrorTooltip/ErrorTooltip";
import ErrorIndicator from "../../ErrorIndicator/ErrorIndicator";

interface UsernameFieldProps {
  signupState: FormValues;
  errors: { field: string; errors: string[] } | null;
  setSignupState: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UsernameField: React.FC<UsernameFieldProps> = ({signupState,errors,setSignupState}) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-0.5 mb-0.5">
      <label htmlFor="username" className="text-[14px] text-shadow-black">
        Username <span className="text-red-600">*</span>
      </label>
      <div className="relative flex flex-col justify-center items-end">
        <input type="text" name="username" id="username"
          value={signupState.username} placeholder="username" onChange={setSignupState}
     className="border  p-2 text-[14px] w-[250px] sm:w-[280px] rounded-md outline-none shadow-md"/>
        {errors?.field === "username" && (
          <>
            <ErrorTooltip setHover={setIsHovered} />
            <div className={isHovered ? "block" : "hidden"}>
              <ErrorIndicator errors={errors} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsernameField;
