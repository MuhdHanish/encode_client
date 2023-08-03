import React, { useState , useCallback, useEffect} from 'react'
import { Course } from '../../../../dtos/Course'
import { getTutorCourse } from '../../../../utils/courseUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { LuImagePlus } from "react-icons/lu";
import { User } from '../../../../dtos/User';

const AddTutorial: React.FC = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const user: User | null = useSelector((state: RootState) => state.userReducer.user);
  const userId = user?._id;
    const fetchCourses = useCallback(() => {
      getTutorCourse(userId as string)
        .then((res) => {
          setCourses(res as Course[]);
        })
        .catch((err) => console.log(err));
    }, [userId]);
    useEffect(() => {
      fetchCourses();
    }, [fetchCourses]);
  return (
    <div className="bg-white w-full  h-full flex justify-center items-center overflow-hidden relative ">
      <div className="w-full  h-full p-5 overflow-hidden">
        <div className="w-full  h-full   flex flex-col sm:flex-row  overflow-scroll justify-start items-start gap-3">
          {courses?.map((course, idx) => (
            <div
              key={idx}
              className="flex w-fit h-fit whitespace-normal  border justify-start items-start  flex-col  gap-3 border-dashed border-gray-500 shadow-md p-3 rounded-md"
            >
              <div className="flex flex-wrap justify-center items-center">
                {course.coursename}
              </div>
              <div className="flex flex-wrap justify-center items-center text-[12px] gap-2">
                <span>{course.language}</span>|<span>{course.level}</span>|
                <span>{course.tutorial?.length} tutorials</span>
              </div>
              <div className="flex flex-wrap justify-center items-center text-[12px]">
                {course.description}
              </div>
              <div className="flex  w-full h-fit   justify-end text-[13px]">
                <button className="flex gap-3 border p-2 rounded-md   transition duration-500 hover:scale-105">
                  <span>Add tutorial</span>
                  <span>
                    <LuImagePlus style={{ fontSize: "20px " }} />
                  </span>
                </button>
              </div>
            </div>
          ))}
          {/* <div className="flex w-full h-full sm:w-1/2 sm:h-2/3 bg-red-500 rounded-lg shadow-lg">

          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AddTutorial