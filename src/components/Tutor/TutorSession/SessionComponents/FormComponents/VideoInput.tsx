import React, {useRef} from 'react'
import { BsCloudUpload } from 'react-icons/bs';
import { AiOutlineCloseCircle } from "react-icons/ai";

interface InputRef {
  setVideo: (file: File, id: number) => void;
  removeVideo: (id: number) => void;
  selectedVideos: {file:File,id:number}[];
}

const VideoInput: React.FC<InputRef> = ({ setVideo, selectedVideos, removeVideo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleVideoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setVideo(selectedFile as File, Date.now());
  };
  const handleVideoDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    setVideo(selectedFile,Date.now());
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  return (
    <>
      {
        <input
          type="file"
          className="hidden"
          accept=".mp4, .avi, .mov, .mkv, .webm"
          ref={fileInputRef}
          onChange={handleVideoInput}
        />
      }
      <div className="w-full h-fit  flex ">
        <div className="flex flex-col w-full justify-center items-start h-fit p-3">
          <span className="text-sm font-medium">
            File <span className="text-red-500">*</span>
          </span>
          <div className="p-1 w-full h-fit">
            <div
              onDrop={handleVideoDrop}
              onDragOver={handleDragOver}
              className="border border-dashed border-black text-[14px] p-2 w-full flex justify-center sm:justify-between h-[80px]  rounded-md outline-none shadow-md items-center px-5"
            >
              <div className="hidden  md:flex p-2 w-fit h-full   justify-center items-center">
                <div className="p-1">
                  <BsCloudUpload
                    style={{
                      width: "25px",
                      height: "25px",
                      color: "gray",
                    }}
                  />
                </div>
              </div>
              <div className=" w-fit h-full">
                <div className=" flex  flex-col justify-start items-center p-3 text-gray-500">
                  <span className="hidden lg:flex text-[14px]">Upload your file</span>
                  <span className="hidden md:flex text-[12px] ">
                    MP4, AVI, MOV, MKV or WEBM
                  </span>
                </div>
              </div>
              <div className="w-fit h-full flex justify-start items-center p-3 text-gray-500">
                <button
                  type="button"
                  className="flex justify-center items-center py-2 px-5 w-fit h-fit border rounded-full "
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse
                </button>
              </div>
            </div>
          </div>
          { selectedVideos.length!==0 &&
            <div className="flex flex-wrap gap-1 w-full h-fit">
              {
                selectedVideos.map((video) =>
                (
                  <div key={video.id} className="flex  justify-center items-center m-1 mb-2 text-black border-dashed border-black border gap-1 p-1 rounded-lg">
                    <div className='text-normal text-[15px]'>{video.file.name}</div>
                    <button type='button' onClick={() => removeVideo(video.id)}><AiOutlineCloseCircle style={{ fontSize: "18px" }} /></button>
                  </div>
                )
                )}
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default VideoInput