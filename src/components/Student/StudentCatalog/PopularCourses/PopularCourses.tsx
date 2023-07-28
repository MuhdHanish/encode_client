import React from 'react'
import { Course } from '../../../../dtos/Course';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCourseId } from '../../../../redux/userSlice/userSlice';


interface PopularCoursesProps {
  courses: Course[];
}

const PopularCourses: React.FC<PopularCoursesProps> = ({ courses }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <>
      <div className="w-full h-fit justify-start flex  px-5 ">
        <span className="flex  font-medium text-[18px]">Popular Courses</span>
      </div>
      <div className="flex flex-wrap px-5 gap-5 md:gap-10 ">
        {courses?.map((course, index) => (
          <div className="flex pl-1 hover:bg-black delay-100 border rounded border-black">
            <div
              key={index}
              onClick={() => {
                dispatch(setSelectedCourseId(course._id as string)),
                  navigate(`/course/${course._id as string}`);
              }}
              className="w-full md:w-[271px] mb-1 border-black bg-white hover:translate-x-1 hover:-translate-y-1 transition border rounded "
            >
              <div className="flex flex-col justify-between h-full p-3 gap-3">
                <div className="text-[12px] bg-purple-300 rounded-sm p-1">
                  {course.isPaid ? "Paid Course" : "Free Course"}
                </div>
                <div className="text-[15px] font-semibold p-1">
                  {course.coursename}
                </div>
                <div className="text-[11px] overflow-hidden whitespace-normal p-1">
                  {course.description}
                </div>
                <div className="text-[12px] border-t border-black border-dotted p-1">
                  {course.level}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PopularCourses