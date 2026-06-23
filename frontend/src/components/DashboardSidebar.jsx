import { Link } from "react-router-dom";
import {
  FaHome,
  FaCalculator,
  FaHistory,
  FaHeart,
  FaRobot,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function DashboardSidebar() {
  return (
    <div
      className="
      w-64
      min-h-screen
      bg-black/50
      backdrop-blur-xl
      border-r
      border-white/10
      p-5
      "
    >
      <h2 className="text-2xl font-bold text-purple-400 mb-8">
        CalcMaster Pro
      </h2>

      <div className="space-y-2">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl text-white hover:bg-white/10"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/calculators"
          className="flex items-center gap-3 p-3 rounded-xl text-white hover:bg-white/10"
        >
          <FaCalculator />
          Calculators
        </Link>

        <Link
          to="/history"
          className="flex items-center gap-3 p-3 rounded-xl text-white hover:bg-white/10"
        >
          <FaHistory />
          History
        </Link>

        <Link
          to="/favorites"
          className="flex items-center gap-3 p-3 rounded-xl text-white hover:bg-white/10"
        >
          <FaHeart />
          Favorites
        </Link>

        <Link
          to="/ai"
          className="flex items-center gap-3 p-3 rounded-xl text-white hover:bg-white/10"
        >
          <FaRobot />
          AI Assistant
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 p-3 rounded-xl text-white hover:bg-white/10"
        >
          <FaCog />
          Settings
        </Link>

        <button
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-white/10"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </div>
  );
}