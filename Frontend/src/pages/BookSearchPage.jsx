import SearchBooks from "../components/SearchBooks";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const BookSearchPage = () => {
  return (
    <div className="flex flex-col h-screen ">
      <Navbar />
      <div className="flex flex-1 overflow-hidden ">
        <Sidebar />
        <div className="flex-1 overflow-x-hidden">
          <SearchBooks />
        </div>
      </div>
    </div>
  );
};
