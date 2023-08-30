import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SmallUser } from "../../dtos/User";
interface User {
  _id: string;
  username: string;
  email: string;
  profile: string;
  role: string;
  status: boolean;
  following: SmallUser[];
  followers: SmallUser[];
}

export interface Notification {
  tutor: User;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

