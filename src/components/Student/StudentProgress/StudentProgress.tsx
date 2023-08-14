import React, { useCallback, useState, useEffect } from 'react'
import { PiRocketLaunchLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { Course } from '../../../dtos/Course';
import { getCourseOfStudents } from '../../../utils/courseUtils';
import { BsArrowRightShort } from 'react-icons/bs';
import Pagination from '../../Common/Pagination/Pagination';

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
          <div
            key={idx}
            className="flex flex-col h-fit  min-w-[250px] border hover:border-primary cursor-pointer hover:bg-primary hover:text-white transition duration-300 bg-slate-200"
          >
            <div className="flex flex-col p-3 w-full h-fit bg-white text-black gap-3">
              <div className="flex  h-fit font-medium text-[14px]">
                {course.coursename}
              </div>
              <div className="flex  h-fit font-medium text-[11px]">
                {(course.description?.slice(0, 100) as string) + "..."}
              </div>
              <div className="flex w-full h-fit font-medium text-[11px] gap-2">
                <span>{course.language}</span> |
                <span> {course.chapters?.length} chapters</span>
              </div>
            </div>
            <div className="flex  h-fit p-2  text-[13px]  items-center gap-5 justify-between bg-transparent text-shadow-black">
              <span>Remove</span>
              <span>
                <BsArrowRightShort style={{ fontSize: "20px" }} />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full h-fit md:flex-row flex-col gap-5">
        <div className="flex flex-col md:w-1/2 p-5 gap-5  justify-start items-center">
          {currentPosts?.map((course, idx) => (
            <div
              key={idx}
              className="flex justify-between w-full h-fit items-center border p-3 gap-3 hover:border-primary"
            >
              <div className="flex w-fit h-fit flex-col ">
                <div className="flex w-fit h-fit text-[14px] font-medium">
                  {course.coursename}
                </div>
                <div className="flex w-fit h-fit text-[12px]">
                  <span>{course.chapters?.length} chapters</span>
                  {course.rating ? <span>| {course.rating}</span> : ""}
                </div>
                <div className="flex w-fit h-fit text-[11px]">
                  {(course.description?.slice(0, 80) as string) + ". . ."}
                </div>
              </div>
              <div className="flex w-fit h-fit justify-center items-center">
                <span className="cursor-pointer">
                  <BsArrowRightShort style={{ fontSize: "20px" }} />
                </span>
              </div>
            </div>
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