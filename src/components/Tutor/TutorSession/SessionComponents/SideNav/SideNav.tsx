import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";

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
      default:
        return null;
    }
  };

  return (
    <>
      <div className="left-0 w-13 h-full flex flex-col justify-center items-center z-10">
        <div className="flex flex-col h-full justify-center items-center border shadow-xl   gap-10 p-2 py-8">
          {[0, 1, 2].map((index) => (
            <div className="bg-[#C5C5C5]  rounded-lg" key={index}>
              <div
                onClick={() => setSessionMode(index)}
                className={`${
                  sessionMode === index
                    ? " translate-x-0 -translate-y-0"
                    : "  translate-x-1 -translate-y-1  shadow-2xl"
                }  flex items-center duration-700  text-primary border rounded-md 
                    justify-center  transition-all hover:translate-x-0 hover:-translate-y-0 bg-white  w-12 h-12  cursor-pointer relative`}
                title={
                  index === 0
                    ? "Add Course"
                    : "Manage"
                }
              >
                {getMenuIcon(index)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideNav;
