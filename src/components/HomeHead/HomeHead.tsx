import React from 'react'

const HomeHead:React.FC = () => {
  return (
    <>
      <div className="h-[20%] w-full bg-transparent flex flex-col items-center justify-center">
        <div className="h-[5%] w-full flex flex-col justify-center items-center p-3 gap-3">
          <div className='text-sm text-shadow-black font-semibold'>Unlock Your Potential</div>
          <div className='font-bold text-2xl'>Learn at Home</div>
        </div>
      </div>
    </>
  );
}

export default HomeHead