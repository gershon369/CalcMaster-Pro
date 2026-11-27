
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
  FaImage,
  FaTimesCircle,
} from "react-icons/fa";

const AI_API =
  import.meta.env.VITE_AI_API_URL || "http://127.0.0.1:8000";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function AIChat() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
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
      setPrompt("");
      removeSelectedImage();

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
      removeSelectedImage();
      setSidebarOpen(false);
    } catch (error) {
      alert("Unable to open chat.");
    }
  };

  const deleteChat = async (id) => {
    if (!window.confirm("Delete this chat?")) return;

    try {
      await API.delete(`/chats/${id}`);

      setChats((prev) =>
        prev.filter((chat) => chat._id !== id)
      );

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
      removeSelectedImage();
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

  // IMAGE UPLOAD
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert("Only JPG, PNG and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert("Image size must not exceed 20 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage({
        file,
        preview: reader.result,
        name: file.name,
      });
    };

    reader.onerror = () => {
      alert("Unable to read this image.");
    };

    reader.readAsDataURL(file);
  };

  // REMOVE IMAGE
  const removeSelectedImage = () => {
    setSelectedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // SEND MESSAGE
  const handleSend = async () => {
    const question = prompt.trim();

    if ((!question && !selectedImage) || loading) return;

    let chatId = activeChat;

    if (!chatId) {
      try {
        const { data } = await API.post("/chats");

        chatId = data.chat._id;

        setActiveChat(chatId);
        setChats((prev) => [data.chat, ...prev]);
      } catch (error) {
        alert("Please login first.");
        return;
      }
    }

    const imageToSend = selectedImage;

    setPrompt("");
    removeSelectedImage();
    setLoading(true);

    const userMessage = {
      role: "user",
      content: question,
      image: imageToSend?.preview || null,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // IMAGE UI MODE - BACKEND INTEGRATION PENDING
    if (imageToSend) {
      try {
        await saveMessage(
          chatId,
          "user",
          question || `[Image attached: ${imageToSend.name}]`
        );

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Your image is attached successfully in this chat UI. Image analysis will be available after backend integration.",
            createdAt: new Date(),
          },
        ]);

        await loadChats();
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Unable to save image message: ${error.message}`,
            createdAt: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }

      return;
    }

    // EXISTING TEXT AI CHAT
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
        throw new Error(
          result.detail || "AI service failed."
        );
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
    <div className="flex h-[100dvh] min-h-[600px] w-full overflow-hidden border border-purple-500/20 bg-[#080611] text-white shadow-2xl shadow-purple-950/30">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col border-r border-purple-500/20 bg-[#100b20] p-5 transition-transform md:static md:h-full md:translate-x-0 ${
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
              <p className="text-xs text-purple-300">
                Math Assistant
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 md:hidden"
          >
            <FaTimes />
          </button>
        </div>

        {/* NEW CHAT */}
        <button
          onClick={newChat}
          className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-700 to-violet-500 p-3 font-semibold transition hover:opacity-90"
        >
          <FaPlus />
          New Chat
        </button>

        {/* RECENT CHATS */}
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

        <div className="hide-scrollbar min-h-0 flex-1 space-y-2 overflow-y-auto">
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

        {/* SIDEBAR FOOTER */}
        <div className="shrink-0 border-t border-white/10 pt-4">
          <p className="text-xs text-gray-500">
            Powered by local Ollama AI
          </p>
        </div>
      </aside>

      {/* MAIN CHAT */}
      <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col">

        {/* HEADER */}
        <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-5 md:px-8">
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
            className="rounded-lg border border-purple-500/30 px-3 py-2 text-xs text-purple-300 transition hover:bg-purple-500/10"
          >
            + New Chat
          </button>
        </header>

        {/* MESSAGES AREA */}
        <section className="hide-scrollbar min-h-0 flex-1 space-y-6 overflow-y-auto p-5 md:p-8">

          {/* EMPTY CHAT SCREEN */}
          {messages.length === 0 && (
            <div className="flex min-h-full flex-col items-center justify-center py-10 text-center">
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

          {/* CHAT MESSAGES */}
{messages.map((msg, index) => (
  <div
    key={index}
    className={`flex w-full gap-3 ${
      msg.role === "user"
        ? "justify-end"
        : "justify-start"
    }`}
  >
    {msg.role === "assistant" && (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 shadow-lg shadow-purple-900/30">
        <FaRobot />
      </div>
    )}

    <div
      className={`flex max-w-[85%] flex-col gap-2 md:max-w-[65%] ${
        msg.role === "user" ? "items-end" : "items-start"
      }`}
    >
      {/* IMAGE CARD */}
      {msg.image && (
        <div className="overflow-hidden rounded-2xl border border-purple-400/30 bg-[#171126] p-1 shadow-lg shadow-purple-950/20">
          <img
            src={msg.image}
            alt="Uploaded attachment"
            className="max-h-[320px] max-w-full rounded-xl object-contain"
          />

          <div className="flex items-center gap-2 px-3 py-2 text-xs text-purple-200">
            <FaImage />
            Image attachment
          </div>
        </div>
      )}

      {/* TEXT MESSAGE */}
      {msg.content && (
        <div
          className={`min-w-[90px] rounded-2xl px-4 py-3 text-sm leading-7 ${
            msg.role === "user"
              ? "rounded-br-md border border-violet-400/20 bg-gradient-to-br from-[#7828e8] via-[#6521ca] to-[#4820a4] text-white shadow-lg shadow-purple-950/30"
              : "rounded-bl-md border border-white/10 bg-[#171326] text-gray-200 shadow-lg shadow-black/10"
          }`}
        >
          <p className="whitespace-pre-wrap break-words">
            {msg.content}
          </p>

          <p className="mt-2 text-right text-[10px] text-white/50">
            {msg.createdAt
              ? new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </p>
        </div>
      )}
    </div>
  </div>
))}

          {/* AI LOADING */}
          {loading && (
            <div className="flex items-center gap-3 text-sm text-purple-300">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600">
                <FaRobot />
              </div>

              AI is thinking...

              <span className="animate-pulse">
                ● ● ●
              </span>
            </div>
          )}

          <div ref={bottomRef} />
        </section>

        {/* INPUT FOOTER */}
        <footer className="shrink-0 border-t border-white/10 bg-[#100b20] p-4 md:p-6">
          <div className="mx-auto w-full max-w-4xl">

            {/* IMAGE PREVIEW */}
            {selectedImage && (
              <div className="mb-3 flex items-center gap-3 rounded-xl border border-purple-500/30 bg-[#171126] p-3">
                <img
                  src={selectedImage.preview}
                  alt="Image preview"
                  className="h-16 w-16 rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white">
                    {selectedImage.name}
                  </p>

                  <p className="text-xs text-purple-300">
                    {(selectedImage.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                <button
                  onClick={removeSelectedImage}
                  className="text-red-400 transition hover:text-red-300"
                  title="Remove image"
                >
                  <FaTimesCircle size={20} />
                </button>
              </div>
            )}

            {/* INPUT BOX */}
            <div className="flex items-center gap-2 rounded-2xl border border-purple-500/30 bg-[#080611] p-2 transition focus-within:border-purple-400">

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageSelect}
                className="hidden"
              />

              {/* IMAGE UPLOAD */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                title="Upload image (Maximum 20 MB)"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-purple-300 transition hover:bg-purple-500/20 hover:text-white disabled:opacity-40"
              >
                <FaImage size={19} />
              </button>

              {/* TEXT INPUT */}
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
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-gray-600"
              />

              {/* SEND BUTTON */}
              <button
                onClick={handleSend}
                disabled={(!prompt.trim() && !selectedImage) || loading}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaPaperPlane />
              </button>
            </div>

            <p className="mt-3 text-center text-[10px] text-gray-600">
              Upload JPG, PNG or WEBP • Maximum 20 MB
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
