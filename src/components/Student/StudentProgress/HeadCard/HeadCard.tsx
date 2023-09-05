import React, { useState } from 'react'
import { Course } from '../../../../dtos/Course';
import { BsArrowRightShort } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCourse } from '../../../../redux/userSlice/userSlice';

interface HeadCardProps {
  course: Course;
  handleRemoveStudent: (courseId: string) => void;
}

const HeadCard: React.FC<HeadCardProps> = ({ course , handleRemoveStudent}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-fit  min-w-[250px] border hover:border-primary cursor-pointer hover:bg-primary hover:text-white transition duration-300 bg-slate-200 relative" onMouseLeave={()=>setIsOpen(false)}>
      <div className="flex flex-col p-3 w-full h-fit bg-white text-black gap-3">
        <div className="flex  h-fit font-medium text-[14px]">
          {course.coursename}
        </div>
        <div className="flex  h-fit font-medium text-[11px]">
          {(course.description?.slice(0, 100) as string) + "..."}
        </div>
        <div className="flex w-full h-fit font-medium text-[11px] gap-2">
          <span>{course.language}</span> |
          <span> {course.chapters?.length} chapters</span>
        </div>
      </div>
      <div className="flex  h-fit p-2  text-[13px]  items-center gap-5 justify-between bg-transparent text-shadow-black">
        <span>More</span>
        <span onClick={() => setIsOpen(!isOpen)}>
          <BsArrowRightShort style={{ fontSize: "20px" }} />
        </span>
      </div>
      {isOpen && (
        <div className="w-fit h-fit absolute bottom-3 right-8 flex flex-col border rounded-md bg-white overflow-hidden shadow-md" >
          <div
            className="flex border-b p-1 text-[13px] justify-center items-center w-fit h-fit cursor-pointer hover:bg-slate-100 text-black transition duration-300 "
            onClick={() => {
              dispatch(setSelectedCourse(course));
              navigate(`/selected/course/${course?._id as string}`);}}
          >
            view course
          </div>
          <div
            className="flex  p-1 text-[13px] justify-start items-center  h-fit cursor-pointer hover:bg-red-100 text-black transition duration-300 w-full"
            onClick={()=>{handleRemoveStudent(course?._id as string)}}
          >
              remove
          </div>
        </div>
      )}
    </div>
  );
}

export default HeadCard