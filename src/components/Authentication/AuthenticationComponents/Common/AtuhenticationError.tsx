import React from 'react'

interface AuthenticationErrorProps {
  passedError: string
}

const AtuhenticationError: React.FC<AuthenticationErrorProps> = ({ passedError }) => {

  return (
    <>
      <div className="relative mb-4 flex justify-center items-center">
        <div className="flex justify-center items-center mt-7  absolute">
          <p className="text-[13px] text-red-600 font-semibold">
            {passedError}
          </p>
        </div>
      </div>
    </>
  );
}

export default AtuhenticationError