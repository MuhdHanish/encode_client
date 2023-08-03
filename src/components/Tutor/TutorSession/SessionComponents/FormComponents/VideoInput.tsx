import React, {useRef} from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai";

interface InputRef {
  setVideo: (file: File) => void;
  selectedVideo:File | null;
}

const VideoInput: React.FC<InputRef> = ({ setVideo, selectedVideo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleVideoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setVideo(selectedFile as File);
  };
  const handleVideoDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    setVideo(selectedFile );
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
        <div className="flex flex-col w-full justify-center items-start h-fit p-1">
          {selectedVideo ? (
            <span className="text-sm font-medium">Change file</span>
          ) : (
            <span className="text-sm font-medium">
              File <span className="text-red-500">*</span>
            </span>
          )}
          <div className="p-1 w-full h-fit">
            <div
              onDrop={handleVideoDrop}
              onDragOver={handleDragOver}
              className="border border-dashed border-black text-[14px] p-2 w-full flex justify-center sm:justify-between h-[80px]  rounded-md outline-none shadow-md items-center px-5"
            >
              <div className="hidden  sm:flex  w-fit h-full   justify-center items-center">
                <div className="p-1">
                  <AiOutlineCloudUpload
                    style={{
                      width: "25px",
                      height: "25px",
                      color: "gray",
                    }}
                  />
                </div>
              </div>
              <div className=" w-fit h-fit">
                <div className=" hidden  flex-col lg:flex justify-center items-center p-3 text-gray-500">
                  {selectedVideo ? (
                    <>
                      <span className="hidden md:flex justify-center items-center text-[14px]">
                        {selectedVideo.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex text-[14px] justify-center items-center">
                        Upload your file
                      </span>
                      <span className="flex text-[12px] justify-center items-center">
                        MP4, AVI, MOV, MKV or WEBM
                      </span>
                    </>
                  )}
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
        </div>
      </div>
    </>
  );
};

export default VideoInput