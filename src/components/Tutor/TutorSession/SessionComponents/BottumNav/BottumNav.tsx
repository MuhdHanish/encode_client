import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";
import { BsHeadset } from "react-icons/bs";

interface BottumNavProps {
  sessionMode: number;
  setSessionMode: (number: number) => void;
}

const BottumNav: React.FC<BottumNavProps> = ({
  sessionMode,
  setSessionMode,
}) => {
  const getMenuIcon = (index: number) => {
    switch (index) {
      case 0:
        return <AiOutlinePlus style={{ fontSize: "26px", color: "#9C4DF4" }} />;
      case 1:
        return <LuImagePlus style={{ fontSize: "26px", color: "#9C4DF4" }} />;
      case 2:
        return <BsHeadset style={{ fontSize: "26px", color: "#9C4DF4" }} />;
      default:
        return null;
    }
  };

  return (
    <div className="bottom-0 w-full h-13 flex flex-row justify-center items-center">
      <div className="flex h-full w-full justify-center items-center border shadow-xl rounded-t-xl  gap-10 p-2 px-8">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            onClick={() => setSessionMode(index)}
            className={`w-12 h-12 rounded-full ${
              sessionMode === index
                ? "-translate-y-6 shadow-2xl border-primary"
                : " -translate-y-0"
            }  flex items-center duration-500 justify-center border-2  bg-white cursor-pointer relative `}
            title={
              index === 0 ? "Add Course" : index === 1 ? "Manage" : "On Live"
            }
          >
            {getMenuIcon(index)}
            {sessionMode === index && (
              <div className="absolute bottom-0 left-1/2 w-6 h-6 rounded-full transform -translate-x-1/2 -rotate-45 " />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottumNav;
