import {  Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path={"/"}  element={<HomePage />} /> */}
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
