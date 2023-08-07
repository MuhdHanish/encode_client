import React, {useState} from "react";
import { User } from "../../../dtos/User";

interface CardProps {
  user: User,
  blockUser: (id:string) => void
  unBlockUser: (id:string) => void
}

export const UsersCard:React.FC<CardProps> = ({user,blockUser,unBlockUser}) => {
  const [drop, setDrop] = useState<boolean>(false);

 return (
   <div className="container ">
     <div className="card2 relative ">
       {drop && (
         <div className="absolute left-0.5 top-0.5 w-fti h-fit text-[13px] border  px-2  rounded-br-md">
           {user.status ? (
             <button
               onClick={() => blockUser(user._id)}
               className="text-danger shadow-sm "
             >
               Block
             </button>
           ) : (
             <button
               onClick={() => unBlockUser(user._id)}
               className="text-green-400 shadow-sm "
             >
               Unblock
             </button>
           )}
         </div>
       )}
       <h3>{user.username}</h3>
       <p className="text-[13px] flex flex-wrap my-1">{user.email}</p>
       <div className="hit flex justify-start gap-2 text-[12px] my-1">
         <span>{user.role}</span>|
         {user.status ? (
           <span className="text-green-400">active</span>
         ) : (
           <span className="text-danger">blocked</span>
         )}
       </div>
       <div className="go-corner" onClick={() => setDrop((state) => !state)}>
         <button className="go-arrow">→</button>
       </div>
     </div>
   </div>
 );
};

export const CoruseCard:React.FC = () => {
  return (
    <div className="container">
      <a className="card4" href="#">
        <h3>This is option 4</h3>
        <p className="small">
          Card description with lots of great facts and interesting details.
        </p>
        <div className="dimmer"></div>
        <div className="go-corner" >
          <div className="go-arrow">→</div>
        </div>
      </a>
    </div>
  );
};

