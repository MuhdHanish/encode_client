import React from "react";
import sideImg from "../../assets/home-page-images/tutor-home.png";
import NavBar from "../../components/NavBar/NavBar";

interface User {
  profile: string;
  username: string;
}

const TutorHomePage: React.FC = () => {
  const isLoggedIn = localStorage.getItem("user") as string;
  const user = JSON.parse(isLoggedIn) as User;
  return (
    <div className="bg-home-background bg-cover w-screen h-screen overflow-hidden ">
      <div className="flex flex-col justify-center items-center h-full">
        <NavBar isTutor={true} />
        <div className="h-full flex items-center justify-center py-7 px-5">
          <div
            className={`bg-white  w-full max-w-[80%] h-full overflow-auto rounded-md flex  justify-center items-center shadow-2xl p-3  gap-5 flex-row`}
          >
            <div className="sm:w-1/2  w-full h-full flex flex-col justify-center items-center p-3 md:p-8  gap-5">
              <div className="w-full  flex flex-col justify-center  items-start">
                <span className="text-4xl font-bold text-gray-600">EnCode</span>
                <span className="text-2xl font-bold text-primary">
                  Learning
                </span>
              </div>
              <div className="w-full  flex flex-col justify-center gap-2  items-center">
                <span className="text-md font-medium text-black">
                  Welcome {user.username}!
                </span>
                <span className="text-xs font-normal text-gray-600">
                  As a coding tutor on our platform, you have access to powerful
                  tools and resources to deliver an exceptional coding learning
                  experience for your students.
                </span>
              </div>
              <div className="flex justify-center items-center w-full h-fit">
                <button className="btn-class min-w-[250px]">
                  Start session
                </button>
              </div>
            </div>
            <div className="justify-center  items-center   text-center hidden md:flex flex-col sm:w-1/2 relative">
              <img
                src={sideImg}
                className="w-full max-h-full"
                alt="student-home-page-vector"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorHomePage;
