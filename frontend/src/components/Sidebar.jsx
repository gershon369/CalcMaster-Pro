import {
  FaTachometerAlt,
  FaCalculator,
  FaHistory,
  FaStar,
  FaRobot,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 p-6">

      <h2 className="text-2xl font-bold text-white mb-10">
        CalcMaster Pro
      </h2>

      <div className="space-y-4">

        <button className="flex items-center gap-3 text-white">
          <FaTachometerAlt />
          Dashboard
        </button>

        <button className="flex items-center gap-3 text-white">
          <FaCalculator />
          Calculators
        </button>

        <button className="flex items-center gap-3 text-white">
          <FaHistory />
          History
        </button>

        <button className="flex items-center gap-3 text-white">
          <FaStar />
          Favorites
        </button>

        <button className="flex items-center gap-3 text-white">
          <FaRobot />
          AI Assistant
        </button>

        <button className="flex items-center gap-3 text-white">
          <FaCog />
          Settings
        </button>

        <button className="flex items-center gap-3 text-red-400">
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}