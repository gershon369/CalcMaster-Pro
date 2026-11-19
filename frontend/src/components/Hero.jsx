
export default function Hero() {
  return (
    <section className="relative overflow-hidden text-center py-20 md:py-32 px-4 md:px-6">

      {/* Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute bottom-0 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-400/30 px-5 py-2.5 rounded-full text-violet-300 text-xs md:text-sm mb-8 shadow-lg shadow-violet-900/10">
          <span>🚀</span>
          <span>AI Powered Calculator Suite</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
          Smart Calculators
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            For Modern Life
          </span>
        </h1>

        {/* Description */}
        <p className="text-slate-400 mt-7 text-sm sm:text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
          30+ powerful calculators for finance,
          business, health, education and
          AI-assisted problem solving.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-9 md:mt-11">

          <a
            href="#calculators"
            className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 rounded-2xl text-white font-semibold shadow-xl shadow-violet-900/30 hover:scale-105 hover:shadow-violet-700/30 transition duration-300"
          >
            Start Free →
          </a>

          <button
            type="button"
            onClick={() => {
              document.getElementById("demo")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="w-full sm:w-auto border border-violet-400/30 bg-white/5 backdrop-blur-md px-8 py-4 rounded-2xl text-white font-semibold hover:bg-violet-500/10 hover:border-violet-400/60 transition duration-300"
          >
            ▶ Watch Demo
          </button>

        </div>

        {/* Bottom Highlight */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-14 text-slate-400 text-xs md:text-sm">

          <div>
            <span className="text-violet-400 font-bold">30+</span>
            <span className="ml-2">Calculators</span>
          </div>

          <div>
            <span className="text-blue-400 font-bold">AI</span>
            <span className="ml-2">Powered Tools</span>
          </div>

          <div>
            <span className="text-violet-400 font-bold">Free</span>
            <span className="ml-2">To Get Started</span>
          </div>

        </div>

      </div>
    </section>
  );
}
