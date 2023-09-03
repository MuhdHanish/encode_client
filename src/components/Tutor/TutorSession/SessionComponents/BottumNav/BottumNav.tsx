import React from "react";
import { LuImagePlus } from "react-icons/lu";
import { TbHomeStats } from "react-icons/tb";

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
        return <TbHomeStats style={{ fontSize: "26px" }} />;
      case 1:
        return <LuImagePlus style={{ fontSize: "26px"}} />;
      default:
        return null;
    }
  };

  return (
    <div className="bottom-0 w-full h-13 flex flex-row justify-center items-center">
      <div className="flex h-full w-full justify-center items-center border shadow-xl  gap-10 p-2 px-8">
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
            title={index === 0 ? "Add Course" : "Manage"}
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
