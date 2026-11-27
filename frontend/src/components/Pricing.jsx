
const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with essential calculators.",
    features: [
      "Basic Calculators",
      "Standard Tools",
      "Mobile Friendly",
    ],
    popular: false,
    button: "Get Started",
  },
  {
    name: "Pro",
    price: "$10",
    period: "/month",
    description: "Unlock more powerful calculation tools.",
    features: [
      "Everything in Free",
      "Advanced Finance Tools",
      "Premium Calculators",
      "AI Tools Access",
    ],
    popular: true,
    button: "Choose Pro",
  },
  {
    name: "Enterprise",
    price: "$30",
    period: "/month",
    description: "For advanced professional requirements.",
    features: [
      "Everything in Pro",
      "Advanced Tool Access",
      "Professional Usage",
      "Priority Support",
    ],
    popular: false,
    button: "Choose Enterprise",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative px-4 md:px-8 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block mb-4 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300">
            ✦ SIMPLE PRICING
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Pricing{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Plans
            </span>
          </h2>

          <p className="mt-4 text-sm md:text-base text-slate-400">
            Choose a plan that works best for you.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border p-7 md:p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? "border-violet-400/50 bg-gradient-to-br from-[#251747] via-[#17142e] to-[#0b1020] shadow-xl shadow-violet-500/10"
                  : "border-white/10 bg-gradient-to-br from-[#19172e] via-[#111326] to-[#0b1020] hover:border-violet-400/30"
              }`}
            >

              {/* Background Glow */}
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

              {/* Popular Badge */}
              {plan.popular && (
                <div className="relative mb-6">
                  <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-500/20 px-4 py-2 text-xs font-bold tracking-wide text-violet-300">
                    ★ MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="relative text-2xl font-bold text-white">
                {plan.name}
              </h3>

              <p className="relative mt-3 min-h-10 text-sm leading-relaxed text-slate-400">
                {plan.description}
              </p>

              {/* Price */}
              <div className="relative mt-7 flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-extrabold text-white">
                  {plan.price}
                </span>

                <span className="text-sm text-slate-400">
                  {plan.period}
                </span>
              </div>

              {/* Divider */}
              <div className="relative my-7 h-px bg-white/10" />

              {/* Features */}
              <div className="relative flex-1 space-y-5">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-xs text-violet-300">
                      ✓
                    </span>

                    {feature}
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                type="button"
                className={`relative mt-9 w-full rounded-xl py-3.5 font-semibold text-white transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
                    : "border border-violet-400/30 bg-violet-500/10 hover:border-violet-400/60 hover:bg-violet-500/20"
                }`}
              >
                {plan.button}
              </button>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
