import Landing from "../components/Landing";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar /> <Landing />
      </div>
    </div>
  );
};
