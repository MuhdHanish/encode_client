import { User } from "../../dtos/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  user: User | null;
  selectedCourseId: string | null
}

const initialState: userState = {
  user: null,
  selectedCourseId: null
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
   },
    logout: (state) => {
     localStorage.removeItem("accessToken");
     localStorage.removeItem("refreshToken");
     localStorage.removeItem("user");
     state.selectedCourseId = null; 
     state.user = null;
   },
    setSelectedCourseId: (state,action: PayloadAction<string|null>) => {
     state.selectedCourseId = action.payload;
   }
  },
});

export default userSlice.reducer;
export const {saveUser,logout,setSelectedCourseId } = userSlice.actions;