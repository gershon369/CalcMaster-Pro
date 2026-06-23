export default function Stats() {
  return (
    <section className="grid md:grid-cols-4 gap-6 p-10">

      <div className="bg-white/10 rounded-2xl p-6">
        <h2 className="text-4xl text-white">30+</h2>
        <p className="text-gray-300">Calculators</p>
      </div>

      <div className="bg-white/10 rounded-2xl p-6">
        <h2 className="text-4xl text-white">50K+</h2>
        <p className="text-gray-300">Users</p>
      </div>

      <div className="bg-white/10 rounded-2xl p-6">
        <h2 className="text-4xl text-white">99.9%</h2>
        <p className="text-gray-300">Accuracy</p>
      </div>

      <div className="bg-white/10 rounded-2xl p-6">
        <h2 className="text-4xl text-white">24/7</h2>
        <p className="text-gray-300">AI Support</p>
      </div>

    </section>
  );
}