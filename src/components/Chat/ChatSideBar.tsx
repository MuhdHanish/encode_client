import React, { useState, useEffect } from 'react';
import { Chat } from '../../dtos/Chat';
import { getChatUser } from '../../utils/chatUtils';
import { User } from '../../dtos/User';
import { Message } from '../../dtos/Message';
import SearchInput from '../Common/SearchInput/SearchInput';
import { useDispatch } from 'react-redux';
import { setSelectedChat } from '../../redux/chatSlice/chatSlice';

interface ChatSideBarProps {
  chats?: [] | Chat[]
  currentUser?: User
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({ chats, currentUser }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch();
  const [filteredChatList, setFilteredChatList] = useState<Chat[] | []>([]);
  useEffect(() => {
    const filteredList = chats?.filter((chat) => {
      const usernameMatch = getChatUser(currentUser as User, chat.users as User[])
       ?.username
       ?.toLowerCase()
       ?.includes(searchQuery.toLowerCase());
      const messageMatch = (chat.latestMessage as Message)
       ?.content
       ?.toLowerCase()
       ?.includes(searchQuery.toLowerCase());
      return (usernameMatch || messageMatch)
    });
    setFilteredChatList(filteredList as Chat[]);
  }, [searchQuery, chats, currentUser]);
  const setChat = (chat: Chat) => {
    dispatch(setSelectedChat(chat));
  };
  return (
    <div
      className={` hidden  lg:w-1/5 shadow-2xl lg:flex flex-col   h-full  p-3 gap-2  border-r`}
    >
      <div className="w-full h-fit flex items-center justify-center ">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="w-full h-full flex flex-col items-center  overflow-y-auto  px-1.5">
        {filteredChatList.length > 0 &&
          filteredChatList?.map((chat, index) => (
            <div
              className="my-2 text-[14px]  px-3 py-1 w-full justify-center  flex transition 
              duration-500 cursor-pointer  hover:border-primary border rounded overflow-hidden"
              onClick={()=>{setChat(chat)}}
              key={index}
            >
              <div className="flex w-full h-fit gap-3 items-center py-1">
                <div className="flex w-7 h-7 ">
                  <img
                    className="rounded"
                    src={
                      getChatUser(currentUser as User, chat?.users as User[])
                        ?.profile
                    }
                    alt="user.profile"
                  />
                </div>
                <div className="flex flex-col items-start w-fit h-fit">
                  <div className="w-fit text-[13px] font-medium">
                    {
                      getChatUser(currentUser as User, chat?.users as User[])
                        ?.username
                    }
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        {!filteredChatList.length && (
          <span className="my-2 text-[14px]  px-3 py-1 w-full justify-center  flex font-medium">
            No chats found !
          </span>
        )}
      </div>
    </div>
  );
}

export default ChatSideBar