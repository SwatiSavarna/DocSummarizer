import { useState } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
const { fetchUserProfile } = useContext(UserContext);
useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <div className="min-h-screen bg-red-50">
      {/* Navbar */}
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        {/* Sidebar */}
        <SideMenu
          activeMenu={activeMenu}
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* Right content */}
        <main className="flex-1 p-6 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
