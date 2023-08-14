import React, { useCallback, useState, useEffect } from 'react'
import { PiRocketLaunchLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../../dtos/Course';
import { getCourseOfStudents } from '../../../utils/courseUtils';

const StudentProgress: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[] | []>([]);
  const fetchDatas = useCallback(() => {
    getCourseOfStudents().then((res) => setCourses(res as Course[])).catch(err => console.log(err));
  }, []);
  useEffect(() => {
    fetchDatas();
  }, [fetchDatas])
  console.log(courses)
  return (
    <div className="bg-white flex flex-col w-full h-full p-5 gap-10 overflow-x-hidden ">
      <div className="flex w-full h-fit justify-between items-center ">
        <div className='flex flex-col justify-start items-start'>
          <span className='font-bold text-2xl'>Learn New Skills</span>
          <span className='text-[13px] text-gray-400 '>Simple price, unlimited skills</span>
        </div>
        <div className="flex w-fit h-fit p-2 bg-primary text-white font-medium gap-2 items-center justify-center cursor-pointer" onClick={()=> navigate("/catalog")}>
            <span>Explore</span>
            <span><PiRocketLaunchLight style={{color:"white", fontSize:"15px"}} /></span>
        </div>
      </div>
      <div className="grid grid-col-2 md:grid-cols-4 gap-3 border">
        <div className="flex w-full h-fit border border-white hover:border-primary">
          <div className="flex w-full h-fit"></div>
          <div className="flex w-full h-fit p-5 items-center justify-start">

          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProgress