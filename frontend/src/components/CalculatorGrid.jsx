const calculators = [
  { name: "Basic Calculator", icon: "🧮", free: true },
  { name: "Scientific", icon: "📐", free: true },
  { name: "Loan EMI", icon: "💰", free: true },
  { name: "BMI", icon: "🏃", free: true },
  { name: "GST", icon: "👑", free: false },
  { name: "SIP", icon: "📈", free: false },
  { name: "Crypto", icon: "₿", free: false },
  { name: "Retirement", icon: "🎯", free: false },
];

export default function CalculatorGrid() {
  return (
    <section id="calculators" className="px-4 md:px-8 py-16 md:py-20">
      <h2 className="text-5xl font-bold text-white text-center mb-12">
        Smart Calculators
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {calculators.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 text-white hover:scale-105 transition duration-300"
          >
            <div className="text-5xl mb-4">{item.icon}</div>

            <h3 className="text-xl font-semibold">
              {item.name}
            </h3>

            <div className="mt-4">
              {item.free ? (
                <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                  Free
                </span>
              ) : (
                <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm">
                  Premium
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}