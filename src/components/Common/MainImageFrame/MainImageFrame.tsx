import React from 'react'

interface MainImageFrameProps {
  imgSrc: string,
  alt : string
}

const MainImageFrame:React.FC<MainImageFrameProps> = ({imgSrc,alt}) => {
  return (
    <div className="justify-center  items-center   text-center hidden lg:flex flex-col sm:w-1/2 relative">
      <img
        src={imgSrc}
        className="w-full max-h-full"
        alt={alt}
      />
    </div>
  );
}

export default MainImageFrame