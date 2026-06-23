export default function PersonalizationSection() {

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-5">
        Personalization
      </h2>

      <button className="w-full bg-purple-600 py-3 rounded-xl mb-3">
        🌙 Dark Mode
      </button>

      <button className="w-full bg-white/10 py-3 rounded-xl">
        🌐 Language
      </button>

    </div>
  );
}