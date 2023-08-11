import React, { useState , useCallback, useEffect} from 'react'
import { Course } from '../../../../../dtos/Course'
import { getTutorCourse } from '../../../../../utils/courseUtils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { TbEdit } from "react-icons/tb";
import { User } from '../../../../../dtos/User';
import EditCourseModal from './EditCourseModal';
import { useNavigate } from 'react-router-dom';
import { setSelectedCourse } from '../../../../../redux/userSlice/userSlice';

const EditCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user: User | null = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();
  const userId = user?._id;
    const fetchCourses = useCallback(() => {
      getTutorCourse(userId as string)
        .then((res) => {
          setCourses(res as Course[]);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [userId]);
    useEffect(() => {
      fetchCourses();
    }, [fetchCourses]);
  const navigate = useNavigate();
  return (
    <div className="bg-white w-full  h-full flex justify-center items-center overflow-hidden relative ">
      <div className="w-full  h-full p-5 overflow-hidden  overflow-y-scroll">
        <div className="w-full h-fit  grid grid-cols-1 lg:grid-cols-2 justify-start items-start gap-3">
          {courses?.map((course, idx) => (
            <div
              key={idx}
              className="flex h-fit whitespace-normal  border justify-between items-start  flex-col  gap-3   p-3 "
            >
              <div
                className="flex flex-wrap justify-center items-center cursor-pointer"
                onClick={() => {
                  dispatch(setSelectedCourse(course)),
                    navigate(`/tutor/selected/course/${course?._id as string}`);
                }}
              >
                {course.coursename}
              </div>
              <div
                className="flex flex-wrap justify-center items-center text-[12px] gap-2 cursor-pointer"
                onClick={() => {
                  dispatch(setSelectedCourse(course)),
                    navigate(`/tutor/selected/course/${course?._id as string}`);
                }}
              >
                <span>{course.language}</span>|<span>{course.level}</span>|
                {course.chapters?.length && course.chapters.length === 1 ? (
                  <span>{course.chapters?.length} chapter</span>
                ) : (
                  <span>{course.chapters?.length} chapters</span>
                )}
              </div>
              <div
                className="flex flex-wrap justify-center items-center text-[12px] cursor-pointer"
                onClick={() => {
                  dispatch(setSelectedCourse(course)),
                    navigate(`/tutor/selected/course/${course?._id as string}`);
                }}
              >
                {course.description}
              </div>
              <div className="flex  w-full h-fit   justify-end text-[13px]">
                <div className="flex bg-[#c9c9c8] rounded-md">
                  <button
                    className="flex gap-3 border p-2 translate-x-1 -translate-y-1 hover:translate-x-0 hover:-translate-y-0 shadow-2xl border-slate-200 bg-white rounded-md   transition duration-500 "
                    onClick={() => {
                      dispatch(setSelectedCourse(course)), setIsOpen(true);
                    }}
                  >
                    <span>Edit</span>
                    <span>
                      <TbEdit style={{ fontSize: "16px " }} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpen && <EditCourseModal setIsOpen={setIsOpen} />}
    </div>
  );
}

export default EditCourse