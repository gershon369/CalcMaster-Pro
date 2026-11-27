
import {
  FaUserEdit,
  FaHistory,
  FaHeart,
  FaCog,
  FaShieldAlt,
  FaDownload,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function QuickActions() {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const actionClass =
    "flex min-h-[64px] w-full items-center gap-3 rounded-2xl bg-white/10 px-4 py-4 text-left text-sm font-medium text-white transition hover:bg-white/20";

  return (
    <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7 shadow-xl backdrop-blur-xl">

      {/* Header */}
      <div className="mb-8 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600">
          ⚡
        </div>

        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

      </div>

      {/* Two Column Actions */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

        <button
          onClick={() => setEditOpen(true)}
          className={actionClass}
        >
          <FaUserEdit className="shrink-0 text-xl text-blue-400" />
          Edit Profile
        </button>

        <button className={actionClass}>
          <FaHistory className="shrink-0 text-xl text-green-400" />
          History
        </button>

        <button className={actionClass}>
          <FaHeart className="shrink-0 text-xl text-red-400" />
          Favorites
        </button>

        <Link
          to="/settings"
          className={actionClass}
        >
          <FaCog className="shrink-0 text-xl text-purple-400" />
          Settings
        </Link>

        <button className={actionClass}>
          <FaShieldAlt className="shrink-0 text-xl text-yellow-400" />
          Security
        </button>

        <button className={actionClass}>
          <FaDownload className="shrink-0 text-xl text-cyan-400" />
          Export Data
        </button>

        <button className={actionClass}>
          <FaMoon className="shrink-0 text-xl text-indigo-400" />
          Dark Mode
        </button>

        <button
          onClick={handleLogout}
          className="flex min-h-[64px] w-full items-center gap-3 rounded-2xl bg-red-600 px-4 py-4 text-left text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <FaSignOutAlt className="shrink-0 text-xl" />
          Logout
        </button>

      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
      />

    </div>
  );
}
