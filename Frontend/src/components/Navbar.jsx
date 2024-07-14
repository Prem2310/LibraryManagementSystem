export default function Navbar() {
  return (
    <div className=" h-[10vh] flex justify-between ">
      <div className="nav-left flex">
        <div
          className="  h-[7vh] w-[14vw]
 self-center bg-orange-100 pt-1 ml-2 text-center text-2xl">
          Public Library
        </div>
      </div>
      <div className="nav-right flex gap-1 ">
        <button className="  w-[8vw] h-[7vh] text-xl font-semibold bg-orange-100 text-orange-600 border border-orange-600 self-center rounded-lg hover:bg-orange-600 hover:text-white">
          Login
        </button>
        <button className="  w-[8vw] h-[7vh] text-xl font-semibold bg-orange-100 text-orange-600 border border-orange-600 self-center rounded-lg m-5 hover:bg-orange-600 hover:text-white">
          Sign In
        </button>
      </div>
    </div>
  );
}
