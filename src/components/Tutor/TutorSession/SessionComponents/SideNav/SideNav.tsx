import React from "react";
import { LuImagePlus } from "react-icons/lu";
import { TbHomeStats } from "react-icons/tb";

interface SideNavProps {
  setSessionMode: (number: number) => void;
  sessionMode: number;
}

const SideNav: React.FC<SideNavProps> = ({ setSessionMode, sessionMode }) => {
  const getMenuIcon = (index: number) => {
    switch (index) {
      case 0:
        return <TbHomeStats style={{ fontSize: "26px" }} />;
      case 1:
        return <LuImagePlus style={{ fontSize: "26px" }} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="left-0 w-13 h-full flex flex-col justify-center items-center z-10">
        <div className="flex flex-col h-full justify-start items-center border border-t-0 shadow-xl   gap-10 p-2 py-8">
          {[0, 1].map((index) => (
            <div
              key={index}
                onClick={() => setSessionMode(index)}
                className={`${
                  sessionMode === index
                    ? " text-primary "
                    : " text-gray-400"
                }  flex items-center duration-700
                    justify-center  transition-all    w-12 h-12  cursor-pointer relative `}
                title={
                  index === 0
                    ? "Add Course"
                    : "Manage"
                }
              >
                {getMenuIcon(index)}
              </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideNav;
