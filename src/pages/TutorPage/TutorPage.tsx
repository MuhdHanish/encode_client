import { Outlet } from "react-router-dom";
import NavBar from "../../components/Common/NavBar/NavBar";

const TutorPage: React.FC = () => {
  return (
    <>
      <div className="bg-tutor-background bg-cover flex justify-between items-center w-screen h-screen ">
        <div className="w-full h-full flex flex-col justify-between items-center ">
          <div className="w-full flex justify-center items-center">
            <NavBar isTutor={true} />
          </div>
            <Outlet/>
        </div>
      </div>
    </>
  );
};

export default TutorPage;


