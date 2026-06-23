import { useState } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello 👋, I am your AI Calculator Assistant.",
    },
  ]);

  const [prompt, setPrompt] = useState("");

  const handleSend = () => {
    if (!prompt.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: prompt,
      },
      {
        type: "ai",
        text: `You asked: ${prompt}`,
      },
    ]);

    setPrompt("");
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        🤖 AI Calculator Assistant
      </h2>

      <div className="h-96 overflow-y-auto space-y-4 mb-6">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-4 rounded-2xl ${
              msg.type === "user"
                ? "ml-auto bg-purple-600 text-white"
                : "bg-black/40 text-gray-300"
            }`}
          >
            {msg.text}
          </div>
        ))}

      </div>

      <div className="flex gap-3">

        <input
          type="text"
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          placeholder="Ask anything..."
          className="flex-1 p-4 rounded-xl bg-black/40 text-white border border-white/10"
        />

        <button
          onClick={handleSend}
          className="bg-purple-600 px-6 rounded-xl text-white"
        >
          Send
        </button>

      </div>

    </div>
  );
}