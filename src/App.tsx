import { User } from "./dtos/User";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { Route, Routes } from "react-router-dom";
import { saveUser } from "./redux/userSlice/userSlice";
import { AdminPage, LoginPage, SignupPage, StudentPage,  TutorPage  } from "./pages";
import AuthProtected from "./components/Common/ProtectedRoute/AuthProtected";
import ProtectedRoute from "./components/Common/ProtectedRoute/ProtectedRoute";
import Loader from "./components/Common/Loader/Loader";
import { StudentCatalog, StudentHome, StudentSelectedCourse, StudentSelectedCourseGate,StudentSelectedLanguage,StudentProgress } from "./components/Student";
import { TutorDashboard, TutorHome, TutorSelectedCourse, TutorSessionGate } from "./components/Tutor";
import { CourseProtectedCaseOne, CourseProtectedCaseTwo } from "./components/Common/ProtectedCourseRoute/ProtetedCourseRoute";
import { AdminHome, CourseList, LanguageList, UsersList } from "./components/admin";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

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
  const [loading, setLoading] = useState<boolean>(true);
 useEffect(() => {
  setTimeout(() => setLoading(false), 100);
  }, []);

return loading ? (
  <Loader />
) : (
<>
  <Routes>
    <Route path="/" element={<ProtectedRoute element={ <Suspense fallback={<Loader/>}><StudentPage /></Suspense>} allowedRoles={["student"]} />} >
      <Route index={true} element={<StudentHome />} />
      <Route path="catalog" element={<StudentCatalog />} />
      <Route path="progress" element={<StudentProgress />} />
      <Route path="selected/language/:selectedLanguage" element={<StudentSelectedLanguage />} />
      <Route path="course/:selectedCourse" element={<CourseProtectedCaseOne element={<StudentSelectedCourseGate />} />}  />
      <Route path="selected/course/:selectedCourse" element={<CourseProtectedCaseTwo element={<StudentSelectedCourse />} />} />
    </Route>
    <Route path="/tutor" element={<ProtectedRoute element={<TutorPage />} allowedRoles={["tutor"]} />}>
      <Route index={true} element={<TutorHome />} />
      <Route path="section" element={<TutorSessionGate />} />
      <Route path="dashboard" element={<TutorDashboard />} />
      <Route path="selected/course/:selectedCourse" element={<TutorSelectedCourse/>} />
    </Route>
    <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} allowedRoles={["admin"]} />}>
      <Route index={true} element={<AdminHome/>} />
      <Route path="users" element={<UsersList/>} />
      <Route path="courses" element={<CourseList/>} />
      <Route path="languages" element={<LanguageList/>} />
    </Route>
    <Route path="/login" element={<AuthProtected element={<LoginPage />} />} />
    <Route path="/register" element={<AuthProtected element={<SignupPage />} />} />
    <Route path="*" element={<PageNotFound/>}/>
  </Routes>
</>

  );
}
export default App;
