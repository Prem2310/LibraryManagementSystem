import AdminSearchBooks from "../components/AdminSearchBooks";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
export const AdminSearchPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar />
          <div className="flex-1 overflow-auto p-4">
            <AdminSearchBooks />
          </div>
        </div>
      </div>
    </>
  );
};
