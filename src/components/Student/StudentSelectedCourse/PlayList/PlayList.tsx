import React, { useState } from 'react'
import { Course } from '../../../../dtos/Course';
import Duration from '../Duration/Duration';
import { Review } from '../../../../dtos/Review';
import Reviews from '../Reviews/Reviews';
import { TbMessage2Star } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import ReviewForm from '../../ReviewForm/ReviewForm';
import { isEqual } from "lodash/fp";


interface Props {
  course: Course;
  selectedChapter: number;
  setSelectedChapter: (idx: number) => void;
  reviews: Review[] | null;
  setReviewAgain: (id: string) => void;
}

const PlayList: React.FC<Props> = ({ course, selectedChapter, setSelectedChapter, reviews, setReviewAgain }) => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const userHasPostedReview = reviews?.some(review => isEqual(review.user, user));
  const [edit,setEdit] = useState<Review|null>(null)
  return (
    <div className="flex flex-col justify-start items-center w-full lg:w-1/3  h-fit  gap-3 text-medium ">
      <div className="flex gap-3 w-full h-fit py-2 px-3 justify-start items-center border text-[13px]">
        <span>
          {selectedChapter + 1} / {course?.chapters?.length}
        </span>
        <span>Chapters</span>
      </div>
      <div className="flex  w-full  max-h-[300px]  justify-start items-center p-2 flex-col    border  text-[13px]  overflow-y-auto">
        {course?.chapters?.map((chapter, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedChapter(idx)}
            className={`flex w-full h-fit    justify-start items-center cursor-pointer hover:scale-[101%] duration-300   ${
              idx === selectedChapter
                ? " text-primary text-shadow-black"
                : "text-black"
            }`}
          >
            <div className="flex  w-fit h-fit p-1">
              <video
                className="w-[150px] h-auto border"
                src={`${import.meta.env.VITE_BUCKET_BASE_URL as string}/${
                  chapter.url as string
                }`}
              ></video>
            </div>
            <div className="flex  w-full justify-center items-center h-full p-1 gap-1">
              <span>{idx + 1}. </span>
              <span>{chapter.title}</span>
            </div>
            <div className="p-1">
              <Duration url={chapter.url as string} />
            </div>
          </div>
        ))}
      </div>
      {!reviews && (
        <span className="my-0.5 text-shadow-black">
          No reviews posted yet <span className="text-primary">!</span>
        </span>
      )}
      {reviews && (
        <div className="flex w-full flex-col h-[290px] overflow-y-auto gap-2 ">
          <div className="flex w-full h-fit items-center justify-start gap-3 px-5 py-2 border">
            <span>Reviews</span>
            <span>
              <TbMessage2Star style={{ color: "#9C4DF4", fontSize: "18px" }} />
            </span>
          </div>
          {userHasPostedReview && (
            <span className="my-0.5  w-full h-fit flex justify-center gap-2 font-light text-[12px] text-green-500 items-center">
              <span>Your review has been recorded !</span>
            </span>
          )}
          {reviews?.map((review, idx) => (
            <Reviews
              key={idx}
              review={review}
              setEdit={setEdit}
              setReviewAgain={setReviewAgain}
              courseId={course?._id as string}
            />
          ))}
        </div>
      )}
      {!userHasPostedReview && (
        <span className="my-0.5 text-shadow-black w-full h-fit">
          <ReviewForm
            setReviewAgain={setReviewAgain}
            courseId={course?._id as string}
          />
        </span>
      )}
      {edit && (
        <span className="my-0.5 text-shadow-black w-full h-fit">
          <ReviewForm
            setReviewAgain={setReviewAgain}
            courseId={course?._id as string}
            edit={edit}
            setEdit={setEdit}
          />
        </span>
      )}
    </div>
  );
}

export default PlayList