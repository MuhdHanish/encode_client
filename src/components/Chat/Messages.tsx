import React, {  useEffect, useState } from 'react'
import { Message } from '../../dtos/Message';
import { User } from '../../dtos/User';
import { isEqual } from 'lodash/fp';
import Loader from '../Common/Loader/Loader';
import { Socket } from "socket.io-client";


interface MessageProps {
  messages: Message[] | [];
  user?: User;
  setMessages: (value: Message[]) => void;
  socket: Socket | null;
  containerRef: React.RefObject<HTMLDivElement>;
}

const Messages: React.FC<MessageProps> = ({ messages, user, socket, setMessages, containerRef}) => {
    const formatTimestamp = (timestamp: Date) => {
      const date = new Date(timestamp);
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleTimeString("en-US", options);
    };
    const [expandedMessages, setExpandedMessages] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    setTimeout(() => {
      setLoading(false);
    }, 60);
    useEffect(() => {
      socket?.on("message-recieved", (newMessage: Message) => { setMessages([...messages, newMessage]); });
      if (containerRef?.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    },[containerRef, messages, setMessages, socket]);
  return (
    <>
      { !loading && messages?.length > 0 && (
        <div ref={containerRef} className="flex w-full h-full  overflow-y-scroll flex-col py-4 px-2   gap-2 text-gray-500">
          {messages?.map((message, idx: number) => {
            const isUserSender = isEqual(message?.sender, user);
            const isExpanded = expandedMessages?.includes(idx);
            const toggleExpand = () => {
              if (isExpanded) {
                setExpandedMessages(expandedMessages.filter((i) => i !== idx));
              } else {
                setExpandedMessages([...expandedMessages, idx]);
              }
            };

            return (
              <div
                className={`flex w-full justify-${
                  isUserSender ? "start" : "end"
                }`}
                key={idx}
              >
                <div
                  className={`flex max-w-lg h-fit flex-col
                   ${isUserSender ? "justify-start items-start rounded-bl-none" : "justify-end items-end rounded-br-none"}
                   p-1 px-4 border rounded-xl shadow-sm text-[14px]  bg-teal-50`}
                >
                  <div className="flex w-fit h-fit">
                    <div
                      style={{
                        wordWrap: "break-word",      
                        whiteSpace: "pre-wrap",
                        maxHeight: isExpanded ? "none" : "100px",
                        overflow: isExpanded ? "auto" : "hidden",
                      }}
                    >
                      {message?.content}
                    </div>
                  </div>
                  {(message?.content?.length as number) > 50 && (
                    <div
                      className="cursor-pointer text-primary text-[11px] mt-2"
                      onClick={toggleExpand}
                    >
                      {isExpanded ? " " : "Read more"}
                    </div>
                  )}
                  <div className="flex w-fit h-full text-[10px] text-gray-400">
                    {formatTimestamp(message?.createdAt as Date)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!loading && !messages?.length && (
        <div className="flex w-full h-[404px]  overflow-y-scroll flex-col justify-start items-center py-4 px-2   gap-2 ">
          <div className="flex px-2 p-1 justify-center items-center w-fit h-fit border rounded-md bg-teal-50 text-[13px] shadow-sm text-gray-400 ">
            No messages. . .
          </div>
        </div>
      )}
      {loading &&  (
        <Loader/>
      )}
    </>
  );
}

export default Messages