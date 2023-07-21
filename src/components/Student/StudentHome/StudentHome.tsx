import { useNavigate } from "react-router-dom";
import PageModal from "../../Common/PageModal/PageModal";
import React, { useEffect, useState } from "react";
import MainImageFrame from "../../Common/MainImageFrame/MainImageFrame";
import sideImg from "../../../assets/home-page-images/student-home.png";

interface User {
  profile: string;
  username: string;
}

const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user") as string;
    const user = JSON.parse(isLoggedIn) as User;
    setUser(user);
  }, [user, setUser]);
  return (
        <PageModal>
          <MainImageFrame imgSrc={sideImg} alt={"student-home-image"} />
          <div className="sm:w-1/2  w-full h-full flex flex-col justify-center items-center p-3 md:p-8  gap-5">
            <div className="w-full  flex flex-col justify-center  items-start">
              <span className="text-4xl font-bold text-gray-600">EnCode</span>
              <span className="text-2xl font-bold text-primary">Learning</span>
            </div>
            <div className="w-full  flex flex-col justify-center gap-2 items-center">
              <span className="text-md font-medium text-black">
                Hi {user?.username} !
              </span>
              <span className="text-xs font-normal text-gray-600">
                In the digital age, online learning has revolutionized
                education, particularly in the realm of programming and computer
                science. With the increasing demand for technical skills, online
                platforms have emerged as valuable resources for learners of all
                levels.
              </span>
            </div>
            <div className="flex justify-center items-center w-full h-fit">
              <button className="btn-class min-w-[200px]" onClick={()=>{navigate("/progress")}}>Explore</button>
            </div>
          </div>
        </PageModal>
  );
};

export default StudentHome;
