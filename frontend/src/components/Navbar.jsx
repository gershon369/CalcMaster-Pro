
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaUser,
  FaTachometerAlt,
  FaCog,
  FaBrain,
  FaGraduationCap,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight,
  FaHistory,
  FaBookmark,
  FaCrown,
  FaBell,
  FaShieldAlt,
  FaLifeRing,
  FaRobot,
} from "react-icons/fa";

// ==========================================
// ACCOUNT MENU ITEMS
// ==========================================

const accountGroups = [
  [
    {
      name: "My Profile",
      description: "Personal information",
      icon: FaUser,
      path: "/profile",
    },
    {
      name: "Dashboard",
      description: "Your activity and statistics",
      icon: FaTachometerAlt,
      path: "/dashboard",
    },
    {
      name: "Calculation History",
      description: "Previous calculations",
      icon: FaHistory,
      path: "/calculation-history",
    },
    {
      name: "Saved & Favorites",
      description: "Saved formulas and tools",
      icon: FaBookmark,
      path: "/favorites",
    },
    {
      name: "Learning Lab",
      description: "AI Tutor and learning",
      icon: FaGraduationCap,
      path: "/learning-lab",
    },
    {
      name: "AI Memory",
      description: "Personalized AI preferences",
      icon: FaBrain,
      path: "/ai-memory",
    },
    {
      name: "AI Assistant",
      description: "Your AI mathematics assistant",
      icon: FaRobot,
      path: "/ai-assistant",
    },
  ],
  [
    {
      name: "Subscription & Premium",
      description: "Manage your membership",
      icon: FaCrown,
      path: "/subscription",
    },
    {
      name: "Notifications",
      description: "Updates and alerts",
      icon: FaBell,
      path: "/notifications",
    },
    {
      name: "Settings",
      description: "Account preferences",
      icon: FaCog,
      path: "/settings",
    },
    {
      name: "Security & Privacy",
      description: "Password and account security",
      icon: FaShieldAlt,
      path: "/security",
    },
    {
      name: "Help & Support",
      description: "Get help and contact support",
      icon: FaLifeRing,
      path: "/help",
    },
  ],
];

// ==========================================
// NAVBAR COMPONENT
// ==========================================

