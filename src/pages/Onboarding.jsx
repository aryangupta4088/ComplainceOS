import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, HelpCircle, ArrowUp } from "lucide-react";
import ProgressBar from "../components/ui/ProgressBar";
import { setToken, setRole, setUserId } from "../utils/helpers";

const INITIAL_MESSAGES = [
  { id: "a1", role: "ai", text: "Welcome to ComplianceOS. I'm here to streamline your regulatory journey. First, let's establish your baseline." },
  { id: "a2", role: "ai", text: "To get started, what is your business name and type — shop, factory, service, food, or other?" },
];

const QUICK_CHIPS = ["GST Shop", "Food Business", "Udyam Registered", "Profile complete"];

export default function Onboarding() {
  const navigate = useNavigate();
  const [sessionId] = useState(() => crypto.randomUUID());
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const bottomRef = useRef(null);

  useEffect(() => {
    const base = import.meta.env.VITE_WS_BASE_URL || "ws://localhost:8000";
    const ws = new WebSocket(`${base}/ws/aria/${sessionId}`);
    wsRef.current = ws;
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "token") {
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (!last || last.role !== "ai" || !last.streaming) {
              next.push({ id: crypto.randomUUID(), role: "ai", text: data.content, streaming: true });
            } else {
              last.text += data.content;
            }
            return next;
          });
          if (data.content.includes("Profile complete!")) completeOnboarding();
        }
        if (data.type === "profile_complete") completeOnboarding();
      } catch { /* ignore */ }
    };
    return () => ws.close();
  }, [sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function completeOnboarding() {
    setToken("demo-business-token");
    setRole("business_owner");
    setUserId("demo-user");
    setTimeout(() => navigate("/dashboard"), 1800);
  }

  function sendMessage(text = input) {
    const clean = text.trim();
    if (!clean) return;
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: clean }]);
    setInput("");
    if (wsRef.current && connected) {
      wsRef.current.send(JSON.stringify({ message: clean }));
    } else {
      setTimeout(() => {
        const fallback = clean.toLowerCase().includes("complete") || clean.toLowerCase().includes("done")
          ? "Profile complete! Thank you. I found your MSME compliance profile and will prepare your dashboard."
          : "Thanks. Which existing registrations do you already have — GST, Udyam, PAN, or shop license?";
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "ai", text: fallback }]);
        if (fallback.includes("Profile complete!")) completeOnboarding();
      }, 500);
    }
  }

  return (
    <div className="min-h-screen bg-cs-50 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-cs-100 flex items-center justify-between px-8 flex-shrink-0">
        <h1 className="font-extrabold text-cs-900 text-2xl tracking-tight">ComplianceOS</h1>
        <div className="flex items-center gap-4">
          <span className="text-cs-600 text-sm font-semibold">Step 2 of 5</span>
          <div className="w-40">
            <ProgressBar value={40} size="sm" />
          </div>
          <HelpCircle size={20} className="text-cs-400" />
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-auto pb-52">
        <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-10">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {msg.role === "ai" && (
                <div className="w-12 h-12 rounded-full bg-cs-200 flex items-center justify-center text-cs-600 flex-shrink-0">
                  <Bot size={20} />
                </div>
              )}
              <div className={`max-w-lg rounded-2xl px-8 py-6 text-lg leading-relaxed border ${
                msg.role === "ai"
                  ? "bg-white border-cs-100 text-cs-900"
                  : "bg-cs-800 border-cs-900 text-cs-50"
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-cs-50/95 backdrop-blur border-t border-cs-100 px-6 pt-5 pb-6 flex flex-col items-center">
        <div className="flex gap-3 mb-4">
          {QUICK_CHIPS.map((chip) => (
            <motion.button
              key={chip}
              whileTap={{ scale: 0.97 }}
              onClick={() => sendMessage(chip)}
              className="bg-white border border-cs-200 text-cs-600 text-xs font-bold px-4 py-2 rounded-full hover:border-cs-400 transition-colors"
            >
              {chip}
            </motion.button>
          ))}
        </div>

        <div className="w-full max-w-2xl bg-white border border-cs-200 rounded-2xl flex items-center gap-3 px-4 py-3 shadow-sm">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent outline-none text-cs-900 text-base placeholder:text-cs-400"
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => sendMessage()}
            className="w-10 h-10 bg-cs-800 text-cs-50 rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>

        <p className="text-cs-400 text-xs font-bold tracking-widest mt-3">
          SECURED BY COMPLIANCEOS ENTERPRISE INTELLIGENCE
        </p>
      </footer>
    </div>
  );
}
