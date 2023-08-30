import { useNavigate } from "react-router-dom";
import React from "react";
import MainImageFrame from "../../Common/MainImageFrame/MainImageFrame";
import sideImg from "../../../assets/home-page-images/student-home.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (
    <>
      <div className="w-full h-full flex justify-center  items-center py-7 px-5  overflow-auto">
        <div
          className={`bg-white  w-full max-w-[80%]  h-full overflow-auto rounded-md 
        flex justify-center items-center shadow-xl p-3 gap-5 flex-row}`}
        >
          <MainImageFrame imgSrc={sideImg} alt={"student-home-image"} />
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
                In the digital age, online learning has revolutionized
                education, particularly in the realm of programming and computer
                science. With the increasing demand for technical skills, online
                platforms have emerged as valuable resources for learners of all
                levels.
              </span>
            </div>
            <div className="flex justify-center items-center w-full h-fit">
              <button
                className="btn-class min-w-[200px]"
                onClick={() => {
                  navigate("/progress");
                }}
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentHome;
