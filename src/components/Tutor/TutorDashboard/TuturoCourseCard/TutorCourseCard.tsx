import React,{useState} from 'react'
import { Course } from '../../../../dtos/Course';
import Options from '../Options/Options';
import { listTheCourse, unListTheCourse } from '../../../../utils/courseUtils';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';

interface TutorCourseCardProps {
  courses: Course[];
  fetchDatas: () => void;
  heading: string;
}
const TutorCourseCard: React.FC<TutorCourseCardProps> = ({ courses, fetchDatas, heading }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const unlistCourse = (id: string) => { unListTheCourse(id).then(()=>{fetchDatas()}).catch(err => console.log(err));}
  const listCourse = (id: string) =>{listTheCourse(id).then(()=>{fetchDatas()}).catch((err) => console.log(err));}
  return (
    <>
      <div className="flex  flex-col gap-3 mb-4">
        <div className="flex w-full h-fit items-center justify-start text-[14px] font-medium">
          {heading}
        </div>
        {courses.slice(0,1).map((course, idx) => (
          <div
            key={idx}
            className="flex   bg-primary hover:bg-white transition duration-300 "
          >
            <div
              className="flex w-full translate-x-1 -translate-y-1 h-full hover:translate-x-0 hover:translate-y-0 
           transition duration-300 bg-white border shadow-lg p-3 flex-col items-start justify-center gap-2 relative"
              onMouseLeave={() => setIsOpen(false)}
            >
              <div
                className="flex absolute top-1.5 right-0.5 cursor-pointer  "
                onClick={() => {
                  setIsOpen(!isOpen); 
                }}
              >
                <PiDotsThreeVerticalBold
                  style={{ fontSize: "16px", color: "black" }}
                />
              </div>
              {isOpen && (
                <Options
                  course={course}
                  listCourse={listCourse}
                  unListCourse={unlistCourse}
                />
              )}
              <div className="flex w-full h-fit flex-wrap text-[14px]">
                {course?.coursename}
              </div>
              <div className="flex w-full flex-wrap h-fit items-center gap-2 text-[12px]">
                {course?.rating} rating |{" "}
                {course?.status ? (
                  <span className="text-green-400">Listed</span>
                ) : (
                  <span className="text-danger">Unlisted</span>
                )}{" "}
                <span className="hidden sm:flex">|</span>{" "}
                {course.chapters?.length} chapters | {course.students?.length}{" "}
                students
              </div>
              <div className="flex flexw-wrap w-full   overflow-hidden text-ellipsis line-clamp-2 text-[12px]">
                {`${course?.description?.slice(0, 100) as string}...`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TutorCourseCard