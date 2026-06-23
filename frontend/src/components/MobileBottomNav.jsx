import { Link } from "react-router-dom";
import {
  FaHome,
  FaCalculator,
  FaRobot,
  FaCrown,
  FaUser
} from "react-icons/fa";

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 z-50">

      <div className="grid grid-cols-5 py-3">

        <Link
          to="/"
          className="flex flex-col items-center text-white text-xs"
        >
          <FaHome size={20} />
          <span>Home</span>
        </Link>

        <a
          href="#calculators"
          className="flex flex-col items-center text-white text-xs"
        >
          <FaCalculator size={20} />
          <span>Calc</span>
        </a>

        <a
          href="#ai"
          className="flex flex-col items-center text-white text-xs"
        >
          <FaRobot size={20} />
          <span>AI</span>
        </a>

        <a
          href="#pricing"
          className="flex flex-col items-center text-yellow-400 text-xs"
        >
          <FaCrown size={20} />
          <span>Pro</span>
        </a>

        <Link
          to="/dashboard"
          className="flex flex-col items-center text-white text-xs"
        >
          <FaUser size={20} />
          <span>Profile</span>
        </Link>

      </div>

    </div>
  );
}