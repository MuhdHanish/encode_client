import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/Common/NavBar/NavBar";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "../../redux/socketSlice/socketSlice";
import { getChats } from "../../utils/chatUtils";

const StudentHomePage: React.FC = () => {
  const  user  = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();
   useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL as string);
     dispatch(setSocket(() => socket));
     if (user) {
       socket.emit("connect-to-online", user?._id);
       getChats().then().catch(err => console.log(err));
     }
     return (() => { socket.disconnect(); });
  },[user, dispatch]);
  return (
    <>
      <div className="bg-user-background bg-cover flex justify-between items-center w-screen h-screen ">
        <div className="w-full h-full flex gap-1 flex-col  items-center ">
          <div className="w-full flex justify-center items-center">
            <NavBar isTutor={false} />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default StudentHomePage