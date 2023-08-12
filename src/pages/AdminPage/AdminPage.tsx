import { Outlet } from "react-router-dom";
import AdminNavBar from "../../components/admin/AdminNavBar/AdminNavBar";

const AdminHome: React.FC = () => {
  return (
    <>
      <div className="bg-white bg-cover flex justify-between  items-center w-screen h-screen ">
        <div className="w-full h-full flex gap-1 flex-col  items-center ">
          <div className="w-full flex justify-center items-center">
            <AdminNavBar />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminHome;
