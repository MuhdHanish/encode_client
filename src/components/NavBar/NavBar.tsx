import React from "react";
import { NavLink } from "react-router-dom";
import EnCodeLogo from "../../assets/logo/encode-logo.png";
import { NavBarDropDown } from "../NavBarDropDown/NavBarDropDown";

interface NavProps {
  isTutor: boolean;
}

const NavBar: React.FC<NavProps> = ({ isTutor }) => {

  return (
    <div className="w-full h-16 bg-transparent shadow-md flex items-center justify-between ">
      <div className="hidden w-[40%] sm:flex h-full justify-center items-center">
        <img className="w-1/2" src={EnCodeLogo} alt="endcode-logo" />
      </div>
      <div className="h-full w-full flex gap-10 justify-center items-center text-[12px] font-medium">
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
