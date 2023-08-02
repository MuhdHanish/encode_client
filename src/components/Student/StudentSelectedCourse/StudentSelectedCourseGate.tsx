import React, { useState, useCallback, useEffect } from "react";
import { getSelectedCourse } from "../../../utils/courseUtils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Course } from "../../../dtos/Course";
import { AiOutlinePauseCircle, AiOutlineLock } from "react-icons/ai";
import FirstBox from "./FirstBox/FirstBox";
import CourseDetails from "./CourseDetails/CourseDetails";
import VideoPlayer from "./VideoPleyar";

const StudentSelectedCourseGate: React.FC = () => {
  const dispatch = useDispatch();
  const [course, setSelectedCourse] = useState<Course | null>(null);
  const selectedCourseId = useSelector(
    (state: RootState) => state.userReducer.selectedCourseId
  );
  const setCourseDetails = useCallback(() => {
    getSelectedCourse(selectedCourseId as string)
      .then((res) => {
        setSelectedCourse(res as Course);
      })
      .catch((err) => console.log(err));
  }, [selectedCourseId]);
  useEffect(() => {
    setCourseDetails();
  }, [setCourseDetails, dispatch]);

  

  return (
    <div className="bg-white w-full h-full flex justify-center items-center overflow-hidden">
      <div className="flex w-full h-full flex-col overflow-y-scroll">
        <div className="flex flex-col md:flex-row justify-center items-center w-full h-fit">
          <div className="flex w-full md:w-1/2 justify-center items-center p-5 md:p-10 h-fit">
            {course?.videos && <VideoPlayer url={course.videos[0]} />}
          </div>
          <div className="flex w-full md:w-1/2 justify-center items-center p-10 h-fit">
            <CourseDetails course={course as Course} />
          </div>
        </div>
        <div className="flex w-full flex-col lg:flex-row h-fit p-10 gap-5">
          <div className="flex flex-col justify-start items-center w-full lg:w-1/2  h-full  gap-3 text-medium ">
            <div className="flex justify-start items-center text-[16px] text-black  text-shadow-black">
              Lession in this class
            </div>
            <div className="flex flex-col gap-7 w-full h-full justify-center px-10  ">
              <div className="flex w-full h-fit p-3   justify-start px-10 items-center bg-slate-100 gap-5 rounded  border text-black shadow-md">
                <button>
                  <AiOutlinePauseCircle style={{ fontSize: "20px" }} />
                </button>
                <span className="text-[13px] text-shadow-black">
                  Course Overview
                </span>
              </div>
            </div>
            {
              course?.videos?.map((video,idx) => (
              <div className="flex flex-col gap-7 w-full h-full justify-center px-10  " key={idx}>
              <div className="flex w-full h-fit p-3   justify-start px-10 items-center gap-5 rounded  border text-black shadow-md">
                <button>
                  <AiOutlineLock style={{ fontSize: "20px" }} />
                </button>
                <span className="text-[13px] text-shadow-black">
                      {video[0]}
                </span>
              </div>
            </div>
              ))
            }
          </div>
          <FirstBox course={course as Course} />
        </div>
      </div>
    </div>
  );
};

export default StudentSelectedCourseGate;
