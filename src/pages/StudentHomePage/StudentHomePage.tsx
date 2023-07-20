import React from 'react'
import sideImg from "../../assets/home-page-images/student-home.png"
import NavBar from '../../components/NavBar/NavBar'

const StudentHomePage:React.FC = () => {
  return (
    <div className="bg-home-background bg-cover w-screen h-screen overflow-hidden ">
      <div className="flex flex-col justify-center items-center h-full">
        <NavBar isTutor={false} />
        <div className="h-full flex items-center justify-center py-7 px-5">
          <div
            className={`bg-white  w-full max-w-[80%] h-full overflow-auto rounded-md flex justify-center items-center shadow-2xl p-3  gap-5 flex-row`}
          >
            <div className="justify-center  items-center   text-center hidden md:flex flex-col sm:w-1/2 relative">
              <img
                src={sideImg}
                className="w-full max-h-full"
                alt="student-home-page-vector"
              />
            </div>
            <div
              className="sm:w-1/2  w-full h-full flex flex-col justify-center items-center">
              
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHomePage