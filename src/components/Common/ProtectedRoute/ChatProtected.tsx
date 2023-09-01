import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

interface ChatProtectedProps {
  element: React.ReactNode;
}

const ChatProtected: React.FC<ChatProtectedProps> = ({ element }) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { selectedChat } = useSelector((state: RootState) => state.chatReducer);
  if (!selectedChat) {
    if (user) {
      if (user.role === "student") {
        return <Navigate to="/" replace />;
      } else if (user.role === "tutor") {
        return <Navigate to="/tutor" replace />;
      } else if (user.role === "admin") {
        return <Navigate to="/admin" replace />;
      }
    } else {
       return <Navigate to="/login" replace />;
    }
  }
  return <>{element}</>;
};

export default ChatProtected;
