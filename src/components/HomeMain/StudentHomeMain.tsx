import React from "react";
import studentHomeImg from "../../assets/home-page-images/student-home.jpg";

const HomeMain: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center">
      <div className="flex flex-col w-full sm:w-1/2 p-10">
        <div className="text-md text-gray-500">Join Us</div>
        <div className="font-medium text-2xl md:text-2xl text-purple-500">
          Online
        </div>
        <div className="font-bold text-4xl md:text-4xl text-primary">
          Education
        </div>
        <div className="text-sm py-3">
          Online education offers the flexibility and convenience of learning
          anytime and anywhere. With access to a vast array of courses and
          resources, you can expand your knowledge, acquire new skills, and
          pursue your educational goals from the comfort of your own home.
        </div>
        <div className="flex justify-center">
          <button className="bg-primary text-white text-sm hover:bg-purple-600 rounded-2xl px-4 py-1.5">
            Explore
          </button>
        </div>
      </div>
      <div className="w-full sm:w-1/2 mt-6 sm:mt-0">
        <div className="relative">
          <img
            src={studentHomeImg}
            className="w-[80%] h-auto rounded"
            alt="home-page-vector"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeMain;

