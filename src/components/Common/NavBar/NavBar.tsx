import React from "react";                            
import { NavBarDropDown } from "../NavBarDropDown/NavBarDropDown";
import { NavLink } from "react-router-dom";

interface NavProps {
  isTutor: boolean;
}

const NavBar: React.FC<NavProps> = ({ isTutor }) => {
  return (
    <div className=" px-5  h-[75px]  w-full   bg-transparent shadow-md  flex items-center justify-between ">
      <div></div>
      <div className=" h-full flex gap-8 justify-center  items-center text-[14px] font-medium ">
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
            to={isTutor ? "/tutor/section" : "/catalog"}
            className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out border-transparent duration-300 `}>
            {isTutor ? "Section" : "Catalog"}
          </NavLink>
        </div>
        <div>
        <NavBarDropDown />
        </div>
    </div>
  );
};

export default NavBar;
