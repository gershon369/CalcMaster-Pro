export default function CalculatorDataSection() {

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-5">
        Calculator Data
      </h2>

      <div className="space-y-3">

        <button className="w-full bg-white/10 py-3 rounded-xl">
          🕘 Calculation History
        </button>

        <button className="w-full bg-white/10 py-3 rounded-xl">
          ⭐ Favorites
        </button>

        <button className="w-full bg-red-600 py-3 rounded-xl">
          Clear History
        </button>

      </div>

    </div>
  );
}