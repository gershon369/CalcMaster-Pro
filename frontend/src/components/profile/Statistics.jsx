import {
  FaCalculator,
  FaHistory,
  FaHeart,
  FaChartLine,
} from "react-icons/fa";

export default function Statistics() {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <FaChartLine className="text-white" />
        </div>

        <h2 className="text-2xl font-bold">
          Statistics
        </h2>

      </div>

      <div className="grid grid-cols-2 gap-5">

        <div className="bg-white/10 rounded-2xl p-5 text-center">

          <FaCalculator className="text-purple-400 text-4xl mx-auto mb-3" />

          <h3 className="text-3xl font-bold">
            245
          </h3>

          <p className="text-gray-400">
            Total Calculations
          </p>

        </div>

        <div className="bg-white/10 rounded-2xl p-5 text-center">

          <FaHeart className="text-red-500 text-4xl mx-auto mb-3" />

          <h3 className="text-3xl font-bold">
            18
          </h3>

          <p className="text-gray-400">
            Favorites
          </p>

        </div>

        <div className="bg-white/10 rounded-2xl p-5 text-center">

          <FaHistory className="text-green-400 text-4xl mx-auto mb-3" />

          <h3 className="text-3xl font-bold">
            187
          </h3>

          <p className="text-gray-400">
            History
          </p>

        </div>

        <div className="bg-white/10 rounded-2xl p-5 text-center">

          <FaChartLine className="text-yellow-400 text-4xl mx-auto mb-3" />

          <h3 className="text-3xl font-bold">
            82%
          </h3>

          <p className="text-gray-400">
            Progress
          </p>

        </div>

      </div>

    </div>
  );
}