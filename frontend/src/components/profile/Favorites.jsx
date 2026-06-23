import {
  FaHeart,
  FaCalculator,
  FaArrowRight,
} from "react-icons/fa";

export default function Favorites() {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl">

      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">

            <FaHeart className="text-white" />

          </div>

          <h2 className="text-2xl font-bold text-white">
            Favorites
          </h2>

        </div>

        <button className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
          View All
          <FaArrowRight />
        </button>

      </div>

      <div className="space-y-4">

        {/* Item */}

        <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4 hover:bg-white/15 transition">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">

              <FaCalculator className="text-white" />

            </div>

            <div>

              <h3 className="font-semibold">
                BMI Calculator
              </h3>

              <p className="text-sm text-gray-400">
                Health
              </p>

            </div>

          </div>

          ❤️

        </div>

        <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4 hover:bg-white/15 transition">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">

              <FaCalculator className="text-white" />

            </div>

            <div>

              <h3 className="font-semibold">
                GST Calculator
              </h3>

              <p className="text-sm text-gray-400">
                Finance
              </p>

            </div>

          </div>

          ❤️

        </div>

        <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4 hover:bg-white/15 transition">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-pink-600 flex items-center justify-center">

              <FaCalculator className="text-white" />

            </div>

            <div>

              <h3 className="font-semibold">
                EMI Calculator
              </h3>

              <p className="text-sm text-gray-400">
                Loan
              </p>

            </div>

          </div>

          ❤️

        </div>

        <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4 hover:bg-white/15 transition">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">

              <FaCalculator className="text-white" />

            </div>

            <div>

              <h3 className="font-semibold">
                Currency Converter
              </h3>

              <p className="text-sm text-gray-400">
                Finance
              </p>

            </div>

          </div>

          ❤️

        </div>

      </div>

    </div>
  );
}