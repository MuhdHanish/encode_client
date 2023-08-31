import React from 'react';
import {  TbUsersPlus } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { User } from '../../../../dtos/User';
import { useNavigate } from 'react-router-dom';

interface Props {
  currentUser: User;
}

const OnLive: React.FC<Props> = ({currentUser}) => {
  const getSocket = useSelector((state: RootState) => state.socketReducer.getSocket); 
  const navigate = useNavigate();
  const socket = getSocket(); 
  return (
    <div className="flex w-full  p-3 h-fit justify-center items-center">
      <div className="flex  p-3  items-center gap-5 justify-between border rounded-md">
        <div className="flex w-fit h-fit items-center text-[13px]">On Live</div>
        <div className="flex text-primary hover:text-white hover:bg-primary transition duration-300 p-1 border rounded-md" onClick={()=>{socket?.emit("tutor-on-live", { user: currentUser });navigate(`/tutor/on-live`)}}>
          <TbUsersPlus style={{ fontSize: "19px" }} />
        </div>
      </div>
    </div>
  );
}

export default OnLive