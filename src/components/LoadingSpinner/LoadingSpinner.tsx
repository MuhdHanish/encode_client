import React from "react";

const LoadingSpinner: React.FC = () => {

  return (
    <div className="flex justify-center items-center h-4 w-4">
      <div
        className={`w-4 h-4 border-4 border-emerald-500 border-solid rounded-full animate-pulse`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
