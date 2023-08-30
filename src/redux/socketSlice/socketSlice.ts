import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface SocketState {
  getSocket: () => Socket | null;
}

const initialState: SocketState = {
  getSocket: () => null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<() => Socket | null>) => {
      state.getSocket = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
