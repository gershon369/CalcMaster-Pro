export default function CalculatorCard({ calc }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl hover:scale-105 transition">
      <div className="text-5xl">{calc.icon}</div>

      <h2 className="font-bold text-xl mt-4">
        {calc.title}
      </h2>

      {calc.premium && (
        <span className="text-yellow-500 font-semibold">
          Premium
        </span>
      )}
    </div>
  );
}