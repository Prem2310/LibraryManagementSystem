import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Navbar() {
  const { isSignedIn } = useUser();

  const Navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src="https://img.icons8.com/ios/452/books.png"
              alt="logo"
              className="h-8 w-8 ml-2 hover:scale-110"
            />
            <span className="text-2xl font-bold text-orange-600  ml-1 hover:text-orange-500">
              Public Library
            </span>
          </div>

          <div className="flex items-center">
            {isSignedIn ? (
              <>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                  <span className="absolute left-3 top-2 text-gray-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </span>
                </div>

                <button className="ml-4 text-gray-500 hover:text-orange-600 focus:outline-none focus:text-orange-600">
                  <IoNotificationsOutline className="h-6 w-6" />
                </button>
                <UserButton />
              </>
            ) : (
              <>
                <button
                  onClick={() => Navigate("/signup")}
                  className="ml-4 text-gray-500 hover:text-orange-600 focus:outline-none focus:text-orange-600"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => Navigate("/signin")}
                  className="ml-4 text-gray-500 hover:text-orange-600 focus: focus:text-orange-600 "
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
