import React, { useEffect, useState, useCallback } from "react";
import {  useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Course } from "../../../dtos/Course";
import { toast } from "react-toastify";
import { User } from "../../../dtos/User";
import PlayList from "./PlayList/PlayList";
import { getSelectedCourse } from "../../../utils/courseUtils";
import { getFullReviews } from "../../../utils/reviewUtils";
import { Review } from "../../../dtos/Review";
import { follow, unfollow } from "../../../utils/userUtils";


const StudentSelectedCourse: React.FC = () => {
  const [tutor, setTutor] = useState<User | null>(null)
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  const [course, setSelectedCourse] = useState<Course | null>(null);
   const [reviews, setReviews] = useState<Review[] | null>(null);
  const courseDetails = useSelector((state: RootState) => state.userReducer.selectedCourse);
  const setCourseDetails = useCallback(() => {
    getSelectedCourse(courseDetails?._id as string)
      .then((res) => {
        setSelectedCourse(res as Course);
        setTutor(res?.tutor as User);
      })
      .catch((err) => {
        toast.error(err as string, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
     getFullReviews(courseDetails?._id as string)
      .then((res) => setReviews(res as Review[]))
      .catch((err) => console.log(err));
  }, [courseDetails]);
  useEffect(() => {
    setCourseDetails();
  }, [setCourseDetails]);
  const setReviewAgain = (id: string) => {
    getFullReviews(id)
    .then((res) => setReviews(res as Review[]))
    .catch((err) => console.log(err));};
  const isFollowing = user?.following.some(
    (followedUser) => followedUser._id === tutor?._id 
  );
  
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full h-full overflow-hidden bg-white relative">
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
                <div className="flex w-full  justify-start items-center h-fit text-lg font-medium gap-2 cursor-pointer">
                  <div className="w-8 h-8 rounded-sm">
                    <img
                      src={tutor?.profile}
                      className="w-full h-full rounded-sm"
                      alt=""
                    />
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-fit h-fit text-[14px]">
                      {tutor?.username}
                    </div>
                    <div
                      onClick={() => {
                        isFollowing
                          ? unfollow(tutor?._id as string)
                              .then()
                              .catch((err) => console.log(err))
                          : follow(tutor?._id as string)
                              .then()
                              .catch((err) => console.log(err));
                      }}
                      className="flex  w-fit h-fit justify-center px-3 text-[13px] border rounded-md shadow-sm text-primary text-shadow-black "
                    >
                      {isFollowing ? "followed" : "follow"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <PlayList
              course={course as Course}
              selectedChapter={selectedChapter}
              setSelectedChapter={setSelectedChapter}
              reviews={reviews}
              setReviewAgain={setReviewAgain}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSelectedCourse;