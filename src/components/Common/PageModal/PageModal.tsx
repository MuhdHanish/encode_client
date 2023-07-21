import React from "react";

interface PageModalProps {
  children: React.ReactNode;
}

const PageModal: React.FC<PageModalProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex items-center justify-center py-7 px-5">
    <div
      className={`bg-white  w-full max-w-[80%] h-full overflow-auto rounded-md flex  justify-center items-center shadow-2xl p-3  gap-5 flex-row`}
    >
      {children}
    </div>
    </div>
  );
};

export default PageModal;
