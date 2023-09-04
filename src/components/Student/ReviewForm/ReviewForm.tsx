import React, { useState, FormEvent } from "react";
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import HandleForm from "../../../utils/handleFormState";
import { postReview } from "../../../api/reviewApi";
import { toast } from "react-toastify";
import { Review } from "../../../dtos/Review";
import { updateTheReview } from "../../../utils/reviewUtils";

interface Props {
  courseId: string;
  setReviewAgain?: (value: string) => void;
  edit?: Review
  setEdit?:(value:Review|null) => void
}

const ReviewForm: React.FC<Props> = ({ courseId, setReviewAgain, edit , setEdit}) => {
  const [rating, setRating] = useState<number>(edit?.rating||0);
  const [err, setErr] = useState("");
  const handleStarClick = (newRating: number) => {
    setRating(newRating);
  };

  const [reviewState, setReviewState] = HandleForm({
    review: edit?.review||"",
  });

  const submitReview = (event: FormEvent) => {
    event.preventDefault();
    if (!rating) {
      return setErr("Please set rating");
    }
    if (!reviewState.review) {
      return setErr("Please fill review");
    }
    !edit
      ? postReview(courseId, reviewState.review, rating)
          .then((res) => {
            if (res) {
              setErr(""), setReviewAgain && setReviewAgain(courseId);
              toast.success("Review submited successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          })
          .catch((err) => {
            console.log(err)
          })
      : updateTheReview(edit?._id as string, reviewState?.review, rating, edit?.course as string)
        .then((res) => {
            if (res) {
              setErr(""), setReviewAgain && setReviewAgain(courseId); setEdit?.(null);
              toast.success("Review edited successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
  };

  return (
    <form
      className="w-full h-fit flex flex-col justify-start  gap-3 px-3"
      onSubmit={submitReview}
    >
      <div className="flex w-full h-fit justify-start items-center text-black text-shadow-black text-[15px] gap-1">
        <span> Rate course</span> <span className="text-primary">!</span>
      </div>
      <div className="flex w-full  h-fit justify-start items-center">
        <div className="flex flex-wrap w-fit h-fit text-md font-normal">
          {[1, 2, 3, 4, 5].map((value) => (
            <span key={value} onClick={() => handleStarClick(value)}>
              {value <= rating ? (
                <RiStarSFill style={{ fontSize: "18px", color: "#B59410" }} />
              ) : (
                <RiStarSLine style={{ fontSize: "18px", color: "#B59410" }} />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-full h-fit justify-start items-center">
        <textarea
          name="review"
          className="w-full h-[100px] justify-start items-start outline-none border p-2 text-[14px]"
          placeholder="review"
          id=""
          value={reviewState.review}
          onChange={setReviewState}
        ></textarea>
      </div>
      {err && <span className="text-red-600 text-sm">{err}</span>}
      <button className="btn-class w-full" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
