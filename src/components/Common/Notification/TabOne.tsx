import React from 'react'
import { User } from '../../../dtos/User';
import { remove, unfollow } from '../../../utils/userUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Chat } from '../../../dtos/Chat';
import { setSelectedChat } from '../../../redux/chatSlice/chatSlice';
import { useNavigate } from 'react-router-dom';
import { createChat } from '../../../utils/chatUtils';

interface Props {
  currentUser: User
}

const TabOne: React.FC<Props> = ({ currentUser }) => {
  const chats = useSelector((state: RootState) => state.chatReducer.chats);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToChat = (userId: string) => {
   const isUserInChat = chats?.some((chat: Chat) =>
     [userId, currentUser._id]?.every((id:string) =>
       (chat?.users as User[])?.some((user: User) => user?._id.toString() === id)
     )
    );
    if (isUserInChat) {
      const chatToSet = chats?.find((chat: Chat) =>
        [userId, currentUser._id]?.every((id: string) =>
          (chat?.users as User[])?.some(
            (user: User) => user?._id.toString() === id
          )
        )
      );
      dispatch(setSelectedChat(chatToSet as Chat));
      if (currentUser.role === "student") {
        return navigate(`/chat`);
      } else {
        return navigate(`/tutor/chat`);
      }
    } else {
      createChat(userId).then((res) => {
        if (res) {
          dispatch(setSelectedChat(res as Chat));
          if (currentUser.role === "student") {
            return navigate(`/chat`);
          } else {
            return navigate(`/tutor/chat`);
          }
        }
      }).catch(err => console.log(err));
    }
  };  

  return (
    <div className="flex w-full h-full justify-center items-center text-[13px] p-3  overflow-hidden">
      <div className="flex overflow-y-auto  w-full max-h-[200px] flex-col gap-3 px-5">
        {currentUser?.role === "tutor" &&
          currentUser.followers.length > 0 &&
          currentUser?.followers.map((user, idx) => (
            <div
              className="w-full h-fit flex  p-3 items-center justify-center gap-5 border rounded-md"
              key={idx}
            >
              <div className="flex w-full h-fit gap-3 items-center">
                <div className="flex w-7 h-7">
                  <img
                    className="rounded-sm"
                    src={user?.profile}
                    alt="user.profile"
                  />
                </div>
                <div className="flex items-center w-fit h-fit">
                  {user?.username}
                </div>
              </div>
              <div className="flex items-center text-[10px] gap-1 ">
                <button
                  className="p-1  text-danger border rounded-md"
                  onClick={() => {
                    remove(user?._id)
                      .then()
                      .catch((err) => console.log(err));
                  }}
                >
                  Remove
                </button>
                <button className="p-1 border rounded-md " onClick={()=>{goToChat(user._id)}}>Message</button>
              </div>
            </div>
          ))}
        {currentUser?.role === "student" &&
          currentUser?.following.length > 0 &&
          currentUser?.following.map((user, idx) => (
            <div
              className="w-full h-fit flex  p-3 items-center justify-center gap-5 border rounded-md"
              key={idx}
            >
              <div className="flex w-full h-fit gap-3 items-center">
                <div className="flex w-7 h-7">
                  <img
                    className="rounded-sm"
                    src={user?.profile}
                    alt="user.profile"
                  />
                </div>
                <div className="flex items-center w-fit h-fit">
                  {user.username}
                </div>
              </div>
              <div className="flex items-center text-[10px] gap-2">
                <button
                  className="p-1  text-danger border rounded-md"
                  onClick={() => {
                    unfollow(user?._id)
                      .then()
                      .catch((err) => console.log(err));
                  }}
                >
                  Unfollow
                </button>
                <button className="p-1 border rounded-md" onClick={()=>{goToChat(user._id)}}>Message</button>
              </div>
            </div>
          ))}
        {currentUser?.role === "student" &&
          currentUser.following.length < 1 && (
            <div className="w-full h-fit flex  p-3 items-center justify-center gap-16 md:gap-5">
              No users found !
            </div>
          )}
        {currentUser?.role === "tutor" && currentUser.followers.length < 1 && (
          <div className="w-full h-fit flex  p-3 items-center justify-center gap-16 md:gap-5">
            No users found !
          </div>
        )}
      </div>
    </div>
  );
}

export default TabOne