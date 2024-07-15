import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UserShelf from "../components/UserShelf";

export const UserBooksPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen ">
        <Navbar />
        <div className="flex flex-1 overflow-hidden ">
          <Sidebar />
          <div className="flex-1 overflow-x-hidden">
            <UserShelf />
          </div>
        </div>
      </div>
    </>
  );
};
