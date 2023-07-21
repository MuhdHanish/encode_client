import React from "react";                            
import { NavBarDropDown } from "../NavBarDropDown/NavBarDropDown";
import { NavLink } from "react-router-dom";

interface NavProps {
  isTutor: boolean;
}

const NavBar: React.FC<NavProps> = ({ isTutor }) => {
  return (
    <div className="w-fit px-5  h-[13%] bg-transparent shadow-md rounded-xl flex items-center justify-center ">
      <div className=" h-full w-full flex gap-8 justify-center  items-center text-[12px] font-medium ">
          <NavLink
            to={isTutor ? "/tutor" : "/"}
            end={true}
            className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out border-transparent duration-300`}>
            Home
          </NavLink>
          <NavLink
            to={isTutor ? "/tutor/dashboard" : "/progress"}
            className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out border-transparent duration-300`}>
            {isTutor ? "Dashboard" : "Progress"}
          </NavLink>
          <NavLink
            to={isTutor ? "/tutor/session" : "/catalog"}
            className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out border-transparent duration-300 `}>
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
