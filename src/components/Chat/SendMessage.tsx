import React, {  useState } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri';
import { sendNewMessage } from '../../utils/chatUtils';
import { Message } from '../../dtos/Message';
import { Socket } from "socket.io-client";
import { Chat } from '../../dtos/Chat';


interface SendMessageProps {
  selectedChat: Chat | null;
  messages: Message[] | [];
  setMessages: (value: Message[]) => void;
  socket: Socket | null;
  containerRef: React.RefObject<HTMLDivElement>;
}

const SendMessage: React.FC<SendMessageProps> = ({selectedChat,setMessages,messages, socket,containerRef}) => {
  const [content, setContent] = useState<string>("");
  const sendMessage = (content: string) => {
    if (!content.length) { return }
    sendNewMessage(selectedChat?._id as string, content).then((res) => {
      setContent("");
      if (res) {
        socket?.emit("new-message", res);
        setMessages([...messages as Message[], res as Message]);
        if (containerRef?.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
       }
   }).catch(err => console.log(err));
  };
  return (
    <div className="flex w-full h-fit   rounded-sm gap-1">
      <div className="flex w-full h-[45px]  items-center justify-center ">
        <input
          type="text"
          value={content}
          onChange={(event)=>setContent(event.target.value)}
          placeholder="send message"
          className="appearance-none text-[15px] w-full bg-white border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary"
        />
      </div>
      <div className="flex w-fit h-fit ">
        <button
          onClick={()=>{sendMessage(content)}}
          className="w-[60px]  h-[45px] outline-none  text-primary flex justify-center items-center -translate-x-2  active:translate-x-0   active:-translate-y-2  transition duration-150">
          <RiSendPlaneFill style={{ fontSize: "23px" }} />
        </button>
      </div>
    </div>
  );
}

export default SendMessage