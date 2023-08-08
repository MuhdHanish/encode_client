import React,{ChangeEvent} from 'react'
import ChapterTitle from '../../SessionComponents/FormComponents/ChapterTitle';
import ChapterDescripton from '../../SessionComponents/FormComponents/ChapterDescripton';
import ChapterVideoInput from '../../SessionComponents/FormComponents/ChapterVedioInput';
import { FormValues } from '../../../../../dtos/Form';
import { Chapter } from '../../../../../dtos/Course';
import {CiCircleRemove} from "react-icons/ci"

interface InputProps {
  chapterState: FormValues;
  setChapterState: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setChVideo: (file: File) => void;
  chapterVideo: File | null;
  chapters: Chapter[] | [];
  removeChapter: (index: number) => void;
}

const AddChapter:React.FC<InputProps> = ({chapterState,setChapterState,setChVideo, chapterVideo, chapters, removeChapter}) => {
  return (
    <>
      <ChapterTitle
        sessionState={chapterState}
        setSessionState={setChapterState}
      />
      <ChapterDescripton
        sessionState={chapterState}
        setSessionState={setChapterState}
      />
      <ChapterVideoInput setVideo={setChVideo} selectedVideo={chapterVideo} />
      {chapters?.length !== 0 && chapters?.length  > 0 && (
        <div className="flex justify-start items-center w-full flex-wrap h-fit px-5 gap-2">
          {chapters.map((_, idx) => (
            <div
              key={idx}
              className="flex w-fit h-fit  shadow-md border p-1 rounded-lg gap-2 justify-center items-center flex-wrap text-[14px]"
            >
              <span> {`chapter ${idx + 1}`}</span>
              <button type='button' onClick={() => removeChapter(idx)}><CiCircleRemove style={{ fontSize:'18px'}} /></button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default AddChapter