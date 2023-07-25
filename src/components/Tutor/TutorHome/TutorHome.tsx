import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import sideImg from "../../../assets/home-page-images/tutor-home.png";
import MainImageFrame from "../../Common/MainImageFrame/MainImageFrame";

interface User {
  profile: string;
  username: string;
}

const TutorHome: React.FC = () => {
  const naviagate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user") as string;
    const user = JSON.parse(isLoggedIn) as User;
    setUser(user)
  }, []);
  return (
    <>
      <div className="w-full h-full flex justify-center items-center py-7 px-5  overflow-auto">
        <div
          className={`bg-white  w-full max-w-[80%]  h-full overflow-auto rounded-md 
        flex justify-center items-center shadow-xl p-3 gap-5 flex-row}`}
        >
          <div className="lg:w-1/2  w-full h-full flex flex-col justify-around gap-5 items-center p-3 md:p-8 ">
            <div className="w-full  flex flex-col justify-center  items-start">
              <span className="text-5xl font-bold text-gray-600">EnCode</span>
              <span className="text-4xl font-bold text-primary">Learning</span>
            </div>
            <div className="w-full  flex flex-col gap-5 sm:px-10 lg:px-0  items-center">
              <span className="text-md font-medium text-black">
                Hi {user?.username} !
              </span>
              <span className="text-[14px] text-gray-600">
                Welcome to your tutor home! As a coding tutor on our platform,
                you have access to an array of powerful tools and resources
                designed to deliver an exceptional coding learning experience
                for your students. Empowering your students to practice and
                apply their skills in real-time.
              </span>
            </div>
            <div className="flex justify-center items-center w-full h-fit">
              <button
                className="btn-class min-w-[200px]"
                onClick={() => naviagate("/tutor/session")}
              >
                Start session
              </button>
            </div>
          </div>
          <MainImageFrame imgSrc={sideImg} alt={"tutor-home-image"} />
        </div>
      </div>
    </>
  );
};

export default TutorHome;
