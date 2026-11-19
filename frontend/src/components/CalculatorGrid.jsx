import { Link } from "react-router-dom";

const calculators = [
  {
    name: "Basic Calculator",
    icon: "🧮",
    free: true,
    description: "Everyday calculations made easy.",
    path: "/calculator/basic",
  },
  {
    name: "Scientific Calculator",
    icon: "📐",
    free: true,
    description: "Advanced mathematical calculations.",
    path: "/calculator/scientific",
  },
  {
    name: "Loan EMI",
    icon: "💰",
    free: true,
    description: "Calculate your monthly loan EMI.",
    path: "/calculator/loan-emi",
  },
  {
    name: "BMI",
    icon: "🏃",
    free: true,
    description: "Understand your BMI calculation.",
    path: "/calculator/bmi",
  },
  {
    name: "GST",
    icon: "👑",
    free: false,
    description: "Calculate GST amounts easily.",
    path: "/calculator/gst",
  },
  {
    name: "SIP",
    icon: "📈",
    free: false,
    description: "Plan your investment calculations.",
    path: "/calculator/sip",
  },
  {
    name: "Crypto",
    icon: "₿",
    free: false,
    description: "Explore crypto calculations.",
    path: "/calculator/crypto",
  },
  {
    name: "Retirement",
    icon: "🎯",
    free: false,
    description: "Plan your future finances.",
    path: "/calculator/retirement",
  },
];

export default function CalculatorGrid() {
  return (
    <section
      id="calculators"
      className="relative px-4 md:px-8 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block mb-4 px-4 py-2 rounded-full border border-violet-400/20 bg-violet-500/10 text-violet-300 text-sm font-semibold">
            ✦ POWERFUL TOOLS
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Smart{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Calculators
            </span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-sm md:text-base">
            Everything you need to calculate, plan and make smarter decisions.
          </p>
        </div>

        {/* Calculator Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

          {calculators.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="group relative block overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-br from-[#19172e] via-[#111326] to-[#0b1020] p-5 md:p-7 transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/40 hover:shadow-[0_15px_45px_rgba(124,58,237,0.15)]"
            >
              {/* Glow Effect */}
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-500/20" />

              {/* Icon */}
              <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-3xl transition-transform duration-300 group-hover:scale-110">
                <span className={item.name === "Crypto" ? "text-white" : ""}>
                  {item.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="relative text-base md:text-xl font-bold text-white">
                {item.name}
              </h3>

              {/* Description */}
              <p className="relative mt-2 min-h-10 text-xs md:text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>

              {/* Plan Badge */}
              <div className="relative mt-5">
                {item.free ? (
                  <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    Free
                  </span>
                ) : (
                  <span className="inline-flex rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                    ★ Premium
                  </span>
                )}
              </div>

              {/* Bottom Hover Line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300 group-hover:w-full" />

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}