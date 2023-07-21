import { Outlet } from "react-router-dom";
import NavBar from "../../components/Common/NavBar/NavBar";


const StudentHomePage: React.FC = () => {
  return (
    <>
      <div className="bg-home-background bg-cover w-screen h-screen overflow-hidden ">
        <div className="flex flex-col justify-center items-center h-full">
          <NavBar isTutor={false} />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default StudentHomePage