import { Outlet } from "react-router-dom";
import NavBar from "../../components/Common/NavBar/NavBar";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "../../redux/socketSlice/socketSlice";
import io from "socket.io-client";

const TutorPage: React.FC = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.userReducer);
   useEffect(() => {
     const socket = io(import.meta.env.VITE_SERVER_URL as string);
     dispatch(setSocket(() => socket));
     if (user) {
       socket.emit("create-room", user);
     }
     return (() => {
       socket.disconnect();
     })
   }, [user,dispatch]);
  return (
    <>
      <div className="bg-user-background bg-cover flex justify-between items-center w-screen h-screen ">
        <div className="w-full h-full flex gap-1 flex-col items-center ">
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


