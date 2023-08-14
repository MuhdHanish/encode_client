import { Course } from "../../dtos/Course";
import { Language } from "../../dtos/Language";
import { User } from "../../dtos/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  user: User | null;
  selectedCourse: Course | null
  selectedLanguage: Language | null
}

const initialState: userState = {
  user: null,
  selectedCourse: null,
  selectedLanguage: null
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
   },
    setSelectedLanguage: (state, action: PayloadAction<Language| null >) => {
     state.selectedLanguage = action.payload;
   }
  },
});

export default userSlice.reducer;
export const { saveUser, logout, setSelectedCourse, setSelectedLanguage } = userSlice.actions;