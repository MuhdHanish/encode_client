import { User } from "./dtos/User";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { saveUser } from "./redux/userSlice/userSlice";
import TutorHome from "./components/Tutor/TutorHome/TutorHome";
import StudentHome from "./components/Student/StudentHome/StudentHome";
import TutorSession from "./components/Tutor/TutorSession/TutorSession";
import { LoginPage, SignupPage, StudentPage,  TutorPage  } from "./pages";
import AuthProtected from "./components/Common/ProtectedRoute/AuthProtected";
import ProtectedRoute from "./components/Common/ProtectedRoute/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  if (user) {
    dispatch(saveUser(JSON.parse(user) as User));
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<StudentPage />} allowedRoles={["student"]} />} >
           <Route index={true} element={<StudentHome/>}/>
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
