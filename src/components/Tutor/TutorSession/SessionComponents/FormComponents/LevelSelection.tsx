import React, { ChangeEvent } from 'react'
import { FormValues } from '../../../../../dtos/Form';

interface InputProps {
  sessionState: FormValues;
  setSessionState: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const LevelSelection:React.FC<InputProps> = ({sessionState,setSessionState}) => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-start h-fit p-3">
        <span className="text-sm font-medium">
          Level <span className="text-red-500">*</span>
        </span>
        <div className="p-1 w-full h-fit">
          <select
            className="border text-[14px] p-2 w-full  rounded-md outline-none shadow-md"
            value={sessionState.level}
            name="level"
            id="level"
            onChange={setSessionState}
          >
            <option value="">Select an option</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate ">Intermediate </option>
            <option value="Expert ">Expert </option>
          </select>
        </div>
      </div>
    </>
  );
}

export default LevelSelection