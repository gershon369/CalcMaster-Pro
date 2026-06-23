export default function Hero() {
  return (
    <section className="text-center py-16 md:py-32 px-4 md:px-6">

      <div className="inline-block bg-purple-600/20 border border-purple-500 px-4 py-2 rounded-full text-purple-300 text-xs md:text-base mb-6 md:mb-8">
        🚀 AI Powered Calculator Suite
      </div>

      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight">
        Smart Calculators
        <br />
        For Modern Life
      </h1>

      <p className="text-gray-400 mt-6 text-sm sm:text-base md:text-xl max-w-2xl mx-auto">
        30+ powerful calculators for finance,
        business, health, education and
        AI-assisted problem solving.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 md:mt-10">

        <button className="bg-purple-600 px-6 md:px-8 py-3 md:py-4 rounded-2xl text-white hover:scale-105 transition">
          Start Free
        </button>

        <button className="border border-white px-6 md:px-8 py-3 md:py-4 rounded-2xl text-white">
          Watch Demo
        </button>

      </div>

    </section>
  );
}