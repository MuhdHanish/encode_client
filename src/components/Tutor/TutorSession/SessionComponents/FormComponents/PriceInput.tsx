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

const PriceInput: React.FC<InputProps> = ({
  sessionState,
  setSessionState,
}) => {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-start h-fit p-3">
        <span className="text-sm font-medium">
          Price <span className="text-red-500">*</span>
        </span>
        <div className="p-1 w-full h-fit">
          {sessionState.isPaid !== "yes" ? (
            <input
              type="text"
              placeholder="No payment"
              readOnly
              className="border text-[14px] p-2  w-full rounded-md outline-none shadow-md"
              name="price"
              id="price"
              value={sessionState.price}
              onChange={setSessionState}
            />
          ) : (
            <input
              type="text"
              className="border text-[14px] p-2 w-full  rounded-md outline-none shadow-md"
              value={sessionState.price}
              name="price"
              id="price"
              onChange={setSessionState}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PriceInput;
