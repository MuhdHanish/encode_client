import React from "react";

interface ErrorIndicatorProps {
    errors : {
        field: string,
        errors: string[];
    }
}

const ErrorIndicator: React.FC<ErrorIndicatorProps> = ({
    errors,
  }) => {
    return (
      <div className="absolute z-10 left-0 top-[41px] right-0 bg-white border rounded-md shadow-lg">
        {errors.errors.map((error, index) => (
          <div
            key={index}
            className="p-1 font-semibold text-red-600 text-[13px] flex justify-start"
          >
            {error}
          </div>
        ))}
      </div>
    );
  };
  

export default ErrorIndicator;