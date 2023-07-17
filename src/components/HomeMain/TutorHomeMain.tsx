import React from "react";
import TutorHomeImg from "../../assets/home-page-images/tutor-home.jpg";

const TutorHomeMain: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center">
      <div className="w-full sm:w-1/2 mt-6 sm:mt-0">
        <div className="relative">
          <img
            src={TutorHomeImg}
            className="w-[80%] h-auto rounded"
            alt="home-page-vector"
          />
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-1/2 p-10">
        <div className="text-md text-gray-500">Join Us</div>
        <div className="font-medium text-2xl md:text-2xl text-purple-500">
          Online
        </div>
        <div className="font-bold text-4xl md:text-4xl text-primary">
          Teaching
        </div>
        <div className="text-sm py-3">
         Teaching is a noble profession that involves imparting knowledge, skills, and guidance to individuals in order to help them learn and grow. As a teacher, you have the opportunity to inspire and motivate students, ignite their curiosity, and foster a love for learning
        </div>
        <div className="flex justify-center">
          <button className="bg-primary text-white text-sm hover:bg-purple-600 rounded-2xl px-4 py-1.5">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorHomeMain;
