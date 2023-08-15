import React from 'react'
import { MdMilitaryTech } from 'react-icons/md'

interface Props {
  list: [{ _id?: string; languagename?: string; description?: string }];
}

const LanguageCount:React.FC<Props> = ({list}) => {
  return (
    <div>
    <div className="flex  hover:bg-primary  transition duration-300 ">
        <div className="flex flex-col w-full h-fit p-5 gap-3    bg-white shadow-lg hover:translate-y-10 transition duration-300 cursor-pointer">
          <div className="flex w-full h-f it justify-between items-center">
            <div className="flex w-full h-fit justify-between  items-center ">
              <MdMilitaryTech style={{fontSize: "30px" }} />
              <span className="w-fit h-fit text-gray-400 uppercase text-[15px] font-semibold">
                Languages
              </span>
              <div className="flex justify-center items-center w-[32px] h-[32px] rounded-full border-4 p-5 font-bold border-primary">
                {list.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageCount