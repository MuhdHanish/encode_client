import React from "react";                            
import { NavBarDropDown } from "../NavBarDropDown/NavBarDropDown";
import LogoSmall from "../../../assets/logo/Encode-logo.png"
import { NavLink } from "react-router-dom";
import { Notification } from "../Notification/Notification";

interface NavProps {
  isTutor: boolean;
}

const NavBar: React.FC<NavProps> = ({ isTutor }) => {
  return (
    <div className=" px-5  h-[75px]  w-full   bg-transparent shadow-md  flex items-center justify-between bg-white">
      <div className={"w-20 mt-2"}>
        <img src={LogoSmall} alt={"Logo"} className={"object-contain h-full"} />
      </div>
      <div className=" h-full flex gap-8 justify-center  items-center text-[14px] font-medium ">
        <NavLink
          to={isTutor ? "/tutor" : "/"}
          end={true}
          className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out border-transparent duration-300`}
        >
          Home
        </NavLink>
        <NavLink
          to={isTutor ? "/tutor/dashboard" : "/progress"}
          className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out border-transparent duration-300`}
        >
          {isTutor ? "Dashboard" : "Progress"}
        </NavLink>
        <NavLink
          to={isTutor ? "/tutor/section" : "/catalog"}
          className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out border-transparent duration-300 `}
        >
          {isTutor ? "Section" : "Catalog"}
        </NavLink>
      </div>
      <div className="flex items-center gap-7">
        <div className="cursor-pointer">
          <Notification />
        </div>
        <NavBarDropDown />
      </div>
    </div>
  );
};

export default NavBar;
