import React, { ChangeEvent, useEffect, useState, useCallback } from 'react'
import { FormValues } from "../../../../../dtos/Form";
import { getFullLanguages } from '../../../../../utils/LanguageUtils';
import { Language } from '../../../../../dtos/Language';
interface InputProps {
  sessionState: FormValues;
  setSessionState: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const LanguageSelection: React.FC<InputProps> = ({ sessionState, setSessionState }) => {
  const [languages, setLanguages] = useState([""]);
 const setLanguagesName = useCallback(() => {
    getFullLanguages()
      .then((res) => {
        if (Array.isArray(res)) {
          const languagesArray = res as [Language];
          setLanguages(languagesArray.map((value)=> value.languagename as string))
        } else {
          console.log('Error:', res); 
        }
      })
      .catch((err) => console.log(err));
  }, []);

  
  useEffect(() => {
    setLanguagesName();
  }, [setLanguagesName]);
  
  return (
    <>
      <div className="flex flex-col w-full justify-center items-start h-fit p-3">
        <span className="text-sm font-medium">
          Language <span className="text-red-500">*</span>
        </span>
        <div className="p-1 w-full h-fit">
          <select
            className="border text-[14px] p-2 w-full rounded-md outline-none shadow-md"
            value={sessionState.language}
            onChange={setSessionState}
            name="language"
          >
            <option value="">Select an option</option>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default LanguageSelection;