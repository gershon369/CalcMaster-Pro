
import { useState } from "react";
import { Link } from "react-router-dom";

const gstRates = ["0", "5", "12", "18", "28", "40"];

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const roundMoney = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [customRate, setCustomRate] = useState("");
  const [cessRate, setCessRate] = useState("0");
  const [discount, setDiscount] = useState("0");

  const [calculationType, setCalculationType] = useState("exclusive");
  const [supplyType, setSupplyType] = useState("intra");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const selectedRate =
    gstRate === "custom" ? Number(customRate) : Number(gstRate);

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#080817] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20";

  const labelClass = "mb-2 block text-sm font-medium text-gray-300";

  const calculateGST = (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    const enteredAmount = Number(amount);
        if (gstRate === "custom" && customRate.trim() === "") {
      setError("Please enter a custom GST rate.");
      return;
    }
    const additionalCess = Number(cessRate);
    const discountPercent = Number(discount || 0);

    if (!amount || !Number.isFinite(enteredAmount) || enteredAmount <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    if (
      !Number.isFinite(taxRate) ||
      taxRate < 0 ||
      taxRate > 100
    ) {
      setError("Please enter a valid GST rate between 0 and 100.");
      return;
    }

    if (
      !Number.isFinite(additionalCess) ||
      additionalCess < 0 ||
      additionalCess > 100
    ) {
      setError("Please enter a valid cess rate between 0 and 100.");
      return;
    }

    if (
      !Number.isFinite(discountPercent) ||
      discountPercent < 0 ||
      discountPercent > 100
    ) {
      setError("Discount must be between 0 and 100 percent.");
      return;
    }

    const discountAmount = roundMoney(
      enteredAmount * discountPercent / 100
    );

    const netAmount = enteredAmount - discountAmount;

    const combinedRate = taxRate + additionalCess;

    let taxableValue;

    if (calculationType === "exclusive") {
      taxableValue = netAmount;
    } else {
      taxableValue = netAmount / (1 + combinedRate / 100);
    }

    const gstAmount = roundMoney(taxableValue * taxRate / 100);
    const cessAmount = roundMoney(
      taxableValue * additionalCess / 100
    );

    const cgst = supplyType === "intra"
      ? roundMoney(gstAmount / 2)
      : 0;

    const sgst = supplyType === "intra"
      ? roundMoney(gstAmount - cgst)
      : 0;

    const igst = supplyType === "inter"
      ? gstAmount
      : 0;

    const finalTaxableValue = roundMoney(taxableValue);
    const finalAmount = roundMoney(
      finalTaxableValue + gstAmount + cessAmount
    );

    setResult({
      enteredAmount: roundMoney(enteredAmount),
      discountAmount,
      taxableValue: finalTaxableValue,
      gstRate: taxRate,
      gstAmount,
      cgst,
      sgst,
      igst,
      cessRate: additionalCess,
      cessAmount,
      finalAmount,
      totalTax: roundMoney(gstAmount + cessAmount),
      discountPercent,
      calculationType,
      supplyType,
    });
  };

  const resetCalculator = () => {
    setAmount("");
    setGstRate("18");
    setCustomRate("");
    setCessRate("0");
    setDiscount("0");
    setCalculationType("exclusive");
    setSupplyType("intra");
    setResult(null);
    setError("");
  };

  const optionClass = (active) =>
    `rounded-xl border px-4 py-3 text-sm font-semibold transition ${
      active
        ? "border-purple-400/40 bg-purple-600/30 text-white shadow-lg"
        : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080817] via-[#111126] to-[#241044] px-4 py-8 text-white sm:px-6">

      <div className="mx-auto max-w-5xl">

        {/* Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-purple-300 transition hover:text-white"
          >
            ← Back to Home
          </Link>

          <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-300">
            ★ PREMIUM CALCULATOR
          </span>
        </div>

        {/* Header */}
        <header className="mb-9 text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-purple-400">
            CALCMASTER PRO
          </p>

          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">
            GST{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            Calculate GST, tax breakdown and final invoice amount.
          </p>
        </header>

        {/* Calculator Form */}
        <form
          onSubmit={calculateGST}
          className="rounded-3xl border border-purple-400/20 bg-[#111126]/90 p-5 shadow-[0_0_40px_rgba(124,58,237,0.15)] sm:p-8"
        >

          <div className="mb-7">
            <h2 className="text-xl font-bold">
              GST Calculation Details
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Enter the amount and select your GST calculation options.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Amount */}
            <div>
              <label className={labelClass}>
                Amount (₹)
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Example: 10000"
                className={inputClass}
              />
            </div>

            {/* Calculation Mode */}
            <div>
              <label className={labelClass}>
                GST Calculation Type
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCalculationType("exclusive")}
                  className={optionClass(calculationType === "exclusive")}
                >
                  Add GST
                  <span className="mt-1 block text-[10px] font-normal opacity-70">
                    Exclusive
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCalculationType("inclusive")}
                  className={optionClass(calculationType === "inclusive")}
                >
                  GST Included
                  <span className="mt-1 block text-[10px] font-normal opacity-70">
                    Inclusive
                  </span>
                </button>
              </div>
            </div>

            {/* GST Rate */}
            <div>
              <label className={labelClass}>
                GST Rate (%)
              </label>

              <select
                value={gstRate}
                onChange={(e) => setGstRate(e.target.value)}
                className={inputClass}
              >
                {gstRates.map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}%
                  </option>
                ))}

                <option value="custom">Custom Rate</option>
              </select>
            </div>

            {/* Custom Rate */}
            {gstRate === "custom" && (
              <div>
                <label className={labelClass}>
                  Custom GST Rate (%)
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  step="any"
                  value={customRate}
                  onChange={(e) => setCustomRate(e.target.value)}
                  placeholder="Enter custom GST rate"
                  className={inputClass}
                />
              </div>
            )}

            {/* Supply Type */}
            <div>
              <label className={labelClass}>
                Supply Type
              </label>

              <select
                value={supplyType}
                onChange={(e) => setSupplyType(e.target.value)}
                className={inputClass}
              >
                <option value="intra">
                  Intra-State (CGST + SGST)
                </option>

                <option value="inter">
                  Inter-State (IGST)
                </option>
              </select>
            </div>

            {/* Cess */}
            <div>
              <label className={labelClass}>
                Additional Cess (%)
              </label>

              <input
                type="number"
                min="0"
                max="100"
                step="any"
                value={cessRate}
                onChange={(e) => setCessRate(e.target.value)}
                placeholder="Default: 0"
                className={inputClass}
              />

              <p className="mt-2 text-xs text-slate-500">
                Enter cess only when applicable.
              </p>
            </div>

            {/* Discount */}
            <div>
              <label className={labelClass}>
                Discount (%)
              </label>

              <input
                type="number"
                min="0"
                max="100"
                step="any"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Default: 0"
                className={inputClass}
              />

              <p className="mt-2 text-xs text-slate-500">
                Discount is deducted before tax calculation.
              </p>
            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-bold text-white transition hover:opacity-90 active:scale-95"
            >
              Calculate GST
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

            {/* Final Amount */}
            <div className="rounded-3xl border border-purple-400/30 bg-gradient-to-br from-purple-600/20 to-blue-600/10 p-7 text-center shadow-[0_0_35px_rgba(124,58,237,0.12)]">

              <p className="text-sm font-medium text-purple-200">
                Final Amount Payable
              </p>

              <h2 className="mt-3 break-all text-4xl font-extrabold text-white sm:text-5xl">
                {money.format(result.finalAmount)}
              </h2>

              <p className="mt-3 text-xs text-slate-400">
                Including applicable GST and cess
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-[#111126]/90 p-5">
                <p className="text-xs text-gray-400">
                  Taxable Amount
                </p>

                <h3 className="mt-2 text-xl font-bold text-white">
                  {money.format(result.taxableValue)}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111126]/90 p-5">
                <p className="text-xs text-gray-400">
                  Total GST
                </p>

                <h3 className="mt-2 text-xl font-bold text-purple-300">
                  {money.format(result.gstAmount)}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111126]/90 p-5">
                <p className="text-xs text-gray-400">
                  Total Tax + Cess
                </p>

                <h3 className="mt-2 text-xl font-bold text-blue-300">
                  {money.format(result.totalTax)}
                </h3>
              </div>

            </div>

            {/* Detailed Breakdown */}
            <div className="rounded-3xl border border-white/10 bg-[#111126]/90 p-5 sm:p-7">

              <h3 className="mb-5 text-xl font-bold">
                Tax Breakdown
              </h3>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between gap-3 text-gray-400">
                  <span>Original Amount</span>
                  <span className="text-white">
                    {money.format(result.enteredAmount)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-gray-400">
                  <span>Discount ({result.discountPercent}%)</span>
                  <span className="text-emerald-400">
                    − {money.format(result.discountAmount)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 border-t border-white/10 pt-4 font-semibold">
                  <span>Taxable Amount</span>
                  <span className="text-white">
                    {money.format(result.taxableValue)}
                  </span>
                </div>

                {result.supplyType === "intra" ? (
                  <>
                    <div className="flex justify-between gap-3 text-gray-400">
                      <span>CGST ({result.gstRate / 2}%)</span>
                      <span className="text-purple-300">
                        {money.format(result.cgst)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3 text-gray-400">
                      <span>SGST / UTGST ({result.gstRate / 2}%)</span>
                      <span className="text-purple-300">
                        {money.format(result.sgst)}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between gap-3 text-gray-400">
                    <span>IGST ({result.gstRate}%)</span>
                    <span className="text-purple-300">
                      {money.format(result.igst)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between gap-3 text-gray-400">
                  <span>Additional Cess ({result.cessRate}%)</span>
                  <span className="text-blue-300">
                    {money.format(result.cessAmount)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 border-t border-white/10 pt-4 text-base font-bold">
                  <span>Final Amount</span>
                  <span className="text-white">
                    {money.format(result.finalAmount)}
                  </span>
                </div>

              </div>
            </div>

            {/* Tax Visualization */}
            <div className="rounded-3xl border border-white/10 bg-[#111126]/90 p-5 sm:p-7">

              <h3 className="mb-5 text-lg font-bold">
                Amount Distribution
              </h3>

              <div className="flex h-5 overflow-hidden rounded-full bg-white/10">

                <div
                  className="bg-purple-500"
                  style={{
                    width: `${
                      result.taxableValue / result.finalAmount * 100
                    }%`,
                  }}
                />

                <div
                  className="bg-blue-400"
                  style={{
                    width: `${
                      result.totalTax / result.finalAmount * 100
                    }%`,
                  }}
                />

              </div>

              <div className="mt-5 flex flex-wrap gap-5 text-xs text-gray-400">

                <span>
                  <span className="mr-2 inline-block h-3 w-3 rounded-sm bg-purple-500" />
                  Taxable Amount
                </span>

                <span>
                  <span className="mr-2 inline-block h-3 w-3 rounded-sm bg-blue-400" />
                  GST + Cess
                </span>

              </div>
            </div>

            {/* Calculation Info */}
            <div className="rounded-2xl border border-purple-400/10 bg-purple-500/5 p-5">

              <h3 className="font-bold text-purple-300">
                Calculation Information
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {result.calculationType === "exclusive"
                  ? "GST was added to the taxable amount."
                  : "GST was extracted from the amount that already includes tax."}
              </p>

              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {result.supplyType === "intra"
                  ? "The selected intra-state supply displays GST as CGST and SGST/UTGST."
                  : "The selected inter-state supply displays GST as IGST."}
              </p>

            </div>

          </section>
        )}

        {/* GST Information */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-[#111126]/90 p-5 sm:p-6">

          <h3 className="text-lg font-bold text-purple-300">
            About GST Calculation
          </h3>

          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-400">

            <p>
              <strong className="text-white">GST Exclusive:</strong>{" "}
              GST is calculated on the taxable value and added to the amount.
            </p>

            <p>
              <strong className="text-white">GST Inclusive:</strong>{" "}
              GST is separated from an amount that already includes tax.
            </p>

            <p>
              <strong className="text-white">Intra-State:</strong>{" "}
              GST is generally divided into CGST and SGST/UTGST.
            </p>

            <p>
              <strong className="text-white">Inter-State:</strong>{" "}
              IGST is calculated on the taxable value.
            </p>

          </div>

        </section>

        {/* Disclaimer */}
        <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/5 p-5">

          <h3 className="font-bold text-amber-300">
            Important GST Rate Notice
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Rate options are calculation presets, not a classification
            of products or services. The applicable GST rate depends on
            the nature and classification of the supply, including its
            HSN/SAC code and relevant notifications. Verify the applicable
            rate before using this calculation for an invoice or tax filing.
            Cess should only be entered where applicable.
          </p>

        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          CalcMaster Pro · Professional GST Calculator
        </p>

      </div>
    </div>
  );
}
