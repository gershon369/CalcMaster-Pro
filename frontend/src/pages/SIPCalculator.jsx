
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { saveCalculation } from "../utils/saveCalculation";

const currency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [annualReturn, setAnnualReturn] = useState("12");
  const [duration, setDuration] = useState("10");
  const [stepUp, setStepUp] = useState("0");

  const [showReport, setShowReport] = useState(true);
  const [historyMessage, setHistoryMessage] = useState("");

  const results = useMemo(() => {
    const investment = Number(monthlyInvestment);
    const rate = Number(annualReturn);
    const years = Number(duration);
    const increase = Number(stepUp);

    if (
      !Number.isFinite(investment) ||
      !Number.isFinite(rate) ||
      !Number.isFinite(years) ||
      !Number.isFinite(increase) ||
      monthlyInvestment.trim() === "" ||
      annualReturn.trim() === "" ||
      duration.trim() === "" ||
      stepUp.trim() === "" ||
      investment <= 0 ||
      rate < 0 ||
      rate > 100 ||
      years <= 0 ||
      years > 50 ||
      increase < 0 ||
      increase > 100
    ) {
      return null;
    }

    const monthlyRate = rate / 100 / 12;
    let balance = 0;
    let totalInvested = 0;
    let currentMonthlyInvestment = investment;

    const yearlyData = [
      {
        year: 0,
        invested: 0,
        value: 0,
        returns: 0,
      },
    ];

    for (let month = 1; month <= years * 12; month++) {
      if (month > 1 && (month - 1) % 12 === 0) {
        currentMonthlyInvestment *= 1 + increase / 100;
      }

      balance = balance * (1 + monthlyRate) + currentMonthlyInvestment;
      totalInvested += currentMonthlyInvestment;

      if (month % 12 === 0) {
        yearlyData.push({
          year: month / 12,
          invested: totalInvested,
          value: balance,
          returns: balance - totalInvested,
        });
      }
    }

    return {
      totalInvested,
      estimatedReturns: balance - totalInvested,
      futureValue: balance,
      yearlyData,
    };
  }, [monthlyInvestment, annualReturn, duration, stepUp]);

  const resetCalculator = () => {
    setMonthlyInvestment("5000");
    setAnnualReturn("12");
    setDuration("10");
    setStepUp("0");
    setHistoryMessage("");
  };

  const handleSaveHistory = () => {
    if (!results) {
      setHistoryMessage("Please enter valid investment details.");
      return;
    }

    const expression =
      `Monthly Investment: ${currency(Number(monthlyInvestment))} | ` +
      `Annual Return: ${annualReturn}% | ` +
      `Duration: ${duration} Years | ` +
      `Step-up: ${stepUp}%`;

    saveCalculation(
      "SIP Calculator",
      expression,
      currency(results.futureValue)
    );

    setHistoryMessage("Calculation saved to history successfully!");
  };

  const chartData = results?.yearlyData || [];
  const chartWidth = 760;
  const chartHeight = 250;
  const chartPadding = 35;

  const maxValue = Math.max(
    1,
    ...chartData.map((item) => item.value)
  );

  const getX = (index) =>
    chartPadding +
    (index / Math.max(1, chartData.length - 1)) *
      (chartWidth - chartPadding * 2);

  const getY = (value) =>
    chartHeight -
    chartPadding -
    (value / maxValue) * (chartHeight - chartPadding * 2);

  const investmentPoints = chartData
    .map((item, index) => `${getX(index)},${getY(item.invested)}`)
    .join(" ");

  const valuePoints = chartData
    .map((item, index) => `${getX(index)},${getY(item.value)}`)
    .join(" ");

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#080817] px-4 py-3 text-white outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080817] via-[#111126] to-[#241044] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="text-sm font-semibold text-purple-300 transition hover:text-white"
          >
            ← Back to Home
          </Link>

          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400">
            FREE SIP CALCULATOR
          </span>
        </div>

        {/* Header */}
        <header className="mb-10 text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-purple-400">
            CALCMASTER PRO
          </p>

          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">
            SIP{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400 sm:text-base">
            Estimate your systematic investment plan with monthly
            contributions, expected returns and annual step-up.
          </p>
        </header>

        {/* Main Layout */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Input Panel */}
          <section className="rounded-3xl border border-purple-400/20 bg-[#111126]/90 p-5 shadow-[0_0_40px_rgba(124,58,237,0.12)] sm:p-7">

            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-xl font-bold">Investment Details</h2>
              <span className="text-2xl">📈</span>
            </div>

            {/* Monthly Investment */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-300">
                Monthly Investment Amount (₹)
              </label>

              <input
                type="number"
                min="1"
                value={monthlyInvestment}
                onChange={(e) => {
                  setMonthlyInvestment(e.target.value);
                  setHistoryMessage("");
                }}
                className={inputClass}
                placeholder="Enter monthly investment"
              />
            </div>

            {/* Annual Return */}
            <div className="mb-6">
              <div className="flex justify-between gap-3">
                <label className="text-sm font-semibold text-slate-300">
                  Expected Annual Return
                </label>

                <span className="font-bold text-purple-300">
                  {annualReturn || 0}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={
                  annualReturn === ""
                    ? 0
                    : Math.min(30, Math.max(0, Number(annualReturn) || 0))
                }
                onChange={(e) => {
                  setAnnualReturn(e.target.value);
                  setHistoryMessage("");
                }}
                className="mt-4 w-full accent-purple-500"
              />

              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={annualReturn}
                onChange={(e) => {
                  setAnnualReturn(e.target.value);
                  setHistoryMessage("");
                }}
                className={inputClass}
              />
            </div>

            {/* Duration */}
            <div className="mb-6">
              <div className="flex justify-between">
                <label className="text-sm font-semibold text-slate-300">
                  Investment Duration
                </label>

                <span className="font-bold text-purple-300">
                  {duration || 0} Years
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="40"
                value={
                  duration === ""
                    ? 1
                    : Math.min(40, Math.max(1, Number(duration) || 1))
                }
                onChange={(e) => {
                  setDuration(e.target.value);
                  setHistoryMessage("");
                }}
                className="mt-4 w-full accent-purple-500"
              />

              <input
                type="number"
                min="1"
                max="50"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                  setHistoryMessage("");
                }}
                className={inputClass}
              />
            </div>

            {/* Step Up */}
            <div className="mb-7">
              <div className="flex justify-between">
                <label className="text-sm font-semibold text-slate-300">
                  Annual Step-up SIP
                </label>

                <span className="font-bold text-blue-300">
                  {stepUp || 0}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="30"
                value={
                  stepUp === ""
                    ? 0
                    : Math.min(30, Math.max(0, Number(stepUp) || 0))
                }
                onChange={(e) => {
                  setStepUp(e.target.value);
                  setHistoryMessage("");
                }}
                className="mt-4 w-full accent-blue-500"
              />

              <input
                type="number"
                min="0"
                max="100"
                value={stepUp}
                onChange={(e) => {
                  setStepUp(e.target.value);
                  setHistoryMessage("");
                }}
                className={inputClass}
              />

              <p className="mt-2 text-xs text-slate-500">
                Increase your monthly contribution every year.
              </p>
            </div>

            <button
              type="button"
              onClick={resetCalculator}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 font-semibold text-slate-300 transition hover:bg-white/10"
            >
              ↻ Reset Calculator
            </button>

          </section>

          {/* Results Panel */}
          <section className="space-y-5">

            <div className="rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-600/20 to-blue-600/10 p-6 shadow-[0_0_40px_rgba(124,58,237,0.12)] sm:p-8">

              <p className="text-sm font-semibold text-purple-200">
                Estimated Future Value
              </p>

              {results ? (
                <h2 className="mt-3 break-words text-4xl font-extrabold sm:text-5xl">
                  {currency(results.futureValue)}
                </h2>
              ) : (
                <h2 className="mt-3 text-3xl font-bold text-red-400">
                  Invalid Input
                </h2>
              )}

              <p className="mt-3 text-xs text-slate-400">
                Estimated value at the end of your investment period.
              </p>

              <button
                type="button"
                onClick={handleSaveHistory}
                disabled={!results}
                className="mt-6 w-full rounded-xl border border-purple-300/20 bg-purple-500/20 py-3 font-semibold text-purple-200 transition hover:bg-purple-500/30 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="mr-2">📚</span>
                Save Calculation to History
              </button>

              {historyMessage && (
                <p
                  className={`mt-3 text-center text-xs ${
                    historyMessage.includes("successfully")
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                  role="status"
                >
                  {historyMessage}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-slate-400">
                  Total Invested
                </p>

                <p className="mt-2 break-words text-xl font-bold text-blue-300">
                  {results ? currency(results.totalInvested) : "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-slate-400">
                  Estimated Returns
                </p>

                <p className="mt-2 break-words text-xl font-bold text-emerald-400">
                  {results ? currency(results.estimatedReturns) : "—"}
                </p>
              </div>

            </div>

            {/* Chart */}
            <div className="rounded-3xl border border-white/10 bg-[#111126]/90 p-5 sm:p-6">

              <h3 className="mb-5 text-lg font-bold">
                Investment Growth
              </h3>

              {results ? (
                <>
                  <div className="overflow-x-auto">
                    <svg
                      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                      className="w-full min-w-[320px]"
                      role="img"
                      aria-label="Estimated SIP investment growth chart"
                    >
                      {[0, 1, 2, 3, 4].map((line) => {
                        const y =
                          chartPadding +
                          (line / 4) *
                            (chartHeight - chartPadding * 2);

                        return (
                          <line
                            key={line}
                            x1={chartPadding}
                            x2={chartWidth - chartPadding}
                            y1={y}
                            y2={y}
                            stroke="rgba(255,255,255,0.10)"
                            strokeDasharray="5 5"
                          />
                        );
                      })}

                      <polyline
                        points={investmentPoints}
                        fill="none"
                        stroke="#60a5fa"
                        strokeWidth="4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />

                      <polyline
                        points={valuePoints}
                        fill="none"
                        stroke="#a78bfa"
                        strokeWidth="4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />

                      {chartData.map((item, index) => (
                        <circle
                          key={item.year}
                          cx={getX(index)}
                          cy={getY(item.value)}
                          r="4"
                          fill="#a78bfa"
                        />
                      ))}

                      <text
                        x={chartPadding}
                        y={chartHeight - 5}
                        fill="#94a3b8"
                        fontSize="12"
                      >
                        Year 0
                      </text>

                      <text
                        x={chartWidth - chartPadding}
                        y={chartHeight - 5}
                        textAnchor="end"
                        fill="#94a3b8"
                        fontSize="12"
                      >
                        Year {duration}
                      </text>
                    </svg>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-5 text-xs text-slate-400">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                      Invested Amount
                    </span>

                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                      Future Value
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-red-400">
                  Please enter valid investment details to view the chart.
                </p>
              )}

            </div>

          </section>
        </div>

        {/* Yearly Report */}
        {results && (
          <section className="mt-7 rounded-3xl border border-white/10 bg-[#111126]/90 p-5 sm:p-7">

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-bold">
                Year-wise Investment Report
              </h2>

              <button
                type="button"
                onClick={() => setShowReport((previous) => !previous)}
                className="rounded-lg border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-300"
              >
                {showReport ? "Hide Report" : "Show Report"}
              </button>
            </div>

            {showReport && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="p-3">Year</th>
                      <th className="p-3">Invested Amount</th>
                      <th className="p-3">Estimated Value</th>
                      <th className="p-3">Estimated Returns</th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.yearlyData.slice(1).map((item) => (
                      <tr
                        key={item.year}
                        className="border-b border-white/5 transition hover:bg-white/5"
                      >
                        <td className="p-3 font-semibold text-white">
                          Year {item.year}
                        </td>

                        <td className="p-3 text-blue-300">
                          {currency(item.invested)}
                        </td>

                        <td className="p-3 text-purple-300">
                          {currency(item.value)}
                        </td>

                        <td className="p-3 text-emerald-400">
                          {currency(item.returns)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Disclaimer */}
        <div className="mt-7 rounded-2xl border border-amber-400/20 bg-amber-500/5 p-5">
          <h3 className="font-bold text-amber-300">
            Important Disclaimer
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            This calculator provides educational estimates based on the
            return rate entered. Actual mutual fund returns are market-linked
            and are not guaranteed. The estimate does not account for taxes,
            fees or changes in market conditions. This is not investment advice.
          </p>
        </div>

        <p className="mt-7 text-center text-xs text-slate-500">
          CalcMaster Pro · SIP Calculator
        </p>

      </div>
    </div>
  );
}
