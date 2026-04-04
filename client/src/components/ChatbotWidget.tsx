import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Minimize2, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  id: "welcome",
  content: `Hi! 👋 I'm Sakis's AI assistant. I can answer questions about his professional background, skills, AI capabilities, and the types of projects he builds.\n\nWhat would you like to know?`,
};

const QUICK_QUESTIONS = [
  "What AI solutions can Sakis build?",
  "What are his main skills?",
  "Tell me about his projects",
  "How can I contact Sakis?",
];

function nanoid() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── 3D Robot SVG Icon ────────────────────────────────────────────────────────
function RobotFace({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative z-10"
    >
      {/* Antenna pole */}
      <rect x="16.5" y="1" width="3" height="5" rx="1.5" fill="rgba(0,0,0,0.45)" />
      {/* Antenna ball */}
      <circle cx="18" cy="1.5" r="2.2" fill="white" opacity="0.92" />
      <circle cx="18" cy="1.5" r="1" fill="#00e5e5" opacity="0.9" />

      {/* Head */}
      <rect x="4" y="6" width="28" height="21" rx="5.5" fill="rgba(0,0,0,0.38)" />
      {/* Head inner highlight */}
      <rect x="5" y="7" width="26" height="4" rx="3" fill="rgba(255,255,255,0.06)" />

      {/* Left eye */}
      <rect x="7.5" y="11" width="8" height="6.5" rx="2.5" fill="#00e5e5" opacity="0.95" />
      {/* Right eye */}
      <rect x="20.5" y="11" width="8" height="6.5" rx="2.5" fill="#00e5e5" opacity="0.95" />
      {/* Left pupil */}
      <circle cx="11.5" cy="14.2" r="2.2" fill="rgba(0,0,0,0.75)" />
      {/* Right pupil */}
      <circle cx="24.5" cy="14.2" r="2.2" fill="rgba(0,0,0,0.75)" />
      {/* Eye shine left */}
      <circle cx="12.5" cy="12.8" r="0.9" fill="white" opacity="0.95" />
      {/* Eye shine right */}
      <circle cx="25.5" cy="12.8" r="0.9" fill="white" opacity="0.95" />

      {/* Mouth grille background */}
      <rect x="9" y="21" width="18" height="4" rx="2" fill="rgba(0,0,0,0.45)" />
      {/* Mouth grille dots */}
      <rect x="11" y="22" width="2.5" height="2" rx="0.7" fill="#00e5e5" opacity="0.75" />
      <rect x="14.8" y="22" width="2.5" height="2" rx="0.7" fill="#00e5e5" opacity="0.75" />
      <rect x="18.6" y="22" width="2.5" height="2" rx="0.7" fill="#00e5e5" opacity="0.75" />
      <rect x="22.4" y="22" width="2.5" height="2" rx="0.7" fill="#00e5e5" opacity="0.75" />

      {/* Neck */}
      <rect x="14" y="27" width="8" height="4" rx="2" fill="rgba(0,0,0,0.3)" />
      {/* Body */}
      <rect x="7" y="31" width="22" height="5" rx="3" fill="rgba(0,0,0,0.22)" />
      {/* Chest light */}
      <circle cx="18" cy="33.5" r="1.8" fill="#00e5e5" opacity="0.85" />
      <circle cx="18" cy="33.5" r="0.8" fill="white" opacity="0.7" />
    </svg>
  );
}

