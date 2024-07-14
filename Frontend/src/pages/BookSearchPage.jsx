import SearchBooks from "../components/SearchBooks";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const BookSearchPage = () => {
  return (
    <div>
      <Navbar />{" "}
      <div className="flex">
        <div></div>
        <Sidebar />
        <div>
          {" "}
          <SearchBooks />
        </div>
      </div>
    </div>
  );
};
