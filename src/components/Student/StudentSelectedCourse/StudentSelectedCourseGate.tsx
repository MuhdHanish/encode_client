import React, { useState, useCallback, useEffect } from 'react';
import { getSelectedCourse } from '../../../utils/courseUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Course } from '../../../dtos/Course';
import { GoLock } from "react-icons/go";
import { SiOpslevel } from "react-icons/si";
import { MdMilitaryTech } from "react-icons/md";
import { BsPersonVideo2 } from "react-icons/bs";
import StarRating from '../../Common/StarRating/StarRating';

const StudentSelectedCourseGate: React.FC = () => {

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
    <div className="bg-white w-full  h-full flex justify-center items-center overflow-x-hidden overflow-y-scroll  relative ">
      <div className="w-full h-full flex flex-col gap-7 p-10 md:p-20 justify-center items-center">
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
        <div className="flex  justify-around items-center w-full   h-fit gap-10  bg-white border  shadow-lg p-7 text-medium">
          <div className="w-fit h-fit flex  ">
            <div className="flex justify-center items-center gap-2">
              <span>
                <SiOpslevel style={{ fontSize: "20px" }} />
              </span>
              <div className="font-semibold flex flex-col justify-center items-center">
                <span className="font-normal text-[12px]">Skill level</span>
                <span>{course?.level}</span>
              </div>
            </div>
          </div>
          <div className="w-fit h-fit flex ">
            <div className="flex justify-center items-center gap-2">
              <span>
                <BsPersonVideo2 style={{ fontSize: "20px" }} />
              </span>
              <div className="font-semibold flex flex-col justify-center items-center ">
                <span className="font-normal text-[12px]">Duration</span>
                <span>{course?.videos?.length} videos</span>
              </div>
            </div>
          </div>
          <div className="w-fit h-fit flex ">
            <div className="flex justify-center items-center gap-2">
              <span>
                <MdMilitaryTech style={{ fontSize: "22px" }} />
              </span>
              <div className="font-semibold flex flex-col justify-center items-center ">
                <span className="font-normal text-[12px]">Language</span>
                <span>{course?.language}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSelectedCourseGate