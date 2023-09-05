import React, { useState } from 'react'
import { Course } from '../../../../dtos/Course'
import { BsArrowRightShort } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCourse } from '../../../../redux/userSlice/userSlice';

interface SideCardProps {
  course: Course
  handleRemoveStudent: (courseId:string) => void;
}

const SideCard: React.FC<SideCardProps> = ({ course , handleRemoveStudent}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex justify-between w-full h-fit items-center border p-3 gap-3 hover:border-primary cursor-pointer relative" onMouseLeave={()=>setIsOpen(false)}>
        <div className="flex w-fit h-fit flex-col ">
          <div className="flex w-fit h-fit text-[14px] font-medium">
            {course.coursename}
          </div>
          <div className="flex w-fit h-fit text-[12px]">
            <span>{course.chapters?.length} chapters</span>
            {course.rating ? <span>| {course.rating}</span> : ""}
          </div>
          <div className="flex w-fit h-fit text-[11px]">
            {(course.description?.slice(0, 80) as string) + ". . ."}
          </div>
        </div>
        <div className="flex w-fit h-fit justify-center items-center">
          <span className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <BsArrowRightShort style={{ fontSize: "20px" }} />
          </span>
        </div>
        {isOpen && (
          <div className="w-fit h-fit absolute bottom-3 right-8 flex flex-col border rounded-md bg-white overflow-hidden shadow-md" >
            <div
              className="flex border-b p-1 text-[13px] justify-center items-center w-fit h-fit cursor-pointer hover:bg-slate-100 text-black transition duration-300 "
              onClick={() => {
                dispatch(setSelectedCourse(course));
                navigate(`/selected/course/${course?._id as string}`);
              }}
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
    </>
  );
}

export default SideCard