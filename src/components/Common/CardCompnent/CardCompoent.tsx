import React, {useState} from "react";
import { User } from "../../../dtos/User";
import { Course } from "../../../dtos/Course";
import { BsArrowRightShort } from "react-icons/bs";

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
    status?:boolean
  }
  list: (languageId: string) => void;
  unList: (languageId: string) => void;
}

export const UsersCard:React.FC<UserCardProps> = ({user,blockUser,unBlockUser}) => {
  const [drop, setDrop] = useState<boolean>(false);

 return (
   <div className=" relative col-span-1 h-fit border hover:-translate-y-0.5 hover:shadow-lg hover:border-gray-300 transition duration-300 bg-[#f2f8f9] hover:bg-white p-2">
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
     <div
       className="absolute   bg-primary right-0.5 top-0.5 w-fit h-fit text-[13px] border  px-2  rounded-bl-full  shadow-sm"
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
    <div className=" relative col-span-1 h-[250px] overflow-scroll border hover:-translate-y-0.5 hover:shadow-lg hover:border-gray-300 transition duration-300 bg-[#f2f8f9] hover:bg-white p-2">
      {drop && (
        <div className="absolute left-0.5 top-0.5 w-fti h-fit text-[13px] border  px-2  rounded-br-md">
          {language.status ? (
            <button
              onClick={() => unList(language?._id as string)}
              className="text-danger shadow-sm "
            >
              Block
            </button>
          ) : (
            <button
              onClick={() => list(language?._id as string)}
              className="text-green-400 shadow-sm "
            >
              Unblock
            </button>
          )}
        </div>
      )}
      <div
        className="absolute   bg-primary right-0.5 top-0.5 w-fit h-fit text-[13px] border  px-2  rounded-bl-full  shadow-sm"
        onClick={() => setDrop((state) => !state)}
      >
        <button className=" flex justify-center items-center text-white">
          <BsArrowRightShort style={{ fontSize: "20px" }} />
        </button>
      </div>
      <div className="flex w-full h-fit flex-col flex-wrap  gap-3  px-3 pt-7 pb-2">
        <div className="flex w-full flex-wrap text-md ">
          <span>{language.languagename}</span>
        </div>
        <div className="flex flex-col flex-wrap w-full h-fit text-ellipsis  line-clamp-1 text-[13px]">
          {language.description}
        </div>
      </div>
    </div>
  );
};



