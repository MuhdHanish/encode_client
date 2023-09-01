import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "../../dtos/Chat";

interface ChatState {
  chats: Chat[];
}

const initialState: ChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    addNewChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
  },
});

export const { setChats, addNewChat } = chatSlice.actions;

export default chatSlice.reducer;
