import { axiosAuthorized } from "./config";
import { store } from "../redux/store";
import { addNewChat,setChats } from "../redux/chatSlice/chatSlice";
import { Chat } from "../dtos/Chat";
import { Message } from "../dtos/Message";

interface ResponseData {
  chats?: Chat[];
  chat?: Chat;
  messages?: Message[];
  newMessage?: Message;
}

export const fetchChats = async (): Promise<Chat[] | Error> => {
  try {
    const response = await axiosAuthorized.get(`/get/chats`);
    const { chats } = response.data as ResponseData;
    store.dispatch(setChats(chats as Chat[]));
    return chats as Chat[];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const accessChat = async (id: string): Promise<Chat | Error> => {
  try {
    const response = await axiosAuthorized.post(`/access/chat/${id}`);
    const { chat } = response.data as ResponseData;
    store.dispatch(addNewChat(chat as Chat));
    return chat as Chat;
  } catch (error) {
    return Promise.reject(error);
  }
};


export const fetchMessages = async (id: string): Promise<Message[] | Error> => {
  try {
    const response = await axiosAuthorized.get(`/get/messages/${id}`);
    const { messages } = response.data as ResponseData;
    return messages as Message[];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sendMessage = async (id: string, content: string): Promise<Message | Error> => {
  try {
    const response = await axiosAuthorized.post(`/send/message/${id}`,{content});
    const { newMessage } = response.data as ResponseData;
    return newMessage as Message;
  } catch (error) {
    return Promise.reject(error);
  }
};