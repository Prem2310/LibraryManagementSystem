import { IoSearchSharp } from "react-icons/io5";


export default function Landing() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap- justify-between px-16 py-20 bg-white shadow-sm max-w-[541px] rounded-[40px] max-md:flex-wrap">
            <form className="flex-grow border-2">
            <label htmlFor="searchInput" className="sr-only">Search</label>
            <input 
                id="searchInput"
                type="text" 
                placeholder="Search" 
                className="w-full bg-transparent text-xl leading-6 text-stone-300 focus:outline-none" 
            />
            </form>
            <div className="flex gap-2.5 items-center my-auto text-orange-500 text-2xl">
            <IoSearchSharp />

            </div>
            </div>

        </div>
    )
}