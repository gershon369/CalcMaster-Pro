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

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
          ⚡
        </div>

        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

      </div>

      <div className="grid gap-4">

        <button
  onClick={() => setEditOpen(true)}
  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition"
>
  <FaUserEdit className="text-blue-400 text-xl" />
  Edit Profile
</button>

        <button className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition">
          <FaHistory className="text-green-400 text-xl" />
          History
        </button>

        <button className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition">
          <FaHeart className="text-red-400 text-xl" />
          Favorites
        </button>

        <Link
          to="/settings"
          className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition"
        >
          <FaCog className="text-purple-400 text-xl" />
          Settings
        </Link>

        <button className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition">
          <FaShieldAlt className="text-yellow-400 text-xl" />
          Security
        </button>

        <button className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition">
          <FaDownload className="text-cyan-400 text-xl" />
          Export Data
        </button>

        <button className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition">
          <FaMoon className="text-indigo-400 text-xl" />
          Dark Mode
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 bg-red-600 hover:bg-red-700 rounded-2xl p-4 transition"
        >
          <FaSignOutAlt className="text-white text-xl" />
          Logout
        </button>

      </div>
<EditProfileModal
  isOpen={editOpen}
  onClose={() => setEditOpen(false)}
/>
    </div>
    
  );
}