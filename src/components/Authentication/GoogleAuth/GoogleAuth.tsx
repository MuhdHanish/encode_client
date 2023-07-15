import { FaGooglePlusSquare } from "react-icons/fa";

interface GoogleMethod  {
  method: string,
  role:string
}

const GoogleAuth = ({ method, role }: GoogleMethod) => {
  return (
    <>
      <div className="flex justify-center border items-center gap-5 rounded-md p-1 w-full shadow-md transition duration-500 hover:scale-105 cursor-pointer ">
        <FaGooglePlusSquare
          style={{ fontSize: "25", color: "red", borderRadius: "10%" }}
        />
        <span className="text-[10px] text-gray-400 ">{method} with google</span>
      </div>
    </>
  );
};

export default GoogleAuth