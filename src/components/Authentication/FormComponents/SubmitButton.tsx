import React from 'react'
import Button from '../../Button/Button';

interface SubmitButtonProps {
 children:React.ReactNode
}

const SubmitButton:React.FC<SubmitButtonProps> = ({children}) => {
  return (
    <>
      <div className="flex flex-col ">
        <Button>{children}</Button>
      </div>
    </>
  );
}

export default SubmitButton;