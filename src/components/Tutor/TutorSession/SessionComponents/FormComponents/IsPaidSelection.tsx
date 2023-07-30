import React, { ChangeEvent } from "react";
import { FormValues } from "../../../../../dtos/Form";

interface InputProps {
  sessionState: FormValues;
  setSessionState: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const IsPaidSelection: React.FC<InputProps> = ({
  sessionState,
  setSessionState,
}) => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-start h-fit p-3">
        <span className="text-sm font-medium">
          Is Paid <span className="text-red-500">*</span>
        </span>
        <div className="p-1 w-full h-fit">
          <select
            className="border text-[14px] p-2 w-full  rounded-md outline-none shadow-md"
            value={sessionState.isPaid}
            name="isPaid"
            id="isPaid"
            onChange={setSessionState}
          >
            <option value="">Select an option</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default IsPaidSelection;
