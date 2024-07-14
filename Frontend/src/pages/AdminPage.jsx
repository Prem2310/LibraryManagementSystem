import BookForm from "../components/BookForm";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";

export const AdminPage = () => {
  return (
    <div >
      <Navbar />
      <div className="flex">
        <AdminSidebar /> <BookForm />
      </div>
    </div>
  );
};
