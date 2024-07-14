import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UserShelf from "../components/UserShelf";

export const UserBooksPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div>
          {" "}
          <UserShelf />
        </div>
      </div>
    </>
  );
};
