import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

const [profileImage, setProfileImage] = useState(
  localStorage.getItem("profileImage") || ""
);
  
const user = JSON.parse(
  localStorage.getItem("user")
);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};
const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    localStorage.setItem(
      "profileImage",
      reader.result
    );

    setProfileImage(reader.result);
  };

  reader.readAsDataURL(file);
};

return (
  <>
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-5">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 scale-150 object-contain"
          />

          <h1 className="text-xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            <span className="">Calc</span>Master Pro
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-gray-300">
          <Link to="/">Home</Link>
          <a href="#calculators">Calculators</a>
          <a href="#pricing">Pricing</a>
          <a href="#ai">AI Assistant</a>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {user ? (

<div className="hidden md:block relative">

<button
  onClick={() =>
    setProfileOpen(!profileOpen)
  }
>
  <img
    src={
      profileImage ||
      "https://ui-avatars.com/api/?name=User"
    }
    alt=""
    className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover"
  />
</button>

{profileOpen && (

<div className="absolute right-0 top-14 w-80 bg-[#161616] rounded-3xl border border-white/10 overflow-hidden shadow-2xl z-50">

  {/* USER INFO */}

  <div className="p-5 border-b border-white/10">

    <div className="flex items-center gap-4">

      <img
        src={
          profileImage ||
          "https://ui-avatars.com/api/?name=User"
        }
        className="w-14 h-14 rounded-full object-cover"
      />

      <div>

        <h2 className="text-white font-bold text-lg">
          {user?.name}
        </h2>

        <p className="text-gray-400 text-sm">
          {user?.email}
        </p>

      </div>

    </div>

  </div>

  {/* MENU */}

  <div className="py-2">

    <Link
  to="/profile"
  className="flex items-center gap-4 px-6 py-4 text-white hover:bg-white/10"
  onClick={() => setProfileOpen(false)}
>
  👤
  <span>Profile</span>
</Link>

    <button
      className="flex items-center gap-4 px-6 py-4 w-full text-left text-white hover:bg-white/10"
    >
      👥
      <span>Dashboard</span>
    </button>
    <button
      className="flex items-center gap-4 px-6 py-4 w-full text-left text-white hover:bg-white/10"
    >
      👥
      <span>Settings</span>
    </button>

    
    <button
      className="flex items-center gap-4 px-6 py-4 w-full text-left text-white hover:bg-white/10"
    >
      🤖
      <span>AI Memory</span>
    </button>

    <button
      className="flex justify-between items-center px-6 py-4 w-full text-left text-white hover:bg-white/10"
    >
      <div className="flex gap-4">

        🌐

        <span>Language</span>

      </div>

      <span className="text-gray-400">
        English
      </span>

    </button>

    <button
      className="flex justify-between items-center px-6 py-4 w-full text-left text-white hover:bg-white/10"
    >
      <div className="flex gap-4">

        🧪

        <span>Learning Lab</span>

      </div>

      ↗

    </button>

    <button
      onClick={handleLogout}
      className="flex items-center gap-4 px-6 py-4 w-full text-left text-red-400 hover:bg-white/10"
    >
      🚪

      Logout

    </button>

  </div>

</div>

)}

</div>

) : (
            <>
              <Link
                to="/login"
                className="hidden md:block bg-purple-600 px-5 py-2 rounded-xl text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hidden md:block bg-purple-600 px-5 py-2 rounded-xl text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="md:hidden bg-black border-t border-white/10 p-5">

        <Link
          to="/"
          className="block py-3 text-white"
        >
          Home
        </Link>

        <a
          href="#calculators"
          className="block py-3 text-white"
        >
          Calculators
        </a>

        <a
          href="#pricing"
          className="block py-3 text-white"
        >
          Pricing
        </a>

        <a
          href="#ai"
          className="block py-3 text-white"
        >
          AI Assistant
        </a>

        <hr className="my-4 border-gray-700" />

        {user ? (
          <>
            <div className="text-white py-2">
              👤 {user.name}
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 py-3 rounded-xl text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="block text-center bg-purple-600 py-3 rounded-xl text-white mb-3"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="block text-center bg-purple-600 py-3 rounded-xl text-white"
            >
              Register
            </Link>
          </>
        )}
      </div>
    )}
  </>
  );
}



