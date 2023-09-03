import React from 'react';
import { User } from '../../dtos/User';

interface ChatProfileProps {
  user: User;
}

const ChatProfile: React.FC<ChatProfileProps> = ({ user}) => {
  return (
      <div className="flex w-full h-fit px-3 p-2 border-b shadow-sm ">
        <div className="flex w-fit h-fit ">
          <img src={user.profile} className="w-10 h-10 rounded" alt="" />
        </div>
        <div className="flex flex-col w-full h-fit px-3 ">
          <div className="flex w-full h-fit text-[14px] font-medium">
            {user.username}
          </div>
          <div className="flex w-full h-fit text-[11px]">{user.email}</div>
        </div>
      </div>
  );
}

export default ChatProfile