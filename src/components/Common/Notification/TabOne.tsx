import React from 'react'
import { SmallUser } from '../../../dtos/User';
import { remove, unfollow } from '../../../utils/userUtils';

interface User {
  profile: string;
  username: string;
  role: string;
  email: string;
  followers: SmallUser[];
  following: SmallUser[];
}

interface Props {
  currentUser: User
}

const TabOne:React.FC<Props> = ({currentUser}) => {
  return (
    <div className="flex w-full h-full justify-center items-center text-[13px] p-3  overflow-hidden">
      <div className="flex overflow-y-auto  w-full max-h-[200px] flex-col gap-3 px-5">
        {currentUser?.role === "tutor" &&
          currentUser.followers.length > 0 &&
          currentUser?.followers.map((user, idx) => (
            <div
              className="w-full h-fit flex  p-3 items-center justify-center gap-5"
              key={idx}
            >
              <div className="flex w-full h-fit gap-3 items-center">
                <div className="flex w-7 h-7">
                  <img
                    className="rounded-sm"
                    src={user.profile}
                    alt="user.profile"
                  />
                </div>
                <div className="flex items-center w-fit h-fit">
                  {user?.username}
                </div>
              </div>
              <div className="flex items-center text-[11px] ">
                <button
                  className="p-1 border rounded-md text-danger"
                  onClick={() => {
                    remove(user?._id)
                      .then()
                      .catch((err) => console.log(err));
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        {currentUser?.role === "student" &&
          currentUser?.following.length > 0 &&
          currentUser?.following.map((user, idx) => (
            <div
              className="w-full h-fit flex  p-3 items-center justify-center gap-16 md:gap-5"
              key={idx}
            >
              <div className="flex w-fit h-fit gap-3 items-center">
                <div className="flex w-7 h-7">
                  <img
                    className="rounded-sm"
                    src={user.profile}
                    alt="user.profile"
                  />
                </div>
                <div className="flex items-center w-fit h-fit">
                  {user.username}
                </div>
              </div>
              <div className="flex items-center text-[11px] gap-2">
                <button
                  className="p-1 border rounded-md text-danger"
                  onClick={() => {
                    unfollow(user?._id)
                      .then()
                      .catch((err) => console.log(err));
                  }}>
                  Unfollow
                </button>
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