import React from 'react'
import { Course } from '../../../../dtos/Course';
import Duration from '../Duration/Duration';

interface Props {
  course: Course,
  selectedChapter: number,
  setSelectedChapter: (idx: number) => void;
}

const PlayList:React.FC<Props> = ({course,selectedChapter, setSelectedChapter}) => {
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
    </div>
  );
}

export default PlayList