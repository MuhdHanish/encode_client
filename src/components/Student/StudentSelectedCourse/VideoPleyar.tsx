import React from "react";


interface Props {
  url?: string | null;
  ref?: React.LegacyRef<HTMLVideoElement> | null;
}

const VideoPlayer: React.FC<Props> = ({ url, ref }) => {
  return (
    <>
      {url && (
        <video
          className="w-full h-full object-cover"
          controls
          controlsList="nodownload"
          ref={ref as React.LegacyRef<HTMLVideoElement>}
          src={`${import.meta.env.VITE_BUCKET_BASE_URL as string}/${url}`}
        ></video>
      )}
    </>
  );
};

export default VideoPlayer;
