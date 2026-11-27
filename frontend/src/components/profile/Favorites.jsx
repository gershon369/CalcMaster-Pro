
import {
  FaHeart,
  FaCalculator,
  FaArrowRight,
} from "react-icons/fa";

export default function Favorites() {
  const favorites = [
    {
      name: "BMI Calculator",
      category: "Health",
      color: "bg-purple-600",
    },
    {
      name: "GST Calculator",
      category: "Finance",
      color: "bg-green-600",
    },
    {
      name: "EMI Calculator",
      category: "Loan",
      color: "bg-pink-600",
    },
    {
      name: "Currency Converter",
      category: "Finance",
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl">

      {/* Header */}
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

      {/* Favorites Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-4">

        {favorites.map((item) => (
          <div
            key={item.name}
            className="h-full min-h-[90px] flex justify-between items-center bg-white/10 rounded-2xl p-4 hover:bg-white/15 transition"
          >

            <div className="flex items-center gap-4">

              <div
                className={`w-12 h-12 shrink-0 rounded-xl ${item.color} flex items-center justify-center`}
              >
                <FaCalculator className="text-white text-lg" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {item.category}
                </p>
              </div>

            </div>

            <FaHeart className="shrink-0 text-pink-500" />

          </div>
        ))}

      </div>

    </div>
  );
}
