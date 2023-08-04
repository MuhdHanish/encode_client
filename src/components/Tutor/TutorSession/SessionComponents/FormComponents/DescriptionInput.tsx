import React, { ChangeEvent } from 'react'

import { FormValues } from "../../../../../dtos/Form";

interface InputProps {
  sessionState: FormValues;
  setSessionState: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const DescriptionInput: React.FC<InputProps> = ({sessionState,setSessionState}) => {
  return (
    <>
      <div className="w-full h-fit  flex ">
        <div className="flex flex-col w-full justify-center items-start h-fit p-3">
          <span className="text-sm font-medium">
            Description <span className="text-red-500">*</span>
          </span>
          <div className="p-1 w-full h-fit">
            <textarea
              placeholder="description (max-200)"
              className="border text-[14px] p-2 w-full  h-[100PX]   rounded-md outline-none shadow-md"
              name="description"
              onChange={setSessionState}
              value={sessionState.description}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DescriptionInput