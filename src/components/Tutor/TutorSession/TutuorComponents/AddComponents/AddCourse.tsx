import React, { ChangeEvent } from 'react';
import { FormValues } from '../../../../../dtos/Form';
import { DescriptionInput, IsPaidSelection, LanguageSelection, LevelSelection, PriceInput, TitleInput, VideoInput } from '../../SessionComponents/FormComponents';

interface InputProps {
  sessionState: FormValues;
  setSessionState: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setVideo: (file: File) => void;
  selectedVideo: File |string| null;
}

const AddCourse:React.FC<InputProps> = ({sessionState,setSessionState,setVideo,selectedVideo}) => {
  return (
    <>
      <div className="flex w-1/2 h-full  flex-col">
        <TitleInput
          sessionState={sessionState}
          setSessionState={setSessionState}
        />
        <div className="w-full h-fit  flex">
          <LanguageSelection
            sessionState={sessionState}
            setSessionState={setSessionState}
          />
          <LevelSelection
            sessionState={sessionState}
            setSessionState={setSessionState}
          />
        </div>
        <div className="w-full h-fit  flex">
          <IsPaidSelection
            sessionState={sessionState}
            setSessionState={setSessionState}
          />
          <PriceInput
            sessionState={sessionState}
            setSessionState={setSessionState}
          />
        </div>
        <DescriptionInput
          sessionState={sessionState}
          setSessionState={setSessionState}
        />
        <VideoInput setVideo={setVideo} selectedVideo={selectedVideo} />
      </div>
    </>
  );
}

export default AddCourse