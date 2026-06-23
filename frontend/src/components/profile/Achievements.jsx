import {
  FaTrophy,
  FaFire,
  FaGem,
  FaStar,
} from "react-icons/fa";

export default function Achievements() {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center">

          <FaTrophy className="text-white" />

        </div>

        <h2 className="text-2xl font-bold">
          Achievements
        </h2>

      </div>

      <div className="space-y-4">

        <div className="flex justify-between items-center bg-white/10 rounded-xl p-4">

          <div className="flex items-center gap-3">

            <FaTrophy className="text-yellow-400 text-2xl" />

            <div>

              <h3 className="font-semibold">
                100 Calculations Completed
              </h3>

              <p className="text-sm text-gray-400">
                Great progress!
              </p>

            </div>

          </div>

          <span className="text-green-400">
            ✓
          </span>

        </div>

        <div className="flex justify-between items-center bg-white/10 rounded-xl p-4">

          <div className="flex items-center gap-3">

            <FaFire className="text-orange-400 text-2xl" />

            <div>

              <h3 className="font-semibold">
                7 Day Streak
              </h3>

              <p className="text-sm text-gray-400">
                Keep it up!
              </p>

            </div>

          </div>

          <span className="text-green-400">
            ✓
          </span>

        </div>

        <div className="flex justify-between items-center bg-white/10 rounded-xl p-4">

          <div className="flex items-center gap-3">

            <FaGem className="text-cyan-400 text-2xl" />

            <div>

              <h3 className="font-semibold">
                Pro User
              </h3>

              <p className="text-sm text-gray-400">
                Premium Member
              </p>

            </div>

          </div>

          <span className="text-green-400">
            ✓
          </span>

        </div>

        <div className="flex justify-between items-center bg-white/10 rounded-xl p-4">

          <div className="flex items-center gap-3">

            <FaStar className="text-purple-400 text-2xl" />

            <div>

              <h3 className="font-semibold">
                Power User
              </h3>

              <p className="text-sm text-gray-400">
                Top Calculator User
              </p>

            </div>

          </div>

          <span className="text-green-400">
            ✓
          </span>

        </div>

      </div>

    </div>
  );
}