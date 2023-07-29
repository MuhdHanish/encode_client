import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { RiUserSettingsLine } from "react-icons/ri";
import { BsHeadset } from "react-icons/bs";

const SideNav: React.FC = () => {
  return (
    <>
      <div className="hidden lg:flex flex-col w-1/6 h-13 justify-center items-center p-2">
        <div className="flex flex-col h-full w-1/2 border shadow-xl rounded-lg p-4 gap-5">
          <div
            className="w-full h-full rounded-xl p-4 flex border transistion  cursor-pointer shadow-md justify-center items-center"
            title="Add Course"
          >
            <AiOutlinePlus style={{ fontSize: "25px", color: "#9C4DF4" }} />
          </div>
          <div
            className="w-full h-full rounded-xl p-4 flex border transistion cursor-pointer shadow-md justify-center items-center"
            title="Manage"
          >
            <FiSettings style={{ fontSize: "23px", color: "#9C4DF4" }} />
          </div>
          <div
            className="w-full h-full rounded-xl p-4 flex border transistion cursor-pointer shadow-md justify-center items-center"
            title="Students"
          >
            <RiUserSettingsLine
              style={{ fontSize: "26px", color: "#9C4DF4" }}
            />
          </div>
          <div
            className="w-full h-full rounded-xl p-4 flex border transistion cursor-pointer shadow-md justify-center items-center overflow-scroll"
            title="On Live"
          >
            <BsHeadset style={{ fontSize: "26px", color: "#9C4DF4" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
