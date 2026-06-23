import { Link } from "react-router-dom";
import {
  FaHome,
  FaCalculator,
  FaRobot,
  FaCrown,
  FaUser,
} from "react-icons/fa";

export default function BottomNav() {
  return (
    <div
      className="
      md:hidden
      fixed
      bottom-0
      left-0
      right-0
      bg-black/95
      backdrop-blur-xl
      border-t
      border-white/10
      z-50
      "
    >
      <div className="grid grid-cols-5 py-3">

        <Link
          to="/"
          className="flex flex-col items-center text-white text-xs"
        >
          <FaHome size={18} />
          <span>Home</span>
        </Link>

        <Link
          to="/"
          className="flex flex-col items-center text-white text-xs"
        >
          <FaCalculator size={18} />
          <span>Calc</span>
        </Link>

        <Link
          to="/"
          className="flex flex-col items-center text-white text-xs"
        >
          <FaRobot size={18} />
          <span>AI</span>
        </Link>

        <Link
          to="#pricing"
          className="flex flex-col items-center text-yellow-400 text-xs"
        >
          <FaCrown size={18} />
          <span>Pro</span>
        </Link>

        <Link
          to="/profile"
          className="flex flex-col items-center text-white text-xs"
        >
          <FaUser size={18} />
          <span>Profile</span>
        </Link>

      </div>
    </div>
  );
}