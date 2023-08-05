import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";
import { BsHeadset } from "react-icons/bs";

interface SideNavProps {
  setSessionMode: (number: number) => void;
  sessionMode: number;
}

const SideNav: React.FC<SideNavProps> = ({ setSessionMode, sessionMode }) => {
  const getMenuIcon = (index: number) => {
    switch (index) {
      case 0:
        return <AiOutlinePlus style={{ fontSize: "26px"}} />;
      case 1:
        return <LuImagePlus style={{ fontSize: "26px" }} />;
      case 2:
        return <BsHeadset style={{ fontSize: "26px"}} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="left-0 w-13 h-full flex flex-col justify-center items-center z-10">
        <div className="flex flex-col h-full justify-center items-center border shadow-xl   gap-10 p-2 py-8">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              onClick={() => setSessionMode(index)}
              className={`w-12 h-12 rounded-full ${
                sessionMode === index
                  ? "bg-primary text-white shadow-2xl   "
                  : " bg-white  text-primary"
              }  flex items-center duration-700 justify-center border-2 transition-all   cursor-pointer relative`}
              title={
                index === 0 ? "Add Course" : index === 1 ? "Manage" : "On Live"
              }
            >
              {getMenuIcon(index)}
              {sessionMode === index && (
                <div className="absolute bottom-0 left-1/2 w-6 h-6 rounded-full transform -translate-x-1/2 -rotate-45 z-10 " />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideNav;
