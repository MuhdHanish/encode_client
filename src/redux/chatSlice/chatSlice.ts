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
    }
  },
});

export const { setChats } = chatSlice.actions;

export default chatSlice.reducer;
