import React from 'react';
import { Chat } from '../../dtos/Chat';
import { getChatUser } from '../../utils/chatUtils';
import { User } from '../../dtos/User';
import { Message } from '../../dtos/Message';

interface ChatSideBarProps {
  chats?: [] | Chat[]
  currentUser?: User
}

const ChatSideBar:React.FC<ChatSideBarProps> = ({chats, currentUser}) => {
  return (
    <div
      className={`${"w-0  lg:w-1/5 shadow-2xl"} flex flex-col   h-full  lg:p-2 lg:gap-2 `}
    >
      <div className="w-full h-fit flex items-center justify-center bg-white p-3 font-semibold text-[18px] hover:text-shadow-black transition-all">
        Chats
      </div>
      <div className="w-full h-full flex flex-col items-center  overflow-y-auto px-5 ">
        {chats?.map((chat, index) => (
          <div
            className="my-2 text-[14px]  p-1 w-full justify-center  flex transition 
              duration-500 hover:scale-105 cursor-pointer font-medium
               border-gray 
              hover:shadow-lg hover:text-primary "
            key={index}
          >
            <div className="flex w-full h-fit gap-3 items-center">
              <div className="flex w-7 h-7">
                <img
                  className="rounded-sm"
                  src={
                    getChatUser(currentUser as User, chat?.users as User[])
                      ?.profile
                  }
                  alt="user.profile"
                />
              </div>
              <div className="flex flex-col items-start w-fit h-fit">
                <div className="w-fit">
                  {
                    getChatUser(currentUser as User, chat?.users as User[])
                      ?.username
                  }
                </div>
                <div className="text-[11px] w-fit">
                  {((chat?.latestMessage as Message)?.content?.slice(
                    0,
                    11
                  ) as string) + "..."}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatSideBar