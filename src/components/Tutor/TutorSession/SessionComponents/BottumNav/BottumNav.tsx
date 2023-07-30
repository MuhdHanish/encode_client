import React from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { RiUserSettingsLine } from "react-icons/ri";
import { BsHeadset } from "react-icons/bs";

const BottumNav:React.FC = () => {
  return (
    <div className=" bottom-0 w-full h-13 flex flex-row gap-5 p-2">
      <div className="flex flex-row h-full w-full border shadow-xl rounded-md gap-5 p-2 ">
        <div
          className="w-full h-full rounded-md p-3 flex border transistion  cursor-pointer shadow-md justify-center items-center overflow-hidden"
          title="Add Course"
        >
          <AiOutlinePlus style={{ fontSize: "25px", color: "#9C4DF4" }} />
        </div>
        <div
          className="w-full h-full rounded-md p-3 flex border transistion cursor-pointer shadow-md justify-center items-center overflow-hidden"
          title="Manage"
        >
          <FiSettings style={{ fontSize: "23px", color: "#9C4DF4" }} />
        </div>
        <div
          className="w-full h-full rounded-md p-3  flex border transistion cursor-pointer shadow-md justify-center items-center overflow-hidden"
          title="Students"
        >
          <RiUserSettingsLine style={{ fontSize: "26px", color: "#9C4DF4" }} />
        </div>
        <div
          className="w-full h-full rounded-md p-3 flex border transistion cursor-pointer shadow-md justify-center items-center overflow-hidden"
          title="On Live"
        >
          <BsHeadset style={{ fontSize: "26px", color: "#9C4DF4" }} />
        </div>
      </div>
    </div>
  );
}

export default BottumNav