import React,{useState} from 'react'
import { Course } from '../../../../dtos/Course';
import Options from '../Options/Options';
import { listTheCourse, unListTheCourse } from '../../../../utils/courseUtils';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';

interface TutorCourseCardProps {
  courses: Course[];
  fetchDatas: () => void;
  heading: string;
  setIsStudentOpen: (value: boolean) => void;
  setStudentsList: (value: string) => void;
}
const TutorCourseCard: React.FC<TutorCourseCardProps> = ({ courses, fetchDatas, heading, setIsStudentOpen, setStudentsList }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const unlistCourse = (id: string) => { unListTheCourse(id).then(()=>{fetchDatas()}).catch(err => console.log(err));}
  const listCourse = (id: string) =>{listTheCourse(id).then(()=>{fetchDatas()}).catch((err) => console.log(err));}
  return (
    <>
      <div className="flex  flex-col gap-3 mb-4">
        <div className="flex w-full h-fit items-center justify-start text-[14px] font-medium">
          {heading}
        </div>
        {courses.map((course, idx) => (
          <div
            key={idx}
            className="flex  rounded-xl bg-primary hover:bg-white transition duration-300 "
          >
            <div
              className="flex w-full translate-x-1 -translate-y-1 h-full hover:translate-x-0 hover:translate-y-0 
           transition duration-300 bg-white border rounded-xl p-3 flex-col items-start justify-center gap-2 relative"
              onMouseLeave={() => setIsOpen(false)}
            >
              <div
                className="flex absolute top-1 right-1 cursor-pointer bg-primary rounded-full p-0.5"
                onClick={() => {
                  setIsOpen(!isOpen); setStudentsList(course._id as string)
                }}
              >
                <PiDotsThreeVerticalBold
                  style={{ fontSize: "16px", color: "white" }}
                />
              </div>
              {isOpen && (
                <Options
                  course={course}
                  listCourse={listCourse}
                  unListCourse={unlistCourse}
                  setIsStudentOpen={setIsStudentOpen}
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