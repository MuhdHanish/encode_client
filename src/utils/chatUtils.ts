import { fetchChats, accessChat, fetchMessages, sendMessage } from "../api/chatApi";
import { Message } from "../dtos/Message";
import { Chat } from "../dtos/Chat";
import { User } from "../dtos/User";

export const getChatUser = (currentUser:User, users:User[]) => {
  return users[0]?._id === currentUser?._id ? users[1] : users[0];
}; 

export const getChats = async (): Promise<Chat[] | Error> => {
  try {
    const chats = await fetchChats();
    return chats;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createChat = async (id: string): Promise<Chat | Error> => {
  try {
    const chat = await accessChat(id);
    return chat;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getMessages = async (id:string): Promise<Message[] | Error> => {
  try {
    const messages = await fetchMessages(id);
    return messages;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendNewMessage = async (id: string, content: string): Promise<Message | Error> => {
  try {
    const newMessage = await sendMessage(id, content);
    return newMessage;
  } catch (error) {
    return Promise.reject(error);
  }
}