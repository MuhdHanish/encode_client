import { Outlet } from "react-router-dom";
import NavBar from "../../components/Common/NavBar/NavBar";
import io from "socket.io-client";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "../../redux/socketSlice/socketSlice";
import { Notification, addNotification } from "../../redux/notificationSlice/notificationSlice";

const StudentHomePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const getSocket = useSelector((state:RootState) => state.socketReducer.getSocket);
  const socket = getSocket(); 
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL as string);
     dispatch(setSocket(() => socket));
      if (user) {socket.emit("join-following-rooms", user);}
    return (() => { socket.disconnect(); })
  },[user, dispatch]);
  useEffect(() => {
    if (!socket) return;
    socket.on("on-live-reminder", (newNotification: Notification) => {
      dispatch(addNotification(newNotification));
    });
    return () => {
      socket.off("on-live-reminder",
        (newNotification: Notification) => {
      dispatch(addNotification(newNotification));
    });};
  }, [socket,dispatch]);
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