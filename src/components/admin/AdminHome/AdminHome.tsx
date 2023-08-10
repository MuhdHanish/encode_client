import React from 'react'
import { RiRotateLockLine } from 'react-icons/ri';
import StudentCount from './UserCount/StudentCount';
import TutorCount from './UserCount/TutorCount';
import CourseCount from './CourseCount/CourseCount';
import LanguageCount from './LanguageCount/LanguageCount';

const AdminHome:React.FC = () => {
  return (
    <div className="flex flex-col w-full p-5 gap-5">
      <div className="flex w-full h-fit justify-start items-center text-2xl font-bold gap-2">
        <div>Dashboard</div>{" "}
        <span>
          <RiRotateLockLine style={{ fontSize: "20px" }} />
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StudentCount/>
        <TutorCount/>
        <CourseCount/>
        <LanguageCount/>
      </div>
    </div>
  );
}

export default AdminHome







