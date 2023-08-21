import React from 'react'
import { BsArrowLeftShort } from "react-icons/bs";
import { Language } from '../../../../dtos/Language';
import { CiCircleRemove } from 'react-icons/ci';

interface SideBarProps {
  isMedium: boolean;
  languages: Language[];
  setSelectedLanguage: (value: string| null) => void;
  selectedLanguage: string | null;
  closeSideBar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({isMedium,closeSideBar,languages,setSelectedLanguage, selectedLanguage}) => {
  return (
    <>
      <div
        className={`${
          isMedium
            ? " w-1/2 flex absolute left-0 duration-300  gap-2 p-2 shadow-2xl bg-white z-10"
            : "w-0  lg:w-1/5 shadow-2xl"
        } flex flex-col   h-full  lg:p-2 lg:gap-2 `}
      >
        {isMedium ? (
          <div className="w-full flex h-fit justify-end ">
            <button onClick={closeSideBar}>
              <BsArrowLeftShort style={{ fontSize: "30px" }} />
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="w-full h-fit flex items-center justify-center bg-white p-3 font-semibold text-[18px] hover:text-shadow-black transition-all">
          Languages
        </div>
        {selectedLanguage && (
          <div className="w-full h-fit flex items-center justify-start z-10 p-2">
            <div className="bg-[#c9c9c8]  w-fit h-fit rounded-md">
              <div className="flex p-1 text-[12px] gap-2  border border-gray-400 bg-white transition duration-500
               hover:translate-x-0 hover:-translate-y-0  translate-x-1 -translate-y-1 shadow-xl rounded-md cursor-pointer">
                <span>{selectedLanguage}</span>
                <span
                  className="w-fit h-fit  "
                  onClick={() => setSelectedLanguage(null)}
                >
                  <CiCircleRemove style={{ fontSize: "16px" }} />
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="w-full h-full flex flex-col items-center  overflow-y-auto px-5 ">
          {languages.map((language, index) => (
            <div
              className="my-2 text-[14px]  p-1 w-full justify-center  flex transition 
              duration-500 hover:scale-105 cursor-pointer font-medium
               border-gray 
              hover:shadow-lg hover:text-primary "
              key={index}
              onClick={() =>
                setSelectedLanguage(language?.languagename as string)
              }
            >
              {language?.languagename}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SideBar