import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../dtos/User";

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
    removeNotifications:(state) => {
      state.notifications = []
    }
  },
});

export const { addNotification , removeNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;

