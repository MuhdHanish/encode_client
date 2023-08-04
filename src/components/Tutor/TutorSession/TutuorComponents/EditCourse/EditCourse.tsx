import React, { useState , useCallback, useEffect} from 'react'
import { Course } from '../../../../../dtos/Course'
import { getTutorCourse } from '../../../../../utils/courseUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { TbEdit } from "react-icons/tb";
import { User } from '../../../../../dtos/User';
import EditCourseModal from './EditCourseModal';

const EditCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  return (
    <div className="bg-white w-full  h-full flex justify-center items-center overflow-hidden relative ">
      <div className="w-full  h-full p-5 overflow-hidden  overflow-y-scroll">
        <div className="w-full h-fit  grid grid-cols-1 lg:grid-cols-2 justify-start items-start gap-3">
          {courses?.map((course, idx) => (
            <div
              key={idx}
              className="flex h-fit whitespace-normal  border justify-between items-start  flex-col  gap-3  border-dashed border-gray-400  p-3 "
            >
              <div className="flex flex-wrap justify-center items-center">
                {course.coursename}
              </div>
              <div className="flex flex-wrap justify-center items-center text-[12px] gap-2">
                <span>{course.language}</span>|<span>{course.level}</span>|
                {course.chapters?.length && course.chapters.length === 1 ? (
                  <span>{course.chapters?.length} chapter</span>
                ) : (
                  <span>{course.chapters?.length} chapters</span>
                )}
              </div>
              <div className="flex flex-wrap justify-center items-center text-[12px] ">
                {course.description}
              </div>
              <div className="flex  w-full h-fit   justify-end text-[13px]">
                <button
                  className="flex gap-3 border p-2 border-gray-400 border-dashed   transition duration-500 hover:scale-105"
                  onClick={() => {setSelectedCourse(course),setIsOpen(true)}}
                >
                  <span>Edit</span>
                  <span>
                    <TbEdit style={{ fontSize: "20px " }} />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <EditCourseModal selectedCourse={selectedCourse as Course} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}

export default EditCourse