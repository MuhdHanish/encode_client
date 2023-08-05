import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getSelectedCourse } from "../../../utils/courseUtils";
import { Course } from "../../../dtos/Course";
import { User } from "../../../dtos/User";
import PlayList from "./PlayList/PlayList";


const StudentSelectedCourse: React.FC = () => {
  const dispatch = useDispatch();
  const [course, setSelectedCourse] = useState<Course | null>(null);
  const [tutor,setTutor] = useState<User|null>(null)
  const [selectedChapter, setSelectedChapter] = useState<number >(0);
  const selectedCourseId = useSelector((state: RootState) => state.userReducer.selectedCourseId);

  const setCourseDetails = useCallback(() => {
    getSelectedCourse(selectedCourseId as string)
      .then((res) => {
        setSelectedCourse(res as Course);
        setTutor(res?.tutor as User);
      })
      .catch((err) => console.log(err));
  }, [selectedCourseId]);
  useEffect(() => {
    setCourseDetails();
  }
    , [setCourseDetails, dispatch]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full h-full overflow-hidden bg-white">
      <div className="flex w-full h-full flex-col overflow-y-scroll">

        <div className="flex flex-col justify-center items-center w-full py-5 h-fit ">
          <div className="flex w-full flex-col lg:flex-row h-full px-10 gap-5 mb-7">
            <div className="flex flex-col justify-start items-center w-full lg:w-2/3  h-full gap-3 text-medium ">
              <div className="flex  border w-full h-full">
                <video
                  className="w-full h-full"
                  src={`${import.meta.env.VITE_BUCKET_BASE_URL as string}/${
                    course?.chapters?.[selectedChapter]?.url as string
                  }`}
                  autoPlay
                  controls
                  controlsList="nodownload"
                ></video>
              </div>
              <div className="flex flex-col  w-full h-full gap-5">
                <div className="flex w-full  justify-start items-center h-fit text-lg font-medium ">
                  {course?.chapters?.[selectedChapter]?.title}
                </div>
                <div className="flex w-full  justify-start items-center h-fit text-sm ">
                  {course?.chapters?.[selectedChapter]?.description}
                </div>
                 <div className="flex w-full  justify-start items-center h-fit text-lg font-medium gap-2 ">
                  <div className="w-8 h-8 rounded-sm">
                    <img src={tutor?.profile} className="w-full h-full rounded-sm" alt="" />
                  </div>
                  <div className="w-fit h-fit text-[13px]">
                   {tutor?.username}
                  </div>
                 </div>
              </div>
            </div>
            <PlayList
              course={course as Course}
              selectedChapter={selectedChapter}
              setSelectedChapter={setSelectedChapter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSelectedCourse;