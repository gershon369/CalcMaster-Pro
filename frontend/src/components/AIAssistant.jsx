
import { useState } from "react";
import { FaRobot, FaPaperPlane, FaWandMagicSparkles } from "react-icons/fa6";

export default function AIAssistant() {
  const [question, setQuestion] = useState("");

  const handleAsk = () => {
    if (!question.trim()) return;

    // AI API integration baad mein add karenge.
    alert("AI Assistant API will be connected soon!");
  };

  return (
    <section id="ai" className="relative px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-[#19172e] via-[#111326] to-[#080d1a] p-6 md:p-12 shadow-2xl">

        {/* Background Glow */}
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center gap-5 mb-8">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-3xl text-violet-300 shadow-lg shadow-violet-500/10">
              <FaRobot />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
                Intelligent Assistance
              </span>

              <h2 className="mt-1 text-3xl md:text-4xl font-extrabold text-white">
                AI Math{" "}
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Assistant
                </span>
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Powered by GPT-4o mini
              </p>
            </div>

          </div>

          {/* Description */}
          <p className="mb-6 text-sm md:text-base leading-relaxed text-slate-300">
            Have a math question? Ask our AI Assistant and get help with
            calculations, formulas and mathematical concepts.
          </p>

          {/* Input */}
          <div className="rounded-2xl border border-white/10 bg-black/30 p-3 transition-all duration-300 focus-within:border-violet-400/50 focus-within:shadow-lg focus-within:shadow-violet-500/10">

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask any math question..."
              rows={5}
              className="w-full resize-none bg-transparent p-3 text-white placeholder:text-slate-500 outline-none"
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white/10 pt-3">

              <span className="flex items-center gap-2 px-2 text-xs text-slate-500">
                <FaWandMagicSparkles className="text-violet-400" />
                Smart AI assistance
              </span>

              <button
                onClick={handleAsk}
                disabled={!question.trim()}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                Ask AI
                <FaPaperPlane />
              </button>

            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            AI responses will be available after API integration.
          </p>

        </div>
      </div>
    </section>
  );
}
