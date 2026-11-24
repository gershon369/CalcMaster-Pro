
import { useState } from "react";

export default function Hero() {
  const [showDemo, setShowDemo] = useState(false);
  const [activeTab, setActiveTab] = useState("Basic");

  // Basic Calculator
  const [num1, setNum1] = useState("150");
  const [num2, setNum2] = useState("250");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = Number(num1);
    const b = Number(num2);

    if (num1 === "" || num2 === "" || !Number.isFinite(a) || !Number.isFinite(b)) {
      setResult("Invalid input");
      return;
    }

    let answer;

    switch (operator) {
      case "+": answer = a + b; break;
      case "-": answer = a - b; break;
      case "*": answer = a * b; break;
      case "/":
        if (b === 0) {
          setResult("Cannot divide by zero");
          return;
        }
        answer = a / b;
        break;
      default: return;
    }

    setResult(answer);
  };

  // Loan EMI Calculator
  const [loan, setLoan] = useState("500000");
  const [rate, setRate] = useState("10");
  const [months, setMonths] = useState("60");
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const P = Number(loan);
    const annualRate = Number(rate);
    const N = Number(months);

    if (
      !Number.isFinite(P) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(N) ||
      P <= 0 || annualRate < 0 || N <= 0
    ) {
      setEmi(null);
      return;
    }

    const r = annualRate / 12 / 100;

    const payment =
      r === 0
        ? P / N
        : (P * r * Math.pow(1 + r, N)) /
          (Math.pow(1 + r, N) - 1);

    setEmi(payment);
  };

  const formatMoney = (value) =>
    Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  return (
    <>
      <section className="relative overflow-hidden text-center py-20 md:py-32 px-4 md:px-6">

        {/* Background Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-400/30 px-5 py-2.5 rounded-full text-violet-300 text-xs md:text-sm mb-8 shadow-lg">
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
              className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 rounded-2xl text-white font-semibold shadow-xl hover:scale-105 transition duration-300"
            >
              Start Free →
            </a>

            <button
              type="button"
              onClick={() => setShowDemo(true)}
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

      {/* DEMO MODAL */}
      {showDemo && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDemo(false);
            }
          }}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#100c20] border border-violet-500/30 rounded-3xl shadow-2xl shadow-violet-950/50">

            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#100c20] border-b border-white/10 px-5 sm:px-8 py-5 flex items-center justify-between">

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  CalcMaster <span className="text-violet-400">Pro</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Explore our powerful tools
                </p>
              </div>

              <button
                onClick={() => setShowDemo(false)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 text-white text-xl transition"
                aria-label="Close demo"
              >
                ✕
              </button>
            </div>

            <div className="p-5 sm:p-8">

              {/* Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-6">

                {["Basic", "Loan EMI", "AI Tutor", "Premium"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 px-5 py-3 rounded-xl text-sm font-semibold transition ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white"
                        : "bg-white/5 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    {tab}
                  </button>
                ))}

              </div>

              {/* BASIC CALCULATOR */}
              {activeTab === "Basic" && (
                <div className="max-w-lg mx-auto">

                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">🧮</div>
                    <h3 className="text-2xl font-bold text-white">
                      Basic Calculator
                    </h3>
                    <p className="text-slate-400 text-sm mt-2">
                      Try a live calculation
                    </p>
                  </div>

                  <div className="bg-[#080613] border border-violet-500/20 rounded-2xl p-5 sm:p-7 space-y-5">

                    <div>
                      <label className="text-sm text-slate-400">
                        First Number
                      </label>
                      <input
                        type="number"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-violet-500"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-slate-400">
                        Operation
                      </label>
                      <select
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                        className="w-full mt-2 bg-[#201735] border border-white/10 rounded-xl p-4 text-white outline-none"
                      >
                        <option value="+">Addition (+)</option>
                        <option value="-">Subtraction (-)</option>
                        <option value="*">Multiplication (×)</option>
                        <option value="/">Division (÷)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-slate-400">
                        Second Number
                      </label>
                      <input
                        type="number"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-violet-500"
                      />
                    </div>

                    <button
                      onClick={calculate}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold hover:opacity-90 transition"
                    >
                      Calculate Result
                    </button>

                    {result !== null && (
                      <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5 text-center">
                        <p className="text-slate-400 text-sm">Your Result</p>
                        <p className="text-3xl font-bold text-violet-300 mt-2 break-all">
                          {typeof result === "number"
                            ? formatMoney(result)
                            : result}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* LOAN EMI */}
              {activeTab === "Loan EMI" && (
                <div className="max-w-lg mx-auto">

                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">🏦</div>
                    <h3 className="text-2xl font-bold text-white">
                      Loan EMI Calculator
                    </h3>
                    <p className="text-slate-400 text-sm mt-2">
                      Calculate your monthly loan payment
                    </p>
                  </div>

                  <div className="bg-[#080613] border border-violet-500/20 rounded-2xl p-5 sm:p-7 space-y-5">

                    {[
                      {
                        label: "Loan Amount (₹)",
                        value: loan,
                        setter: setLoan,
                      },
                      {
                        label: "Annual Interest Rate (%)",
                        value: rate,
                        setter: setRate,
                      },
                      {
                        label: "Loan Duration (Months)",
                        value: months,
                        setter: setMonths,
                      },
                    ].map((item) => (
                      <div key={item.label}>
                        <label className="text-sm text-slate-400">
                          {item.label}
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={item.value}
                          onChange={(e) => item.setter(e.target.value)}
                          className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-violet-500"
                        />
                      </div>
                    ))}

                    <button
                      onClick={calculateEMI}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold hover:opacity-90 transition"
                    >
                      Calculate EMI
                    </button>

                    {emi !== null && (
                      <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5 text-center">
                        <p className="text-slate-400 text-sm">
                          Your Monthly EMI
                        </p>
                        <p className="text-3xl font-bold text-violet-300 mt-2">
                          ₹{formatMoney(emi)}
                        </p>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* AI TUTOR */}
              {activeTab === "AI Tutor" && (
                <div className="text-center py-10 max-w-lg mx-auto">

                  <div className="text-6xl mb-5">🤖</div>

                  <h3 className="text-2xl font-bold text-white">
                    AI Mathematics Tutor
                  </h3>

                  <p className="text-slate-400 mt-3 leading-relaxed">
                    Get step-by-step explanations for mathematics problems
                    with our AI-powered learning assistant.
                  </p>

                  <div className="mt-7 bg-[#080613] border border-violet-500/20 rounded-2xl p-5 text-left">

                    <p className="text-violet-400 text-sm font-semibold">
                      Example Question
                    </p>

                    <p className="text-white mt-2">
                      Solve: 150 + 250
                    </p>

                    <div className="border-t border-white/10 mt-5 pt-5">
                      <p className="text-blue-400 text-sm font-semibold">
                        Example Explanation
                      </p>
                      <p className="text-slate-300 mt-3">
                        Step 1: Identify both numbers.
                      </p>
                      <p className="text-slate-300 mt-2">
                        Step 2: Add 150 + 250.
                      </p>
                      <p className="text-green-400 font-bold mt-3 text-lg">
                        Answer: 400
                      </p>
                    </div>

                  </div>

                  <p className="text-xs text-slate-500 mt-4">
                    Sample preview — not a live AI response.
                  </p>

                </div>
              )}

              {/* PREMIUM */}
              {activeTab === "Premium" && (
                <div className="text-center py-10 max-w-lg mx-auto">

                  <div className="text-6xl mb-5">👑</div>

                  <h3 className="text-2xl font-bold text-white">
                    Unlock Premium Tools
                  </h3>

                  <p className="text-slate-400 mt-3">
                    Explore advanced calculators and powerful features
                    with CalcMaster Pro Premium.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-7 text-left">

                    {[
                      "📊 SIP Calculator",
                      "💰 Retirement Planner",
                      "₿ Crypto Calculator",
                      "🧾 GST Calculator",
                    ].map((feature) => (
                      <div
                        key={feature}
                        className="bg-white/5 border border-violet-500/20 rounded-xl p-4 text-sm text-slate-200"
                      >
                        {feature}
                      </div>
                    ))}

                  </div>

                  <p className="text-violet-400 text-sm mt-6">
                    Discover more with CalcMaster Pro
                  </p>

                </div>
              )}

            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">

              <p className="text-xs text-slate-500">
                © CalcMaster Pro | Smart Calculations
              </p>

              <button
                onClick={() => setShowDemo(false)}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition"
              >
                Close Demo
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}