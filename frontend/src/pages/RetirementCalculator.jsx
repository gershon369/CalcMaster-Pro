
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const initialValues = {
  currentAge: "25",
  retirementAge: "60",
  lifeExpectancy: "85",
  monthlyExpenses: "30000",
  currentSavings: "500000",
  monthlyInvestment: "10000",
  preReturn: "10",
  postReturn: "7",
  inflation: "6",
  stepUp: "0",
};

const formatMoney = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const formatCompact = (value) => {
  if (!Number.isFinite(value)) return "₹0";
  if (Math.abs(value) >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }
  if (Math.abs(value) >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }
  return formatMoney(value);
};

function InputField({ label, value, onChange, suffix, min = 0, max }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="flex items-center rounded-xl border border-white/10 bg-[#0b1020] focus-within:border-purple-500">
        <input
          type="number"
          min={min}
          max={max}
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent px-4 py-3 text-white outline-none"
        />
        {suffix && (
          <span className="px-4 text-sm text-slate-400">{suffix}</span>
        )}
      </div>
    </div>
  );
}

function ResultCard({ title, value, description, color = "purple" }) {
  const colors = {
    purple: "from-purple-600/20 to-purple-900/10 text-purple-300",
    blue: "from-blue-600/20 to-blue-900/10 text-blue-300",
    green: "from-emerald-600/20 to-emerald-900/10 text-emerald-300",
    red: "from-red-600/20 to-red-900/10 text-red-300",
  };

  return (
    <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${colors[color]} p-5`}>
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-3 break-words text-2xl font-bold">{value}</h3>
      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function GrowthChart({ data, target }) {
  const width = 700;
  const height = 260;
  const padding = 35;

  const maxValue = Math.max(
    1,
    target,
    ...data.map((item) => item.savings)
  );

  const x = (index) =>
    padding +
    (index / Math.max(1, data.length - 1)) * (width - padding * 2);

  const y = (value) =>
    height - padding - (value / maxValue) * (height - padding * 2);

  const points = data
    .map((item, index) => `${x(index)},${y(item.savings)}`)
    .join(" ");

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] p-4">
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          Projected Savings
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-5 border-t-2 border-dashed border-blue-400" />
          Required Corpus
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Retirement savings growth chart">
        {[0, 1, 2, 3, 4].map((line) => {
          const lineY = padding + (line / 4) * (height - padding * 2);
          return (
            <line
              key={line}
              x1={padding}
              y1={lineY}
              x2={width - padding}
              y2={lineY}
              stroke="#334155"
              strokeDasharray="4 6"
              opacity="0.5"
            />
          );
        })}

        <line
          x1={padding}
          y1={y(target)}
          x2={width - padding}
          y2={y(target)}
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="7 6"
        />

        <polyline
          points={points}
          fill="none"
          stroke="#a78bfa"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {data.map((item, index) => (
          <circle
            key={item.age}
            cx={x(index)}
            cy={y(item.savings)}
            r="3"
            fill="#c4b5fd"
          />
        ))}

        <text x={padding} y={height - 8} fill="#94a3b8" fontSize="12">
          Age {data[0]?.age}
        </text>
        <text x={width - padding} y={height - 8} fill="#94a3b8" fontSize="12" textAnchor="end">
          Age {data[data.length - 1]?.age}
        </text>
      </svg>

      <div className="mt-3 flex justify-between text-xs text-slate-500">
        <span>Projected savings over time</span>
        <span>Amounts in INR</span>
      </div>
    </div>
  );
}

export default function RetirementCalculator() {
  const [values, setValues] = useState(initialValues);
  const [showReport, setShowReport] = useState(true);

  const update = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const currentAge = Number(values.currentAge);
  const retirementAge = Number(values.retirementAge);
  const lifeExpectancy = Number(values.lifeExpectancy);
  const monthlyExpenses = Number(values.monthlyExpenses);
  const currentSavings = Number(values.currentSavings);
  const monthlyInvestment = Number(values.monthlyInvestment);
  const preReturn = Number(values.preReturn);
  const postReturn = Number(values.postReturn);
  const inflation = Number(values.inflation);
  const stepUp = Number(values.stepUp);

  const valid =
    Number.isFinite(currentAge) &&
    Number.isFinite(retirementAge) &&
    Number.isFinite(lifeExpectancy) &&
    Number.isFinite(monthlyExpenses) &&
    Number.isFinite(currentSavings) &&
    Number.isFinite(monthlyInvestment) &&
    Number.isFinite(preReturn) &&
    Number.isFinite(postReturn) &&
    Number.isFinite(inflation) &&
    Number.isFinite(stepUp) &&
    currentAge >= 1 &&
    currentAge <= 100 &&
    retirementAge > currentAge &&
    retirementAge <= 100 &&
    lifeExpectancy > retirementAge &&
    lifeExpectancy <= 120 &&
    monthlyExpenses > 0 &&
    currentSavings >= 0 &&
    monthlyInvestment >= 0 &&
    preReturn >= 0 &&
    preReturn <= 30 &&
    postReturn >= 0 &&
    postReturn <= 30 &&
    inflation >= 0 &&
    inflation <= 20 &&
    stepUp >= 0 &&
    stepUp <= 100;

  const result = useMemo(() => {
    if (!valid) return null;

    const yearsToRetirement = retirementAge - currentAge;
    const retirementYears = lifeExpectancy - retirementAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const retirementMonths = retirementYears * 12;

    const preMonthlyRate =
      Math.pow(1 + preReturn / 100, 1 / 12) - 1;

    const postMonthlyRate =
      Math.pow(1 + postReturn / 100, 1 / 12) - 1;

    const inflationMonthlyRate =
      Math.pow(1 + inflation / 100, 1 / 12) - 1;

    const monthlyExpenseAtRetirement =
      monthlyExpenses *
      Math.pow(1 + inflation / 100, yearsToRetirement);

    // Required corpus: present value of inflation-adjusted
    // monthly retirement expenses.
    let requiredCorpus = 0;
    let futureMonthlyExpense = monthlyExpenseAtRetirement;

    for (let month = 1; month <= retirementMonths; month++) {
      if (month > 1) {
        futureMonthlyExpense *= 1 + inflationMonthlyRate;
      }

      requiredCorpus +=
        futureMonthlyExpense /
        Math.pow(1 + postMonthlyRate, month);
    }

    // Future value of current savings and monthly investments.
    let projectedSavings = currentSavings;
    let investedAmount = currentSavings;
    let monthlyContribution = monthlyInvestment;

    const growthData = [
      {
        age: currentAge,
        savings: currentSavings,
      },
    ];

    for (let month = 1; month <= monthsToRetirement; month++) {
      projectedSavings =
        projectedSavings * (1 + preMonthlyRate) +
        monthlyContribution;

      investedAmount += monthlyContribution;

      // Increase monthly contribution after every 12 months.
      if (month % 12 === 0 && stepUp > 0) {
        monthlyContribution *= 1 + stepUp / 100;
      }

      if (month % 12 === 0) {
        growthData.push({
          age: currentAge + month / 12,
          savings: projectedSavings,
        });
      }
    }

    const estimatedReturns = projectedSavings - investedAmount;
    const difference = projectedSavings - requiredCorpus;
    const fundedPercent =
      requiredCorpus > 0
        ? (projectedSavings / requiredCorpus) * 100
        : 0;

    return {
      yearsToRetirement,
      retirementYears,
      monthlyExpenseAtRetirement,
      requiredCorpus,
      projectedSavings,
      investedAmount,
      estimatedReturns,
      difference,
      fundedPercent,
      growthData,
    };
  }, [
    valid,
    currentAge,
    retirementAge,
    lifeExpectancy,
    monthlyExpenses,
    currentSavings,
    monthlyInvestment,
    preReturn,
    postReturn,
    inflation,
    stepUp,
  ]);

  const reset = () => {
    setValues(initialValues);
    setShowReport(true);
  };

  return (
    <div className="min-h-screen bg-[#070816] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-purple-700/10 blur-[120px]" />
        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link to="/" className="mb-4 inline-flex text-sm text-slate-400 hover:text-purple-300">
              ← Back to Home
            </Link>

            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-3xl">
                🎯
              </div>
              <div>
                <h1 className="text-3xl font-black md:text-4xl">
                  Retirement <span className="text-purple-400">Planner</span>
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Estimate your future retirement savings and corpus.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={reset}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 hover:border-purple-500 hover:text-white"
          >
            ↻ Reset All
          </button>
        </div>

        {/* Intro */}
        <div className="mb-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
          <h2 className="font-semibold text-blue-300">
            Plan your retirement goals
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Enter hypothetical values to estimate how inflation, savings and
            investment growth may affect your future retirement corpus.
          </p>
        </div>

        {/* Inputs */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="mb-7">
            <h2 className="text-xl font-bold">Your Retirement Details</h2>
            <p className="mt-1 text-sm text-slate-400">
              Change the values to explore different scenarios.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <InputField
              label="Current Age"
              value={values.currentAge}
              onChange={(v) => update("currentAge", v)}
              suffix="Years"
              min={1}
              max={100}
            />
            <InputField
              label="Retirement Age"
              value={values.retirementAge}
              onChange={(v) => update("retirementAge", v)}
              suffix="Years"
              min={2}
              max={100}
            />
            <InputField
              label="Life Expectancy"
              value={values.lifeExpectancy}
              onChange={(v) => update("lifeExpectancy", v)}
              suffix="Years"
              min={3}
              max={120}
            />
            <InputField
              label="Current Monthly Expenses"
              value={values.monthlyExpenses}
              onChange={(v) => update("monthlyExpenses", v)}
              suffix="INR"
            />
            <InputField
              label="Current Savings"
              value={values.currentSavings}
              onChange={(v) => update("currentSavings", v)}
              suffix="INR"
            />
            <InputField
              label="Monthly Investment"
              value={values.monthlyInvestment}
              onChange={(v) => update("monthlyInvestment", v)}
              suffix="INR"
            />
            <InputField
              label="Expected Annual Return Before Retirement"
              value={values.preReturn}
              onChange={(v) => update("preReturn", v)}
              suffix="%"
              max={30}
            />
            <InputField
              label="Expected Annual Return After Retirement"
              value={values.postReturn}
              onChange={(v) => update("postReturn", v)}
              suffix="%"
              max={30}
            />
            <InputField
              label="Annual Inflation Rate"
              value={values.inflation}
              onChange={(v) => update("inflation", v)}
              suffix="%"
              max={20}
            />
            <InputField
              label="Annual Investment Step-up"
              value={values.stepUp}
              onChange={(v) => update("stepUp", v)}
              suffix="%"
              max={100}
            />
          </div>

          <div className="mt-6 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
            <p className="text-sm text-purple-300">
              Step-up means increasing your monthly investment every year by
              the selected percentage.
            </p>
          </div>
        </div>

        {/* Validation */}
        {!valid && (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300">
            Please check your inputs:
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Retirement age must be greater than current age.</li>
              <li>Life expectancy must be greater than retirement age.</li>
              <li>Monthly expenses must be greater than zero.</li>
              <li>Rates and savings must be within the allowed ranges.</li>
            </ul>
          </div>
        )}

        {/* Results */}
        {valid && result && (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Retirement Summary</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Estimated results based on your entered assumptions.
                </p>
              </div>
              <button
                onClick={() => setShowReport(!showReport)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:border-purple-500"
              >
                {showReport ? "Hide Report" : "Show Report"}
              </button>
            </div>

            {showReport && (
              <>
                <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <ResultCard
                    title="Required Retirement Corpus"
                    value={formatCompact(result.requiredCorpus)}
                    description="Estimated amount needed at retirement"
                    color="purple"
                  />
                  <ResultCard
                    title="Projected Savings"
                    value={formatCompact(result.projectedSavings)}
                    description="Estimated savings at retirement"
                    color="blue"
                  />
                  <ResultCard
                    title="Total Invested"
                    value={formatCompact(result.investedAmount)}
                    description="Current savings + future contributions"
                    color="green"
                  />
                  <ResultCard
                    title="Estimated Returns"
                    value={formatCompact(result.estimatedReturns)}
                    description="Projected growth on invested amounts"
                    color="purple"
                  />
                </div>

                <div className="mb-8 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="mb-2 text-lg font-bold">
                      Retirement Readiness
                    </h3>
                    <p className="mb-6 text-sm text-slate-400">
                      Projected savings compared with required corpus.
                    </p>

                    <div className="mb-3 flex items-end justify-between gap-3">
                      <span className="text-3xl font-black text-purple-300">
                        {result.fundedPercent.toFixed(1)}%
                      </span>
                      <span className="text-xs text-slate-500">
                        Estimated funding level
                      </span>
                    </div>

                    <div className="h-4 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500"
                        style={{
                          width: `${Math.min(100, result.fundedPercent)}%`,
                        }}
                      />
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-[#0b1020] p-4">
                      <p className="text-sm text-slate-400">
                        {result.difference >= 0
                          ? "Estimated Surplus"
                          : "Estimated Shortfall"}
                      </p>
                      <h3 className={`mt-2 text-2xl font-bold ${result.difference >= 0 ? "text-emerald-300" : "text-red-300"}`}>
                        {formatCompact(Math.abs(result.difference))}
                      </h3>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="mb-5 text-lg font-bold">
                      Retirement Expense Estimate
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between gap-3 border-b border-white/10 pb-4">
                        <span className="text-sm text-slate-400">Years until retirement</span>
                        <strong>{result.yearsToRetirement} years</strong>
                      </div>
                      <div className="flex justify-between gap-3 border-b border-white/10 pb-4">
                        <span className="text-sm text-slate-400">Retirement duration</span>
                        <strong>{result.retirementYears} years</strong>
                      </div>
                      <div className="flex justify-between gap-3 border-b border-white/10 pb-4">
                        <span className="text-sm text-slate-400">Monthly expenses at retirement</span>
                        <strong>{formatMoney(result.monthlyExpenseAtRetirement)}</strong>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-sm text-slate-400">Current monthly expenses</span>
                        <strong>{formatMoney(monthlyExpenses)}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="mb-2 text-lg font-bold">
                    Investment Growth Chart
                  </h3>
                  <p className="mb-5 text-sm text-slate-400">
                    Illustrative growth of projected savings until retirement.
                  </p>
                  <GrowthChart
                    data={result.growthData}
                    target={result.requiredCorpus}
                  />
                </div>

                <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
                  <div className="border-b border-white/10 p-5">
                    <h3 className="text-lg font-bold">Year-wise Savings Report</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Estimated balance at the end of each year.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] text-left text-sm">
                      <thead className="bg-white/5 text-slate-400">
                        <tr>
                          <th className="p-4">Age</th>
                          <th className="p-4">Year</th>
                          <th className="p-4 text-right">Projected Savings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.growthData.map((item, index) => (
                          <tr key={item.age} className="border-t border-white/5">
                            <td className="p-4">{item.age}</td>
                            <td className="p-4">{index === 0 ? "Today" : `Year ${index}`}</td>
                            <td className="p-4 text-right font-semibold text-purple-300">
                              {formatMoney(item.savings)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Disclaimer */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <h3 className="font-semibold text-slate-300">
            Important Information
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            This calculator provides educational estimates based on the
            assumptions entered. Actual investment returns, inflation,
            expenses, taxes and market conditions may differ. The calculation
            assumes monthly contributions at the end of each month and a
            simplified monthly withdrawal model after retirement. It does not
            account for taxes, fees or unexpected expenses. Results are not
            guaranteed and are not financial advice.
          </p>
        </div>

        <div className="mt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} CalcMaster Pro · Retirement Calculator
        </div>
      </div>
    </div>
  );
}
