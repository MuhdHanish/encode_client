import React, { useRef, useEffect, useState } from "react";

interface Props {
  url: string;
}

const Duration: React.FC<Props> = ({ url }) => {
   const [videoDuration, setVideoDuration] = useState<number | null>(null);
   const videoRef = useRef<HTMLVideoElement | null>(null);

   useEffect(() => {
     const handleLoadedMetadata = () => {
       if (videoRef.current) {
         setVideoDuration(videoRef.current.duration);
       }
     };

     if (videoRef.current) {
       videoRef.current.addEventListener(
         "loadedmetadata",
         handleLoadedMetadata
       );
     }
     const currentVideoRef = videoRef.current;

     return () => {
       if (currentVideoRef) {
         currentVideoRef.removeEventListener(
           "loadedmetadata",
           handleLoadedMetadata
         );
       }
     };
   }, []);

  function formatVideoDuration(durationInSeconds: number) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <>
      <video
        className="hidden"
        ref={videoRef}
        src={`${import.meta.env.VITE_BUCKET_BASE_URL as string}/${url}`}
      ></video>
      {videoDuration !== null ? (
        <span>{formatVideoDuration(videoDuration)}</span>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default Duration;