export default function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const isPremium = Boolean(user?.premium);

  const avatar =
    profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User"
    )}&background=5541a8&color=ffffff`;

  // ==========================================
  // CLOSE MENUS
  // ==========================================

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setProfileOpen(false);
    setMenuOpen(false);

    navigate("/login");
  };

  // ==========================================
  // PROFILE IMAGE UPLOAD
  // ==========================================

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      localStorage.setItem("profileImage", reader.result);
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  // ==========================================
  // MENU ITEM COMPONENT
  // ==========================================

  const renderMenuItem = (item) => {
    const Icon = item.icon;

    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={closeMenus}
        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-violet-500/10"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-slate-400 transition group-hover:bg-violet-500/15 group-hover:text-violet-400">
          <Icon size={15} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-200 transition group-hover:text-white">
            {item.name}
          </p>

          <p className="mt-0.5 text-[11px] text-slate-500">
            {item.description}
          </p>
        </div>

        <FaChevronRight
          size={10}
          className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-violet-400"
        />
      </Link>
    );
  };

  // ==========================================
  // NAVBAR UI
  // ==========================================

  return (
    <nav className="relative lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 border-b border-violet-400/15 bg-[#080b18]/90 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">

        {/* LOGO */}

        <Link
          to="/"
          onClick={closeMenus}
          className="flex items-center gap-3 shrink-0"
        >
          <img
            src="/logo.png"
            alt="CalcMaster Pro"
            className="w-10 h-10 object-contain"
          />

          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Calc
            </span>
            <span className="text-white">Master Pro</span>
          </h1>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="text-slate-300 hover:text-white transition">
            Home
          </Link>

          <a
            href="/#calculators"
            className="text-slate-300 hover:text-white transition"
          >
            Calculators
          </a>

          <a
            href="/#pricing"
            className="text-slate-300 hover:text-white transition"
          >
            Pricing
          </a>

          <a
            href="/#ai"
            className="text-slate-300 hover:text-white transition"
          >
            AI Assistant
          </a>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-3">

          {user ? (
            <div className="hidden md:block relative">

              {/* PROFILE BUTTON */}

              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                aria-label="Open account menu"
                className="flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/5 p-1.5 pr-3 hover:bg-violet-500/10 transition"
              >
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-violet-400 object-cover"
                />

                <FaChevronDown
                  className={`text-xs text-slate-300 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* PROFILE DROPDOWN */}

              {profileOpen && (
                <div className="hide-scrollbar absolute right-0 top-14 w-[340px] max-h-[80vh] overflow-y-auto overscroll-contain scroll-smooth rounded-2xl border border-violet-400/20 bg-[#10162b] shadow-[0_20px_60px_rgba(0,0,0,0.65)] z-50">

                  {/* ACCOUNT HEADER */}

                  <div className="p-5">

                    <div className="flex items-center gap-3">

                      <img
                        src={avatar}
                        alt="Profile"
                        className="w-14 h-14 rounded-full border-2 border-violet-400 object-cover shrink-0"
                      />

                      <div className="min-w-0 flex-1">

                        <h2 className="text-white font-bold truncate">
                          {user?.name || "User"}
                        </h2>

                        <p className="text-slate-400 text-xs truncate">
                          {user?.email || ""}
                        </p>

                        <span
                          className={`inline-block mt-1 text-[10px] font-semibold ${
                            isPremium
                              ? "text-amber-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {isPremium ? "Premium Plan" : "Free Plan"}
                        </span>

                      </div>
                    </div>

                    {/* CHANGE PROFILE PHOTO */}

                    <label className="block mt-4 text-center text-sm font-medium text-violet-300 cursor-pointer hover:text-blue-300 transition">
                      Change Profile Photo

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                  </div>

                  <div className="border-t border-white/10" />

                  {/* ACCOUNT MENU GROUPS */}

                  <div className="p-2">

                    {accountGroups.map((group, index) => (
                      <div key={index}>

                        {group.map(renderMenuItem)}

                        {index !== accountGroups.length - 1 && (
                          <div className="my-2 border-t border-white/10" />
                        )}

                      </div>
                    ))}

                  </div>

                  {/* LOGOUT */}

                  <div className="border-t border-white/10 p-2">

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10 transition"
                    >
                      <FaSignOutAlt size={16} />

                      <span className="text-sm font-semibold">
                        Logout
                      </span>
                    </button>

                  </div>

                  {/* FOOTER */}

                  <div className="pb-4 text-center">
                    <p className="text-[10px] text-slate-500">
                      CalcMaster Pro · Account Menu
                    </p>
                  </div>

                </div>
              )}

            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">

              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl border border-violet-400/30 text-white hover:bg-violet-500/10 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-lg hover:brightness-110 transition"
              >
                Register
              </Link>

            </div>
          )}

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className="lg:hidden text-white text-2xl p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </div>

      {/* MOBILE NAVIGATION */}

      {menuOpen && (
        <div className="lg:hidden max-h-[80vh] overflow-y-auto border-t border-violet-400/15 bg-[#0b1020] px-5 py-5 space-y-2">

          <Link
            to="/"
            onClick={closeMenus}
            className="block py-3 text-slate-200 hover:text-violet-300"
          >
            Home
          </Link>

          <a
            href="/#calculators"
            onClick={closeMenus}
            className="block py-3 text-slate-200 hover:text-violet-300"
          >
            Calculators
          </a>

          <a
            href="/#pricing"
            onClick={closeMenus}
            className="block py-3 text-slate-200 hover:text-violet-300"
          >
            Pricing
          </a>

          <a
            href="/#ai"
            onClick={closeMenus}
            className="block py-3 text-slate-200 hover:text-violet-300"
          >
            AI Assistant
          </a>

          <div className="border-t border-white/10 my-3" />

          {user ? (
            <>

              {/* MOBILE PROFILE */}

              <div className="flex items-center gap-3 py-3">

                <img
                  src={avatar}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-violet-400 object-cover"
                />

                <div className="min-w-0 flex-1">

                  <p className="text-white font-semibold truncate">
                    {user?.name || "User"}
                  </p>

                  <p className="text-slate-400 text-xs truncate">
                    {user?.email || ""}
                  </p>

                  <p className={`text-xs mt-1 ${
                    isPremium ? "text-amber-400" : "text-emerald-400"
                  }`}>
                    {isPremium ? "Premium Plan" : "Free Plan"}
                  </p>

                </div>
              </div>

              {/* MOBILE PHOTO UPLOAD */}

              <label className="block py-3 text-violet-300 text-sm cursor-pointer">
                Change Profile Photo

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <div className="border-t border-white/10 my-2" />

              {/* MOBILE ACCOUNT LINKS */}

              {accountGroups.flat().map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenus}
                    className="flex items-center gap-3 py-3 text-slate-200 hover:text-violet-300 transition"
                  >
                    <Icon className="text-violet-400" size={16} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}

              <div className="border-t border-white/10 my-3" />

              <button
                onClick={handleLogout}
                className="w-full mt-3 rounded-xl bg-red-500/10 border border-red-500/20 py-3 text-red-400 flex items-center justify-center gap-3"
              >
                <FaSignOutAlt />
                Logout
              </button>

            </>
          ) : (
            <>

              <Link
                to="/login"
                onClick={closeMenus}
                className="block text-center rounded-xl border border-violet-400/30 py-3 text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenus}
                className="block text-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-white font-semibold"
              >
                Register
              </Link>

            </>
          )}

        </div>
      )}

    </nav>
  );
}
