import { Course } from "../../dtos/Course";
import { User } from "../../dtos/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  user: User | null;
  selectedCourse: Course | null
}

const initialState: userState = {
  user: null,
  selectedCourse: null,
};

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
     state.selectedCourse = null; 
     state.user = null;
   },
    setSelectedCourse: (state,action: PayloadAction<Course|null>) => {
     state.selectedCourse = action.payload;
   }
  },
});

export default userSlice.reducer;
export const { saveUser, logout, setSelectedCourse } = userSlice.actions;