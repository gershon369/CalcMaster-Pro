
import {
  FaCalculator,
  FaUsers,
  FaBullseye,
  FaHeadset,
} from "react-icons/fa";

export default function Stats() {
  const stats = [
    {
      icon: <FaCalculator />,
      number: "30+",
      label: "Calculators",
      color: "text-violet-400",
      glow: "group-hover:shadow-violet-500/10",
    },
    {
      icon: <FaUsers />,
      number: "50K+",
      label: "Users",
      color: "text-blue-400",
      glow: "group-hover:shadow-blue-500/10",
    },
    {
      icon: <FaBullseye />,
      number: "99.9%",
      label: "Accuracy",
      color: "text-purple-400",
      glow: "group-hover:shadow-purple-500/10",
    },
    {
      icon: <FaHeadset />,
      number: "24/7",
      label: "AI Support",
      color: "text-sky-400",
      glow: "group-hover:shadow-sky-500/10",
    },
  ];

  return (
    <section className="relative px-4 md:px-8 py-10 md:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

        {stats.map((stat, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl border border-violet-400/15 bg-gradient-to-br from-[#15152c] to-[#0b1020] p-5 md:p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/40 hover:shadow-xl ${stat.glow}`}
          >
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-violet-500/10 blur-3xl group-hover:bg-blue-500/15 transition" />

            {/* Icon */}
            <div
              className={`relative mb-5 text-2xl md:text-3xl ${stat.color}`}
            >
              {stat.icon}
            </div>

            {/* Number */}
            <h2 className="relative text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {stat.number}
            </h2>

            {/* Label */}
            <p className="relative mt-2 text-sm md:text-base text-slate-400 font-medium">
              {stat.label}
            </p>

            {/* Bottom Accent */}
            <div className="mt-5 h-1 w-10 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 group-hover:w-20 transition-all duration-300" />
          </div>
        ))}

      </div>
    </section>
  );
}
