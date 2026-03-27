"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";

interface Message {
  id: string;
  role: "user" | "ana";
  text: string;
  time: string;
}


const suggestions = [
  "Ce declarații am de depus în mai?",
  "Care e plafonul TVA în 2026?",
  "Cum calculez salariul net?",
  "Ce e e-Factura?",
  "Arată-mi situația financiară",
  "Explică-mi microîntreprindere vs profit",
];

function formatText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

const commands = [
  { cmd: "Emite factură nouă", icon: "🧾", href: "/manager/facturi" },
  { cmd: "Deschide HR & Salarii", icon: "👥", href: "/manager/hr" },
  { cmd: "Deschide Open Banking", icon: "🏦", href: "/manager/banci" },
  { cmd: "Raport TVA", icon: "📊", href: "/manager/tva" },
  { cmd: "Dashboard", icon: "📊", href: "/manager" },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "ana",
      text: "Bună! Sunt **ANA**, asistentul tău fiscal AI. Sunt antrenată pe Codul Fiscal român 2026 și știu tot ce ține de declarații, taxe, sisteme ANAF și situația firmei tale. Ce dorești să afli?",
      time: "08:00",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCommand, setShowCommand] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const now = () =>
    new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.slice(-5).map(m => ({ role: m.role === "ana" ? "assistant" : "user", content: m.text })),
            { role: "user", content: text }
          ]
        }),
      });
      const data = await res.json();

      const anaMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ana",
        text: data.message || "Scuze, am întâmpinat o eroare. Încearcă din nou.",
        time: now(),
      };
      setMessages((prev) => [...prev, anaMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ana",
        text: "Scuze, am întâmpinat o eroare de conexiune. Verifică internetul și încearcă din nou.",
        time: now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.startsWith("/")) setShowCommand(true);
      else send(input);
    }
    if (e.key === "Escape") setShowCommand(false);
  };

  const handleInput = (v: string) => {
    setInput(v);
    setShowCommand(v.startsWith("/"));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.anaAvatar}>A</div>
          <div>
            <h1 className={styles.pageTitle}>ANA — Asistent Fiscal AI</h1>
            <p className={styles.pageSubtitle}>
              Antrenată pe Codul Fiscal România 2026 · Răspunde în timp real
            </p>
          </div>
        </div>
        <div className={styles.onlineBadge}>
          <span className={styles.onlineDot} />
          Online
        </div>
      </div>

      {/* Suggestions */}
      <div className={styles.suggestions}>
        {suggestions.map((s) => (
          <button key={s} className={styles.suggestionBtn} onClick={() => send(s)}>
            {s}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`${styles.messageRow} ${m.role === "user" ? styles.userRow : styles.anaRow}`}
            >
              {m.role === "ana" && (
                <div className={styles.msgAvatar}>A</div>
              )}
              <div className={`${styles.bubble} ${m.role === "user" ? styles.userBubble : styles.anaBubble}`}>
                <span
                  dangerouslySetInnerHTML={{ __html: formatText(m.text) }}
                />
                <span className={styles.msgTime}>{m.time}</span>
              </div>
              {m.role === "user" && (
                <div className={styles.userAvatarMsg}>Tu</div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className={`${styles.messageRow} ${styles.anaRow}`}>
              <div className={styles.msgAvatar}>A</div>
              <div className={`${styles.bubble} ${styles.anaBubble} ${styles.typingBubble}`}>
                <span className={styles.dot1} />
                <span className={styles.dot2} />
                <span className={styles.dot3} />
              </div>
            </div>
          )}
          <div ref={messagesEnd} />
        </div>

        {/* Command palette */}
        {showCommand && (
          <div className={styles.commandPalette}>
            <div className={styles.commandHeader}>
              <span>⌨️ Command palette</span>
            </div>
            {commands
              .filter((c) => c.cmd.toLowerCase().includes(input.slice(1).toLowerCase()))
              .map((c) => (
                <a
                  key={c.cmd}
                  href={c.href}
                  className={styles.commandItem}
                  onClick={() => { setInput(""); setShowCommand(false); }}
                >
                  <span>{c.icon}</span>
                  <span>{c.cmd}</span>
                </a>
              ))}
          </div>
        )}

        {/* Input */}
        <div className={styles.inputArea}>
          <div className={styles.inputHint}>
            Scrie <code>/</code> pentru command palette sau întreabă orice fiscal
          </div>
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              className={styles.chatInput}
              value={input}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Întreabă ANA... (Enter pentru a trimite)"
              autoComplete="off"
            />
            <button
              className={styles.sendBtn}
              onClick={() => { if (input.startsWith("/")) setShowCommand(true); else send(input); }}
              disabled={!input.trim() || isTyping}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
