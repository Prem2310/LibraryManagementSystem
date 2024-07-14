import LibStats from "../components/LibStats";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
export const LibStatsPage = () => {
  return (
    <>
      <Navbar/>
      <div className="flex"><div></div><AdminSidebar/><div><LibStats /></div></div>
      
    </>
  );
};
