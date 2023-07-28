import React from 'react'
import { BsArrowLeftShort } from "react-icons/bs";

interface SideBarProps {
  isMedium: boolean;
  categories: { _id?: string; categoryname?: string; description?: string }[];
  closeSideBar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({isMedium,closeSideBar,categories}) => {
  return (
    <>
      <div
        className={`${
          isMedium
            ? " w-1/2 flex absolute left-0 duration-300  gap-2 p-2 shadow-2xl bg-white"
            : "w-0  lg:w-1/5 shadow-2xl"
        } flex flex-col   h-full  lg:p-2 lg:gap-2`}
      >
        {isMedium ? (
          <div className="w-full flex h-fit justify-end ">
            <button onClick={closeSideBar}>
              <BsArrowLeftShort
                style={{ fontSize: "30px" }}
              />
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="w-full h-fit flex items-center justify-center bg-white p-3 font-semibold text-[18px] hover:text-shadow-black transition-all">
          Languages
        </div>
        <div className="w-full h-full flex flex-col items-center  overflow-y-auto px-5 ">
          {categories.map((category, index) => (
            <div
              className="my-2 text-[14px]  p-1 w-full justify-center  flex transition 
              duration-500 hover:scale-105 cursor-pointer font-medium
               border-gray 
              hover:shadow-lg hover:text-primary "
              key={index}
            >
              {category.categoryname}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SideBar