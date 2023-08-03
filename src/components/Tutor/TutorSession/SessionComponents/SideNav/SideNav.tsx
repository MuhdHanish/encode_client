import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { RiUserSettingsLine } from "react-icons/ri";
import { BsHeadset } from "react-icons/bs";

interface SideNavProps {
  setSessionMode: (number: number) => void;
}

const SideNav: React.FC<SideNavProps> = ({setSessionMode}) => {
  return (
    <>
      <div className="flex flex-col h-full justify-center items-center p-2">
        <div className="flex flex-col h-full w-full border shadow-xl rounded-md gap-5 p-2 ">
          <div
            onClick={() => setSessionMode(0)}
            className="w-full h-full rounded-md p-3 flex border transistion  cursor-pointer shadow-md justify-center items-center overflow-hidden"
            title="Add Course"
          >
            <AiOutlinePlus style={{ fontSize: "25px", color: "#9C4DF4" }} />
          </div>
          <div
            onClick={() => setSessionMode(1)}
            className="w-full h-full rounded-md p-3 flex border transistion cursor-pointer shadow-md justify-center items-center overflow-hidden"
            title="Manage"
          >
            <FiSettings style={{ fontSize: "23px", color: "#9C4DF4" }} />
          </div>
          <div
            onClick={() => setSessionMode(2)}
            className="w-full h-full rounded-md p-3  flex border transistion cursor-pointer shadow-md justify-center items-center overflow-hidden"
            title="Students"
          >
            <RiUserSettingsLine
              style={{ fontSize: "26px", color: "#9C4DF4" }}
            />
          </div>
          <div
            onClick={() => setSessionMode(3)}
            className="w-full h-full rounded-md p-3 flex border transistion cursor-pointer shadow-md justify-center items-center overflow-hidden"
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
