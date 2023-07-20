import React from "react";
import { NavLink } from "react-router-dom";
import { NavBarDropDown } from "../NavBarDropDown/NavBarDropDown";

interface NavProps {
  isTutor: boolean;
}

const NavBar: React.FC<NavProps> = ({ isTutor }) => {

  return (
    <div className="w-full h-[13%] bg-transparent shadow-md rounded-xl flex items-center justify-between ">
      <div className="h-full w-full flex gap-8 justify-center items-center text-[12px] font-medium">
        <NavLink
          to="/"
          className={`flex  justify-center items-center py-0.5 px-2.5 rounded-2xl  transition ease-in-out duration-300}`}
        >
          Home
        </NavLink>
        <NavLink
          to={isTutor ? "/courses" : "/progress"}
          className={`flex  justify-center items-center py-0.5 px-2.5 rounded-2xl  transition ease-in-out duration-300 `}
        >
          {isTutor ? "Courses" : "Progress"}
        </NavLink>
        <NavLink
          to={isTutor ? "/students" : "/catalog"}
          className={`flex first-letter: justify-center items-center  py-0.5 px-2.5 rounded-2xl  transition ease-in-out duration-300 `}
        >
          {isTutor ? "Students" : "Catalog"}
        </NavLink>
        <div>
          <NavBarDropDown />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
