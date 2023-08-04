import React,{useCallback} from 'react'
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
    const capitalizeFirstLetter = useCallback((text: string) => {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }, []);
  return (
    <>
      <div className="w-full h-fit justify-start flex  px-5 ">
        <span className="flex  font-medium text-[18px]">Popular Courses</span>
      </div>
      <div className="flex flex-wrap px-5 gap-5 md:gap-10 ">
        {courses?.map((course) => (
          <div
            key={course._id}
            className="flex w-full md:w-[271px]  hover:bg-black delay-100 border rounded hover:border-black"
          >
            <div
              onClick={() => {
                dispatch(setSelectedCourseId(course._id as string)),
                  navigate(`/course/${course._id as string}`);
              }}
              className="w-full md:w-[271px]  border-black bg-white hover:translate-x-1 hover:-translate-y-1 transition border rounded "
            >
              <div className="flex  flex-col justify-between h-full p-3 gap-2">
                <div className="text-[12px] bg-purple-300 rounded-sm p-1">
                  {course.isPaid ? "Paid Course" : "Free Course"}
                </div>
                <div className="text-[15px] font-semibold p-1">
                  {course.coursename}
                </div>
                <div className="text-[11px] overflow-hidden whitespace-normal p-1 line-clamp-3 text-gray-500">
                  {course.description}
                </div>
                <div className="text-[12px] border-t border-gray-500 border-dotted p-1 flex justify-between items-center gap-2 text-gray-500">
                  <span>{course.language}</span>
                  {(course.rating as number) > 0 && (
                    <div className="flex gap-2">
                      <span>{course.rating}</span>
                      <span>Rating</span>
                    </div>
                  )}
                </div>
                <div className="text-[12px] border-t border-gray-500 border-dotted p-1 flex items-center gap-2 justify-between text-gray-500">
                  <span>{capitalizeFirstLetter(course?.level as string)}</span>
                  {(course.chapters?.length as number) > 0 && (
                    <span>
                      {course.chapters?.length}{" "}
                      {course.chapters?.length === 1 ? "Chapter" : "Chapters"}
                    </span>
                  )}
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