import AdminSearchBooks from "../components/AdminSearchBooks";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
export const AdminSearchPage = () => {
  return (
    <>
      {" "}
      <Navbar />
      <div className="flex">
        <div>
          <AdminSidebar />
        </div>{" "}
        <div>
          <AdminSearchBooks />
        </div>
      </div>
    </>
  );
};
