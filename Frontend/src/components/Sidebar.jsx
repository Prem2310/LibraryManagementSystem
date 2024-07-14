import { IoSearchSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";

export default function Sidebar() {
  return (
    <div
      className="w-[15vw] h-[100vh] bg-orange-200">
      <div className="flex flex-col">
        <div className="sidebar-links flex">
          <div className="text-orange-500">
            <IoMdHome />
          </div>
          <a>Home</a>{" "}
        </div>
        <div className="sidebar-links flex">
          <div className="text-orange-500">
            <IoSearchSharp />
          </div>
          <a>Search</a>{" "}
        </div>
        <div className="sidebar-links flex">
          <div className="text-orange-500">
            {" "}
            <GiBookshelf className="" />
          </div>
          <a>My Shelf</a>{" "}
        </div>
      </div>
    </div>
  );
}
