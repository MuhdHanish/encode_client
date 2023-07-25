import React, { ChangeEvent, useEffect, useState } from "react";
import { FormValues } from "../../../../../dtos/Form";
import { getCategoryName } from "../../../../../utils/categoryUtils";

interface CommonFieldProps {
  passedState: FormValues;
  fieldName: keyof FormValues;
  type: string;
  showName: string;
  setPassedState: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const CommonField: React.FC<CommonFieldProps> = ({ passedState, setPassedState, fieldName, type, showName }) => {

  const [categories, setCategories] = useState([""]);
  
  useEffect(() => {
    if (type === 'select') {
      getCategoryName().then((res) => {
        setCategories(res as string[]);
      }).catch(err=>console.log(err));
    }
  }, [type]);

  return (
    <>
      <div className="felx flex-col items-center ">
        <label htmlFor={fieldName} className="text-[14px] text-shadow-black">
          {showName} <span className="text-red-600">*</span>
        </label>
        <div>
          {type === "textarea" ? (
            <textarea
              placeholder={showName.toLowerCase()}
              className="border text-[14px] p-2  w-[250px]   rounded-md outline-none shadow-md"
              value={passedState[fieldName] as string}
              name={fieldName}
              id={fieldName}
              onChange={setPassedState}
            />
          ) : type === "select" ? (
            <select
              placeholder={showName.toLowerCase()}
              className="border text-[14px] p-2 w-[250px]  rounded-md outline-none shadow-md"
              value={passedState[fieldName] as string}
              onChange={setPassedState}
              name={fieldName}
              id={fieldName}
            >
              <option value="">Select an option</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          ) : type === "selectIsPaid" ? (
            <select
              placeholder={showName.toLowerCase()}
              className="border text-[14px] p-2 w-[250px]  rounded-md outline-none shadow-md"
              value={passedState[fieldName] as string}
              name={fieldName}
              id={fieldName}
              onChange={setPassedState}
            >
              <option value="">Select an option</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          ) : type === "selectLevel" ? (
            <select
              placeholder={showName.toLowerCase()}
              className="border text-[14px] p-2 w-[250px]  rounded-md outline-none shadow-md"
              value={passedState[fieldName] as string}
              name={fieldName}
              id={fieldName}
              onChange={setPassedState}
            >
              <option value="">Select an option</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate ">Intermediate </option>
              <option value="expert ">Expert </option>
            </select>
          )  : type === "price" ? (
            {
              ...(passedState.isPaid !== "yes" ? (
                <input
                  type="text"
                  readOnly
                  placeholder={showName.toLowerCase()}
                  className="border text-[14px] p-2  w-[250px]  rounded-md outline-none shadow-md"
                  value={passedState[fieldName] as string}
                  name={fieldName}
                  id={fieldName}
                  onChange={setPassedState}
                />
              ) : (
                <input
                  type="text"
                  placeholder={showName.toLowerCase()}
                  className="border text-[14px] p-2 w-[250px]   rounded-md outline-none shadow-md"
                  value={passedState[fieldName] as string}
                  name={fieldName}
                  id={fieldName}
                  onChange={setPassedState}
                />
              )),
            }
          ) : (
            <input
              type={type}
              placeholder={showName.toLowerCase()}
              className="border text-[14px] p-2 w-[250px]   rounded-md outline-none shadow-md"
              value={passedState[fieldName] as string}
              name={fieldName}
              id={fieldName}
              onChange={setPassedState}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CommonField;
