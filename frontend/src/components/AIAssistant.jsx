
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import {
  FaRobot,
  FaPaperPlane,
  FaUser,
  FaWandMagicSparkles,
} from "react-icons/fa6";

const AI_API =
  import.meta.env.VITE_AI_API_URL || "http://127.0.0.1:8000";

function formatMath(text = "") {
  return text
    .replace(/\\\[/g, "$$")
    .replace(/\\\]/g, "$$")
    .replace(/\\\(/g, "$")
    .replace(/\\\)/g, "$");
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSend = async () => {
    const text = question.trim();

    if (!text || isLoading) return;

    const userMessage = {
      role: "user",
      content: text,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${AI_API}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: text,
          language: "English",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to get AI response."
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer || "No response received.",
          createdAt: new Date(),
        },
      ]);
    } catch (err) {
      setError(err.message || "AI service unavailable.");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section
      id="ai"
      className="relative px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-purple-500/20 bg-[#0c0a18] text-white shadow-2xl shadow-purple-950/30">

        {/* HEADER */}
        <header className="flex items-center justify-between border-b border-white/10 bg-[#151025] px-5 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/20 text-xl text-purple-300">
              <FaRobot />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                CalcMaster <span className="text-purple-400">AI</span>
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                <span className="mr-1 text-green-400">●</span>
                Powered by local Ollama AI
              </p>
            </div>
          </div>

          <div className="hidden rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-2 text-xs text-purple-300 sm:block">
            Intelligent Assistance
          </div>
        </header>

        {/* CONVERSATION */}
        <div className="min-h-[420px] max-h-[600px] space-y-7 overflow-y-auto p-5 md:p-8">

          {messages.length === 0 && (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-purple-500/20 bg-purple-500/10 text-4xl text-purple-300">
                <FaWandMagicSparkles />
              </div>

              <h3 className="text-2xl font-bold">
                How can I help you today?
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                Ask questions, solve mathematical problems
                and understand calculations step by step.
              </p>

              <div className="mt-7 grid w-full max-w-lg gap-3 sm:grid-cols-2">
                {[
                  "Explain 25 × 8 step by step",
                  "Solve 2x + 5 = 15",
                  "Calculate 15% of 250",
                  "Explain Pythagoras theorem",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuestion(item)}
                    className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 text-left text-sm text-gray-300 transition hover:border-purple-400/50 hover:bg-purple-500/10"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white">
                  <FaRobot />
                </div>
              )}

              <div className="max-w-[88%] md:max-w-[78%]">
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-purple-700 to-violet-600 text-white"
                      : "border border-white/10 bg-[#191429] text-gray-200"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-invert prose-sm max-w-none break-words prose-headings:text-purple-300 prose-strong:text-white prose-code:text-purple-300">
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {formatMath(msg.content)}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap text-sm leading-7">
                      {msg.content}
                    </p>
                  )}
                </div>

                <div
                  className={`mt-2 flex items-center gap-2 text-[11px] text-gray-500 ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <span>
                    {msg.role === "user" ? "You" : "CalcMaster AI"}
                  </span>
                  <span>·</span>
                  <span>
                    {formatTime(msg.createdAt)}
                  </span>
                  <span>·</span>
                  <span>Just now</span>
                </div>
              </div>

              {msg.role === "user" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-purple-400/30 bg-purple-500/20 text-purple-200">
                  <FaUser />
                </div>
              )}
            </div>
          ))}

          {/* TYPING INDICATOR */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600">
                <FaRobot />
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#191429] px-5 py-4">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400 [animation-delay:300ms]" />
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  CalcMaster AI is thinking...
                </p>
              </div>
            </div>
          )}

          {error && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <div ref={bottomRef} />
        </div>

        {/* MESSAGE INPUT */}
        <footer className="border-t border-white/10 bg-[#110d20] p-4 md:p-6">
          <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-2xl border border-purple-500/30 bg-[#080611] p-2 focus-within:border-purple-400">

            <textarea
              ref={inputRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
              placeholder="Message CalcMaster AI..."
              className="max-h-32 min-h-12 flex-1 resize-y bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500"
            />

            <button
              onClick={handleSend}
              disabled={!question.trim() || isLoading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>

          <p className="mt-3 text-center text-[10px] text-gray-600">
            AI can make mistakes. Verify important calculations.
          </p>
        </footer>
      </div>
    </section>
  );
}
