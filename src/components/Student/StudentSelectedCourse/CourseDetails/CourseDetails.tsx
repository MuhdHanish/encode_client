import React,{useState,useEffect} from 'react'
import { Course } from '../../../../dtos/Course'
import { GoLock } from "react-icons/go";
import StarRating from "../../../Common/StarRating/StarRating";
import { User } from "../../../../dtos/User";
import { useNavigate } from 'react-router-dom';
import PayPal from '../../../PayPal/PayPal';
import { setCourse } from '../../../../utils/courseUtils';

interface CourseDetailsProps {
  course:Course
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  const [tutor, setTutor] = useState<User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    setTutor(course?.tutor as User);
  }, [course]);
  const handleCourseAdd = async () => {
    const courseDetails = await setCourse(course?._id as string);
    if (courseDetails) {
      navigate(`/selected/course/${course?._id as string}`, {
        replace: true,
      });
    }
  }
  return (
    <>
      <div className="flex flex-col border w-full md:w-2/3 h-fit p-10 gap-3 ">
        <div className="flex w-full h-fit justify-start items-center ">
          <span className="flex gap-2 text-[13px]">
            {course?.isPaid ? (
              <span className="bg-primary rounded-md text-white text-shadow-black px-2">
                Paid
              </span>
            ) : (
              <span className="bg-primary rounded-md text-white text-shadow-black px-2">
                Free
              </span>
            )}
            <span className="text-shadow-black ">Course</span>
          </span>
        </div>

        <div className="flex w-full h-fit justify-start items-centser ">
          <div className="flex flex-wrap w-fit h-fit text-2xl font-semibold">
            {course?.coursename}
          </div>
        </div>

        <div className="flex w-full  h-fit justify-start items-center ">
          <div className="flex flex-wrap w-full  h-fit text-md font-normal text-[14px]">
            {course?.description}
          </div>
        </div>

        <div className="flex flex-col items-center justify-start w-full ">
          <div className="w-full flex gap-2 items-center">
            <div className="flex p-2 ">
              <img
                src={tutor?.profile}
                alt="tutor-profile"
                className="w-7 h-7 rounded-sm"
              />
            </div>
            <div className="flex">
              <span className="flex flex-wrap text-[14px]">
                {tutor?.username}
              </span>
            </div>
          </div>
          <div className="w-full">
            {(course?.rating as number) > 0 && (
              <div className="flex gap-2 p-2 items-center w-full">
                <span className="text-[14px]">{course?.rating}</span>
                <StarRating rating={course?.rating as number} />
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full  sm:w-1/2 h-fit justify-start items-center ">
          <div className="flex flex-wrap w-fit h-fit text-md font-normal">
            {(course?.price as number) > 0 ? (
              <div className="flex flex-col gap-2">
                <button className="btn-class min-w-[250px]  flex items-center justify-center gap-2">
                  <span className="text-shadow-black">
                    <GoLock />
                  </span>
                  <span>Purchase & Start</span>
                </button>
                <PayPal course={course} handleAddcourse={handleCourseAdd} />
              </div>
            ) : (
              <div>
                <button
                  className="btn-class min-w-[250px]  flex items-center justify-center gap-2"
                  onClick={() => handleCourseAdd}
                >
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