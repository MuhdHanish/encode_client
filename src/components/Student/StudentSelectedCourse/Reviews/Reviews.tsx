import React from 'react'
import { AiOutlineStar } from 'react-icons/ai';
import { Review } from '../../../../dtos/Review';
import { User } from '../../../../dtos/User';


interface ReivewsProps {
  review: Review
}

const Reviews: React.FC<ReivewsProps> = ({ review }) => {
  const user = review.user as User;
  return (
    <div className="flex w-full h-fit p-3 items-center justify-start gap-5 text-[13px] border rounded-sm">
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
              <span>
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