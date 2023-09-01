import React, { useEffect, useRef, useState } from 'react'
import { User } from '../../dtos/User';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import ChatSideBar from './ChatSideBar';
import { Message } from '../../dtos/Message';
import { getChatUser, getMessages } from '../../utils/chatUtils';
import ChatProfile from './ChatProfile';
import Messages from './Messages';
import SendMessage from './SendMessage';


const Chat:React.FC = () => {
  const { chats, selectedChat } = useSelector((state: RootState) => state.chatReducer);
   const containerRef = useRef<HTMLDivElement|null>(null);
  const [messages, setMessages] = useState<Message[] | []>([]);
  const  currentUser  = useSelector((state: RootState) => state.userReducer.user);
  const user = getChatUser(currentUser as User, selectedChat?.users as User[]);
  const dispatch = useDispatch();
  const getSocket = useSelector((state:RootState) => state.socketReducer.getSocket);
  const socket = getSocket(); 
  useEffect(() => { 
    if (selectedChat) {
      setMessages([]);
      socket?.emit("join-to-chat", user?._id);
      getMessages(selectedChat?._id as string)
        .then(res => { if (res) { setMessages(res as Message[]) } })
        .catch(err => console.log(err));
    }
  }, [dispatch ,selectedChat ,socket ,user]);
  return (
    <>
      <div className="w-full h-full flex justify-center items-center bg-white relative overflow-hidden">
        <ChatSideBar chats={chats} currentUser={currentUser as User} />
        <div className="w-full lg:w-4/5 h-full flex flex-col justify-center items-center  bg-white overflow-hidden p-3 gap-2">
          <div className="flex w-full h-full flex-col border overflow-hidden">
            <ChatProfile user={user} />
            <Messages messages={messages} user={user} setMessages={setMessages} socket={socket} containerRef={containerRef} />
          </div>
          <SendMessage selectedChat={selectedChat} setMessages={setMessages} messages={messages} socket={socket} containerRef={containerRef}/>
        </div>
      </div>
    </>
  );
}

export default Chat;