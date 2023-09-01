import React, { useEffect, useState } from 'react'
import { User } from '../../dtos/User';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChat } from '../../redux/chatSlice/chatSlice';
import ChatSideBar from './ChatSideBar';
import { Message } from '../../dtos/Message';
import { getMessages } from '../../utils/chatUtils';


const Chat: React.FC = () => {
  const { chats, selectedChat } = useSelector((state: RootState) => state.chatReducer);
  const [messages, setMessages] = useState<Message[] | []>([]);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    getMessages(selectedChat?._id as string)
      .then(res => { if (res) { setMessages(res as Message[]) } })
      .catch(err => console.log(err));
    return (() => { dispatch(setSelectedChat(null)) });
  },[dispatch, selectedChat])
  return (
    <>
      <div className="w-full h-full flex justify-center items-center bg-white relative overflow-hidden">
        <ChatSideBar chats={chats} currentUser={user as User} />
        <div className="w-full lg:w-4/5 h-full flex flex-col justify-start  bg-white overflow-hidden">
          {
            messages.map((message, idx) => (
              <span key={idx}>{message.content}</span>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Chat;