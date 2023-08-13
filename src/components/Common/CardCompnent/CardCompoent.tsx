import React, {useState} from "react";
import { User } from "../../../dtos/User";
import { Course } from "../../../dtos/Course";
import { BsArrowRightShort } from "react-icons/bs";
import { Language } from "../../../dtos/Language";

interface UserCardProps {
  user: User,
  blockUser: (id:string) => void
  unBlockUser: (id:string) => void
}

interface CourseCardProps {
  course: Course,
}

interface LangaugeCardProps {
  language: Language;
  list: (languageId: string) => void;
  unList: (languageId: string) => void;
}

export const UsersCard:React.FC<UserCardProps> = ({user,blockUser,unBlockUser}) => {
  const [drop, setDrop] = useState<boolean>(false);

 return (
   <div className=" relative col-span-1 h-fit rounded-xl border hover:-translate-y-0.5 hover:shadow-lg hover:border-gray-300 transition duration-300 bg-[#f2f8f9] hover:bg-white p-2">
     {drop && (
       <div className="absolute left-0 top-0 w-fit h-fit text-[13px] border-2  px-2  rounded-br-xl rounded-tl-xl border-l-transparent border-t-transparent">
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
     <div
       className="absolute right-0 bg-primary top-0 w-fit h-fit text-[13px]  border-2  px-2  rounded-bl-xl rounded-tr-xl border-transparent"
       onClick={() => setDrop((state) => !state)}
     >
       <button className=" flex justify-center items-center text-white">
         <BsArrowRightShort style={{ fontSize: "20px" }} />
       </button>
     </div>
     <div className="flex w-full h-fit flex-col flex-wrap text-ellipsis line-clamp-1 gap-1 overflow-auto px-3 pt-7 pb-2">
       <div className="flex w-full flex-wrap text-sm">
         <span>{user.username}</span>
       </div>
       <div className="flex w-full flex-wrap text-[12px]">
         <span>{user.email}</span>
       </div>
       <div className="w-full h-fit flex-wrap flex justify-start gap-2 text-[12px]">
         <span>{user.role}</span>|
         {user.status ? (
           <span className="text-green-400">active</span>
         ) : (
           <span className="text-danger">blocked</span>
         )}
       </div>
     </div>
   </div>
 );
};

export const LanguageCard: React.FC<LangaugeCardProps> = ({ language, list, unList }) => {
  const [drop, setDrop] = useState<boolean>(false);
  return (
    <div className="flex bg-[#C5C5C5] rounded-xl">
      <div className=" relative col-span-1 h-[230px] rounded-xl  overflow-hidden border -translate-y-1 translate-x-1 hover:translate-x-0 hover:translate-y-0   hover:shadow-lg hover:border-gray-300 transition duration-300 bg-[#f2f8f9] hover:bg-white p-2">
        {drop && (
          <div className="absolute left-0 top-0 w-fit h-fit text-[13px] border-2  px-2  rounded-br-xl rounded-tl-xl border-l-transparent border-t-transparent">
            {language.status ? (
              <button
                onClick={() => unList(language?._id as string)}
                className="text-danger shadow-sm "
              >
                Unlist
              </button>
            ) : (
              <button
                onClick={() => list(language?._id as string)}
                className="text-green-400 shadow-sm "
              >
                List
              </button>
            )}
          </div>
        )}
        <div
          className="absolute right-0 bg-primary top-0 w-fit h-fit text-[13px]  border-2  px-2  rounded-bl-xl rounded-tr-xl border-transparent"
          onClick={() => setDrop((state) => !state)}
        >
          <button className=" flex justify-center items-center text-white text-shadow-black">
            <BsArrowRightShort style={{ fontSize: "20px" }} />
          </button>
        </div>
        <div className="flex w-full h-fit flex-col flex-wrap  gap-3  px-3 pt-7 pb-2">
          <div className="flex w-full flex-wrap text-md ">
            <span>{language.languagename}</span>
          </div>
          <div className="flex w-full h-fit gap-2">
            {language.status ? (
              <span className="text-green-400 text-[12px]">{"listed"}</span>
            ) : (
              <span className="text-danger text-[12px]">{"unlisted"}</span>
            )}
          </div>
          <div className=" flex-col w-full     line-clamp-1 text-[13px] md:flex hidden">
            {(language?.description?.slice(0, 180) as string) + "..."}
          </div>
          <div className=" flex-col w-full     line-clamp-1 text-[13px] flex md:hidden">
            {(language?.description?.slice(0, 110) as string) + "..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
      <div className=" relative col-span-1 rounded-xl md:h-[230px] overflow-hidden border transform hover:scale-105  hover:shadow-lg hover:border-gray-300 transition duration-500 bg-[#f2f8f9] hover:bg-white p-2">
        <div className="flex w-full h-fit flex-col flex-wrap  gap-3  px-3 pt-7 pb-2 ">
          <div className="flex w-full flex-wrap text-[15px] ">
            <span>{course.coursename}</span>
          </div>
          <div className="flex w-full flex-wrap h-fit gap-2 text-[12px] ">
            <span>{course.language}</span>|
            {course.status ? (
              <span className="text-green-400 ">{"listed"}</span>
            ) : (
              <span className="text-danger ">{"unlisted"}</span>
            )}{" "}
            {course.language?.length &&
            (course.chapters?.length as number) > 1 ? (
              <span className="flex gap-2">
                <span>|</span>
                <span>{course.chapters?.length} chapters</span>
              </span>
            ) : (
              <span className="flex gap-2">
                <span>|</span>
                <span>{course.chapters?.length} chapter</span>
              </span>
            )}
            {(course.rating as number) > 0 && (
              <span className="flex gap-2">
                <span>|</span>
                <span>{course.rating} rating</span>
              </span>
            )}
          </div>

          <div className=" flex-col w-full     line-clamp-1 text-[13px] md:flex hidden">
            {(course?.description?.slice(0, 180) as string) + "..."}
          </div>
          <div className=" flex-col w-full     line-clamp-1 text-[13px] flex md:hidden">
            {(course?.description?.slice(0, 100) as string) + "..."}
          </div>
        </div>
      </div>
  );
};