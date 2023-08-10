import React from 'react'
import { FaChalkboardTeacher } from 'react-icons/fa'

const TutorCount:React.FC = () => {
  return (
   <div className="flex  hover:bg-primary rounded-xl transition duration-300 ">
          <div className="flex flex-col w-full h-fit p-5 gap-3   rounded-xl bg-white shadow-lg hover:translate-y-10 transition duration-300 cursor-pointer">
            <div className="flex w-full hit justify-between gap-28   items-center">
              <div className="flex ">
                <FaChalkboardTeacher style={{
                  fontSize: "30px" }} />
              </div>
              <div className="flex justify-center items-center w-[32px] h-[32px] rounded-full border-4 p-5 font-bold border-primary">
               70
              </div>
            </div>
            <div className="flex items-baseline gap-4 text-[15px]  text-gray-400">
              <span>tutors</span>
              <span className='font-bold text-[16px] text-black'>70</span>
            </div>
          </div>
        </div>
  )
}

export default TutorCount