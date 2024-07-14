import { IoSearchSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { GiBookshelf } from "react-icons/gi";

export default function Sidebar() {
  return (
    <div className="w-[20vw]  flex flex-col justify-between">
      <div className="flex flex-col m-auto mt-[15vh] gap-[5vh]">
        <div className="sidebar-links flex  text-xl gap-[1vw]">
          <div className="text-stone-500   ">
            <IoMdHome className="h-[5vh] w-[5vh]" />
          </div>
          <div>
            {" "}
            <a
              href="#"
              className=" text-stone-500 font-normal align-baseline  focus:text-black focus:font-semibold hover:text-black ">
              Home
            </a>{" "}
          </div>
        </div>
        <div className="sidebar-links flex  text-xl gap-[1vw]">
          <div className="text-stone-500  ">
            <IoSearchSharp className="h-[5vh] w-[5vh]" />
          </div>
          <a
            href="#"
            className=" text-stone-500 font-normal align-baseline focus:text-black focus:font-semibold hover:text-black ">
            Search
          </a>{" "}
        </div>
        <div className="sidebar-links flex font-normal text-xl gap-[1vw]">
          <div className="text-stone-500 ">
            {" "}
            <GiBookshelf className="h-[5vh] w-[5vh]" />
          </div>
          <a
            href="#"
            className=" text-stone-500 font-normal align-baseline focus:text-black focus:font-semibold hover:text-black ">
            My Shelf
          </a>{" "}
        </div>
      </div>
      <div className="text-stone-500  flex flex-col mx-auto mb-[3vh]   gap-[1vh]">
        <a href="">About</a>
        <a href="">Support</a>
        <a href="">Terms & Conditions</a>
      </div>
    </div>
  );
}
