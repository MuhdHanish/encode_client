import React from "react";

interface PageModalProps {
  children: React.ReactNode;
}

const PageModal: React.FC<PageModalProps> = ({ children }) => {
  return (
      <div
        className={`bg-white  w-full max-w-[80%]   rounded-md flex  justify-center items-center shadow-2xl gap-5 flex-row`}
      >
        {children}
      </div>
  );
};

export default PageModal;
