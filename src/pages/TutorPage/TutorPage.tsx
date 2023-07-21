import { Outlet } from "react-router-dom";
import NavBar from "../../components/Common/NavBar/NavBar";

const TutorPage: React.FC = () => {
  return (
    <>
      <div className="bg-tutor-background bg-cover w-screen h-screen overflow-hidden ">
        <div className="flex flex-col justify-center items-center h-full">
          <NavBar isTutor={true}/>
          <Outlet />
       </div>
      </div>
    </>
  );
};

export default TutorPage;
