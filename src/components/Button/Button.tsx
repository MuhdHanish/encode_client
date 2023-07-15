import React from 'react'

interface ButtonProps {
 width?: string;
 primaryColor?: string,
 hoverColor?: string,
 children: React.ReactNode
}

const Button:React.FC<ButtonProps> = ({children,width="250px",primaryColor="primary",hoverColor="purple"}) => {
  return (
    <>
      <button
        className={`border text-xs text-shadow-black
           text-white p-2 text-[10px] bg-${primaryColor} sm:w-[${width}] mt-2
            rounded-md outline-none shadow-md transition duration-300
           hover:bg-${hoverColor}-600 
           `}
      >
        {children}
      </button>
    </>
  );
}

export default Button;