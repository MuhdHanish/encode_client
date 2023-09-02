import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "../../dtos/Chat";

interface ChatState {
  selectedChat: Chat | null
  chats: Chat[];
}

const initialState: ChatState = {
  chats: [],
  selectedChat: null
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    addNewChat: (state, action: PayloadAction<Chat>) => {
      if (state.chats) {
        state.chats.push(action.payload);
      } else {
        state.chats = [action.payload]; 
      }
    },
    setSelectedChat: (state, action: PayloadAction<Chat|null>) => {
      state.selectedChat = action.payload
    },
  }
});

export const { setChats,addNewChat,setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;
