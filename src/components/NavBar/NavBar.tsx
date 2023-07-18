import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import EnCodeLogo from "../../assets/logo/endcode-logo.png";
import { useNavigate } from "react-router-dom";

interface NavProps {
  isTutor: boolean;
}

const NavBar: React.FC<NavProps> = ({ isTutor }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setHovered] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-full h-16 bg-transparent shadow-md flex items-center justify-center">
      <div className="hidden w-1/4 sm:flex h-full justify-center items-center">
        <img className="w-1/2" src={EnCodeLogo} alt="endcode-logo" />
      </div>
      <div className="h-full w-full flex gap-10 justify-center items-center text-sm font-normal">
        <div
          className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out duration-300 ${
            activeIndex === 0
              ? "border-primary font-medium"
              : "border-transparent"
          }`}
          onClick={() => handleTabClick(0)}
        >
          Home
        </div>
        <div
          className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out duration-300 ${
            activeIndex === 1
              ? "border-primary font-medium"
              : "border-transparent"
          }`}
          onClick={() => handleTabClick(1)}
        >
          {isTutor ? "Courses" : "Progress"}
        </div>
        <div
          className={`flex h-full justify-center items-center border-b-2 pt-2 transition ease-in-out duration-300 ${
            activeIndex === 2
              ? "border-primary font-medium"
              : "border-transparent"
          }`}
          onClick={() => handleTabClick(2)}
        >
          {isTutor ? "Students" : "Catalog"}
        </div>
        <div
          className="flex h-full justify-center items-center relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <FaUser style={{ color: "#9C4DF4", fontSize: "16px" }} />
          {isHovered && (
            <div className="absolute top-10 right-0 mt-1 mr-1 bg-white text-black p-2 rounded text-sm">
              <button onClick={handleLogout} className="w-[100px]">Log out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
