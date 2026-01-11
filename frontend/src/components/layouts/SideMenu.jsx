import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu, isOpen, closeSidebar }) => {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  const handleClick = (path) => {
    if (path === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
    } else {
      navigate(path);
    }

    // ✅ Close sidebar ONLY on mobile
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  return (
    <aside
      className={`
        fixed top-[60px] left-0 h-[calc(100vh-60px)] w-64 bg-white  z-40
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* Profile */}
      <div className="flex flex-col items-center gap-3 p-6 ">
        <CharAvatar
          fullName={user?.fullName}
          width="w-20"
          height="h-20"
          style="text-xl"
        />
        <h5 className="font-medium">{user?.fullName}</h5>
      </div>

      {/* Menu items */}
      <div className="p-4">
        {SIDE_MENU_DATA.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.path)}
            className={`
              w-full flex items-center gap-4 px-4 py-3 rounded-lg mb-2
              ${activeMenu === item.label
                ? "bg-blue-200 text-black"
                : "text-gray-700 hover:bg-gray-100"}
            `}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default SideMenu;
