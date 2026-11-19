import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCalculator,
  FaRobot,
  FaCrown,
  FaUser,
} from "react-icons/fa";

export default function MobileBottomNav() {
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      icon: <FaHome size={19} />,
      to: "/",
    },
    {
      name: "Calc",
      icon: <FaCalculator size={19} />,
      to: "/#calculators",
    },
    {
      name: "AI",
      icon: <FaRobot size={19} />,
      to: "/#ai-assistant",
    },
    {
      name: "Pro",
      icon: <FaCrown size={19} />,
      to: "/#pricing",
    },
    {
      name: "Profile",
      icon: <FaUser size={19} />,
      to: "/profile",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3">
      <nav className="rounded-2xl border border-purple-400/20 bg-[#080817]/95 backdrop-blur-xl shadow-[0_0_25px_rgba(124,58,237,0.20)]">
        <div className="grid grid-cols-5 py-3">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.to.split("#")[0] &&
              (item.name === "Home" ||
                location.hash === item.to.split("#")[1]);

            return (
              <Link
                key={item.name}
                to={item.to}
                className={`flex flex-col items-center gap-1 text-[11px] transition-all duration-300 ${
                  isActive
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span
                  className={`transition-transform duration-300 ${
                    isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" : ""
                  }`}
                >
                  {item.icon}
                </span>

                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
