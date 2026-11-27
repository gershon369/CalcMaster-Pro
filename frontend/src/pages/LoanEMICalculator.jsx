
import { useState } from "react";
import { Link } from "react-router-dom";
import { saveCalculation } from "../utils/saveCalculation";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export default function LoanEMICalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureUnit, setTenureUnit] = useState("years");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculateLoan = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const principal = Number(amount);
    const annualRate = Number(rate);
    const duration = Number(tenure);

    if (!principal || principal <= 0) {
      setError("Please enter a valid loan amount.");
      return;
    }

    if (rate === "" || annualRate < 0 || !Number.isFinite(annualRate)) {
      setError("Please enter a valid interest rate.");
      return;
    }

    if (!duration || duration <= 0) {
      setError("Please enter a valid loan tenure.");
      return;
    }

    const months =
      tenureUnit === "years" ? duration * 12 : duration;

    if (!Number.isInteger(months) || months > 600) {
      setError("Tenure must be between 1 and 600 months.");
      return;
    }

    const monthlyRate = annualRate / 12 / 100;

    let emi;

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);

      emi =
        (principal * monthlyRate * factor) /
        (factor - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    // Generate monthly repayment schedule.
    let balance = principal;
    const schedule = [];

    for (let month = 1; month <= months; month++) {
      const interest = balance * monthlyRate;

      const payment =
        month === months
          ? balance + interest
          : emi;

      const principalPaid = payment - interest;
      const closingBalance = Math.max(
        0,
        balance - principalPaid
      );

      schedule.push({
        month,
        payment,
        principal: principalPaid,
        interest,
        balance: closingBalance,
      });

      balance = closingBalance;
    }

    // Save successful calculation to history.
    const expression =
      `Loan ₹${principal.toLocaleString("en-IN")} | ` +
      `${annualRate}% annual interest | ` +
      `${tenure} ${tenureUnit} (${months} months)`;

    saveCalculation(
      "Loan EMI Calculator",
      expression,
      currency.format(emi)
    );

    setResult({
      emi,
      principal,
      totalInterest,
      totalPayment,
      months,
      schedule,
    });
  };

  const resetCalculator = () => {
    setAmount("");
    setRate("");
    setTenure("");
    setTenureUnit("years");
    setResult(null);
    setError("");
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#080817] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20";

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080817] via-[#111126] to-[#241044] px-4 py-8 text-white sm:px-6">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-purple-300 transition hover:text-white"
          >
            ← Back to Home
          </Link>

          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400">
            FREE CALCULATOR
          </span>
        </div>

        {/* Title */}
        <header className="mb-8 text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-purple-400">
            CALCMASTER PRO
          </p>

          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">
            Loan EMI{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            Calculate your monthly EMI and understand your loan repayment.
          </p>
        </header>

        {/* Calculator Form */}
        <form
          onSubmit={calculateLoan}
          className="rounded-3xl border border-purple-400/20 bg-[#111126]/90 p-5 shadow-[0_0_40px_rgba(124,58,237,0.15)] sm:p-8"
        >

          <div className="mb-7">
            <h2 className="text-xl font-bold text-white">
              Loan Details
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Enter your loan information below.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Loan Amount */}
            <div>
              <label className={labelClass}>
                Loan Amount (₹)
              </label>

              <input
                type="number"
                min="1"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Example: 1000000"
                className={inputClass}
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className={labelClass}>
                Annual Interest Rate (%)
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Example: 8.5"
                className={inputClass}
              />
            </div>

            {/* Tenure */}
            <div>
              <label className={labelClass}>
                Loan Tenure
              </label>

              <input
                type="number"
                min="1"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="Enter loan duration"
                className={inputClass}
              />
            </div>

            {/* Tenure Unit */}
            <div>
              <label className={labelClass}>
                Tenure Unit
              </label>

              <select
                value={tenureUnit}
                onChange={(e) => setTenureUnit(e.target.value)}
                className={inputClass}
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-bold text-white transition hover:opacity-90 active:scale-95"
            >
              Calculate EMI
            </button>

            <button
              type="button"
              onClick={resetCalculator}
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-gray-300 transition hover:bg-white/10"
            >
              Reset
            </button>

          </div>
        </form>

        {/* Results */}
        {result && (
          <section className="mt-8 space-y-6">

            {/* Monthly EMI */}
            <div className="rounded-3xl border border-purple-400/30 bg-gradient-to-br from-purple-600/20 to-blue-600/10 p-6 text-center shadow-[0_0_35px_rgba(124,58,237,0.12)]">

              <p className="text-sm font-medium text-purple-200">
                Your Monthly EMI
              </p>

              <h2 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
                {currency.format(result.emi)}
              </h2>

              <p className="mt-3 text-xs text-gray-400">
                For {result.months} monthly payments
              </p>

            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-gray-400">
                  Principal Amount
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">
                  {currency.format(result.principal)}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-gray-400">
                  Total Interest
                </p>
                <h3 className="mt-2 text-xl font-bold text-purple-300">
                  {currency.format(result.totalInterest)}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-gray-400">
                  Total Payment
                </p>
                <h3 className="mt-2 text-xl font-bold text-blue-300">
                  {currency.format(result.totalPayment)}
                </h3>
              </div>

            </div>

            {/* Principal vs Interest */}
            <div className="rounded-3xl border border-white/10 bg-[#111126]/90 p-5 sm:p-7">

              <h3 className="mb-5 text-lg font-bold">
                Payment Breakdown
              </h3>

              <div className="mb-4 flex h-4 overflow-hidden rounded-full bg-white/10">
                <div
                  className="bg-purple-500 transition-all"
                  style={{
                    width: `${
                      (result.principal / result.totalPayment) * 100
                    }%`,
                  }}
                />

                <div
                  className="bg-blue-400 transition-all"
                  style={{
                    width: `${
                      (result.totalInterest / result.totalPayment) * 100
                    }%`,
                  }}
                />
              </div>

              <div className="flex flex-wrap justify-between gap-4 text-sm">

                <div>
                  <span className="mr-2 inline-block h-3 w-3 rounded-sm bg-purple-500" />
                  Principal
                  <p className="mt-1 font-bold text-white">
                    {currency.format(result.principal)}
                  </p>
                </div>

                <div>
                  <span className="mr-2 inline-block h-3 w-3 rounded-sm bg-blue-400" />
                  Interest
                  <p className="mt-1 font-bold text-white">
                    {currency.format(result.totalInterest)}
                  </p>
                </div>

              </div>
            </div>

            {/* Repayment Schedule */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111126]/90">

              <div className="p-5 sm:p-7">
                <h3 className="text-lg font-bold">
                  Monthly Repayment Schedule
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Principal and interest details for each month.
                </p>
              </div>

              <div className="max-h-[420px] overflow-auto">

                <table className="w-full min-w-[650px] text-left text-sm">

                  <thead className="sticky top-0 bg-[#21183d] text-purple-200">
                    <tr>
                      <th className="px-4 py-3">Month</th>
                      <th className="px-4 py-3">EMI</th>
                      <th className="px-4 py-3">Principal</th>
                      <th className="px-4 py-3">Interest</th>
                      <th className="px-4 py-3">Balance</th>
                    </tr>
                  </thead>

                  <tbody>
                    {result.schedule.map((item) => (
                      <tr
                        key={item.month}
                        className="border-t border-white/5 text-gray-300 hover:bg-white/5"
                      >
                        <td className="px-4 py-3">
                          {item.month}
                        </td>

                        <td className="px-4 py-3">
                          {currency.format(item.payment)}
                        </td>

                        <td className="px-4 py-3 text-purple-300">
                          {currency.format(item.principal)}
                        </td>

                        <td className="px-4 py-3 text-blue-300">
                          {currency.format(item.interest)}
                        </td>

                        <td className="px-4 py-3">
                          {currency.format(item.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500">
              This is an estimate based on the entered rate and tenure.
              Actual lender charges and repayment terms may differ.
            </p>

          </section>
        )}

        <p className="mt-8 text-center text-xs text-slate-500">
          CalcMaster Pro · Loan EMI Calculator
        </p>

      </div>
    </div>
  );
}
