
import { useEffect, useRef, useState } from "react";
import API from "../services/api";
import {
  FaRobot,
  FaPlus,
  FaPaperPlane,
  FaTrash,
  FaBars,
  FaTimes,
  FaComments,
} from "react-icons/fa";

const AI_API =
  import.meta.env.VITE_AI_API_URL || "http://127.0.0.1:8000";

export default function AIChat() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const loadChats = async () => {
    try {
      const { data } = await API.get("/chats");
      setChats(data.chats || []);
    } catch (error) {
      console.error("Chat history error:", error);
    }
  };

  const newChat = async () => {
    try {
      const { data } = await API.post("/chats");
      setActiveChat(data.chat._id);
      setMessages([]);
      setChats((prev) => [data.chat, ...prev]);
      setSidebarOpen(false);
    } catch (error) {
      alert("Please login to create a chat.");
    }
  };

  const openChat = async (id) => {
    try {
      const { data } = await API.get(`/chats/${id}`);
      setActiveChat(data.chat._id);
      setMessages(data.chat.messages || []);
      setSidebarOpen(false);
    } catch (error) {
      alert("Unable to open chat.");
    }
  };

  const deleteChat = async (id) => {
    if (!window.confirm("Delete this chat?")) return;

    try {
      await API.delete(`/chats/${id}`);

      setChats((prev) => prev.filter((chat) => chat._id !== id));

      if (activeChat === id) {
        setActiveChat(null);
        setMessages([]);
      }
    } catch (error) {
      alert("Unable to delete chat.");
    }
  };

  const deleteAllChats = async () => {
    if (!window.confirm("Delete all your chat history?")) return;

    try {
      await API.delete("/chats");
      setChats([]);
      setActiveChat(null);
      setMessages([]);
    } catch (error) {
      alert("Unable to delete chat history.");
    }
  };

  const saveMessage = async (chatId, role, content) => {
    const { data } = await API.post(
      `/chats/${chatId}/messages`,
      { role, content }
    );
    return data.chat;
  };

  const handleSend = async () => {
    const question = prompt.trim();

    if (!question || loading) return;

    let chatId = activeChat;

    if (!chatId) {
      try {
        const { data } = await API.post("/chats");
        chatId = data.chat._id;
        setActiveChat(chatId);
      } catch (error) {
        alert("Please login first.");
        return;
      }
    }

    setPrompt("");
    setLoading(true);

    const userMessage = {
      role: "user",
      content: question,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      await saveMessage(chatId, "user", question);

      const response = await fetch(`${AI_API}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          language: "English",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "AI service failed.");
      }

      const answer = result.answer || "No answer received.";

      await saveMessage(chatId, "assistant", answer);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
          createdAt: new Date(),
        },
      ]);

      await loadChats();
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, something went wrong: ${error.message}`,
          createdAt: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex min-h-[650px] overflow-hidden rounded-3xl border border-purple-500/20 bg-[#0b0716] text-white shadow-2xl shadow-purple-950/30">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-purple-500/20 bg-[#100b20] p-5 transition-transform md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600">
              <FaRobot className="text-xl" />
            </div>
            <div>
              <h2 className="font-bold">CalcMaster AI</h2>
              <p className="text-xs text-purple-300">Math Assistant</p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 md:hidden"
          >
            <FaTimes />
          </button>
        </div>

        <button
          onClick={newChat}
          className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-700 to-violet-500 p-3 font-semibold transition hover:opacity-90"
        >
          <FaPlus />
          New Chat
        </button>

        <div className="mb-3 mt-8 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Recent Chats
          </p>

          <button
            onClick={deleteAllChats}
            title="Delete all history"
            className="text-gray-500 transition hover:text-red-400"
          >
            <FaTrash />
          </button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat._id}
              className={`group flex items-center gap-2 rounded-xl p-3 transition ${
                activeChat === chat._id
                  ? "bg-purple-600/20 text-purple-200"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              <button
                onClick={() => openChat(chat._id)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                <FaComments className="shrink-0" />
                <span className="truncate text-sm">
                  {chat.title || "New Chat"}
                </span>
              </button>

              <button
                onClick={() => deleteChat(chat._id)}
                className="text-gray-500 opacity-100 transition hover:text-red-400 md:opacity-0 md:group-hover:opacity-100"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}

          {chats.length === 0 && (
            <p className="py-5 text-center text-sm text-gray-600">
              No chat history yet.
            </p>
          )}
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="text-xs text-gray-500">
            Powered by local Ollama AI
          </p>
        </div>
      </aside>

      {/* MAIN CHAT */}
      <main className="flex min-w-0 flex-1 flex-col">

        {/* HEADER */}
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-purple-300 md:hidden"
            >
              <FaBars />
            </button>

            <div>
              <h2 className="font-bold md:text-xl">
                AI Mathematics Tutor
              </h2>
              <p className="mt-1 text-xs text-green-400">
                ● Local AI Connected
              </p>
            </div>
          </div>

          <button
            onClick={newChat}
            className="rounded-lg border border-purple-500/30 px-3 py-2 text-xs text-purple-300 hover:bg-purple-500/10"
          >
            + New Chat
          </button>
        </header>

        {/* MESSAGES */}
        <section className="flex-1 space-y-6 overflow-y-auto p-5 md:p-8">

          {messages.length === 0 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-600/20 text-purple-300">
                <FaRobot size={36} />
              </div>

              <h3 className="text-2xl font-bold">
                How can I help you today?
              </h3>

              <p className="mt-3 max-w-md text-sm text-gray-400">
                Ask maths questions, solve equations and understand
                calculations step by step.
              </p>

              <div className="mt-8 grid w-full max-w-lg gap-3 sm:grid-cols-2">
                {[
                  "Explain 25 × 8 step by step",
                  "Solve 2x + 5 = 15",
                  "Explain Pythagoras theorem",
                  "Calculate 15% of 250",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setPrompt(item)}
                    className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 text-left text-sm text-gray-300 transition hover:border-purple-400 hover:bg-purple-500/10"
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
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-600">
                  <FaRobot />
                </div>
              )}

              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl p-4 text-sm leading-7 md:max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-purple-700 to-violet-600 text-white"
                    : "border border-white/10 bg-[#171126] text-gray-200"
                }`}
              >
                {msg.content}

                <p className="mt-2 text-[10px] opacity-50">
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-sm text-purple-300">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600">
                <FaRobot />
              </div>
              AI is thinking...
              <span className="animate-pulse">● ● ●</span>
            </div>
          )}

          <div ref={bottomRef} />
        </section>

        {/* INPUT */}
        <footer className="border-t border-white/10 bg-[#100b20] p-4 md:p-6">
          <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-2xl border border-purple-500/30 bg-[#080611] p-2 focus-within:border-purple-400">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask CalcMaster AI anything..."
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600"
            />

            <button
              onClick={handleSend}
              disabled={!prompt.trim() || loading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaPaperPlane />
            </button>
          </div>

          <p className="mt-3 text-center text-[10px] text-gray-600">
            CalcMaster AI can make mistakes. Verify important calculations.
          </p>
        </footer>
      </main>
    </div>
  );
}
