import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../dtos/User";

interface userState {
 user: User | null
}

const initialState: userState = {
 user: null
}


const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
   },
   logout: (state) => {
    state.user = null;
   }
  },
});

export default userSlice.reducer;
export const {saveUser,logout} = userSlice.actions;