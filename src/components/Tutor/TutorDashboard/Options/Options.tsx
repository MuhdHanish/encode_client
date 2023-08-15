import React from 'react'
import { Course } from '../../../../dtos/Course';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCourse } from '../../../../redux/userSlice/userSlice';

interface OptionsProps {
  course: Course;
  listCourse: (id: string) => void;
  unListCourse: (id: string) => void;
}

const Options: React.FC<OptionsProps> = ({ course, listCourse, unListCourse }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <div className="flex absolute  top-5 right-7  h-fit border bg-white shadow-xl rounded-lg overflow-hidden flex-col text-[13px] cursor-pointer">
      <div className="flex w-full h-fit justify-start items-center border-b hover:bg-green-100 transition duration-300 px-2 py-1"
      onClick={()=>{dispatch(setSelectedCourse(course));  navigate(`/tutor/selected/course/${course?._id as string}`) }}
      >
        view course
      </div>
      {course.status ? (
        <div className="flex w-full h-fit text-danger  justify-start items-center hover:bg-red-100 transition duration-300  px-2 py-1" onClick={()=>unListCourse(course?._id as string)}>
          unlist
        </div>
      ) : (
        <div className="flex w-full h-fit text-green-400 justify-start items-center hover:bg-green-100 transition duration-300  px-2 py-1"  onClick={()=>listCourse(course?._id as string)}>
          list
        </div>
      )}
    </div>
  );
};

export default Options