import React, {useState} from "react";
import { User } from "../../../dtos/User";
import { Course } from "../../../dtos/Course";

interface UserCardProps {
  user: User,
  blockUser: (id:string) => void
  unBlockUser: (id:string) => void
}

interface CourseCardProps {
  course: Course,
  listCourse: (id: string) => void
  unListCourse: (id:string) => void
}

interface LangaugeCardProps {
  language: {
    _id?: string;
    languagename?: string;
    description?: string;
  };
}

export const UsersCard:React.FC<UserCardProps> = ({user,blockUser,unBlockUser}) => {
  const [drop, setDrop] = useState<boolean>(false);

 return (
   <div className="container ">
     <div className="card2 relative ">
       {drop && (
         <div className="absolute left-0.5 top-0.5 w-fti h-fit text-[13px] border  px-2  rounded-br-md">
           {user.status ? (
             <button
               onClick={() => blockUser(user._id)}
               className="text-danger shadow-sm "
             >
               Block
             </button>
           ) : (
             <button
               onClick={() => unBlockUser(user._id)}
               className="text-green-400 shadow-sm "
             >
               Unblock
             </button>
           )}
         </div>
       )}
       <h3>{user.username}</h3>
       <p className="text-[13px] flex flex-wrap my-1">{user.email}</p>
       <div className="hit flex justify-start gap-2 text-[12px] my-1">
         <span>{user.role}</span>|
         {user.status ? (
           <span className="text-green-400">active</span>
         ) : (
           <span className="text-danger">blocked</span>
         )}
       </div>
       <div className="go-corner" onClick={() => setDrop((state) => !state)}>
         <button className="go-arrow">→</button>
       </div>
     </div>
   </div>
 );
};

export const LanguageCard:React.FC<LangaugeCardProps> = ({language}) => {

 return (
   <div className="container ">
     <div className="card2 relative ">
       <h3>{language.languagename}</h3>
       <div className="hit flex justify-start gap-2 text-[12px] my-1">
         <span>{language.description}</span>|
       </div>
       <div className="go-corner">
         <button className="go-arrow">→</button>
       </div>
     </div>
   </div>
 );
};

export const FreeCoruseCard: React.FC<CourseCardProps> = ({ course, listCourse, unListCourse }) => {
  const [drop, setDrop] = useState<boolean>(false);
  return (
    <div className="container">
      <div className="card2 relative">
        {drop && (
          <div className="absolute left-0.5 top-0.5 w-fti h-fit text-[13px] border  px-2  rounded-br-md">
            {(course.status as boolean) ? (
              <button
                onClick={() => listCourse(course?._id as string)}
                className="text-danger shadow-sm "
              >
                Mute
              </button>
            ) : (
              <button
                onClick={() => unListCourse(course?._id as string)}
                className="text-green-400 shadow-sm "
              >
                Unmute
              </button>
            )}
          </div>
        )}
        <h3>{course.coursename}</h3>
        <p className=" text-[12px] flex line-clamp-1 text-ellipsis">
          {course.description}
        </p>
        <div className="flex w-full h-fit gap-2 text-[12px]">
         { course.status=== true ? (<span className="text-green-400">Listed</span>) : (<span className="text-danger">Unlisted</span>)}
        </div>
        <div className="dimmer"></div>
        <div className="go-corner" onClick={() => setDrop((state) => !state)}>
          <button className="go-arrow">→</button>
        </div>
      </div>
    </div>
  );
};

export const PaidCoruseCard: React.FC<CourseCardProps> = ({ course, listCourse, unListCourse }) => {
  const [drop, setDrop] = useState<boolean>(false);
  return (
    <div className="container">
      <div className="card4 relative">
        {drop && (
          <div className="absolute left-0.5 top-0.5 w-fti h-fit text-[13px] border  px-2  rounded-br-md">
            {(course.status as boolean) ? (
              <button
                onClick={() => {
                  unListCourse(course?._id as string);
                }}
                className="text-danger shadow-sm "
              >
                Unlsit
              </button>
            ) : (
              <button
                onClick={() => listCourse(course?._id as string)}
                className="text-green-400 shadow-sm "
              >
                List
              </button>
            )}
          </div>
        )}
        <h3>{course.coursename}</h3>
        <p className=" text-[12px] flex line-clamp-1 text-ellipsis">
          {course.description}
        </p>
        <div className="flex w-full h-fit gap-2 text-[12px]">
          <span>{course.price}</span>|
          {course.status === true ? (
            <span className="text-green-400">Listed</span>
          ) : (
            <span className="text-danger">Unlisted</span>
          )}
          |
          { course.students?.length && (course.students?.length) > 1 ? (
            <span>{course.students?.length} student</span>
          ) : (
            <span>{course.students?.length} students</span>
          )}
        </div>
        <div className="dimmer"></div>
        <div className="go-corner" onClick={() => setDrop((state) => !state)}>
          <button className="go-arrow">→</button>
        </div>
      </div>
    </div>
  );
};

