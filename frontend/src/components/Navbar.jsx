
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaTachometerAlt,
  FaCog,
  FaBrain,
  FaGlobe,
  FaGraduationCap,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

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
  };

  const navLinkClass =
    "text-slate-300 hover:text-white transition-colors duration-200";

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <nav className="relative lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 border-b border-violet-400/15 bg-[#080b18]/85 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">

        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className={navLinkClass}>
            Home
          </Link>

          <a href="/#calculators" className={navLinkClass}>
            Calculators
          </a>

          <a href="/#pricing" className={navLinkClass}>
            Pricing
          </a>

          <a href="/#ai" className={navLinkClass}>
            AI Assistant
          </a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {user ? (
            <div className="hidden md:block relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/5 p-1.5 pr-3 hover:bg-violet-500/10 transition"
              >
                <img
                  src={
                    profileImage ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-violet-400 object-cover"
                />

                <FaChevronDown
                  className={`text-xs text-slate-300 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-80 overflow-hidden rounded-2xl border border-violet-400/20 bg-[#10162b] shadow-[0_15px_50px_rgba(0,0,0,0.55)]">

                  {/* Profile Header */}
                  <div className="p-5 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          profileImage ||
                          "https://ui-avatars.com/api/?name=User"
                        }
                        alt="Profile"
                        className="w-14 h-14 rounded-full border-2 border-violet-400 object-cover"
                      />

                      <div className="min-w-0">
                        <h2 className="text-white font-bold truncate">
                          {user?.name || "User"}
                        </h2>

                        <p className="text-slate-400 text-xs truncate">
                          {user?.email || ""}
                        </p>
                      </div>
                    </div>

                    <label className="block mt-4 text-center text-sm text-violet-300 cursor-pointer hover:text-blue-300 transition">
                      Change Profile Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Dropdown Menu */}
                  <div className="p-2">
                    <Link
                      to="/profile"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-200 hover:bg-violet-500/15 transition"
                    >
                      <FaUser className="text-violet-400" />
                      Profile
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-200 hover:bg-violet-500/15 transition"
                    >
                      <FaTachometerAlt className="text-blue-400" />
                      Dashboard
                    </Link>

                    <Link
                      to="/settings"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-200 hover:bg-violet-500/15 transition"
                    >
                      <FaCog className="text-violet-400" />
                      Settings
                    </Link>

                    <Link
                      to="/ai-memory"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-200 hover:bg-violet-500/15 transition"
                    >
                      <FaBrain className="text-blue-400" />
                      AI Memory
                    </Link>

                    <button
                      type="button"
                      className="flex items-center justify-between w-full rounded-xl px-4 py-3 text-slate-200 hover:bg-violet-500/15 transition"
                    >
                      <span className="flex items-center gap-4">
                        <FaGlobe className="text-violet-400" />
                        Language
                      </span>
                      <span className="text-xs text-slate-400">
                        English
                      </span>
                    </button>

                    <Link
                      to="/learning-lab"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-200 hover:bg-violet-500/15 transition"
                    >
                      <FaGraduationCap className="text-blue-400" />
                      Learning Lab
                    </Link>

                    <div className="my-2 border-t border-white/10" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-4 w-full rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10 transition"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
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
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-lg shadow-violet-900/30 hover:brightness-110 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden text-white text-2xl p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="lg:hidden border-t border-violet-400/15 bg-[#0b1020] px-5 py-5 space-y-2">
          <Link to="/" onClick={closeMenus} className="block py-3 text-slate-200 hover:text-violet-300">
            Home
          </Link>

          <a href="/#calculators" onClick={closeMenus} className="block py-3 text-slate-200 hover:text-violet-300">
            Calculators
          </a>

          <a href="/#pricing" onClick={closeMenus} className="block py-3 text-slate-200 hover:text-violet-300">
            Pricing
          </a>

          <a href="/#ai" onClick={closeMenus} className="block py-3 text-slate-200 hover:text-violet-300">
            AI Assistant
          </a>

          <div className="border-t border-white/10 my-3" />

          {user ? (
            <>
              <div className="flex items-center gap-3 py-3">
                <img
                  src={
                    profileImage ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt="Profile"
                  className="w-11 h-11 rounded-full border-2 border-violet-400 object-cover"
                />

                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-slate-400 text-xs truncate">
                    {user?.email || ""}
                  </p>
                </div>
              </div>

              <Link to="/profile" onClick={closeMenus} className="block py-3 text-slate-200">
                Profile
              </Link>

              <Link to="/dashboard" onClick={closeMenus} className="block py-3 text-slate-200">
                Dashboard
              </Link>

              <Link to="/settings" onClick={closeMenus} className="block py-3 text-slate-200">
                Settings
              </Link>

              <button
                onClick={handleLogout}
                className="w-full mt-3 rounded-xl bg-red-500/10 border border-red-500/20 py-3 text-red-400"
              >
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
