
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaCalculator,
  FaBrain,
  FaGraduationCap,
  FaUser,
  FaCog,
  FaGlobe,
  FaSignOutAlt,
  FaChevronRight,
  FaCrown,
} from "react-icons/fa";

export default function ProfileSidebar({
  activeTab,
  setActiveTab,
}) {
  const navigate = useNavigate();

  const [localTab, setLocalTab] = useState(
    activeTab || "profile"
  );

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  const selectedTab = activeTab ?? localTab;

  const profileImage =
    localStorage.getItem("profileImage") ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User"
    )}&background=5541a8&color=ffffff`;

  const menuGroups = [
    {
      title: "MAIN MENU",
      items: [
        { id: "dashboard", label: "Dashboard", icon: FaHome },
        { id: "calculators", label: "Calculators", icon: FaCalculator },
        { id: "memory", label: "AI Memory", icon: FaBrain },
        { id: "learning", label: "Learning Lab", icon: FaGraduationCap },
      ],
    },
    {
      title: "ACCOUNT SETTINGS",
      items: [
        { id: "profile", label: "My Profile", icon: FaUser },
        { id: "settings", label: "Settings", icon: FaCog },
        { id: "language", label: "Language", icon: FaGlobe },
      ],
    },
  ];

  const handleTabChange = (id) => {
    setLocalTab(id);
    setActiveTab?.(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="
      sticky top-0 hidden lg:flex
      w-[270px] h-screen shrink-0
      flex-col overflow-hidden
      border-r border-violet-400/15
      bg-[#0B0B20]
      text-white
    ">

      {/* LOGO */}

      <div className="px-7 pt-8 pb-9">

        <div className="flex items-center gap-3">

          <img
            src="/logo.png"
            alt="CalcMaster Pro"
            className="w-11 h-11 object-contain"
          />

          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              Calc<span className="text-violet-400">Master</span>
            </h1>

            <p className="text-[10px] tracking-[2px] text-slate-500 uppercase">
              Pro Workspace
            </p>
          </div>

        </div>

      </div>

      {/* NAVIGATION */}

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4">

        {menuGroups.map((group) => (
          <div key={group.title} className="mb-8">

            <p className="px-4 mb-4 text-[10px] font-bold tracking-[2px] text-slate-500">
              {group.title}
            </p>

            <div className="space-y-2">

              {group.items.map((item) => {
                const Icon = item.icon;
                const active = selectedTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabChange(item.id)}
                    className={`
                      group relative flex w-full
                      items-center gap-3 rounded-xl
                      px-4 py-3.5 text-left
                      transition-all duration-200
                      ${
                        active
                          ? "bg-gradient-to-r from-violet-600/25 to-blue-600/10 text-white border border-violet-400/20 shadow-lg shadow-violet-950/20"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                      }
                    `}
                  >

                    {active && (
                      <span className="
                        absolute left-0 top-2 bottom-2
                        w-1 rounded-r-full
                        bg-violet-400
                      " />
                    )}

                    <div className={`
                      flex h-9 w-9 items-center justify-center
                      rounded-lg transition
                      ${
                        active
                          ? "bg-violet-500/20 text-violet-300"
                          : "bg-white/[0.04] text-slate-500 group-hover:text-violet-300"
                      }
                    `}>
                      <Icon size={15} />
                    </div>

                    <span className="flex-1 text-sm font-semibold">
                      {item.label}
                    </span>

                    <FaChevronRight
                      size={10}
                      className={`
                        transition
                        ${
                          active
                            ? "text-violet-400"
                            : "text-slate-600 group-hover:translate-x-1"
                        }
                      `}
                    />

                  </button>
                );
              })}

            </div>

          </div>
        ))}

      </div>

      {/* BOTTOM USER CARD */}

      <div className="p-4 border-t border-white/[0.07]">

        <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/10 to-blue-500/[0.04] p-4">

          <div className="flex items-center gap-3">

            <img
              src={profileImage}
              alt="User"
              className="w-11 h-11 rounded-full border-2 border-violet-400/60 object-cover"
            />

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-bold text-white">
                {user?.name || "User"}
              </p>

              <p className="truncate text-[11px] text-slate-400">
                {user?.email || ""}
              </p>

            </div>

          </div>

          <div className="mt-4 flex items-center justify-between">

            <span className="flex items-center gap-2 text-xs text-violet-300">
              <FaCrown />
              {user?.premium ? "Premium Plan" : "Free Plan"}
            </span>

            <span className="h-2 w-2 rounded-full bg-emerald-400" />

          </div>

        </div>

        {/* LOGOUT */}

        <button
          type="button"
          onClick={handleLogout}
          className="
            mt-4 flex w-full items-center gap-3
            rounded-xl border border-red-500/10
            bg-red-500/[0.05] px-4 py-3.5
            text-sm font-semibold text-red-400
            transition hover:bg-red-500/10
          "
        >
          <FaSignOutAlt />
          Logout
        </button>

        <p className="mt-4 text-center text-[10px] text-slate-600">
          CalcMaster Pro © 2026
        </p>

      </div>

    </aside>
  );
}
