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
import noProgressImage from "../../../../../assets/progressPage/progressPage.png";
import { PiShootingStarLight } from 'react-icons/pi';
import Loader from '../../../../Common/Loader/Loader';

const EditCourse: React.FC = () => {
  const [courses, setCourses] = useState<Course[] | []>([]);
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
    const [loading, setLoading] = useState<boolean>(true);
    setTimeout(() => {
      setLoading(false);
    }, 60);
  const navigate = useNavigate();
  return (
    <div className="bg-white w-full  h-full flex justify-center items-center overflow-hidden relative ">
      {loading && <Loader />}
      {!loading && courses?.length > 0 && (
        <>
          <div className="w-full  h-full p-5 overflow-hidden  overflow-y-scroll">
            <div className="w-full h-fit  grid grid-cols-1 lg:grid-cols-2 justify-start items-start gap-3">
              {courses?.length &&
                courses?.map((course, idx) => (
                  <div
                    key={idx}
                    className="flex h-fit whitespace-normal  border justify-between items-start  flex-col  gap-3   p-3 "
                  >
                    <div
                      className="flex flex-wrap justify-center items-center cursor-pointer"
                      onClick={() => {
                        dispatch(setSelectedCourse(course)),
                          navigate(
                            `/tutor/selected/course/${course?._id as string}`
                          );
                      }}
                    >
                      {course.coursename}
                    </div>
                    <div
                      className="flex flex-wrap justify-center items-center text-[12px] gap-2 cursor-pointer"
                      onClick={() => {
                        dispatch(setSelectedCourse(course)),
                          navigate(
                            `/tutor/selected/course/${course?._id as string}`
                          );
                      }}
                    >
                      <span>{course.language}</span>|<span>{course.level}</span>
                      |
                      {course.chapters?.length &&
                        course.chapters.length === 1 ? (
                        <span>{course.chapters?.length} chapter</span>
                      ) : (
                        <span>{course.chapters?.length} chapters</span>
                      )}
                    </div>
                    <div
                      className="flex flex-wrap justify-center items-center text-[12px] cursor-pointer"
                      onClick={() => {
                        dispatch(setSelectedCourse(course)),
                          navigate(
                            `/tutor/selected/course/${course?._id as string}`
                          );
                      }}
                    >
                      {course.description}
                    </div>
                    <div className="flex  w-full h-fit   justify-end text-[13px]">
                      <button
                        className="flex gap-3 border p-2  shadow-2xl border-slate-200 bg-white "
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
                ))}
            </div>
          </div>
        </>
      )}{ !loading && courses?.length < 0 && (
        <>
          <div className="flex w-full flex-col md:flex-row h-screen justify-center items-center  p-5 overflow-hidden">
            <div className="flex w-full h-full justify-center items-center flex-col">
              <span className="flex w-fit h-fit font-bold text-3xl">
                No Course Found !
              </span>
              <span className="text-gray-500 font-normal text-sm flex gap-1 items-center ">
                start course, start grow{" "}
                <span className="text-primary">
                  <PiShootingStarLight />
                </span>
              </span>
            </div>
            <div className="flex w-full  h-full justify-center items-center">
              <img src={noProgressImage} className="" alt="" />
            </div>
          </div>
        </>
      )}
      {isOpen && <EditCourseModal setIsOpen={setIsOpen} />}
    </div>
  );
}

export default EditCourse