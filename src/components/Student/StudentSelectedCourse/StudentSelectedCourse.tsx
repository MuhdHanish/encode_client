import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getSelectedCourse } from "../../../utils/courseUtils";
import { Course } from "../../../dtos/Course";

const StudentSelectedCourse: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch();
  const [course, setSelectedCourse] = useState<Course | null>(null);
  const selectedCourseId = useSelector((state: RootState) => state.userReducer.selectedCourseId);

  const setCourseDetails = useCallback(() => {
    getSelectedCourse(selectedCourseId as string)
      .then((res) => {
        setSelectedCourse(res as Course);
      })
      .catch((err) => console.log(err));
  }, [selectedCourseId]);
  useEffect(() => {
    setCourseDetails();
  }
  , [setCourseDetails,dispatch]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full h-full ">
      <div className="flex flex-col w-full justify-center items-center  h-full md:w-2/3  p-3">
        <div className="border w-full my-5 h-96 ">
          {course && (
            <video 
              ref={videoRef}
              className="w-full h-full object-cover "
              src={`${import.meta.env.VITE_BUCKET_BASE_URL as string}/${
                "course.video"
                }`}
              controls
              controlsList="nodownload"
            ></video>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full h-96 justify-center  md:w-1/3 bg-white my-5 px-5 ">
        {course && (
          <>
            <h1 className="text-xl font-semibold mb-4">{course.coursename}</h1>
            <div className="text-sm text-gray-500 mb-4">
              {course.description}
            </div>
            <div className="text-sm text-gray-500">Level: {course.level}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentSelectedCourse;
