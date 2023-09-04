import React,{useState} from 'react'
import { AiOutlineStar } from 'react-icons/ai';
import { Review } from '../../../../dtos/Review';
import { User } from '../../../../dtos/User';
import { RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { isEqual } from "lodash/fp";
import { PiDotsThreeVerticalBold } from 'react-icons/pi';
import { deleteTheReview } from '../../../../utils/reviewUtils';
import { toast } from "react-toastify";


interface ReivewsProps {
  review: Review,
  setEdit?: (review: Review) => void;
  setReviewAgain?: (id: string) => void;
  courseId?:string
}

const Reviews: React.FC<ReivewsProps> = ({ review, setEdit, setReviewAgain, courseId }) => {
  const rootUser = useSelector((state: RootState) => state.userReducer.user);
  const user = review.user as User;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deleteReview = (id:string) => {
    deleteTheReview(id,courseId as string).then((res) => {
      if (res) {
        setReviewAgain?.(courseId as string);
        toast.success("Review deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }).catch((err) => { console.log(err) });
  }
  return (
    <div className="flex w-full h-fit p-3 items-center justify-start gap-5 text-[13px] border rounded-sm relative">
      {
        isEqual(user === rootUser) && <div className="flex absolute top-1 right-0.5 cursor-pointer" onClick={()=>setIsOpen(!isOpen)}><PiDotsThreeVerticalBold style={{ fontSize:"15px"}} /></div>
      }
      {
        isOpen && 
        <div className='absolute bg-white w-fit h-fit flex flex-col border rounded-md shadow-md top-1.5 right-5 cursor-pointer' onMouseLeave={()=>setIsOpen(false)}>
            <div className="flex border-b p-1 hover:bg-slate-100" onClick={()=>setEdit?.(review)}>edit</div>
            <div className="flex  p-1 hover:bg-red-100" onClick={()=>{deleteReview(review._id as string)}}>
              delete
            </div>
        </div>
      }
      <div className="flex flex-col w-full h-full gap-1">
        <div className="flex w-full h-fit justify-between items-center">
          <div className="flex gap-3 justify-start items-center">
            <span><img src={user.profile} className='w-[25px] h-[25px] rounded-sm' alt="" /></span>
            <span>{user.username}</span>
          </div>
          <span>
            <div
              className={`flex w-fit h-fit py-0.5 gap-1 justify-center items-center rounded-lg px-2 ${
                (review.rating as number) < 3
                  ? "text-red-500"
                  : (review.rating as number) >= 4
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              <span className="text-[13px]">{review.rating}</span>
              <span className='mb-0.5'>
                <AiOutlineStar style={{ fontSize: "15px" }} />
              </span>
            </div>
          </span>
        </div>
        <div className="flex w-full h-fit justify-start items-center pl-10 text-gray-400 text-[12px] ">
          {review.review} 
        </div>
      </div>
    </div>
  );
}

export default Reviews