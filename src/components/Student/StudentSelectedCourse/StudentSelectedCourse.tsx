import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getSelectedCourse } from "../../../utils/courseUtils";
import { Course } from "../../../dtos/Course";

const StudentSelectedCourse: React.FC = () => {
  const dispatch = useDispatch();
  const [course, setSelectedCourse] = useState<Course | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number >(0);
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
    <div className="flex flex-col md:flex-row justify-center items-center w-full h-full overflow-hidden bg-white">
      <div className="flex w-full h-full flex-col overflow-y-scroll">
        <div className="flex flex-col justify-center items-center w-full h-fit">
          <div className="flex w-full  justify-start items-center px-10 py-5 h-fit text-xl font-semibold ">
            {course?.coursename}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center w-full h-fit">
          <div className="flex flex-col justify-start items-center w-full md:w-2/2  px-10  mb-6 h-full">
            <div className="flex  border ">
              <video
                src={`${import.meta.env.VITE_BUCKET_BASE_URL as string}/${
                  course?.chapters?.[selectedChapter]?.url as string
                }`}
                autoPlay
                controls
                controlsList="nodownload"
              ></video>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center w-full md:w-1/2  h-fit  gap-3 text-medium "></div>
        </div>
      </div>
    </div>
  );
};

export default StudentSelectedCourse;


      {
        /* <div className="flex flex-col w-full justify-center items-center  h-full md:w-2/3  p-3"> */
      }
      {
        /* <div className="border w-full my-5 h-96 ">
          {course && (
            <video
              ref={videoRef}
              className="w-full h-full object-cover "
              src={`${
                import.meta.env.VITE_BUCKET_BASE_URL as string
              }/${"course.video"}`}
              controls
              controlsList="nodownload"
            ></video>
          )}
        </div> */
      }
      {
        /* </div> */
      }
      {
        /* <div className="flex flex-col w-full h-96 justify-center  md:w-1/3 bg-white my-5 px-5 ">
        {course && (
          <>
            <h1 className="text-xl font-semibold mb-4">{course.coursename}</h1>
            <div className="text-sm text-gray-500 mb-4">
              {course.description}
            </div>
            <div className="text-sm text-gray-500">Level: {course.level}</div>
          </>
        )}
      </div> */
      }
      {
        /* {(course?.rating as number) > 0 && (
        <div className="flex gap-2 p-2 items-center">
          <span className="text-[18px`]">{course?.rating}</span>
          <StarRating rating={course?.rating as number} />
        </div>
      )} */
      }