// ─── Small robot icon for chat header & bubbles ───────────────────────────────
function SmallRobotIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16.5" y="1" width="3" height="5" rx="1.5" fill="rgba(0,0,0,0.45)" />
      <circle cx="18" cy="1.5" r="2.2" fill="white" opacity="0.92" />
      <rect x="4" y="6" width="28" height="21" rx="5.5" fill="rgba(0,0,0,0.38)" />
      <rect x="7.5" y="11" width="8" height="6.5" rx="2.5" fill="#00e5e5" opacity="0.95" />
      <rect x="20.5" y="11" width="8" height="6.5" rx="2.5" fill="#00e5e5" opacity="0.95" />
      <circle cx="11.5" cy="14.2" r="2.2" fill="rgba(0,0,0,0.75)" />
      <circle cx="24.5" cy="14.2" r="2.2" fill="rgba(0,0,0,0.75)" />
      <circle cx="12.5" cy="12.8" r="0.9" fill="white" opacity="0.95" />
      <circle cx="25.5" cy="12.8" r="0.9" fill="white" opacity="0.95" />
      <rect x="9" y="21" width="18" height="4" rx="2" fill="rgba(0,0,0,0.45)" />
      <rect x="11" y="22" width="2.5" height="2" rx="0.7" fill="#00e5e5" opacity="0.75" />
      <rect x="14.8" y="22" width="2.5" height="2" rx="0.7" fill="#00e5e5" opacity="0.75" />
      <rect x="18.6" y="22" width="2.5" height="2" rx="0.7" fill="#00e5e5" opacity="0.75" />
      <rect x="22.4" y="22" width="2.5" height="2" rx="0.7" fill="#00e5e5" opacity="0.75" />
    </svg>
  );
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = trpc.chat.message.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content, id: nanoid() },
      ]);
    },
    onError: (err: { message?: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: err.message || "Sorry, I encountered an error. Please try again.",
          id: nanoid(),
        },
      ]);
    },
  });

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || sendMessage.isPending) return;

    const userMsg: Message = { role: "user", content, id: nanoid() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");

    const history = updatedMessages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    sendMessage.mutate({ messages: history });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ── 3D Floating Robot Button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open AI assistant"
            className="fixed bottom-6 right-6 z-50 group cursor-pointer"
            style={{ filter: "drop-shadow(0 0 22px rgba(0,229,229,0.6))" }}
          >
            {/* Outer pulse ring 1 */}
            <span
              className="absolute inset-0 rounded-2xl animate-ping pointer-events-none"
              style={{
                background: "rgba(0,229,229,0.18)",
                animationDuration: "2s",
                borderRadius: "18px",
              }}
            />
            {/* Outer pulse ring 2 — larger, slower */}
            <span
              className="absolute -inset-2.5 rounded-2xl animate-ping pointer-events-none"
              style={{
                background: "rgba(0,229,229,0.08)",
                animationDuration: "3s",
                animationDelay: "0.5s",
                borderRadius: "22px",
              }}
            />

            {/* Floating bob animation */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* 3D Robot Shell */}
              <div
                className="relative w-16 h-16 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
                style={{
                  borderRadius: "18px",
                  background: "linear-gradient(145deg, #00f0f0 0%, #00c8c8 45%, #007e7e 100%)",
                  boxShadow: [
                    "0 10px 36px rgba(0,229,229,0.5)",
                    "0 2px 0 rgba(255,255,255,0.3) inset",
                    "0 -4px 0 rgba(0,0,0,0.4) inset",
                    "4px 0 10px rgba(0,0,0,0.25) inset",
                    "-2px 0 6px rgba(255,255,255,0.1) inset",
                  ].join(", "),
                }}
              >
                {/* Top gloss shine */}
                <div
                  className="absolute top-1.5 left-2.5 right-2.5 h-3.5 pointer-events-none"
                  style={{
                    borderRadius: "10px 10px 50% 50%",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)",
                  }}
                />
                {/* Left edge highlight */}
                <div
                  className="absolute top-3 left-1.5 w-1 bottom-3 pointer-events-none"
                  style={{
                    borderRadius: "4px",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
                  }}
                />

                <RobotFace size={36} />

                {/* Bottom ground shadow / glow */}
                <div
                  className="absolute -bottom-3 left-1 right-1 h-4 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(0,200,200,0.5) 0%, transparent 70%)",
                    filter: "blur(5px)",
                  }}
                />
              </div>

              {/* "Chat with me" tooltip label */}
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                className="absolute right-[72px] top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
              >
                <div
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
                  style={{
                    background: "rgba(10,20,30,0.85)",
                    border: "1px solid rgba(0,229,229,0.3)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Ask me anything
                  {/* Arrow */}
                  <span
                    className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft: "6px solid rgba(10,20,30,0.85)",
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] flex flex-col glass-strong rounded-2xl shadow-2xl border border-primary/20 overflow-hidden"
            style={{ maxHeight: isMinimized ? "auto" : "560px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-gradient-to-r from-primary/15 to-accent/10">
              <div className="flex items-center gap-2.5">
                {/* Mini 3D robot in header */}
                <div
                  className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderRadius: "10px",
                    background: "linear-gradient(145deg, #00e5e5 0%, #009999 100%)",
                    boxShadow: "0 4px 12px rgba(0,229,229,0.4), 0 1px 0 rgba(255,255,255,0.25) inset",
                  }}
                >
                  <SmallRobotIcon />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    Sakis's AI Assistant
                    <Sparkles className="w-3 h-3 text-primary" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Online · Powered by Gemini</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                  aria-label="Minimize"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "360px" }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-message-in`}
                    >
                      {msg.role === "assistant" && (
                        <div
                          className="w-7 h-7 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                          style={{
                            borderRadius: "8px",
                            background: "linear-gradient(145deg, #00e5e5 0%, #009999 100%)",
                            boxShadow: "0 2px 8px rgba(0,229,229,0.35)",
                          }}
                        >
                          <SmallRobotIcon />
                        </div>
                      )}
                      <div
                        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "glass border border-border/60 text-foreground rounded-tl-sm"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <div className="prose prose-sm prose-invert max-w-none text-foreground [&>p]:mb-1 [&>p:last-child]:mb-0">
                            <Streamdown>{msg.content}</Streamdown>
                          </div>
                        ) : (
                          msg.content
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {sendMessage.isPending && (
                    <div className="flex justify-start animate-message-in">
                      <div
                        className="w-7 h-7 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                        style={{
                          borderRadius: "8px",
                          background: "linear-gradient(145deg, #00e5e5 0%, #009999 100%)",
                          boxShadow: "0 2px 8px rgba(0,229,229,0.35)",
                        }}
                      >
                        <SmallRobotIcon />
                      </div>
                      <div className="glass border border-border/60 rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick questions */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSend(q)}
                          className="text-xs px-2.5 py-1.5 rounded-lg glass border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything about Sakis..."
                      disabled={sendMessage.isPending}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-secondary border border-border/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all disabled:opacity-60"
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || sendMessage.isPending}
                      className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
                      aria-label="Send message"
                    >
                      {sendMessage.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground/60 mt-2">
                    Powered by Gemini AI
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
