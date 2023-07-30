import React, { ChangeEvent, useEffect, useState, useCallback } from 'react'

import { FormValues } from "../../../../../dtos/Form";
import { getCategoryName } from '../../../../../utils/categoryUtils';

interface InputProps {
  sessionState: FormValues;
  setSessionState: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const CategorySelection: React.FC<InputProps> = ({ sessionState, setSessionState }) => {
  const [categories, setCategories] = useState([""]);
  const setCategoryNames = useCallback(
    () => {
    getCategoryName()
      .then((res) => {
        setCategories(res as string[]);
      })
      .catch((err) => console.log(err));
    },
    [],
  )
  
  useEffect(() => {
    setCategoryNames();
  }, [setCategoryNames]);
  
  return (
    <>
      <div className="flex flex-col w-full justify-center items-start h-fit p-3">
        <span className="text-sm font-medium">
          Catgory <span className="text-red-500">*</span>
        </span>
        <div className="p-1 w-full h-fit">
          <select
            className="border text-[14px] p-2 w-full rounded-md outline-none shadow-md"
            value={sessionState.category}
            onChange={setSessionState}
            name="category"
          >
            <option value="">Select an option</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default CategorySelection