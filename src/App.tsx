import { User } from "./dtos/User";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { saveUser } from "./redux/userSlice/userSlice";
import { LoginPage, SignupPage, StudentPage,  TutorPage  } from "./pages";
import AuthProtected from "./components/Common/ProtectedRoute/AuthProtected";
import ProtectedRoute from "./components/Common/ProtectedRoute/ProtectedRoute";
import { StudentCatalog, StudentHome, StudentSelectedCourse, StudentSelectedCourseGate } from "./components/Student";
import { TutorHome, TutorSession } from "./components/Tutor";
import { RootState } from "./redux/store";
import { useCallback, useEffect } from "react";

function App() {
  
  const dispatch = useDispatch();
  const saveUserFromLocalStorage = useCallback(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(saveUser(JSON.parse(user) as User));
    }
  }, [dispatch]);
  useEffect(() => {
    saveUserFromLocalStorage(); 
  }, [saveUserFromLocalStorage]);

  const { selectedCourseId } = useSelector((state: RootState) => state.userReducer);
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<StudentPage />} allowedRoles={["student"]} />} >
           <Route index={true} element={<StudentHome/>}/>
          <Route path="catalog" element={<StudentCatalog />} />
          <Route path={`course/${selectedCourseId as string}`} element={<StudentSelectedCourseGate/>} />
          <Route path={`course/started/${selectedCourseId as string}`} element={<StudentSelectedCourse/>} />
        </Route>
        <Route path="/tutor" element={<ProtectedRoute element={<TutorPage />} allowedRoles={["tutor"]} />}>
          <Route index={true} element={<TutorHome/>}/>
          <Route path="session" element={<TutorSession/>}/>
        </Route>
        <Route path="/login" element={<AuthProtected element={<LoginPage />} />}/>
        <Route path="/register"element={<AuthProtected element={<SignupPage />} />} />
      </Routes>
    </>
  );
}
export default App;
