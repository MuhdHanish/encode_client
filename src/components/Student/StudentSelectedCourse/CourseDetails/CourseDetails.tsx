import React from 'react'
import { Course } from '../../../../dtos/Course'
import { GoLock } from "react-icons/go";
import StarRating from "../../../Common/StarRating/StarRating";

interface CourseDetailsProps {
  course:Course
}

const CourseDetails:React.FC<CourseDetailsProps> = ({course}) => {
  return (
    <>
      <div className="flex flex-col w-full h-fit gap-2  bg-white border shadow-lg p-5 text-medium">
        <div className="flex w-full h-fit justify-start items-center p-2">
          <span className="flex gap-2 text-[14px]">
            {course?.isPaid ? (
              <span className="bg-primary rounded-full text-white text-shadow-black px-2">
                Paid
              </span>
            ) : (
              <span className="bg-primary rounded-full text-white text-shadow-black px-2">
                Free
              </span>
            )}
            <span className="text-shadow-black ">Course</span>
          </span>
        </div>
        <div className="flex w-full h-fit justify-start items-center p-2">
          <div className="flex flex-wrap w-fit h-fit text-2xl font-semibold">
            {course?.coursename}
          </div>
        </div>
        <div className="flex w-full  sm:w-1/2 h-fit justify-start items-center p-2">
          <div className="flex flex-wrap w-fit h-fit text-md font-normal">
            {course?.description}
          </div>
        </div>
        {(course?.rating as number) > 0 && (
          <div className="flex gap-2 p-2 items-center">
            <span className="text-[18px`]">{course?.rating}</span>
            <StarRating rating={course?.rating as number} />
          </div>
        )}
        <div className="flex w-full  sm:w-1/2 h-fit justify-start items-center p-2">
          <div className="flex flex-wrap w-fit h-fit text-md font-normal">
            {(course?.price as number) > 0 ? (
              <div>
                <button className="btn-class min-w-[250px]  flex items-center justify-center gap-2">
                  <span className="text-shadow-black">
                    <GoLock />
                  </span>
                  <span>Purchase & Start</span>
                </button>
              </div>
            ) : (
              <div>
                <button className="btn-class min-w-[250px]  flex items-center justify-center gap-2">
                  <span>Start</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetails