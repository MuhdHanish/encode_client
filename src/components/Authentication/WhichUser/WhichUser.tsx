import React from 'react'

interface WhichUserProps  {
 role: string,
 setRole: (role:string) => void,
}

const WhichUser:React.FC<WhichUserProps> = ({setRole,role}) => {
  return (
    <>
      <div className="flex items-center justify-center gap-12 mb-1.5">
        <div
          className={
            role === "student"
              ? "text-primary font-semibold text-[13px] cursor-pointer border-b border-primary px-3 py-0.5 "
              : "text-gray-400 text-[13px]  font-semibold  cursor-pointer"
          }
          onClick={() => setRole("student")}
        >
          STUDENT
        </div>
        <div
          className={
            role === "tutor"
              ? "text-primary font-semibold text-[13px] cursor-pointer border-b  border-primary px-3 py-0.5 "
              : "text-gray-400 text-[13px]  font-semibold  cursor-pointer "
          }
          onClick={() => setRole("tutor")}
        >
          TUTOR
        </div>
      </div>
    </>
  );
}

export default WhichUser