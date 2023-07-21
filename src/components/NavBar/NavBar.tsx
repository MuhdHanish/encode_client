import React from "react";
import { NavLink } from "react-router-dom";
import { NavBarDropDown } from "../NavBarDropDown/NavBarDropDown";

interface NavProps {
  isTutor: boolean;
}

const NavBar: React.FC<NavProps> = ({ isTutor }) => {

  return (
    <div className="w-full h-[13%] bg-transparent shadow-md rounded-xl flex items-center justify-end ">
      <div className="h-full md:w-1/2 w-full flex gap-8 justify-center  items-center text-[12px] font-normal">
        <NavLink
          to={isTutor ? "/tutor" : "/"}
          className={`flex  justify-center items-center py-0.5 px-2.5 rounded-2xl  transition ease-in-out duration-300}`}
        >
          Home
        </NavLink>
        <NavLink
          to={isTutor ? "/tutor/dashboard" : "/progress"}
          className={`flex  justify-center items-center py-0.5 px-2.5 rounded-2xl  transition ease-in-out duration-300 `}
        >
          {isTutor ? "Dashboard" : "Progress"}
        </NavLink>
        <NavLink
          to={isTutor ? "/tutor/session" : "/catalog"}
          className={`flex first-letter: justify-center items-center  py-0.5 px-2.5 rounded-2xl  transition ease-in-out duration-300 `}
        >
          {isTutor ? "Session" : "Catalog"}
        </NavLink>
        <div>
          <NavBarDropDown />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
