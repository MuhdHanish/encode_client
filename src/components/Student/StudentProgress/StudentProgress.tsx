import React, { useCallback, useState, useEffect } from 'react'
import { PiRocketLaunchLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../../dtos/Course';
import { getCourseOfStudents, removeStudent } from '../../../utils/courseUtils';
import Pagination from '../../Common/Pagination/Pagination';
import SideCard from './SideCard/SideCard';
import HeadCard from './HeadCard/HeadCard';

const StudentProgress: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[] | []>([]);
  const fetchDatas = useCallback(() => {
    getCourseOfStudents().then((res) => setCourses(res as Course[])).catch(err => console.log(err));
  }, []);
  useEffect(() => {
    fetchDatas();
  }, [fetchDatas])

  const [currentPage, setCurrentPage] = useState<number>(1);
  const postPerPage = 4;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const [currentPosts, setCurrentPosts] = useState<Course[] | []>([]);

  const handleRemoveStudent = (courseId: string) => { removeStudent(courseId).then((res) => { if (res) { fetchDatas() } }).catch(err => console.error(err)) };

  useEffect(() => {
    setCurrentPosts(courses.slice(firstPostIndex, lastPostIndex));
  }, [courses, firstPostIndex, lastPostIndex]);
  
  return (
    <div className="bg-white flex flex-col w-full h-full p-5 gap-10 overflow-x-hidden ">
      <div className="flex w-full h-fit justify-between items-center ">
        <div className="flex flex-col justify-start items-start">
          <span className="font-bold text-2xl">Learn New Skills</span>
          <span className="text-[13px] text-gray-400 ">
            Simple price, unlimited skills
          </span>
        </div>
        <div
          className="flex w-fit h-fit py-2 bg-primary text-shadow-black text-[14px] text-white px-4 gap-2 items-center justify-center cursor-pointer"
          onClick={() => navigate("/catalog")}
        >
          <span>Explore More</span>
          <span>
            <PiRocketLaunchLight style={{ color: "white", fontSize: "15px" }} />
          </span>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 ">
        {courses?.slice(0, 4)?.map((course, idx) => (
         <HeadCard course={course} key={idx} handleRemoveStudent={handleRemoveStudent}/>
        ))}
      </div>
      <div className="flex w-full h-fit md:flex-row flex-col gap-5">
        <div className="flex flex-col md:w-1/2 p-5 gap-5  justify-start items-center">
          {currentPosts?.map((course, idx) => (
              <SideCard course={course} key={idx} handleRemoveStudent={handleRemoveStudent}/>
          ))}
          {courses.length > postPerPage && (
            <div className="flex w-full p-5 justify-end items-end ">
              <Pagination
                postsPerPage={postPerPage}
                totalPosts={courses?.length}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentProgress