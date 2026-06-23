export default function AIAssistant() {
  return (
    <section id="ai" className="px-4 md:px-8 py-16 md:py-20">
      <h2 className="text-4xl font-bold text-white mb-4">
        🤖 AI Math Assistant
      </h2>

      <p className="text-gray-300 mb-8">
        Powered by GPT-4o mini
      </p>

      <textarea
        placeholder="Ask any math question..."
        className="w-full h-40 rounded-2xl p-5 bg-black/30 text-white"
      />

      <button className="mt-5 bg-purple-600 px-8 py-3 rounded-xl text-white">
        Ask AI
      </button>
    </section>
  );
}