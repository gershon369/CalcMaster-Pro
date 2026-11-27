
import { useState } from "react";
import { Link } from "react-router-dom";
import { saveCalculation } from "../utils/saveCalculation";

export default function BMICalculator() {
  const [age, setAge] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");

  const [heightCm, setHeightCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#080817] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20";

  const labelClass = "mb-2 block text-sm font-medium text-gray-300";

  const calculateBMI = (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    const ageValue = Number(age);
    const weightValue = Number(weight);

    if (!age || !Number.isInteger(ageValue) || ageValue < 2 || ageValue > 120) {
      setError("Please enter a valid age.");
      return;
    }

    if (!weight || !Number.isFinite(weightValue) || weightValue <= 0) {
      setError("Please enter a valid weight.");
      return;
    }

    let heightInMeters;

    if (heightUnit === "cm") {
      const heightValue = Number(heightCm);

      if (!heightCm || !Number.isFinite(heightValue) || heightValue <= 0) {
        setError("Please enter a valid height in centimetres.");
        return;
      }

      heightInMeters = heightValue / 100;
    } else {
      const feetValue = Number(feet || 0);
      const inchesValue = Number(inches || 0);

      if (
        !((feet && feetValue >= 0) || (inches && inchesValue > 0)) ||
        !Number.isFinite(feetValue) ||
        !Number.isFinite(inchesValue) ||
        inchesValue < 0 ||
        inchesValue >= 12 ||
        (feetValue === 0 && inchesValue === 0)
      ) {
        setError("Please enter valid feet and inches.");
        return;
      }

      const totalInches = feetValue * 12 + inchesValue;
      heightInMeters = totalInches * 0.0254;
    }

    if (heightInMeters <= 0) {
      setError("Please enter a valid height.");
      return;
    }

    const weightInKg =
      weightUnit === "kg" ? weightValue : weightValue * 0.45359237;

    const bmi = weightInKg / (heightInMeters * heightInMeters);

    const formattedBMI = bmi.toFixed(2);

    // Save BMI result without storing personal measurements.
    saveCalculation(
      "BMI Calculator",
      "BMI calculation (measurements not stored)",
      `BMI: ${formattedBMI}`
    );

    setResult({
      bmi: formattedBMI,
      age: ageValue,
      height: heightInMeters.toFixed(2),
      weight: weightInKg.toFixed(2),
      heightUnit,
      weightUnit,
    });
  };

  const resetCalculator = () => {
    setAge("");
    setHeightUnit("cm");
    setWeightUnit("kg");
    setHeightCm("");
    setFeet("");
    setInches("");
    setWeight("");
    setResult(null);
    setError("");
  };

  const UnitButton = ({ selected, onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
        selected
          ? "bg-purple-600 text-white shadow-lg"
          : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080817] via-[#111126] to-[#241044] px-4 py-8 text-white sm:px-6">

      <div className="mx-auto max-w-5xl">

        {/* Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-purple-300 hover:text-white"
          >
            ← Back to Home
          </Link>

          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400">
            FREE CALCULATOR
          </span>
        </div>

        {/* Heading */}
        <header className="mb-10 text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-purple-400">
            CALCMASTER PRO
          </p>

          <h1 className="mt-3 text-3xl font-extrabold sm:text-5xl">
            BMI{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            Body Mass Index calculator with metric and imperial units.
          </p>
        </header>

        {/* Calculator Form */}
        <form
          onSubmit={calculateBMI}
          className="rounded-3xl border border-purple-400/20 bg-[#111126]/90 p-5 shadow-[0_0_40px_rgba(124,58,237,0.15)] sm:p-8"
        >

          <div className="mb-7">
            <h2 className="text-xl font-bold">
              Enter Your Details
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Enter your age, height and weight to calculate BMI.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Age */}
            <div>
              <label className={labelClass}>
                Age (Years)
              </label>

              <input
                type="number"
                min="2"
                max="120"
                step="1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                className={inputClass}
              />
            </div>

            {/* Weight Unit */}
            <div>
              <label className={labelClass}>
                Weight Unit
              </label>

              <div className="flex gap-2 rounded-xl border border-white/10 bg-[#080817] p-1">
                <UnitButton
                  selected={weightUnit === "kg"}
                  onClick={() => setWeightUnit("kg")}
                >
                  Kilograms (kg)
                </UnitButton>

                <UnitButton
                  selected={weightUnit === "lb"}
                  onClick={() => setWeightUnit("lb")}
                >
                  Pounds (lb)
                </UnitButton>
              </div>
            </div>

            {/* Height Unit */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Height Unit
              </label>

              <div className="flex gap-2 rounded-xl border border-white/10 bg-[#080817] p-1 sm:w-fit">
                <UnitButton
                  selected={heightUnit === "cm"}
                  onClick={() => setHeightUnit("cm")}
                >
                  Centimetres (cm)
                </UnitButton>

                <UnitButton
                  selected={heightUnit === "ft"}
                  onClick={() => setHeightUnit("ft")}
                >
                  Feet / Inches
                </UnitButton>
              </div>
            </div>

            {/* Height in CM */}
            {heightUnit === "cm" ? (
              <div className="md:col-span-2">
                <label className={labelClass}>
                  Height (cm)
                </label>

                <input
                  type="number"
                  min="1"
                  step="any"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  placeholder="Example: 170"
                  className={inputClass}
                />
              </div>
            ) : (
              <>
                <div>
                  <label className={labelClass}>
                    Height (Feet)
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    placeholder="Example: 5"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Height (Inches)
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="11.99"
                    step="any"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    placeholder="Example: 7"
                    className={inputClass}
                  />
                </div>
              </>
            )}

            {/* Weight Input */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Weight ({weightUnit === "kg" ? "Kilograms" : "Pounds"})
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={
                  weightUnit === "kg"
                    ? "Enter weight in kg"
                    : "Enter weight in pounds"
                }
                className={inputClass}
              />
            </div>

          </div>

          {/* Error Message */}
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
              Calculate BMI
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

        {/* Result */}
        {result && (
          <section className="mt-8 rounded-3xl border border-purple-400/20 bg-[#111126]/90 p-6 shadow-[0_0_35px_rgba(124,58,237,0.12)] sm:p-8">

            <div className="text-center">
              <p className="text-sm font-medium text-purple-300">
                Your Calculated BMI
              </p>

              <h2 className="mt-4 text-5xl font-extrabold text-white">
                {result.bmi}
              </h2>

              <p className="mt-3 text-xs text-slate-400">
                BMI is a numerical screening measurement, not a diagnosis.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xs text-slate-400">
                  Age
                </p>
                <p className="mt-2 text-xl font-bold text-white">
                  {result.age} years
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xs text-slate-400">
                  Height
                </p>
                <p className="mt-2 text-xl font-bold text-white">
                  {result.height} m
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xs text-slate-400">
                  Weight
                </p>
                <p className="mt-2 text-xl font-bold text-white">
                  {result.weight} kg
                </p>
              </div>

            </div>

            <div className="mt-6 rounded-2xl border border-purple-400/10 bg-purple-500/5 p-5">

              <h3 className="font-bold text-purple-300">
                BMI Formula
              </h3>

              <p className="mt-3 text-sm text-slate-300">
                BMI = Weight (kg) ÷ Height (m)²
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Your calculation uses converted metric measurements,
                regardless of the units selected above.
              </p>

            </div>

          </section>
        )}

        {/* Information */}
        <section className="mt-8 grid gap-5 md:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-[#111126]/90 p-5">
            <h3 className="font-bold text-purple-300">
              What is BMI?
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Body Mass Index (BMI) is a numerical screening measurement
              calculated using height and weight. It can be one part of a
              broader health assessment, but it does not directly measure
              body composition or diagnose a health condition.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111126]/90 p-5">
            <h3 className="font-bold text-blue-300">
              Supported Units
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Height can be entered in centimetres or feet and inches.
              Weight can be entered in kilograms or pounds. The calculator
              automatically converts the measurements before calculating.
            </p>
          </div>

        </section>

        {/* Disclaimer */}
        <section className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/5 p-5 sm:p-6">

          <h3 className="font-bold text-amber-300">
            Important Health Disclaimer
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            BMI is a general screening calculation, not a diagnosis.
            For teenagers, interpretation depends on age and sex-specific
            growth charts. Adult BMI categories should not be used to
            interpret a teenager's result. Consult a qualified healthcare
            professional for personal interpretation.
          </p>

        </section>

        <p className="mt-8 text-center text-xs text-slate-500">
          CalcMaster Pro · BMI Calculator
        </p>

      </div>
    </div>
  );
}
