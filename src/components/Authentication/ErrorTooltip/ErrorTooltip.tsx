import {BsExclamationCircle } from "react-icons/bs";
  
 interface ErrorTooltipProps {
    setHover: (value:boolean) => void;
 }
  
  const ErrorTooltip: React.FC<ErrorTooltipProps> = ({setHover}) => {
    return (
      <div className="absolute right-2.5 cursor-pointer" onMouseOver={() => setHover(true)}  onMouseLeave={() => setHover(false)}>
        <div className="flex items-center">
          <BsExclamationCircle style={{ color: "red", fontSize: "15px" }} />
        </div>
      </div>
    );
  };

  export default ErrorTooltip;
  