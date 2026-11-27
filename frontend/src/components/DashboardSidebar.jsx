
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalculator,
  FaHistory,
  FaHeart,
  FaRobot,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: FaHome },
  { name: "Calculators", path: "/calculators", icon: FaCalculator },
  { name: "History", path: "/history", icon: FaHistory },
  { name: "Favorites", path: "/favorites", icon: FaHeart },
  { name: "AI Assistant", path: "/ai", icon: FaRobot },
  { name: "Settings", path: "/settings", icon: FaCog },
];

export default function DashboardSidebar() {
  return (
    <aside className="
      fixed left-0 top-0 z-50
      flex h-screen w-64 shrink-0 flex-col
      overflow-hidden
      border-r border-purple-500/20
      bg-[#100b20]/95
      p-5 text-white
      backdrop-blur-xl
    ">
      {/* BRAND */}
      <div className="mb-10 shrink-0">
        <h2 className="text-2xl font-bold tracking-tight text-purple-400">
          CalcMaster Pro
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          Smart Calculation Platform
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3
                rounded-xl px-4 py-3
                text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "border border-purple-400/20 bg-gradient-to-r from-purple-700/40 to-violet-600/20 text-purple-200 shadow-lg shadow-purple-950/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <Icon className="text-lg" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="shrink-0 border-t border-white/10 pt-5">
        <button
          type="button"
          className="
            flex w-full items-center gap-3
            rounded-xl px-4 py-3
            text-sm font-medium text-red-400
            transition hover:bg-red-500/10
          "
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </button>
      </div>
    </aside>
  );
}
