import React from "react";                            
import { NavLink } from "react-router-dom";
import { AdminNavBarDropDown } from "../AdminNavDropDown/NavDropDown";

const AdminNavBar: React.FC = () => {
  return (
    <div className=" px-5  h-[75px]  w-full   bg-transparent shadow-md  flex items-center justify-between ">
      <div></div>
      <div className=" h-full flex gap-8 justify-center  items-center text-[14px] font-medium ">
          <NavLink
            to={"/admin"}
            end={true}
            className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out border-transparent duration-300`}>
            Dashborad
          </NavLink>
          <NavLink
            to={"/admin/users" }
            className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out border-transparent duration-300`}>
            Users
          </NavLink>
          <NavLink
            to={"/admin/courses"}
            className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out border-transparent duration-300 `}>
            Courses
          </NavLink>
          <NavLink
            to={"/admin/languages"}
            className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out border-transparent duration-300 `}>
            Languages
          </NavLink>
        </div>
        <div>
        <AdminNavBarDropDown />
        </div>
    </div>
  );
};

export default AdminNavBar;
