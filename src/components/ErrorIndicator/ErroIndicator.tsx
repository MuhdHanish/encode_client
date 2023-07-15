import React from "react";

interface ErrorIndicatorProps {
  errors: {
    field: string;
    errors: string[];
  };
}

const ErrorIndicator: React.FC<ErrorIndicatorProps> = ({ errors }) => {
  return (
    <div className="error-indicator text-red-600 font-semibold text-[9px] p-3 mt-10 absolute right-0 border bg-white rounded-md shadow-2xl">
      <div className="error-tooltip">
        <ul className="error-messages">
          {errors.errors.map((error, index) => (
            <li key={index} className="error-message">
              {error}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ErrorIndicator;
