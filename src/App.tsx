import {  Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path={"/"}  element={<HomePage />} /> */}
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<SignupPage />} />
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
