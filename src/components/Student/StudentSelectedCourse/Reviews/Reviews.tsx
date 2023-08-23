import React from 'react'
import { AiOutlineStar } from 'react-icons/ai';
import { TbMessage2Star } from 'react-icons/tb';



const Reviews:React.FC = () => {
  return (
    <div className="flex flex-col h-full border w-full md:w-1/3 items-center justify-start overflow-hidden p-3 gap-3 ">
      <div className="flex w-full h-fit items-center justify-start gap-3 px-5">
        <span>Reviews</span>
        <span>
          <TbMessage2Star style={{ color: "#9C4DF4", fontSize: "18px" }} />
        </span>
      </div>
      <div className="flex w-full flex-col h-[320px] overflow-y-auto gap-2">
        <div className="flex w-full h-fit p-3 items-center justify-start gap-5 text-[13px] border rounded-md">
          <div className="flex w-10 h-10">image</div>
          <div className="flex flex-col w-full h-full gap-1">
            <div className="flex w-full h-fit justify-between items-center">
              <span>Hanish</span>
              <span>
                <div className="flex w-fit h-fit py-0.5 text-yellow-500  gap-1 justify-center items-center rounded-lg px-2">
                  <span className="text-[13px]">5</span>
                  <span>
                    <AiOutlineStar
                      style={{ fontSize: "15px",  }}
                    />
                  </span>
                </div>
              </span>
            </div>
            <div className="flex w-full">This is a good course</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews