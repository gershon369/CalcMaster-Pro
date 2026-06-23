import {
  FaCalculator,
  FaHistory,
  FaClock,
  FaHeart,
} from "react-icons/fa";

export default function CalculatorActivity() {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
          <FaCalculator className="text-white" />
        </div>

        <h2 className="text-2xl font-bold">
          Calculator Activity
        </h2>

      </div>

      <div className="grid grid-cols-2 gap-5">

        {/* Total */}

        <div className="bg-white/10 rounded-2xl p-5">

          <FaCalculator className="text-3xl text-purple-400 mb-3" />

          <p className="text-gray-400">
            Total Calculations
          </p>

          <h3 className="text-3xl font-bold mt-2">
            245
          </h3>

        </div>

        {/* Today */}

        <div className="bg-white/10 rounded-2xl p-5">

          <FaHistory className="text-3xl text-pink-400 mb-3" />

          <p className="text-gray-400">
            Today's Calculations
          </p>

          <h3 className="text-3xl font-bold mt-2">
            18
          </h3>

        </div>

        {/* Last */}

        <div className="bg-white/10 rounded-2xl p-5">

          <FaClock className="text-3xl text-yellow-400 mb-3" />

          <p className="text-gray-400">
            Last Used
          </p>

          <h3 className="font-bold mt-2">
            GST Calculator
          </h3>

        </div>

        {/* Favorite */}

        <div className="bg-white/10 rounded-2xl p-5">

          <FaHeart className="text-3xl text-red-500 mb-3" />

          <p className="text-gray-400">
            Favorite Calculator
          </p>

          <h3 className="font-bold mt-2">
            BMI Calculator
          </h3>

        </div>

      </div>

      <button className="mt-8 w-full bg-purple-600 hover:bg-purple-700 rounded-xl py-3 transition">

        View Full History →

      </button>

    </div>
  );
}