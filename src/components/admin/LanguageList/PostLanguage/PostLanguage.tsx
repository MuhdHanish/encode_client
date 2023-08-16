import React,{ChangeEvent} from 'react'
import { BsArrowLeftShort } from 'react-icons/bs';
import { FormValues } from '../../../../dtos/Form';

interface PostLanguageProps {
  setIsPost: (value: boolean) => void;
  languageState: FormValues;
  setLanguageState: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handlePost: (event: React.FormEvent<HTMLFormElement>) => void;
  err: string | null;
}

const PostLanguage: React.FC<PostLanguageProps> = ({ languageState, setIsPost, setLanguageState, handlePost, err }) => {
  return (
    <form
      className="absolute top-20 left-[20%] border shadow-lg rounded-md w-[300px] h-fit flex z-10  bg-white"
      onSubmit={handlePost}
    >
      <div className="flex flex-col relative w-full h-fit">
        <div
          className="flex absolute top-1 right-1 cursor-pointer"
          onClick={() => {
            setIsPost(false);
          }}
        >
          <BsArrowLeftShort style={{ fontSize: "25px" }} />
        </div>
        <div className="w-full h-fit  flex ">
          <div className="flex flex-col w-full justify-center items-start h-fit p-3">
            <span className="text-sm font-medium">
              Langauge <span className="text-red-500">*</span>
            </span>
            <div className="p-1 w-full h-fit">
              <input
                type="text"
                placeholder="langauge"
                className="border text-[14px] p-2 w-full   rounded-md outline-none shadow-md"
                name="langName"
                value={languageState?.langName}
                onChange={setLanguageState}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-fit  flex ">
          <div className="flex flex-col w-full justify-center items-start h-fit p-3">
            <span className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </span>
            <div className="p-1 w-full h-fit">
              <textarea
                placeholder="description "
                className="border text-[14px] p-2 w-full  h-[100PX]   rounded-md outline-none shadow-md"
                name="langDescription"
                value={languageState?.langDescription}
                onChange={setLanguageState}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-fit  flex ">
          <div className="flex flex-col w-full justify-center items-start h-fit p-3 text-red-500 text-[13px] font-medium">
            {err}
          </div>
        </div>
        <div className="w-full h-fit  flex ">
          <div className="flex flex-col w-full justify-center items-start h-fit p-3">
            <button className="btn-class w-full">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostLanguage